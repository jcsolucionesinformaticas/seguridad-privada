document.addEventListener('DOMContentLoaded', () => {
    // Highlight active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // Header Scroll Effect removed as requested (now statically fixed)

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Number Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        const statsSection = document.querySelector('.why-us-stats') || document.querySelector('.stats-preview-grid');
        if (!statsSection) return; // Not on this page
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 50 && !hasAnimated) {
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCount();
            });
            hasAnimated = true;
        }
    };

    window.addEventListener('scroll', animateStats);

    // TRIGGER BOTH INSTANTLY ON LOAD
    revealOnScroll();
    animateStats();

    // Trigger again after a tiny delay in case layout is still settling/rendering
    setTimeout(() => {
        revealOnScroll();
        animateStats();
    }, 150);

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // Smooth Page Transitions
    const pageLinks = document.querySelectorAll('a[href$=".html"]');
    pageLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only intercept if it's not opening in a new tab
            if (this.target !== "_blank") {
                const target = this.getAttribute('href');
                
                // Avoid reloading and animations if clicking the current page
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const targetPage = target.split('/').pop();
                
                if (currentPage === targetPage || (currentPage === '' && targetPage === 'index.html')) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = target;
                }, 400); // Wait for the 0.4s CSS animation to complete
            }
        });
    });
    // Fix BFCache issues (Back/Forward button freeze)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('fade-out');
        }
    });

});

// --- Modal Functions ---

window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
        document.documentElement.classList.add('modal-open');
    }
};

window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
    }
};

window.closeModalOutside = function (event, modalId) {
    const modal = document.getElementById(modalId);
    // If the user clicks directly on the modal background (not the content)
    if (event.target === modal) {
        window.closeModal(modalId);
    }
};

// Close modals with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            window.closeModal(modal.id);
        });
        
        // Also close success modal if open
        const successModal = document.getElementById('modal-success-form');
        if (successModal && successModal.classList.contains('active')) {
            window.closeSuccessModal();
        }
    }
});

// ==========================================================================
// WEB3FORMS CONTACT FORM INTEGRATION & VALIDATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
    // URL de Google Sheets (Apps Script). Pega aquí tu URL generada.
    // Deja esta variable vacía '' si deseas seguir usando Web3Forms.
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxXMKjJ2u-PLwvpKbHjBF6LcsyK9Ky08QFHXfExGW8EmT2dLJRo1gz-_mbNmAmwI8FhIw/exec';

    const contactForm = document.getElementById('main-contact-form');
    if (!contactForm) return; // Only execute on contact page

    const submitBtn = document.getElementById('btn-submit-form');
    const submitBtnText = submitBtn.querySelector('span');
    const submitBtnSpinner = submitBtn.querySelector('.spinner-form');

    // Input fields
    const fields = {
        name: {
            input: document.getElementById('form-name'),
            error: document.getElementById('error-name'),
            validate: val => val.trim().length >= 3 ? '' : 'El nombre debe tener al menos 3 caracteres.'
        },
        email: {
            input: document.getElementById('form-email'),
            error: document.getElementById('error-email'),
            validate: val => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(val.trim()) ? '' : 'Por favor, ingrese un correo electrónico válido.';
            }
        },
        phone: {
            input: document.getElementById('form-phone'),
            error: document.getElementById('error-phone'),
            validate: val => {
                const clean = val.replace(/\D/g, '');
                return clean.length === 10 ? '' : 'El teléfono debe contener exactamente 10 dígitos.';
            }
        },
        service: {
            input: document.getElementById('form-service'),
            error: document.getElementById('error-service'),
            validate: val => val ? '' : 'Por favor, seleccione un tipo de servicio.'
        },
        message: {
            input: document.getElementById('form-message'),
            error: document.getElementById('error-message-text'),
            validate: val => val.trim().length >= 10 ? '' : 'El mensaje debe detallar al menos 10 caracteres.'
        }
    };

    // Formatting Phone Input while typing
    if (fields.phone.input) {
        fields.phone.input.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // Live validation on blur
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (field.input) {
            field.input.addEventListener('blur', function () {
                // For phone validation, pass the raw digits
                let valToValidate = field.input.value;
                if (key === 'phone') {
                    valToValidate = valToValidate.replace(/\D/g, '');
                }
                const errorMsg = field.validate(valToValidate);
                if (errorMsg) {
                    field.input.classList.add('invalid-field');
                    field.error.textContent = errorMsg;
                } else {
                    field.input.classList.remove('invalid-field');
                    field.error.textContent = '';
                }
            });

            // Clear errors on input
            field.input.addEventListener('input', function () {
                field.input.classList.remove('invalid-field');
                field.error.textContent = '';
            });
        }
    });

    // Form Submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let hasErrors = false;

        // Perform final validation on all fields
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            let valToValidate = field.input.value;
            if (key === 'phone') {
                valToValidate = valToValidate.replace(/\D/g, '');
            }
            const errorMsg = field.validate(valToValidate);
            if (errorMsg) {
                field.input.classList.add('invalid-field');
                field.error.textContent = errorMsg;
                hasErrors = true;
            } else {
                field.input.classList.remove('invalid-field');
                field.error.textContent = '';
            }
        });

        if (hasErrors) {
            // Scroll to the first invalid field
            const firstInvalid = contactForm.querySelector('.invalid-field');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }

        // Set Loading State
        submitBtn.disabled = true;
        submitBtnText.textContent = 'Enviando...';
        submitBtnSpinner.style.display = 'inline-block';

        const formData = new FormData(contactForm);
        
        // Ensure phone sent to Web3Forms is formatted correctly
        const phoneRaw = fields.phone.input.value.replace(/\D/g, '');
        formData.set('phone', phoneRaw);

        // Configuración dinámica del destino (Web3Forms o Google Sheets)
        let submitUrl = 'https://api.web3forms.com/submit';
        let requestBody = formData;
        let fetchOptions = {
            method: 'POST',
            body: requestBody
        };

        if (GOOGLE_SHEETS_URL) {
            submitUrl = GOOGLE_SHEETS_URL;
            // Para Apps Script es mejor enviar como x-www-form-urlencoded
            requestBody = new URLSearchParams(formData);
            fetchOptions.body = requestBody;
            // no-cors evita bloqueos del navegador debido a las redirecciones internas de Google Apps Script
            fetchOptions.mode = 'no-cors';
        }

        // Petición asíncrona (AJAX)
        fetch(submitUrl, fetchOptions)
        .then(async (response) => {
            // Con no-cors, la respuesta es opaca (status 0). Asumimos éxito para Google Sheets si 
            // entra en el .then, y validamos response.ok si es Web3Forms.
            if (GOOGLE_SHEETS_URL || response.ok) {
                // Success! Reset form and show success modal
                contactForm.reset();
                window.openSuccessModal();
            } else {
                let json = await response.json();
                alert('Ocurrió un error al enviar el formulario: ' + (json.message || 'Error en el servidor.'));
            }
        })
        .catch(error => {
            // Network Error
            console.log(error);
            alert('Error de red o CORS. Por favor, verifique su conexión o la configuración de su Apps Script.');
        })
        .finally(() => {
            // Reset Button State
            submitBtn.disabled = false;
            submitBtnText.textContent = 'Enviar Mensaje';
            submitBtnSpinner.style.display = 'none';
        });
    });
});

// Success Modal Handlers
window.openSuccessModal = function () {
    const successModal = document.getElementById('modal-success-form');
    if (successModal) {
        successModal.classList.add('active');
        document.body.classList.add('modal-open');
        document.documentElement.classList.add('modal-open');
    }
};

window.closeSuccessModal = function () {
    const successModal = document.getElementById('modal-success-form');
    if (successModal) {
        successModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
    }
};

