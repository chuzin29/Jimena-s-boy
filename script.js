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

// Corazones flotantes
function createFloatingHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '🩷', '🤍'];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 12 + 10) + 's';
    heart.style.fontSize = (Math.random() * 1.5 + 0.7) + 'rem';
    heart.style.opacity = Math.random() * 0.4 + 0.2;
    container.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) heart.remove();
    }, 22000);
}

// Crear corazones cada poco tiempo
setInterval(createFloatingHeart, 600);

// Crear corazones iniciales
for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingHeart, i * 300);
}

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
const captions = [];

// Recopilar imagenes de la galeria
document.querySelectorAll('.gallery-item img').forEach((img, index) => {
    galleryImages.push(img.src);
    img.parentElement.addEventListener('click', () => openLightbox(index));
    img.style.cursor = 'pointer';
});

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    img.src = galleryImages[index];
    caption.textContent = captions[index] || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    setTimeout(() => {
        img.src = galleryImages[currentImageIndex];
        caption.textContent = captions[currentImageIndex] || '';
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 200);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    setTimeout(() => {
        img.src = galleryImages[currentImageIndex];
        caption.textContent = captions[currentImageIndex] || '';
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 200);
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
document.getElementById('lightbox-img').style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// Animacion scroll para seccion Deftones
const deftonesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.lyric-line').forEach(line => {
                line.style.animationPlayState = 'running';
            });
        }
    });
}, { threshold: 0.3 });

const deftonesSection = document.querySelector('.deftones-section');
if (deftonesSection) deftonesObserver.observe(deftonesSection);
