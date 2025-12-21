// script.js
// Import from your new folders
import { db, collection, addDoc, getDocs } from "./firebase/config.js";
import { getRouteSafetyAnalysis } from "./backend/gemini.js";

// Global Variables
let map, directionsService, directionsRenderer;

// 1. Initialize Map
window.initMap = async function() {
    const defaultLoc = { lat: 28.6139, lng: 77.2090 }; // Change to your city

    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLoc,
        zoom: 14,
        disableDefaultUI: true,
        styles: [ 
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] }
        ]
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "#00e676", strokeWeight: 5 }
    });

    // Setup Autocomplete
    new google.maps.places.Autocomplete(document.getElementById("start-input"));
    new google.maps.places.Autocomplete(document.getElementById("end-input"));

    // Load Reports from Firebase
    loadSafetyIncidents();
};

// 2. Routing Logic
document.getElementById("find-route-btn").addEventListener("click", () => {
    const start = document.getElementById("start-input").value;
    const end = document.getElementById("end-input").value;

    if (!start || !end) return alert("Please enter both locations.");

    directionsService.route(
        { origin: start, destination: end, travelMode: google.maps.TravelMode.WALKING },
        async (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
                
                // --- CALLING YOUR NEW BACKEND FILE ---
                const route = response.routes[0];
                const summary = route.summary;
                const steps = route.legs[0].steps.map(s => s.instructions.replace(/<[^>]*>?/gm, '')).join(" ").substring(0, 300);
                
                // Show "Thinking..." state
                document.getElementById("ai-insight").classList.remove("hidden");
                document.getElementById("ai-text").innerText = "Consulting AI...";
                
                // Call the function from gemini.js
                const safetyData = await getRouteSafetyAnalysis(summary, steps);
                
                // Update UI
                const scoreBadge = document.getElementById("safety-score");
                scoreBadge.innerText = `${safetyData.score}/10`;
                document.getElementById("ai-text").innerText = safetyData.advisory;
                
                // Color logic
                scoreBadge.style.background = safetyData.score > 7 ? "#00e676" : (safetyData.score > 4 ? "#ffea00" : "#ff3d00");
                
            } else {
                alert("Route not found.");
            }
        }
    );
});

// 3. Reporting Logic (Using imports from firebase/config.js)
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
        alert("Report Submitted!");
        document.getElementById("report-modal").classList.add("hidden");
        loadSafetyIncidents();
    } catch (e) {
        console.error("Firebase Error:", e);
    }
});

async function loadSafetyIncidents() {
    const querySnapshot = await getDocs(collection(db, "incidents"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        new google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map: map,
            title: data.type,
            icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        });
    });
}

// 4. SOS Button
document.getElementById("sos-btn").addEventListener("click", () => {
    alert("SOS TRIGGERED: Sending Location to Emergency Contacts...");
});
