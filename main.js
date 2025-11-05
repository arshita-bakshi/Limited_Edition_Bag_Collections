function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

async function previewAndAnalyze() {
  const fileInput = document.getElementById("designUpload");
  const previewContainer = document.getElementById("previewContainer");
  const feedbackContainer = document.getElementById("feedbackContainer");

  previewContainer.innerHTML = "";
  feedbackContainer.innerHTML = "";

  const file = fileInput.files[0];
  if (!file) {
    feedbackContainer.innerHTML = "<p>Please upload a design image first.</p>";
    return;
  }

  // Show preview image
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.style.maxWidth = "300px";
  img.style.borderRadius = "10px";
  img.style.border = "2px solid #ccc";
  previewContainer.appendChild(img);

  // Prepare form data
  const formData = new FormData();
  formData.append("image", file);
  formData.append("description", "Luxury crochet bag design");

  try {
    const res = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    feedbackContainer.innerHTML = `
      <p><strong>Rating:</strong> ${data.rating}/10</p>
      <p><strong>Market Demand:</strong> ${data.demand}</p>
      <p><strong>Suggested Improvements:</strong> ${data.improvements}</p>
      <p><strong>Mood Board Keywords:</strong> ${data.mood}</p>
      <p><em>Use these keywords in <a href="https://www.mymap.ai/moodboard-maker" target="_blank">MyMap.AI</a> to generate your mood board.</em></p>
    `;
  } catch (error) {
    feedbackContainer.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
  }
}
