document.addEventListener("DOMContentLoaded", () => {
  // Existing observer, smooth scroll, etc. (keep them)

  // === ENHANCED TYPING WITH GLITCH ===
  const typing = document.getElementById("typing");
  if (typing) {
    const lines = [
      "NEURAL UPLINK ESTABLISHED...",
      "FORTIGATE 100F SYNC COMPLETE",
      "SOC TELEMETRY STREAM ACTIVE",
      "THREAT VECTORS: NEUTRALIZED",
      "MATRIX INTEGRITY: 99.87% → ONLINE"
    ];
    let i = 0, j = 0;
    const cursor = document.querySelector('.cursor');

    function type() {
      if (j < lines[i].length) {
        let char = lines[i][j++];
        if (Math.random() < 0.08) char = ['#','%','@','_','?'][Math.floor(Math.random()*5)]; // glitch
        typing.innerHTML += char;
        setTimeout(type, 30 + Math.random() * 50);
      } else {
        typing.innerHTML += "<br>";
        j = 0; i++;
        if (i < lines.length) {
          setTimeout(() => { typing.innerHTML += "<span class='glitch-char'>█</span>"; setTimeout(type, 800); }, 600);
        } else {
          cursor.style.display = 'none';
        }
      }
    }
    setTimeout(type, 600);
  }

  // === MATRIX RAIN (Enhanced) ===
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -2; opacity: 0.18;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&';
  const fontSize = 15;
  let columns = canvas.width / fontSize;
  let drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, idx) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, idx * fontSize, y * fontSize);
      
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[idx] = 0;
      drops[idx] += Math.random() > 0.95 ? 2 : 1; // variable speed
    });
  }
  setInterval(drawMatrix, 45);

  // === NEON PARTICLES + MOUSE INTERACTION ===
  const pCanvas = document.createElement('canvas');
  pCanvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -1; pointer-events: none;';
  document.body.appendChild(pCanvas);
  const pCtx = pCanvas.getContext('2d');
  resizeCanvas(); // reuse function

  let particles = [];
  const particleCount = 80;
  const colors = ['#00ff41', '#38bdf8', '#ff0055', '#a855f7'];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * pCanvas.width;
      this.y = Math.random() * pCanvas.height;
      this.size = Math.random() * 3.5 + 1;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.speedY = Math.random() * 1.2 - 0.6;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.life = 1;
    }
    update(mouseX, mouseY) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 0.002;

      // Mouse attraction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 250 && dist > 0) {
        this.speedX += dx / dist * 0.08;
        this.speedY += dy / dist * 0.08;
      }

      if (this.x < 0 || this.x > pCanvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > pCanvas.height) this.speedY *= -1;
      if (this.life <= 0) this.reset();
    }
    draw() {
      pCtx.save();
      pCtx.globalAlpha = this.life;
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      pCtx.fillStyle = this.color;
      pCtx.shadowBlur = 30;
      pCtx.shadowColor = this.color;
      pCtx.fill();
      pCtx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateParticles() {
    pCtx.fillStyle = 'rgba(2,6,23,0.07)';
    pCtx.fillRect(0,0,pCanvas.width,pCanvas.height);

    particles.forEach((p, i) => {
      p.update(mouseX, mouseY);
      p.draw();

      // Connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const d = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (d < 140) {
          pCtx.beginPath();
          pCtx.moveTo(p.x, p.y);
          pCtx.lineTo(p2.x, p2.y);
          pCtx.strokeStyle = p.color + '22';
          pCtx.lineWidth = 0.8;
          pCtx.stroke();
        }
      }
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Fake realtime threat level
  const threatEl = document.getElementById('threat-level');
  const threats = ['NOMINAL', 'ELEVATED', 'CRITICAL', 'NOMINAL'];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % threats.length;
    threatEl.textContent = threats[idx];
    threatEl.style.color = idx === 2 ? '#ff0055' : '#00ff41';
  }, 4500);

  // Progress bars animation
  const bars = document.querySelectorAll('.bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.progress + '%';
      }
    });
  }, { threshold: 0.6 });
  bars.forEach(bar => observer.observe(bar));

  // Form success feedback
  const form = document.querySelector('.contact');
  if (form) {
    form.addEventListener('submit', () => {
      setTimeout(() => {
        alert("SIGNAL TRANSMITTED. AWAITING RESPONSE FROM THE GRID...");
      }, 800);
    });
  }
});
