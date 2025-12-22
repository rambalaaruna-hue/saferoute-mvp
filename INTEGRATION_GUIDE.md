# SafeRoute API Integration Guide

## Overview
SafeRoute now integrates with Google Maps Routes API and Gemini AI to provide real-time route analysis and safety recommendations.

## ✅ What's Been Integrated

### 1. Google Maps Integration
- **Real-time map display** with custom dark theme matching SafeRoute design
- **Geocoding** for converting addresses to coordinates
- **Route fetching** using Google Directions API (up to 3 alternative routes)
- **Interactive map** with route visualization in different colors:
  - 🟢 Green (Teal): Safest route
  - 🟡 Yellow: Balanced route
  - ⚪ Gray: Fastest route
- **Current location detection** with one-click button
- **Route highlighting** when selecting different options

### 2. Gemini AI Integration
- **AI-powered safety analysis** for each route
- **Natural language explanations** of why routes are safer
- **Safety score calculation** (0-100 scale)
- **Key safety features** highlighting
- **Personalized recommendations** based on time and route characteristics
- **Fallback analysis** when API key is not configured

### 3. User Interface Enhancements
- **Loading states** for better UX
- **Toast notifications** for user feedback
- **Error handling** with helpful messages
- **Current location button** with geolocation support
- **Real-time route comparison** with safety scores
- **Interactive route selection** with map highlighting

## 🔑 API Keys Configuration

### Google Maps API Key (Already Configured)
✅ Your Google Maps API key is already set up:
```
AIzaSyDWS4pnDGpzZcTDS5dXJUcgxZBmXsMfeeA
```

### Gemini API Key (Required for AI Analysis)
To enable AI-powered safety analysis, you need to add your Gemini API key:

1. **Get your Gemini API key:**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key

2. **Add the key to your project:**
   - Open the `.env` file in your project root
   - Find the line: `VITE_GEMINI_API_KEY=your_gemini_api_key_here`
   - Replace `your_gemini_api_key_here` with your actual API key
   - Example: `VITE_GEMINI_API_KEY=AIzaSyC...your_key_here`

3. **Restart the development server:**
   ```bash
   npm run dev
   ```

## 🚀 How to Use

### 1. Start the Application
```bash
npm run dev
```

### 2. Test the Integration

#### Option A: Use Current Location
1. Click the **navigation icon button** next to "Start Location"
2. Allow browser location access when prompted
3. Your current address will be automatically filled

#### Option B: Enter Addresses Manually
1. Enter a start location (e.g., "Times Square, New York")
2. Enter a destination (e.g., "Central Park, New York")

#### Find Routes
1. Set your travel time (defaults to 21:00 / 9 PM)
2. Click **"Find Safe Routes"**
3. Wait for the map to load and routes to be analyzed

### 3. View Results
- **Map Display**: See up to 3 routes visualized on the map
- **Safety Analysis**: Read AI-generated safety explanations
- **Route Comparison**: Compare routes by safety score, distance, and duration
- **Route Selection**: Click on any route card to highlight it on the map

## 📋 Features Breakdown

### Google Maps Service (`src/services/googleMaps.ts`)
- `initMap()`: Initializes the map with custom dark styling
- `geocodeAddress()`: Converts addresses to coordinates
- `getRoutes()`: Fetches up to 3 alternative routes
- `getCurrentLocation()`: Gets user's current location
- `highlightRoute()`: Highlights selected route on map
- `clearRoutes()`: Clears all routes from map

### Gemini AI Service (`src/services/gemini.ts`)
- `analyzeRouteSafety()`: Analyzes a single route for safety
- `analyzeMultipleRoutes()`: Analyzes all routes in parallel
- `isConfigured()`: Checks if Gemini API key is set
- Fallback analysis when API is not configured

### SafeRoute Component (`src/pages/SafeRoute.tsx`)
- Real-time route fetching and display
- Interactive map integration
- AI-powered safety analysis display
- Loading states and error handling
- Toast notifications for user feedback

## 🔧 Technical Details

### Dependencies Installed
- `@googlemaps/js-api-loader`: Google Maps JavaScript API loader
- `@google/generative-ai`: Gemini AI SDK
- `@types/google.maps`: TypeScript definitions for Google Maps

### API Endpoints Used
- **Google Maps Directions API**: For route calculation
- **Google Maps Geocoding API**: For address conversion
- **Gemini Pro API**: For AI-powered safety analysis

### Environment Variables
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDWS4pnDGpzZcTDS5dXJUcgxZBmXsMfeeA
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 🐛 Troubleshooting

### Map Not Loading
- Check that Google Maps API key is valid
- Ensure you have enabled the following APIs in Google Cloud Console:
  - Maps JavaScript API
  - Directions API
  - Geocoding API
  - Places API

### No Routes Found
- Verify both start and destination addresses are valid
- Try using more specific addresses (include city/state)
- Check browser console for error messages

### Gemini AI Not Working
- Ensure you've added your Gemini API key to `.env`
- Restart the development server after adding the key
- Check that the API key is valid and has proper permissions
- The app will use fallback analysis if Gemini is not configured

### Current Location Not Working
- Allow location access in your browser
- Check that you're using HTTPS or localhost
- Some browsers block geolocation on HTTP sites

## 📊 Safety Score Calculation

### Base Score (Google Maps)
- Route complexity and number of steps
- Warnings from Google Maps
- Route order preference

### AI-Enhanced Score (Gemini)
- Time of day analysis
- Foot traffic patterns
- Lighting conditions
- Commercial vs residential areas
- Community safety feedback

### Score Ranges
- **80-95**: Very safe (Green/Teal indicator)
- **60-79**: Moderately safe (Yellow indicator)
- **50-59**: Use with caution (Gray indicator)

## 🎯 Next Steps

1. **Add your Gemini API key** to enable full AI analysis
2. **Test with real addresses** in your area
3. **Try different times** to see how analysis changes
4. **Use current location** for real-world testing
5. **Compare routes** to understand safety differences

## 📝 Notes

- The app works without Gemini API key (uses fallback analysis)
- Google Maps API key is already configured and working
- All routes are calculated for walking mode
- Safety analysis considers nighttime travel by default
- Map uses custom dark theme matching SafeRoute design

## 🔗 Useful Links

- [Google Maps Platform](https://developers.google.com/maps)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Gemini API Key](https://makersuite.google.com/app/apikey)
