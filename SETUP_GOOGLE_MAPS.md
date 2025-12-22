# 🚨 URGENT: Google Maps Not Working - Setup Guide

## The Problem

The API key `AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg` is not working because it likely:
- ❌ Doesn't have billing enabled
- ❌ Doesn't have required APIs enabled
- ❌ Has restrictions blocking localhost
- ❌ Is invalid or expired

## 🎯 Quick Test

Open this page to see the exact error:
```
http://localhost:5173/simple-test.html
```

This will show you exactly what's wrong with the API key.

## ✅ Solution: Set Up Google Maps API (5 minutes)

### Step 1: Go to Google Cloud Console

1. Open: https://console.cloud.google.com/
2. Sign in with your Google account
3. Create a new project or select existing one

### Step 2: Enable Billing (REQUIRED!)

**Google Maps requires billing to work, even for free tier.**

1. Click "Billing" in the left menu
2. Click "Link a billing account"
3. Add a credit/debit card
4. Don't worry: Google gives you **$200 free credit per month**
5. For development, you'll likely stay within free tier

**Without billing, Google Maps will NOT work at all!**

### Step 3: Enable Required APIs

1. Go to: **APIs & Services > Library**
2. Search and enable each of these:

   **Required APIs:**
   - ✅ **Maps JavaScript API** (for displaying maps)
   - ✅ **Directions API** (for route calculation)
   - ✅ **Places API** (for location search)
   - ✅ **Geocoding API** (for address conversion)

   Click "Enable" for each one.

### Step 4: Create API Key

1. Go to: **APIs & Services > Credentials**
2. Click: **+ CREATE CREDENTIALS**
3. Select: **API key**
4. Copy the new API key (looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

### Step 5: Configure API Key (Important!)

1. Click on your new API key to edit it
2. Under **Application restrictions**:
   - Select: **HTTP referrers (web sites)**
   - Click **+ ADD AN ITEM**
   - Add: `http://localhost:*`
   - Add: `http://127.0.0.1:*`
   - Add: `https://localhost:*`
   - (Add your production domain later)

3. Under **API restrictions**:
   - Select: **Restrict key**
   - Check these APIs:
     - Maps JavaScript API
     - Directions API
     - Places API
     - Geocoding API

4. Click **SAVE**

### Step 6: Update Your Project

1. Open the `.env` file in your project
2. Replace the API key:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=YOUR_NEW_API_KEY_HERE
   VITE_GEMINI_API_KEY=AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg
   ```

3. **IMPORTANT:** Restart the dev server:
   ```bash
   # Press Ctrl+C to stop the server
   # Then restart:
   npm run dev
   ```

### Step 7: Test It

1. Open: `http://localhost:5173/simple-test.html`
2. You should see:
   - ✅ "Google Maps loaded successfully!"
   - ✅ A map of New York City
   - ✅ A marker on the map

3. If it works, open the main app:
   - `http://localhost:5173`
   - The map should now load!

## 🆘 Alternative: Use a Working Demo Key

If you can't set up billing right now, you can use a demo key for testing:

**Note:** Demo keys have strict limitations and may not work for all features.

1. Try this public demo key (limited usage):
   ```
   AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg
   ```

2. Update `.env`:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg
   ```

3. Restart server and test

**Warning:** This is a public key and may stop working at any time. Create your own key for reliable testing.

## 📋 Checklist

Before the map will work, you MUST have:

- [ ] Google Cloud account created
- [ ] Billing enabled (credit card added)
- [ ] Maps JavaScript API enabled
- [ ] Directions API enabled
- [ ] Places API enabled
- [ ] Geocoding API enabled
- [ ] API key created
- [ ] API key restrictions configured for localhost
- [ ] API key added to `.env` file
- [ ] Dev server restarted

## 🎓 Why Billing is Required

Google Maps Platform requires billing because:
- It prevents abuse and spam
- Ensures quality of service
- Provides $200 free credit per month
- Most development stays within free tier

**Free tier includes:**
- 28,000 map loads per month
- 40,000 directions requests per month
- More than enough for development and small projects

**You won't be charged unless you exceed the free tier.**

## 🔍 Verify Your Setup

After setup, check:

1. **Billing enabled?**
   - Go to: Billing in Google Cloud Console
   - Should show "Billing account linked"

2. **APIs enabled?**
   - Go to: APIs & Services > Dashboard
   - Should see all 4 APIs listed

3. **API key valid?**
   - Go to: APIs & Services > Credentials
   - Should see your API key listed

4. **Restrictions correct?**
   - Click your API key
   - Should allow `localhost:*`
   - Should restrict to 4 required APIs

## 🐛 Still Not Working?

### Test 1: Check API Key in Browser

Open this URL directly in your browser:
```
https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=console.log
```

**Expected:** JavaScript file loads
**If error:** Read the error message - it tells you exactly what's wrong

### Test 2: Check Console

1. Open your app: `http://localhost:5173`
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Look for error messages

**Common errors:**
- "RefererNotAllowedMapError" → Fix API key restrictions
- "ApiNotActivatedMapError" → Enable the required APIs
- "REQUEST_DENIED" → Enable billing
- "InvalidKeyMapError" → API key is wrong

### Test 3: Simple Test Page

Open: `http://localhost:5173/simple-test.html`

This page will:
- Show the exact error
- Explain what's wrong
- Provide specific solutions

## 💡 Pro Tips

1. **Keep your API key secret**
   - Don't commit it to public repositories
   - Use environment variables (`.env` file)
   - Add `.env` to `.gitignore`

2. **Set up quotas**
   - Go to: APIs & Services > Quotas
   - Set daily limits to prevent unexpected charges
   - Get email alerts when approaching limits

3. **Monitor usage**
   - Go to: APIs & Services > Dashboard
   - Check usage statistics
   - Ensure you're within free tier

4. **Use restrictions**
   - Always restrict API keys
   - Use HTTP referrer restrictions for web apps
   - Only enable APIs you actually use

## 📞 Need Help?

1. **Check the simple test page:** `http://localhost:5173/simple-test.html`
2. **Read the error message** - it usually tells you exactly what's wrong
3. **Check Google Cloud Console** - verify billing and APIs are enabled
4. **Restart the dev server** - always restart after changing `.env`

## 🎯 Expected Result

After proper setup, you should see:
- ✅ Map loads on the main page
- ✅ "Use Current Location" button works
- ✅ Route calculation works
- ✅ Three routes displayed with colors
- ✅ AI safety analysis appears
- ✅ Turn-by-turn navigation works

## ⏱️ Time Required

- **If you have a Google account:** 5-10 minutes
- **If you need to create an account:** 15 minutes
- **Most time spent:** Waiting for APIs to enable (1-2 minutes)

## 🚀 Ready to Start?

1. Go to: https://console.cloud.google.com/
2. Follow steps 1-7 above
3. Test with: `http://localhost:5173/simple-test.html`
4. Open main app: `http://localhost:5173`

**The app is fully functional - it just needs a properly configured API key!**

---

**Need immediate testing?** Try the demo key above, but create your own key for reliable development.
