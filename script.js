document.addEventListener("DOMContentLoaded", () => {

  // Fade-in observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  // Smooth scroll
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Typing console
  const typing = document.getElementById("typing");
  if (typing) {
    const lines = [
      "Initializing neural uplink...",
      "Bypassing quantum firewall...",
      "Decrypting SOC telemetry...",
      "Matrix sync complete → ONLINE"
    ];

    let i = 0, j = 0;
    const cursor = document.querySelector('.cursor');

    function type() {
      if (j < lines[i].length) {
        typing.innerHTML += lines[i][j++];
        setTimeout(type, 40 + Math.random() * 60);
      } else {
        typing.innerHTML += "<br>";
        j = 0;
        i++;
        if (i < lines.length) setTimeout(type, 1000);
        else cursor.style.display = 'none';
      }
    }
    setTimeout(type, 800);
  }

  // Matrix rain (existing)
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -2; opacity: 0.12;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(2, 6, 23, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;
    drops.forEach((y, idx) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, idx * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[idx] = 0;
      drops[idx]++;
    });
  }
  const matrixInterval = setInterval(drawMatrix, 50);

  // Neon particles
  const pCanvas = document.createElement('canvas');
  pCanvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -1; pointer-events: none;';
  document.body.appendChild(pCanvas);
  const pCtx = pCanvas.getContext('2d');
  pCanvas.width = window.innerWidth;
  pCanvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;
  const colors = ['#00ff41', '#38bdf8', '#ff0055'];

  class Particle {
    constructor() {
      this.x = Math.random() * pCanvas.width;
      this.y = Math.random() * pCanvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.speedY = Math.random() * 0.6 - 0.3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > pCanvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > pCanvas.height) this.speedY *= -1;
    }
    draw() {
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      pCtx.fillStyle = this.color;
      pCtx.shadowBlur = 25;
      pCtx.shadowColor = this.color;
      pCtx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animateParticles() {
    pCtx.fillStyle = 'rgba(2,6,23,0.06)';
    pCtx.fillRect(0,0,pCanvas.width,pCanvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
      particles.forEach(p2 => {
        const d = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (d < 130) {
          pCtx.beginPath();
          pCtx.moveTo(p.x, p.y);
          pCtx.lineTo(p2.x, p2.y);
          pCtx.strokeStyle = p.color + '33';
          pCtx.lineWidth = 0.9;
          pCtx.stroke();
        }
      });
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  window.addEventListener('resize', () => {
    canvas.width = pCanvas.width = window.innerWidth;
    canvas.height = pCanvas.height = window.innerHeight;
  });
});
