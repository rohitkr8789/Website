// Hotel Livya - JavaScript Functionality

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all functionality
function initializeApp() {
    setupNavigation();
    setupBackToTop();
    setupFormValidation();
    setupSmoothScrolling();
    setupDateValidation();
    setupRoomData();
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-dark');
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95) !important';
        } else {
            navbar.classList.remove('bg-dark');
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 1)';
        }
    });

    // Active navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Back to top button
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Room data for modals
const roomData = {
    standard: {
        title: 'Standard Room',
        price: '$120/night',
        description: 'Comfortable and elegant room with modern amenities, perfect for solo travelers or couples.',
        images: [
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        amenities: [
            'Queen-size bed',
            'Private bathroom with shower',
            'Free high-speed WiFi',
            'City view',
            'Air conditioning',
            'Flat-screen TV',
            'Mini refrigerator',
            'Coffee maker',
            'Daily housekeeping',
            '24/7 room service'
        ],
        size: '25 sqm',
        occupancy: '2 guests',
        bedType: '1 Queen bed'
    },
    deluxe: {
        title: 'Deluxe Room',
        price: '$180/night',
        description: 'Spacious room with premium furnishings and additional amenities for a luxurious stay.',
        images: [
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        amenities: [
            'King-size bed',
            'Luxury bathroom with bathtub',
            'Balcony access',
            'Premium WiFi',
            'Panoramic city view',
            'Air conditioning',
            '55" Smart TV',
            'Mini bar',
            'Coffee maker',
            'Room service',
            'Daily housekeeping',
            'Bathrobe and slippers'
        ],
        size: '35 sqm',
        occupancy: '2 guests',
        bedType: '1 King bed'
    },
    suite: {
        title: 'Executive Suite',
        price: '$280/night',
        description: 'Ultimate luxury with separate living area, premium amenities, and stunning city views.',
        images: [
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        amenities: [
            'Separate living room',
            'King-size bed',
            'Jacuzzi tub',
            'Premium amenities',
            'Concierge service',
            'Premium WiFi',
            'Panoramic city view',
            'Air conditioning',
            '65" Smart TV',
            'Full mini bar',
            'Coffee maker',
            '24/7 room service',
            'Daily housekeeping',
            'Bathrobe and slippers',
            'Turn-down service',
            'Private balcony'
        ],
        size: '50 sqm',
        occupancy: '2 guests',
        bedType: '1 King bed + Sofa bed'
    }
};

// Setup room data
function setupRoomData() {
    // This function can be used to load room data from an API in the future
    console.log('Room data loaded successfully');
}

// Open room modal
function openRoomModal(roomType) {
    const room = roomData[roomType];
    if (!room) return;

    const modal = document.getElementById('roomModal');
    const modalTitle = document.getElementById('roomModalTitle');
    const modalContent = document.getElementById('roomModalContent');

    modalTitle.textContent = room.title;

    // Create modal content
    let content = `
        <div class="room-gallery">
    `;
    
    room.images.forEach(image => {
        content += `<img src="${image}" alt="${room.title}" class="img-fluid">`;
    });
    
    content += `
        </div>
        <div class="room-details">
            <h6>Room Information</h6>
            <div class="row">
                <div class="col-md-4">
                    <strong>Size:</strong> ${room.size}
                </div>
                <div class="col-md-4">
                    <strong>Occupancy:</strong> ${room.occupancy}
                </div>
                <div class="col-md-4">
                    <strong>Bed Type:</strong> ${room.bedType}
                </div>
            </div>
        </div>
        <div class="room-description mb-4">
            <h6>Description</h6>
            <p>${room.description}</p>
        </div>
        <div class="room-amenities">
            <h6>Amenities</h6>
            <ul class="amenities-list list-unstyled">
    `;
    
    room.amenities.forEach(amenity => {
        content += `<li><i class="bi bi-check-circle-fill"></i> ${amenity}</li>`;
    });
    
    content += `
            </ul>
        </div>
        <div class="text-center mt-4">
            <h4 class="text-primary">${room.price}</h4>
        </div>
    `;

    modalContent.innerHTML = content;

    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Scroll to booking section
function scrollToBooking() {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        const offsetTop = bookingSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Close modal if open
    const modal = document.getElementById('roomModal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    if (bootstrapModal) {
        bootstrapModal.hide();
    }
}

// Date validation
function setupDateValidation() {
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;

    checkInInput.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.min = nextDay.toISOString().split('T')[0];
        
        // If checkout date is before checkin date, clear it
        if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
            checkOutInput.value = '';
        }
    });
}

// Form validation
function setupFormValidation() {
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');

    // Booking form validation
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateBookingForm()) {
                submitBookingForm();
            }
        });
    }

    // Contact form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
}

// Validate booking form
function validateBookingForm() {
    const checkIn = document.getElementById('checkIn');
    const checkOut = document.getElementById('checkOut');
    const roomType = document.getElementById('roomType');
    const guests = document.getElementById('guests');

    let isValid = true;

    // Clear previous validation states
    clearValidationStates([checkIn, checkOut, roomType, guests]);

    // Check-in date validation
    if (!checkIn.value) {
        showValidationError(checkIn, 'Check-in date is required');
        isValid = false;
    } else if (new Date(checkIn.value) < new Date()) {
        showValidationError(checkIn, 'Check-in date cannot be in the past');
        isValid = false;
    }

    // Check-out date validation
    if (!checkOut.value) {
        showValidationError(checkOut, 'Check-out date is required');
        isValid = false;
    } else if (new Date(checkOut.value) <= new Date(checkIn.value)) {
        showValidationError(checkOut, 'Check-out date must be after check-in date');
        isValid = false;
    }

    // Room type validation
    if (!roomType.value) {
        showValidationError(roomType, 'Please select a room type');
        isValid = false;
    }

    // Guests validation
    if (!guests.value) {
        showValidationError(guests, 'Please select number of guests');
        isValid = false;
    }

    return isValid;
}

// Validate contact form
function validateContactForm() {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');

    let isValid = true;

    // Clear previous validation states
    clearValidationStates([name, email, subject, message]);

    // Name validation
    if (!name.value.trim()) {
        showValidationError(name, 'Name is required');
        isValid = false;
    }

    // Email validation
    if (!email.value.trim()) {
        showValidationError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showValidationError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Subject validation
    if (!subject.value.trim()) {
        showValidationError(subject, 'Subject is required');
        isValid = false;
    }

    // Message validation
    if (!message.value.trim()) {
        showValidationError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showValidationError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show validation error
function showValidationError(element, message) {
    element.classList.add('is-invalid');
    
    // Remove existing error message
    const existingError = element.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
}

// Clear validation states
function clearValidationStates(elements) {
    elements.forEach(element => {
        element.classList.remove('is-invalid', 'is-valid');
        const errorDiv = element.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    });
}

// Submit booking form
function submitBookingForm() {
    const form = document.getElementById('bookingForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showAlert('Booking request submitted successfully! We will contact you shortly to confirm your reservation.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Scroll to top to show message
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 2000);
}

// Submit contact form
function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showAlert('Message sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Scroll to top to show message
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 2000);
}

// Show alert message
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert at the top of the body
    document.body.insertBefore(alertDiv, document.body.firstChild);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.room-card, .testimonial-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when page loads
window.addEventListener('load', setupAnimations);

// Theme switcher (optional enhancement)
function setupThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'btn btn-outline-secondary position-fixed';
    themeToggle.style.cssText = 'top: 20px; right: 20px; z-index: 1001;';
    themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
    themeToggle.title = 'Toggle Theme';
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'bi bi-sun';
        } else {
            icon.className = 'bi bi-moon';
        }
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize theme switcher
// setupThemeSwitcher(); // Uncomment to enable theme switcher

// Local storage for form data persistence
function saveFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem(`${formId}Data`, JSON.stringify(data));
}

function loadFormData(formId) {
    const form = document.getElementById(formId);
    const savedData = localStorage.getItem(`${formId}Data`);
    
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = data[key];
            }
        });
    }
}

// Auto-save form data
document.addEventListener('DOMContentLoaded', function() {
    const forms = ['bookingForm', 'contactForm'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            // Load saved data
            loadFormData(formId);
            
            // Save data on input change
            form.addEventListener('input', function() {
                saveFormData(formId);
            });
        }
    });
});

// Performance optimization - Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Initialize lazy loading
setupLazyLoading(); 