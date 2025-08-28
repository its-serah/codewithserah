// Initiative Code with Serah - Delightful & Human Interactions
// Making the web feel alive, one interaction at a time ✨

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 Welcome to Initiative Code with Serah! Loading magical experiences...');
    
    // Initialize all the delightful features
    initTypewriterEffect();
    initScrollAnimations();
    initMobileMenu();
    initFormEnhancements();
    initStatCounters();
    initParallaxEffects();
    initMagicalButtons();
    initNewsletterExperience();
    initEasterEggs();
    
    // Typewriter effect for hero section
    function initTypewriterEffect() {
        const phrases = [
            'everyone deserves to code 💜',
            'your story matters in tech 🌟',
            'diversity makes us stronger 🌈', 
            'you belong in this community 🤗',
            'coding can change your life ✨'
        ];
        
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before next phrase
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing after a small delay
        setTimeout(typeEffect, 1000);
    }
    
    // Enhanced scroll animations with Intersection Observer
    function initScrollAnimations() {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add staggered animation classes
                    if (element.classList.contains('stagger-children')) {
                        const children = element.querySelectorAll('.stagger-child');
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('animate-in');
                            }, index * 150);
                        });
                    } else {
                        element.classList.add('animate-in');
                    }
                    
                    // Special animations for different elements
                    if (element.classList.contains('ambassador-card')) {
                        setTimeout(() => {
                            element.style.transform = 'translateY(0) scale(1)';
                            element.style.opacity = '1';
                        }, Math.random() * 300);
                    }
                    
                    if (element.classList.contains('story-card')) {
                        const randomDelay = Math.random() * 200;
                        setTimeout(() => {
                            element.classList.add('story-reveal');
                        }, randomDelay);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });
        
        // Observe all animation targets
        document.querySelectorAll('
            .glass-card, .ambassador-card, .story-card, .blog-post, 
            .join-option, .impact-step, .stat-card, .timeline-item
        ').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            animationObserver.observe(el);
        });
        
        // Special handling for masonry layout
        document.querySelectorAll('.stories-masonry .story-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Enhanced mobile menu with smooth animations
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!hamburger || !navMenu) return;
        
        hamburger.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Animate menu links with stagger
            if (!isActive) {
                navLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            } else {
                navLinks.forEach(link => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                });
            }
        });
        
        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Enhanced form experiences
    function initFormEnhancements() {
        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = this.querySelector('#newsletter-email').value;
                const name = this.querySelector('#first-name').value || 'friend';
                
                if (!email) {
                    showDelightfulNotification('Hey! We need your email to send you those Sunday stories 📧', 'gentle');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showDelightfulNotification('That email looks a bit wonky 🤔 Mind double-checking?', 'gentle');
                    return;
                }
                
                // Success with personal touch
                showDelightfulNotification(`Welcome to the family, ${name}! 🎉 Your first Sunday story is on its way!`, 'celebration');
                this.reset();
                
                // Add confetti effect
                createConfetti();
            });
        }
        
        // Enhanced input interactions
        document.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                
                // Subtle scale effect
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                this.style.transform = 'scale(1)';
            });
            
            // Character counter for message fields
            if (input.tagName === 'TEXTAREA') {
                const maxLength = 500;
                const counter = document.createElement('div');
                counter.className = 'char-counter';
                counter.style.cssText = `
                    position: absolute;
                    bottom: -20px;
                    right: 10px;
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.6);
                    transition: color 0.3s ease;
                `;
                input.parentElement.appendChild(counter);
                
                input.addEventListener('input', function() {
                    const remaining = maxLength - this.value.length;
                    counter.textContent = `${remaining} characters left`;
                    
                    if (remaining < 50) {
                        counter.style.color = '#ff6b6b';
                    } else {
                        counter.style.color = 'rgba(255, 255, 255, 0.6)';
                    }
                });
            }
        });
    }
    
    // Animated statistics counters with easing
    function initStatCounters() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    animateNumber(counter, 0, target, 2000);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.7 });
        
        document.querySelectorAll('.stat-number').forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for natural feel
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(start + range * easeOutCubic);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = end; // Ensure final value is exact
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Subtle parallax effects
    function initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            const rate2 = scrolled * -0.5;
            
            // Floating shapes parallax
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.01}deg)`;
            });
            
            // Hero visual parallax
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${rate2}px)`;
            }
            
            // Polaroid stack parallax
            const polaroids = document.querySelectorAll('.polaroid');
            polaroids.forEach((polaroid, index) => {
                const speed = 0.1 + (index * 0.02);
                polaroid.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Magical button interactions
    function initMagicalButtons() {
        document.querySelectorAll('.magical-btn').forEach(btn => {
            // Mouse move effect
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.setProperty('--mouse-x', `${x}px`);
                this.style.setProperty('--mouse-y', `${y}px`);
            });
            
            // Click celebration
            btn.addEventListener('click', function(e) {
                if (!e.target.closest('a').href.includes('#')) {
                    return; // Don't prevent default for actual links
                }
                
                createSparkles(e.clientX, e.clientY);
            });
        });
        
        // All buttons get delightful hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Newsletter signup experience
    function initNewsletterExperience() {
        const emailInput = document.querySelector('#newsletter-email');
        const nameInput = document.querySelector('#first-name');
        
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                if (this.value.includes('@')) {
                    nameInput.style.opacity = '1';
                    nameInput.style.transform = 'translateY(0)';
                    nameInput.focus();
                }
            });
        }
        
        // Dynamic button text
        const submitBtn = document.querySelector('.newsletter-btn');
        if (submitBtn) {
            submitBtn.addEventListener('mouseenter', function() {
                this.querySelector('span').textContent = 'Yes, I want Sunday inspiration!';
            });
            
            submitBtn.addEventListener('mouseleave', function() {
                this.querySelector('span').textContent = 'Send Me Sunday Stories!';
            });
        }
    }
    
    // Smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                // Custom eased scrolling
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
    
    function smoothScrollTo(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;
        
        function scrollStep(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, start + distance * easeInOutCubic);
            
            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }
        
        requestAnimationFrame(scrollStep);
    }
    
    // Easter eggs and delightful surprises
    function initEasterEggs() {
        // Konami code for confetti
        let konamiCode = [];
        const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        
        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.keyCode);
            konamiCode = konamiCode.slice(-10);
            
            if (konamiCode.join(',') === konami.join(',')) {
                createMegaConfetti();
                showDelightfulNotification('🎉 You found the secret code! Serah would be proud!', 'celebration');
                konamiCode = [];
            }
        });
        
        // Click counter for fun
        let clickCount = 0;
        document.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 100) {
                showDelightfulNotification('Wow, you really love clicking! 🖱️ Have a ✨ for your enthusiasm!', 'fun');
                createSparkles(window.innerWidth / 2, window.innerHeight / 2);
            }
        });
        
        // Special hover effect for Serah's name
        document.querySelectorAll('.highlight, .handwritten').forEach(element => {
            if (element.textContent.toLowerCase().includes('serah')) {
                element.addEventListener('mouseenter', function() {
                    this.style.animation = 'rainbow-text 2s ease-in-out';
                });
                
                element.addEventListener('animationend', function() {
                    this.style.animation = '';
                });
            }
        });
    }
    
    // Delightful notification system
    function showDelightfulNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const emojis = {
            success: '🎉',
            error: '😅', 
            gentle: '💜',
            celebration: '🎊',
            fun: '✨',
            info: '💫'
        };
        
        notification.className = `delightful-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-emoji">${emojis[type] || '💫'}</span>
                <span class="notification-text">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(123, 44, 191, 0.2);
            z-index: 10000;
            transform: translateX(400px) scale(0.8);
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 400px;
            border: 2px solid var(--pastel-yellow);
        `;
        
        // Content styles
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        const emoji = notification.querySelector('.notification-emoji');
        emoji.style.cssText = `
            font-size: 24px;
            animation: bounce 1s infinite;
        `;
        
        const text = notification.querySelector('.notification-text');
        text.style.cssText = `
            flex: 1;
            color: var(--text-primary);
            font-weight: 500;
            line-height: 1.4;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            color: var(--text-muted);
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            transition: all 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = 'var(--beige)';
            this.style.transform = 'scale(1.1)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'none';
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(notification);
        
        // Show with bounce
        setTimeout(() => {
            notification.style.transform = 'translateX(0) scale(1)';
        }, 100);
        
        // Auto hide
        const autoHideTimer = setTimeout(() => {
            hideNotification();
        }, 5000);
        
        function hideNotification() {
            notification.style.transform = 'translateX(400px) scale(0.8)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
            clearTimeout(autoHideTimer);
        }
        
        closeBtn.addEventListener('click', hideNotification);
    }
    
    // Create sparkles effect
    function createSparkles(x, y) {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: 6px;
                    height: 6px;
                    background: var(--pastel-yellow);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: sparkle-fly 1s ease-out forwards;
                `;
                
                // Random direction and distance
                const angle = (Math.PI * 2 * i) / 15;
                const distance = 50 + Math.random() * 50;
                const endX = x + Math.cos(angle) * distance;
                const endY = y + Math.sin(angle) * distance;
                
                sparkle.style.setProperty('--end-x', `${endX}px`);
                sparkle.style.setProperty('--end-y', `${endY}px`);
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    if (document.body.contains(sparkle)) {
                        document.body.removeChild(sparkle);
                    }
                }, 1000);
            }, i * 50);
        }
    }
    
    // Confetti explosion
    function createConfetti() {
        const colors = ['#7B2CBF', '#9D4EDD', '#FFE066', '#FFE5CC', '#F3E8FF'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: -10px;
                    width: ${4 + Math.random() * 6}px;
                    height: ${4 + Math.random() * 6}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: confetti-fall 3s ease-out forwards;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (document.body.contains(confetti)) {
                        document.body.removeChild(confetti);
                    }
                }, 3000);
            }, i * 50);
        }
    }
    
    function createMegaConfetti() {
        const colors = ['#7B2CBF', '#9D4EDD', '#FFE066', '#FFE5CC', '#F3E8FF'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const size = 6 + Math.random() * 12;
                confetti.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: -20px;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    pointer-events: none;
                    z-index: 9999;
                    animation: mega-confetti-fall 4s ease-out forwards;
                    transform: rotate(${Math.random() * 360}deg);
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (document.body.contains(confetti)) {
                        document.body.removeChild(confetti);
                    }
                }, 4000);
            }, i * 30);
        }
    }
    
    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Enhanced hover effects for cards
    document.querySelectorAll('.glass-card, .ambassador-card, .story-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(1deg) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });
    
    // Polaroid interaction
    document.querySelectorAll('.polaroid').forEach(polaroid => {
        polaroid.addEventListener('click', function() {
            // Create a "photo taken" effect
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: white;
                z-index: 9999;
                pointer-events: none;
                animation: camera-flash 0.3s ease-out;
            `;
            
            document.body.appendChild(flash);
            
            setTimeout(() => {
                document.body.removeChild(flash);
            }, 300);
            
            // Play camera sound (if audio is enabled)
            playDelightfulSound('camera');
        });
    });
    
    // Gentle scroll spy for navigation
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Playful sound effects (optional)
    function playDelightfulSound(type) {
        // Only if user has interacted (to comply with browser policies)
        if (document.hasUserInteraction) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            const frequencies = {
                camera: 800,
                success: 523.25, // C5
                gentle: 392.00   // G4
            };
            
            oscillator.frequency.value = frequencies[type] || 440;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    }
    
    // Track user interaction for audio
    document.addEventListener('click', () => {
        document.hasUserInteraction = true;
    }, { once: true });
    
    console.log('✨ All magical features loaded! Welcome to the community!');
});

// Add CSS for mobile menu toggle
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: white;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
        padding: 2rem 0;
    }

    .nav-menu.active {
        left: 0;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
}

/* Notification styles */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
    overflow: hidden;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid var(--serah-purple);
}

.notification-error {
    border-left: 4px solid #ef4444;
}

.notification-content {
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification-message {
    color: var(--text-dark);
    font-weight: 500;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-gray);
    cursor: pointer;
    padding: 0;
    margin-left: 1rem;
}

.notification-close:hover {
    color: var(--text-dark);
}

/* Animation classes */
.animate-in {
    animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Button ripple effect */
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Loading button state */
.btn.loading {
    position: relative;
    color: transparent;
}

.btn.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    transform: translate(-50%, -50%);
    color: inherit;
}

@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Form focus states */
.form-group.focused label,
.form-group.has-value label {
    transform: translateY(-25px) scale(0.9);
    color: var(--pastel-yellow);
}

/* Navbar scroll states */
.navbar.scroll-down {
    transform: translateY(-100%);
}

.navbar.scroll-up {
    transform: translateY(0);
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);
