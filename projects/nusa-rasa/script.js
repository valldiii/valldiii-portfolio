/**
 * ========================================================
 * NUSA RASA – CATERING & FOOD SERVICE
 * Core Interactive JavaScript Logic (Production Ready)
 * 
 * Modul Fitur:
 * 1. Konfigurasi Kontak & WhatsApp Terpusat
 * 2. Mobile Drawer Navigation & Accessibility
 * 3. Sticky Header & Active Nav Spy
 * 4. Filter Kategori Menu Makanan
 * 5. Quick Select Menu & Paket ke Formulir Pemesanan
 * 6. Formulir Pemesanan Interaktif & Validasi Lengkap
 * 7. Tombol Kembali ke Atas (Back to Top)
 * 8. Scroll Reveal Observer
 * 9. Dynamic Copyright Year
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ======================================================
   * 1. KONFIGURASI KONTAK WHATSAPP TERPUSAT
   * ======================================================
   * PANDUAN PENGGANTIAN NOMOR (UNTUK PEMILIK USAHA / DEVELOPER):
   * Ganti nilai 'number' di bawah ini dengan nomor WhatsApp resmi bisnis Anda.
   * Gunakan format internasional TANPA simbol '+' atau spasi (contoh: '6281234567890').
   */
  const NUSA_RASA_CONFIG = {
    // Nomor WhatsApp resmi catering (Ganti di sini):
    whatsappNumber: '6281234567890',
    whatsappDisplay: '+62 812-3456-7890',
    emailContact: 'halo.nusarasa@gmail.com',
    businessName: 'NUSA RASA Catering & Food Service',
    defaultMessage: 'Halo Admin NUSA RASA Catering, saya ingin berkonsultasi mengenai paket catering dan layanan makanan untuk acara saya.'
  };

  // Helper untuk membuat link WhatsApp terformat
  function createWhatsAppUrl(messageText) {
    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/${NUSA_RASA_CONFIG.whatsappNumber}?text=${encodedText}`;
  }

  // Terapkan nomor konfigurasi ke elemen UI
  const displayPhoneEl = document.getElementById('display-contact-phone');
  const directWaBtn = document.getElementById('btn-direct-wa');

  if (displayPhoneEl) {
    displayPhoneEl.textContent = NUSA_RASA_CONFIG.whatsappDisplay;
  }

  if (directWaBtn) {
    directWaBtn.href = createWhatsAppUrl(NUSA_RASA_CONFIG.defaultMessage);
  }

  /* ======================================================
   * 2. TOAST NOTIFICATION FEEDBACK
   * ====================================================== */
  const toastBox = document.getElementById('toast-notification');
  let toastTimer = null;

  function showToast(message, duration = 3500) {
    if (!toastBox) return;
    toastBox.textContent = message;
    toastBox.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastBox.classList.remove('show');
    }, duration);
  }

  /* ======================================================
   * 3. MOBILE MENU & DRAWER NAVIGATION
   * ====================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMenu() {
    if (!mobileToggle || !navMenu) return;
    mobileToggle.classList.add('is-active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-active');
    if (drawerOverlay) drawerOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileToggle || !navMenu) return;
    mobileToggle.classList.remove('is-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-active');
    if (drawerOverlay) drawerOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', closeMenu);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Aksesibilitas: Tutup drawer dengan tombol ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
        closeMenu();
      }
    });
  }

  /* ======================================================
   * 4. STICKY NAVBAR & ACTIVE NAV SPY
   * ====================================================== */
  const siteHeader = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  const trackedSections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 180;

    trackedSections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (matchingLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ======================================================
   * 5. MENU FILTER TABS
   * ====================================================== */
  const filterBtns = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });

  /* ======================================================
   * 6. QUICK SELECT MENU & PAKET INTO ORDER FORM
   * ====================================================== */
  const packageSelect = document.getElementById('package-select');
  const specialNotes = document.getElementById('special-notes');
  const clientNameInput = document.getElementById('client-name');
  const contactSection = document.getElementById('contact');

  function scrollToOrderFormAndFocus() {
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      if (clientNameInput) {
        clientNameInput.focus();
      }
    }, 600);
  }

  // Pilih paket dari section Paket Catering
  const selectPackageBtns = document.querySelectorAll('.btn-select-package');
  selectPackageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgName = btn.getAttribute('data-package') || '';
      if (packageSelect) {
        let matched = false;
        for (let i = 0; i < packageSelect.options.length; i++) {
          const optText = packageSelect.options[i].text.toLowerCase();
          const cleanPkg = pkgName.split('(')[0].trim().toLowerCase();
          if (optText.includes(cleanPkg)) {
            packageSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          packageSelect.value = "Menu A La Carte / Custom Anggaran";
        }
      }

      if (specialNotes) {
        specialNotes.value = `Tertarik dengan pilihan: ${pkgName}. Mohon info pricelist lengkap dan simulasi jadwal acara.`;
      }

      scrollToOrderFormAndFocus();
      showToast(`✓ ${pkgName} dipilih! Silakan lengkapi formulir.`);
    });
  });

  // Tombol Pesan per item pada Menu Populer
  const menuOrderBtns = document.querySelectorAll('.btn-menu-order');
  menuOrderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const menuTitle = btn.getAttribute('data-menu') || 'Menu Pilihan';
      if (packageSelect) {
        packageSelect.value = "Menu A La Carte / Custom Anggaran";
      }
      if (specialNotes) {
        specialNotes.value = `Saya ingin memesan menu spesifik: ${menuTitle}. Mohon konfirmasi ketersediaan porsi dan harga.`;
      }

      scrollToOrderFormAndFocus();
      showToast(`✓ Menu "${menuTitle}" dipilih. Formulir siap diisi!`);
    });
  });

  // Tombol Konsultasi Anggaran Custom
  const btnCustomQuote = document.getElementById('btn-custom-quote');
  if (btnCustomQuote) {
    btnCustomQuote.addEventListener('click', (e) => {
      e.preventDefault();
      if (packageSelect) {
        packageSelect.value = "Menu A La Carte / Custom Anggaran";
      }
      if (specialNotes) {
        specialNotes.value = "Halo, saya ingin konsultasi menu custom menyesuaikan bujet dan kebutuhan acara.";
      }
      scrollToOrderFormAndFocus();
    });
  }

  /* ======================================================
   * 7. ORDER FORM & WHATSAPP VALIDATION GENERATOR
   * ====================================================== */
  const orderForm = document.getElementById('catering-order-form');
  const eventDateInput = document.getElementById('event-date');

  // Set tanggal minimal pemesanan adalah hari ini
  if (eventDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    eventDateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Helper untuk reset status validasi visual saat pengguna mengetik
  const formInputs = orderForm ? orderForm.querySelectorAll('.form-control') : [];
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
    });
    input.addEventListener('change', () => {
      input.classList.remove('is-invalid');
    });
  });

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('client-name');
      const phoneInput = document.getElementById('client-phone');
      const packageInput = document.getElementById('package-select');
      const guestInput = document.getElementById('guest-count');
      const dateInput = document.getElementById('event-date');
      const eventTypeInput = document.getElementById('event-type');
      const addressInput = document.getElementById('event-address');
      const notesInput = document.getElementById('special-notes');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const pkg = packageInput ? packageInput.value : '';
      const guests = guestInput ? guestInput.value.trim() : '';
      const date = dateInput ? dateInput.value : '';
      const eventType = eventTypeInput ? eventTypeInput.value : 'Acara Umum';
      const address = addressInput ? addressInput.value.trim() : '';
      const notes = notesInput ? notesInput.value.trim() : '';

      // 1. Validasi Nama
      if (!name || name.length < 2) {
        showToast('⚠️ Mohon masukkan nama pemesan atau instansi yang jelas.');
        if (nameInput) {
          nameInput.classList.add('is-invalid');
          nameInput.focus();
        }
        return;
      }

      // 2. Validasi Nomor Telepon / WA (Hanya digit & simbol +, min 9 digit)
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
      const phoneRegex = /^(\+62|62|08)[0-9]{8,13}$/;
      if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
        showToast('⚠️ Nomor WhatsApp tidak valid. Gunakan format seperti 0812XXXXXXXX atau 62812XXXXXXXX.');
        if (phoneInput) {
          phoneInput.classList.add('is-invalid');
          phoneInput.focus();
        }
        return;
      }

      // 3. Validasi Paket
      if (!pkg) {
        showToast('⚠️ Silakan pilih salah satu kategori paket catering.');
        if (packageInput) {
          packageInput.classList.add('is-invalid');
          packageInput.focus();
        }
        return;
      }

      // 4. Validasi Jumlah Porsi (Minimal 10)
      const guestNum = parseInt(guests, 10);
      if (isNaN(guestNum) || guestNum < 10) {
        showToast('⚠️ Estimasi minimal pemesanan adalah 10 porsi.');
        if (guestInput) {
          guestInput.classList.add('is-invalid');
          guestInput.focus();
        }
        return;
      }

      // 5. Validasi Tanggal Acara
      if (!date) {
        showToast('⚠️ Mohon tentukan tanggal acara Anda.');
        if (dateInput) {
          dateInput.classList.add('is-invalid');
          dateInput.focus();
        }
        return;
      }

      const selectedDate = new Date(date);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate < todayDate) {
        showToast('⚠️ Tanggal acara tidak boleh di masa lalu.');
        if (dateInput) {
          dateInput.classList.add('is-invalid');
          dateInput.focus();
        }
        return;
      }

      // Format Teks WhatsApp Profesional & Lengkap
      const formattedDate = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(selectedDate);

      const waText = 
`*PESANAN & KONSULTASI CATERING NUSA RASA*
====================================
Halo Admin NUSA RASA Catering, saya ingin memesan / mengajukan penawaran:

👤 *Nama Pemesan / Instansi:* ${name}
📱 *Nomor WhatsApp:* ${phone}
🍱 *Paket Pilihan:* ${pkg}
👥 *Estimasi Porsi:* ${guestNum} Porsi
📅 *Tanggal Acara:* ${formattedDate}
🎉 *Jenis Acara:* ${eventType}
📍 *Alamat Pengiriman:* ${address ? address : '(Akan dikonfirmasi menyusul)'}
📝 *Catatan Khusus:* ${notes ? notes : '-'}
====================================
Mohon informasi ketersediaan jadwal dan rincian penawaran resminya. Terima kasih!`;

      const targetUrl = createWhatsAppUrl(waText);

      showToast('🚀 Membuka WhatsApp untuk mengirim rincian pesanan...');

      // Buka tautan WhatsApp di tab baru
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }

  /* ======================================================
   * 8. TOMBOL KEMBALI KE ATAS (BACK TO TOP)
   * ====================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ======================================================
   * 9. SCROLL REVEAL OBSERVER
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
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ======================================================
   * 10. DYNAMIC COPYRIGHT YEAR
   * ====================================================== */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
