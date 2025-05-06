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
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const itemsPerPageAll = 12; // Show 12 items (3×4 grid) when showing all items
    const itemsPerPageFiltered = 6; // Show 6 items (2×3 grid) when filtering
    let currentPage = 1;
    
    // Initialize portfolio
    function initPortfolio() {
        const activeTab = document.querySelector('.tab-btn.active');
        const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
        
        // Reset current page when changing tabs
        currentPage = 1;
        
        // Filter items based on category
        let filteredItems = [];
        
        if (category === 'all') {
            // בכרטיסיית "הכל" - מציג בדיוק 9 סרטונים בחלוקה ספציפית
            // 4 שידורים חיים
            const liveItems = Array.from(portfolioItemElements).filter(item => 
                item.getAttribute('data-category') === 'live');
            // 2 עריכות
            const editingItems = Array.from(portfolioItemElements).filter(item => 
                item.getAttribute('data-category') === 'editing');
            // 1 הופעה
            const performanceItems = Array.from(portfolioItemElements).filter(item => 
                item.getAttribute('data-category') === 'performance');
            // 2 סושיאל
            const socialItems = Array.from(portfolioItemElements).filter(item => 
                item.getAttribute('data-category') === 'social');
            
            // ערבוב כל קבוצה בנפרד
            shuffleArray(liveItems);
            shuffleArray(editingItems);
            shuffleArray(performanceItems);
            shuffleArray(socialItems);
            
            // שילוב של אלמנטים מכל קטגוריה
            filteredItems = [
                ...liveItems.slice(0, 4),      // 4 שידורים
                ...editingItems.slice(0, 2),   // 2 עריכות
                ...performanceItems.slice(0, 1), // 1 הופעה
                ...socialItems.slice(0, 2)     // 2 סושיאל
            ];
            
            // ערבוב סופי של הרשימה המשולבת
            shuffleArray(filteredItems);
        } else {
            // פילטור רגיל לקטגוריות אחרות
            filteredItems = Array.from(portfolioItemElements).filter(function(item) {
                return item.getAttribute('data-category') === category;
            });
        }
        
        // Hide all items first
        portfolioItemElements.forEach(function(item) {
            item.style.display = 'none';
            item.style.opacity = '0';
        });
        
        // Toggle filtering class on portfolio grid
        if (category === 'all') {
            portfolioGrid.classList.remove('filtering');
        } else {
            portfolioGrid.classList.add('filtering');
        }
        
        // Determine items per page based on category
        const itemsPerPage = category === 'all' ? 9 : itemsPerPageFiltered;
        
        // Show first page of filtered items
        showItems(filteredItems, 1, itemsPerPage);
    }
    
    // Show items for a specific page
    function showItems(items, page, itemsPerPage) {
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
    function toggleLoadMoreButton(items, itemsPerPage) {
        if (loadMoreBtn) {
            if (items.length <= currentPage * itemsPerPage) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
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
            
            // טיפול בכפתור "טען עוד" - הצגה רק בקטגוריית "stills"
            if (loadMoreBtn) {
                if (this.getAttribute('data-category') === 'stills') {
                    const stillsItems = document.querySelectorAll('.portfolio-item[data-category="stills"]');
                    const visibleCount = window.innerWidth >= 992 ? 6 : window.innerWidth >= 576 ? 4 : 3;
                    
                    if (stillsItems.length > visibleCount) {
                        loadMoreBtn.style.display = 'inline-block';
                    } else {
                        loadMoreBtn.style.display = 'none';
                    }
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            }
        });
    });
    
    // Load more functionality for portfolio items
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        let visibleItems = {
            desktop: 6,  // מספר פריטים נראים במסך רחב
            tablet: 4,   // מספר פריטים נראים בטאבלט
            mobile: 3    // מספר פריטים נראים במובייל
        };
        
        loadMoreBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.tab-btn.active');
            const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
            
            // אם נמצאים בקטגוריית צילומי סטילס
            if (category === 'stills') {
                let stillsItems = Array.from(document.querySelectorAll('.portfolio-item[data-category="stills"]'));
                let initialCount;
                
                // קביעת מספר הפריטים הנראים בהתאם לרוחב המסך
                if (window.innerWidth >= 992) {
                    initialCount = visibleItems.desktop;
                    visibleItems.desktop += 6;
                } else if (window.innerWidth >= 576) {
                    initialCount = visibleItems.tablet;
                    visibleItems.tablet += 4;
                } else {
                    initialCount = visibleItems.mobile;
                    visibleItems.mobile += 3;
                }
                
                // הצגת פריטים נוספים
                let itemsToShow = stillsItems.slice(initialCount, Math.max(initialCount + 6, stillsItems.length));
                
                itemsToShow.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    }, index * 100);
                });
                
                // הסתרת כפתור אם כל הפריטים מוצגים
                if (window.innerWidth >= 992 && visibleItems.desktop >= stillsItems.length ||
                    window.innerWidth >= 576 && window.innerWidth < 992 && visibleItems.tablet >= stillsItems.length ||
                    window.innerWidth < 576 && visibleItems.mobile >= stillsItems.length) {
                    loadMoreBtn.style.display = 'none';
                }
            } else {
                // לקטגוריות אחרות - שימוש בפונקציונליות המקורית
                const filteredItems = Array.from(portfolioItemElements).filter(function(item) {
                    return category === 'all' || item.getAttribute('data-category') === category;
                });
                
                // Increment current page
                currentPage++;
                
                // Show items for the new page
                showItems(filteredItems, currentPage, itemsPerPageFiltered);
                
                // Toggle load more button
                toggleLoadMoreButton(filteredItems, itemsPerPageFiltered);
            }
        });
        
        // הוספת אירוע כדי לעדכן את מצב הכפתור בעת שינוי גודל החלון
        window.addEventListener('resize', function() {
            const activeTab = document.querySelector('.tab-btn.active');
            const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
            
            if (category === 'stills') {
                let stillsItems = document.querySelectorAll('.portfolio-item[data-category="stills"]');
                
                // איפוס מצב התצוגה של הפריטים בהתאם לרוחב המסך
                stillsItems.forEach((item, index) => {
                    if (window.innerWidth >= 992 && index < visibleItems.desktop ||
                        window.innerWidth >= 576 && window.innerWidth < 992 && index < visibleItems.tablet ||
                        window.innerWidth < 576 && index < visibleItems.mobile) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                    }
                });
                
                // הצגת הכפתור אם יש עוד פריטים להצגה
                if (window.innerWidth >= 992 && visibleItems.desktop < stillsItems.length ||
                    window.innerWidth >= 576 && window.innerWidth < 992 && visibleItems.tablet < stillsItems.length ||
                    window.innerWidth < 576 && visibleItems.mobile < stillsItems.length) {
                    loadMoreBtn.style.display = 'inline-block';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            }
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
    
    // ===== FORM SUBMISSION AND SUCCESS MESSAGE ===== //
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // טיפול בהצגת הודעת הצלחה כשהטופס נשלח
        const showSuccessMessage = () => {
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // גלילה להודעה
                window.scrollTo({
                    top: successMessage.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // איפוס הטופס
                contactForm.reset();
            }
        };
        
        // בדיקה אם הגיעו מהטופס עם הודעת הצלחה
        if (window.location.hash === '#success') {
            showSuccessMessage();
        }
        
        // Add event listener to prevent default form submission when running locally
        contactForm.addEventListener('submit', function(e) {
            // Check if we're running the site from a file:// protocol
            if (window.location.protocol === 'file:') {
                e.preventDefault(); // Stop the form from submitting
                
                // בדיקות בסיסיות של תקינות הטופס
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
                    // Simulate a successful form submission when running locally
                    showSuccessMessage();
                    
                    // Display console message for developer
                    console.log('Form submitted locally. In production, this would be sent to: elazar12321@gmail.com');
                    console.log('Form data:', {
                        name,
                        phone,
                        email,
                        'event-type': document.getElementById('event-type').value,
                        'event-date': document.getElementById('event-date').value,
                        message: document.getElementById('message').value
                    });
                }
            } else {
                // Standard validation for online environment
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
                
                if (!isValid) {
                    e.preventDefault(); // מניעת שליחת הטופס אם יש שגיאה
                }
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Add error class to the input
            const inputField = document.getElementById(fieldId);
            if (inputField) {
                inputField.classList.add('error');
            }
        }
    }
    
    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            
            // Remove error class from the input
            const inputField = document.getElementById(fieldId);
            if (inputField) {
                inputField.classList.remove('error');
            }
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

    // Get elements
    const videoLinks = document.querySelectorAll('.view-project:not(.view-image)');
    const imageLinks = document.querySelectorAll('.view-image');
    const videoModal = document.getElementById('video-modal');
    const imageModal = document.getElementById('image-modal');
    const videoIframe = document.getElementById('modal-video-iframe');
    const modalImage = document.getElementById('modal-image');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Function to close modals
    function closeModals() {
        // Close video modal
        if (videoModal) {
            videoModal.style.display = 'none';
            if (videoIframe) {
                videoIframe.src = '';
            }
        }
        
        // Close image modal
        if (imageModal) {
            imageModal.style.display = 'none';
        }
        
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
    
    // Function to open image modal
    function openImageModal(imageSrc) {
        if (imageSrc && imageModal && modalImage) {
            modalImage.src = imageSrc;
            imageModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
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

// ===== IMAGE MODAL FUNCTIONALITY ===== //
document.addEventListener('DOMContentLoaded', function() {
    // מוצא את כל קישורי התמונות בפורטפוליו
    const imageLinks = document.querySelectorAll('.view-image');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    
    if (imageLinks && imageModal && modalImage) {
        // מוסיף מאזין אירועים לכל קישור תמונה
        imageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const imageSrc = this.getAttribute('href');
                
                // מציג את התמונה במודל
                modalImage.src = imageSrc;
                imageModal.style.display = 'flex';
                document.body.classList.add('modal-open'); // מניעת גלילה
            });
        });
        
        // סגירת המודל בלחיצה על X
        const closeButtons = document.querySelectorAll('.close-modal');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                imageModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            });
        });
        
        // סגירת המודל בלחיצה מחוץ לתמונה
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
        
        // סגירה באמצעות מקש Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.style.display === 'flex') {
                imageModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    }
});

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

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to send form data to WhatsApp
function sendToWhatsApp(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value || '';
    const phone = document.getElementById('phone').value || '';
    const email = document.getElementById('email').value || '';
    const eventType = document.getElementById('event-type').value || '';
    const eventDate = document.getElementById('event-date').value || '';
    const message = document.getElementById('message').value || '';
    
    // Basic minimal validation
    if (!name) {
        alert('אנא הזן שם מלא');
        return false;
    }
    
    // Construct WhatsApp message - using encodeURIComponent for better handling of special characters
    let whatsappMessage = encodeURIComponent(`פנייה חדשה מאתר נהורא\n\n`);
    whatsappMessage += encodeURIComponent(`שם: ${name}\n`);
    whatsappMessage += encodeURIComponent(`טלפון: ${phone}\n`);
    whatsappMessage += encodeURIComponent(`אימייל: ${email}\n`);
    
    if (eventType) {
        whatsappMessage += encodeURIComponent(`סוג אירוע: ${eventType}\n`);
    }
    
    if (eventDate) {
        whatsappMessage += encodeURIComponent(`תאריך: ${eventDate}\n`);
    }
    
    if (message) {
        whatsappMessage += encodeURIComponent(`הודעה: ${message}\n`);
    }
    
    // WhatsApp phone number (international format without +)
    const whatsappNumber = '972525624350';
    
    // Create WhatsApp URL and open it directly
    window.location.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    return false;
} 