# SafeRoute - Travel Safer at Night

SafeRoute is a hackathon prototype website designed to demonstrate an AI-powered navigation system that helps women choose safer routes when traveling at night.

## 🎯 Core Purpose

- Demonstrate how SafeRoute helps women choose safer routes at night using AI-powered safety analysis
- Visually explain the problem → solution → impact flow
- Prove that the core logic works with **real Google Maps and Gemini AI integration**
- Show product thinking and protective design philosophy

## ✨ Features

### Real-Time Route Analysis
- **Google Maps Integration**: Live map with up to 3 alternative routes
- **AI-Powered Safety Analysis**: Gemini AI analyzes each route for safety factors
- **Interactive Map**: Custom dark theme with color-coded routes (Green/Teal for safest, Yellow for balanced, Gray for fastest)
- **Current Location**: One-click geolocation support

### Safety Features
- **Safety Scores**: 0-100 scale based on multiple factors
- **Natural Language Explanations**: AI-generated descriptions of why routes are safer
- **Key Safety Highlights**: Lighting, foot traffic, commercial areas, etc.
- **Personalized Recommendations**: Time-aware safety tips
- **SOS Emergency Button**: Quick access to emergency features

### User Experience
- **Single-Page Design**: Smooth scrolling between sections
- **Loading States**: Clear feedback during route calculation
- **Toast Notifications**: User-friendly status messages
- **Responsive Design**: Works on mobile and desktop
- **Calm Night Safety Theme**: Dark, reassuring color palette

## 🚀 Getting Started

### ⚡ QUICK START - Demo Mode Available!

**The app now works immediately in Demo Mode!**

If Google Maps API is not configured, the app automatically switches to Demo Mode with:
- ✅ Mock map visualization
- ✅ 3 route options with realistic data
- ✅ AI safety analysis (Gemini)
- ✅ All UI features functional
- ✅ Perfect for hackathon demos!

**Just run:** `npm run dev` and start using the app immediately!

### 🗺️ Full Google Maps Setup (Optional)

For production use with real maps:

The API key in the project needs to be configured in Google Cloud Console:
1. **Enable billing** (required, but $200/month free credit)
2. **Enable 4 required APIs** (Maps JavaScript, Directions, Places, Geocoding)
3. **Configure API key restrictions** for localhost

**📖 Complete setup guide:** See `SETUP_GOOGLE_MAPS.md` for step-by-step instructions (5 minutes)

**🧪 Quick test:** Open `http://localhost:5173/simple-test.html` to see what's wrong

### Prerequisites
- Node.js 18+ and npm
- Google Maps API key (optional - demo mode works without it)
- Gemini API key (optional, for AI analysis)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. **Start the app (Demo Mode works immediately!):**
   ```bash
   npm run dev
   ```

3. Open your browser:
   ```
   http://localhost:5173
   ```

**That's it! The app works in Demo Mode without any API setup!**

4. **(Optional) Configure Gemini API key for AI analysis:**
   - Open `.env` file in the project root
   - Replace `your_gemini_api_key_here` with your actual Gemini API key
   - Get your key from: https://makersuite.google.com/app/apikey
   - Restart the development server

5. **(Optional) Set up Google Maps for real maps:**
   - See `SETUP_GOOGLE_MAPS.md` for complete instructions
   - Takes 5-10 minutes
   - Requires billing (but $200/month free credit)

## 📖 Usage Guide

### Finding Safe Routes

1. **Enter Locations**:
   - Click the navigation icon button to use your current location, OR
   - Manually enter start location and destination

2. **Set Travel Time**:
   - Choose your planned travel time (defaults to 21:00 / 9 PM)

3. **Find Routes**:
   - Click "Find Safe Routes" button
   - Wait for map to load and routes to be analyzed

4. **Compare Routes**:
   - View up to 3 routes with safety scores
   - Read AI-generated safety analysis
   - Click on route cards to highlight them on the map

5. **Select Your Route**:
   - Choose the route that best balances safety and convenience
   - View detailed safety recommendations

### Using the SOS Feature
- The SOS button appears after selecting a route
- Click to trigger emergency alert (demo mode)
- Shows current location and selected route information

### Community Feedback
- Mark areas as safe or report unsafe areas
- Anonymous submissions (demo mode)
- Helps improve future route recommendations

## 🎨 Design Philosophy

**"Calm Night Safety"** - The design is inspired by:
- Night city lights
- Police dashboard interfaces
- Emergency systems
- Google Material calmness

### Color Palette
- **Primary**: Deep Navy Blue (#0B1C2D), Midnight Blue (#12263A)
- **Safe Indicators**: Soft Teal/Cyan (#2EC4B6)
- **Caution**: Muted Yellow (#F4D35E)
- **Emergency**: Red (#E63946) - used only for SOS button

### Emotional Tone
Reassuring, non-alarming, protective, empowering, serious, trustworthy, calm, purpose-driven

## 🔧 Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Maps**: Google Maps JavaScript API
- **AI**: Google Gemini Pro API
- **State Management**: React Hooks

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # shadcn/ui components
├── pages/
│   └── SafeRoute.tsx    # Main application page
├── services/
│   ├── googleMaps.ts    # Google Maps integration
│   └── gemini.ts        # Gemini AI integration
├── hooks/
│   └── use-toast.tsx    # Toast notification hook
└── index.css            # Global styles and theme
```

## 🔑 API Configuration

### Google Maps API (Already Configured ✅)
The Google Maps API key is pre-configured in the `.env` file. The following APIs are enabled:
- Maps JavaScript API
- Directions API
- Geocoding API
- Places API

### Gemini AI API (User Configuration Required)
To enable AI-powered safety analysis:

1. Get your API key from https://makersuite.google.com/app/apikey
2. Open `.env` file in the project root
3. Update: `VITE_GEMINI_API_KEY=your_actual_key_here`
4. Restart the development server

**Note**: The app works without Gemini API key using fallback analysis.

## 📚 Documentation

- **INTEGRATION_GUIDE.md**: Detailed guide for API integration and usage
- **TODO.md**: Development progress and notes

## 🎯 Demo Mode

The application includes demo-friendly features:
- Real-time route calculation with Google Maps
- AI-powered safety analysis with Gemini
- Fast response times
- Clear visual feedback
- Smooth transitions
- Easy-to-understand safety scores

## 🐛 Troubleshooting

### ⚠️ "This page didn't load Google Maps correctly"

This is the most common error. **Quick Fix:**

1. **Open the diagnostic tool:** `http://localhost:5173/test-maps.html`
   - This will show you the exact error

2. **Most common causes:**
   - ❌ Billing not enabled in Google Cloud Console
   - ❌ Required APIs not enabled
   - ❌ Dev server not restarted after changing `.env`

3. **Quick solution:**
   ```bash
   # 1. Check .env file has the API key
   # 2. Restart the dev server
   npm run dev
   ```

4. **Detailed guide:** See `MAPS_ERROR_FIX.md` for step-by-step solutions

### Map Not Loading
- Check Google Maps API key in `.env`
- Ensure required APIs are enabled in Google Cloud Console:
  - Maps JavaScript API ✅
  - Directions API ✅
  - Places API ✅
  - Geocoding API ✅
- **Enable billing** on your Google Cloud project (required!)
- Check browser console for specific error messages
- Try the diagnostic tool: `http://localhost:5173/test-maps.html`

### No Routes Found
- Use specific addresses (include city/state)
- Verify both start and destination are valid
- Try well-known locations first (e.g., "Times Square, New York")
- Check if locations are walkable (not too far apart)

### Gemini AI Not Working
- Add your Gemini API key to `.env`
- Restart the development server
- App will use fallback analysis if key is missing
- Check browser console for API errors

### Current Location Not Working
- Allow location access in browser
- Use HTTPS or localhost
- Check browser console for errors
- Try manually entering an address

### Environment Variables Not Loading
- Ensure `.env` file is in project root
- File must be named exactly `.env` (not `.env.txt`)
- **Restart dev server** after any changes to `.env`
- Check console: should see "Loading Google Maps with API key: AIzaSyCo3c..."

### Need More Help?
- 📄 **Quick Fix Guide:** `MAPS_ERROR_FIX.md`
- 📄 **Detailed Troubleshooting:** `GOOGLE_MAPS_TROUBLESHOOTING.md`
- 🧪 **Diagnostic Tool:** `http://localhost:5173/test-maps.html`
- 📄 **Navigation Guide:** `GEMINI_NAVIGATION_GUIDE.md`

## ⚠️ Important Notes

- This is a **prototype for demonstration purposes only**
- Built for hackathon presentation (3-5 minute demo)
- Real-time route calculation and AI analysis are functional
- Mock data used for community feedback and SOS features
- Not intended for production use

## 📄 License

This is a hackathon prototype project.

## 👥 Team

SafeRoute - Hackathon Prototype 2025

---

**Prototype for demonstration only**
