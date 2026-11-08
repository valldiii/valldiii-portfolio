/**
 * ========================================================
 * VALLDIII - FREELANCE WEB DEVELOPER PORTFOLIO (v3.0)
 * ========================================================
 * Core JavaScript Logic:
 * 1. Verified Contact Data & Dynamic Verification
 * 2. Mobile Drawer Navigation & Accessibility
 * 3. Sticky Header & Active Navigation Spy
 * 4. IntersectionObserver Scroll Reveal Animations
 * 5. Project Detail Modal Dialog System
 * 6. Quick Clipboard Copy with Toast Feedback
 * 7. Back-to-Top Button Handler
 * 8. Dynamic Copyright Year
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ======================================================
   * 1. VERIFIED CONTACT CONFIGURATION
   * ====================================================== */
  const CONTACT_CONFIG = {
    // Official Email of Valldiii
    email: 'aftaasifaasifa33083@gmail.com',

    // Official WhatsApp in international format without '+'
    whatsappNumber: '6281210119304',

    // Human-readable local display format
    whatsappDisplay: '081210119304',

    // Official link
    whatsappLink: 'https://wa.me/6281210119304'
  };

  /* ======================================================
   * 2. PROJECTS DETAIL DATA
   * ====================================================== */
  const PROJECTS_DATA = {
    coffee: {
      category: 'Portfolio Demo Project',
      title: 'Valldiii Coffee Shop',
      description: 'A modern, welcoming coffee shop demo website built to showcase artisan beverage menus and local roasteries. Crafted with pure semantic code, it features instant category filtering (Coffee & Non-Coffee) with vanilla JavaScript, an adaptive CSS Grid menu catalog, brand story section, and an intuitive quick-order workflow.',
      features: [
        'Dynamic hero banner with clear Call-to-Action placement',
        'Instant category filtering (All, Coffee, Non-Coffee) built with pure Vanilla JavaScript',
        'Adaptive CSS Grid menu card layout that seamlessly adjusts to any screen size',
        'Curated brand storytelling highlighting local artisan roasts',
        'Fast and responsive ordering workflow without third-party library overhead',
        'Clean semantic HTML5 architecture ready for search engine indexing'
      ],
      techStack: ['Semantic HTML5', 'Modern CSS3', 'Vanilla JavaScript', 'CSS Grid', 'Responsive Design'],
      sourceInfo: 'Complete source code for the Coffee Shop demo is available in the local directory "projects/coffee-shop/" (index.html, style.css, script.js). Official GitHub repository: https://github.com/valldiii/valldiii-portfolio',
      githubUrl: 'https://github.com/valldiii/valldiii-portfolio',
      actionUrl: 'projects/coffee-shop/index.html',
      actionText: 'Open Live Demo'
    },

    nusarasa: {
      category: 'Portfolio Demo Project',
      title: 'NUSA RASA – Catering & Food Service',
      description: 'A commercial company profile website demo crafted for a traditional culinary and catering business. Designed to provide visitors with a seamless experience through an interactive dish catalog, transparent buffet package comparison, event photography gallery, and an automated ordering inquiry form integrated directly with WhatsApp.',
      features: [
        'Warm, authentic culinary brand identity with a refined cream, forest green, and gold palette',
        'Instant menu category filter (Box Meals, Buffet, Ceremonial Tumpeng) with zero page reloads',
        'Interactive reservation inquiry form with automated message generator for WhatsApp',
        'Transparent catering package comparison complete with menu breakdowns and package benefits',
        'Curated photography gallery showcasing buffet presentation and event table settings',
        '100% fluid responsive layout tested across mobile smartphones, tablets, and wide monitors'
      ],
      techStack: ['Semantic HTML5', 'Modern CSS3 (Cream & Forest Green)', 'Vanilla JavaScript', 'WhatsApp Business API', 'Responsive Layout'],
      sourceInfo: 'Complete source code for the NUSA RASA demo is available in the local directory "projects/nusa-rasa/" (index.html, style.css, script.js). Official GitHub repository: https://github.com/valldiii/valldiii-portfolio',
      githubUrl: 'https://github.com/valldiii/valldiii-portfolio',
      actionUrl: 'projects/nusa-rasa/index.html',
      actionText: 'Open Live Demo'
    },

    agency: {
      category: 'Layout Study // One-Page',
      title: 'Creative Studio Landing Page',
      description: 'A high-impact, conversion-oriented one-page landing layout concept designed for independent studios and creative agencies. Features strong visual contrast, focused typography hierarchy, dense feature showcases, and instant load speeds without third-party CSS libraries.',
      features: [
        'Smooth single-page navigation with targeted service highlight sections',
        'Editorial typography hierarchy that commands attention and drives visitor conversion',
        'Adaptive feature card layouts built with modern CSS Flexbox',
        'Ultra-fast loading performance with optimal Lighthouse benchmarks',
        'Clear Call-to-Action placement designed for instant client inquiries'
      ],
      techStack: ['Semantic HTML5', 'CSS Flexbox', 'Mobile-First', 'Performance Optimization'],
      sourceInfo: 'Frontend architectural study focused on conversion rate optimization and pure code structure.',
      githubUrl: null,
      actionUrl: '#contact',
      actionText: 'Discuss Similar Concept'
    },

    business: {
      category: 'Layout Study // Company Profile',
      title: 'Small Business & Storefront Website',
      description: 'A local business and retail profile concept designed to establish a credible online presence. Showcases compact product and service catalogs, operating hours, physical location, and direct customer inquiry integration via WhatsApp.',
      features: [
        'Credible and well-structured business profile presentation for local enterprises',
        'Compact product/service showcase with transparent pricing and clear descriptions',
        'Direct-to-WhatsApp messaging integration with pre-filled inquiry format',
        'Ultra-lightweight asset footprint ensuring effortless loading on mobile connections'
      ],
      techStack: ['Semantic HTML5', 'CSS Grid', 'Vanilla JavaScript', 'WhatsApp API'],
      sourceInfo: 'Layout exploration for small business storefronts and direct WhatsApp customer inquiries.',
      githubUrl: null,
      actionUrl: '#contact',
      actionText: 'Discuss Similar Concept'
    }
  };

  /* ======================================================
   * 3. INITIALIZE CONTACT TEXT & LINKS
   * ====================================================== */
  const emailDisplay = document.getElementById('text-email-display');
  const whatsappDisplay = document.getElementById('text-whatsapp-display');
  const btnEmail = document.getElementById('btn-email-me');
  const btnWhatsapp = document.getElementById('btn-whatsapp-me');

  if (emailDisplay) emailDisplay.textContent = CONTACT_CONFIG.email;
  if (whatsappDisplay) whatsappDisplay.textContent = CONTACT_CONFIG.whatsappDisplay;

  if (btnEmail) {
    btnEmail.href = `mailto:${CONTACT_CONFIG.email}?subject=Website%20Project%20Inquiry%20-%20Valldiii`;
  }
  if (btnWhatsapp) {
    btnWhatsapp.href = CONTACT_CONFIG.whatsappLink;
  }

  /* ======================================================
   * 4. MOBILE DRAWER NAVIGATION
   * ====================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  const openMobileMenu = () => {
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-active');
    drawerOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-active');
    drawerOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', closeMobileMenu);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
        closeMobileMenu();
      }
    });
  }

  /* ======================================================
   * 5. STICKY HEADER & ACTIVE NAV SCROLL SPY
   * ====================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header styling on scroll
    if (header) {
      if (scrollY > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }

    // Active link highlighting
    const headerHeight = header ? header.offsetHeight : 70;
    sections.forEach(currentSection => {
      const sectionHeight = currentSection.offsetHeight;
      const sectionTop = currentSection.offsetTop - headerHeight - 80;
      const sectionId = currentSection.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial check

  /* ======================================================
   * 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   * ====================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ======================================================
   * 6.1 HERO MOCKUP INTERACTION (OPENS COFFEE SHOP DEMO)
   * ====================================================== */
  const heroMockupCard = document.querySelector('.hero-col-mockup .mockup-frame-card');
  if (heroMockupCard) {
    heroMockupCard.style.cursor = 'pointer';
    heroMockupCard.setAttribute('title', 'Click to open Valldiii Coffee Shop live demo in a new tab');
    heroMockupCard.addEventListener('click', (e) => {
      // Don't duplicate action if clicking direct anchor inside
      if (e.target.closest('a')) return;
      window.open('projects/coffee-shop/index.html', '_blank', 'noopener,noreferrer');
    });
  }

  /* ======================================================
   * 7. PROJECT DETAILS MODAL & SOURCE CODE HANDLER
   * ====================================================== */
  const modal = document.getElementById('project-modal');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalFeatures = document.getElementById('modal-features-list');
  const modalTech = document.getElementById('modal-tech-stack');
  const modalSourceNote = document.getElementById('modal-source-note');
  const modalClose = document.getElementById('modal-close');
  const modalDismiss = document.getElementById('modal-btn-dismiss');
  const modalAction = document.getElementById('modal-btn-action');

  const openProjectModal = (projectId) => {
    const data = PROJECTS_DATA[projectId];
    if (!data || !modal) return;

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.description;
    if (modalSourceNote) modalSourceNote.textContent = data.sourceInfo || 'Available in local project directory.';

    if (modalFeatures) {
      modalFeatures.innerHTML = '';
      data.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
      });
    }

    if (modalTech) {
      modalTech.innerHTML = '';
      data.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tech;
        modalTech.appendChild(span);
      });
    }

    if (modalAction) {
      modalAction.href = data.actionUrl;
      modalAction.textContent = data.actionText;
      if (data.actionUrl.startsWith('http') || data.actionUrl.includes('.html')) {
        modalAction.target = '_blank';
        modalAction.rel = 'noopener noreferrer';
      } else {
        modalAction.removeAttribute('target');
        modalAction.removeAttribute('rel');
      }
    }

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-action="view-details"]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = button.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  // Source code button handler (verifies GitHub repo or provides local path information)
  document.querySelectorAll('[data-action="view-source"]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = button.getAttribute('data-project');
      const data = PROJECTS_DATA[projectId];
      if (data && data.githubUrl) {
        window.open(data.githubUrl, '_blank', 'noopener,noreferrer');
      } else {
        const infoMsg = (data && data.sourceInfo)
          ? data.sourceInfo
          : 'Source code for this concept is maintained locally and is not yet published on GitHub.';
        showToast(infoMsg);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalDismiss) modalDismiss.addEventListener('click', closeProjectModal);

  // Close modal when an in-page anchor like #contact is clicked inside modalAction
  if (modalAction) {
    modalAction.addEventListener('click', () => {
      const href = modalAction.getAttribute('href');
      if (href && href.startsWith('#')) {
        closeProjectModal();
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeProjectModal();
      }
    });
  }

  /* ======================================================
   * 8. CLIPBOARD COPY WITH TOAST NOTIFICATION
   * ====================================================== */
  const toastHub = document.getElementById('toast-hub');

  const showToast = (message) => {
    if (!toastHub) return;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
      <svg viewBox="0 0 20 20" fill="#34d399" width="16" height="16" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
      <span>${message}</span>
    `;
    toastHub.appendChild(toast);

    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3100);
  };

  document.querySelectorAll('[data-copy-target]').forEach(button => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-copy-target');
      const copyType = button.getAttribute('data-copy-type') || 'Text';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback textarea method
          const tempTextArea = document.createElement('textarea');
          tempTextArea.value = textToCopy;
          tempTextArea.style.position = 'fixed';
          tempTextArea.style.left = '-9999px';
          document.body.appendChild(tempTextArea);
          tempTextArea.focus();
          tempTextArea.select();
          document.execCommand('copy');
          document.body.removeChild(tempTextArea);
        }
        showToast(`${copyType} copied to clipboard!`);
      } catch (err) {
        showToast(`Copied: ${textToCopy}`);
      }
    });
  });

  /* ======================================================
   * 9. BACK TO TOP BUTTON
   * ====================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ======================================================
   * 10. DYNAMIC COPYRIGHT YEAR
   * ====================================================== */
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
