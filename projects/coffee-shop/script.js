
/**
 * ========================================================
 * VALLDIII COFFEE SHOP — INTERACTIVE WEBSITE SCRIPT
 *
 * Features:
 * 1. Product Catalog & Menu Filter
 * 2. Interactive Order Modal
 * 3. Quantity Stepper & Input Validation
 * 4. WhatsApp Direct Order Integration
 * 5. Mobile Navigation Drawer
 * 6. Smooth Page Scrolling
 * 7. Smart Back-Link Handling
 * 8. Image Error Fallback
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ======================================================
   * 1. CONFIGURATION & PRODUCT DATA
   * ====================================================== */

  const COFFEE_CONFIG = {
    whatsappNumber: '6281210119304',
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
      description: 'A pure extraction of Indonesian Arabica coffee beans, featuring a rich crema, dark chocolate notes, and a subtle spicy aroma.'
    },

    'aren-latte': {
      id: 'aren-latte',
      name: 'Creamy Aren Latte',
      price: 28000,
      category: 'coffee',
      image: 'images/aren_latte.jpg',
      description: 'A balanced blend of bold espresso, smooth fresh milk, and the natural sweetness of carefully selected palm sugar.'
    },

    'cold-brew': {
      id: 'cold-brew',
      name: 'Cold Brew Citrus',
      price: 30000,
      category: 'coffee',
      image: 'images/cold_brew.jpg',
      description: 'Cold-brewed coffee steeped for 16 hours, delivering a smooth taste with refreshing notes of locally sourced citrus.'
    },

    'matcha-latte': {
      id: 'matcha-latte',
      name: 'Matcha Oat Latte',
      price: 32000,
      category: 'non-coffee',
      image: 'images/matcha_latte.jpg',
      description: 'Authentic Uji matcha blended with creamy oat milk for a smooth, rich, and calming drink without coffee.'
    },

    'chocolate': {
      id: 'chocolate',
      name: 'Signature Chocolate',
      price: 28000,
      category: 'non-coffee',
      image: 'images/chocolate.jpg',
      description: 'Rich East Javanese chocolate with a smooth texture, balanced sweetness, and a dusting of pure cocoa powder.'
    }
  };

  // Currency formatter: 28000 -> Rp 28.000
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
   * 3. TOAST NOTIFICATION
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

  const openOrderModal = (productId) => {
    const product =
      PRODUCTS_CATALOG[productId] ||
      PRODUCTS_CATALOG['aren-latte'];

    currentOrder.productId = product.id;
    currentOrder.quantity = 1;
    currentOrder.notes = '';

    if (modalDrinkName) {
      modalDrinkName.textContent = product.name;
    }

    if (modalUnitPrice) {
      modalUnitPrice.textContent =
        formatRupiah(product.price) + ' / cup';
    }

    if (modalDrinkDesc) {
      modalDrinkDesc.textContent = product.description;
    }

    if (modalProductImg) {
      modalProductImg.src = product.image;
      modalProductImg.alt = product.name;
    }

    if (orderQuantityInput) {
      orderQuantityInput.value = '1';
    }

    if (orderNotesInput) {
      orderNotesInput.value = '';
    }

    updateSubtotal();

    if (orderModalBackdrop) {
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

        if (orderQuantityInput) {
          orderQuantityInput.value = currentOrder.quantity;
        }

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

        if (orderQuantityInput) {
          orderQuantityInput.value = currentOrder.quantity;
        }

        updateSubtotal();
      }
    });
  }


  /* ======================================================
   * 6. MODAL CLOSE HANDLERS
   * ====================================================== */

  const orderModalCard = orderModalBackdrop
    ? orderModalBackdrop.querySelector('.order-modal-card')
    : null;

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

  if (orderModalBackdrop) {
    orderModalBackdrop.addEventListener('click', (e) => {
      if (e.target === orderModalBackdrop) {
        closeOrderModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (
        orderModalBackdrop &&
        orderModalBackdrop.classList.contains('is-open')
      ) {
        closeOrderModal();
      }

      closeMobileNav();
    }
  });

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

      const userNotes = orderNotesInput
        ? orderNotesInput.value.trim()
        : '';

      const totalAmount = formatRupiah(
        product.price * currentOrder.quantity
      );

      // Create a professional English order message
      let message =
        'Hello ' +
        COFFEE_CONFIG.shopName +
        ', I would like to place an order:\n\n';

      message += '- Product: ' + product.name + '\n';
      message += '- Quantity: ' + currentOrder.quantity + ' cup(s)\n';
      message += '- Unit Price: ' + formatRupiah(product.price) + '\n';
      message += '- Total: ' + totalAmount + '\n';

      if (userNotes) {
        message += '- Special Notes: ' + userNotes + '\n';
      }

      message +=
        '\nPlease confirm product availability and provide my order number. Thank you!';

      const encodedMessage = encodeURIComponent(message);

      const waUrl =
        'https://wa.me/' +
        COFFEE_CONFIG.whatsappNumber +
        '?text=' +
        encodedMessage;

      showToast(
        'Opening WhatsApp to place your order for ' +
        product.name +
        '...'
      );

      // Open WhatsApp with a fallback for popup blockers
      try {
        const opened = window.open(
          waUrl,
          '_blank',
          'noopener,noreferrer'
        );

        if (
          !opened ||
          opened.closed ||
          typeof opened.closed === 'undefined'
        ) {
          window.location.href = waUrl;
        }
      } catch (err) {
        window.location.href = waUrl;
      }

      closeOrderModal();
    });
  }


  /* ======================================================
   * 8. ORDER BUTTON EVENT LISTENERS
   * ====================================================== */

  const orderButtons = document.querySelectorAll(
    '[data-action="order"]'
  );

  orderButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const productId = btn.getAttribute('data-id');

      if (productId) {
        openOrderModal(productId);
      }
    });
  });

  // Global click delegation
  document.addEventListener('click', (e) => {

    // Product order button
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

    // Navigation order button
    const navOrderBtn = e.target.closest('.btn-order-nav');

    if (navOrderBtn) {
      e.preventDefault();

      const menuSection = document.getElementById('menu');

      if (menuSection) {
        menuSection.scrollIntoView({
          behavior: 'smooth'
        });
      }

      showToast(
        'Choose your favorite drink below and click "Order".'
      );

      closeMobileNav();
    }
  });


  /* ======================================================
   * 9. CATEGORY FILTER LOGIC
   * ====================================================== */

  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {

      filterBtns.forEach((b) => {
        b.classList.remove('active');
      });

      btn.classList.add('active');

      const selectedCategory =
        btn.getAttribute('data-category');

      menuCards.forEach((card) => {
        const itemCategory =
          card.getAttribute('data-category');

        if (
          selectedCategory === 'all' ||
          itemCategory === selectedCategory
        ) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ======================================================
   * 10. MOBILE NAVIGATION
   * ====================================================== */

  const closeMobileNav = () => {
    if (
      navLinks &&
      navLinks.classList.contains('is-active')
    ) {
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

      const isOpen =
        navLinks.classList.toggle('is-active');

      navToggle.classList.toggle('is-active', isOpen);

      navToggle.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
      );
    });

    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
      if (
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMobileNav();
      }
    });
  }


  /* ======================================================
   * 11. SMOOTH SCROLLING
   * ====================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener('click', function (e) {

      if (this.classList.contains('btn-order-nav')) {
        return;
      }

      const targetId = this.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();

        targetEl.scrollIntoView({
          behavior: 'smooth'
        });

        document.querySelectorAll('.nav-item').forEach((link) => {
          link.classList.remove('active');
        });

        if (this.classList.contains('nav-item')) {
          this.classList.add('active');
        }

        closeMobileNav();
      }
    });
  });


  /* ======================================================
   * 12. SMART BACK-LINK HANDLER
   * ====================================================== */

  const backLink = document.querySelector('.back-link');

  if (backLink) {

    backLink.addEventListener('click', (e) => {

      const isInsideIframe = window.self !== window.top;

      if (isInsideIframe) {
        e.preventDefault();

        try {
          const parentProjects =
            window.top.document.getElementById('projects');

          if (parentProjects) {
            parentProjects.scrollIntoView({
              behavior: 'smooth'
            });
          } else {
            window.top.location.href = backLink.href;
          }

        } catch (err) {
          window.top.location.href = backLink.href;
        }
      }
    });
  }


  /* ======================================================
   * 13. IMAGE ERROR FALLBACK
   * ====================================================== */

  document.querySelectorAll('img').forEach((img) => {

    img.addEventListener('error', function () {

      if (!this.dataset.fallbackApplied) {

        this.dataset.fallbackApplied = 'true';

        this.style.background =
          'linear-gradient(135deg, #2a1e15 0%, #1a120c 100%)';

        this.style.objectFit = 'contain';
        this.style.minHeight = '180px';

        // Use a transparent image to hide broken image icons
        this.src =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

        this.alt = 'Image unavailable';
      }
    });
  });

});
