document.addEventListener("DOMContentLoaded", () => {

  // Fade-in observer + Progress bars
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const bar = entry.target.querySelector('.bar');
        if (bar) bar.style.width = bar.dataset.progress + '%';
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in, .skill-card').forEach(el => observer.observe(el));

  // Realtime Threat Level & Packets
  const threatEl = document.getElementById('threat-level');
  const packetEl = document.getElementById('packet-count');
  const threats = ["NOMINAL", "MONITORED", "ELEVATED", "CRITICAL"];
  let threatStage = 0;

  setInterval(() => {
    threatStage = (threatStage + 1) % threats.length;
    threatEl.textContent = threats[threatStage];
    threatEl.style.color = threatStage > 1 ? '#ff0055' : '#00ff41';
    
    let pkts = (1.1 + Math.random() * 0.8).toFixed(1);
    packetEl.textContent = pkts + "M";
  }, 3800);

  // ==================== ENHANCED MATRIX RAIN + SCANNING BACKGROUND ====================
  // Matrix Rain
  const matrixCanvas = document.createElement('canvas');
  matrixCanvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -3; opacity: 0.18; pointer-events: none;';
  document.body.appendChild(matrixCanvas);
  const mCtx = matrixCanvas.getContext('2d');

  function resizeCanvas() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&*';
  const fontSize = 15;
  let columns = matrixCanvas.width / fontSize;
  let drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    mCtx.fillStyle = 'rgba(2, 6, 23, 0.08)';
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    mCtx.fillStyle = '#00ff41';
    mCtx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += Math.random() > 0.9 ? 1.6 : 1;
    }
  }
  setInterval(drawMatrix, 45);

  // Secure Communication Scanning Lines (Horizontal Radar Scan)
  const scanCanvas = document.createElement('canvas');
  scanCanvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -2; opacity: 0.25; pointer-events: none;';
  document.body.appendChild(scanCanvas);
  const sCtx = scanCanvas.getContext('2d');
  resizeCanvas(); // reuse function for both canvases

  let scanY = 0;
  let scanSpeed = 3;

  function drawScanLines() {
    sCtx.clearRect(0, 0, scanCanvas.width, scanCanvas.height);

    // Main scanning beam
    sCtx.strokeStyle = 'rgba(0, 255, 65, 0.6)';
    sCtx.lineWidth = 2;
    sCtx.shadowBlur = 25;
    sCtx.shadowColor = '#00ff41';

    sCtx.beginPath();
    sCtx.moveTo(0, scanY);
    sCtx.lineTo(scanCanvas.width, scanY);
    sCtx.stroke();

    // Faint trailing glow
    sCtx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    sCtx.lineWidth = 6;
    sCtx.beginPath();
    sCtx.moveTo(0, scanY - 8);
    sCtx.lineTo(scanCanvas.width, scanY - 8);
    sCtx.stroke();

    scanY += scanSpeed;
    if (scanY > scanCanvas.height + 100) scanY = -50; // Reset and loop continuously
  }

  setInterval(drawScanLines, 30);

  // ==================== ULTIMATE LOOPING PAYLOAD TYPING ====================
  function startPayloadTyping() {
    const textarea = document.getElementById('message');
    const cursor = document.getElementById('payload-cursor');
    const payloadGroup = document.querySelector('.payload-group');

    if (!textarea) return;

    const samplePayload = `Write here your message to transmit...

Example:
Hello Rahul,
I am interested in your FortiGate SD-WAN and SOC expertise for my company.
Can we discuss a project involving firewall hardening, incident response setup, and ethical hacking training?
Looking forward to your thoughts.

Best regards,
Corporate Client`;

    let i = 0;

    function type() {
      if (i < samplePayload.length) {
        textarea.value += samplePayload[i];
        i++;
        textarea.classList.add('typing-active');

        if (Math.random() < 0.13) {
          const glitchChars = ['█', '▓', '▒', '░', '■', '◆'];
          textarea.value += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          setTimeout(() => textarea.value = textarea.value.slice(0, -1), 65);
        }

        textarea.scrollTop = textarea.scrollHeight;
        setTimeout(type, Math.random() * 28 + 18);
      } else {
        textarea.classList.remove('typing-active');
        payloadGroup.classList.add('typed');
        if (cursor) cursor.style.display = 'none';

        setTimeout(() => {
          textarea.value = '';
          i = 0;
          payloadGroup.classList.remove('typed');
          if (cursor) cursor.style.display = 'inline';
          type();
        }, 2600);
      }
    }

    setTimeout(type, 1000);
  }

  startPayloadTyping();

  // Form Submit
  const contactForm = document.getElementById('contact-form');
  const transmitBtn = document.getElementById('transmit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      transmitBtn.style.animation = 'btn-glitch 0.8s linear';

      setTimeout(() => {
        contactForm.classList.add('success');
        alert("🚨 TRANSMISSION SENT SUCCESSFULLY\n\nPAYLOAD DELIVERED TO THE GRID.");

        setTimeout(() => {
          contactForm.classList.remove('success');
          contactForm.reset();
          transmitBtn.style.animation = '';
        }, 1800);
      }, 700);
    });
  }
});
