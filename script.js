// Fecha de inicio de la relacion (CAMBIAR ESTA FECHA)
const START_DATE = new Date('2026-06-12');

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2500);
});

// Contador de tiempo juntos
function updateCounter() {
    const now = new Date();
    const diff = now - START_DATE;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();

// Corazones flotantes
function createFloatingHeart() {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['❤️', '💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 20000);
}

setInterval(createFloatingHeart, 800);

// Animacion de tarjetas al hacer scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.love-card').forEach(card => {
    observer.observe(card);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Parallax en hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }
});

// Efecto de escritura en el titulo
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Iniciar efecto de escritura cuando cargue
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroName = document.querySelector('.hero-name');
        if (heroName) {
            typeWriter(heroName, 'Jimena', 150);
        }
    }, 2800);
});

// Efecto de click en corazones
document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = (e.clientX + (Math.random() - 0.5) * 100) + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.animationDuration = '3s';
            heart.style.fontSize = '1.5rem';
            heart.style.position = 'fixed';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
});
