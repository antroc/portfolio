// Animaciones y funcionalidad interactiva

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funciones
    initSkillBars();
    initScrollAnimations();
    initSmoothScrolling();
    initParallaxEffect();
    initTypingEffect();
});

// Animación de barras de habilidades
function initSkillBars() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Añadir clase fade-in a elementos que deben animarse
    const elementsToAnimate = [
        '.stat-card',
        '.skill-category',
        '.timeline-item',
        '.credentials-card',
        '.education-card'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('fade-in');
            fadeObserver.observe(element);
        });
    });
}

// Scroll suave para enlaces internos
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efecto parallax sutil en el hero
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Efecto de escritura en el título
function initTypingEffect() {
    const title = document.querySelector('.hero-title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar efecto después de un pequeño delay
        setTimeout(typeWriter, 1000);
    }
}

// Contador animado para las estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Inicializar contadores cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', animateCounters);

// Botón de scroll to top (opcional)
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
        }
    });
}

// Activar botón de scroll to top
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Efecto hover para las tarjetas de timeline
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeft = '5px solid #667eea';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderLeft = '1px solid #eee';
        });
    });
});

// Lazy loading para optimización
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Prevenir scroll horizontal accidental
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflowX = 'hidden';
});

// Analytics de interacciones (opcional - para métricas)
function trackInteraction(action, element) {
    // Aquí se pueden enviar eventos a Google Analytics o similar
    console.log(`Interacción: ${action} en ${element}`);
}

// Event listeners para tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track clicks en enlaces sociales
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            trackInteraction('click', 'social-link');
        });
    });

    // Track clicks en información de contacto
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', (e) => {
            trackInteraction('click', 'contact-info');
        });
    });

    // Track clicks en enlaces de artículos
    document.querySelectorAll('.articles-link').forEach(link => {
        link.addEventListener('click', (e) => {
            trackInteraction('click', 'articles-link');
        });
    });
});

// Optimización de performance
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

// Usar debounce para eventos de scroll intensivos
const debouncedScrollHandler = debounce(() => {
    // Manejar eventos de scroll aquí si es necesario
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
