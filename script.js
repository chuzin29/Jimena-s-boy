// Fecha de inicio de la relacion
const START_DATE = new Date('2026-06-12');
// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2800);
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
// Efecto de click - corazones explotan
document.addEventListener('click', (e) => {
    const emojis = ['❤️', '💕', '💖', '💗', '💝'];
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${e.clientX + (Math.random() - 0.5) * 120}px;
                top: ${e.clientY + (Math.random() - 0.5) * 120}px;
                font-size: ${Math.random() * 1.5 + 1}rem;
                pointer-events: none;
                z-index: 9999;
                animation: clickBurst 1s ease-out forwards;
            `;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }, i * 80);
    }
});
// Agregar animacion de burst al CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes clickBurst {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx, 0), var(--tx, -80px)) scale(0.3);
        }
    }
`;
document.head.appendChild(style);
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
    const emojis = ['✨', '🌸', '💖', '⭐', '🌺', '💕', '🩷', '✨'];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = (Math.PI * 2 / count) * i;
        const velocity = 80 + Math.random() * 120;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        p.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${0.8 + Math.random() * 1}rem;
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
// MUSICA - Entombed autoplay al cargar
window.addEventListener('load', () => {
    const embed = document.getElementById('deftones-embed');
    if (embed) {
        const startAudio = () => {
            embed.src = 'https://www.youtube.com/embed/gEXbHKAuHSg?autoplay=1&enablejsapi=1';
            document.removeEventListener('click', startAudio);
            document.removeEventListener('touchstart', startAudio);
            document.removeEventListener('scroll', startAudio);
        };
        document.addEventListener('click', startAudio, { once: true });
        document.addEventListener('touchstart', startAudio, { once: true });
        document.addEventListener('scroll', startAudio, { once: true });
    }
});
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
