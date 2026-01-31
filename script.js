document.addEventListener("DOMContentLoaded", () => {

  /* Fade-in animation */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  /* Console typing */
  const typing = document.getElementById("typing");
  if (typing) {
    const lines = [
      "Initializing network services...",
      "Loading firewall policies...",
      "Monitoring traffic & threats...",
      "SOC Status: OPERATIONAL"
    ];

    let i = 0, j = 0;

    function type() {
      if (j < lines[i].length) {
        typing.innerHTML += lines[i][j++];
        setTimeout(type, 40);
      } else {
        typing.innerHTML += "<br>";
        j = 0;
        i++;
        if (i < lines.length) setTimeout(type, 600);
      }
    }
    type();
  }

});
