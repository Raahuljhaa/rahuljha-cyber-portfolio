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

  // Typing Animation for Transmission Payload
  function startPayloadTyping() {
    const textarea = document.getElementById('message');
    const cursor = document.getElementById('payload-cursor');
    const payloadGroup = document.querySelector('.payload-group');

    if (!textarea) return;

    const samplePayload = `TARGET: CORPORATE_FIREWALL_47
EXPLOIT: SQL_INJECTION + BUFFER_OVERFLOW
VECTOR: 192.168.1.100:443
PAYLOAD: exec('whoami && cat /etc/passwd')
STATUS: ACCESS_GRANTED → ROOT
EXTRACTION: CREDENTIALS + SENSITIVE_DOCS

TRANSMISSION COMPLETE. AWAITING YOUR ORDERS.`;

    let i = 0;
    textarea.value = '';

    function typeChar() {
      if (i < samplePayload.length) {
        textarea.value += samplePayload[i];
        i++;

        if (Math.random() < 0.12) {
          textarea.value += ['█', '▓', '▒', '░'][Math.floor(Math.random() * 4)];
          setTimeout(() => textarea.value = textarea.value.slice(0, -1), 80);
        }

        textarea.scrollTop = textarea.scrollHeight;
        setTimeout(typeChar, Math.random() * 30 + 25);
      } else {
        payloadGroup.classList.add('typed');
        if (cursor) cursor.style.display = 'none';
      }
    }

    setTimeout(typeChar, 1200);
  }

  startPayloadTyping();

  // Form Submit with Cyber Effect
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
