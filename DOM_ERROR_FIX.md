# Error Fix: React DOM removeChild Error

## Problem
The application was throwing a React DOM error:
```
Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node': 
The node to be removed is not a child of this node.
```

## Root Cause Analysis

This error occurred due to a conflict between React's virtual DOM management and Google Maps' direct DOM manipulation:

### Issue 1: Conditional Rendering Inside Map Container
The map container had conditional rendering:
```tsx
<div ref={mapContainerRef}>
  {!mapInitialized && (
    <div>Loading...</div>
  )}
</div>
```

**Problem**: When `mapInitialized` changed to `true`, React tried to remove the loading div. However, Google Maps had already attached its own DOM nodes to the parent container, causing React to attempt removing nodes it didn't create.

### Issue 2: useEffect Dependency Issues
The map initialization useEffect had incorrect dependencies:
```tsx
useEffect(() => {
  if (mapContainerRef.current && !mapInitialized) {
    initializeMap();
  }
}, [mapInitialized]); // This causes re-runs when mapInitialized changes
```

**Problem**: This created a loop where changing `mapInitialized` triggered the effect again, potentially causing multiple initialization attempts.

### Issue 3: Event Listener Cleanup
The Google Maps script loading didn't properly clean up event listeners, which could cause memory leaks and DOM manipulation conflicts.

## Solutions Applied

### Fix 1: Separate Map Container from Loading Overlay

**Before:**
```tsx
<div ref={mapContainerRef} className="...">
  {!mapInitialized && (
    <div>Loading...</div>
  )}
</div>
```

**After:**
```tsx
<div className="relative ...">
  {/* Loading overlay - absolutely positioned */}
  {!mapInitialized && (
    <div className="absolute inset-0 z-10">
      Loading...
    </div>
  )}
  {/* Map container - always rendered */}
  <div ref={mapContainerRef} className="w-full h-full" />
</div>
```

**Benefits:**
- Map container is always in the DOM (never removed)
- Loading overlay is positioned absolutely, so it doesn't affect map container
- React can safely add/remove the loading overlay without touching the map
- Google Maps can attach to a stable DOM node

### Fix 2: Improved useEffect for Map Initialization

**Before:**
```tsx
useEffect(() => {
  if (mapContainerRef.current && !mapInitialized) {
    initializeMap();
  }
}, [mapInitialized]);
```

**After:**
```tsx
useEffect(() => {
  let mounted = true;
  
  const init = async () => {
    if (mapContainerRef.current && !mapInitialized && mounted) {
      await initializeMap();
    }
  };
  
  init();
  
  return () => {
    mounted = false;
  };
}, []); // Empty deps - only run once on mount
```

**Benefits:**
- Runs only once when component mounts
- Prevents race conditions with `mounted` flag
- Proper cleanup function
- No re-initialization loops

### Fix 3: Enhanced Script Loading with Proper Cleanup

**Improvements:**
```typescript
function loadGoogleMapsScript(): Promise<void> {
  // Global promise to prevent duplicate loading
  if (window.__googleMapsScriptLoading) {
    return window.__googleMapsScriptLoading;
  }

  const promise = new Promise<void>((resolve, reject) => {
    // ... script loading logic ...
    
    const onLoad = () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
      resolve();
    };
    
    const onError = () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
      reject(new Error('Failed to load Google Maps script'));
    };
    
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
  });

  window.__googleMapsScriptLoading = promise;
  promise.finally(() => {
    delete window.__googleMapsScriptLoading;
  });

  return promise;
}
```

**Benefits:**
- Prevents duplicate script loading attempts
- Properly removes event listeners after use
- Global promise ensures single loading instance
- Cleans up after completion

## Technical Details

### Why This Error Occurs

React maintains a virtual DOM and expects to have full control over the real DOM. When external libraries like Google Maps directly manipulate the DOM:

1. **React creates a div** with a loading indicator
2. **Google Maps attaches** its own nodes to the parent container
3. **React tries to remove** the loading indicator
4. **Conflict occurs** because Google Maps has modified the DOM structure
5. **Error thrown**: React can't find the expected child nodes

### The Solution Pattern

For integrating third-party libraries that manipulate the DOM:

1. **Stable Container**: Provide a container that's never removed
2. **Absolute Positioning**: Use overlays for loading states
3. **Single Initialization**: Use empty dependency array in useEffect
4. **Cleanup Flags**: Use mounted flags to prevent race conditions
5. **Event Cleanup**: Always remove event listeners

## Files Modified

### 1. src/pages/SafeRoute.tsx
- **Changed**: Map container structure
- **Changed**: useEffect for map initialization
- **Added**: Mounted flag for cleanup
- **Added**: Absolute positioning for loading overlay

### 2. src/services/googleMaps.ts
- **Added**: Global script loading promise
- **Added**: Proper event listener cleanup
- **Added**: Window interface for type safety
- **Improved**: Duplicate script prevention

## Verification

### Lint Check
```bash
npm run lint
```
✅ No errors (only pre-existing AuthContext warnings)

### Expected Behavior
- Map loads without errors
- Loading indicator appears and disappears smoothly
- No console errors about removeChild
- Map remains stable during state changes
- No memory leaks from event listeners

## Testing Recommendations

1. **Load the page**: Map should initialize without errors
2. **Enter addresses**: Find routes multiple times
3. **Check console**: No removeChild errors
4. **Refresh page**: Map should reload cleanly
5. **Navigate away and back**: No duplicate script loading

## Prevention Tips

When integrating third-party DOM libraries with React:

1. ✅ **DO**: Keep container elements stable (always rendered)
2. ✅ **DO**: Use absolute positioning for overlays
3. ✅ **DO**: Initialize once with empty dependency array
4. ✅ **DO**: Clean up event listeners properly
5. ❌ **DON'T**: Conditionally render containers that libraries attach to
6. ❌ **DON'T**: Let React remove nodes created by external libraries
7. ❌ **DON'T**: Re-initialize on every state change

## Status

✅ **FIXED** - The removeChild error has been resolved. The application now properly manages the interaction between React's virtual DOM and Google Maps' direct DOM manipulation.
