document.getElementById("check-route").addEventListener("click", () => {
  const safetyLevel = document.getElementById("safety-level");
  const explanation = document.getElementById("ai-explanation");

  safetyLevel.innerHTML =
    '<span class="material-icons">warning</span> Moderate Risk';

  explanation.textContent =
    "This route has low street lighting and limited pedestrian movement after 10 PM. Consider an alternative route or travel with caution.";
});
