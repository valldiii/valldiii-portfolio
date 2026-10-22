# 🚀 Valldiii - Personal Portfolio Website

Website portofolio profesional untuk **Valldiii** (Freelance Web Developer), dibangun dengan standar web modern menggunakan **HTML5, CSS3, dan Vanilla JavaScript murni** tanpa framework atau ketergantungan library luar yang berat.

---

## 📁 Struktur Folder Proyek

```text
valldiii-portfolio/
│
├── index.html                  # Halaman utama portofolio
├── style.css                   # Sistem desain, variabel CSS, tema & responsivitas
├── script.js                   # Interaktivitas, konfigurasi kontak, modal & menu
├── README.md                   # Panduan lengkap penggunaan & kustomisasi
│
└── projects/
    └── coffee-shop/            # Demo Proyek 1: Valldiii Coffee Shop Demo
        ├── index.html
        ├── style.css
        └── script.js
```

---

## 💻 Cara Menjalankan Website di Laptop Windows

Anda dapat menjalankan website ini di Windows tanpa perlu menginstal Node.js atau server database:

### Opsi 1: Klik Ganda Langsung (Paling Mudah)
1. Buka File Explorer di Windows.
2. Masuk ke folder: `valldiii-portfolio`.
3. Klik ganda file `index.html`.
4. Website akan langsung terbuka di browser default Anda (Chrome, Edge, Firefox, dll).

### Opsi 2: Menggunakan Ekstensi "Live Server" di VS Code / Antigravity IDE (Direkomendasikan untuk Editing)
1. Buka folder `valldiii-portfolio` di editor kode Anda.
2. Klik kanan pada file `index.html`.
3. Pilih **"Open with Live Server"**.
4. Website akan terbuka di `http://127.0.0.1:5500/` dengan fitur auto-reload saat file disimpan.

### Opsi 3: Menggunakan Python Local Server (Opsional via PowerShell)
Jika Anda memiliki Python terinstal di Windows:
```powershell
cd valldiii-portfolio
python -m http.server 8000
```
Buka browser dan ketik alamat: `http://localhost:8000`

---

## 🛠️ Konfigurasi Identitas & Kontak Resmi

File `script.js` telah dikonfigurasi langsung dengan kontak resmi Valldiii:

```javascript
const CONTACT_CONFIG = {
  // Alamat email resmi Valldiii
  email: 'aftaasifasifa33083@gmail.com',

  // Nomor WhatsApp dalam format internasional tanpa tanda '+'
  whatsappNumber: '6281210119304',

  // Nomor WhatsApp format lokal untuk tampilan visual
  whatsappDisplay: '081210119304',

  // Pesan default saat calon klien membuka WhatsApp
  whatsappMessage: 'Halo Valldiii, saya tertarik untuk berdiskusi tentang pembuatan website.',

  // Status konfigurasi aktif
  isConfigured: true
};
```

---

## ✨ Fitur-Fitur Utama
- **Desain Modern & Estetik**: Tampilan Dark Navy mewah (`#0B1120`) dengan aksen biru lembut (`#60A5FA` / `#3B82F6`).
- **Headline Tegas & Berkarakter**: *"Membangun Website yang Modern, Cepat, dan Profesional."*
- **Preview Coding Realistis**: Ilustrasi jendela kode CSS murni (tanpa foto manusia palsu).
- **100% Responsif & Mobile-First**: Tampilan rapi di smartphone, tablet, maupun layar lebar tanpa horizontal scroll.
- **Scroll Margin Header**: Navigasi sticky tidak menutupi judul section saat tautan menu diklik.
- **Akses Langsung Kontak**: Integrasi tautan resmi WhatsApp internasional (`https://wa.me/6281210119304`) dan email (`mailto:aftaasifasifa33083@gmail.com`).
- **Aksesibilitas & Reduced Motion**: Mendukung navigasi keyboard, dialog modal yang dapat ditutup dengan tombol Escape, dan menghormati preferensi `prefers-reduced-motion`.
- **Kejujuran Personal Branding**: Menampilkan Valldiii secara profesional sebagai calon freelance web developer yang terus bertumbuh tanpa klaim palsu.
