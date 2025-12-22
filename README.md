# SafePath 🌙 - Women's Safety Navigation MVP

![Status](https://img.shields.io/badge/Status-MVP_Ready-success)
![Tech](https://img.shields.io/badge/Google-Gemini_AI-blue)
![Tech](https://img.shields.io/badge/Firebase-Hosted-orange)

### 🚀 [Click Here to View Live Demo](https://YOUR-PROJECT-ID.web.app)
*(Replace the link above with your actual Firebase URL)*

---

### 🧐 Problem Statement
Women often feel unsafe traveling at night due to poorly lit roads, deserted areas, and a lack of real-time environmental data. Standard navigation apps prioritize speed over safety, leaving a gap in personal security tools.

### 💡 Solution
**SafePath** is a web application that bridges this gap. It calculates walking routes and utilizes **Google Gemini AI** to assess the environmental safety of the path based on location context. It also features a **community-driven incident reporting system** to warn users of specific dangers like poor lighting or harassment hotspots in real-time.

---

### 🛠️ Google Technologies Used
We integrated the following Google tools to build this solution:

1.  **Google Maps Platform:**
    * **Maps JavaScript API:** To render the dark-mode map interface.
    * **Places API:** For accurate start/destination search (Autocomplete).
    * **Directions API:** To calculate the walking path geometry.
2.  **Google AI (Gemini):**
    * **Model:** `gemini-1.5-flash`
    * **Integration:** Used via the Client SDK to analyze route textual summaries and generate a "Safety Score" (1-10) with advisory tips.
3.  **Firebase:**
    * **Firestore:** Real-time NoSQL database to store and retrieve user-reported incidents.
    * **Hosting:** Fast and secure deployment of the web app.

---

### 🤖 AI Implementation Details
We use Generative AI to provide context that static maps cannot.
* **Input:** The app extracts the route summary (e.g., "Via Industrial Area Rd") and step-by-step instructions from the Maps API response.
* **Processing:** This text is sent to Gemini with a system prompt acting as a "Night Safety Consultant."
* **Output:** A JSON response containing a **Safety Score** and a **Contextual Advisory** (e.g., "This area has low commercial activity at night; proceed with caution").

---

### 💻 How to Run Locally

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/safepath-mvp.git](https://github.com/your-username/safepath-mvp.git)
    ```

2.  **Configure API Keys**
    * Open `frontend/script.js` and `frontend/index.html`.
    * Replace `YOUR_GOOGLE_MAPS_API_KEY`, `YOUR_GEMINI_API_KEY`, and `YOUR_FIREBASE_CONFIG` with your actual credentials.

3.  **Run the App**
    * You can simply open `index.html` in your browser.
    * *Optional:* Run via Firebase local server:
        ```bash
        firebase serve
        ```

---

### 📂 Project Structure
```text
/
├── index.html           # Main UI (Dark Mode)
├── styles.css           # Styling
├── script.js            # Main Logic (Maps + UI)
├── firebase.json        # Hosting Configuration
├── firebase/
│   └── config.js        # Database Connection
└── services/
    └── gemini.js        # AI Logic Integration
