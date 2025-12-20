document.getElementById("check-route").addEventListener("click", async () => {
  const safetyLevel = document.getElementById("safety-level");
  const explanation = document.getElementById("ai-explanation");

  safetyLevel.innerHTML =
    '<span class="material-icons">hourglass_top</span> Analyzing...';
  explanation.textContent = "AI is analyzing route safety...";

  // Simulated API delay
  setTimeout(() => {
    safetyLevel.innerHTML =
      '<span class="material-icons">warning</span> Moderate Risk';
    explanation.textContent =
      "This route has low street lighting and limited pedestrian activity after 10 PM. Consider alternate routes or sharing live location.";
  }, 1200);
});
