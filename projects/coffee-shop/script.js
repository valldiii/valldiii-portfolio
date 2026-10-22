// Valldiii Coffee Shop Demo Script
document.addEventListener('DOMContentLoaded', () => {
  // Filter menu logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      menuItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Order button demo click
  const orderBtn = document.getElementById('btn-order-demo');
  const orderMsg = document.getElementById('order-msg');

  if (orderBtn && orderMsg) {
    orderBtn.addEventListener('click', () => {
      orderMsg.style.display = 'block';
      orderMsg.textContent = '☕ Terima kasih atas minat Anda! Ini adalah demo antarmuka simulasi pemesanan.';
    });
  }
});
