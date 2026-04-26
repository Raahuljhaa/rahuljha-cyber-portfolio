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

  // ==================== SMART PAYLOAD TYPING ANIMATION ====================
  let typingInterval = null;
  let isUserTyping = false;

  function startPayloadTyping() {
    const textarea = document.getElementById('message');
    const cursor = document.getElementById('payload-cursor');
    const payloadGroup = document.querySelector('.payload-group');

    if (!textarea) return;

    const samplePayload = `Write here your message to transmit...

Example:
Hello Rahul,
I am interested in your FortiGate SD-WAN and SOC expertise.
Can we discuss a project involving firewall hardening and incident response setup?
Looking forward to your thoughts.`;

    let i = 0;

    function type() {
      if (isUserTyping || i >= samplePayload.length) return;

      textarea.value += samplePayload[i];
      i++;

      textarea.classList.add('typing-active');

      if (Math.random() < 0.12) {
        const glitch = ['█', '▓', '▒', '░'][Math.floor(Math.random() * 4)];
        textarea.value += glitch;
        setTimeout(() => textarea.value = textarea.value.slice(0, -1), 60);
      }

      textarea.scrollTop = textarea.scrollHeight;
      typingInterval = setTimeout(type, Math.random() * 30 + 20);
    }

    // Start typing
    typingInterval = setTimeout(type, 900);

    // STOP TYPING & CLEAR when user clicks or focuses on the box
    textarea.addEventListener('focus', () => {
      isUserTyping = true;
      clearTimeout(typingInterval);
      textarea.value = '';                    // Clear the demo text
      textarea.classList.remove('typing-active');
      if (cursor) cursor.style.display = 'none';
    });

    // Optional: Allow user to restart demo if they delete everything
    textarea.addEventListener('input', () => {
      if (textarea.value.trim() === '') {
        isUserTyping = false;
        if (cursor) cursor.style.display = 'inline';
      }
    });
  }

  startPayloadTyping();

  // Form Submit Handler
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
