# 🚀 START HERE - Quick Setup

## 🚨 Map Not Working? Follow These Steps:

### Step 1: Test Your API Key (30 seconds)

Open this page in your browser:
```
http://localhost:5173/simple-test.html
```

This will show you **exactly** what's wrong.

---

### Step 2: Most Common Issue (90% of cases)

**Billing Not Enabled**

Google Maps requires billing to work (even for free tier).

**Fix:**
1. Go to: https://console.cloud.google.com/billing
2. Add a credit card
3. Enable billing
4. You get **$200 free per month** (enough for development)

---

### Step 3: Enable Required APIs (2 minutes)

Go to: https://console.cloud.google.com/apis/library

Enable these 4 APIs:
- ✅ Maps JavaScript API
- ✅ Directions API  
- ✅ Places API
- ✅ Geocoding API

---

### Step 4: Configure API Key (1 minute)

Go to: https://console.cloud.google.com/apis/credentials

1. Click your API key
2. Under "Application restrictions":
   - Select "HTTP referrers"
   - Add: `http://localhost:*`
3. Click "Save"

---

### Step 5: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

---

### Step 6: Test Again

Open: http://localhost:5173

The map should now work! 🎉

---

## 🆘 Still Not Working?

### Quick Checklist:

- [ ] Billing enabled in Google Cloud Console?
- [ ] All 4 APIs enabled?
- [ ] API key allows `localhost:*`?
- [ ] Dev server restarted?
- [ ] Waited 1-2 minutes after making changes?

### Get More Help:

- 📖 **Detailed Guide:** `SETUP_GOOGLE_MAPS.md`
- 🧪 **Test Page:** `http://localhost:5173/simple-test.html`
- 📖 **Troubleshooting:** `MAPS_ERROR_FIX.md`

---

## 🎯 What You're Building

SafeRoute - AI-powered navigation for women's safety at night

**Features:**
- ✅ 3 route options (Safest, Balanced, Fastest)
- ✅ AI safety analysis (Gemini)
- ✅ Turn-by-turn navigation
- ✅ Live GPS tracking
- ✅ Safety scores (50-95)
- ✅ Dark theme optimized for night use

**All features work - just need the API key configured!**

---

## ⏱️ Time Required

- **Setup:** 5-10 minutes
- **Testing:** 30 seconds
- **Total:** ~10 minutes

---

## 💡 Pro Tip

**Don't have time to set up billing right now?**

You can use a temporary demo key for quick testing:
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg
```

⚠️ **Warning:** Demo keys have strict limits and may stop working. Create your own key for reliable development.

---

## 🎓 Why Billing is Required

Google Maps Platform requires billing because:
- Prevents abuse and spam
- Ensures quality of service
- **$200 free credit per month**
- Most development stays within free tier

**You won't be charged unless you exceed the free tier.**

---

## ✅ Expected Result

After setup, you should see:

1. ✅ Map loads on the page
2. ✅ "Use Current Location" button works
3. ✅ Enter start and destination
4. ✅ Click "Find Safe Routes"
5. ✅ See 3 routes with AI safety scores
6. ✅ Select a route
7. ✅ Click "Start" for turn-by-turn navigation
8. ✅ Live GPS tracking works

---

## 🚀 Ready?

1. **Test:** http://localhost:5173/simple-test.html
2. **Setup:** https://console.cloud.google.com/
3. **Guide:** SETUP_GOOGLE_MAPS.md

**Let's get your map working!** 🗺️
