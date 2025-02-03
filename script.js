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
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    function createHamburgerMenu() {
        const header = document.querySelector('.main-header');
        const nav = header.querySelector('nav');
        
        // Create hamburger menu if it doesn't exist
        if (!document.querySelector('.hamburger-menu')) {
            const hamburgerMenu = document.createElement('div');
            hamburgerMenu.classList.add('hamburger-menu');
            
            for (let i = 0; i < 3; i++) {
                const line = document.createElement('div');
                line.classList.add('hamburger-line');
                hamburgerMenu.appendChild(line);
            }
            
            hamburgerMenu.addEventListener('click', () => {
                nav.classList.toggle('active');
                
                // Toggle hamburger menu animation
                const lines = hamburgerMenu.querySelectorAll('.hamburger-line');
                lines[0].style.transform = nav.classList.contains('active') 
                    ? 'rotate(-45deg) translate(-5px, 6px)' 
                    : 'rotate(0)';
                lines[1].style.opacity = nav.classList.contains('active') ? '0' : '1';
                lines[2].style.transform = nav.classList.contains('active') 
                    ? 'rotate(45deg) translate(-5px, -6px)' 
                    : 'rotate(0)';
            });
            
            header.appendChild(hamburgerMenu);
        }
    }

    // Smooth Navigation for Mobile
    function setupMobileNavigation() {
        const navLinks = document.querySelectorAll('nav a');
        const nav = document.querySelector('nav');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href');
                const section = document.querySelector(sectionId);
                
                if (section) {
                    section.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start' 
                    });
                    
                    // Close navigation on mobile after selection
                    if (window.innerWidth <= 768) {
                        nav.classList.remove('active');
                    }
                }
            });
        });
    }

    // Add Mobile Responsiveness
    function setupResponsiveDesign() {
        createHamburgerMenu();
        setupMobileNavigation();

        // Close mobile menu if screen is resized to desktop
        window.addEventListener('resize', () => {
            const nav = document.querySelector('nav');
            const hamburgerMenu = document.querySelector('.hamburger-menu');
            
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                
                if (hamburgerMenu) {
                    const lines = hamburgerMenu.querySelectorAll('.hamburger-line');
                    lines.forEach(line => {
                        line.style.transform = 'rotate(0)';
                        line.style.opacity = '1';
                    });
                }
            }
        });
    }

    // Initialize Mobile Responsiveness
    setupResponsiveDesign();
});
document.addEventListener('DOMContentLoaded', function() {
  // Mendapatkan referensi ke elemen-elemen yang diperlukan
  const header = document.querySelector('.main-header');
  const nav = header.querySelector('nav');
  const hamburgerMenu = document.createElement('div');
  hamburgerMenu.classList.add('hamburger-menu');

  // Membuat ikon hamburger
  for (let i = 0; i < 3; i++) {
    const line = document.createElement('div');
    line.classList.add('hamburger-line');
    hamburgerMenu.appendChild(line);
  }

  // Menambahkan event listener pada ikon hamburger
  hamburgerMenu.addEventListener('click', () => {
    nav.classList.toggle('active');

    // Mengubah animasi ikon hamburger
    const lines = hamburgerMenu.querySelectorAll('.hamburger-line');
    lines[0].style.transform = nav.classList.contains('active')
      ? 'rotate(-45deg) translate(-5px, 6px)'
      : 'rotate(0)';
    lines[1].style.opacity = nav.classList.contains('active') ? '0' : '1';
    lines[2].style.transform = nav.classList.contains('active')
      ? 'rotate(45deg) translate(-5px, -6px)'
      : 'rotate(0)';
  });

  // Menambahkan ikon hamburger ke header
  header.appendChild(hamburgerMenu);
});
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the necessary elements
    const heroCards = document.querySelectorAll('.hero-card');
    const carousel = document.querySelector('.hero-carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 2; // Start with middle card active
    let isMouseDown = false;
    let startX, scrollLeft;
  
    function updateActiveCard() {
      heroCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentIndex) {
          card.classList.add('active');
        }
      });
    }
  
    // Handle touch/swipe events for mobile
    carousel.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
  
    carousel.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 3;
      carousel.scrollLeft = scrollLeft - walk;
    });
  
    carousel.addEventListener('mouseup', () => {
      isMouseDown = false;
      const cardWidth = heroCards[0].offsetWidth + 16; // Add some gap between cards
      const scrollPosition = carousel.scrollLeft;
      currentIndex = Math.round(scrollPosition / cardWidth);
      updateActiveCard();
    });
  
    carousel.addEventListener('mouseleave', () => {
      isMouseDown = false;
    });
  
    // Adapt for touch devices
    carousel.addEventListener('touchstart', (e) => {
      isMouseDown = true;
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
  
    carousel.addEventListener('touchmove', (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 3;
      carousel.scrollLeft = scrollLeft - walk;
    });
  
    carousel.addEventListener('touchend', () => {
      isMouseDown = false;
      const cardWidth = heroCards[0].offsetWidth + 16;
      const scrollPosition = carousel.scrollLeft;
      currentIndex = Math.round(scrollPosition / cardWidth);
      updateActiveCard();
    });
  
    // Hide navigation buttons on mobile
    if (window.innerWidth <= 768) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-active');
            hamburger.classList.remove('active');
        });
    });

    // Ensure menu closes on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('mobile-active');
            hamburger.classList.remove('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const heroCards = document.querySelectorAll('.hero-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 2; // Start with middle card active

    function updateActiveCard() {
        heroCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentIndex) {
                card.classList.add('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateActiveCard();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < heroCards.length - 1) {
            currentIndex++;
            updateActiveCard();
        }
    });
});
