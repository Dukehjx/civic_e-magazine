document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.nav__btn');
    const articles = document.querySelectorAll('.card');
    const langToggle = document.getElementById('lang-toggle');
    const body = document.body;

    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-lang') || 'en';
    body.setAttribute('data-lang', savedLang);

    // Language toggle functionality with animation
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = body.getAttribute('data-lang');
            const newLang = currentLang === 'en' ? 'zh' : 'en';
            
            // Add bounce animation
            langToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                langToggle.style.transform = 'scale(1)';
            }, 100);
            
            body.setAttribute('data-lang', newLang);
            localStorage.setItem('preferred-lang', newLang);
        });
    }

    // Category filter functionality with staggered animations
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            let visibleIndex = 0;

            articles.forEach((article, index) => {
                if (category === 'all' || article.getAttribute('data-category') === category) {
                    article.style.display = 'flex';
                    article.style.opacity = '0';
                    article.style.transform = 'translateY(30px)';
                    
                    // Staggered reveal animation
                    setTimeout(() => {
                        article.style.opacity = '1';
                        article.style.transform = 'translateY(0)';
                        article.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, visibleIndex * 100);
                    
                    visibleIndex++;
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });

    // Parallax effect on hero background text
    let lastScrollTop = 0;
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
                const offset = scrollTop * 0.3;
                heroSection.style.backgroundPositionY = `${offset}px`;
            }
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe all cards for scroll animations
    articles.forEach(card => {
        observer.observe(card);
    });

    // Add hover sound effect simulation (visual feedback)
    articles.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Cursor trail effect (subtle)
    let cursorTrail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    });

    // Add custom cursor on cards
    articles.forEach(card => {
        card.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        card.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });

    // Add reading time estimator (optional enhancement)
    articles.forEach(card => {
        const excerpt = card.querySelector('.card__excerpt');
        if (excerpt) {
            const wordCount = excerpt.textContent.split(' ').length;
            const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
            
            // Could add a subtle reading time indicator here if desired
        }
    });

    // Keyboard navigation enhancement
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Page transition effect for internal links
    const internalLinks = document.querySelectorAll('a[href^="articles/"]');
    const pageTransition = document.querySelector('.page-transition');
    
    if (pageTransition) {
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                pageTransition.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        });

        // Remove transition on page load
        window.addEventListener('load', () => {
            pageTransition.classList.remove('active');
        });
    }

    // Add dynamic year to footer (if needed)
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        const yearSpans = footerText.querySelectorAll('span');
        yearSpans.forEach(span => {
            span.textContent = span.textContent.replace('2026', currentYear);
        });
    }

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handler
    const optimizedScrollHandler = debounce(() => {
        // Any scroll-based calculations can go here
    }, 100);

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // Add subtle parallax to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }, { passive: true });
    }

    // Animate numbers if any (for future enhancements)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Log successful initialization
    console.log('%c✓ Public Matters UI Loaded Successfully', 'color: #d41f1f; font-size: 16px; font-weight: bold;');
});
