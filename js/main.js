/* ===== Carousel Data ===== */
const carouselItems = [
  { emoji: '🍓', text: '新鲜水果 全场8折', sub: '时令鲜果 新鲜直达' },
  { emoji: '🥬', text: '有机蔬菜专区', sub: '生态农场 天然无污染' },
  { emoji: '🥩', text: '肉禽海鲜 满99减20', sub: '品质肉类 源头直采' },
  { emoji: '🍯', text: '零食饮料 爆款特惠', sub: '精选好物 限时抢购' }
];

/* ===== Category Data ===== */
const categories = [
  { icon: '🍎', name: '时令鲜果' },
  { icon: '🥬', name: '新鲜蔬菜' },
  { icon: '🥩', name: '肉禽蛋奶' },
  { icon: '🐟', name: '海鲜水产' },
  { icon: '🍚', name: '粮油调味' },
  { icon: '🥛', name: '饮品牛奶' },
  { icon: '🍪', name: '零食干果' },
  { icon: '🧴', name: '家居日用' }
];

/* ===== Product Data ===== */
const products = [
  { emoji: '🍎', name: '红富士苹果 5斤装', price: '29.9', oldPrice: '45.0', tag: '爆款' },
  { emoji: '🍇', name: '阳光玫瑰葡萄 2斤', price: '49.8', oldPrice: '68.0', tag: '新品' },
  { emoji: '🥚', name: '土鸡蛋 30枚装', price: '25.8', oldPrice: '35.0', tag: '热卖' },
  { emoji: '🥩', name: '五花肉 500g', price: '32.0', oldPrice: '40.0', tag: '特惠' },
  { emoji: '🍅', name: '云南高原番茄 1kg', price: '18.8', oldPrice: '26.0', tag: '精选' },
  { emoji: '🐟', name: '鲜活鲈鱼 约500g', price: '38.0', oldPrice: '52.0', tag: '新品' },
  { emoji: '🥛', name: '蒙牛纯牛奶 250ml*24', price: '49.9', oldPrice: '65.0', tag: '爆款' },
  { emoji: '🍠', name: '正宗烟薯 5斤', price: '22.8', oldPrice: '32.0', tag: '特惠' },
  { emoji: '🍋', name: '柠檬 4个装', price: '9.9', oldPrice: '15.0', tag: '热卖' },
  { emoji: '🧀', name: '马苏里拉奶酪 200g', price: '28.0', oldPrice: '38.0', tag: '精选' }
];

/* ===== DOM Ready ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderCarousel();
  renderCategories();
  renderProducts();
  initMobileMenu();
  initCarousel();
  initSubscribe();
});

/* ===== Render Carousel ===== */
function renderCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.getElementById('carouselDots');
  if (!track || !dots) return;

  carouselItems.forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `
      <div style="text-align:center;color:#fff">
        <div style="font-size:5rem;margin-bottom:16px">${item.emoji}</div>
        <div style="font-size:2rem;font-weight:700;margin-bottom:8px">${item.text}</div>
        <div style="font-size:1rem;opacity:.8">${item.sub}</div>
      </div>`;
    track.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.dataset.index = i;
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  });
}

/* ===== Render Categories ===== */
function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `<span class="category-icon">${cat.icon}</span><span class="category-name">${cat.name}</span>`;
    grid.appendChild(card);
  });
}

/* ===== Render Products ===== */
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  products.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img">${prod.emoji}</div>
      <div class="product-info">
        <div class="product-name">${prod.name}</div>
        <div class="product-bottom">
          <span class="product-price">¥${prod.price}<span>¥${prod.oldPrice}</span></span>
          <span class="product-tag">${prod.tag}</span>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (!hamburger || !nav) return;
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
}

/* ===== Carousel Logic ===== */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (!track || !dots) return;

  let current = 0;
  const total = carouselItems.length;
  let autoTimer;
  let touchStartX = 0;
  let touchEndX = 0;

  function goToSlide(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  function startAuto() {
    autoTimer = setInterval(nextSlide, 3500);
  }
  function stopAuto() { clearInterval(autoTimer); }

  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); nextSlide(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prevSlide(); startAuto(); });

  // Touch swipe
  track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
    startAuto();
  }, { passive: true });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { stopAuto(); nextSlide(); startAuto(); }
    if (e.key === 'ArrowLeft') { stopAuto(); prevSlide(); startAuto(); }
  });

  startAuto();
}

/* ===== Subscribe Form ===== */
function initSubscribe() {
  const form = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('subscribeEmail');
  const errorEl = document.getElementById('subscribeError');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  if (!form || !emailInput) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = emailInput.value.trim();

    if (!val) {
      errorEl.textContent = '请输入邮箱地址';
      emailInput.focus();
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      errorEl.textContent = '请输入有效的邮箱格式';
      emailInput.focus();
      return;
    }

    errorEl.textContent = '';
    // Show toast
    showToast('订阅成功！感谢您的关注 🎉');
    emailInput.value = '';
  });

  // Clear error on input
  emailInput.addEventListener('input', () => { errorEl.textContent = ''; });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}