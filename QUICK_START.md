# SafeRoute - Quick Start Guide

## 🚀 Getting Started

### Start the App:
```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 🎯 How to Use

### 1. Enter Journey Details
- Click "Use Current Location" or enter start address
- Enter destination
- Select travel time
- Click "Find Safe Routes"

### 2. Review Three Routes
- **🟢 Safest** (85-95): Well-lit, busy areas
- **🟡 Balanced** (70-84): Mix of safety & speed
- **⚪ Fastest** (50-69): Shortest, use with caution

### 3. Read AI Analysis
Each route shows:
- Safety score (Gemini AI-powered)
- Natural language explanation
- Key safety highlights
- Personalized recommendations

### 4. Start Navigation
- Select your preferred route
- Click **"Start"** button
- Click **"Start Navigation"**
- Follow turn-by-turn directions

## 🔑 API Keys (Already Configured)

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg
VITE_GEMINI_API_KEY=AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg
```

**No setup needed - ready to use!**

## 🧪 Test Locations

```
Start: Times Square, New York, NY
Destination: Central Park, New York, NY
```

## ✨ Features

✅ AI-powered safety analysis (Gemini)
✅ Three route options with scores
✅ Turn-by-turn navigation
✅ Live GPS tracking
✅ Auto-progressing steps
✅ Dark theme (night-optimized)
✅ Responsive design
✅ SOS emergency button

## 🔧 Troubleshooting

**Map not loading?**
- Check internet connection
- Clear browser cache

**Location not working?**
- Grant location permission
- Use HTTPS (required for GPS)

**Routes not appearing?**
- Verify addresses are valid
- Try different locations

## 📱 Mobile Tips

- Grant location permission
- Keep screen on
- Use stable internet
- Portrait mode recommended

## 🎯 Demo Tips (3-5 minutes)

1. Enter "Times Square" → "Central Park"
2. Show 3 routes with AI scores
3. Highlight Gemini analysis
4. Select safest route
5. Open navigation dialog
6. Show turn-by-turn steps

**Key Points:**
- AI-powered (not just distance)
- Three distinct safety levels
- Real-time navigation
- Women's safety focus

## 📊 Safety Scores

- **90-95**: Excellent (well-lit, busy)
- **85-89**: Very safe (main streets)
- **75-84**: Moderately safe
- **65-74**: Caution advised
- **50-64**: Use only if necessary

## 🚨 Emergency

- SOS button (red, top-right)
- Shows current location
- Mock alert for demo
- Future: Real emergency integration

---

**Ready to navigate safely! 🛡️**
