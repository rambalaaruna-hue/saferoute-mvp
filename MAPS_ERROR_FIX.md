# Google Maps Error - Quick Fix Guide

## 🚨 Error: "This page didn't load Google Maps correctly"

## Quick Diagnosis

### Step 1: Open the Test Page
Open this URL in your browser:
```
http://localhost:5173/test-maps.html
```

This diagnostic tool will:
- ✅ Test if the API key works
- ✅ Show specific error messages
- ✅ Test Geocoding, Directions, and Places APIs
- ✅ Display a map if everything works

### Step 2: Check Browser Console
1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Look for error messages starting with "Google Maps"

## Common Issues & Solutions

### Issue 1: API Key Not Valid
**Error:** "InvalidKeyMapError" or "ApiNotActivatedMapError"

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services > Credentials**
3. Check if your API key is correct: `AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg`
4. If it's wrong or expired, create a new one

### Issue 2: APIs Not Enabled
**Error:** "ApiNotActivatedMapError" or "REQUEST_DENIED"

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services > Library**
3. Enable these APIs:
   - ✅ Maps JavaScript API
   - ✅ Directions API
   - ✅ Places API
   - ✅ Geocoding API

### Issue 3: Billing Not Enabled
**Error:** "OverQueryLimitError" or billing-related message

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **Billing**
3. Add a payment method
4. Enable billing for your project
5. **Note:** Google provides $200 free credit per month

### Issue 4: API Key Restrictions
**Error:** "RefererNotAllowedMapError"

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services > Credentials**
3. Click your API key
4. Under **Application restrictions**:
   - Select "HTTP referrers (web sites)"
   - Add: `http://localhost:*`
   - Add: `http://127.0.0.1:*`
5. Under **API restrictions**:
   - Select "Don't restrict key" (for testing)
   - Or select specific APIs listed above

### Issue 5: Environment Variable Not Loaded
**Error:** API key shows as `undefined` in console

**Solution:**
1. Check `.env` file exists in project root
2. Verify it contains:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg
   ```
3. **IMPORTANT:** Restart the dev server:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

## Step-by-Step Fix

### 1. Verify API Key in Google Cloud Console

```
1. Go to: https://console.cloud.google.com/
2. Select your project
3. Go to: APIs & Services > Credentials
4. Find your API key: AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg
5. Click on it to view details
```

### 2. Enable Required APIs

```
1. Go to: APIs & Services > Library
2. Search and enable each:
   - Maps JavaScript API
   - Directions API
   - Places API
   - Geocoding API
3. Wait 1-2 minutes for changes to propagate
```

### 3. Configure API Key Restrictions

```
1. Go to: APIs & Services > Credentials
2. Click your API key
3. Application restrictions:
   - Select "HTTP referrers"
   - Add: http://localhost:*
   - Add: http://127.0.0.1:*
4. API restrictions:
   - Select "Don't restrict key" (easiest for testing)
5. Click "Save"
```

### 4. Enable Billing

```
1. Go to: Billing
2. Link a billing account
3. Add payment method
4. Enable billing for your project
5. Note: $200 free credit per month
```

### 5. Test the API Key

Open in browser:
```
https://maps.googleapis.com/maps/api/js?key=AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg&libraries=places,geometry&callback=console.log
```

**Expected:** JavaScript file loads
**If error:** Read the error message for specific issue

### 6. Restart Development Server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

## Still Not Working?

### Check These:

1. **Internet Connection**
   - Ensure stable connection
   - Try disabling VPN

2. **Browser Extensions**
   - Disable ad blockers
   - Disable privacy extensions
   - Try incognito mode

3. **Firewall/Proxy**
   - Check if corporate firewall blocks Google APIs
   - Try different network

4. **Browser Cache**
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R)

5. **API Quota**
   - Check if you've exceeded quota
   - Go to: APIs & Services > Dashboard
   - View usage statistics

## Create New API Key

If nothing works, create a fresh API key:

```
1. Go to: https://console.cloud.google.com/
2. APIs & Services > Credentials
3. Click: + CREATE CREDENTIALS > API key
4. Copy the new key
5. Update .env file:
   VITE_GOOGLE_MAPS_API_KEY=YOUR_NEW_KEY
6. Restart dev server
```

## Test Files

We've created test files to help diagnose:

1. **Diagnostic Tool:** `http://localhost:5173/test-maps.html`
   - Tests API key validity
   - Tests all required APIs
   - Shows specific error messages

2. **Troubleshooting Guide:** `GOOGLE_MAPS_TROUBLESHOOTING.md`
   - Detailed explanations
   - Step-by-step solutions
   - Common error codes

## Console Logging

The app now logs helpful information:

```javascript
// Check browser console for:
"Loading Google Maps with API key: AIzaSyCo3c..."
"Google Maps loaded successfully"

// Or error messages:
"Failed to load Google Maps script"
"Please check: 1. API key is valid..."
```

## Need Help?

1. **Check console** for specific error message
2. **Open test page** at `/test-maps.html`
3. **Read error message** carefully
4. **Follow solution** for that specific error
5. **Restart server** after any changes

## Quick Checklist

Before asking for help, verify:

- [ ] API key is correct in `.env`
- [ ] Dev server was restarted after changing `.env`
- [ ] Maps JavaScript API is enabled
- [ ] Directions API is enabled
- [ ] Places API is enabled
- [ ] Geocoding API is enabled
- [ ] Billing is enabled
- [ ] API key has no restrictions (or correct localhost restrictions)
- [ ] Browser console shows the actual error
- [ ] Test page (`/test-maps.html`) was checked
- [ ] Internet connection is stable
- [ ] No ad blockers interfering

## Most Common Solution

**90% of the time, the issue is:**

1. **Billing not enabled** - Enable billing in Google Cloud Console
2. **APIs not enabled** - Enable all 4 required APIs
3. **Server not restarted** - Restart after changing `.env`

**Try these three things first!**

---

**Next Step:** Open `http://localhost:5173/test-maps.html` to see the exact error message.
