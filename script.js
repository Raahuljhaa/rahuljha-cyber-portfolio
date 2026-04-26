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

  // ==================== LOOPING TYPING ANIMATION FOR PAYLOAD ====================
  function startPayloadTyping() {
    const textarea = document.getElementById('message');
    const cursor = document.getElementById('payload-cursor');
    const payloadGroup = document.querySelector('.payload-group');

    if (!textarea) return;

    const samplePayload = `Write here your message to transmit...

Example:
I want to discuss a freelance cybersecurity project.
My company needs FortiGate firewall configuration support.
Looking for SOC monitoring consultation.`;

    let i = 0;
    let isTyping = true;

    function type() {
      if (i < samplePayload.length && isTyping) {
        textarea.value += samplePayload[i];
        i++;

        // Random glitch effect
        if (Math.random() < 0.08) {
          textarea.value += ['█', '▓', '▒'][Math.floor(Math.random() * 3)];
          setTimeout(() => {
            textarea.value = textarea.value.slice(0, -1);
          }, 60);
        }

        textarea.scrollTop = textarea.scrollHeight;
        setTimeout(type, Math.random() * 35 + 25);
      } else {
        // Finished typing - pause then restart loop
        payloadGroup.classList.add('typed');
        if (cursor) cursor.style.display = 'none';

        setTimeout(() => {
          // Reset and start again
          textarea.value = '';
          i = 0;
          payloadGroup.classList.remove('typed');
          if (cursor) cursor.style.display = 'inline';
          type(); // Restart the typing loop
        }, 2800); // Pause 2.8 seconds before restarting
      }
    }

    // Start the first typing cycle
    setTimeout(type, 800);
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
