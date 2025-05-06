/**
 * Nehora - Video Production and Live Stream Website
 * Main JavaScript File
 * Author: Claude
 * Version: 2.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links li a');
    
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Portfolio filtering with pagination
    const portfolioTabs = document.querySelectorAll('.tab-btn');
    const portfolioItemElements = document.querySelectorAll('.portfolio-item');
    const loadMoreBtn = document.querySelector('.portfolio-load-more');
    const itemsPerPage = 6; // Show 6 items per page
    let currentPage = 1;
    
    // Initialize portfolio
    function initPortfolio() {
        const activeTab = document.querySelector('.tab-btn.active');
        const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
        
        // Reset current page when changing tabs
        currentPage = 1;
        
        // Filter items based on category
        const filteredItems = Array.from(portfolioItemElements).filter(function(item) {
            return category === 'all' || item.getAttribute('data-category') === category;
        });
        
        // Hide all items first
        portfolioItemElements.forEach(function(item) {
            item.style.display = 'none';
            item.style.opacity = '0';
        });
        
        // Show first page of filtered items
        showItems(filteredItems, 1);
        
        // Show/hide load more button based on total items
        toggleLoadMoreButton(filteredItems);
    }
    
    // Show items for a specific page
    function showItems(items, page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        for (let i = 0; i < items.length; i++) {
            if (i >= startIndex && i < endIndex) {
                items[i].style.display = 'block';
                setTimeout(function() {
                    items[i].style.opacity = '1';
                }, 50 * (i - startIndex));
            } else {
                items[i].style.display = 'none';
                items[i].style.opacity = '0';
            }
        }
    }
    
    // Toggle load more button visibility
    function toggleLoadMoreButton(items) {
        if (items.length <= currentPage * itemsPerPage) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
    
    // Add event listeners to portfolio tabs
    portfolioTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            portfolioTabs.forEach(function(t) {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Initialize portfolio with the new category
            initPortfolio();
        });
    });
    
    // Add event listener to load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.tab-btn.active');
            const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
            
            // Filter items based on category
            const filteredItems = Array.from(portfolioItemElements).filter(function(item) {
                return category === 'all' || item.getAttribute('data-category') === category;
            });
            
            // Increment current page
            currentPage++;
            
            // Show items for the new page
            showItems(filteredItems, currentPage);
            
            // Toggle load more button
            toggleLoadMoreButton(filteredItems);
        });
    }
    
    // Initialize portfolio on page load
    initPortfolio();
    
    // Set up portfolio items for optimal display
    portfolioItemElements.forEach(function(item) {
        // Handle hover behavior for portfolio items
        item.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            
            let isValid = true;
            
            if (name.trim() === '') {
                showError('name', 'שם מלא הוא שדה חובה');
                isValid = false;
            } else {
                clearError('name');
            }
            
            if (phone.trim() === '') {
                showError('phone', 'מספר טלפון הוא שדה חובה');
                isValid = false;
            } else {
                clearError('phone');
            }
            
            if (email.trim() === '') {
                showError('email', 'אימייל הוא שדה חובה');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'אנא הזן כתובת אימייל חוקית');
                isValid = false;
            } else {
                clearError('email');
            }
            
            if (isValid) {
                // Submit form via AJAX
                const formData = new FormData(contactForm);
                
                // Display success message
                contactForm.innerHTML = '<div class="success-message">תודה על פנייתך! נחזור אליך בהקדם.</div>';
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        input.classList.add('error');
        
        // Check if error message exists
        let errorMessage = input.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('span');
            errorMessage.classList.add('error-message');
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
        }
        
        errorMessage.textContent = message;
    }
    
    function clearError(inputId) {
        const input = document.getElementById(inputId);
        input.classList.remove('error');
        
        // Remove error message if exists
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    
    // ===== CLIENTS LOGO CAROUSEL ===== //
    initLogosGrid();
    
    // Start counters animation when they are in viewport
    const counters = document.querySelectorAll('.counter-number');
    let startedCounting = false;
    
    function startCounting() {
        if (startedCounting) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            
            const updateCounter = () => {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Use easeOutQuad for smooth animation
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const currentValue = Math.floor(target * easeProgress);
                
                counter.textContent = `+${currentValue}`;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = `+${target}`;
                }
            };
            
            updateCounter();
        });
        
        startedCounting = true;
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Check counters on scroll
    window.addEventListener('scroll', function() {
        if (counters.length > 0 && isInViewport(counters[0])) {
            startCounting();
        }
    });
    
    // Check on initial load too
    if (counters.length > 0 && isInViewport(counters[0])) {
        startCounting();
    }
    
    // Initialize any animated shapes
    animateShapes();
    
    // Initialize Why Us icons hover effect
    initWhyUsIcons();
    
    // Initialize animations for stats counter
    initStatsCounter();

    // Video Modal
    const videoModal = document.getElementById('video-modal');
    const videoIframe = document.getElementById('modal-video-iframe');
    const videoLinks = document.querySelectorAll('.view-project:not(.view-image)');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Image Modal
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const imageLinks = document.querySelectorAll('.view-image');
    
    // Function to open video modal with YouTube embed
    function openVideoModal(videoId) {
        console.log('Opening video modal with ID:', videoId);
        if (videoId) {
            videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            console.error("No video ID provided");
        }
    }
    
    // Function to open image modal
    function openImageModal(imageSrc) {
        modalImage.src = imageSrc;
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close modals
    function closeModals() {
        videoModal.style.display = 'none';
        imageModal.style.display = 'none';
        videoIframe.src = '';
        document.body.style.overflow = 'auto'; // Allow scrolling again
    }
    
    // Event listeners for video links
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            console.log('Clicked video link with ID:', videoId);
            if (videoId) {
                openVideoModal(videoId);
            } else {
                console.error("No video ID found on this link");
            }
        });
    });
    
    // Event listeners for image links
    imageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const imageSrc = this.getAttribute('href');
            openImageModal(imageSrc);
        });
    });
    
    // Event listeners for close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });
    
    // Close modal when clicking outside of content
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeModals();
        }
        if (e.target === imageModal) {
            closeModals();
        }
    });
    
    // Close modal with Escape key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModals();
        }
    });
    
    // Add additional podcast links for the remaining shorts
    const podcastContainer = document.querySelector('.portfolio-tabs');
    if (podcastContainer) {
        // Additional functionality can be added here if needed
    }
});

// ===== COUNTER ANIMATION ===== //
function animateCounter() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // הזמן בms לכל מספר 

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            
            if (count < target) {
                count += increment;
                counter.innerText = "+" + Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = "+" + target;
            }
        };
        
        updateCount();
    });
}

// Trigger counter animation when element is in view
const stats = document.querySelector('.statistics');
if (stats) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(stats);
}

// ===== MOBILE MENU TOGGLE ===== //
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ===== HEADER SCROLL EFFECT ===== //
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== PORTFOLIO FILTER ===== //
const tabBtns = document.querySelectorAll('.tab-btn');
const portfolioItemElements = document.querySelectorAll('.portfolio-item');

if (tabBtns.length > 0 && portfolioItemElements.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-category');
            
            // Filter portfolio items
            portfolioItemElements.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== FORM VALIDATION ===== //
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        
        if (!nameInput.value.trim()) {
            valid = false;
            nameInput.classList.add('error');
        } else {
            nameInput.classList.remove('error');
        }
        
        if (!phoneInput.value.trim()) {
            valid = false;
            phoneInput.classList.add('error');
        } else {
            phoneInput.classList.remove('error');
        }
        
        if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
            valid = false;
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
        }
        
        if (valid) {
            // Here you would normally send the form data to your server
            // For demo purposes, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'תודה! הטופס נשלח בהצלחה. ניצור איתך קשר בהקדם.';
            
            contactForm.appendChild(successMessage);
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

// ===== SCROLL TO SECTION ===== //
const navLinksList = document.querySelectorAll('.nav-links a');

if (navLinksList.length > 0) {
    navLinksList.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Show first testimonial - update this to use the testimonial functions from main code
    const firstTestimonial = document.querySelector('.testimonial-slide');
    if (firstTestimonial) {
        firstTestimonial.style.display = 'block';
        firstTestimonial.style.opacity = '1';
    }
    
    // Animate counters if visible
    if (stats && isInViewport(stats)) {
        animateCounter();
    }
});

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate shapes in various sections
function animateShapes() {
    const shapes = document.querySelectorAll('.cta-shape');
    
    shapes.forEach(shape => {
        let randomX = Math.random() * 20 - 10; // -10 to 10
        let randomY = Math.random() * 20 - 10; // -10 to 10
        
        // Add random movement to each shape
        shape.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${randomX}px, ${randomY}px)` },
            { transform: 'translate(0, 0)' }
        ], {
            duration: 15000,
            iterations: Infinity,
            easing: 'ease-in-out',
            direction: 'alternate'
        });
    });
}

// Initialize the hover effect for Why Us icons
function initWhyUsIcons() {
    const whyUsItems = document.querySelectorAll('.why-us-item');
    
    whyUsItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.why-us-icon i');
            if (icon) {
                icon.classList.add('animated', 'pulse');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.why-us-icon i');
            if (icon) {
                icon.classList.remove('animated', 'pulse');
            }
        });
    });
}

// Statistics counter animation
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter-number');
    const statsSection = document.querySelector('.statistics');
    
    function startCounting() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / duration * 10;
            let currentCount = 0;
            
            const updateCounter = () => {
                if (currentCount < target) {
                    currentCount += increment;
                    counter.textContent = "+" + Math.min(Math.floor(currentCount), target);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = "+" + target;
                }
            };
            
            updateCounter();
        });
    }
    
    if (statsSection) {
        // Check if stats section is in viewport on page load
        if (isInViewport(statsSection)) {
            startCounting();
        }
        
        // Check on scroll
        window.addEventListener('scroll', () => {
            if (isInViewport(statsSection) && !statsSection.classList.contains('counted')) {
                statsSection.classList.add('counted');
                startCounting();
            }
        });
    }
}

// החלפת פונקציית הקרוסלה בפונקציה לאנימציית לוגואים
function initLogosGrid() {
    console.log("Initializing logos grid animations...");
    
    const logoItems = document.querySelectorAll('.logo-item');
    
    if (!logoItems || logoItems.length === 0) {
        console.error("No logo items found");
        return;
    }
    
    console.log(`Found ${logoItems.length} logo items`);
    
    // הגדרת השהיות לכניסה מדורגת
    logoItems.forEach((item, index) => {
        // קביעת השהייה לאנימציית הכניסה המדורגת
        const delay = item.getAttribute('data-delay') || (index * 100);
        item.style.animationDelay = `${delay}ms`;
        
        // אפקט הגדלה והוספת צל בהובר
        item.addEventListener('mouseenter', function() {
            const logo = this.querySelector('.client-logo');
            if (logo) {
                // הוספת אפקט נוסף - הארה קלה
                logo.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                logo.style.filter = 'grayscale(0%) brightness(1.1) drop-shadow(0 0 8px rgba(255, 102, 0, 0.3))';
                logo.style.transform = 'scale(1.1)';
            }
            
            // הוספת רקע זוהר
            this.style.background = 'linear-gradient(135deg, white, rgba(255, 245, 235, 1))';
        });
        
        // איפוס למצב רגיל בעת עזיבת העכבר
        item.addEventListener('mouseleave', function() {
            const logo = this.querySelector('.client-logo');
            if (logo) {
                logo.style.transition = 'all 0.4s ease';
                logo.style.filter = 'grayscale(100%)';
                logo.style.transform = 'scale(1)';
            }
            
            this.style.background = 'white';
        });
    });
    
    // אנימציה מתמשכת - הבהוב אקראי של פריטים
    function startRandomAnimations() {
        setInterval(() => {
            // בחירת מספר אקראי של אלמנטים (1-3) להדגשה
            const numToAnimate = Math.floor(Math.random() * 3) + 1;
            
            for (let i = 0; i < numToAnimate; i++) {
                const randomIndex = Math.floor(Math.random() * logoItems.length);
                const randomItem = logoItems[randomIndex];
                
                // בדיקה שהאלמנט לא באנימציה כבר
                if (!randomItem.classList.contains('pulse-animation')) {
                    randomItem.classList.add('pulse-animation');
                    
                    // הפיכת הלוגו לצבעוני באופן זמני
                    const logo = randomItem.querySelector('.client-logo');
                    if (logo) {
                        logo.style.filter = 'grayscale(0%)';
                        
                        // החזרה לגווני אפור בסוף האנימציה
                        setTimeout(() => {
                            logo.style.filter = 'grayscale(100%)';
                        }, 1400);
                    }
                    
                    // הסרת האנימציה לאחר שמסתיימת
                    setTimeout(() => {
                        randomItem.classList.remove('pulse-animation');
                    }, 1500);
                }
            }
        }, 3000);
    }
    
    // הפעלת אנימציות אקראיות
    startRandomAnimations();
    
    console.log("Logos grid animations initialized");
} 