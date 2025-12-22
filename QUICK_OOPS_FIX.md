# 🚀 QUICK DIAGNOSTIC - "Oops" Error Fix

## 30-Second Quick Check

### 1. Open Browser Console (F12)
Look for any of these errors:

```
❌ Google Maps API not available
❌ Map container not found  
❌ Directions service not initialized
❌ REQUEST_DENIED
```

### 2. If you see errors → Try These Fixes (in order):

| Error | Quick Fix |
|-------|-----------|
| **Any error** | Hard refresh: **Ctrl+Shift+R** |
| **Still failing** | Restart dev server: **Ctrl+C**, then `npx vite --host` |
| **Still failing** | Check `.env` has API key, restart server again |
| **Still failing** | Go to Google Cloud → enable "Directions API" |
| **Still failing** | Use Demo Mode (checkbox below hero) |

### 3. If errors mention "domain" or "REQUEST_DENIED"
Go to Google Cloud Console:
1. Find your API key
2. Under "Application restrictions" → add `localhost:5173/*`
3. Wait 5 mins, hard refresh (Ctrl+Shift+R)

---

## What You Should See

✅ **Correct flow:**
```
Map loads → No errors in console
Click "Find Routes" → See 3 colored routes on map
→ "Routes Found" toast appears
→ "Analysis Complete" toast after 10 seconds
```

❌ **Wrong flow:**
```
Click "Find Routes" → Red error in console
→ "Oops" dialog appears
→ Map disappears or blurs
```

---

## The Fastest Fix (Most Common Issue)

**99% of the time, this works:**

1. **Hard refresh page**: `Ctrl+Shift+R`
2. **If still broken**: Restart server:
   - Stop: `Ctrl+C`
   - Start: `npx vite --host`
3. **If still broken**: Check Google Cloud Console
   - Add `localhost:5173/*` to domain restrictions
   - Enable "Directions API"

---

## Demo Mode Fallback

If nothing works, use Demo Mode:
1. Find checkbox below hero section (says "Use Demo Mode")
2. Toggle it ON ✓
3. Click "Find Routes"
4. Routes display on mock map
5. This confirms the issue is API-related

---

## Key Numbers to Know

| Item | Time |
|------|------|
| API key restriction update | 5-10 minutes |
| Dev server restart | 10 seconds |
| Hard refresh | 1 second |
| Map initialization | < 1 second |
| Route finding | 2-5 seconds |
| Gemini analysis | 5-15 seconds |

---

## Action If All Else Fails

📄 Read detailed guide: **OOPS_ERROR_FIX.md**

It has:
- Complete error patterns to look for
- Network debugging steps
- All Google Cloud fixes
- Success indicators

---

**Status**: All fixes committed to GitHub ✅

Try the quick fixes above first! Most issues are solved by restarting the dev server and hard refreshing.
