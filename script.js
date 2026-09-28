document.addEventListener("DOMContentLoaded", () => {
    // === 1. LOGIN ELEMENTS TARGETING ===
    const loginForm = document.getElementById("loginForm");
    const authContainer = document.querySelector(".auth-container");
    const mainContent = document.getElementById("mainContent");
    const loginBtn = document.getElementById("loginBtn");
    const spinner = loginBtn ? loginBtn.querySelector(".spinner") : null;
    const btnText = loginBtn ? loginBtn.querySelector(".btn-text") : null;

    const togglePassword = document.querySelector(".toggle-password");
    const passwordInput = document.getElementById("loginPassword");

    // --- Hide / Show Password Click ---
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            togglePassword.classList.toggle("fa-eye");
            togglePassword.classList.toggle("fa-eye-slash");
        });
    }

    // --- Login Form Logic ---
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailInput = document.getElementById("loginEmail").value.trim();
            const passwordInputVal = passwordInput.value.trim();

            // Error alerts clear karein
            document.querySelectorAll(".error-text").forEach(err => err.style.display = "none");

            // Validations
            if (!emailInput) {
                document.getElementById("loginEmail").nextElementSibling.style.display = "block";
                return;
            }

            if (passwordInputVal.length < 4) {
                document.getElementById("loginPassword").parentElement.querySelector(".error-text").style.display = "block";
                return;
            }

            // Processing State Update
            if (spinner) spinner.classList.remove("hidden");
            if (btnText) btnText.textContent = "DECRYPTING...";
            if (loginBtn) loginBtn.disabled = true;

            setTimeout(() => {
                // Exact validation match: Username: admin | Password: 1234
                if (emailInput === "admin@8318" && passwordInputVal === "@8318") {
                    // Hidden auth window and bring up target panels
                    if (authContainer) authContainer.style.display = "none";
                    if (mainContent) {
                        mainContent.style.display = "block";
                        // Body style updates for global display simulation layout
                        document.body.style.display = "block";
                        document.body.style.background = "#000";
                    }

                    // Matrix Animation initialization dynamic trigger
                    initMatrixRain();
                } else {
                    alert("⚠️ ACCESS DENIED: Invalid Username or Password!");
                    if (spinner) spinner.classList.add("hidden");
                    if (btnText) btnText.textContent = "LOGIN";
                    if (loginBtn) loginBtn.disabled = false;
                }
            }, 1200);
        });
    }
});

// === 2. CANVASES AND MATRIX GENERATION ENGINE ===
let matrixInterval = null;
function initMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixChars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890XYZ#$@!%";
    const alphabet = matrixChars.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(draw, 30);
}

// === 3. OPERATIONS INTERCEPT SIMULATORS ===
const terminal = document.getElementById('terminal');
const terminalPane = document.getElementById('terminal-pane');
const nodeList = document.getElementById('node-list');
const liveDataStream = document.getElementById('live-data-stream');

let audioEnabled = false;
let audioCtx = null;
let targetName = "NODE_ALPHA_CORE";

function enableAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    audioEnabled = !audioEnabled;
    const audioBtn = document.getElementById('audio-btn');
    if (audioBtn) {
        audioBtn.innerText = audioEnabled ? "AUDIO: ON" : "AUDIO: OFF";
        audioBtn.style.background = audioEnabled ? "#003300" : "transparent";
    }
}

function playBeep(freq, duration) {
    if (!audioEnabled || !audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { }
}

async function startInfiltration() {
    const targetInput = document.getElementById('target-input');
    const inputVal = targetInput ? targetInput.value.trim() : "";
    if (inputVal !== "") targetName = inputVal;

    if (document.getElementById('setup-box')) document.getElementById('setup-box').style.display = 'none';
    if (document.getElementById('dashboard')) document.getElementById('dashboard').style.display = 'flex';
    if (document.getElementById('sys-status')) document.getElementById('sys-status').innerText = "BREACHING_ACTIVE";

    let cpuLoad = 0;
    const cpuInterval = setInterval(() => {
        const cpuLabel = document.getElementById('cpu-load');
        if (cpuLabel && cpuLoad <= 94) {
            cpuLoad += Math.floor(Math.random() * 8) + 2;
            cpuLabel.innerText = `${cpuLoad}%`;
        } else {
            clearInterval(cpuInterval);
        }
    }, 400);

    startSidePanelsSimulation();
    runUltimateSimulator();
}

function startSidePanelsSimulation() {
    if (!nodeList || !liveDataStream) return;
    nodeList.innerHTML = "";
    liveDataStream.innerHTML = "";

    setInterval(() => {
        const sysStatus = document.getElementById('sys-status');
        if (sysStatus && sysStatus.innerText === "BREACHING_ACTIVE") {
            const nodeDiv = document.createElement('div');
            const statusType = Math.random() > 0.4 ? "<span style='color:#0ff'>HOOKED</span>" : "<span style='color:#ff3333'>BYPASSED</span>";
            nodeDiv.innerHTML = `[TARGET_GRID] 10.88.${Math.floor(Math.random() * 254)}:${Math.floor(Math.random() * 9000)} >> ${statusType}`;
            nodeList.appendChild(nodeDiv);
            if (nodeList.children.length > 12) nodeList.removeChild(nodeList.firstChild);
            nodeList.scrollTop = nodeList.scrollHeight;
        }
    }, 600);

    setInterval(() => {
        const sysStatus = document.getElementById('sys-status');
        if (sysStatus && sysStatus.innerText === "BREACHING_ACTIVE") {
            const dataDiv = document.createElement('div');
            dataDiv.innerHTML = `TRFR_BLOCK // STACK_${Math.floor(Math.random() * 899 + 100)} // PARITY_OK // DUMP_HEX`;
            liveDataStream.appendChild(dataDiv);
            if (liveDataStream.children.length > 12) liveDataStream.removeChild(liveDataStream.firstChild);
            liveDataStream.scrollTop = liveDataStream.scrollHeight;
        }
    }, 400);
}

function createLine() {
    const line = document.createElement('div');
    line.style.margin = "4px 0";
    line.style.fontFamily = "monospace";
    line.style.color = "#00ff33";
    if (terminal) terminal.appendChild(line);
    return line;
}

function printFastHexLines(count) {
    return new Promise((resolve) => {
        let current = 0;
        const interval = setInterval(() => {
            if (current >= count) {
                clearInterval(interval);
                resolve();
            } else {
                let hexLine = createLine();
                hexLine.style.fontSize = "0.75rem";
                let randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
                hexLine.innerHTML = `[CORE_DUMP] 0x${randomHex} -- STRK_VECTOR_OFS_${Math.floor(Math.random() * 899 + 100)} -- COM_OK`;
                if (terminalPane) terminalPane.scrollTop = terminalPane.scrollHeight;
                playBeep(1200, 0.008);
                current++;
            }
        }, 20);
    });
}

function animatePasswordCracker(element, finalPassword, duration = 2000) {
    return new Promise((resolve) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789X#\$@!%";
        let startTime = Date.now();

        const interval = setInterval(() => {
            let elapsedTime = Date.now() - startTime;
            if (elapsedTime >= duration) {
                clearInterval(interval);
                element.innerHTML = `> KEY DECRYPTION SUCCESSFUL: [ <span style="color:#00ff00;">${finalPassword}</span> ]`;
                resolve();
            } else {
                let randomStr = "";
                for (let i = 0; i < finalPassword.length; i++) {
                    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                element.innerHTML = `> OVERRIDING ENCRYPTION HASH: [ ${randomStr} ]`;
                playBeep(1400, 0.01);
            }
        }, 40);
    });
}

function typeWriter(text, element, speed = 20) {
    return new Promise((resolve) => {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                if (i % 4 === 0) playBeep(800, 0.015);
                setTimeout(type, speed);
                if (terminalPane) terminalPane.scrollTop = terminalPane.scrollHeight;
            } else {
                resolve();
            }
        }
        type();
    });
}

const randomDelay = (min, max) => new Promise(resolve => setTimeout(resolve, (Math.floor(Math.random() * (max - min + 1)) + min) * 1000));

async function runUltimateSimulator() {
    let line;

    line = createLine(); await typeWriter(`> INITIALIZING EXPLOIT PIPELINE ON VECTOR: ${targetName}...`, line);
    await randomDelay(1, 2);

    line = createLine(); await typeWriter("> SENDING HANDSHAKE STRATEGIES TO REMOTES...", line);
    await printFastHexLines(25);

    line = createLine(); window.crackTargetEl = line;
    await animatePasswordCracker(window.crackTargetEl, "SYS_ADM_BYPASS_KEY_8318", 2500);

    line = createLine(); await typeWriter("> INJECTING OVERFLOW PARITY STRINGS TO SYSTEM BUFFER...", line);
    await printFastHexLines(40);

    line = createLine(); await typeWriter("> FINALIZING PAYLOAD ESCALATION CORRUPTIONS...", line);
    await randomDelay(1, 1.5);

    if (document.getElementById('dashboard')) document.getElementById('dashboard').style.display = 'none';
    if (document.getElementById('sys-status')) document.getElementById('sys-status').innerText = "BREACH_SUCCESS";

    const finalTargetLabel = document.getElementById('final-target');
    if (finalTargetLabel) finalTargetLabel.innerText = targetName;

    if (document.getElementById('access-screen')) document.getElementById('access-screen').style.display = 'block';
    playBeep(600, 0.4);
}
