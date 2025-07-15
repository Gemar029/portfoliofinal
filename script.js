// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
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

// Navbar scroll effect
function initNavbarScrollEffect() {
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuBtn || !navLinks) return;

    function toggleMenu() {
        navLinks.classList.toggle('active');
        // Hamburger icon to X
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '&#9776;';
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    }

    function handleClickOutside(event) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            closeMenu();
        }
    }

    // Toggle menu open/close
    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });

    // Reset menu state on window resize
    window.addEventListener('resize', handleResize);

    // Close menu when clicking outside
    document.addEventListener('click', handleClickOutside);
}

// Contact form handling with EmailJS
function initContactForm() {
    // Check if emailjs is available
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS is not loaded');
        return;
    }

    emailjs.init('l60NZFNgB-8vDPHKn');

    const form = document.querySelector('#contactForm');
    const submitBtn = form && form.querySelector('.submit-btn');
    const successModal = document.getElementById('successModal');
    const closeSuccessBtn = document.getElementById('closeSuccessModal');

    if (!form || !submitBtn || !successModal || !closeSuccessBtn) return;

    // Hide success modal initially
    successModal.style.display = 'none';

    function closeModal() {
        successModal.style.display = 'none';
    }

    function showSuccessModal() {
        successModal.style.display = 'flex';
        setTimeout(function() {
            successModal.style.display = 'none';
        }, 3000);
    }

    function setLoadingState() {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
    }

    function resetButtonState() {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        setLoadingState();

        // Send with EmailJS
        emailjs.sendForm('service_mcrst8c', 'template_zgueelg', form)
            .then(function() {
                form.reset();
                resetButtonState();
                showSuccessModal();
            })
            .catch(function(error) {
                console.error('EmailJS error:', error);
                alert('Something went wrong. Please try again.');
                resetButtonState();
            });
    }

    // Close modal on click
    closeSuccessBtn.addEventListener('click', closeModal);

    // Submit form
    form.addEventListener('submit', handleFormSubmit);
}

// Add animation on scroll on pages content
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .cert-card');
    const elementVisible = 150;
    
    elements.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

function initScrollAnimations() {
    // Initialize elements with hidden state
    document.querySelectorAll('.skill-card, .cert-card').forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Add event listeners
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
}

// Certificate modal fullscreen on click
function initCertificateModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".image-modal .close");
    const certImages = document.querySelectorAll(".cert-image img");

    if (!modal || !modalImg || !closeBtn || certImages.length === 0) return;

    function openModal(imageSrc, imageAlt) {
        modal.classList.remove("hidden");
        modal.classList.add("show");
        modalImg.src = imageSrc;
        modalImg.alt = imageAlt || "Certificate";
    }

    function closeModal() {
        modal.classList.remove("show");
        modal.classList.add("hidden");
    }

    function handleImageClick(img) {
        return function() {
            openModal(img.src, img.alt);
        };
    }

    function handleModalClick(e) {
        if (e.target === modal) {
            closeModal();
        }
    }

    // Add event listeners to certificate images
    certImages.forEach(function(img) {
        img.addEventListener("click", handleImageClick(img));
    });

    // Close modal events
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", handleModalClick);
}

// Typewriter effect on hero Name
function typewriterEffect(elementId, texts, options = {}) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id "${elementId}" not found`);
        return;
    }
    
    // Default options
    const settings = {
        typeSpeed: 100,
        deleteSpeed: 50,
        pauseTime: 2000,
        initialPause: 2000,
        ...options
    };
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isInitialized = false;
    
    function type() {
        const currentText = texts[currentTextIndex];
        
        if (!isDeleting) {
            // Typing
            element.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                // Finished typing, pause then start deleting
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, settings.pauseTime);
            } else {
                setTimeout(type, settings.typeSpeed);
            }
        } else {
            // Deleting
            element.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                // Finished deleting, move to next text
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(type, settings.typeSpeed);
            } else {
                setTimeout(type, settings.deleteSpeed);
            }
        }
    }

    // Initialize with first text fully loaded
    element.textContent = texts[0];
    currentCharIndex = texts[0].length;
    
    // Start the effect after initial pause by deleting the first text
    setTimeout(() => {
        isDeleting = true;
        type();
    }, settings.initialPause);
}

function initTypewriterEffect() {
    typewriterEffect('typewriter', [
        "Hi, I'm Gemar Alegre",
        "こんにちは、ゲマー・アレグレです",
        "Kamusta, Ako si Gemar Alegre",
        "Welcome to my Portfolio"
    ], {
        typeSpeed: 150,
        deleteSpeed: 75,
        pauseTime: 2000,
        initialPause: 5000
    });
}

// Theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const storageKey = 'theme';

    if (!themeToggle) {
        console.warn('Theme toggle element not found');
        return;
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem(storageKey);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');

        if (theme === 'dark') {
            body.classList.add('dark');
        }
    }

    function toggleTheme() {
        const isDark = body.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';

        setTheme(newTheme);
        saveTheme(newTheme);
        addHapticFeedback();
    }

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }

        updateAriaAttributes();
        dispatchThemeChangeEvent(theme);
    }

    function saveTheme(theme) {
        localStorage.setItem(storageKey, theme);
    }

    function updateAriaAttributes() {
        const isDark = body.classList.contains('dark');
        themeToggle.setAttribute('aria-checked', isDark);
        themeToggle.setAttribute(
            'aria-label',
            isDark ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    function addHapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    function dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: { theme: theme },
        });
        document.dispatchEvent(event);
    }

    function handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    }

    function handleSystemThemeChange(e) {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(storageKey)) {
            if (e.matches) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }
    }

    // Load saved theme
    loadTheme();

    // Set up event listeners
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('keydown', handleKeydown);

    // Listen for system theme changes
    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', handleSystemThemeChange);

    // Initialize accessibility attributes
    updateAriaAttributes();
}


// Initializing all functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initNavbarScrollEffect();
    initMobileMenu();
    initScrollAnimations();
    initCertificateModal();
    initTypewriterEffect();
    initContactForm();
    initThemeToggle();
});