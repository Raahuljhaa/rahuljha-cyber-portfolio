document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     FADE-IN ANIMATION
  ========================== */
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 0.15}s`;
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
  });

  /* =========================
     SOC CONSOLE TYPING EFFECT
  ========================== */
  const typingElement = document.getElementById("typing");

  if (typingElement) {
    const lines = [
      "Initializing SOC monitoring...",
      "Loading firewall logs...",
      "Analyzing network traffic...",
      "Checking endpoint security...",
      "SOC Status: OPERATIONAL"
    ];

    let lineIndex = 0;
    let charIndex = 0;

    function typeLine() {
      if (charIndex < lines[lineIndex].length) {
        typingElement.innerHTML += lines[lineIndex][charIndex];
        charIndex++;
        setTimeout(typeLine, 45);
      } else {
        typingElement.innerHTML += "<br>";
        charIndex = 0;
        lineIndex++;

        if (lineIndex < lines.length) {
          setTimeout(typeLine, 500);
        }
      }
    }

    typeLine();
  }

  console.log("SOC Portfolio Fully Loaded");

});
