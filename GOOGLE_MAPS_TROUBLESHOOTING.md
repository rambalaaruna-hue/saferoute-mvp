# Google Maps API Troubleshooting Guide

## Error: "This page didn't load Google Maps correctly"

This error typically occurs when there's an issue with the Google Maps API key configuration. Follow these steps to resolve it:

## Step 1: Verify API Key

Check your `.env` file:
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg
```

**Important:** After changing the `.env` file, you MUST restart the development server:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 2: Check Google Cloud Console

Go to [Google Cloud Console](https://console.cloud.google.com/) and verify:

### 2.1 Enable Required APIs

Navigate to **APIs & Services > Library** and enable:

1. **Maps JavaScript API** ✅ (Required)
2. **Directions API** ✅ (Required)
3. **Places API** ✅ (Required)
4. **Geocoding API** ✅ (Required)
5. **Geolocation API** ✅ (Optional, for location tracking)

### 2.2 Check API Key Restrictions

Navigate to **APIs & Services > Credentials** > Click your API key:

**Application Restrictions:**
- For development: Select "None" or "HTTP referrers"
- If using HTTP referrers, add:
  - `http://localhost:*`
  - `http://127.0.0.1:*`
  - Your production domain

**API Restrictions:**
- Recommended: "Restrict key" and select only the APIs listed above
- For testing: "Don't restrict key" (less secure but easier for debugging)

### 2.3 Verify Billing

Google Maps requires billing to be enabled:

1. Go to **Billing** in Google Cloud Console
2. Ensure a valid payment method is attached
3. Check that billing is enabled for your project

**Note:** Google provides $200 free credit per month, which is usually sufficient for development and small projects.

## Step 3: Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab for specific error messages:

### Common Error Messages:

**"RefererNotAllowedMapError"**
- Solution: Add your domain to HTTP referrer restrictions in API key settings

**"ApiNotActivatedMapError"**
- Solution: Enable the required APIs in Google Cloud Console (see Step 2.1)

**"InvalidKeyMapError"**
- Solution: Verify the API key is correct and not expired

**"RequestDeniedMapError"**
- Solution: Check API restrictions and ensure all required APIs are enabled

**"OverQueryLimitError"**
- Solution: Check your quota limits or enable billing

## Step 4: Test API Key

You can test if your API key works by opening this URL in your browser:

```
https://maps.googleapis.com/maps/api/js?key=AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg&libraries=places,geometry&callback=console.log
```

**Expected Result:** You should see a JavaScript file load (not an error page)

**If you see an error:** The error message will tell you what's wrong (e.g., "API key not valid", "API not enabled", etc.)

## Step 5: Create a New API Key (If Needed)

If the current key doesn't work, create a new one:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services > Credentials**
3. Click **+ CREATE CREDENTIALS > API key**
4. Copy the new API key
5. Update your `.env` file:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=YOUR_NEW_API_KEY_HERE
   ```
6. Restart the development server

## Step 6: Verify Environment Variables

Check that Vite is loading the environment variables correctly:

1. Add this temporary console log to `src/services/googleMaps.ts`:
   ```typescript
   console.log('API Key loaded:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
   ```

2. Check the browser console - you should see your API key (first 10 characters)

3. If it shows `undefined`, the `.env` file is not being loaded:
   - Ensure the file is named exactly `.env` (not `.env.txt` or `.env.local`)
   - Ensure it's in the project root directory
   - Restart the dev server

## Step 7: Check Network Issues

1. Open Developer Tools > Network tab
2. Look for the Google Maps script request
3. Check if it's blocked by:
   - Firewall
   - VPN
   - Ad blocker
   - Browser extensions
   - Corporate proxy

## Quick Fix Checklist

- [ ] API key is correct in `.env` file
- [ ] Development server was restarted after changing `.env`
- [ ] Maps JavaScript API is enabled in Google Cloud Console
- [ ] Directions API is enabled
- [ ] Places API is enabled
- [ ] Geocoding API is enabled
- [ ] Billing is enabled on Google Cloud project
- [ ] API key has no restrictions (or correct restrictions for localhost)
- [ ] Browser console shows no CORS errors
- [ ] No ad blockers or extensions blocking Google Maps
- [ ] Internet connection is stable

## Alternative: Use a Different API Key

If you're having trouble with the current API key, you can:

1. **Create your own API key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable billing
   - Enable required APIs
   - Create an API key
   - Update `.env` with your new key

2. **Use the demo key (limited):**
   - Google provides demo keys for testing
   - Not recommended for production
   - May have strict rate limits

## Still Not Working?

If you've tried all the above steps and it's still not working:

1. **Check the browser console** for the exact error message
2. **Copy the error message** and search for it online
3. **Verify the API key** by testing it in a simple HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Google Maps Test</title>
</head>
<body>
  <div id="map" style="height: 400px; width: 100%;"></div>
  <script>
    function initMap() {
      new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12
      });
    }
  </script>
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
</body>
</html>
```

If this simple test works, the issue is with the React integration. If it doesn't work, the issue is with the API key configuration.

## Contact Support

If none of these solutions work:

1. Check [Google Maps Platform Status](https://status.cloud.google.com/)
2. Visit [Google Maps Platform Support](https://developers.google.com/maps/support)
3. Post on [Stack Overflow](https://stackoverflow.com/questions/tagged/google-maps) with the `google-maps` tag

## Current Configuration

Your current setup:
- API Key: `AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg`
- Required APIs: Maps JavaScript API, Directions API, Places API, Geocoding API
- Libraries: places, geometry
- Callback: initGoogleMaps

**Next Step:** Check the browser console for the specific error message and follow the corresponding solution above.
