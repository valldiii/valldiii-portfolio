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
      category: 'Proyek Riil Lokal',
      title: 'Valldiii Coffee Shop',
      description: 'Website demo kedai kopi berkonsep modern dan hangat yang dirancang mandiri menggunakan kode murni. Berfungsi penuh menampilkan produk artisan coffee, katalog menu interaktif dengan filter instan (Kopi & Non-Kopi), profil cerita kedai, serta alur pemesanan langsung.',
      features: [
        'Hero section dinamis dengan ajakan aksi (CTA) yang jelas',
        'Filter kategori menu instan (Semua, Kopi, Non-Kopi) dengan Vanilla JavaScript murni',
        'Tata letak kartu menu responsif berbasis CSS Grid adaptif',
        'Cerita kedai & kurasi biji kopi pilihan lokal Nusantara',
        'Alur pemesanan cepat tanpa ketergantungan library luar',
        'Struktur semantik HTML5 yang siap untuk pengindeksan mesin pencari'
      ],
      techStack: ['HTML5 Semantik', 'CSS3 Modern', 'Vanilla JavaScript', 'CSS Grid', 'Responsive Design'],
      actionUrl: 'projects/coffee-shop/index.html',
      actionText: 'Buka Live Demo'
    },

    agency: {
      category: 'Studi Konsep Landing Page',
      title: 'Landing Page Jasa Kreatif',
      description: 'Eksplorasi pembuatan landing page satu halaman (one-page) yang berorientasi pada rasio konversi tinggi. Dirancang dengan hierarki visual kontras, tipografi tegas, susunan fitur padat, dan waktu rendering instan tanpa framework CSS.',
      features: [
        'Navigasi halus satu halaman dengan section sorotan layanan unggulan',
        'Hierarki tipografi editorial untuk memperkuat daya tarik promosi jasa',
        'Tata letak kartu fitur adaptif berbasis CSS Flexbox',
        'Performa pemuatan ultra-cepat dengan skor Lighthouse optimal',
        'Integrasi tombol Call-to-Action terarah untuk konsultasi instan'
      ],
      techStack: ['HTML5 Semantik', 'CSS Flexbox', 'Mobile-First', 'Performance Audit'],
      actionUrl: '#contact',
      actionText: 'Konsultasi Konsep Serupa'
    },

    business: {
      category: 'Studi Konsep Website UMKM',
      title: 'Simple Business Website (UMKM)',
      description: 'Konsep website profil usaha kecil dan menengah (UMKM) untuk membangun kehadiran digital yang profesional, menampilkan katalog menu/produk ringkas, jam operasional, dan integrasi pemesanan chat langsung melalui WhatsApp bisnis.',
      features: [
        'Penyajian profil dan identitas usaha lokal yang rapi serta kredibel',
        'Etalase produk atau menu ringkas dengan label harga yang transparan',
        'Integrasi tautan pesan instan ke WhatsApp bisnis dengan format pesan otomatis',
        'Ukuran aset sangat ringan sehingga mudah dibuka pelanggan dengan koneksi terbatas'
      ],
      techStack: ['HTML5 Semantik', 'CSS Grid', 'Vanilla JavaScript', 'WhatsApp API'],
      actionUrl: '#contact',
      actionText: 'Konsultasi Konsep Serupa'
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
    btnEmail.href = `mailto:${CONTACT_CONFIG.email}?subject=Diskusi%20Proyek%20Website%20-%20Valldiii`;
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
   * 7. PROJECT DETAILS MODAL
   * ====================================================== */
  const modal = document.getElementById('project-modal');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalFeatures = document.getElementById('modal-features-list');
  const modalTech = document.getElementById('modal-tech-stack');
  const modalClose = document.getElementById('modal-close');
  const modalDismiss = document.getElementById('modal-btn-dismiss');
  const modalAction = document.getElementById('modal-btn-action');

  const openProjectModal = (projectId) => {
    const data = PROJECTS_DATA[projectId];
    if (!data || !modal) return;

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.description;

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

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalDismiss) modalDismiss.addEventListener('click', closeProjectModal);

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
      const copyType = button.getAttribute('data-copy-type') || 'Teks';

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
        showToast(`${copyType} berhasil disalin!`);
      } catch (err) {
        showToast(`Salin: ${textToCopy}`);
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
