# 🔧 "Oops! Something went wrong" - Debugging Guide

## Problem
After clicking "Find Routes", you see:
```
Oops! Something went wrong.
This page didn't load Google Maps correctly. See the JavaScript console for technical details.
```

---

## ✅ Step 1: Open Browser Console
1. Press **F12** to open Developer Tools
2. Click on the **Console** tab
3. Look for red error messages

---

## ✅ Step 2: Check for These Error Patterns

### Error Pattern 1: "Map container not found"
**Cause**: Map container doesn't exist in the DOM
**Fix**:
1. Make sure you're on the SafeRoute page
2. Scroll down to find the map section
3. Restart dev server (Ctrl+C and `npx vite --host`)

### Error Pattern 2: "Map container has zero dimensions"
**Cause**: Map container is hidden or has no height
**Fix**:
1. Check if map section is visible
2. Check CSS - map might be hidden with `display: none`
3. Try resizing browser window
4. Check if container height is set in CSS

### Error Pattern 3: "Google Maps API not available"
**Cause**: Google Maps script didn't load
**Fix**:
1. Check if Google Maps script loaded in Network tab (F12 → Network)
2. Look for request to `maps.googleapis.com`
3. If failed (red):
   - Check API key in `.env`
   - Verify key isn't restricted by domain
   - Check if billing is enabled

### Error Pattern 4: "Directions service not initialized"
**Cause**: Map initialization failed before getting directions
**Fix**:
1. Ensure map initializes first (should see "Map initialized successfully")
2. Check console logs in order
3. Reload page if not following correct order

### Error Pattern 5: "Directions API error: REQUEST_DENIED"
**Cause**: API key doesn't have Directions API enabled
**Fix**:
1. Go to Google Cloud Console
2. APIs & Services → Library
3. Search for "Directions API"
4. Click "Enable"

### Error Pattern 6: "Zero results"
**Cause**: No walking routes found for this location
**Fix**:
1. Try different start/destination
2. Use major cities (e.g., "Times Square NYC" → "Central Park NYC")
3. Make sure both addresses are valid

---

## 🔍 Step 3: Check Console Logs in Order

After clicking "Find Routes", you should see logs like:

```
🗺️ Map not initialized, initializing now...
🗺️ initMap called with element: map-container
🗺️ Map container found, size: { width: 800, height: 400 }
⏳ Ensuring Google Maps script is loaded...
✓ Google Maps already loaded. Resolving immediately.
✅ Google Maps loaded successfully
⏳ Calling googleMapsService.initMap...
🚀 Creating new Google Maps instance...
✅ Map initialized successfully
📍 Map center: { lat: 40.7128, lng: -74.006 }
🛣️ Getting routes from: [Your Start] to: [Your Destination]
📡 Sending directions request to Google Maps API...
📨 Directions API response status: OK
✅ Directions API returned 3 routes
✓ Route 1: 1.5 km, 20 mins
✓ Route 2: 1.7 km, 22 mins
✓ Route 3: 1.8 km, 25 mins
✓ Route 1 rendered on map
✓ Route 2 rendered on map
✓ Route 3 rendered on map
✓ Map fitted to show all routes
✅ Successfully processed 3 routes
```

### If logs stop early:
- Log stops at "Map not initialized" → Map container issue
- Log stops at "Calling googleMapsService.initMap" → API loading issue
- Log stops at "Sending directions request" → Map initialization incomplete
- Log stops at "Directions API response" → API key/permissions issue

---

## 🆘 Step 4: Network Tab Debugging

1. Press **F12** → **Network** tab
2. Clear current requests (trash icon)
3. Click "Find Routes"
4. Look for these requests:

**Should see (✅ 200 status):**
- `maps.googleapis.com/maps/api/js` - Google Maps script
- Multiple requests to `maps.googleapis.com` APIs

**If you see (❌ Failed/Red):**
- Domain restriction error
- Billing not enabled
- API key invalid
- API not enabled

---

## 💡 Step 5: Common Fixes

### Fix 1: Restart Dev Server
```bash
# In terminal, press Ctrl+C
# Then restart:
npx vite --host
```

### Fix 2: Clear Browser Cache
1. Press **Ctrl + Shift + Delete**
2. Select "All time"
3. Check "Cookies and cached files"
4. Click "Clear data"
5. Hard refresh (Ctrl + Shift + R)

### Fix 3: Update .env
Make sure `.env` has:
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSy...YOUR_KEY...
```
Then restart dev server.

### Fix 4: Check Google Cloud Console
Go to: https://console.cloud.google.com
1. Select your project
2. APIs & Services → Credentials
3. Click on your API key
4. Verify:
   - ✅ Application restrictions includes localhost
   - ✅ Billing enabled
   - ✅ Maps JavaScript API, Directions API enabled

### Fix 5: Use Demo Mode
If nothing works:
1. Look for checkbox below hero section
2. Toggle "Demo Mode" ON
3. Routes will work on mock map
4. This confirms the issue is API-related

---

## 📝 Detailed Error Messages

Copy the exact error from console and check below:

| Error | Cause | Fix |
|-------|-------|-----|
| "Map container not found" | DOM element missing | Reload page, check HTML |
| "Map container has zero dimensions" | CSS height issue | Add CSS: `#map-container { height: 400px; }` |
| "Google Maps API not available" | Script didn't load | Check API key, restart server |
| "Directions service not initialized" | Map init failed | Check console for earlier errors |
| "REQUEST_DENIED" | Missing API permission | Enable Directions API |
| "ZERO_RESULTS" | No routes found | Try different addresses |
| "NOT_FOUND" | Invalid address | Fix typos in start/destination |
| "RefererNotAllowedMapError" | Domain restriction | Add localhost to Google Cloud |
| "InvalidApiKey" | Bad key format | Generate new key in Google Cloud |

---

## 🎯 Success Indicators

After clicking "Find Routes", you should see:
- ✅ "Routes Found" toast notification
- ✅ Multiple colored route lines on map
- ✅ No red error messages in console
- ✅ Console shows successful logs
- ✅ Ability to click on routes in sidebar

---

## 🆘 Still Stuck?

Try these in order:

1. **Check Console Logs** - Copy exact error messages
2. **Hard Restart** - Ctrl+C, restart dev server, Ctrl+Shift+R
3. **Check API Key** - Verify in Google Cloud Console
4. **Enable APIs** - Maps, Directions, Geocoding APIs
5. **Check Billing** - Must be enabled in Google Cloud
6. **Use Demo Mode** - Toggle checkbox to test without real API
7. **Check Network** - F12 → Network tab for failed requests

---

**All recent changes have been pushed to GitHub with better error messages to help debugging!**

---

**Last Updated**: December 22, 2025
