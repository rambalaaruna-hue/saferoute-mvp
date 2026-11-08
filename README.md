# SafeRoute 🛡️
### AI-Assisted Navigation for Safer Travel

SafeRoute is a safety-focused route recommendation application designed to help users compare alternative routes and make more informed travel decisions, especially during night-time journeys.

The application uses OpenStreetMap, Leaflet and OpenRouteService for map visualization, location search and route calculation. It also incorporates route safety scoring, colour-coded route comparisons and AI-assisted safety analysis.

## ✨ Key Features

### 🗺️ Interactive Maps and Route Navigation
- Interactive maps using OpenStreetMap and Leaflet.
- Location search and suggestions using OpenStreetMap Nominatim.
- Route calculation using OpenRouteService.
- Display of route distances and estimated travel times.
- Multiple route suggestions where supported by the routing service.

### 🚦 Multiple Transportation Modes
The application provides four transportation options:

- 🚶 Walking
- 🏍️ Two-Wheeler
- 🚗 Car
- 🚌 Public Transport

### 🛡️ Route Safety Analysis
- Safety scores for generated routes.
- Comparison of alternative routes based on calculated safety scores.
- Identification of the safest and fastest available routes.
- Colour-coded route visualization:
  - 🟢 Green – Safest Route
  - 🟡 Yellow – Moderate Safety
  - 🟠 Orange – Lowest Safety Score

### 🤖 AI-Assisted Safety Insights
- Google Gemini AI integration for safety-related insights.
- Fallback analysis when Gemini API configuration is unavailable.

### 🚨 Emergency Support
- SOS and emergency-support functionality retained from the original application.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Interactive Maps | Leaflet, React Leaflet |
| Map Data | OpenStreetMap |
| Geocoding | OpenStreetMap Nominatim |
| Route Calculation | OpenRouteService |
| AI Integration | Google Gemini AI |
| Authentication | Firebase |
| Package Manager | pnpm |

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- pnpm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/rambalaaruna-hue/saferoute-mvp.git
```

### 2. Navigate to the project directory

```bash
cd saferoute-mvp
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of the project.

Add the required API configuration:

```env
VITE_OPENROUTESERVICE_API_KEY=your_openrouteservice_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Configure the required Firebase environment variables referenced in:

```text
src/config/firebase.ts
```

Obtain API keys from their respective developer platforms.

**Security Note:** Never upload your `.env` file, private credentials or service-account keys to GitHub.

### 5. Start the development server

```bash
pnpm dev
```

Open the local URL displayed in your terminal to access SafeRoute.

### 6. Create a production build

```bash
pnpm build
```

## ⚠️ Current Limitations

- Route distances and travel times are estimates and may differ from actual journeys.
- Two-wheeler routing currently uses the available driving route profile with an adjusted travel-time estimate.
- Public transport currently uses a temporary road-routing fallback. Genuine bus and auto/toto routing is not yet implemented.
- OpenRouteService's alternative-route functionality has a 100 km restriction for the current public API configuration. Longer journeys may return only one route.
- Travel-time adjustments are experimental and do not represent live traffic information.
- Safety scores are application-generated estimates and do not guarantee real-world safety.
- Gemini AI insights and Firebase functionality require valid API and project configuration.

## 👩‍💻 Developer

**Aruna Rambala**

- GitHub: [rambalaaruna-hue](https://github.com/rambalaaruna-hue)

## 🙏 Acknowledgements

This project is a modified fork of the original [SafeRoute repository by barnikbasu](https://github.com/barnikbasu/saferoute-mvp).

This fork includes modifications and enhancements, including:

- Replacing Google Maps integration with OpenStreetMap and Leaflet.
- Integrating OpenRouteService for route calculation.
- Implementing location search using OpenStreetMap Nominatim.
- Adding safety-based route colour visualization.
- Introducing adjusted travel-time estimates.

Original project components are acknowledged and remain attributable to their respective author.

Please refer to the original repository regarding permissions and licensing of its source code.

---

**SafeRoute – Making travel decisions more safety-aware.** 🛡️