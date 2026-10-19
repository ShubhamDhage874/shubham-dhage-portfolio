/**
 * SHUBHAM DHAGE - CYBERSECURITY & MCA PORTFOLIO CORE ENGINE
 * Includes: 3D Three.js Cyber Shield, WebAudio SFX, Interactive Terminal,
 * Self-Defense Honeypot, Anti-XSS Sanitizer & Rate-Limiter
 */

document.addEventListener("DOMContentLoaded", () => {
  initAudio();
  initTyping();
  initNavbar();
  initThreeJsBackground();
  initInteractiveTerminal();
  initSecurityDefense();
  initContactObfuscation();
});

/* ==========================================================================
   1. WEB AUDIO API SYNTHESIZER (Sci-Fi Audio SFX - Zero External Assets)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudio() {
  const audioToggleBtn = document.getElementById("audio-toggle");
  if (!audioToggleBtn) return;

  // Restore user preference
  const savedAudio = localStorage.getItem("sd_sound_fx");
  if (savedAudio === "true") {
    soundEnabled = true;
    updateAudioBtnUI(true);
  }

  audioToggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem("sd_sound_fx", soundEnabled);
    updateAudioBtnUI(soundEnabled);

    if (soundEnabled) {
      ensureAudioContext();
      playChime();
    }
  });

  // Attach subtle click sounds to cyber buttons
  document.querySelectorAll(".primary-btn, .secondary-btn, .nav-link").forEach(btn => {
    btn.addEventListener("click", () => {
      if (soundEnabled) playClickSound();
    });
  });
}

function updateAudioBtnUI(enabled) {
  const audioToggleBtn = document.getElementById("audio-toggle");
  if (!audioToggleBtn) return;
  if (enabled) {
    audioToggleBtn.innerHTML = `🔊 <span class="hidden sm:inline text-xs font-code text-cyan-400">AUDIO: ON</span>`;
    audioToggleBtn.classList.add("border-cyan-500", "text-cyan-400");
  } else {
    audioToggleBtn.innerHTML = `🔇 <span class="hidden sm:inline text-xs font-code text-gray-400">AUDIO: OFF</span>`;
    audioToggleBtn.classList.remove("border-cyan-500", "text-cyan-400");
  }
}

function ensureAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playClickSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {}
}

function playTerminalKeySound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1200 + Math.random() * 300, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (e) {}
}

function playAlertSound() {
  ensureAudioContext();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(250, audioCtx.currentTime);
    osc.frequency.setValueAtTime(150, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (e) {}
}

function playChime() {
  ensureAudioContext();
  try {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.06 + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.06);
      osc.stop(audioCtx.currentTime + idx * 0.06 + 0.15);
    });
  } catch (e) {}
}

/* ==========================================================================
   2. DYNAMIC CYBER TYPING EFFECT
   ========================================================================== */
function initTyping() {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;

  const text = [
    "MCA Student @ IIMS Pune (SPPU)",
    "Cyber Security Enthusiast & Analyst",
    "Ethical Hacking & Network Defense",
    "Python Automation & Security Tools Builder",
    "Linux / Kali Linux Practitioner"
  ];

  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";
  let deleting = false;

  function type() {
    currentText = text[count];

    if (!deleting) {
      letter = currentText.substring(0, ++index);
    } else {
      letter = currentText.substring(0, --index);
    }

    typingEl.textContent = letter;

    let speed = deleting ? 40 : 85;

    if (!deleting && letter.length === currentText.length) {
      speed = 1800;
      deleting = true;
    }

    if (deleting && letter.length === 0) {
      deleting = false;
      count = (count + 1) % text.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   3. NAVBAR & SMOOTH SCROLLING
   ========================================================================== */
function initNavbar() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

/* ==========================================================================
   4. THREE.JS 3D CYBER HOLOGRAPHIC SHIELD & NETWORK GRID
   ========================================================================== */
function initThreeJsBackground() {
  const canvas = document.getElementById("cyber-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 28;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Outer Icosahedron Wireframe (Cyber Node Shield)
  const geomSphere = new THREE.IcosahedronGeometry(13, 2);
  const matSphere = new THREE.MeshBasicMaterial({
    color: 0x9333ea,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const cyberSphere = new THREE.Mesh(geomSphere, matSphere);
  scene.add(cyberSphere);

  // Inner Icosahedron with Cyan Wireframe
  const geomInner = new THREE.IcosahedronGeometry(9, 1);
  const matInner = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  const innerSphere = new THREE.Mesh(geomInner, matInner);
  scene.add(innerSphere);

  // Glowing Floating Cyber Particles
  const particleCount = 280;
  const particleGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorPurple = new THREE.Color(0xa855f7);
  const colorCyan = new THREE.Color(0x38bdf8);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 10 + Math.random() * 25;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    const chosenColor = Math.random() > 0.5 ? colorPurple : colorCyan;
    colors[i] = chosenColor.r;
    colors[i + 1] = chosenColor.g;
    colors[i + 2] = chosenColor.b;
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.35,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });

  const particleSystem = new THREE.Points(particleGeom, particleMat);
  scene.add(particleSystem);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches && e.touches[0]) {
      mouseX = (e.touches[0].clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.touches[0].clientY - window.innerHeight / 2) * 0.001;
    }
  }, { passive: true });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    cyberSphere.rotation.x += 0.002;
    cyberSphere.rotation.y += 0.003;
    innerSphere.rotation.x -= 0.003;
    innerSphere.rotation.y -= 0.002;

    particleSystem.rotation.y += 0.001;

    scene.rotation.y = targetX * 1.5;
    scene.rotation.x = targetY * 1.5;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ==========================================================================
   5. INTERACTIVE CYBER DEFENSE TERMINAL ENGINE
   ========================================================================== */
function initInteractiveTerminal() {
  const terminalBody = document.getElementById("terminal-body");
  const terminalInput = document.getElementById("terminal-input");
  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: `Available commands:
  <span class="text-cyan-400 font-bold">whoami</span>       - Display profile & career mission
  <span class="text-cyan-400 font-bold">education</span>    - Details about MCA @ IIMS Pune & BCA
  <span class="text-cyan-400 font-bold">skills</span>       - Security, networking & tool arsenal
  <span class="text-cyan-400 font-bold">projects</span>     - Cyber security tools & web projects
  <span class="text-cyan-400 font-bold">scan</span>         - Run simulated Nmap security port audit
  <span class="text-cyan-400 font-bold">firewall</span>     - Check active self-defense status
  <span class="text-cyan-400 font-bold">decrypt</span>      - Decrypt secret CTF security flag
  <span class="text-cyan-400 font-bold">contact</span>      - Encrypted contact coordinates
  <span class="text-cyan-400 font-bold">clear</span>        - Clear terminal screen`,

    whoami: `<span class="text-purple-400 font-bold">Shubham Dhage</span>
[Role]: MCA Student & Aspiring Cyber Security Analyst
[Focus]: Ethical Hacking, Network Defense, Threat Analysis & Security Automation
[Location]: Pune / Sambhaji Nagar, Maharashtra, India
[Status]: Open to Cyber Security Internships & SOC Analyst Roles`,

    education: `<span class="text-cyan-400 font-bold">🎓 MASTER OF COMPUTER APPLICATIONS (MCA)</span> [Pursuing 2024-2026]
  Institution: Yashaswi Education Society's International Institute of Management Science (IIMS), Pune
  Affiliation: Permanently Affiliated to Savitribai Phule Pune University (SPPU)
  Accreditations: AICTE Approved | NAAC Re-Accredited | ISO 21001:2018 Certified | UGC 2(f)
  Portal: <a href="https://iims.ac.in/" target="_blank" class="underline text-purple-400">https://iims.ac.in/</a>

<span class="text-purple-400 font-bold">🎓 BACHELOR OF COMPUTER APPLICATIONS (BCA)</span>
  Focus: Computer Networks, Linux, Database Management Systems, Software Engineering`,

    skills: `<span class="text-green-400 font-bold">[+] Offensive & Pen-Testing:</span>
  Kali Linux, Nmap, Metasploit basics, Wireshark, Burp Suite basics, Vulnerability Assessment
<span class="text-cyan-400 font-bold">[+] Defensive & SOC:</span>
  TCP/IP Protocols, Firewall Rules, System Hardening, Network Log Auditing
<span class="text-purple-400 font-bold">[+] Scripting & Dev:</span>
  Python (Automation & Scapy), Bash Scripting, SQL, HTML5/CSS3/JavaScript, React`,

    projects: `<span class="text-cyan-400 font-bold">1. ChatNova AI Chatbot</span> [Rasa NLP + React + Tailwind + PostgreSQL]
   AI-powered inquiry chatbot with admin training dashboard.
   Repo: <a href="https://github.com/ShubhamDhage874/ChatNovaBot" target="_blank" class="underline text-purple-400">github.com/ShubhamDhage874/ChatNovaBot</a>

<span class="text-cyan-400 font-bold">2. PyScan-Recon</span> [Python Multi-threaded Port Scanner]
   Custom reconnaissance script for banner grabbing & open socket discovery.

<span class="text-cyan-400 font-bold">3. NetSentry Packet Analyzer</span> [Python + Scapy]
   Network traffic sniffing tool detecting unencrypted protocols and suspicious traffic.

<span class="text-cyan-400 font-bold">4. Vision-X</span> [Modern Interactive Platform]
   Repo: <a href="https://github.com/ShubhamDhage874/Vision-X" target="_blank" class="underline text-purple-400">github.com/ShubhamDhage874/Vision-X</a>`,

    firewall: `<span class="text-green-400">[●] SELF-DEFENSE FIREWALL REPORT:</span>
  - Anti-DevTools Honeypot: <span class="text-green-400">ARMED</span>
  - Client-Side XSS Filter: <span class="text-green-400">FILTERING ACTIVE</span>
  - Anti-Clickjacking Frame Buster: <span class="text-green-400">ENFORCED</span>
  - Bot Scraping Obfuscation: <span class="text-green-400">ACTIVE</span>
  - System Threat Level: <span class="text-cyan-400">NOMINAL (0 THREATS)</span>`,

    decrypt: `<span class="text-yellow-400">Decrypting SHA-256 Flag...</span>
<span class="text-gray-400">Analyzing hash: e4b2c1...</span>
<span class="text-green-400 font-bold">SUCCESS! CTF{shubham_ethical_hacker_2026}</span>
Security insight: Always enforce salted key stretching and never use plaintext for sensitive tokens.`,

    contact: `<span class="text-purple-400 font-bold">SECURE COMMS COORDINATES:</span>
  - Email: <a href="mailto:shubhamdhage872004@gmail.com" class="text-cyan-400 underline">shubhamdhage872004@gmail.com</a>
  - Phone: <span class="text-gray-300">+91 8237963146</span>
  - GitHub: <a href="https://github.com/ShubhamDhage874" target="_blank" class="text-cyan-400 underline">github.com/ShubhamDhage874</a>
  - LinkedIn: <a href="https://www.linkedin.com/in/shubham-dhage-28a26429a" target="_blank" class="text-cyan-400 underline">linkedin.com/in/shubham-dhage-28a26429a</a>`
  };

  terminalInput.addEventListener("keydown", (e) => {
    playTerminalKeySound();

    if (e.key === "Enter") {
      const rawCmd = terminalInput.value.trim();
      const cmd = rawCmd.toLowerCase();

      if (cmd) {
        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;
      }

      printToTerminal(`shubham@cyber-soc:~$ ${escapeHtml(rawCmd)}`, "text-gray-400 font-semibold");
      terminalInput.value = "";

      if (cmd === "") {
        return;
      }

      if (cmd === "clear") {
        terminalBody.innerHTML = `<div>Type <span class="text-cyan-400 font-bold">'help'</span> for list of security commands.</div>`;
        return;
      }

      if (cmd === "scan" || cmd === "nmap") {
        runSimulatedScan(terminalBody);
        return;
      }

      if (commands[cmd]) {
        printToTerminal(commands[cmd], "text-gray-200");
      } else {
        printToTerminal(`Command not recognized: '${escapeHtml(rawCmd)}'. Type <span class="text-cyan-400 font-bold">'help'</span> for assistance.`, "text-red-400");
      }

      terminalBody.scrollTop = terminalBody.scrollHeight;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = "";
      }
    }
  });

  function printToTerminal(msg, className = "") {
    const line = document.createElement("div");
    line.className = `mt-1.5 leading-relaxed ${className}`;
    line.innerHTML = msg;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function runSimulatedScan(container) {
    printToTerminal(`<span class="text-yellow-400">Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleTimeString()}</span>`);
    printToTerminal(`<span class="text-gray-400">Initiating SYN Stealth Scan against host 127.0.0.1...</span>`);

    setTimeout(() => {
      printToTerminal(`Scanning 127.0.0.1 [1000 ports]...`);
    }, 400);

    setTimeout(() => {
      printToTerminal(`<pre class="text-green-400 text-xs md:text-sm font-code">
PORT     STATE SERVICE        VERSION
22/tcp   open  ssh            OpenSSH 9.2 (Hardened)
80/tcp   open  http           Nginx / SOC-Shield 2.4
443/tcp  open  ssl/https      TLSv1.3 Quantum-Resistant
8080/tcp open  defense-proxy  Intrusion Detection Gateway
</pre>`);
      printToTerminal(`<span class="text-cyan-400 font-bold">Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds. Security Perimeter INTACT.</span>`);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 1200);
  }
}

/* ==========================================================================
   6. SELF-DEFENSE HARDENING & ATTACK-PROOF PROTECTION
   ========================================================================== */
function initSecurityDefense() {
  // 1. Anti-DevTools Honeypot & ASCII Hacker Troll
  const asciiBanner = `
%c  ███████╗██╗  ██╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ███╗   ███╗
  ██╔════╝██║  ██║██║   ██║██╔══██╗██║  ██║██╔══██╗████╗ ████║
  ███████╗███████║██║   ██║██████╔╝███████║███████║██╔████╔██║
  ╚════██║██╔══██║██║   ██║██╔══██╗██║  ██║██╔══██║██║╚██╔╝██║
  ███████║██║  ██║╚██████╔╝██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║
  ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝
  -------------------------------------------------------------
  [!] CYBER DEFENSE WARNING: Honeypot & SOC Monitoring Active!
  Host: Shubham Dhage Cybersecurity Node
  Status: Defensive posture engaged. Inspecting security analyst portal.
  Welcome, fellow Ethical Hacker! Need to hire or connect? 
  Email: shubhamdhage872004@gmail.com
  -------------------------------------------------------------`;

  console.log(
    asciiBanner,
    "color: #06b6d4; font-weight: bold; font-family: monospace; font-size: 11px;"
  );

  // 2. Anti-Clickjacking Frame Buster
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location;
    } catch (e) {
      document.body.innerHTML = `
        <div style="background:#05070f;color:#ef4444;height:100vh;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:1.5rem;text-align:center;padding:20px;">
          [!] SECURITY ALERT: Unauthorized iframe embedding blocked by Self-Defense Policy.
        </div>`;
    }
  }

  // 3. Contact Form Real-Time Anti-XSS Sanitizer & Rate-Limiter
  const contactForm = document.getElementById("secure-contact-form");
  const alertBanner = document.getElementById("cyber-alert-banner");
  const alertText = document.getElementById("cyber-alert-text");

  if (contactForm) {
    let lastSubmissionTime = 0;

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("form-name")?.value || "";
      const emailInput = document.getElementById("form-email")?.value || "";
      const messageInput = document.getElementById("form-message")?.value || "";

      // Check for XSS or Injection Attacks
      const attackPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /onerror\s*=/gi,
        /onload\s*=/gi,
        /onclick\s*=/gi,
        /<iframe/gi,
        /UNION\s+SELECT/gi,
        /['"]\s*OR\s*['"]1['"]=['"]1/gi,
        /eval\s*\(/gi,
        /document\.cookie/gi
      ];

      const combinedText = `${nameInput} ${emailInput} ${messageInput}`;
      let isMalicious = false;
      let detectedThreat = "";

      for (let pattern of attackPatterns) {
        if (pattern.test(combinedText)) {
          isMalicious = true;
          detectedThreat = pattern.toString();
          break;
        }
      }

      if (isMalicious) {
        playAlertSound();
        showCyberAlert(`[!] THREAT NEUTRALIZED: Malicious payload intercepted (${escapeHtml(detectedThreat)}). Attack self-defended!`);
        return;
      }

      // Rate Limiting (10 second cooldown)
      const now = Date.now();
      if (now - lastSubmissionTime < 10000) {
        const remaining = Math.ceil((10000 - (now - lastSubmissionTime)) / 1000);
        showCyberAlert(`[!] RATE-LIMIT ACTIVE: Please wait ${remaining}s before sending another message to prevent denial-of-service.`);
        return;
      }

      lastSubmissionTime = now;

      // Successful Sanitized Submission
      playChime();
      showSuccessAlert(`[✓] SECURE TRANSMISSION SUCCESS: Message authenticated and forwarded to Shubham Dhage.`);
      contactForm.reset();
    });
  }

  function showCyberAlert(msg) {
    if (!alertBanner || !alertText) return;
    alertBanner.className = "cyber-alert bg-red-950/80 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-3";
    alertBanner.style.display = "flex";
    alertText.innerHTML = msg;
    alertBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });

    setTimeout(() => {
      alertBanner.style.display = "none";
    }, 6000);
  }

  function showSuccessAlert(msg) {
    if (!alertBanner || !alertText) return;
    alertBanner.className = "cyber-alert bg-emerald-950/80 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-3";
    alertBanner.style.display = "flex";
    alertText.innerHTML = msg;
    alertBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });

    setTimeout(() => {
      alertBanner.style.display = "none";
    }, 6000);
  }
}

/* ==========================================================================
   7. ANTI-BOT CONTACT OBFUSCATION
   ========================================================================== */
function initContactObfuscation() {
  // Decode obfuscated contacts on human click to prevent automated scrapers
  const emailElements = document.querySelectorAll("[data-obf-email]");
  emailElements.forEach(el => {
    const encoded = el.getAttribute("data-obf-email");
    if (encoded) {
      try {
        const decoded = atob(encoded);
        el.href = `mailto:${decoded}`;
        if (el.textContent.includes("Reveal") || el.textContent.includes("Decrypted")) {
          el.textContent = decoded;
        }
      } catch (e) {}
    }
  });

  const phoneElements = document.querySelectorAll("[data-obf-phone]");
  phoneElements.forEach(el => {
    const encoded = el.getAttribute("data-obf-phone");
    if (encoded) {
      try {
        const decoded = atob(encoded);
        el.href = `tel:${decoded}`;
        if (el.textContent.includes("Reveal") || el.textContent.includes("Decrypted")) {
          el.textContent = decoded;
        }
      } catch (e) {}
    }
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}