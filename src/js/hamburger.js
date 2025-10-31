// hamburger.js
// Obsługa hamburger menu dla mobile

(function() {
    'use strict';

    // Elements
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const body = document.body;

    // Check if elements exist
    if (!hamburgerBtn || !mainNav || !mobileNavOverlay) {
        console.warn('Hamburger menu elements not found');
        return;
    }

    // Toggle menu function
    function toggleMenu() {
        const isOpen = hamburgerBtn.classList.contains('active');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Open menu
    function openMenu() {
        hamburgerBtn.classList.add('active');
        mainNav.classList.add('active');
        mobileNavOverlay.classList.add('active');
        body.classList.add('menu-open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
    }

    // Close menu
    function closeMenu() {
        hamburgerBtn.classList.remove('active');
        mainNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    // Event listeners
    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking on overlay
    mobileNavOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on nav links
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburgerBtn.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when window is resized to desktop size
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && hamburgerBtn.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });

    // Expose closeMenu globally for use by router
    window.HamburgerMenu = {
        close: closeMenu,
        open: openMenu,
        toggle: toggleMenu
    };

})();
