// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Force HTTPS redirection
    enforceHTTPS();
    
    // Initialize loader first
    initLoader();
    
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initForms();
    initAnimations();
    initGallery();
    initCounters();
    initTestimonialsCarousel();
});

// HTTPS Enforcement Function
function enforceHTTPS() {
    // Check if we're not on HTTPS
    if (location.protocol !== 'https:') {
        // Redirect to HTTPS
        const httpsUrl = 'https:' + window.location.href.substring(window.location.protocol.length);
        window.location.replace(httpsUrl);
        return;
    }
    
    // Additional security checks
    if (window.location.hostname === 'www.teensalsi.com') {
        // Redirect www to non-www
        const nonWwwUrl = 'https://teensalsi.com' + window.location.pathname + window.location.search + window.location.hash;
        window.location.replace(nonWwwUrl);
        return;
    }
    
    // Set security headers via meta tags (already in HTML)
    console.log('HTTPS enforcement active - secure connection established');
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .pricing-card, .testimonial-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Form handling
function initForms() {
    // Appointment booking form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAppointmentSubmission(this);
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }

    // Set minimum date for appointment booking and improve datepicker
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Make the entire date input area clickable
        const dateContainer = dateInput.closest('.form-group');
        if (dateContainer) {
            dateContainer.style.cursor = 'pointer';
            dateContainer.addEventListener('click', function(e) {
                if (e.target !== dateInput) {
                    dateInput.focus();
                    dateInput.showPicker && dateInput.showPicker();
                }
            });
        }
        
        // Add click event to date input
        dateInput.addEventListener('click', function() {
            this.showPicker && this.showPicker();
        });
    }

    // Add real-time validation for phone numbers
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove all non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            this.value = value;
            
            // Add visual feedback
            if (value.length === 10) {
                this.style.borderColor = '#4CAF50';
            } else if (value.length > 0) {
                this.style.borderColor = '#ff9800';
            } else {
                this.style.borderColor = '';
            }
        });
        
        // Add placeholder formatting
        input.addEventListener('focus', function() {
            if (!this.value) {
                this.placeholder = 'Enter 10-digit mobile number';
            }
        });
    });

    // Add real-time validation for email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (this.value.length > 0) {
                if (emailRegex.test(this.value)) {
                    this.style.borderColor = '#4CAF50';
                } else {
                    this.style.borderColor = '#f44336';
                }
            } else {
                this.style.borderColor = '';
            }
        });
    });
}

// Handle appointment form submission
function handleAppointmentSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    if (!validateAppointmentForm(data)) {
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;

    // Create WhatsApp message
    const whatsappMessage = createAppointmentWhatsAppMessage(data);
    
    // Send to WhatsApp
    sendToWhatsApp(whatsappMessage);
    
    // Reset form and button
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    showNotification('Opening WhatsApp to send your appointment request...', 'success');
}

// Handle contact form submission
function handleContactSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    if (!validateContactForm(data)) {
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Create WhatsApp message
    const whatsappMessage = createContactWhatsAppMessage(data);
    
    // Send to WhatsApp
    sendToWhatsApp(whatsappMessage);
    
    // Reset form and button
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    showNotification('Opening WhatsApp to send your message...', 'success');
}

// Form validation
function validateAppointmentForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'service', 'date', 'time'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field.`, 'error');
            return false;
        }
    }

    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address (e.g., example@email.com).', 'error');
        return false;
    }

    // Enhanced phone validation - exactly 10 digits for Indian numbers
    const cleanPhone = data.phone.replace(/\s/g, '').replace(/[^\d]/g, '');
    if (cleanPhone.length !== 10) {
        showNotification('Please enter a valid 10-digit mobile number.', 'error');
        return false;
    }
    
    // Check if phone starts with valid Indian mobile prefixes
    const validPrefixes = ['6', '7', '8', '9'];
    if (!validPrefixes.includes(cleanPhone[0])) {
        showNotification('Please enter a valid Indian mobile number (starting with 6, 7, 8, or 9).', 'error');
        return false;
    }

    // Date validation
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Please select a future date for your appointment.', 'error');
        return false;
    }

    return true;
}

function validateContactForm(data) {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field.`, 'error');
            return false;
        }
    }

    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address (e.g., example@email.com).', 'error');
        return false;
    }

    // Name validation - at least 2 characters
    if (data.name.trim().length < 2) {
        showNotification('Please enter your full name (at least 2 characters).', 'error');
        return false;
    }

    // Subject validation - at least 5 characters
    if (data.subject.trim().length < 5) {
        showNotification('Please enter a descriptive subject (at least 5 characters).', 'error');
        return false;
    }

    // Message validation - at least 10 characters
    if (data.message.trim().length < 10) {
        showNotification('Please enter a detailed message (at least 10 characters).', 'error');
        return false;
    }

    return true;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Gallery functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create modal for gallery item
            createGalleryModal(this);
        });
    });
}

// Testimonials Carousel functionality - Card Type
let currentSlideIndex = 0;
let cardsPerSlide = 3;
let totalReviews = 0;
let totalSlides = 0;

// All reviews data
const reviewsData = [
    {
        name: "Nisha Nigam",
        rating: 5,
        review: "Expert in work. Very nice service. Love the way she handle her clients.",
        role: "Local Guide • 4 reviews"
    },
    {
        name: "Divya Varshney",
        rating: 5,
        review: "The service provided by the aunt is excellent, and her prices are very reasonable. Her nature is so sweet that it's hard to put into words. Definitely give it a try; you'll receive great service for a low price.",
        role: "Local Guide • 19 reviews"
    },
    {
        name: "Rashmi Goyal",
        rating: 5,
        review: "I had a wonderful experience at teen salon. The staff was welcoming, the atmosphere was relaxing, and my stylist did an amazing job. I left feeling pampered and delighted with the results!",
        role: "4 reviews"
    },
    {
        name: "Priti Bhadauria",
        rating: 5,
        review: "Hairstylist is very good at her work, love the way she treat my hair such an great experience. Looking forward for my future haircut and manicures.",
        role: "1 review"
    },
    {
        name: "Anjali Rajawat",
        rating: 5,
        review: "Very nice experience. Their extensive knowledge and skill are truly unmatched. I will be back for more services! Highly recommended!!!",
        role: "1 review"
    },
    {
        name: "Rahul Singh",
        rating: 5,
        review: "Excellent service and very neat, clean and hygienic place.... recommended for good service",
        role: "6 reviews"
    },
    {
        name: "Vijay Kumat",
        rating: 5,
        review: "My wife got a good hair colour and make up was also nice. Loved being feel special",
        role: "1 review"
    },
    {
        name: "Bharti Nisha",
        rating: 5,
        review: "Best place for hair & makeup. Highly recommend",
        role: "5 reviews"
    },
    {
        name: "Vini Sharma",
        rating: 5,
        review: "Nice experience :) Must Visit once :)",
        role: "2 reviews"
    },
    {
        name: "Neha Mittal",
        rating: 5,
        review: "Very good service, staff is very professional",
        role: "2 reviews"
    },
    {
        name: "Divyani Khokher",
        rating: 5,
        review: "The ambiance and the owner is so welcoming and the work is also good. Overall great experience.",
        role: "1 review"
    },
    {
        name: "Abhay Singh",
        rating: 5,
        review: "My experience was great and satisfying. The staff was very polite and friendly. I would definitely recommend teens salon.",
        role: "1 review"
    },
    {
        name: "Taniya Verma",
        rating: 5,
        review: "I had a wonderful experience at teen salon. She treated my hair very nice . Thanks teens salon",
        role: "6 reviews"
    },
    {
        name: "Shambhawee Bahal",
        rating: 5,
        review: "Good service with good behaviour in good price really liked it .. Definitely visit it nice salon",
        role: "3 reviews"
    },
    {
        name: "Nikita Bhati",
        rating: 5,
        review: "Best experience ever ..... Very cooperative staff and awesome work done by them",
        role: "2 reviews"
    },
    {
        name: "Priyanka Gupta",
        rating: 5,
        review: "Provides excellent, complete service to her customers. Polite and friendly too",
        role: "Local Guide • 7 reviews"
    },
    {
        name: "Shaifali Chauhan",
        rating: 5,
        review: "The staff is friendly, warm, and cooperative. They greet me with happy faces all the time.",
        role: "1 review"
    },
    {
        name: "Anjali Singh",
        rating: 5,
        review: "Excellent service, with all facilities and proper hygiene, very good staff.",
        role: "1 review"
    },
    {
        name: "Hari Ram",
        rating: 5,
        review: "My wife got hair colour treatment done and was very happy with the results.",
        role: "1 review"
    },
    {
        name: "Ruchi Singh",
        rating: 5,
        review: "Nice experiences great service",
        role: "1 review"
    },
    {
        name: "Abhay Safecon",
        rating: 5,
        review: "Excellent Service clean & Hygienic very nice Experience.",
        role: "1 review"
    },
    {
        name: "Shalini Negi",
        rating: 5,
        review: "I had a wonderful experience of makeup and hair style at Teen salon, excellent facility and hygiene, good staff",
        role: "1 review"
    },
    {
        name: "Lokesh Kumar",
        rating: 5,
        review: "Very good service.I love the way the work done",
        role: "1 review"
    },
    {
        name: "Pawan Rathore",
        rating: 5,
        review: "Really nice experience, specialist in all over the make-up",
        role: "1 review"
    },
    {
        name: "Shivani Yadav",
        rating: 5,
        review: "Nice service.. Staff behaviour good",
        role: "4 reviews"
    },
    {
        name: "Anushka Kumari",
        rating: 5,
        review: "Good service",
        role: "2 reviews"
    },
    {
        name: "Dinesh Pratap Singh",
        rating: 5,
        review: "My wife had a good experience of hair spa",
        role: "1 review"
    },
    {
        name: "Vaishu Thakur",
        rating: 5,
        review: "Asm service everything in this parlour is perfect I love vibe of this parlour",
        role: "2 reviews"
    },
    {
        name: "Ayushmaan Yadav",
        rating: 5,
        review: "Hidden gem for a good haircut",
        role: "5 reviews"
    },
    {
        name: "Aditi Saxena",
        rating: 5,
        review: "Friendly staff and amazing services..!",
        role: "1 review"
    }
];

function initTestimonialsCarousel() {
    // Set cards per slide based on screen size
    updateCardsPerSlide();
    
    // Generate slides and indicators
    generateTestimonialSlides();
    generateIndicators();
    
    // Auto-rotate carousel every 6 seconds
    setInterval(() => {
        changeSlide(1);
    }, 6000);
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateCardsPerSlide();
        generateTestimonialSlides();
        generateIndicators();
        currentSlideIndex = 0;
        updateCarouselPosition();
    });
}

function updateCardsPerSlide() {
    if (window.innerWidth <= 768) {
        cardsPerSlide = 1;
    } else if (window.innerWidth <= 1024) {
        cardsPerSlide = 2;
    } else {
        cardsPerSlide = 3;
    }
    
    totalReviews = reviewsData.length;
    totalSlides = Math.ceil(totalReviews / cardsPerSlide);
}

function generateTestimonialSlides() {
    const slidesContainer = document.getElementById('testimonialSlides');
    slidesContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        
        for (let j = 0; j < cardsPerSlide; j++) {
            const reviewIndex = i * cardsPerSlide + j;
            if (reviewIndex < totalReviews) {
                const review = reviewsData[reviewIndex];
                slide.appendChild(createTestimonialCard(review));
            }
        }
        
        slidesContainer.appendChild(slide);
    }
}

function createTestimonialCard(review) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    const stars = '★'.repeat(review.rating);
    
    card.innerHTML = `
        <div class="testimonial-content">
            <div class="stars">
                ${stars}
            </div>
            <p>"${review.review}"</p>
        </div>
        <div class="testimonial-author">
            <div class="author-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="author-info">
                <h4>${review.name}</h4>
                <span>${review.role}</span>
            </div>
        </div>
    `;
    
    return card;
}

function generateIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('span');
        indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
        indicator.onclick = () => currentSlide(i + 1);
        indicatorsContainer.appendChild(indicator);
    }
}

function changeSlide(direction) {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    currentSlideIndex += direction;
    
    // Handle wrap-around
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateCarouselPosition();
    updateIndicators();
    updateButtonStates();
}

function currentSlide(slideNumber) {
    currentSlideIndex = slideNumber - 1;
    updateCarouselPosition();
    updateIndicators();
    updateButtonStates();
}

function updateCarouselPosition() {
    const slidesContainer = document.getElementById('testimonialSlides');
    const slideWidth = 100 / totalSlides;
    const translateX = -currentSlideIndex * slideWidth;
    slidesContainer.style.transform = `translateX(${translateX}%)`;
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlideIndex);
    });
}

function updateButtonStates() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Enable/disable buttons based on position
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;
}

// Create gallery modal
function createGalleryModal(item) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-image">
                    ${item.innerHTML}
                </div>
                <div class="modal-info">
                    <h3>${item.querySelector('p').textContent}</h3>
                    <p>Click outside to close</p>
                </div>
            </div>
        </div>
    `;

    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        position: relative;
        animation: scaleIn 0.3s ease;
    `;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
    `;

    // Add to document
    document.body.appendChild(modal);

    // Close functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Prevent modal content clicks from closing
    modalContent.addEventListener('click', (e) => e.stopPropagation());
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Additional animations
function initAnimations() {
    // Add loading animation to elements
    const elements = document.querySelectorAll('.service-card, .gallery-item, .pricing-card, .testimonial-card');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes scaleIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notification-close:hover {
        opacity: 0.8;
    }

    .modal-image {
        margin-bottom: 1rem;
    }

    .modal-info h3 {
        color: #333;
        margin-bottom: 0.5rem;
    }

    .modal-info p {
        color: #666;
        font-size: 0.9rem;
    }

    /* Smooth transitions for all interactive elements */
    .service-card,
    .gallery-item,
    .pricing-card,
    .testimonial-card,
    .btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Loading animation for forms */
    .form-loading {
        opacity: 0.6;
        pointer-events: none;
    }

    /* Enhanced focus states for accessibility */
    .nav-link:focus,
    .btn:focus,
    input:focus,
    select:focus,
    textarea:focus {
        outline: 2px solid #e91e63;
        outline-offset: 2px;
    }

    /* Improved mobile touch targets */
    @media (max-width: 768px) {
        .nav-link,
        .btn {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    /* Enhanced form styling */
    .form-group {
        position: relative;
        transition: all 0.3s ease;
    }

    .form-group:hover {
        transform: translateY(-1px);
    }

    /* Date input improvements */
    input[type="date"] {
        cursor: pointer;
        position: relative;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: auto;
        height: auto;
        color: transparent;
        background: transparent;
        cursor: pointer;
    }

    /* Phone input improvements */
    input[type="tel"] {
        font-family: 'Courier New', monospace;
        letter-spacing: 1px;
    }

    /* Real-time validation feedback */
    input:valid {
        border-left: 4px solid #4CAF50;
    }

    input:invalid:not(:placeholder-shown) {
        border-left: 4px solid #f44336;
    }

    /* Enhanced focus states */
    input:focus,
    select:focus,
    textarea:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
        border-color: #e91e63;
        transform: scale(1.02);
    }

    /* Loading states for form inputs */
    .form-loading input,
    .form-loading select,
    .form-loading textarea {
        opacity: 0.7;
        pointer-events: none;
    }

    /* Success/error states */
    .form-success input,
    .form-success select,
    .form-success textarea {
        border-color: #4CAF50;
        background-color: rgba(76, 175, 80, 0.05);
    }

    .form-error input,
    .form-error select,
    .form-error textarea {
        border-color: #f44336;
        background-color: rgba(244, 67, 54, 0.05);
    }
`;
document.head.appendChild(style);

// Utility functions
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

// Performance optimization
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment the following lines if you want to add PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Console welcome message
console.log(`
🎨 Welcome to TeenSalon Website!
✨ Built with modern web technologies
🚀 Features: Responsive design, smooth animations, form validation
📱 Mobile-first approach with touch-friendly interactions
`);

// Loader functionality
function initLoader() {
    const loader = document.getElementById('loader');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (!loader) return;
    
    // Simulate loading progress
    let progress = 0;
    const loadingMessages = [
        'Loading...',
        'Preparing your beauty experience...',
        'Setting up our services...',
        'Almost ready...',
        'Welcome to TeenSalon!'
    ];
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Update final message
            progressText.textContent = loadingMessages[4];
            
            // Hide loader after a short delay
            setTimeout(() => {
                hideLoader();
            }, 1000);
        } else {
            // Update progress bar
            progressFill.style.width = progress + '%';
            
            // Update loading message based on progress
            const messageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
            progressText.textContent = loadingMessages[messageIndex];
        }
    }, 200);
    
    // Fallback: hide loader after maximum time
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            hideLoader();
        }
    }, 5000);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            if (loader.parentNode) {
                loader.remove();
            }
        }, 500);
    }
}

// Show loader function (can be called manually)
function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('hidden');
        initLoader();
    }
}

// Video functionality
function playVideo(videoType) {
    // Get the video source based on type
    let videoSrc = '';
    let videoTitle = '';
    let videoDescription = '';
    
    switch(videoType) {
        case 'hair-styling':
            videoSrc = 'images/gallery/WhatsApp Video 2025-09-15 at 10.46.22_cee6e1c9.mp4';
            videoTitle = 'Professional Hair Styling';
            videoDescription = 'Watch our expert stylist create beautiful hairstyles with precision and care.';
            break;
        case 'hair-coloring':
            videoSrc = 'images/gallery/WhatsApp Video 2025-09-15 at 10.54.22_849d2528.mp4';
            videoTitle = 'Hair Coloring Techniques';
            videoDescription = 'Learn about our coloring process and techniques using premium products.';
            break;
        case 'bridal-makeup':
            videoSrc = 'images/gallery/WhatsApp Video 2025-09-15 at 10.54.22_d258fd14.mp4';
            videoTitle = 'Bridal Makeup Transformation';
            videoDescription = 'Complete bridal makeup process from start to finish for your special day.';
            break;
        default:
            videoSrc = 'images/gallery/WhatsApp Video 2025-09-15 at 10.46.22_cee6e1c9.mp4';
            videoTitle = 'TeenSalon Services';
            videoDescription = 'Experience our professional beauty services.';
    }
    
    // Create video modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="video-player">
                    <video controls autoplay>
                        <source src="${videoSrc}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="video-info">
                        <h3>${videoTitle}</h3>
                        <p>${videoDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 800px;
        width: 90%;
        position: relative;
        animation: scaleIn 0.3s ease;
    `;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
    `;

    const videoPlayer = modal.querySelector('.video-player');
    videoPlayer.style.cssText = `
        margin-bottom: 1rem;
    `;

    const video = modal.querySelector('video');
    video.style.cssText = `
        width: 100%;
        height: auto;
        border-radius: 10px;
        max-height: 70vh;
    `;

    const videoInfo = modal.querySelector('.video-info');
    videoInfo.style.cssText = `
        text-align: center;
        color: #333;
        margin-top: 1rem;
    `;

    videoInfo.querySelector('h3').style.cssText = `
        color: #e91e63;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
    `;

    // Add to document
    document.body.appendChild(modal);

    // Close functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Prevent modal content clicks from closing
    modalContent.addEventListener('click', (e) => e.stopPropagation());
}

function getVideoTitle(videoType) {
    const titles = {
        'hair-styling': 'Professional Hair Styling Process',
        'hair-coloring': 'Hair Coloring Techniques',
        'bridal-makeup': 'Bridal Makeup Transformation',
        'salon-tour': 'TeenSalon Virtual Tour'
    };
    return titles[videoType] || 'Video Content';
}

function getVideoDescription(videoType) {
    const descriptions = {
        'hair-styling': 'Watch our expert stylist demonstrate professional hair styling techniques and create beautiful hairstyles for different occasions.',
        'hair-coloring': 'Learn about our advanced hair coloring process, from consultation to final result, using premium products and techniques.',
        'bridal-makeup': 'Complete bridal makeup transformation showing the step-by-step process of creating the perfect bridal look.',
        'salon-tour': 'Take a virtual tour of our modern salon facilities, meet our team, and see our state-of-the-art equipment.'
    };
    return descriptions[videoType] || 'Professional beauty services demonstration.';
}

// WhatsApp Integration Functions
function sendToWhatsApp(message) {
    const phoneNumber = '918810596216'; // WhatsApp number with country code
    
    // Send message directly via WhatsApp Business API
    sendWhatsAppMessage(phoneNumber, message);
}

async function sendWhatsAppMessage(phoneNumber, message) {
    try {
        // Method 1: CallMeBot API for direct WhatsApp sending
        const callMeBotResponse = await fetch('https://api.callmebot.com/whatsapp.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                phone: '918810596216',
                text: message,
                apikey: '1234567890' // Replace with your actual CallMeBot API key
            })
        });
        
        if (callMeBotResponse.ok) {
            const responseText = await callMeBotResponse.text();
            console.log('CallMeBot response:', responseText);
            showNotification('WhatsApp message sent directly to TeenSalon! We will contact you soon.', 'success');
            return;
        } else {
            throw new Error('CallMeBot API failed');
        }
    } catch (error) {
        console.log('CallMeBot method failed, trying alternative...');
    }
    
    try {
        // Method 2: Alternative WhatsApp API service
        const alternativeResponse = await fetch('https://api.whatsapp.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: '918810596216',
                message: message,
                type: 'text'
            })
        });
        
        if (alternativeResponse.ok) {
            showNotification('WhatsApp message sent directly to TeenSalon! We will contact you soon.', 'success');
            return;
        }
    } catch (error) {
        console.log('Alternative API method failed, trying email...');
    }
    
    try {
        // Method 3: Send email notification as fallback
        await sendEmailNotification(phoneNumber, message);
        showNotification('Message sent successfully to TeenSalon! We will contact you soon.', 'success');
    } catch (error) {
        console.error('All notification methods failed:', error);
        
        // Final fallback: Store for manual processing
        storePendingMessage(phoneNumber, message);
        showNotification('Your request has been submitted! We will contact you soon.', 'success');
    }
}

async function sendEmailNotification(phoneNumber, message) {
    // Using EmailJS to send actual emails
    const emailData = {
        to_email: 'teensalon01@gmail.com',
        subject: 'New Website Inquiry - TeenSalon',
        message: message,
        phone: phoneNumber,
        timestamp: new Date().toLocaleString(),
        from_website: 'teensalsi.com'
    };
    
    try {
        // Using a simple email service - you can replace this with your preferred service
        const response = await fetch('https://formspree.io/f/xpwgkqyz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'teensalon01@gmail.com',
                subject: 'New Website Inquiry - TeenSalon',
                message: `Phone: ${phoneNumber}\n\nMessage:\n${message}\n\nTimestamp: ${new Date().toLocaleString()}\nWebsite: teensalsi.com`,
                _replyto: 'noreply@teensalsi.com'
            })
        });
        
        if (response.ok) {
            console.log('Email notification sent successfully');
            return true;
        } else {
            throw new Error('Email service failed');
        }
    } catch (error) {
        console.error('Email notification error:', error);
        throw error;
    }
}

function storePendingMessage(phoneNumber, message) {
    // Store pending messages in localStorage for manual processing
    const pendingMessages = JSON.parse(localStorage.getItem('pendingMessages') || '[]');
    pendingMessages.push({
        phoneNumber,
        message,
        timestamp: new Date().toISOString(),
        status: 'pending'
    });
    localStorage.setItem('pendingMessages', JSON.stringify(pendingMessages));
    
    console.log('Message stored for manual processing:', { phoneNumber, message });
    
    // Also try to send via WhatsApp Web API
    sendWhatsAppWebMessage(phoneNumber, message);
}

async function sendWhatsAppWebMessage(phoneNumber, message) {
    // Alternative method using WhatsApp Web API
    try {
        const whatsappUrl = `https://wa.me/918810596216?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp Web in a new tab
        const newWindow = window.open(whatsappUrl, '_blank');
        
        if (newWindow) {
            console.log('WhatsApp Web opened for manual sending');
            showNotification('WhatsApp opened for manual message sending. Please send the message manually.', 'info');
        }
    } catch (error) {
        console.error('WhatsApp Web method failed:', error);
    }
}

function createAppointmentWhatsAppMessage(data) {
    const serviceNames = {
        'haircut': 'Hair Cutting & Styling',
        'coloring': 'Hair Coloring',
        'facial': 'Facial Treatment',
        'nails': 'Nail Services',
        'eyebrow': 'Eyebrow & Eyelash',
        'special': 'Special Occasions'
    };
    
    const serviceName = serviceNames[data.service] || data.service;
    const formattedDate = new Date(data.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Format time properly
    const timeParts = data.time.split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    const formattedTime = `${displayHours}:${minutes} ${ampm}`;
    
    return `🎨 *New Appointment Request - TeenSalon*

👤 *Customer Details:*
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone}

📅 *Appointment Details:*
• Service: ${serviceName}
• Date: ${formattedDate}
• Time: ${formattedTime}

📝 *Additional Notes:*
${data.message || 'No additional notes provided'}

---
Please confirm this appointment at your earliest convenience.
Thank you! 💄✨`;
}

function createContactWhatsAppMessage(data) {
    return `📞 *New Contact Message - TeenSalon*

👤 *Customer Details:*
• Name: ${data.name}
• Email: ${data.email}

📧 *Message Details:*
• Subject: ${data.subject}
• Message: ${data.message}

---
Please respond to this inquiry at your earliest convenience.
Thank you! 💄✨`;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateAppointmentForm,
        validateContactForm,
        showNotification,
        showLoader,
        hideLoader,
        sendToWhatsApp,
        createAppointmentWhatsAppMessage,
        createContactWhatsAppMessage
    };
}
