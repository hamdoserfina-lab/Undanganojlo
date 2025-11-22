// 1. Inisialisasi AOS
AOS.init({ duration: 1000, once: true });

// 2. Variabel Global UI
const cover = document.getElementById("cover");
const mainContent = document.getElementById("main-content");
const navbar = document.getElementById("navbar");
const musicControl = document.getElementById("music-control");
const audio = document.getElementById("bg-music");
const musicIcon = document.getElementById("music-icon");
let isPlaying = false;

// 3. Logika URL Parameter
function getGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get("to");
    const displayGuest = document.getElementById("guest-name-cover");
    const inputNama = document.getElementById("nama");
    if (guestName) {
        displayGuest.innerText = guestName;
        inputNama.value = guestName;
    }
}
getGuestName();

// 4. Fungsi Buka Undangan
function bukaUndangan() {
    const btn = document.querySelector('.btn-open');
    const cover = document.getElementById('cover');
    const canvasExplosion = document.getElementById('explosion-canvas');
    
    // Setup Confetti (Ledakan Awal Tetap Solid biar Kelihatan Jelas)
    const myConfetti = confetti.create(canvasExplosion, { resize: true });
    const rect = btn.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    // Warna Ledakan (Solid)
    const blastColors = ['#d4af37', '#f3e5ab', '#ffffff'];

    myConfetti({
        particleCount: 200, // Jumlah ledakan
        spread: 100,
        origin: { x: x, y: y },
        colors: blastColors,
        shapes: ['circle'],
        scalar: 0.8,
        gravity: 0.8,
        ticks: 400,
        disableForReducedMotion: true,
        zIndex: 20001 
    });

    // Musik
    musicControl.style.opacity = "1";
    playMusic();

    // Transisi Cover
    setTimeout(() => {
        cover.classList.add("hidden");
        document.body.style.overflow = "auto";
        mainContent.style.display = "block";
        navbar.style.display = "flex";
        
        setTimeout(() => { AOS.refresh(); }, 500);
        
        // MULAI HUJAN (Versi Halus)
        loadUcapan();
        initParticles(); 
        
        // TIMER 15 DETIK: Stop Hujan
        setTimeout(() => { stopRain(); }, 15000);

        setTimeout(() => { myConfetti.reset(); }, 4000);
    }, 800); 
}

// 5. Musik Logic
function playMusic() {
    audio.play().catch(e => console.log("Autoplay blocked"));
    isPlaying = true;
    musicControl.classList.add("spin");
}
function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicControl.classList.remove("spin");
        musicIcon.classList.replace("bi-music-note-beamed", "bi-pause-fill");
    } else {
        audio.play();
        musicControl.classList.add("spin");
        musicIcon.classList.replace("bi-pause-fill", "bi-music-note-beamed");
    }
    isPlaying = !isPlaying;
}

// 6. Tab Mempelai
function switchMempelai(name) {
    const tabs = document.querySelectorAll('.avatar-btn'); 
    const contents = document.querySelectorAll('.mempelai-content');
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    if (name === 'dyah') {
        tabs[0].classList.add('active');
        document.getElementById('content-dyah').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('content-aji').classList.add('active');
    }
}

// 7. Countdown
const weddingDate = new Date("Dec 15, 2025 08:00:00").getTime();
const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown-box").innerHTML = "<p style='color:#d4af37;'>Acara Telah Selesai</p>";
    }
}, 1000);

// 8. Copy Text
function copyText(text) {
    navigator.clipboard.writeText(text).then(
        () => { showToast("Berhasil Disalin!"); },
        () => { alert("Gagal salin: " + text); }
    );
}
function showToast(msg) {
    const toast = document.getElementById("copy-toast");
    toast.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${msg}`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ============================================
   GLOBAL RAIN PARTICLE SYSTEM (VERSI SOFT / GHOST)
   ============================================ */
const canvas = document.getElementById("gold-particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
let isRainingActive = true;

// [UPDATE] PALET WARNA TRANSPARAN (RGBA)
// Angka terakhir (0.4) adalah tingkat transparansi. Semakin kecil = semakin pudar.
const dustPalette = [
    'rgba(212, 175, 55, 0.5)',   // Emas Tua (50% Transparan)
    'rgba(243, 229, 171, 0.4)',  // Emas Muda (40% Transparan)
    'rgba(255, 255, 255, 0.2)'   // Putih (20% Transparan - Sangat Tipis)
];

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function stopRain() {
    isRainingActive = false; 
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height; 
        
        // [UPDATE] UKURAN DIPERKECIL (0.5px sampai 2.5px)
        this.size = Math.random() * 2 + 0.5; 
        
        this.color = dustPalette[Math.floor(Math.random() * dustPalette.length)];
        this.speedY = Math.random() * 1.5 + 0.5; 
        this.speedX = Math.random() * 0.5 - 0.25; 
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        if (this.y > canvas.height) {
            if (isRainingActive) {
                this.y = 0 - this.size; 
                this.x = Math.random() * canvas.width;
                this.speedY = Math.random() * 1.5 + 0.5;
            }
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    isRainingActive = true;
    particlesArray = [];
    // [UPDATE] JUMLAH DIKURANGI SEDIKIT AGAR TIDAK SUMPEK
    for (let i = 0; i < 100; i++) { 
        particlesArray.push(new Particle());
    }
    animateParticles();
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

/* ============================================
   3D TILT (HERO ONLY)
   ============================================ */
const tiltBox = document.querySelector('.tilt-box');
const tiltCard = document.getElementById('tilt-card');
const tiltGlare = document.getElementById('tilt-glare');

if (window.matchMedia("(min-width: 768px)").matches && tiltBox) {
    tiltBox.addEventListener('mousemove', (e) => {
        const rect = tiltBox.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;

        tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        const glareX = ((x / rect.width) * 100);
        const glareY = ((y / rect.height) * 100);
        tiltGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3), rgba(255,255,255,0))`;
        tiltGlare.style.opacity = '1';
    });
    tiltBox.addEventListener('mouseleave', () => {
        tiltCard.style.transform = `rotateX(0) rotateY(0)`;
        tiltGlare.style.opacity = '0';
    });
}

/* ============================================
   FIREBASE UCAPAN LOGIC
   ============================================ */
function kirimUcapan(e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const kehadiran = document.getElementById("kehadiran").value;
    const pesan = document.getElementById("pesan").value;
    const btn = document.querySelector(".btn-kirim");
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Mengirim...';

    db.collection("ucapan").add({
        nama: nama, kehadiran: kehadiran, pesan: pesan,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        showToast("Terima Kasih, Ucapan Terkirim!");
        document.getElementById("rsvpForm").reset();
        getGuestName();
    }).catch(error => { console.error("Error:", error); alert("Gagal mengirim ucapan."); })
    .finally(() => { btn.disabled = false; btn.innerHTML = originalText; });
}

function loadUcapan() {
    const list = document.getElementById("comments-list");
    if(!list) return;
    db.collection("ucapan").orderBy("timestamp", "desc").limit(20).onSnapshot(snapshot => {
        let html = "";
        if (snapshot.empty) { html = '<div class="loading-text">Belum ada ucapan. Jadilah yang pertama!</div>'; } 
        else {
            snapshot.forEach(doc => {
                const data = doc.data();
                let timeString = "";
                if (data.timestamp) {
                    const date = data.timestamp.toDate();
                    timeString = date.toLocaleDateString("id-ID") + " " + date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
                }
                let statusClass = data.kehadiran.includes("Tidak") ? "Tidak" : "Hadir";
                html += `<div class="comment-item">
                    <div class="comment-header"><span class="c-name">${escapeHtml(data.nama)}</span><span class="c-status ${statusClass}">${data.kehadiran}</span></div>
                    <p class="c-message">${escapeHtml(data.pesan)}</p><span class="c-time">${timeString}</span>
                </div>`;
            });
        }
        list.innerHTML = html;
    });
}
function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
