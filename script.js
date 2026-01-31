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

  /* Smooth Scroll for Nav */
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* Enhanced Console Typing */
  const typing = document.getElementById("typing");
  if (typing) {
    const lines = [
      "Initializing neural network...",
      "Decrypting firewall protocols...",
      "Scanning for intrusions... [SECURE]",
      "Portfolio Matrix: ONLINE"
    ];

    let i = 0, j = 0;
    const cursor = document.querySelector('.cursor');

    function type() {
      if (j < lines[i].length) {
        typing.innerHTML += lines[i][j++];
        setTimeout(type, 50 + Math.random() * 50); // Variable speed for "hacker" feel
      } else {
        typing.innerHTML += "<br>";
        j = 0;
        i++;
        if (i < lines.length) setTimeout(type, 800);
        else cursor.style.display = 'none'; // End blink
      }
    }
    type();
  }

  /* Futuristic: Simple Matrix Rain Background (Canvas) */
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -2; opacity: 0.1;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;
    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(draw, 50);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

});
