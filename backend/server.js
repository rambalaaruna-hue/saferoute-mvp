// backend/server.js

const express = require('express');
const cors = require('cors'); // Allow frontend to fetch data
const { getSafetyLevel, getRouteSafetyExplanation } = require('./gemini');

const app = express();
const port = 3000;

// Enable JSON and CORS
app.use(express.json());
app.use(cors());

// Endpoint to get safety info
app.get('/api/safety', (req, res) => {
  res.json({
    safetyLevel: getSafetyLevel(),
    explanation: getRouteSafetyExplanation()
  });
});

// Optional endpoint to submit incident reports
app.post('/api/incident', (req, res) => {
  const { location, description } = req.body;
  console.log("Incident reported:", location, description);
  res.json({ message: "Incident received successfully!" });
});

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
