# 🔧 Google Maps + Gemini Integration - Complete Fix Guide

## 🎯 Problem Analysis

Based on the code review, here's what I found:

### Current Setup:
✅ **Google Maps API Key**: Configured in `.env`
✅ **Gemini API Key**: Configured in `.env` (same key - this is the issue!)
✅ **Script Loading**: Proper callback-based loading with duplicate prevention
✅ **Service Isolation**: Gemini and Google Maps are in separate services
✅ **Error Handling**: Try-catch blocks in place
✅ **Demo Mode Fallback**: Automatic fallback to MockMap

### ⚠️ CRITICAL ISSUE FOUND:

**Both APIs are using the SAME API key!**

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg
VITE_GEMINI_API_KEY=AIzaSyCo3cnR4Yk0cx4yHqK2_T699cZmsc_TRGg
```

**This is WRONG!** Google Maps and Gemini require **different API keys** from **different services**:

- **Google Maps API Key**: From Google Cloud Console → APIs & Services
- **Gemini API Key**: From Google AI Studio (makersuite.google.com)

## 🚨 Root Cause

The error "Oops! Something went wrong" happens because:

1. **Wrong API Key Type**: Using a Gemini API key for Google Maps (or vice versa)
2. **API Not Enabled**: The key doesn't have Maps JavaScript API enabled
3. **Billing Not Enabled**: Google Maps requires billing
4. **JSON Parse Errors**: Gemini responses not properly handled

## ✅ Complete Fix

### Step 1: Get Correct API Keys

#### A. Google Maps API Key

1. **Go to**: https://console.cloud.google.com/
2. **Create/Select Project**
3. **Enable Billing** (required, but $200/month free credit)
4. **Enable APIs**:
   - Maps JavaScript API
   - Directions API
   - Places API
   - Geocoding API
5. **Create API Key**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the key (starts with `AIza...`)
6. **Configure Restrictions** (optional but recommended):
   - Application restrictions: HTTP referrers
   - Add: `http://localhost:5173/*`
   - API restrictions: Select the 4 APIs above

#### B. Gemini API Key

1. **Go to**: https://makersuite.google.com/app/apikey
2. **Click**: "Get API Key" or "Create API Key"
3. **Select**: Your Google Cloud project (or create new)
4. **Copy**: The API key (starts with `AIza...` but different from Maps key)

### Step 2: Update .env File

```env
VITE_APP_ID=app-8epuucigeyv5

# Google Maps API Key (from Google Cloud Console)
VITE_GOOGLE_MAPS_API_KEY=AIzaSy_YOUR_MAPS_KEY_HERE

# Gemini API Key (from Google AI Studio)
VITE_GEMINI_API_KEY=AIzaSy_YOUR_GEMINI_KEY_HERE
```

**IMPORTANT**: These MUST be different keys!

### Step 3: Verify API Key Setup

#### Test Google Maps Key:

Open: `http://localhost:5173/simple-test.html`

Expected result:
- ✅ Map loads successfully
- ✅ No errors in console
- ✅ Can see map tiles

If you see errors:
- `InvalidKeyMapError` → Wrong key or not enabled
- `ApiNotActivatedMapError` → API not enabled in Cloud Console
- `BillingNotEnabledMapError` → Billing not enabled

#### Test Gemini Key:

Run this in browser console on your app:
```javascript
fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=YOUR_GEMINI_KEY', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: 'Hello' }] }]
  })
})
.then(r => r.json())
.then(console.log)
```

Expected result:
- ✅ JSON response with generated text
- ✅ No 403 or 401 errors

### Step 4: Enhanced Error Handling

The code already has good error handling, but let's add more detailed logging:

#### Update googleMaps.ts:

Add this after line 66:
```typescript
console.log('Loading Google Maps with API key:', GOOGLE_MAPS_API_KEY.substring(0, 10) + '...');
console.log('Key length:', GOOGLE_MAPS_API_KEY.length);
console.log('Key starts with AIza:', GOOGLE_MAPS_API_KEY.startsWith('AIza'));
```

#### Update gemini.ts:

Add this in the constructor:
```typescript
if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  console.log('Gemini API configured');
  console.log('Key length:', GEMINI_API_KEY.length);
  console.log('Key starts with AIza:', GEMINI_API_KEY.startsWith('AIza'));
  this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
} else {
  console.warn('Gemini API not configured - using fallback analysis');
}
```

### Step 5: Improved Gemini JSON Parsing

The current code already handles JSON parsing well, but let's make it more robust:

#### Update gemini.ts parseAnalysisResponse method:

```typescript
private parseAnalysisResponse(text: string, route: RouteData): SafetyAnalysis {
  try {
    console.log('Gemini raw response:', text.substring(0, 200) + '...');
    
    // Try to parse as JSON first (in case Gemini returns JSON)
    if (text.trim().startsWith('{')) {
      try {
        const json = JSON.parse(text);
        if (json.description && json.safetyScore) {
          return {
            description: json.description,
            highlights: json.highlights || [],
            safetyScore: json.safetyScore,
            recommendations: json.recommendations || []
          };
        }
      } catch (jsonError) {
        console.log('Not JSON format, parsing as text');
      }
    }
    
    // Parse as structured text (current implementation)
    // ... rest of the existing code
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    return this.getFallbackAnalysis(route, 0);
  }
}
```

### Step 6: Prevent Race Conditions

Ensure Gemini doesn't interfere with Maps initialization:

#### Update SafeRoute.tsx:

The current code is already good, but let's add a check:

```typescript
const handleFindRoutes = async () => {
  // ... validation code ...
  
  setIsLoadingRoutes(true);
  
  try {
    let fetchedRoutes: RouteData[];
    
    if (useDemoMode) {
      // Demo mode logic
      const mockRoutes = await mockGoogleMapsService.calculateRoutes(startLocation, destination);
      fetchedRoutes = mockRoutes.map((route: MockRouteData, index: number) => ({
        // ... conversion logic ...
      }));
    } else {
      // Ensure map is initialized before fetching routes
      if (!mapInitialized) {
        await initializeMap();
      }
      
      // Fetch routes from Google Maps
      fetchedRoutes = await googleMapsService.getRoutes(
        startLocation,
        destination,
        travelTime
      );
    }

    if (fetchedRoutes.length === 0) {
      throw new Error('No routes found');
    }

    setRoutes(fetchedRoutes);

    // Analyze routes with Gemini AI (runs AFTER routes are fetched)
    toast({
      title: 'Routes Found',
      description: 'Analyzing route safety with AI...'
    });

    // This runs independently and won't block the UI
    try {
      const analyses = await geminiService.analyzeMultipleRoutes(fetchedRoutes, travelTime);
      setSafetyAnalyses(analyses);

      // Update routes with AI-enhanced safety scores
      const updatedRoutes = fetchedRoutes.map(route => {
        const analysis = analyses.get(route.id);
        if (analysis) {
          return { ...route, safetyScore: analysis.safetyScore };
        }
        return route;
      });

      setRoutes(updatedRoutes);
      setSelectedRoute(updatedRoutes[0]);

      toast({
        title: 'Analysis Complete',
        description: `Found ${fetchedRoutes.length} route${fetchedRoutes.length > 1 ? 's' : ''} with safety analysis`,
      });
    } catch (geminiError) {
      console.error('Gemini analysis failed, using default scores:', geminiError);
      // Routes are already set, just show them without AI analysis
      setSelectedRoute(fetchedRoutes[0]);
      toast({
        title: 'Routes Found',
        description: `Found ${fetchedRoutes.length} route${fetchedRoutes.length > 1 ? 's' : ''} (AI analysis unavailable)`,
      });
    }

  } catch (error) {
    console.error('Error finding routes:', error);
    toast({
      title: 'Route Error',
      description: error instanceof Error ? error.message : 'Failed to find routes. Please check your addresses.',
      variant: 'destructive'
    });
  } finally {
    setIsLoadingRoutes(false);
  }
};
```

### Step 7: Testing Checklist

After applying fixes:

1. **Restart Dev Server**:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Open Browser Console** (F12)

3. **Check Initial Load**:
   - [ ] No errors on page load
   - [ ] Map container visible
   - [ ] "Loading map..." appears briefly
   - [ ] Map loads successfully OR demo mode activates

4. **Test Route Finding**:
   - [ ] Enter: "Times Square, New York, NY"
   - [ ] Destination: "Central Park, New York, NY"
   - [ ] Click "Find Safe Routes"
   - [ ] See "Routes Found" toast
   - [ ] See "Analyzing route safety with AI..." toast
   - [ ] See 3 routes appear
   - [ ] See "Analysis Complete" toast
   - [ ] Routes have safety scores

5. **Check Console Logs**:
   ```
   ✅ Loading Google Maps with API key: AIzaSy...
   ✅ Google Maps loaded successfully
   ✅ Gemini API configured
   ✅ Gemini raw response: DESCRIPTION: ...
   ```

6. **Test Route Selection**:
   - [ ] Click "Select Route" on any card
   - [ ] Route highlights on map
   - [ ] Safety analysis appears
   - [ ] Recommendations show

7. **Test Navigation**:
   - [ ] Click "Start Navigation"
   - [ ] Dialog opens with turn-by-turn
   - [ ] Steps are clear and detailed

### Step 8: Common Errors and Solutions

#### Error: "Oops! Something went wrong"

**Cause**: Wrong API key or APIs not enabled

**Solution**:
1. Verify you're using the correct Google Maps API key (not Gemini key)
2. Check all 4 APIs are enabled in Cloud Console
3. Verify billing is enabled
4. Test with simple-test.html

#### Error: "JSON.parse: unexpected character"

**Cause**: Gemini returning non-JSON text

**Solution**: Already handled in code - it parses structured text format

#### Error: "removeChild of null"

**Cause**: React trying to remove map container during re-render

**Solution**: Already fixed - map container is stable, not recreated

#### Error: "ApiNotActivatedMapError"

**Cause**: Maps JavaScript API not enabled

**Solution**:
1. Go to Google Cloud Console
2. APIs & Services → Library
3. Search "Maps JavaScript API"
4. Click "Enable"

#### Error: "BillingNotEnabledMapError"

**Cause**: Billing not enabled on Google Cloud project

**Solution**:
1. Go to Google Cloud Console
2. Billing → Link a billing account
3. Add payment method
4. Note: $200/month free credit, won't charge unless you exceed

#### Error: "RefererNotAllowedMapError"

**Cause**: API key restrictions blocking localhost

**Solution**:
1. Go to Google Cloud Console
2. APIs & Services → Credentials
3. Click your API key
4. Application restrictions → HTTP referrers
5. Add: `http://localhost:5173/*`
6. Save

### Step 9: Demo Mode as Backup

If you can't get Google Maps working immediately:

1. **Demo Mode works perfectly** for hackathon presentations
2. **All features functional** except real map tiles
3. **Gemini AI still works** in demo mode
4. **Professional appearance** with mock map visualization

To force demo mode:
```typescript
// In SafeRoute.tsx, change line 30:
const [useDemoMode, setUseDemoMode] = useState(true); // Force demo mode
```

### Step 10: Production Checklist

Before deploying:

- [ ] Separate API keys for Maps and Gemini
- [ ] Both keys tested and working
- [ ] Billing enabled on Google Cloud
- [ ] All 4 Maps APIs enabled
- [ ] API key restrictions configured
- [ ] Error handling tested
- [ ] Demo mode fallback tested
- [ ] Console logs cleaned up (remove debug logs)
- [ ] Documentation updated

## 📊 Architecture Overview

```
User Action: "Find Safe Routes"
         ↓
    SafeRoute.tsx
         ↓
    ┌────┴────┐
    ↓         ↓
Google Maps   Gemini AI
Service       Service
    ↓         ↓
Fetch 3       Analyze
Routes        Safety
    ↓         ↓
    └────┬────┘
         ↓
    Merge Results
         ↓
    Display to User
```

**Key Points**:
1. Google Maps runs FIRST (fetches routes)
2. Gemini runs SECOND (analyzes routes)
3. They NEVER interfere with each other
4. Each has independent error handling
5. Demo mode bypasses both

## 🎯 Summary

**The main issue**: Using the same API key for both services

**The fix**: Get separate keys from:
- Google Cloud Console (for Maps)
- Google AI Studio (for Gemini)

**The result**: Both services work independently and reliably

**The backup**: Demo mode provides full functionality without real maps

## 🚀 Quick Fix Commands

```bash
# 1. Stop server
Ctrl+C

# 2. Update .env with correct keys
# (Edit .env file manually)

# 3. Restart server
npm run dev

# 4. Test
# Open http://localhost:5173
# Try finding routes
```

## 📚 Additional Resources

- **Google Maps Setup**: See `SETUP_GOOGLE_MAPS.md`
- **Demo Mode Guide**: See `DEMO_MODE_GUIDE.md`
- **Console Errors**: See `CONSOLE_ERRORS_EXPLAINED.md`
- **Gemini Integration**: See `GEMINI_NAVIGATION_GUIDE.md`

---

**Your app architecture is solid!** The only issue is the API key configuration. Fix that, and everything will work perfectly! 🎉
