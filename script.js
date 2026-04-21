// ===== TYPING ANIMATION =====
const typedText = document.getElementById('typedText');
const texts = [
    '商務科技管理系學生',
    '軟體工程師',
    '網頁開發學習者',
    '資料分析愛好者',
    '團隊合作者'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (!isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    } else {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
}

// ===== PARTICLE ANIMATION =====
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = gba(100, 255, 218, );
        this.ctx.fill();
    }
}

let particles = [];
const particleCanvas = document.getElementById('particleCanvas');
let particleCtx;

function initParticles() {
    if (!particleCanvas) return;
    
    particleCtx = particleCanvas.getContext('2d');
    resizeCanvas();
    
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(particleCanvas));
    }
    
    animateParticles();
}

function resizeCanvas() {
    if (!particleCanvas) return;
    
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function animateParticles() {
    if (!particleCtx) return;
    
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

// ===== SKILL BARS =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const percentage = bar.getAttribute('data-percent');
            bar.style.width = percentage + '%';
        }, index * 200);
    });
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('nav .nav-links');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeWriter, 1000);
    
    // Initialize particles
    initParticles();
    
    // Setup navigation
    setupNavigation();
    
    // Animate skill bars on scroll
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(skillsSection);
    }
});

// ===== WINDOW RESIZE =====
window.addEventListener('resize', () => {
    resizeCanvas();
});
