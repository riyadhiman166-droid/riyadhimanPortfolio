// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const typewriter = document.getElementById('typewriter');
const particlesContainer = document.getElementById('particles');

// ===== Typewriter Effect =====
const roles = [
    'Software Developer',
    'Engineering Student',
    'Problem Solver',
    'C++ Programmer',
    'Python Developer',
    'Data Enthusiast',
    'ML Learner'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typewriter.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriter.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing new word
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// ===== Particle Effect =====
function createParticles() {
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        const opacity = Math.random() * 0.5 + 0.1;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${opacity};
        `;

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transition = 'all 0.3s ease';
    });

    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-category, .project-card, .stat-card, .contact-item, .social-icon');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal', 'active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Skill Progress Bar Animation =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (barTop < windowHeight - 100 && bar.style.width === '') {
            bar.style.width = progress + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// ===== Counter Animation for Stats =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');

    counters.forEach(counter => {
        const target = counter.innerText;
        const isNumber = !isNaN(parseInt(target));

        if (isNumber && !counter.classList.contains('counted')) {
            const targetNum = parseInt(target);
            let count = 0;
            const duration = 2000;
            const increment = targetNum / (duration / 16);

            const updateCounter = () => {
                count += increment;
                if (count < targetNum) {
                    counter.innerText = Math.ceil(count) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = targetNum + '+';
                    counter.classList.add('counted');
                }
            };

            const counterTop = counter.getBoundingClientRect().top;
            if (counterTop < window.innerHeight - 100) {
                updateCounter();
            }
        }
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===== Intersection Observer for Better Performance =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .about-content').forEach(el => {
    observer.observe(el);
});

// ===== Mouse Follower Effect (Optional - for desktop) =====
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });

    document.querySelectorAll('a, button, .project-card, .skill-category').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--secondary-color)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--primary-color)';
        });
    });
}

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';

    // Create loading screen
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">RD</div>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--gradient-hero);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    const loaderContent = loader.querySelector('.loader-content');
    loaderContent.style.cssText = `
        text-align: center;
    `;

    const loaderLogo = loader.querySelector('.loader-logo');
    loaderLogo.style.cssText = `
        font-size: 4rem;
        font-weight: 700;
        background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 30px;
        animation: pulse 1s infinite;
    `;

    const loaderBar = loader.querySelector('.loader-bar');
    loaderBar.style.cssText = `
        width: 200px;
        height: 4px;
        background: rgba(255,255,255,0.2);
        border-radius: 2px;
        overflow: hidden;
    `;

    const loaderProgress = loader.querySelector('.loader-progress');
    loaderProgress.style.cssText = `
        width: 0;
        height: 100%;
        background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
        animation: loading 1.5s ease forwards;
    `;

    // Add keyframes for loading animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loading {
            0% { width: 0; }
            100% { width: 100%; }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);

    document.body.prepend(loader);

    // Remove loader after animation
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflow = '';

        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);
});

// ===== Console Easter Egg =====
console.log('%c Welcome to Riya Dhiman\'s Portfolio! ', 'background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Feel free to explore the code! ', 'color: #6c5ce7; font-size: 12px;');
