<p align="center">
  <img src="https://via.placeholder.com/1200x400/020617/00ff41?text=RAHUL+JHA+–+CYBER+NEURAL+INTERFACE" alt="Rahul Jha Cyber Portfolio Banner" width="100%"/>
  <br><br>
  <img src="https://img.shields.io/badge/STATUS-ONLINE-success?style=for-the-badge&logo=cyberpunk&logoColor=00ff41&color=00ff41">
  <img src="https://img.shields.io/badge/THEME-CYBERPUNK-ff0055?style=for-the-badge&logo=neovim&logoColor=ff0055">
  <img src="https://img.shields.io/badge/DEPLOY-GitHub%20Pages-38bdf8?style=for-the-badge&logo=githubpages&logoColor=38bdf8">
</p>

<h1 align="center">Rahul Jha – Cyber Security & Network Engineer</h1>

<p align="center">
  <strong>FortiGate • SOC • Incident Response • Ethical Hacking • Arista SDN • Proxmox</strong><br>
  <em>Defending the perimeter. Hunting in the shadows. Matrix online.</em>
</p>

<p align="center">
  <a href="https://raahuljhaa.github.io/rahuljha-cyber-portfolio/" target="_blank">
    <img src="https://img.shields.io/badge/LIVE%20DEMO-ACCESS%20TERMINAL-00ff41?style=for-the-badge&logo=vercel&logoColor=000000&color=00ff41">
  </a>
  <a href="https://github.com/Raahuljhaa/rahuljha-cyber-portfolio">
    <img src="https://img.shields.io/badge/REPOSITORY-CLONE%20NOW-ff0055?style=for-the-badge&logo=github&logoColor=white">
  </a>
</p>

---

### 🌐 LIVE SSH CONSOLE (Realtime Terminal)

```html
<div style="background:#000; border:2px solid #00ff41; border-radius:8px; padding:15px; font-family:monospace; color:#00ff41; max-width:800px; margin:20px auto; box-shadow:0 0 30px #00ff41;">
  <div style="color:#ff0055; margin-bottom:8px;">root@neural-grid:~# <span style="animation:blink 1s infinite;">█</span></div>
  <div id="demo-terminal" style="height:180px; overflow:hidden; white-space:pre; font-size:14px; line-height:1.5;"></div>
</div>

<script>
const terminal = document.getElementById('demo-terminal');
const commands = [
  "Initializing secure tunnel...",
  "Connecting to FortiGate-100F [OK]",
  "nmap -sV -O 192.168.1.0/24",
  "Discovered: 47 hosts | 12 open ports",
  "ssh root@perimeter-node",
  "whoami && cat /etc/shadow | grep root",
  "SOC Alert: SYN Flood detected → Mitigated",
  "Metasploit > use exploit/multi/http/struts2",
  "Payload delivered. Root access granted.",
  "Matrix sync complete → Neural uplink stable"
];

let line = 0;
function typeCommand() {
  terminal.innerHTML = '';
  let i = 0;
  const cmd = commands[line % commands.length];
  
  function type() {
    if (i < cmd.length) {
      terminal.innerHTML += cmd[i++];
      setTimeout(type, 30 + Math.random()*40);
    } else {
      terminal.innerHTML += '<br><span style="color:#38bdf8;">$ </span>';
      setTimeout(() => {
        line++;
        typeCommand();
      }, 1800);
    }
  }
  type();
}
typeCommand();
</script>
<style>
@keyframes blink { 50% { opacity: 0; } }
</style>
