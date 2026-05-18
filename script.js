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
    }
});
