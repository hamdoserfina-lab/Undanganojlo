// Script untuk animasi dan interaksi - UPDATED
document.addEventListener('DOMContentLoaded', function() {
    // Elemen utama
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openBtn');
    const musicToggle = document.getElementById('musicToggle');
    const weddingMusic = document.getElementById('weddingMusic');
    const calendarBtn = document.getElementById('addToCalendar');
    
    // Inisialisasi musik
    let isMusicPlaying = false;

    // Inisialisasi countdown
    initializeCountdown();

    // Inisialisasi gallery carousel
    initializeCarousel();

    // Animasi masuk untuk elemen cover
    gsap.to('.cover-subtitle', {
        duration: 1,
        opacity: 1,
        y: 0,
        delay: 0.5,
        ease: 'power2.out'
    });
    
    gsap.to('.cover-title', {
        duration: 1,
        opacity: 1,
        y: 0,
        delay: 0.8,
        ease: 'power2.out'
    });
    
    gsap.to('.cover-date', {
        duration: 1,
        opacity: 1,
        y: 0,
        delay: 1.1,
        ease: 'power2.out'
    });
    
    gsap.to('.cover-invitation', {
        duration: 1,
        opacity: 1,
        y: 0,
        delay: 1.4,
        ease: 'power2.out'
    });
    
    gsap.to('.open-invitation-btn', {
        duration: 1,
        opacity: 1,
        y: 0,
        delay: 1.7,
        ease: 'power2.out'
    });
    
    // Event listener untuk tombol buka undangan
    openBtn.addEventListener('click', function() {
        // Animasi tombol saat diklik
        gsap.to(this, {
            scale: 0.9,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: function() {
                // Animasi keluar untuk cover
                const coverContent = document.querySelector('.cover-content');
                coverContent.classList.add('cover-content-exit');
                cover.classList.add('parallax-exit');
                cover.classList.add('cover-exit');
                
                // Tampilkan main content setelah animasi selesai
                setTimeout(function() {
                    cover.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Animasi masuk untuk main content
                    gsap.to(mainContent, {
                        duration: 1,
                        opacity: 1,
                        ease: 'power2.out'
                    });
                    
                    // Animasi untuk hero section
                    animateHeroSection();
                    
                    // Scroll ke atas
                    window.scrollTo(0, 0);
                    
                    // Mulai musik otomatis
                    playMusic();
                }, 1500);
            }
        });
    });
    
    // Fungsi untuk animasi hero section
    function animateHeroSection() {
        console.log('Starting enhanced hero animation...');
        
        const heroTimeline = gsap.timeline();
        
        heroTimeline
            .fromTo('.hero-frame', 
                {
                    opacity: 0,
                    scale: 0.8,
                    rotation: -5,
                    y: 50
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    y: 0,
                    duration: 1.2,
                    ease: 'back.out(1.4)'
                }
            )
            .to('.hero-frame::before', {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5')
            .fromTo('.hero-subtitle',
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                },
                '-=0.3'
            )
            .to('.hero-subtitle::after', {
                scaleX: 1,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.2')
            .fromTo('.bride-name',
                {
                    opacity: 0,
                    x: -50,
                    y: 20
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out'
                },
                '-=0.5'
            )
            .to('.bride-name::after', {
                width: '100%',
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.3')
            .fromTo('.hero-ampersand',
                {
                    opacity: 0,
                    scale: 0,
                    rotation: -180
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: 'back.out(1.8)'
                },
                '-=0.6'
            )
            .fromTo('.groom-name',
                {
                    opacity: 0,
                    x: 50,
                    y: 20
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out'
                },
                '-=0.8'
            )
            .to('.groom-name::after', {
                width: '100%',
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.3')
            .fromTo('.hero-date',
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                },
                '-=0.5'
            )
            .fromTo('.date-decoration',
                {
                    opacity: 0,
                    scaleX: 0
                },
                {
                    opacity: 1,
                    scaleX: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                },
                '-=0.3'
            )
            .to('.hero-frame', {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            }, '+=0.5');

        setTimeout(initScrollAnimations, 2000);
    }
    
    // Fungsi inisialisasi scroll animations
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.utils.toArray(['.found-love-title', '.verse-container', '.verse-source', 
                           '.profile', '.countdown-content', '.event-card', '.bank-card']).forEach(element => {
            gsap.fromTo(element, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Animasi countdown items
        gsap.fromTo('.countdown-item', {
            opacity: 0,
            scale: 0.5,
            y: 30
        }, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.countdown-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Fungsi untuk countdown timer
    function initializeCountdown() {
        const weddingDate = new Date('December 15, 2025 08:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            animateCountdownNumber('days', days.toString().padStart(2, '0'));
            animateCountdownNumber('hours', hours.toString().padStart(2, '0'));
            animateCountdownNumber('minutes', minutes.toString().padStart(2, '0'));
            animateCountdownNumber('seconds', seconds.toString().padStart(2, '0'));
            
            if (distance < 0) {
                clearInterval(countdownTimer);
                document.querySelector('.countdown-timer').innerHTML = '<div class="countdown-complete">🎉 The Wedding Day Has Arrived! 🎉</div>';
            }
        }
        
        function animateCountdownNumber(elementId, newValue) {
            const element = document.getElementById(elementId);
            if (element.textContent !== newValue) {
                gsap.to(element, {
                    scale: 1.2,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.out',
                    onComplete: () => {
                        element.textContent = newValue;
                    }
                });
            }
        }
        
        updateCountdown();
        const countdownTimer = setInterval(updateCountdown, 1000);
    }
    
    // Fungsi untuk gallery carousel
    function initializeCarousel() {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const dots = Array.from(document.querySelectorAll('.dot'));
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        let currentSlide = 0;
        
        // Set active slide
        function setActiveSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Update current slide
            currentSlide = index;
        }
        
        // Next slide
        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            setActiveSlide(nextIndex);
        }
        
        // Previous slide
        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            setActiveSlide(prevIndex);
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                setActiveSlide(slideIndex);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }
    
    // Fungsi untuk add to calendar
    calendarBtn.addEventListener('click', function() {
        const weddingDate = '20251215T080000';
        const weddingEndDate = '20251215T140000';
        const title = 'Pernikahan Dyah & Aji';
        const description = 'Pernikahan Dyah & Aji - Akad Nikah dan Resepsi';
        const location = 'Bulu, Pondoksari, Nguntoronadi, Wonogiri';
        
        // Create .ics file content
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `DTSTART:${weddingDate}`,
            `DTEND:${weddingEndDate}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description}`,
            `LOCATION:${location}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n');
        
        // Create and download .ics file
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Pernikahan-Dyah-Aji.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Tersimpan!';
        this.style.background = '#28a745';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
        }, 2000);
    });
    
    // Fungsi untuk memutar musik
    function playMusic() {
        weddingMusic.volume = 0.3;
        weddingMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            console.log('Autoplay prevented:', error);
        });
    }
    
    // Event listener untuk toggle musik
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            weddingMusic.pause();
            isMusicPlaying = false;
            this.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            weddingMusic.play();
            isMusicPlaying = true;
            this.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });
    
    // Fungsi untuk copy nomor rekening
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const accountNumber = this.getAttribute('data-account');
            navigator.clipboard.writeText(accountNumber).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
                this.style.background = '#28a745';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);
            });
        });
    });
    
    // Handle form submission
    document.querySelector('.rsvp-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        gsap.to(submitBtn, {
            duration: 0.3,
            scale: 0.95,
            yoyo: true,
            repeat: 1,
            onComplete: function() {
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Terima kasih! Ucapan Anda telah terkirim.';
                
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
                
                document.querySelector('.rsvp-form').reset();
            }
        });
    });
    
    console.log('🎉 Wedding Website Initialized!');
});