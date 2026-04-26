document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for fade-ins and progress bars
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.querySelector('.bar')) {
          const bar = entry.target.querySelector('.bar');
          bar.style.width = bar.dataset.progress + '%';
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in, .skill-card').forEach(el => observer.observe(el));

  // Enhanced Typing Console
  const typing = document.getElementById("typing") || document.createElement("span");
  if (typing) {
    const lines = [
      "NEURAL UPLINK ESTABLISHED...",
      "FORTIGATE SYNC: COMPLETE",
      "SOC SENSORS: ACTIVE",
      "THREAT HUNTING MODULE ONLINE",
      "ETHICAL HACKING PROTOCOLS LOADED → MATRIX READY"
    ];
    let i = 0, j = 0;
    function type() {
      if (j < lines[i].length) {
        typing.innerHTML += lines[i][j++];
        setTimeout(type, 35 + Math.random() * 40);
      } else {
        typing.innerHTML += "<br>";
        j = 0; i++;
        if (i < lines.length) setTimeout(type, 900);
      }
    }
    setTimeout(type, 800);
  }

  // Multi-layer Matrix Rain (more intense)
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:-2;opacity:0.22;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&*';
  const fontSize = 16;
  let columns = canvas.width / fontSize;
  let drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(2,6,23,0.085)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += (Math.random() > 0.92 ? 1.8 : 1);
    }
  }
  setInterval(drawMatrix, 42);

  // Neon Particles with mouse interaction
  const pCanvas = document.createElement('canvas');
  pCanvas.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;pointer-events:none;';
  document.body.appendChild(pCanvas);
  const pCtx = pCanvas.getContext('2d');
  resize(); // reuse

  let particles = [];
  const colors = ['#00ff41', '#38bdf8', '#ff0055', '#a855f7'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * pCanvas.width;
      this.y = Math.random() * pCanvas.height;
      this.size = Math.random() * 4 + 1.5;
      this.speedX = Math.random() * 1.4 - 0.7;
      this.speedY = Math.random() * 1.4 - 0.7;
      this.color = colors[Math.floor(Math.random()*colors.length)];
    }
    update(mx, my) {
      this.x += this.speedX;
      this.y += this.speedY;

      const dx = mx - this.x;
      const dy = my - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 220 && dist > 10) {
        this.speedX += (dx / dist) * 0.12;
        this.speedY += (dy / dist) * 0.12;
      }

      if (this.x < 0 || this.x > pCanvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > pCanvas.height) this.speedY *= -1;
    }
    draw() {
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      pCtx.fillStyle = this.color;
      pCtx.shadowBlur = 35;
      pCtx.shadowColor = this.color;
      pCtx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function animateParticles() {
    pCtx.fillStyle = 'rgba(2,6,23,0.08)';
    pCtx.fillRect(0,0,pCanvas.width,pCanvas.height);

    particles.forEach(p => {
      p.update(mouseX, mouseY);
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Fake realtime stats
  const threatEl = document.getElementById('threat-level');
  const packetEl = document.getElementById('packet-count');
  let threatStage = 0;
  const threats = ["NOMINAL", "MONITORED", "ELEVATED", "CRITICAL"];
  setInterval(() => {
    threatStage = (threatStage + 1) % threats.length;
    threatEl.textContent = threats[threatStage];
    threatEl.style.color = threatStage > 1 ? '#ff0055' : '#00ff41';

    let pkts = (1.1 + Math.random()*0.8).toFixed(1);
    packetEl.textContent = pkts + "M";
  }, 3800);

  // Form feedback
  const form = document.querySelector('.contact');
  if (form) {
    form.addEventListener('submit', (e) => {
      setTimeout(() => {
        alert("TRANSMISSION SENT. AWAITING ACKNOWLEDGMENT FROM THE GRID...");
      }, 600);
    });
  }
});
