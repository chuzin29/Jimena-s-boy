// Fecha de inicio de la relacion
const START_DATE = new Date('2026-06-12');

// SPLASH - Click para entrar + YouTube IFrame API
window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    const loader = document.getElementById('loader');
    const status = document.getElementById('deftones-status');
    if (!splash) return;

    let player = null;
    let playQueued = false;

    window.onYouTubeIframeAPIReady = () => {
        player = new YT.Player('yt-player', {
            videoId: 'gEXbHKAuHSg',
            playerVars: {
                playsinline: 1,
                controls: 0,
                autoplay: 0,
                mute: 1,
                rel: 0,
                enablejsapi: 1
            },
            events: {
                onReady: () => {
                    if (playQueued && player) {
                        player.playVideo();
                        setTimeout(() => { try { player.unMute() } catch(e) {} }, 300);
                    }
                }
            }
        });
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    splash.addEventListener('click', function enterSite(e) {
        const x = e.clientX, y = e.clientY;

        const colors = ['#ff6b9d', '#9c27b0', '#ff4081', '#e91e63', '#ce93d8', '#f48fb1', '#b39ddb', '#f06292'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            const size = 4 + Math.random() * 8;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (Math.PI * 2 / 40) * i + (Math.random() - 0.5) * 0.3;
            const dist = 80 + Math.random() * 250;
            p.style.cssText = `
                position:fixed;left:${x}px;top:${y}px;
                width:${size}px;height:${size}px;
                border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
                background:${color};
                box-shadow:0 0 ${6 + Math.random() * 8}px ${color};
                pointer-events:none;z-index:999999;
                transition:all 1s cubic-bezier(0.16,1,0.3,1);
                opacity:1;transform:scale(0);
            `;
            document.body.appendChild(p);
            requestAnimationFrame(() => {
                p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(1) rotate(${Math.random() * 720}deg)`;
                p.style.opacity = '0';
            });
            setTimeout(() => p.remove(), 1200);
        }

        const splashContent = splash.querySelector('div:last-child');
        if (splashContent) {
            splashContent.style.transform = 'scale(0.7)';
            splashContent.style.opacity = '0';
        }
        setTimeout(() => {
            splash.classList.add('hidden');
            loader.classList.remove('hidden');
            setTimeout(() => loader.classList.add('hidden'), 1500);
        }, 400);

        if (status) status.textContent = 'Reproduciendo Entombed';

        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
            setTimeout(() => { try { player.unMute() } catch(e) {} }, 300);
        } else {
            playQueued = true;
        }
    }, { once: true });
});
// Contador de tiempo juntos
function updateCounter() {
    const now = new Date();
    const diff = now - START_DATE;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    if (daysEl) animateNumber(daysEl, days);
    if (hoursEl) animateNumber(hoursEl, hours);
    if (minutesEl) animateNumber(minutesEl, minutes);
    if (secondsEl) animateNumber(secondsEl, seconds);
}
function animateNumber(element, target) {
    const current = parseInt(element.textContent) || 0;
    if (current === target) return;
    element.textContent = target;
    element.style.transform = 'scale(1.2)';
    element.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}
setInterval(updateCounter, 1000);
updateCounter();
// Intersection Observer para animaciones de scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
// Observar elementos
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.love-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.gallery-item').forEach(item => observer.observe(item));
    document.querySelectorAll('.counter-box').forEach(box => observer.observe(box));
    const letterCard = document.querySelector('.letter-card');
    if (letterCard) observer.observe(letterCard);
});
// Smooth scroll para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
// Parallax suave en hero
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-content');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.25}px)`;
                hero.style.opacity = 1 - (scrolled / 700);
            }
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                if (scrolled > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
            ticking = false;
        });
        ticking = true;
    }
});
// Efecto de escritura
function typeWriter(element, text, speed = 120) {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--pink)';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }
    type();
}
// Iniciar efecto de escritura
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroName = document.querySelector('.hero-name');
        if (heroName) {
            typeWriter(heroName, 'Jimena', 180);
        }
    }, 3000);
});

// Back to top button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(backToTop);
// Efecto tilt en tarjetas de amor
document.querySelectorAll('.love-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});
// LIGHTBOX
let currentImageIndex = 0;
const galleryImages = [];
// Recopilar imagenes de la galeria
document.querySelectorAll('.gallery-item img').forEach((img, index) => {
    galleryImages.push(img.src);
    img.parentElement.addEventListener('click', () => openLightbox(index));
    img.style.cursor = 'pointer';
});
function createParticles(x, y, count = 24) {
    const colors = ['#ff6b9d', '#ce93d8', '#f48fb1', '#e91e63', '#b39ddb', '#f06292', '#9c27b0', '#ff4081'];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = 3 + Math.random() * 7;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 / count) * i;
        const velocity = 60 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        p.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            background: ${color};
            box-shadow: 0 0 ${4 + Math.random() * 6}px ${color};
            pointer-events: none;
            z-index: 10001;
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            opacity: 1;
        `;
        document.body.appendChild(p);
        requestAnimationFrame(() => {
            p.style.transform = `translate(${tx}px, ${ty}px) scale(0.3)`;
            p.style.opacity = '0';
        });
        setTimeout(() => p.remove(), 1000);
    }
}
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    // Reset animacion
    img.style.opacity = '0';
    img.style.transform = 'scale(0.6) rotate(-5deg)';
    setTimeout(() => {
        img.src = galleryImages[index];
        img.style.opacity = '1';
        img.style.transform = 'scale(1) rotate(0deg)';
    }, 50);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Particulas al abrir
    setTimeout(() => {
        createParticles(window.innerWidth / 2, window.innerHeight / 2, 30);
    }, 300);
}
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const img = document.getElementById('lightbox-img');
    img.style.opacity = '0';
    img.style.transform = 'scale(0.7) rotate(3deg)';
    setTimeout(() => {
        img.src = galleryImages[currentImageIndex];
        img.style.opacity = '1';
        img.style.transform = 'scale(1) rotate(0deg)';
        createParticles(window.innerWidth / 2, window.innerHeight / 2, 12);
    }, 300);
}
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const img = document.getElementById('lightbox-img');
    img.style.opacity = '0';
    img.style.transform = 'scale(0.7) rotate(-3deg)';
    setTimeout(() => {
        img.src = galleryImages[currentImageIndex];
        img.style.opacity = '1';
        img.style.transform = 'scale(1) rotate(0deg)';
        createParticles(window.innerWidth / 2, window.innerHeight / 2, 12);
    }, 300);
}
// Cerrar lightbox con ESC o click fuera
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox();
});
// Transicion suave en imagen del lightbox
document.getElementById('lightbox-img').style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
// Animacion scroll para seccion Deftones
const deftonesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.lyric-line').forEach((line, i) => {
                line.style.animationDelay = `${i * 0.15}s`;
                line.classList.add('visible');
            });
        }
    });
}, { threshold: 0.2 });
const deftonesSection = document.querySelector('.deftones-section');
if (deftonesSection) deftonesObserver.observe(deftonesSection);
