/* ============================================================
   Prakruthi Restaurant — app.js
   Full featured: Colorful Card Grid (Picture 2),
   Dish Detail Modal (Picture 3), Left Category Sidebar,
   Prominent Right Side Cart & Floating Cart Pill,
   Specials, Multilang, Coupons, Reviews, WhatsApp, Razorpay
   ============================================================ */

'use strict';

// ==================== MULTILINGUAL DICTIONARY ====================
const T = {
  en: {
    menu: "✦ OUR CURATED MENU ✦",
    sub: "FINE DINING & AUTHENTIC TASTES · VISAKHAPATNAM",
    quote: "Food crafted with soul, served in timeless elegance.",
    viewmenu: "View Menu",
    book_table: "Reserve a Table",
    book_btn: "Book Table",
    trk: "Track",
    ourmenu: "✦ OUR MENU ✦",
    your_cart: "Your Order",
    cart_empty: "Your cart is empty",
    total: "Total",
    place_order: "🛍️ Place Order Now",
    name_ph: "Your name *",
    phone_ph: "Phone number *",
    cat_all: "All Items",
    bestseller: "Chef Special",
    ing: "Key Ingredients",
    add: "Add to Order",
    none: "No delicacies found."
  },
  te: {
    menu: "✦ మా ప్రత్యేక వంటకాలు ✦",
    sub: "ఫైన్ డైనింగ్ & అసలు రుచులు · విశాఖపట్నం",
    quote: "ఆత్మతో తయారు చేసిన ఆహారం, నిరంతర గాంభీర్యంతో వడ్డించబడింది.",
    viewmenu: "మెనూ చూడండి",
    book_table: "టేబుల్ రిజర్వ్ చేయండి",
    book_btn: "టేబుల్ బుక్",
    trk: "ట్రాక్",
    ourmenu: "✦ మా మెనూ ✦",
    your_cart: "మీ ఆర్డర్",
    cart_empty: "మీ కార్ట్ ఖాళీగా ఉంది",
    total: "మొత్తం",
    place_order: "🛍️ ఇప్పుడే ఆర్డర్ చేయండి",
    name_ph: "మీ పేరు *",
    phone_ph: "ఫోన్ నంబర్ *",
    cat_all: "అన్నీ",
    bestseller: "చెఫ్ స్పెషల్",
    ing: "కావలసిన పదార్థాలు",
    add: "ఆర్డర్‌కు జోడించండి",
    none: "వంటకాలు ఏవీ కనుగొనబడలేదు."
  },
  hi: {
    menu: "✦ हमारा विशेष मेन्यू ✦",
    sub: "फाइन डाइनिंग और असली स्वाद · विशाखापट्टनम",
    quote: "आत्मा से बना खाना, कालातीत शान से परोसा गया।",
    viewmenu: "मेनू देखें",
    book_table: "टेबल बुक करें",
    book_btn: "टेबल बुक",
    trk: "ट्रैक",
    ourmenu: "✦ हमारा मेनू ✦",
    your_cart: "आपका ऑर्डर",
    cart_empty: "आपकी कार्ट खाली है",
    total: "कुल",
    place_order: "🛍️ अभी ऑर्डर करें",
    name_ph: "आपका नाम *",
    phone_ph: "फोन नंबर *",
    cat_all: "सभी",
    bestseller: "शेफ स्पेशल",
    ing: "प्रमुख सामग्री",
    add: "ऑर्डर में जोड़ें",
    none: "कोई व्यंजन नहीं मिला।"
  }
};

// ==================== VIBRANT, VERIFIED FOOD CDN PHOTO MAP ====================
// Real, colorful, high-resolution food photography for every dish
const PHOTO_MAP = {
  // Indian Veg
  paneer:         'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
  dal:            'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
  vegbiryani:     'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
  palakpaneer:    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
  chole:          'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
  aloogobi:       'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
  pulao:          'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80',
  brinjal:        'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
  samosa:         'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
  paneertikka:    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=600&auto=format&fit=crop&q=80',
  thali:          'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&auto=format&fit=crop&q=80',
  gulabjamun:     'https://images.unsplash.com/photo-1605197143974-958568c27038?w=600&auto=format&fit=crop&q=80',

  // Indian Non-Veg
  chickenbiryani: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80',
  muttonbiryani:  'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80',
  butterchicken:  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80',
  chickentikka:   'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80',
  chickencurry:   'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
  mutton:         'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
  fishfry:        'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
  prawns:         'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop&q=80',
  eggcurry:       'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
  tandoori:       'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&auto=format&fit=crop&q=80',
  chicken65:      'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
  fishcurry:      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',

  // Chinese Veg
  noodles:        'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
  friedrice:      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80',
  manchurian:     'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80',
  paneerchilli:   'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=600&auto=format&fit=crop&q=80',
  manchowsoup:    'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
  springroll:     'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
  momos:          'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=600&auto=format&fit=crop&q=80',
  mushroom:       'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
  schezwanrice:   'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
  cornsoup:       'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',

  // Chinese Non-Veg
  chickennoodles: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
  chickenfriedrice:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
  chillichicken:  'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
  chickenmanchurian:'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80',
  schezwannoodles:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
  chickenmomos:   'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
  chickensoup:    'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
  lollipop:       'https://images.unsplash.com/photo-1527477378408-1bc82759e0b5?w=600&auto=format&fit=crop&q=80',
  garlicprawns:   'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop&q=80',
  eggfriedrice:   'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80',
  dragonchicken:  'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
  fishgarlic:     'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
  chickenroll:    'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',

  // Tiffins
  masaladosa:     'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
  idli:           'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  meduvada:       'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
  upma:           'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80',
  poha:           'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
  pongal:         'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
  ravadosa:       'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
  pesarattu:      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
  uttapam:        'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
  puribhaji:      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',

  // Starters
  harabharakabab: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
  vegcheeseballs: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&auto=format&fit=crop&q=80',
  seekhkebab:     'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80',
  fishfingers:    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',

  // High quality defaults
  default_veg:    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
  default_nonveg: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80'
};

function getDishImageUrl(d) {
  return PHOTO_MAP[d.img] || (d.veg ? PHOTO_MAP.default_veg : PHOTO_MAP.default_nonveg);
}

function handleImgError(imgEl, d) {
  const fallback = d.veg ? PHOTO_MAP.default_veg : PHOTO_MAP.default_nonveg;
  imgEl.onerror = null;
  imgEl.src = fallback;
}

// ==================== STATE ====================
let allDishes = [];
let cart = {};         // { dishId: { dish, qty } }
let currentLang = 'en';
let currentCat = 'All';
let vegOnly = false;
let searchTerm = '';
let couponData = null;
let selectedRating = 5;
let orderType = 'dinein';
let payMode = 'cash';
let specials = { today: [], weekly: [] };
let tableNum = document.body.dataset.table || '';

const DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  setLang('en');
  loadDishes();
  loadSpecials();
  loadReviewsStrip();
  initStarPicker();
  updateCartUI();
  if (tableNum) setOrderType(document.querySelector('[data-ot="dinein"]'));
  const resDateInput = document.getElementById('resDate');
  if (resDateInput) resDateInput.min = new Date().toISOString().split('T')[0];
});

// ==================== LANGUAGE ====================
function setLang(l) {
  currentLang = l;
  document.querySelectorAll('.lang button').forEach(b => {
    b.classList.toggle('on', b.dataset.l === l);
  });
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.dataset.t;
    if (T[l] && T[l][key]) el.textContent = T[l][key];
  });
  renderMenu();
}

document.querySelectorAll('.lang button').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.l));
});

function getDishName(d) {
  return d['name_' + currentLang] || d.name_en;
}

// ==================== LOAD DISHES ====================
async function loadDishes() {
  const loading = document.getElementById('menuLoading');
  const menuContainer = document.getElementById('menu');
  if (loading) loading.style.display = 'block';
  if (menuContainer) menuContainer.style.display = 'none';

  try {
    const res = await fetch('/api/dishes');
    allDishes = await res.json();
    if (loading) loading.style.display = 'none';
    if (menuContainer) menuContainer.style.display = 'block';
    renderMenu();
  } catch(e) {
    if (loading) loading.innerHTML = '<p style="color:var(--red)">Failed to load delicacies. Please refresh.</p>';
  }
}

async function loadSpecials() {
  try {
    const res = await fetch('/api/specials');
    specials = await res.json();
    renderTodaySpecialBanner();
  } catch(e) {}
}

async function loadReviewsStrip() {
  try {
    const res = await fetch('/api/reviews');
    const reviews = await res.json();
    const strip = document.getElementById('reviewsStrip');
    if (!strip || !reviews.length) return;
    const stars = r => '★'.repeat(r) + '☆'.repeat(5 - r);
    strip.innerHTML = `<div style="display:flex;gap:20px;overflow-x:auto;padding:4px 0;scrollbar-width:none">` +
      reviews.slice(0, 8).map(r => `
        <div style="flex-shrink:0;background:rgba(20,18,15,.75);border:1px solid var(--border);border-radius:10px;padding:12px 16px;min-width:220px;max-width:280px">
          <div style="color:var(--gold);font-size:13px;font-weight:600">${escapeHtml(r.name)}</div>
          <div style="color:var(--gold);font-size:13px">${stars(r.rating)}</div>
          <div style="color:var(--txt);font-size:12px;margin-top:4px;opacity:.85;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${escapeHtml(r.comment)}</div>
        </div>
      `).join('') + `</div>`;
  } catch(e) {}
}

// ==================== TODAY'S SPECIAL BANNER ====================
function renderTodaySpecialBanner() {
  const banner = document.getElementById('todaySpecialBanner');
  const container = document.getElementById('todaySpecialItems');
  if (!banner || !container) return;
  if (!specials.today || specials.today.length === 0) {
    banner.style.display = 'none';
    return;
  }
  banner.style.display = 'block';
  container.innerHTML = specials.today.map(s => `
    <div class="card" style="min-width:240px;max-width:280px;" onclick="openDishDetail(${s.dish_id})">
      <div class="bestseller-ribbon">👑 ${escapeHtml(s.label || "Chef's Pick")}</div>
      <div class="th">
        <img loading="lazy" src="${getDishImageUrl(s)}" alt="${escapeHtml(s.name_en)}" onerror="handleImgError(this, ${JSON.stringify(s).replace(/"/g, '&quot;')})">
      </div>
      <div class="in">
        <div>
          <h3>
            <i class="dot ${s.veg ? 'v' : 'n'}"></i>
            <span>${escapeHtml(s.name_en)}</span>
          </h3>
          <p>${escapeHtml(s.cuisine)} Special</p>
        </div>
        <div class="in-bottom">
          <b>₹${s.price}</b>
          <button class="add" title="Add to Order" onclick="event.stopPropagation(); addToCart(${s.dish_id})">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== CATEGORY FILTERING ====================
function selectCategory(cat, el) {
  currentCat = cat;
  searchTerm = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');

  // Show banner only on "All" or "Today"
  const banner = document.getElementById('todaySpecialBanner');
  if (banner) {
    banner.style.display = (cat === 'All' || cat === 'Today') && (specials.today && specials.today.length) ? 'block' : 'none';
  }

  renderMenu();
}

function filterBySearch(val) {
  searchTerm = val.toLowerCase().trim();
  renderMenu();
}

function applyFilters() {
  vegOnly = document.getElementById('vegOnly').checked;
  renderMenu();
}

// ==================== RENDER MENU (PICTURE 2 GRID) ====================
function renderMenu() {
  const menuContainer = document.getElementById('menu');
  const emptyState = document.getElementById('emptyState');
  if (!menuContainer) return;

  let dishes = [...allDishes];

  // Veg filter
  if (vegOnly) dishes = dishes.filter(d => d.veg === 1);

  // Search filter
  if (searchTerm) {
    dishes = dishes.filter(d =>
      d.name_en.toLowerCase().includes(searchTerm) ||
      (d.name_te || '').toLowerCase().includes(searchTerm) ||
      (d.name_hi || '').toLowerCase().includes(searchTerm) ||
      (d.ingredients || '').toLowerCase().includes(searchTerm)
    );
  }

  // Category filter
  let catTitle = 'All Delicacies';
  let filteredDishes = dishes;

  if (currentCat === 'Today') {
    const ids = (specials.today || []).map(s => s.dish_id);
    filteredDishes = dishes.filter(d => ids.includes(d.id));
    catTitle = "⭐ Today's Special";
  } else if (currentCat === 'Weekly') {
    const ids = (specials.weekly || []).map(s => s.dish_id);
    filteredDishes = dishes.filter(d => ids.includes(d.id));
    catTitle = "📅 Weekly Specials";
  } else if (currentCat === 'Tiffins') {
    filteredDishes = dishes.filter(d => d.cuisine === 'Tiffins');
    catTitle = "🫓 Tiffins & Breakfast";
  } else if (currentCat === 'Starters') {
    filteredDishes = dishes.filter(d => d.cuisine === 'Starters');
    catTitle = "🥗 Starters & Appetizers";
  } else if (currentCat === 'Indian') {
    filteredDishes = dishes.filter(d => d.cuisine === 'Indian');
    catTitle = "🍛 Indian Specialities";
  } else if (currentCat === 'Chinese') {
    filteredDishes = dishes.filter(d => d.cuisine === 'Chinese');
    catTitle = "🥢 Chinese Specialities";
  }

  // Update counter & title
  const catTitleEl = document.getElementById('catTitleText');
  const countBadge = document.getElementById('dishCount');
  if (catTitleEl) catTitleEl.textContent = catTitle;
  if (countBadge) countBadge.textContent = filteredDishes.length ? `${filteredDishes.length} items` : '';

  if (!filteredDishes.length) {
    menuContainer.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  if (emptyState) emptyState.style.display = 'none';

  // Build grid HTML
  if (currentCat === 'All') {
    // Group into sections: Tiffins, Starters, Indian, Chinese
    const sections = [
      { key: 'Tiffins', title: '✦ TIFFINS & BREAKFAST ✦' },
      { key: 'Starters', title: '✦ STARTERS & APPETIZERS ✦' },
      { key: 'Indian', title: '✦ INDIAN SPECIALITIES ✦' },
      { key: 'Chinese', title: '✦ CHINESE SPECIALITIES ✦' }
    ];

    let html = '';
    sections.forEach(sec => {
      const group = dishes.filter(d => d.cuisine === sec.key);
      if (group.length) {
        html += `
          <h3 class="sec">${sec.title}</h3>
          <div class="grid">
            ${group.map(dishCardHTML).join('')}
          </div>
        `;
      }
    });
    menuContainer.innerHTML = html;
  } else {
    menuContainer.innerHTML = `
      <div class="grid">
        ${filteredDishes.map(dishCardHTML).join('')}
      </div>
    `;
  }
}

// ==================== DISH CARD HTML (PICTURE 2) ====================
function dishCardHTML(d) {
  const isBestseller = d.bestseller ? `<div class="bestseller-ribbon">🌟 ${T[currentLang]?.bestseller || 'Chef Special'}</div>` : '';
  const firstIngredients = (d.ingredients || '').split(',').slice(0, 3).join(', ');
  const imgUrl = getDishImageUrl(d);

  return `
    <div class="card" onclick="openDishDetail(${d.id})" data-id="${d.id}">
      ${isBestseller}
      <div class="th">
        <img loading="lazy" src="${imgUrl}" alt="${escapeHtml(d.name_en)}" onerror="handleImgError(this, ${JSON.stringify(d).replace(/"/g, '&quot;')})">
      </div>
      <div class="in">
        <div>
          <h3>
            <i class="dot ${d.veg ? 'v' : 'n'}" title="${d.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></i>
            <span>${escapeHtml(getDishName(d))}</span>
          </h3>
          <p>${escapeHtml(firstIngredients)}...</p>
        </div>
        <div class="in-bottom">
          <b>₹${d.price}</b>
          <button class="add" title="Add to Order" onclick="event.stopPropagation(); addToCart(${d.id})">+</button>
        </div>
      </div>
    </div>
  `;
}

// ==================== DISH DETAIL MODAL (PICTURE 3) ====================
function openDishDetail(id) {
  const d = allDishes.find(x => x.id === id);
  if (!d) return;

  const modalBox = document.getElementById('dishModalBox');
  const modalOverlay = document.getElementById('dishModal');
  if (!modalBox || !modalOverlay) return;

  const ingredientsList = (d.ingredients || '').split(',').map((item, i) => `
    <span class="chip" style="animation-delay: ${i * 0.05}s">${escapeHtml(item.trim())}</span>
  `).join('');

  modalBox.innerHTML = `
    <div class="dish-modal-img-wrap">
      <img src="${getDishImageUrl(d)}" alt="${escapeHtml(d.name_en)}" onerror="handleImgError(this, ${JSON.stringify(d).replace(/"/g, '&quot;')})">
      <button class="dish-modal-close" onclick="closeDishModal()" title="Close">✕</button>
    </div>
    <div class="dish-modal-pad">
      <div class="dish-modal-header-row">
        <h2 class="dish-modal-title">
          <i class="dot ${d.veg ? 'v' : 'n'}"></i>
          <span>${escapeHtml(getDishName(d))}</span>
        </h2>
        <span class="dish-modal-price">₹${d.price}</span>
      </div>
      <div class="dish-modal-sub">
        ${escapeHtml(d.cuisine)} Cuisine · ${d.veg ? '🟢 Pure Vegetarian' : '🔴 Non-Vegetarian'}
      </div>

      <div class="dish-modal-label">Key Ingredients:</div>
      <div class="dish-modal-chips">
        ${ingredientsList || '<span class="chip">House Special Recipe</span>'}
      </div>

      <button class="dish-modal-btn" onclick="addToCart(${d.id}); closeDishModal();">
        🍽️ Add to Order (₹${d.price})
      </button>
    </div>
  `;

  modalOverlay.classList.add('on');
}

function closeDishModal() {
  const modalOverlay = document.getElementById('dishModal');
  if (modalOverlay) modalOverlay.classList.remove('on');
}

// ==================== CART MANAGEMENT ====================
function addToCart(dishId) {
  const dish = allDishes.find(d => d.id === dishId);
  if (!dish) return;
  if (!cart[dishId]) cart[dishId] = { dish, qty: 0 };
  cart[dishId].qty++;
  updateCartUI();
  showToast(`✅ ${dish.name_en} added to cart!`);
}

function changeQty(dishId, delta) {
  if (!cart[dishId]) return;
  cart[dishId].qty += delta;
  if (cart[dishId].qty <= 0) delete cart[dishId];
  updateCartUI();
}

function updateCartUI() {
  const items = Object.values(cart);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.dish.price, 0);
  const finalTotal = couponData && couponData.discount ? Math.max(0, subtotal - couponData.discount) : subtotal;

  // Header badges
  const ccBadge = document.getElementById('cc');
  const headerTotal = document.getElementById('cartHeaderTotal');
  if (ccBadge) ccBadge.textContent = totalQty;
  if (headerTotal) headerTotal.textContent = `₹${finalTotal}`;

  // Floating Cart Pill on right side
  const floatingPill = document.getElementById('floatingCart');
  const floatingCount = document.getElementById('floatingCartCount');
  const floatingTotal = document.getElementById('floatingCartTotal');
  if (floatingPill) {
    if (totalQty > 0) {
      floatingPill.style.display = 'flex';
      if (floatingCount) floatingCount.textContent = totalQty;
      if (floatingTotal) floatingTotal.textContent = `₹${finalTotal}`;
    } else {
      floatingPill.style.display = 'none';
    }
  }

  // Inside Cart Drawer
  const cartItemsEl = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const emptyCart = document.getElementById('emptyCart');

  if (!items.length) {
    if (cartItemsEl) cartItemsEl.innerHTML = '';
    if (cartFooter) cartFooter.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'flex';
    couponData = null;
    return;
  }
  if (emptyCart) emptyCart.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'flex';

  if (cartItemsEl) {
    cartItemsEl.innerHTML = items.map(({ dish, qty }) => `
      <div class="cart-item">
        <div class="cart-item-name">
          <b>${escapeHtml(dish.name_en)}</b>
          <div style="font-size:12px;color:var(--mut);">₹${dish.price} each</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="qty-ctrl">
            <button onclick="changeQty(${dish.id},-1)">−</button>
            <span>${qty}</span>
            <button onclick="changeQty(${dish.id},+1)">+</button>
          </div>
          <span class="cart-item-price" style="font-weight:700;color:var(--gold);min-width:55px;text-align:right;">₹${qty * dish.price}</span>
        </div>
      </div>
    `).join('');
  }

  // Totals display
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('discountRow');
  const discountEl = document.getElementById('cartDiscount');
  const totalEl = document.getElementById('cartTotal');

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (couponData && couponData.discount) {
    if (discountRow) discountRow.style.display = 'flex';
    if (discountEl) discountEl.textContent = `-₹${couponData.discount}`;
    if (totalEl) totalEl.textContent = `₹${finalTotal}`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
    if (totalEl) totalEl.textContent = `₹${subtotal}`;
    couponData = null;
  }
}

function toggleCart(open) {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar) sidebar.classList.toggle('open', open);
  if (overlay) overlay.classList.toggle('open', open);
}

// ==================== COUPON ====================
async function applyCoupon() {
  const code = document.getElementById('couponInput').value.trim();
  if (!code) { showCouponMsg('Please enter a coupon code', false); return; }

  const items = Object.values(cart);
  const subtotal = items.reduce((s, i) => s + i.qty * i.dish.price, 0);

  try {
    const res = await fetch('/api/coupons/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal })
    });
    const data = await res.json();
    if (data.error) {
      couponData = null;
      showCouponMsg(data.error, false);
    } else {
      couponData = data;
      showCouponMsg(`✅ ${data.message}`, true);
      updateCartUI();
    }
  } catch(e) {
    showCouponMsg('Could not apply promo code. Try again.', false);
  }
}

function showCouponMsg(msg, ok) {
  const el = document.getElementById('couponMsg');
  if (!el) return;
  el.textContent = msg;
  el.className = `coupon-msg ${ok ? 'ok' : 'err'}`;
}

// ==================== ORDER TYPE & PAYMENT ====================
function setOrderType(btn) {
  if (!btn) return;
  document.querySelectorAll('.ot-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  orderType = btn.dataset.ot;
  const addrRow = document.getElementById('addrRow');
  if (addrRow) addrRow.style.display = orderType === 'delivery' ? 'block' : 'none';
}

function setPayment(btn) {
  if (!btn) return;
  document.querySelectorAll('.pay-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  payMode = btn.dataset.pay;
}

// ==================== PLACE ORDER ====================
async function placeOrder() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = (document.getElementById('addrInput') || {}).value || '';

  if (!name || !phone) { showToast('⚠️ Please enter your name and phone number'); return; }
  if (!Object.keys(cart).length) { showToast('⚠️ Cart is empty'); return; }

  const items = Object.values(cart).map(({ dish, qty }) => ({ id: dish.id, qty }));
  const subtotal = Object.values(cart).reduce((s, i) => s + i.qty * i.dish.price, 0);

  // Razorpay Demo Checkout
  if (payMode === 'razorpay') {
    const rzpKey = document.body.dataset.rzp;
    const finalAmount = couponData && couponData.discount ? Math.max(0, subtotal - couponData.discount) : subtotal;
    const opts = {
      key: rzpKey,
      amount: finalAmount * 100,
      currency: 'INR',
      name: 'Prakruthi Restaurant',
      description: 'Order Payment',
      handler: async () => {
        await submitOrder(name, phone, address, items, 'razorpay', couponData?.code || '');
      },
      prefill: { name, contact: phone },
      theme: { color: '#d4b077' }
    };
    new window.Razorpay(opts).open();
    return;
  }

  await submitOrder(name, phone, address, items, payMode, couponData?.code || '');
}

async function submitOrder(name, phone, address, items, payment, couponCode) {
  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, address, items, payment, coupon_code: couponCode, order_type: orderType })
    });
    const data = await res.json();
    if (data.error) { showToast(`❌ ${data.error}`); return; }

    cart = {};
    couponData = null;
    updateCartUI();
    toggleCart(false);
    showToast(`✅ Order #${data.order_id} placed! Total: ₹${data.total}`);
  } catch(e) {
    showToast('❌ Failed to place order. Please try again.');
  }
}

// ==================== WHATSAPP ORDER ====================
function sendWhatsApp() {
  const name = document.getElementById('custName').value.trim() || 'Customer';
  const phone = document.getElementById('custPhone').value.trim();
  const mgr = document.body.dataset.mgr;
  const items = Object.values(cart);
  if (!items.length) { showToast('⚠️ Cart is empty'); return; }

  const lines = items.map(({ dish, qty }) => `• ${dish.name_en} x${qty} = ₹${qty * dish.price}`).join('\n');
  const subtotal = items.reduce((s, i) => s + i.qty * i.dish.price, 0);
  const discount = couponData?.discount || 0;
  const tableInfo = tableNum ? `\n🪑 Table: ${tableNum}` : '';
  const msg = `🍽️ *Prakruthi Restaurant Order*\n\n👤 *Name:* ${name}${phone ? `\n📞 *Phone:* ${phone}` : ''}${tableInfo}\n\n*Items:*\n${lines}\n\n💰 Subtotal: ₹${subtotal}${discount ? `\n🎁 Discount: -₹${discount}` : ''}\n✅ *Total: ₹${Math.max(0, subtotal - discount)}*`;

  window.open(`https://wa.me/${mgr}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ==================== TRACK ORDER ====================
function openTrack() {
  openModal('trackModal');
  const res = document.getElementById('trackResult');
  if (res) res.innerHTML = '';
}

async function doTrack() {
  const id = document.getElementById('trackId').value.trim();
  const phone = document.getElementById('trackPhone').value.trim();
  const el = document.getElementById('trackResult');
  if (!id || !phone) { el.className = 'track-result err'; el.textContent = 'Please enter order ID and phone.'; return; }

  try {
    const res = await fetch(`/api/track?id=${id}&phone=${encodeURIComponent(phone)}`);
    const data = await res.json();
    if (data.error) { el.className = 'track-result err'; el.textContent = data.error; return; }

    const statusColors = { New: '#f39c12', Preparing: '#3498db', Delivered: '#2ecc71', Cancelled: '#e74c3c' };
    const c = statusColors[data.status] || '#d4b077';
    el.className = 'track-result ok';
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <strong style="color:var(--gold)">Order #${data.id}</strong>
        <span style="background:${c}22;color:${c};padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600">${data.status}</span>
      </div>
      <div style="font-size:13px;color:var(--txt)">
        ${data.items.map(i => `<div>• ${i.name_en} x${i.qty} — ₹${i.price * i.qty}</div>`).join('')}
      </div>
      <div style="margin-top:8px;font-size:14px;font-weight:600;color:var(--gold)">Total: ₹${data.total}</div>
      <div style="font-size:12px;color:var(--mut);margin-top:4px">${new Date(data.created).toLocaleString()}</div>
    `;
  } catch(e) {
    el.className = 'track-result err'; el.textContent = 'Server error. Please try again.';
  }
}

// ==================== RESERVATIONS ====================
function openReservationModal() { openModal('reservationModal'); }

async function submitReservation() {
  const data = {
    name: document.getElementById('resName').value.trim(),
    phone: document.getElementById('resPhone').value.trim(),
    guests: document.getElementById('resGuests').value,
    date: document.getElementById('resDate').value,
    time: document.getElementById('resTime').value,
    notes: document.getElementById('resNotes').value.trim()
  };
  const el = document.getElementById('resResult');
  if (!data.name || !data.phone || !data.date || !data.time) {
    el.className = 'track-result err'; el.textContent = 'Please fill in all required fields.'; return;
  }
  try {
    const res = await fetch('/api/reserve', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    const resp = await res.json();
    if (resp.error) { el.className = 'track-result err'; el.textContent = resp.error; }
    else { el.className = 'track-result ok'; el.textContent = `✅ ${resp.message} (Reservation #${resp.reservation_id})`; }
  } catch(e) { el.className = 'track-result err'; el.textContent = 'Error reserving table. Try again.'; }
}

// ==================== REVIEWS ====================
function initStarPicker() {
  const picker = document.getElementById('starPicker');
  if (!picker) return;
  picker.querySelectorAll('span').forEach(s => {
    s.addEventListener('mouseover', () => highlightStars(+s.dataset.s));
    s.addEventListener('click', () => { selectedRating = +s.dataset.s; highlightStars(selectedRating); });
    s.addEventListener('mouseleave', () => highlightStars(selectedRating));
  });
}

function highlightStars(n) {
  document.querySelectorAll('#starPicker span').forEach(s => {
    s.classList.toggle('active', +s.dataset.s <= n);
  });
}

function openReviewModal() {
  openModal('reviewModal');
  loadReviewsList();
}

async function loadReviewsList() {
  try {
    const res = await fetch('/api/reviews');
    const reviews = await res.json();
    const stars = r => '★'.repeat(r) + '☆'.repeat(5 - r);
    const listEl = document.getElementById('reviewsList');
    if (!listEl) return;
    listEl.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="review-card-name">${escapeHtml(r.name)}</span>
          <span class="review-card-stars">${stars(r.rating)}</span>
        </div>
        <div class="review-card-dish">🍽️ ${escapeHtml(r.dish_name)}</div>
        <div class="review-card-comment">${escapeHtml(r.comment)}</div>
      </div>
    `).join('') || '<p style="color:var(--mut);text-align:center">No reviews yet. Be the first!</p>';
  } catch(e) {}
}

async function submitReview() {
  const name = document.getElementById('revName').value.trim();
  const dish_name = document.getElementById('revDish').value.trim() || 'General Experience';
  const comment = document.getElementById('revComment').value.trim();
  const el = document.getElementById('reviewSubmitMsg');
  if (!name || !comment) { el.className = 'track-result err'; el.textContent = 'Please enter your name and review.'; return; }

  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, dish_name, rating: selectedRating, comment })
    });
    const data = await res.json();
    if (data.error) { el.className = 'track-result err'; el.textContent = data.error; }
    else {
      el.className = 'track-result ok'; el.textContent = '✅ ' + data.message;
      document.getElementById('revName').value = '';
      document.getElementById('revDish').value = '';
      document.getElementById('revComment').value = '';
      loadReviewsList();
      loadReviewsStrip();
    }
  } catch(e) { el.className = 'track-result err'; el.textContent = 'Error. Please try again.'; }
}

// ==================== MODAL HELPERS ====================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'flex';
    el.classList.add('open');
  }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'none';
    el.classList.remove('open');
  }
}

// ==================== TOAST ====================
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
