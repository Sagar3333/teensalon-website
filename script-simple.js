// Simplified JavaScript for TeenSalon Website
// This version focuses on core functionality and reliability

document.addEventListener('DOMContentLoaded', function() {
    console.log('TeenSalon website loading...');
    
    // Initialize core functionality
    initNavigation();
    initForms();
    initLoader();
    initTestimonials();
});

// Navigation functionality
function initNavigation() {
    try {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!hamburger || !navMenu) {
            console.warn('Navigation elements not found');
            return;
        }

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

        // Smooth scrolling for anchor links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
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

        console.log('Navigation initialized successfully');
    } catch (error) {
        console.error('Navigation error:', error);
    }
}

// Form handling
function initForms() {
    try {
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

        // Set minimum date for appointment booking
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        console.log('Forms initialized successfully');
    } catch (error) {
        console.error('Forms error:', error);
    }
}

// Handle appointment form submission
function handleAppointmentSubmission(form) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.service || !data.date || !data.time) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Create WhatsApp message
        const message = createAppointmentMessage(data);
        
        // Open WhatsApp
        const whatsappUrl = `https://wa.me/918810596216?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        showNotification('Opening WhatsApp to send your appointment request...', 'success');
        form.reset();
    } catch (error) {
        console.error('Appointment submission error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}

// Handle contact form submission
function handleContactSubmission(form) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Create WhatsApp message
        const message = createContactMessage(data);
        
        // Open WhatsApp
        const whatsappUrl = `https://wa.me/918810596216?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        showNotification('Opening WhatsApp to send your message...', 'success');
        form.reset();
    } catch (error) {
        console.error('Contact submission error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}

// Create appointment message
function createAppointmentMessage(data) {
    const serviceNames = {
        'haircut': 'Hair Cutting & Styling',
        'coloring': 'Hair Coloring',
        'facial': 'Facial Treatment',
        'nails': 'Nail Services',
        'eyebrow': 'Eyebrow & Eyelash',
        'special': 'Special Occasions'
    };
    
    const serviceName = serviceNames[data.service] || data.service;
    const formattedDate = new Date(data.date).toLocaleDateString('en-IN');
    
    return `🎨 *New Appointment Request - TeenSalon*

👤 *Customer Details:*
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone}

📅 *Appointment Details:*
• Service: ${serviceName}
• Date: ${formattedDate}
• Time: ${data.time}

📝 *Additional Notes:*
${data.message || 'No additional notes provided'}

---
Please confirm this appointment at your earliest convenience.
Thank you! 💄✨`;
}

// Create contact message
function createContactMessage(data) {
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

// Testimonials carousel
function initTestimonials() {
    try {
        const reviews = [
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
            }
        ];

        let currentSlide = 0;
        const slidesContainer = document.getElementById('testimonialSlides');
        const indicatorsContainer = document.getElementById('carouselIndicators');
        
        if (!slidesContainer) return;

        // Generate slides
        function generateSlides() {
            slidesContainer.innerHTML = '';
            reviews.forEach((review, index) => {
                const slide = document.createElement('div');
                slide.className = 'testimonial-slide';
                slide.innerHTML = `
                    <div class="testimonial-card">
                        <div class="testimonial-content">
                            <div class="stars">${'★'.repeat(review.rating)}</div>
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
                    </div>
                `;
                slidesContainer.appendChild(slide);
            });
        }

        // Generate indicators
        function generateIndicators() {
            if (!indicatorsContainer) return;
            indicatorsContainer.innerHTML = '';
            reviews.forEach((_, index) => {
                const indicator = document.createElement('span');
                indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
                indicator.onclick = () => goToSlide(index);
                indicatorsContainer.appendChild(indicator);
            });
        }

        // Go to specific slide
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            const slideWidth = 100 / reviews.length;
            slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            
            // Update indicators
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        // Initialize
        generateSlides();
        generateIndicators();

        // Auto-rotate
        setInterval(() => {
            currentSlide = (currentSlide + 1) % reviews.length;
            goToSlide(currentSlide);
        }, 5000);

        console.log('Testimonials initialized successfully');
    } catch (error) {
        console.error('Testimonials error:', error);
    }
}

// Loader functionality
function initLoader() {
    try {
        const loader = document.getElementById('loader');
        if (!loader) return;

        // Hide loader after a short delay
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 500);
        }, 2000);

        console.log('Loader initialized successfully');
    } catch (error) {
        console.error('Loader error:', error);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    try {
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
    } catch (error) {
        console.error('Notification error:', error);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
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
`;
document.head.appendChild(style);

console.log('TeenSalon website loaded successfully!');
