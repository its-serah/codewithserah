(function() {
    document.addEventListener('DOMContentLoaded', function() {
        document.body.classList.add('js-enabled');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        initMobileNavigation();
        initHeroObserver();
        initCodeTyping(prefersReducedMotion);
        initStatCounters(prefersReducedMotion);
        initScrollReveal(prefersReducedMotion);
        initConfetti(prefersReducedMotion);
        initNewsletter();
    });

    function initMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    function initHeroObserver() {
        const navbar = document.querySelector('.navbar');
        const hero = document.querySelector('.hero');
        if (!navbar || !hero) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                navbar.classList.toggle('is-scrolled', !entry.isIntersecting);
            });
        }, { rootMargin: '-80px 0px 0px 0px', threshold: 0 });

        observer.observe(hero);
    }

    function initCodeTyping(prefersReducedMotion) {
        const codeElement = document.querySelector('.code-typing');
        if (!codeElement) return;

        let lines;
        try {
            lines = JSON.parse(codeElement.dataset.lines || '[]');
        } catch (error) {
            lines = [];
        }

        if (!Array.isArray(lines) || lines.length === 0) {
            return;
        }

        if (prefersReducedMotion) {
            codeElement.textContent = lines.join('\n');
            return;
        }

        const caret = document.createElement('span');
        caret.className = 'code-caret';
        let lineIndex = 0;
        let charIndex = 0;
        let buffer = '';

        const typeNext = () => {
            if (lineIndex >= lines.length) {
                return;
            }

            const currentLine = lines[lineIndex];
            buffer += currentLine.charAt(charIndex);
            charIndex += 1;

            if (charIndex > currentLine.length) {
                buffer += '\n';
                lineIndex += 1;
                charIndex = 0;
            }

            codeElement.textContent = buffer;
            codeElement.appendChild(caret);

            if (lineIndex < lines.length) {
                const delay = currentLine.charAt(charIndex - 1) === ' ' ? 40 : 70;
                window.setTimeout(typeNext, delay);
            }
        };

        typeNext();
    }

    function initStatCounters(prefersReducedMotion) {
        const counters = document.querySelectorAll('.stat-card');
        if (!counters.length) return;

        const animateCounter = (element) => {
            const target = Number(element.dataset.target || 0);
            const suffix = element.dataset.suffix || '';
            const numberElement = element.querySelector('.stat-number');
            if (!numberElement) return;

            if (prefersReducedMotion) {
                numberElement.textContent = formatNumber(target, suffix);
                return;
            }

            const duration = 1400;
            const start = performance.now();

            const step = (timestamp) => {
                const progress = Math.min((timestamp - start) / duration, 1);
                const eased = easeOutCubic(progress);
                const value = Math.floor(eased * target);
                numberElement.textContent = formatNumber(value, suffix);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    numberElement.textContent = formatNumber(target, suffix);
                }
            };

            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(card => observer.observe(card));
    }

    function initScrollReveal(prefersReducedMotion) {
        if (prefersReducedMotion) {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    function initConfetti(prefersReducedMotion) {
        if (prefersReducedMotion) {
            return;
        }

        const triggers = document.querySelectorAll('.confetti-trigger');
        if (!triggers.length) return;

        triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', () => launchConfetti(trigger));
            trigger.addEventListener('focus', () => launchConfetti(trigger));
        });
    }

    function launchConfetti(trigger) {
        const bounds = trigger.getBoundingClientRect();
        const colors = ['#FBE58C', '#FFD1A8', '#A68BE0', '#2F4464'];
        const pieces = 18;

        for (let i = 0; i < pieces; i += 1) {
            const piece = document.createElement('span');
            piece.className = 'confetti-piece';
            piece.style.background = colors[i % colors.length];
            piece.style.left = `${bounds.left + bounds.width / 2}px`;
            piece.style.top = `${bounds.top + window.scrollY + bounds.height / 2}px`;
            document.body.appendChild(piece);

            const angle = (Math.PI * 2 * i) / pieces;
            const distance = 40 + Math.random() * 40;
            const translateX = Math.cos(angle) * distance;
            const translateY = Math.sin(angle) * distance;

            requestAnimationFrame(() => {
                piece.style.opacity = '1';
                piece.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${Math.random() * 160 - 80}deg)`;
                piece.style.transition = 'transform 600ms ease-out, opacity 600ms ease-out';
            });

            window.setTimeout(() => {
                piece.style.opacity = '0';
                piece.addEventListener('transitionend', () => piece.remove(), { once: true });
            }, 600);
        }
    }

    function initNewsletter() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', event => {
            event.preventDefault();
            const email = form.querySelector('input[type="email"]');
            if (!email || !email.value.trim()) {
                email?.focus();
                return;
            }

            email.value = '';
            form.classList.add('success');
            window.setTimeout(() => form.classList.remove('success'), 2000);
        });
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function formatNumber(value, suffix) {
        const formatted = new Intl.NumberFormat('en-US').format(value);
        return `${formatted}${suffix}`;
    }
})();
