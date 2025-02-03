document.addEventListener('DOMContentLoaded', function() {
    // Advanced Hero Carousel with Smooth Transitions
    const heroCards = document.querySelectorAll('.hero-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 2; // Start with middle card active

    function updateActiveCard() {
        heroCards.forEach((card, index) => {
            card.classList.remove('active');
            card.style.transform = 'scale(1)';
            card.style.opacity = '0.7';
            
            if (index === currentIndex) {
                card.classList.add('active');
                card.style.transform = 'scale(1.2)';
                card.style.opacity = '1';
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + heroCards.length) % heroCards.length;
        updateActiveCard();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % heroCards.length;
        updateActiveCard();
    });

    // Smooth Scroll with Elegant Easing
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax and Scrolling Effects
    const parallaxElements = [
        { element: '.hero', speed: 0.5 },
        { element: '.whats-new', speed: 0.3 },
        { element: '.tips-tricks', speed: 0.4 }
    ];

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Parallax backgrounds
        parallaxElements.forEach(item => {
            const element = document.querySelector(item.element);
            if (element) {
                element.style.backgroundPositionY = `${scrolled * item.speed}px`;
            }
        });

        // Header scroll effect
        const header = document.querySelector(".main-header");
        header.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Advanced Scroll-Triggered Animations
    const animationElements = [
        { selector: '.news-item', 
          animationIn: 'fadeInUp', 
          threshold: 0.1 
        },
        { selector: '.tip-item', 
          animationIn: 'fadeInRight', 
          threshold: 0.2 
        },
        { selector: '.hero-card', 
          animationIn: 'zoomIn', 
          threshold: 0.5 
        }
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated', entry.target.dataset.animation);
            }
        });
    }, {
        threshold: entry => entry.threshold
    });

    animationElements.forEach(config => {
        const elements = document.querySelectorAll(config.selector);
        elements.forEach(element => {
            element.dataset.animation = config.animationIn;
            element.style.opacity = '0';
            element.style.transition = 'all 0.8s ease-out';
            observer.observe(element);
        });
    });

    // Interactive CTA Button Hover Effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 6px 12px rgba(2, 114, 252, 0.3)';
        });

        ctaButton.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
    }

    // Hover Effects for Social Icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.5s ease';
        });

        icon.addEventListener('mouseout', function() {
            this.style.transform = 'rotate(0deg)';
        });
    });
});

// Keyframe Animations (to be added to CSS)
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerHTML = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes zoomIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
}

.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

.fadeInUp { animation-name: fadeInUp; }
.fadeInRight { animation-name: fadeInRight; }
.zoomIn { animation-name: zoomIn; }
`;
document.head.appendChild(styleSheet);