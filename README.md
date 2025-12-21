# SafePath 🌙 - Women's Safety Navigation MVP

### Problem Statement
Women often feel unsafe traveling at night due to poorly lit roads and lack of real-time environmental data. Standard navigation apps prioritize speed over safety.

### Solution
SafePath is a web application that calculates routes and uses **Google Gemini AI** to assess the safety of the path based on location context. It also features crowdsourced incident reporting to warn users of specific dangers like poor lighting or harassment hotspots.

### Technologies Used
* **Google Maps Platform:** Maps JavaScript API, Places API, Directions API.
* **Google AI:** Gemini API (via `gemini-1.5-flash`) for real-time safety risk assessment.
* **Firebase:** Firestore (Database) & Hosting.
* **Frontend:** HTML5, CSS3, JavaScript (ES6).

### How to Run Locally
1. Clone the repo.
2. Add your API Keys in `script.js` (Google Maps & Gemini) and `firebaseConfig`.
3. Open `index.html` in a browser.

### AI Implementation
We use Gemini to process route summaries.
* **Input:** Route textual description (e.g., "Walk via Main St and Industrial Area").
* **Output:** Safety Score (1-10) and Advisory Tip.
