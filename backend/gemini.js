// Mock backend functions

// Returns a random safety level
function getSafetyLevel() {
  const levels = ["Low Risk", "Moderate Risk", "High Risk"];
  return levels[Math.floor(Math.random() * levels.length)];
}

// Returns a dummy AI explanation
function getRouteSafetyExplanation() {
  return "This route may be unsafe at night due to low lighting, few people, and past incidents reported in the area.";
}

// Export functions
module.exports = { getSafetyLevel, getRouteSafetyExplanation };
