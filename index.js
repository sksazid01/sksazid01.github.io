// Portfolio JavaScript - Enhanced with modern features and animations

// Utility functions
const utils = {
    // Throttle function for performance optimization
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Main Portfolio Class
class Portfolio {
    constructor() {
        this.init();
        this.bindEvents();
        this.initAnimations();
        this.createParticles();
        this.initMatrixRain();
        this.initCursorEffects();
        this.initTiltEffects();
    }

    init() {
        // Initialize all components
        this.handleLoading();
        this.initTheme();
        this.initNavigation();
        this.initScrollEffects();
        this.initBackToTop();
        this.initTypingEffect();
        this.initProgressIndicator();
    }

    bindEvents() {
        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', this.toggleTheme.bind(this));
        
        // Contact form
        document.getElementById('contactForm')?.addEventListener('submit', this.handleContactForm.bind(this));
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.smoothScroll.bind(this));
        });

        // Mouse click effects
        document.addEventListener('click', this.createClickEffect.bind(this));

        // Window events
        window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 100));
        window.addEventListener('resize', utils.debounce(this.handleResize.bind(this), 250));
        window.addEventListener('load', this.handleLoad.bind(this));
    }

    handleLoading() {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    this.revealElements();
                }, 500);
            }, 1000);
        }
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle?.querySelector('i');
        
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        }
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('#themeToggle i');
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    }

    initNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        this.sections = sections;
        this.navLinks = navLinks;
    }

    initScrollEffects() {
        // Parallax effect for hero section
        this.heroSection = document.querySelector('.hero');
        
        // Reveal animations
        this.revealElements();
    }

    initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('title', 'Back to top');
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(backToTopBtn);
        this.backToTopBtn = backToTopBtn;
    }

    initTypingEffect() {
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-text h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                this.typeWriter(heroTitle, originalText, 100);
            }
        }, 1500);
    }

    initProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-indicator';
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    initAnimations() {
        // Initialize intersection observer for animations
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Animate skill progress bars
                    if (entry.target.classList.contains('skill-category')) {
                        this.animateSkillBars(entry.target);
                    }
                    
                    // Animate counters
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, { threshold: 0.1 });

        // Observe all reveal elements
        document.querySelectorAll('.reveal, .skill-category, .stat-card').forEach(el => {
            observer.observe(el);
        });
    }

    revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update progress indicator
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (this.progressBar) {
            this.progressBar.style.width = scrolled + "%";
        }
        
        // Show/hide back to top button
        if (this.backToTopBtn) {
            if (scrollTop > 400) {
                this.backToTopBtn.classList.add('visible');
            } else {
                this.backToTopBtn.classList.remove('visible');
            }
        }
        
        // Parallax effect
        if (this.heroSection) {
            this.heroSection.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
        
        // Update active navigation
        this.updateActiveNav();
        
        // Reveal elements on scroll
        this.revealElements();
    }

    updateActiveNav() {
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    handleResize() {
        // Handle responsive changes
        this.updateParticles();
    }

    handleLoad() {
        // Final setup after everything is loaded
        this.revealElements();
        this.createAdvancedParticles();
        console.log('%c Portfolio Loaded Successfully! ', 'background: linear-gradient(90deg, #007AFF, #00D2FF); color: white; font-weight: bold; padding: 10px; border-radius: 5px;');
    }

    smoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    animateSkillBars(skillCategory) {
        const skillTags = skillCategory.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    tag.style.transition = 'all 0.5s ease';
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
    }

    animateCounter(statCard) {
        const counter = statCard.querySelector('h3');
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
            }
        }, 20);
    }

    createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        document.querySelector('.hero').appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 30000);
    }

    updateParticles() {
        // Update particle positions on resize
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
        });
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Create mailto link
        const mailtoLink = `mailto:ahasanulhaque20@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        this.showSuccessMessage('Thank you for your message! Your email client should now open.');
        
        // Reset form
        e.target.reset();
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        const form = document.getElementById('contactForm');
        form.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Matrix Rain Effect
    initMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#007AFF';
            ctx.font = fontSize + 'px arial';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(drawMatrix, 35);
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Cursor Effects
    initCursorEffects() {
        const cursor = document.getElementById('cursor');
        const cursorTrail = document.getElementById('cursorTrail');
        
        if (!cursor || !cursorTrail) return;
        
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Animate cursor trail
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            
            requestAnimationFrame(animateTrail);
        };
        animateTrail();
        
        // Hide cursor on touch devices
        document.addEventListener('touchstart', () => {
            cursor.style.display = 'none';
            cursorTrail.style.display = 'none';
        });
    }

    // Tilt Effects for Cards
    initTiltEffects() {
        const tiltElements = document.querySelectorAll('.tilt-effect');
        
        tiltElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                element.style.transition = 'transform 0.3s ease';
            });
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // Enhanced Particle System
    createAdvancedParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(particleContainer);
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle-effect';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        };
        
        // Create particles periodically
        setInterval(createParticle, 500);
    }

    // Mouse Click Effects
    createClickEffect(e) {
        // Create ripple wave effect
        const clickWave = document.createElement('div');
        clickWave.className = 'click-effect';
        clickWave.style.left = (e.clientX - 25) + 'px';
        clickWave.style.top = (e.clientY - 25) + 'px';
        document.body.appendChild(clickWave);

        // Create burst effect
        const burstEffect = document.createElement('div');
        burstEffect.className = 'click-effect-burst';
        burstEffect.style.left = (e.clientX - 15) + 'px';
        burstEffect.style.top = (e.clientY - 15) + 'px';
        burstEffect.style.width = '30px';
        burstEffect.style.height = '30px';
        burstEffect.style.border = '2px solid var(--secondary-color)';
        burstEffect.style.borderRadius = '50%';
        document.body.appendChild(burstEffect);

        // Create particle burst
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-burst';
            
            const angle = (360 / 6) * i;
            const distance = 30 + Math.random() * 20;
            const radian = (angle * Math.PI) / 180;
            
            particle.style.left = (e.clientX + Math.cos(radian) * distance) + 'px';
            particle.style.top = (e.clientY + Math.sin(radian) * distance) + 'px';
            
            // Random colors for particles
            const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }

        // Remove click effects after animation
        setTimeout(() => {
            if (clickWave.parentNode) {
                clickWave.parentNode.removeChild(clickWave);
            }
            if (burstEffect.parentNode) {
                burstEffect.parentNode.removeChild(burstEffect);
            }
        }, 800);
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Additional utility functions for enhanced functionality
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Apply ripple effect to all buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn').forEach(addRippleEffect);
});

// Console message
console.log(
    '%c🚀 Portfolio by Md Ahasanul Haque',
    'background: linear-gradient(90deg, #007AFF, #00D2FF); color: white; font-weight: bold; padding: 20px; border-radius: 10px; font-size: 16px;'
);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`⚡ Page Load Time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}
