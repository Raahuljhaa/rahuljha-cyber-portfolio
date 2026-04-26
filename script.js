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

  // ==================== ULTIMATE LOOPING + MIND-BLOWING PAYLOAD ANIMATION ====================
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

        // Activate extreme glow while typing
        textarea.classList.add('typing-active');

        // Random intense glitch bursts
        if (Math.random() < 0.13) {
          const glitchChars = ['█', '▓', '▒', '░', '■', '◆'];
          textarea.value += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          setTimeout(() => {
            textarea.value = textarea.value.slice(0, -1);
          }, 65);
        }

        textarea.scrollTop = textarea.scrollHeight;
        setTimeout(type, Math.random() * 28 + 18);
      } else {
        // Cycle complete
        textarea.classList.remove('typing-active');
        payloadGroup.classList.add('typed');
        if (cursor) cursor.style.display = 'none';

        setTimeout(() => {
          textarea.value = '';
          i = 0;
          payloadGroup.classList.remove('typed');
          if (cursor) cursor.style.display = 'inline';
          type();                    // Infinite loop
        }, 2600);
      }
    }

    setTimeout(type, 1000);
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
