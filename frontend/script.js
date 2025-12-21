import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// 1. FIREBASE CONFIG (Get this from Firebase Console)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. GEMINI SETUP
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Global Variables
let map, directionsService, directionsRenderer;

// Initialize Map
window.initMap = async function() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.6139, lng: 77.2090 }, // Default: New Delhi
        zoom: 13,
        styles: [ // Dark mode map style
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        ]
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Setup Autocomplete
    new google.maps.places.Autocomplete(document.getElementById("start-input"));
    new google.maps.places.Autocomplete(document.getElementById("end-input"));

    loadSafetyIncidents();
};

// Route Calculation
document.getElementById("find-route-btn").addEventListener("click", () => {
    const start = document.getElementById("start-input").value;
    const end = document.getElementById("end-input").value;

    if (!start || !end) return alert("Please enter both locations");

    directionsService.route(
        { origin: start, destination: end, travelMode: google.maps.TravelMode.WALKING },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
                analyzeSafetyWithGemini(response.routes[0]);
            } else {
                alert("Directions request failed: " + status);
            }
        }
    );
});

// 3. GEMINI AI ANALYSIS
async function analyzeSafetyWithGemini(route) {
    const aiContainer = document.getElementById("ai-insight");
    aiContainer.classList.remove("hidden");
    document.getElementById("ai-text").innerText = "Consulting AI for safety check...";

    // Extract area summary from route
    const summary = route.summary; 
    const steps = route.legs[0].steps.map(s => s.instructions).join(" ").substring(0, 300); // Limit text

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    Act as a safety consultant for women traveling at night.
    Analyze this route summary: "${summary}" and these steps: "${steps}".
    1. Give a safety score from 1-10 (10 being safest).
    2. Provide a 1 sentence tip regarding lighting or crowd density for this specific type of area.
    Format: "Score: X/10. Tip: [Your tip]"
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        document.getElementById("ai-text").innerText = text;
    } catch (error) {
        console.error("Gemini Error:", error);
        document.getElementById("ai-text").innerText = "AI Safety data unavailable.";
    }
}

// 4. FIREBASE: REPORTING SYSTEM
document.getElementById("report-btn").addEventListener("click", () => {
    document.getElementById("report-modal").classList.remove("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("report-modal").classList.add("hidden");
});

document.getElementById("submit-report").addEventListener("click", async () => {
    const type = document.getElementById("issue-type").value;
    const center = map.getCenter();
    
    try {
        await addDoc(collection(db, "incidents"), {
            type: type,
            lat: center.lat(),
            lng: center.lng(),
            timestamp: new Date()
        });
        
        alert("Report submitted! Helping make maps safer.");
        document.getElementById("report-modal").classList.add("hidden");
        loadSafetyIncidents(); // Refresh map
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Load Incidents on Map
async function loadSafetyIncidents() {
    const querySnapshot = await getDocs(collection(db, "incidents"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        new google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png', // Yellow for caution
            title: `Reported: ${data.type}`
        });
    });
}

// SOS Logic
document.getElementById("sos-btn").addEventListener("click", () => {
    alert("SOS TRIGGERED: Sending location to Emergency Contacts... (Simulation)");
    // In real app: Use navigator.share or Twilio API
});
