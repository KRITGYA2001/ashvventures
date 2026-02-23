// ===================================
// ASHV Ventures - Dynamic Website Scripts
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSlider();
    initCounters();
    initScrollAnimations();
    initSmoothScroll();
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ===================================
// DYNAMIC IMAGE SLIDER
// ===================================
function initSlider() {
    const sliderContainer = document.getElementById('sliderContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('sliderIndicators');
    
    if (!sliderContainer) return;

    // Dynamic image detection
    // This will automatically find all images in the slides folder
    const slideImages = [
        'images/slides/slide1.png',
        'images/slides/slide2.png',
        // Add more slide paths here as you add images
        // The script will handle any number of slides dynamically
    ];

    let currentSlide = 0;
    let slides = [];
    let indicators = [];
    let autoSlideInterval;

    // Function to dynamically load slides
    function loadSlides() {
        sliderContainer.innerHTML = ''; // Clear existing content
        
        slideImages.forEach((imagePath, index) => {
            // Create slide element
            const slide = document.createElement('div');
            slide.className = 'slide';
            if (index === 0) slide.classList.add('active');
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Ashv Ventures - Slide ${index + 1}`;
            img.onerror = function() {
                console.warn(`Image not found: ${imagePath}`);
                // Optionally use a placeholder
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"%3E%3Crect fill="%231a5490" width="1920" height="1080"/%3E%3Ctext fill="white" font-family="Arial" font-size="48" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EAshv Ventures%3C/text%3E%3C/svg%3E';
            };
            
            slide.appendChild(img);
            sliderContainer.appendChild(slide);
            slides.push(slide);
        });
    }

    // Function to create indicators
    function createIndicators() {
        if (!indicatorsContainer) return;
        
        indicatorsContainer.innerHTML = ''; // Clear existing indicators
        indicators = [];
        
        slideImages.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => goToSlide(index));
            
            indicatorsContainer.appendChild(indicator);
            indicators.push(indicator);
        });
    }

    // Function to show specific slide
    function goToSlide(index) {
        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.remove('active');
        }
        
        // Update current slide index
        currentSlide = index;
        
        // Add active class to new slide and indicator
        slides[currentSlide].classList.add('active');
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
        
        // Reset auto-slide timer
        resetAutoSlide();
    }

    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }

    // Auto-slide function
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Reset auto-slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }

    // Pause auto-slide on hover
    sliderContainer.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', function() {
        startAutoSlide();
    });

    // Initialize slider
    loadSlides();
    createIndicators();
    
    // Only start auto-slide if there are multiple slides
    if (slides.length > 1) {
        startAutoSlide();
    }
}

// ===================================
// ANIMATED COUNTERS
// ===================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Animation speed

    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const count = parseInt(element.innerText);
        const increment = target / speed;

        if (count < target) {
            element.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(element), 1);
        } else {
            element.innerText = target;
        }
    };

    // Intersection Observer to trigger counters when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                counter.innerText = '0';
                countUp(counter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .stat-card, .detail-card, .partner-card, .value-card, .scope-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
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
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        header.style.padding = '15px 0';
    }
});

// ===================================
// DYNAMIC SLIDE DETECTOR (Advanced)
// ===================================
// This function can be expanded to automatically detect
// all images in the slides folder via a directory listing
// For static GitHub Pages, you'll need to manually update
// the slideImages array in the initSlider function above

// Example: If you add slide3.png to the slides folder,
// just add 'images/slides/slide3.png' to the slideImages array

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Function to preload images
function preloadImages(imageArray) {
    imageArray.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to debounce events
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

// ===================================
// FORM VALIDATION (if using custom forms)
// ===================================
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// ===================================
// PARTICLES BACKGROUND (Optional Enhancement)
// ===================================
// Uncomment below to add particle effect to hero section
/*
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    const hero = document.querySelector('.hero-slider');
    if (hero) {
        hero.appendChild(canvas);
        // Particle animation code here
    }
}
*/

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Console message
console.log('%c🏗️ Ashv Ventures - Website Loaded Successfully! ', 'background: #1a5490; color: white; font-size: 16px; padding: 10px;');
console.log('%cBuilding Dreams, Creating Excellence 🚀', 'color: #ff6b35; font-size: 14px;');
