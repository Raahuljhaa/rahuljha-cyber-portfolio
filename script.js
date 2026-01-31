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

console.log("SOC Portfolio Animations Loaded");
const text = [
  "Initializing SOC monitoring...",
  "Loading firewall logs...",
  "Analyzing network traffic...",
  "SOC Status: OPERATIONAL"
];

let line = 0;
let char = 0;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (!typingElement) return;

  if (char < text[line].length) {
    typingElement.innerHTML += text[line][char];
    char++;
    setTimeout(typeEffect, 50);
  } else {
    typingElement.innerHTML += "<br>";
    char = 0;
    line++;
    if (line < text.length) {
      setTimeout(typeEffect, 500);
    }
  }
}

typeEffect();
