/* ===== Product Data ===== */
const products = [
  { img: 'images/images/fresh_goods_1.jpg', name: '新鲜红富士苹果 5斤装 脆甜多汁', price: '29.9', oldPrice: '45.0', tag: '爆款' },
  { img: 'images/images/fresh_goods_2.jpg', name: '阳光玫瑰葡萄 2斤 香甜浓郁', price: '49.8', oldPrice: '68.0', tag: '新品' },
  { img: 'images/images/fresh_goods_3.jpg', name: '农家土鸡蛋 30枚装 营养健康', price: '25.8', oldPrice: '35.0', tag: '热卖' },
  { img: 'images/images/fresh_goods_4.jpg', name: '新鲜五花肉 500g 肉质细嫩', price: '32.0', oldPrice: '40.0', tag: '特惠' },
  { img: 'images/images/fresh_goods_5.jpg', name: '云南高原番茄 1kg 自然成熟', price: '18.8', oldPrice: '26.0', tag: '精选' },
  { img: 'images/images/new_goods_1.jpg', name: '鲜活鲈鱼 约500g 肉质鲜美', price: '38.0', oldPrice: '52.0', tag: '新品' },
  { img: 'images/images/new_goods_2.jpg', name: '有机纯牛奶 250ml*24 奶香浓郁', price: '49.9', oldPrice: '65.0', tag: '爆款' },
  { img: 'images/images/new_goods_3.jpg', name: '正宗烟薯 5斤 软糯香甜', price: '22.8', oldPrice: '32.0', tag: '特惠' },
  { img: 'images/images/goods1.png', name: '新鲜柠檬 4个装 维C丰富', price: '9.9', oldPrice: '15.0', tag: '热卖' },
  { img: 'images/images/goods2.png', name: '马苏里拉奶酪 200g 拉丝奶香', price: '28.0', oldPrice: '38.0', tag: '精选' }
];

/* ===== DOM Ready ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initMobileMenu();
  initCarousel();
  initSubscribe();
});

/* ===== Render Products ===== */
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  products.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${prod.img}" alt="${prod.name}" loading="lazy">
      </div>
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

  const slides = track.querySelectorAll('.carousel-slide');
  let current = 0;
  const total = slides.length;
  let autoTimer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  });

  function goToSlide(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  function startAuto() { autoTimer = setInterval(nextSlide, 3500); }
  function stopAuto() { clearInterval(autoTimer); }

  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); nextSlide(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prevSlide(); startAuto(); });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
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
    showToast('订阅成功！感谢您的关注 🎉');
    emailInput.value = '';
  });

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