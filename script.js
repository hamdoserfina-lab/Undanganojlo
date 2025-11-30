// 1. Variabel Global UI
const cover = document.getElementById("cover");
const mainContent = document.getElementById("main-content");
const navbar = document.getElementById("navbar");
const musicControl = document.getElementById("music-control");
const audio = document.getElementById("bg-music");
const musicIcon = document.getElementById("music-icon");
let isPlaying = false;

// 2. Logika URL Parameter (Nama Tamu)
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

// 3. Fungsi Buka Undangan (ULTRA CINEMATIC)
function bukaUndangan() {
    const btn = document.querySelector(".btn-open");
    const cover = document.getElementById("cover");
    const canvasExplosion = document.getElementById("explosion-canvas");

    // Premium Confetti Blast
    const myConfetti = confetti.create(canvasExplosion, {
        resize: true,
        useWorker: true
    });
    const rect = btn.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    const blastColors = ["#d4af37", "#f3e5ab", "#ffffff", "#ffd700"];

    // Multi-layer Confetti
    myConfetti({
        particleCount: 150,
        spread: 70,
        origin: { x: x, y: y },
        colors: blastColors,
        shapes: ["circle", "star"],
        scalar: 0.6,
        gravity: 0.8,
        ticks: 500,
        zIndex: 20001
    });

    setTimeout(() => {
        myConfetti({
            particleCount: 100,
            spread: 100,
            origin: { x: x, y: y },
            colors: blastColors,
            shapes: ["circle"],
            scalar: 0.8,
            gravity: 1,
            ticks: 400,
            zIndex: 20001
        });
    }, 150);

    // Play Music
    musicControl.style.opacity = "1";
    playMusic();

    // Cinematic Cover Exit
    const tlCoverExit = gsap.timeline();
    tlCoverExit.to(cover, {
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        duration: 2,
        ease: "power3.inOut"
    });

    // Main Content Reveal
    setTimeout(() => {
        cover.classList.add("hidden");
        document.body.style.overflow = "auto";
        mainContent.style.display = "block";
        navbar.style.display = "flex";

        // Initialize Premium Animations
        setTimeout(() => {
            initUltraPremiumAnimations();
            loadUcapan();
            initParticles();

            setTimeout(() => {
                stopRain();
            }, 10000);

            setTimeout(() => {
                myConfetti.reset();
            }, 4000);
        }, 100);
    }, 1800);
}

// 4. Musik Logic
function playMusic() {
    audio.volume = 0.7;
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

// 5. Countdown
const weddingDate = new Date("Dec 15, 2025 08:00:00").getTime();
const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown-box").innerHTML =
            "<p style='color:#d4af37;'>Alhamdulillah, We Are Married</p>";
    }
}, 1000);

// 6. Copy Text
function copyText(text) {
    navigator.clipboard.writeText(text).then(
        () => {
            showToast("Berhasil Disalin!");
        },
        () => {
            alert("Gagal salin: " + text);
        }
    );
}

function showToast(msg) {
    const toast = document.getElementById("copy-toast");
    toast.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${msg}`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// 7. Particle System (Hujan Emas)
const canvas = document.getElementById("gold-particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;
let isRainingActive = true;
// MODIFIKASI: Warna lebih solid
const dustPalette = [
    "rgba(212, 175, 55, 1.0)",
    "rgba(243, 229, 171, 0.8)",
    "rgba(255, 255, 255, 0.6)"
];

window.addEventListener("resize", function () {
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
        // MODIFIKASI: Ukuran partikel lebih besar
        this.size = Math.random() * 1.2 + 1;
        this.color =
            dustPalette[Math.floor(Math.random() * dustPalette.length)];
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.alpha = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > canvas.height && isRainingActive) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    isRainingActive = true;
    particlesArray = [];
    // MODIFIKASI: Jumlah partikel diperbanyak
    let particleCount = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
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

// 8. FIREBASE LOGIC
function kirimUcapan(e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const kehadiran = document.getElementById("kehadiran").value;
    const pesan = document.getElementById("pesan").value;
    const btn = document.querySelector(".btn-kirim");
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Mengirim...';

    db.collection("ucapan")
        .add({
            nama: nama,
            kehadiran: kehadiran,
            pesan: pesan,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            showToast("Terima Kasih, Ucapan Terkirim!");
            document.getElementById("rsvpForm").reset();
            getGuestName();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Gagal mengirim ucapan.");
        })
        .finally(() => {
            btn.disabled = false;
            btn.innerHTML = originalText;
        });
}

function loadUcapan() {
    const list = document.getElementById("comments-list");
    if (!list) return;

    db.collection("ucapan")
        .orderBy("timestamp", "desc")
        .limit(20)
        .onSnapshot(snapshot => {
            let html = "";
            if (snapshot.empty) {
                html =
                    '<div class="loading-text">Belum ada ucapan. Jadilah yang pertama!</div>';
            } else {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const nama = data.nama
                        ? escapeHtml(data.nama)
                        : "Tanpa Nama";
                    let kehadiran = data.kehadiran
                        ? escapeHtml(data.kehadiran)
                        : "Hadir";
                    let statusClass = "Hadir";

                    if (
                        kehadiran.toLowerCase().includes("tidak") ||
                        kehadiran.toLowerCase().includes("not")
                    ) {
                        statusClass = "Tidak";
                    }

                    let rawPesan =
                        data.pesan ||
                        data.message ||
                        data.ucapan ||
                        data.comment ||
                        "";
                    let pesan = rawPesan
                        ? escapeHtml(rawPesan)
                        : "<em style='color:#777'>(Tidak ada pesan)</em>";

                    html += `
                    <div class="comment-item">
                        <div class="comment-header">
                            <span class="c-name">${nama}</span>
                            <span class="c-status ${statusClass}">${kehadiran}</span>
                        </div>
                        <div class="c-message">${pesan}</div>
                    </div>`;
                });
            }
            list.innerHTML = html;
        });
}

function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* ============================================
   ULTRA PREMIUM CINEMATIC ANIMATIONS
   ============================================ */

function initUltraPremiumAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // A. HERO SECTION - SUPER FAST (INSTANT FEEL)
    const tlHero = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.8 }
    });

    tlHero.fromTo(
        ".wedding-title",
        {
            y: -30,
            opacity: 0,
            filter: "blur(5px)",
            scale: 0.95
        },
        {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1
        },
        0
    );

    tlHero.fromTo(
        ".wedding-date",
        {
            y: 20,
            opacity: 0,
            rotationX: 20
        },
        {
            y: 0,
            opacity: 1,
            rotationX: 0
        },
        0.1
    );

    tlHero.fromTo(
        ".tilt-box",
        {
            scale: 0.85,
            opacity: 0,
            rotationY: -15,
            transformPerspective: 1000
        },
        {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.2)"
        },
        0.15
    );

    tlHero.fromTo(
        ".countdown-box .timer-item",
        {
            y: 30,
            opacity: 0,
            scale: 0.9
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: "back.out(1.5)"
        },
        0.3
    );

    // B. VERSE SECTION - SACRED REVEAL
    const tlVerse = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-verse",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    });

    tlVerse.fromTo(
        ".glass-box-verse",
        {
            opacity: 0,
            scale: 0.9,
            filter: "blur(20px)",
            rotationY: -25,
            y: 100
        },
        {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            rotationY: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        }
    );

    tlVerse.fromTo(
        ".verse-decoration",
        {
            scale: 0,
            rotation: -180,
            opacity: 0
        },
        {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.8)"
        },
        "-=1.0"
    );

    tlVerse.fromTo(
        ".verse-text",
        {
            y: 30,
            opacity: 0,
            filter: "blur(10px)"
        },
        {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8
        },
        "-=0.6"
    );

    tlVerse.fromTo(
        ".verse-source",
        {
            y: 20,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8
        },
        "-=0.6"
    );

    // C. MEMPELAI SECTION - RESPONSIVE (SMOOTH LOGIC)
    const twinCards = gsap.utils.toArray(".glass-card-twin");
    const isMobile = window.innerWidth < 768;

    twinCards.forEach((card, index) => {
        // TENTUKAN ARAH ANIMASI BERDASARKAN LAYAR
        let startX = 0;
        let startY = 0;
        let startRotY = 0;
        let startRotX = 0;

        if (isMobile) {
            // KHUSUS HP: Muncul dari bawah (Supaya smooth)
            startX = 0;
            startY = 60;
            startRotX = 10;
        } else {
            // KHUSUS LAPTOP: Muncul dari samping
            startX = index === 0 ? -100 : 100;
            startY = 0;
            startRotY = index === 0 ? -15 : 15;
        }

        const tlCard = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse"
            }
        });

        tlCard.fromTo(
            card,
            {
                x: startX,
                y: startY,
                rotationX: startRotX,
                rotationY: startRotY,
                opacity: 0,
                filter: "blur(10px)",
                transformPerspective: 1000
            },
            {
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out"
            }
        );

        tlCard.fromTo(
            card.querySelectorAll(".formal-frame, .twin-info"),
            {
                scale: 0.9,
                opacity: 0,
                y: 20
            },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "back.out(1.5)"
            },
            "-=0.6"
        );
    });

    // D. EVENTS SECTION
    const eventCards = gsap.utils.toArray(".event-card");

    eventCards.forEach((card, index) => {
        const tlEventCard = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse"
            }
        });

        tlEventCard.fromTo(
            card,
            {
                y: 80,
                opacity: 0,
                rotationX: 20,
                filter: "blur(10px)",
                transformPerspective: 1000
            },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out"
            }
        );

        const ornament = card.querySelector(".card-ornament-top");
        if (ornament) {
            tlEventCard.fromTo(
                ornament,
                {
                    scale: 0,
                    rotation: -180,
                    opacity: 0
                },
                {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(2)"
                },
                "-=0.6"
            );
        }
    });

    // E. LOCATION SECTION
    const tlLocation = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-location",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    });

    tlLocation.fromTo(
        ".glass-map-card",
        {
            opacity: 0,
            scale: 0.9,
            filter: "blur(20px)",
            y: 50
        },
        {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1.0,
            ease: "power2.out"
        }
    );

    tlLocation.fromTo(
        ".floating-pin",
        {
            y: -50,
            scale: 0,
            opacity: 0
        },
        {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        },
        "-=0.8"
    );

    // F. GIFT SECTION
    const tlGift = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-gift",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    });

    tlGift.fromTo(
        ".atm-card",
        {
            rotationX: 45,
            opacity: 0,
            y: 80,
            transformPerspective: 1000
        },
        {
            rotationX: 0,
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.0,
            ease: "power2.out"
        }
    );

    document.querySelectorAll(".atm-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card.querySelector(".card-shine"), {
                opacity: 1,
                duration: 0.4
            });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card.querySelector(".card-shine"), {
                opacity: 0,
                duration: 0.4
            });
        });
    });

    // G. RSVP SECTION
    gsap.fromTo(
        ".glass-form-card",
        { x: -50, opacity: 0, filter: "blur(10px)" },
        {
            scrollTrigger: {
                trigger: ".glass-form-card",
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power2.out"
        }
    );

    gsap.fromTo(
        ".glass-comments-card",
        { x: 50, opacity: 0, filter: "blur(10px)" },
        {
            scrollTrigger: {
                trigger: ".glass-comments-card",
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power2.out"
        }
    );

    // H. FOOTER
    const tlFooter = gsap.timeline({
        scrollTrigger: {
            trigger: ".footer-section",
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });

    tlFooter.fromTo(
        ".glass-footer-content",
        {
            y: 50,
            opacity: 0,
            scale: 0.95,
            filter: "blur(5px)"
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power2.out"
        }
    );

    tlFooter.fromTo(
        ".couple-signature",
        {
            scale: 0.7,
            opacity: 0,
            filter: "blur(5px)"
        },
        {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "back.out(1.8)"
        },
        "-=1.2"
    );

    // J. LUXURY DIVIDERS ANIMATION (Pemisah Section)
    const dividers = gsap.utils.toArray(".luxury-divider");
    dividers.forEach(div => {
        const lineLeft = div.querySelector(".div-line:first-child");
        const icon = div.querySelector(".div-icon");
        const lineRight = div.querySelector(".div-line:last-child");

        const tlDivider = gsap.timeline({
            scrollTrigger: {
                trigger: div,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            }
        });

        tlDivider
            .set(div, { opacity: 1 })
            .fromTo(
                [lineLeft, lineRight],
                { scaleX: 0 },
                { scaleX: 1, duration: 1.5, ease: "power3.out" }
            )
            .fromTo(
                icon,
                { scale: 0, rotation: 180, opacity: 0 },
                {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: "back.out(2)"
                },
                "-=1.2"
            );
    });

    // K. CINEMATIC SECTION TITLES (Judul Muncul Mewah)
    const sectionHeaders = gsap.utils.toArray(".section-header");
    sectionHeaders.forEach(header => {
        const title = header.querySelector(".section-title-gold");
        const subtitle = header.querySelector(".section-subtitle");

        const tlTitle = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                toggleActions: "play reverse play reverse"
            }
        });

        if (title) {
            tlTitle.fromTo(
                title,
                {
                    y: 60,
                    opacity: 0,
                    filter: "blur(20px)",
                    rotationX: 40
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    rotationX: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }
            );
        }

        if (subtitle) {
            tlTitle.fromTo(
                subtitle,
                {
                    y: 20,
                    opacity: 0,
                    letterSpacing: "5px"
                },
                {
                    y: 0,
                    opacity: 1,
                    letterSpacing: "0px",
                    duration: 1.0,
                    ease: "power2.out"
                },
                "-=0.8"
            );
        }
    });

    // I. NAVBAR ACTIVE STATES
    gsap.utils.toArray("section").forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            onEnter: () => updateNav(section.id),
            onEnterBack: () => updateNav(section.id)
        });
    });
}

function updateNav(id) {
    const navItem = document.querySelector(`.nav-item[href="#${id}"]`);
    if (navItem) {
        document
            .querySelectorAll(".nav-item")
            .forEach(item => item.classList.remove("active"));
        navItem.classList.add("active");

        gsap.fromTo(
            navItem,
            { scale: 0.8 },
            { scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getGuestName();
});
