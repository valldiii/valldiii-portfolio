/**
 * ========================================================
 * VALLDIII COFFEE SHOP — CLIENT-READY INTERACTIVE SCRIPT
 * Features:
 * 1. Product Catalog Data & Menu Filter
 * 2. Interactive Order Modal with Real-Time Subtotal
 * 3. Quantity Stepper (+ / -) with Input Validation
 * 4. WhatsApp Direct Order Generator (Official 6281210119304)
 * 5. Mobile Navigation Drawer & Accessibility
 * 6. Smooth Scroll with Sticky Header Offset
 * 7. Smart Back-Link (Standalone vs Iframe Handling)
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ======================================================
   * 1. CONFIGURATION & PRODUCT DATA
   * ====================================================== */
  const COFFEE_CONFIG = {
    whatsappNumber: '6281210119304', // Official Valldiii WhatsApp
    shopName: 'Valldiii Coffee',
    currencyPrefix: 'Rp '
  };

  const PRODUCTS_CATALOG = {
    'espresso': {
      id: 'espresso',
      name: 'Espresso Blend Valldiii',
      price: 22000,
      category: 'coffee',
      image: 'images/espresso.jpg',
      description: 'Ekstraksi murni biji kopi Arabika Nusantara dengan crema tebal, sentuhan cokelat hitam, dan aroma rempah halus.'
    },
    'aren-latte': {
      id: 'aren-latte',
      name: 'Creamy Aren Latte',
      price: 28000,
      category: 'coffee',
      image: 'images/aren_latte.jpg',
      description: 'Paduan seimbang espresso bold, susu segar lembut (fresh milk), dan manis alami gula aren organik pilihan.'
    },
    'cold-brew': {
      id: 'cold-brew',
      name: 'Cold Brew Citrus',
      price: 30000,
      category: 'coffee',
      image: 'images/cold_brew.jpg',
      description: 'Kopi cold drip yang diseduh dingin selama 16 jam, menghasilkan rasa yang halus dengan kesegaran jeruk sitrus lokal.'
    },
    'matcha-latte': {
      id: 'matcha-latte',
      name: 'Matcha Oat Latte',
      price: 32000,
      category: 'non-coffee',
      image: 'images/matcha_latte.jpg',
      description: 'Bubuk Uji matcha autentik berpadu susu gandum (oat milk) yang creamy, gurih, dan menenangkan tanpa kafein kopi.'
    },
    'chocolate': {
      id: 'chocolate',
      name: 'Signature Chocolate',
      price: 28000,
      category: 'non-coffee',
      image: 'images/chocolate.jpg',
      description: 'Cokelat pekat Jawa Timur dengan kekentalan pas, rasa manis seimbang, dan taburan cocoa powder murni.'
    }
  };

  // Helper currency formatter: e.g. 28000 -> "Rp 28.000"
  const formatRupiah = (number) => {
    return COFFEE_CONFIG.currencyPrefix + number.toLocaleString('id-ID');
  };

  /* ======================================================
   * 2. DOM ELEMENT REFERENCES
   * ====================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const toastHub = document.getElementById('toast-hub');

  // Modal elements
  const orderModalBackdrop = document.getElementById('order-modal-backdrop');
  const modalDrinkName = document.getElementById('modal-drink-name');
  const modalUnitPrice = document.getElementById('modal-unit-price');
  const modalDrinkDesc = document.getElementById('modal-drink-desc');
  const modalProductImg = document.getElementById('modal-product-img');
  const orderQuantityInput = document.getElementById('order-quantity-input');
  const orderNotesInput = document.getElementById('order-notes-input');
  const modalSubtotalVal = document.getElementById('modal-subtotal-val');
  const btnQtyMinus = document.getElementById('btn-qty-minus');
  const btnQtyPlus = document.getElementById('btn-qty-plus');
  const modalOrderClose = document.getElementById('modal-order-close');
  const btnCancelOrder = document.getElementById('btn-cancel-order');
  const btnSubmitWhatsapp = document.getElementById('btn-submit-whatsapp');

  /* ======================================================
   * 3. TOAST NOTIFICATION UTILITY
   * ====================================================== */
  const showToast = (message) => {
    if (!toastHub) return;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toastHub.appendChild(toast);
    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3200);
  };

  /* ======================================================
   * 4. ORDER MODAL — OPEN / CLOSE / STATE
   * ====================================================== */
  let currentOrder = {
    productId: 'aren-latte',
    quantity: 1,
    notes: ''
  };

  const updateSubtotal = () => {
    const product = PRODUCTS_CATALOG[currentOrder.productId];
    if (!product) return;
    const subtotal = product.price * currentOrder.quantity;
    if (modalSubtotalVal) {
      modalSubtotalVal.textContent = formatRupiah(subtotal);
    }
    if (btnQtyMinus) {
      btnQtyMinus.disabled = currentOrder.quantity <= 1;
    }
  };

  /**
   * Opens the order modal for a given product.
   * Uses CSS class toggle (.is-open) instead of the HTML hidden attribute
   * to avoid the known display:none conflict with [hidden] in some browsers.
   */
  const openOrderModal = (productId) => {
    const product = PRODUCTS_CATALOG[productId] || PRODUCTS_CATALOG['aren-latte'];
    currentOrder.productId = product.id;
    currentOrder.quantity = 1;
    currentOrder.notes = '';

    if (modalDrinkName) modalDrinkName.textContent = product.name;
    if (modalUnitPrice) modalUnitPrice.textContent = formatRupiah(product.price) + ' / cup';
    if (modalDrinkDesc) modalDrinkDesc.textContent = product.description;
    if (modalProductImg) {
      modalProductImg.src = product.image;
      modalProductImg.alt = product.name;
    }
    if (orderQuantityInput) orderQuantityInput.value = '1';
    if (orderNotesInput) orderNotesInput.value = '';

    updateSubtotal();

    if (orderModalBackdrop) {
      // Use class-based toggle — reliable across all browsers
      orderModalBackdrop.classList.add('is-open');
      orderModalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeOrderModal = () => {
    if (!orderModalBackdrop) return;
    orderModalBackdrop.classList.remove('is-open');
    orderModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  /* ======================================================
   * 5. QUANTITY STEPPER CONTROLS
   * ====================================================== */
  if (btnQtyPlus) {
    btnQtyPlus.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentOrder.quantity < 50) {
        currentOrder.quantity += 1;
        if (orderQuantityInput) orderQuantityInput.value = currentOrder.quantity;
        updateSubtotal();
      }
    });
  }

  if (btnQtyMinus) {
    btnQtyMinus.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentOrder.quantity > 1) {
        currentOrder.quantity -= 1;
        if (orderQuantityInput) orderQuantityInput.value = currentOrder.quantity;
        updateSubtotal();
      }
    });
  }

  /* ======================================================
   * 6. MODAL CLOSE HANDLERS
   * ====================================================== */
  // Stop clicks inside modal card from bubbling to backdrop
  const orderModalCard = orderModalBackdrop ? orderModalBackdrop.querySelector('.order-modal-card') : null;
  if (orderModalCard) {
    orderModalCard.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  if (modalOrderClose) {
    modalOrderClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeOrderModal();
    });
  }

  if (btnCancelOrder) {
    btnCancelOrder.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeOrderModal();
    });
  }

  // Close on backdrop click (only if clicking the backdrop itself, not the card)
  if (orderModalBackdrop) {
    orderModalBackdrop.addEventListener('click', (e) => {
      if (e.target === orderModalBackdrop) {
        closeOrderModal();
      }
    });
  }

  // Close on Escape key (closes modal if open, also closes mobile drawer)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (orderModalBackdrop && orderModalBackdrop.classList.contains('is-open')) {
        closeOrderModal();
      }
      closeMobileNav();
    }
  });

  // Submit on Enter inside notes input
  if (orderNotesInput) {
    orderNotesInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (btnSubmitWhatsapp) {
          btnSubmitWhatsapp.click();
        }
      }
    });
  }

  /* ======================================================
   * 7. WHATSAPP DIRECT ORDER GENERATOR
   * ====================================================== */
  if (btnSubmitWhatsapp) {
    btnSubmitWhatsapp.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const product = PRODUCTS_CATALOG[currentOrder.productId];
      if (!product) return;

      const userNotes = orderNotesInput ? orderNotesInput.value.trim() : '';
      const totalAmount = formatRupiah(product.price * currentOrder.quantity);

      // Create structured, professional Indonesian message
      let message = 'Halo ' + COFFEE_CONFIG.shopName + ', saya ingin memesan kopi:\n\n';
      message += '- Menu: ' + product.name + '\n';
      message += '- Jumlah: ' + currentOrder.quantity + ' cup\n';
      message += '- Harga Satuan: ' + formatRupiah(product.price) + '\n';
      message += '- Total Pembayaran: ' + totalAmount + '\n';
      if (userNotes) {
        message += '- Catatan: ' + userNotes + '\n';
      }
      message += '\nMohon informasi ketersediaan pesanan dan nomor antrean. Terima kasih!';

      const encodedMessage = encodeURIComponent(message);
      const waUrl = 'https://wa.me/' + COFFEE_CONFIG.whatsappNumber + '?text=' + encodedMessage;

      showToast('Membuka WhatsApp untuk pesanan ' + product.name + '...');

      // Smart window opener with fallback if browser popup blocker triggers
      try {
        const opened = window.open(waUrl, '_blank', 'noopener,noreferrer');
        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
          window.location.href = waUrl;
        }
      } catch (err) {
        window.location.href = waUrl;
      }

      closeOrderModal();
    });
  }

  /* ======================================================
   * 8. EVENT LISTENERS FOR ALL "PESAN" BUTTONS (DIRECT & DELEGATED)
   * ====================================================== */
  // Direct button attachment for resilient click handling
  const orderButtons = document.querySelectorAll('[data-action="order"]');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId = btn.getAttribute('data-id');
      if (productId) {
        openOrderModal(productId);
      }
    });
  });

  // Global document delegation as secondary safety net
  document.addEventListener('click', (e) => {
    // 1. Direct "Pesan" button inside menu card
    const orderBtn = e.target.closest('[data-action="order"]');
    if (orderBtn) {
      e.preventDefault();
      e.stopPropagation();
      const productId = orderBtn.getAttribute('data-id');
      if (productId) {
        openOrderModal(productId);
      }
      return;
    }

    // 2. CTA button in Navbar ("Pesan Sekarang")
    const navOrderBtn = e.target.closest('.btn-order-nav');
    if (navOrderBtn) {
      e.preventDefault();
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Pilih menu favorit Anda di bawah ini dan klik "Pesan"');
      // Close mobile nav if open
      closeMobileNav();
    }
  });

  /* ======================================================
   * 9. CATEGORY FILTER LOGIC (SEMUA / KOPI / NON-KOPI)
   * ====================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');
      menuCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ======================================================
   * 10. MOBILE NAVIGATION TOGGLE & DRAWER
   * ====================================================== */
  const closeMobileNav = () => {
    if (navLinks && navLinks.classList.contains('is-active')) {
      navLinks.classList.remove('is-active');
      if (navToggle) {
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('is-active');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking outside header
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

  /* ======================================================
   * 11. SMOOTH SCROLLING FOR IN-PAGE ANCHORS
   * ====================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Skip if this is the order nav button (handled by delegation above)
      if (this.classList.contains('btn-order-nav')) return;

      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });

        // Update active class on nav links
        document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
        if (this.classList.contains('nav-item')) {
          this.classList.add('active');
        }

        // Close mobile drawer if opened
        closeMobileNav();
      }
    });
  });

  /* ======================================================
   * 12. SMART BACK-LINK HANDLER (IFRAME VS STANDALONE)
   * ====================================================== */
  const backLink = document.querySelector('.back-link');
  if (backLink) {
    backLink.addEventListener('click', (e) => {
      const isInsideIframe = window.self !== window.top;
      if (isInsideIframe) {
        // We are embedded inside the portfolio iframe preview
        e.preventDefault();
        try {
          const parentProjects = window.top.document.getElementById('projects');
          if (parentProjects) {
            parentProjects.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.top.location.href = backLink.href;
          }
        } catch (err) {
          window.top.location.href = backLink.href;
        }
      }
      // If opened directly in a browser tab, default navigation to ../../index.html takes place
    });
  }

  /* ======================================================
   * 13. IMAGE ERROR FALLBACK
   * ====================================================== */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      if (!this.dataset.fallbackApplied) {
        this.dataset.fallbackApplied = 'true';
        this.style.background = 'linear-gradient(135deg, #2a1e15 0%, #1a120c 100%)';
        this.style.objectFit = 'contain';
        this.style.minHeight = '180px';
        // Replace broken src with a 1x1 transparent gif to suppress broken image icon
        this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        this.alt = 'Gambar tidak tersedia';
      }
    });
  });
});
