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

### Prerequisites
- Node.js 18+ and npm
- Google Maps API key (already configured)
- Gemini API key (optional, for AI analysis)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Gemini API key (optional but recommended):
   - Open `.env` file in the project root
   - Replace `your_gemini_api_key_here` with your actual Gemini API key
   - Get your key from: https://makersuite.google.com/app/apikey

3. Start the development server:
   ```bash
   npm run dev
   ```

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

### Map Not Loading
- Check Google Maps API key in `.env`
- Ensure required APIs are enabled in Google Cloud Console
- Check browser console for errors

### No Routes Found
- Use specific addresses (include city/state)
- Verify both start and destination are valid
- Try well-known locations first (e.g., "Times Square, New York")

### Gemini AI Not Working
- Add your Gemini API key to `.env`
- Restart the development server
- App will use fallback analysis if key is missing

### Current Location Not Working
- Allow location access in browser
- Use HTTPS or localhost
- Check browser console for errors

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
