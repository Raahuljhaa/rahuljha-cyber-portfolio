document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     FADE-IN ANIMATION
  ====================== */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  /* =====================
     TERMINAL TYPING EFFECT
  ====================== */
  const typing = document.getElementById("typing");

  if (typing) {
    const lines = [
      "Initializing network services...",
      "Loading firewall policies...",
      "Monitoring traffic & threats...",
      "Status: SECURE & OPERATIONAL"
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

/* =====================
   CONTACT FORM HANDLER
====================== */
function sendEmail(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const subject = `Portfolio Contact from ${name}`;
  const body =
    `Name: ${name}%0A` +
    `Email: ${email}%0A%0A` +
    `Message:%0A${message}`;

  window.location.href =
    `mailto:rahuljha12122@gmail.com?subject=${subject}&body=${body}`;
}
