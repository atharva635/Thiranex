/**
 * Portfolio Main JavaScript
 * Handles accessibility-compliant interactions:
 * - Theme Switcher (Dark/Light) with localStorage persistence
 * - Mobile Navigation Menu with keyboard accessibility (Escape to close, aria-expanded)
 * - Project Filter System with dynamic screen reader status updates
 * - Contact Form Client-side Validation with screen reader announcements
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initProjectFilter();
  initContactForm();
});

/* ==========================================================================
   1. Theme Switching (Dark/Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Check storage or system preferences
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  // Default is dark (so light-theme is a modifier class)
  const isLight = savedTheme === 'light' || (!savedTheme && systemPrefersLight);
  
  if (isLight) {
    document.body.classList.add('light-theme');
    updateThemeToggleButton(themeToggle, true);
  } else {
    document.body.classList.remove('light-theme');
    updateThemeToggleButton(themeToggle, false);
  }

  // Click event listener
  themeToggle.addEventListener('click', () => {
    const isNowLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('portfolio-theme', isNowLight ? 'light' : 'dark');
    updateThemeToggleButton(themeToggle, isNowLight);
    
    // Announce theme change to screen readers
    announceToScreenReader(`Theme changed to ${isNowLight ? 'light' : 'dark'} mode`);
  });
}

function updateThemeToggleButton(button, isLight) {
  button.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  // Update inner icons or toggle design (we can use SVGs or text)
  const textEl = button.querySelector('.theme-toggle-text');
  if (textEl) {
    textEl.textContent = isLight ? 'Dark Theme' : 'Light Theme';
  }
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!menuToggle || !navMenu) return;

  const navLinks = navMenu.querySelectorAll('a');

  // Toggle navigation open/close state
  const toggleMenu = (shouldOpen) => {
    const isOpen = shouldOpen !== undefined ? shouldOpen : menuToggle.getAttribute('aria-expanded') === 'false';
    
    menuToggle.setAttribute('aria-expanded', isOpen);
    navMenu.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    if (isOpen) {
      // Focus first link in navigation when opened
      if (navLinks.length > 0) {
        setTimeout(() => navLinks[0].focus(), 150); // slight timeout for transition
      }
    } else {
      // Return focus to menu toggle button when closed
      menuToggle.focus();
    }
  };

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Handle 'Escape' key to close navigation drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
    }
  });

  // Close menu when clicking outside (mobile view)
  document.addEventListener('click', (e) => {
    if (menuToggle.getAttribute('aria-expanded') === 'true' && 
        !navMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   3. Interactive Projects Filter
   ========================================================================== */
function initProjectFilter() {
  const filterContainer = document.getElementById('project-filters');
  const projectsGrid = document.getElementById('projects-grid');
  if (!filterContainer || !projectsGrid) return;

  const buttons = filterContainer.querySelectorAll('.filter-btn');
  const cards = projectsGrid.querySelectorAll('.project-card');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state of buttons
      buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      const filterValue = button.getAttribute('data-filter');
      let visibleCount = 0;

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Enable inner links of visible projects for keyboard navigation
          card.querySelectorAll('a, button').forEach(el => el.removeAttribute('tabindex'));
          visibleCount++;
        } else {
          card.classList.add('hidden');
          // Disable keyboard accessibility for hidden projects
          card.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1'));
        }
      });

      // Dynamic announcements for screen readers
      const filterName = button.textContent.trim();
      announceToScreenReader(`Showing ${visibleCount} project${visibleCount === 1 ? '' : 's'} for filter: ${filterName}`);
    });
  });
}

/* ==========================================================================
   4. Accessible Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('input[required], textarea[required]');
  const liveRegion = document.getElementById('form-status-announcer');

  // Perform validation on inputs when they lose focus
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    // Clear errors when the user begins typing
    input.addEventListener('input', () => {
      clearFieldError(input);
    });
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidInput = null;

    inputs.forEach(input => {
      const isValid = validateField(input);
      if (!isValid) {
        isFormValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = input;
        }
      }
    });

    if (!isFormValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
        announceToScreenReader('Form submission failed. Please correct the errors marked in red.');
      }
      return;
    }

    // Success flow - Simulation
    const successMsg = document.getElementById('form-success-message');
    if (successMsg) {
      // Hide form contents
      form.style.display = 'none';
      
      // Update and show success container
      successMsg.classList.remove('hidden');
      successMsg.setAttribute('tabindex', '-1');
      successMsg.focus();

      if (liveRegion) {
        liveRegion.textContent = 'Message sent successfully! Thank you for contacting me. I will get back to you soon.';
      }
    }
  });

  // Validation details
  function validateField(field) {
    const errorId = `${field.id}-error`;
    let errorMessage = '';
    let isValid = true;

    // Check value
    if (field.value.trim() === '') {
      errorMessage = `${getFieldLabel(field)} is required.`;
      isValid = false;
    } else if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        errorMessage = 'Please enter a valid email address.';
        isValid = false;
      }
    } else if (field.type === 'tel') {
      const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
      if (!phoneRegex.test(field.value.trim())) {
        errorMessage = 'Please enter a valid phone number.';
        isValid = false;
      }
    }

    if (!isValid) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
      
      // Set or update error message div
      let errorEl = document.getElementById(errorId);
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.id = errorId;
        errorEl.className = 'error-message';
        errorEl.setAttribute('role', 'alert');
        field.parentNode.insertBefore(errorEl, field.nextSibling);
      }
      errorEl.textContent = errorMessage;
      field.setAttribute('aria-describedby', errorId);
    } else {
      clearFieldError(field);
    }

    return isValid;
  }

  function clearFieldError(field) {
    const errorId = `${field.id}-error`;
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
    field.removeAttribute('aria-describedby');

    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.remove();
    }
  }

  function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.trim() : 'This field';
  }
}

/* ==========================================================================
   5. Helper: Screen Reader Live Region Announcer
   ========================================================================== */
function announceToScreenReader(message) {
  let announcer = document.getElementById('global-screenreader-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'global-screenreader-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }
  
  // Force screen reader trigger by updating content
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
}
