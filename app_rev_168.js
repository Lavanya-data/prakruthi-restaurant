// Multilingual Dictionary
const T = {
  en: {
    menu: 'OUR CURATED MENU',
    menu_desc: 'Fresh ingredients, traditional spices, and timeless recipes prepared with passion.',
    filter_cuisine: 'Cuisine',
    filter_diet: 'Diet',
    trk: 'Track',
    track: 'Track Your Order',
    ordno: 'Order number',
    chk: 'Check Status',
    st_New: 'Order Received',
    st_Preparing: 'Kitchen is Cooking',
    st_Delivered: 'Order Served / Delivered',
    st_Cancelled: 'This order was cancelled',
    nf: 'Order not found. Check the order number and phone.',
    sub: 'FINE DINING & AUTHENTIC TASTES · VISAKHAPATNAM',
    quote: 'Food crafted with soul, served in timeless elegance.',
    viewmenu: 'View Menu',
    book_table: 'Reserve a Table',
    book_btn: 'Book Table',
    find: 'VISIT PRAKRUTHI',
    addr: 'Prakruthi Restaurant, Beach Road, Visakhapatnam, Andhra Pradesh 530003',
    map: '📍 Open in Google Maps',
    all: 'All',
    Indian: 'Indian',
    Chinese: 'Chinese',
    veg: 'Veg',
    nonveg: 'Non-Veg',
    search: 'Search dishes or ingredients...',
    cart: 'Your Order',
    total: 'Total Amount',
    place: 'Place Order Now',
    cash: '💵 Cash / Pay at Counter',
    upi: '📱 UPI Fast Pay (QR Code)',
    demo: 'Demo payment mode: Instant verification',
    name: 'Your Full Name *',
    phone: 'Phone Number *',
    address: 'Table Number (e.g. Table 4)',
    ing: 'Key Ingredients',
    add: 'Add to Order',
    none: 'No matching delicacies found.',
    empty: 'Your cart is currently empty.',
    ok: 'Order placed successfully! Order ID:',
    err: 'Please fill name, phone, and add dishes to cart.',
    bestseller: 'Chef Special'
  },
  te: {
    menu: 'మా ప్రత్యేక వంటకాలు',
    menu_desc: 'తాజా పదార్థాలు, సంప్రదాయ సుగంధ ద్రవ్యాలు మరియు ప్రేమతో తయారుచేసిన రుచులు.',
    filter_cuisine: 'వంటకం',
    filter_diet: 'ఆహారం',
    trk: 'ట్రాక్',
    track: 'మీ ఆర్డర్‌ను ట్రాక్ చేయండి',
    ordno: 'ఆర్డర్ నంబర్',
    chk: 'స్థితి చూడండి',
    st_New: 'ఆర్డర్ అందింది',
    st_Preparing: 'తయారవుతోంది',
    st_Delivered: 'అందజేయబడింది',
    st_Cancelled: 'ఈ ఆర్డర్ రద్దు చేయబడింది',
    nf: 'ఆర్డర్ దొరకలేదు. ఆర్డర్ నంబర్, ఫోన్ సరిచూడండి.',
    sub: 'విశేషమైన విందు & అసలైన రుచులు · విశాఖపట్నం',
    quote: 'ప్రేమతో వండిన రుచి, ఆనందంతో వడ్డింపు.',
    viewmenu: 'మెనూ చూడండి',
    book_table: 'టేబుల్ బుక్ చేయండి',
    book_btn: 'టేబుల్ బుకింగ్',
    find: 'మమ్మల్ని కనుగొనండి',
    addr: 'ప్రకృతి రెస్టారెంట్, బీచ్ రోడ్, విశాఖపట్నం, ఆంధ్రప్రదేశ్ 530003',
    map: '📍 గూగుల్ మ్యాప్స్‌లో తెరవండి',
    all: 'అన్నీ',
    Indian: 'భారతీయ',
    Chinese: 'చైనీస్',
    veg: 'శాకాహారం',
    nonveg: 'మాంసాహారం',
    search: 'వంటకాలను లేదా పదార్థాలను వెతకండి...',
    cart: 'మీ ఆర్డర్',
    total: 'మొత్తం చెల్లింపు',
    place: 'ఇప్పుడే ఆర్డర్ చేయండి',
    cash: '💵 నగదు / కౌంటర్ వద్ద చెల్లింపు',
    upi: '📱 UPI ఆన్‌లైన్ (GPay / PhonePe / Paytm)',
    demo: 'డెమో మోడ్: తక్షణ నిర్ధారణ',
    name: 'మీ పూర్తి పేరు *',
    phone: 'ఫోన్ నంబర్ *',
    address: 'టేబుల్ నంబర్ (ఉదా: Table 4)',
    ing: 'కావలసిన ముఖ్య పదార్థాలు',
    add: 'ఆర్డర్‌కు జోడించండి',
    none: 'వంటకాలు ఏవీ కనుగొనబడలేదు.',
    empty: 'మీ ఆర్డర్ బుట్ట ఖాళీగా ఉంది.',
    ok: 'ఆర్డర్ విజయవంతంగా నమోదైంది! ఆర్డర్ సంఖ్య:',
    err: 'దయచేసి పేరు, ఫోన్ నంబర్ మరియు వంటకాలను ఎంచుకోండి.',
    bestseller: 'చెఫ్ స్పెషల్'
  },
  hi: {
    menu: 'हमारा विशेष मेन्यू',
    menu_desc: 'ताजा सामग्री, पारंपरिक मसाले और प्यार से तैयार किए गए लाजवाब स्वाद।',
    filter_cuisine: 'व्यंजन शैली',
    filter_diet: 'खानपान',
    trk: 'ट्रैक',
    track: 'अपना ऑर्डर ट्रैक करें',
    ordno: 'ऑर्डर नंबर',
    chk: 'स्थिति देखें',
    st_New: 'ऑर्डर प्राप्त हुआ',
    st_Preparing: 'रसोई में तैयार हो रहा है',
    st_Delivered: 'डिलीवर / परोसा गया',
    st_Cancelled: 'यह ऑर्डर रद्द कर दिया गया',
    nf: 'ऑर्डर नहीं मिला। कृपया नंबर और फ़ोन जाँचें।',
    sub: 'शानदार भोजन और प्रामाणिक स्वाद · विशाखापत्तनम',
    quote: 'आत्मा से बनाया गया स्वाद, शाही अंदाज़ में पेश।',
    viewmenu: 'मेन्यू देखें',
    book_table: 'टेबल बुक करें',
    book_btn: 'टेबल बुकिंग',
    find: 'हमसे मिलें',
    addr: 'प्रकृति रेस्टोरेंट, बीच रोड, विशाखापत्तनम, आंध्र प्रदेश 530003',
    map: '📍 गूगल मैप्स में खोलें',
    all: 'सभी',
    Indian: 'भारतीय',
    Chinese: 'चाइनीज़',
    veg: 'शाकाहारी',
    nonveg: 'मांसाहारी',
    search: 'व्यंजन या सामग्री खोजें...',
    cart: 'आपका ऑर्डर',
    total: 'कुल राशि',
    place: 'अभी ऑर्डर करें',
    cash: '💵 नकद / काउंटर पर भुगतान',
    upi: '📱 UPI ऑनलाइन (GPay / PhonePe / Paytm)',
    demo: 'डेमो भुगतान: तुरंत पुष्टि',
    name: 'आपका पूरा नाम *',
    phone: 'फ़ोन नंबर *',
    address: 'टेबल नंबर (उदा. Table 4)',
    ing: 'प्रमुख सामग्री',
    add: 'ऑर्डर में जोड़ें',
    none: 'कोई व्यंजन नहीं मिला।',
    empty: 'आपकी कार्ट अभी खाली है।',
    ok: 'ऑर्डर सफलतापूर्वक दर्ज हुआ! ऑर्डर नं:',
    err: 'कृपया नाम, फ़ोन और व्यंजन चुनें।',
    bestseller: 'शेफ़ स्पेशल'
  }
};

const PHOTO_MAP = {
  paneer: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
  dal: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
  chickenbiryani: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80',
  muttonbiryani: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80',
  dosa: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
  idli: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
  butterchicken: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80',
  tandoori: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&auto=format&fit=crop&q=80',
  samosa: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
  chole: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
  noodles: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
  chickennoodles: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
  friedrice: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80',
  chickenfriedrice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
  manchurian: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80',
  chillichicken: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
  momos: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=600&auto=format&fit=crop&q=80',
  chickenmomos: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
  gulabjamun: 'https://images.unsplash.com/photo-1605197143974-958568c27038?w=600&auto=format&fit=crop&q=80',
  thali: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&auto=format&fit=crop&q=80',
  default_veg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
  default_nonveg: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80'
};

let L = localStorage.getItem('prakruthi_lang') || 'en';
let dishes = [];
let cart = JSON.parse(localStorage.getItem('prakruthi_cart') || '{}');
let filterState = { c: 'all', v: 'all', q: '' };
let currentOrderType = 'dinein';
let appliedCoupon = null; // { code, discount }

const $ = s => document.querySelector(s);
const t = k => (T[L] && T[L][k]) || T.en[k] || k;
const dishName = d => d['name_' + L] || d.name_en;

function getDishImageUrl(d) {
  return `/static/dishes/${d.img}.jpg`;
}

function handleImgError(imgEl, d) {
  const fallback = PHOTO_MAP[d.img] || (d.veg ? PHOTO_MAP.default_veg : PHOTO_MAP.default_nonveg);
  imgEl.onerror = () => {
    imgEl.onerror = null;
    imgEl.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80';
  };
  imgEl.src = fallback;
}

// INITIALIZATION
async function init() {
  // Check if opened via Table QR Code (?table=5)
  const tableFromUrl = document.body.dataset.table;
  if (tableFromUrl) {
    currentOrderType = 'dinein';
    const addrInput = $('#ad');
    if (addrInput) addrInput.value = `Table #${tableFromUrl}`;
  }

  try {
    const res = await fetch('/api/dishes');
    dishes = await res.json();
  } catch(e) {
    console.error("Failed to load dishes", e);
  }

  updateUIStrings();
  renderMenu();
  initDateInput();
  loadReviews();
}

function updateUIStrings() {
  document.documentElement.lang = L;
  document.querySelectorAll('[data-t]').forEach(e => {
    const key = e.dataset.t;
    if (T[L] && T[L][key]) e.textContent = T[L][key];
  });
  document.querySelectorAll('[data-p]').forEach(e => {
    const key = e.dataset.p;
    if (T[L] && T[L][key]) e.placeholder = T[L][key];
  });
  $('#q').placeholder = t('search');
  document.querySelectorAll('.lang button').forEach(b => {
    b.classList.toggle('on', b.dataset.l === L);
  });
  updateOrderTypePlaceholder();
  updateCartUI();
}

function dishCardHTML(d) {
  const isBestseller = d.bestseller ? `<div class="bestseller-ribbon">🌟 ${t('bestseller')}</div>` : '';
  const firstIngredients = (d.ingredients || '').split(',').slice(0, 3).join(', ');
  
  return `
    <div class="card" onclick="openDishDetail(${d.id})" data-id="${d.id}">
      ${isBestseller}
      <div class="th">
        <img loading="lazy" src="${getDishImageUrl(d)}" alt="${escapeHtml(d.name_en)}" onerror="handleImgError(this, ${JSON.stringify(d).replace(/"/g, '&quot;')})">
      </div>
      <div class="in">
        <div>
          <h3>
            <i class="dot ${d.veg ? 'v' : 'n'}" title="${d.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></i>
            <span>${escapeHtml(dishName(d))}</span>
          </h3>
          <p>${escapeHtml(firstIngredients)}...</p>
        </div>
        <div class="in-bottom">
          <b>₹${d.price}</b>
          <button class="add" title="${t('add')}" onclick="event.stopPropagation(); addToCart(${d.id})">+</button>
        </div>
      </div>
    </div>
  `;
}

function renderMenu() {
  const q = filterState.q.toLowerCase().trim();
  const list = dishes.filter(d => {
    const matchesCuisine = (filterState.c === 'all') || (d.cuisine === filterState.c);
    const matchesDiet = (filterState.v === 'all') || (String(d.veg) === filterState.v);
    const allNames = (d.name_en + ' ' + (d.name_te || '') + ' ' + (d.name_hi || '') + ' ' + (d.ingredients || '')).toLowerCase();
    const matchesSearch = !q || allNames.includes(q);
    return matchesCuisine && matchesDiet && d.available;
  });

  const countEl = $('#results_count');
  if (countEl) countEl.textContent = `Showing ${list.length} delicacies`;

  const menuContainer = $('#menu');
  if (!list.length) {
    menuContainer.innerHTML = `<div style="text-align:center;padding:50px 20px;color:var(--mut);"><p style="font-size:32px;margin-bottom:10px;">🍲</p><p>${t('none')}</p></div>`;
    return;
  }

  let html = '';
  const cuisines = filterState.c === 'all' ? ['Indian', 'Chinese'] : [filterState.c];
  
  cuisines.forEach(c => {
    const group = list.filter(d => d.cuisine === c);
    if (group.length) {
      html += `
        <h3 class="sec">✦ ${t(c).toUpperCase()} SPECIALITIES ✦</h3>
        <div class="grid">
          ${group.map(dishCardHTML).join('')}
        </div>
      `;
    }
  });

  menuContainer.innerHTML = html;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card').forEach(card => observer.observe(card));
}

// DISH DETAIL MODAL
function openDishDetail(id) {
  const d = dishes.find(x => x.id === id);
  if (!d) return;

  const ingredientsList = (d.ingredients || '').split(',').map((item, i) => `
    <span class="chip" style="animation-delay: ${i * 0.05}s">${escapeHtml(item.trim())}</span>
  `).join('');

  $('#mbox').innerHTML = `
    <div style="position:relative;">
      <img src="${getDishImageUrl(d)}" alt="${escapeHtml(d.name_en)}" onerror="handleImgError(this, ${JSON.stringify(d).replace(/"/g, '&quot;')})">
      <button class="modal-close-btn" onclick="closeD()" style="position:absolute;top:12px;right:14px;background:rgba(0,0,0,0.6);color:#fff;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;">✕</button>
    </div>
    <div class="pad">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
        <h2 style="color:var(--gold);font-family:'Cinzel',serif;font-size:22px;display:flex;align-items:center;gap:8px;">
          <i class="dot ${d.veg ? 'v' : 'n'}"></i>
          <span>${escapeHtml(dishName(d))}</span>
        </h2>
        <span style="font-size:22px;font-weight:700;color:#fff;font-family:'Cinzel',serif;">₹${d.price}</span>
      </div>
      <div style="font-size:12px;color:var(--mut);margin-bottom:14px;">
        ${escapeHtml(d.cuisine)} Cuisine · ${d.veg ? '🟢 Pure Vegetarian' : '🔴 Non-Vegetarian'}
      </div>
      
      <p style="margin:12px 0 6px;color:var(--gold);font-size:13px;font-weight:600;">${t('ing')}:</p>
      <div style="display:flex;flex-wrap:wrap;margin-bottom:20px;">
        ${ingredientsList || '<span style="color:var(--mut);font-size:12px;">Special House Ingredients</span>'}
      </div>
      
      <div style="display:flex;gap:12px;align-items:center;">
        <button class="btn gold-btn" style="flex:1;" onclick="addToCart(${d.id});closeD();">
          🛒 ${t('add')} (₹${d.price})
        </button>
      </div>
    </div>
  `;
  $('#modal').classList.add('on');
}

function closeD() {
  $('#modal').classList.remove('on');
}

// CART & COUPON
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  const badge = $('#cc');
  if (badge) {
    badge.classList.remove('bump');
    void badge.offsetWidth;
    badge.classList.add('bump');
  }
  toggleCart(true);
}

function updateCartQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
}

function saveCart() {
  localStorage.setItem('prakruthi_cart', JSON.stringify(cart));
  updateCartUI();
}

function getCartSubtotal() {
  let sub = 0;
  for (const id in cart) {
    const d = dishes.find(x => x.id == id);
    if (d) sub += d.price * cart[id];
  }
  return sub;
}

async function applyCoupon() {
  const code = ($('#coupon_input').value || '').trim();
  const subtotal = getCartSubtotal();
  const statusEl = $('#coupon_status');

  if (!code) {
    statusEl.style.color = '#ff7b72';
    statusEl.textContent = 'Please enter a coupon code';
    return;
  }

  try {
    const res = await fetch('/api/coupons/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal })
    });
    const data = await res.json();
    if (res.ok) {
      appliedCoupon = { code: data.code, discount: data.discount };
      statusEl.style.color = '#2ecc71';
      statusEl.textContent = data.message;
      updateCartUI();
    } else {
      appliedCoupon = null;
      statusEl.style.color = '#ff7b72';
      statusEl.textContent = data.error;
      updateCartUI();
    }
  } catch(e) {
    statusEl.style.color = '#ff7b72';
    statusEl.textContent = 'Coupon error';
  }
}

function updateCartUI() {
  const subtotal = getCartSubtotal();
  let count = 0;
  let itemsHtml = '';

  for (const id in cart) {
    const d = dishes.find(x => x.id == id);
    if (!d) continue;
    const qty = cart[id];
    count += qty;
    itemsHtml += `
      <div class="ci">
        <div>
          <b>${escapeHtml(dishName(d))}</b><br>
          <small style="color:var(--mut);">₹${d.price} each</small>
        </div>
        <div class="ci-actions">
          <button onclick="updateCartQty(${id}, -1)">−</button>
          <span style="min-width:20px;text-align:center;font-weight:600;">${qty}</span>
          <button onclick="updateCartQty(${id}, 1)">+</button>
          <span style="margin-left:8px;font-weight:600;min-width:55px;text-align:right;">₹${d.price * qty}</span>
        </div>
      </div>
    `;
  }

  $('#items').innerHTML = itemsHtml || `<div style="text-align:center;padding:40px 10px;color:var(--mut);"><p style="font-size:28px;">🛍️</p><p>${t('empty')}</p></div>`;
  $('#subtot_display').textContent = '₹' + subtotal.toLocaleString();
  $('#cc').textContent = count;

  let discount = 0;
  const discRow = $('#disc_row');
  if (appliedCoupon && subtotal > 0) {
    discount = appliedCoupon.discount;
    discRow.style.display = 'flex';
    $('#applied_code_tag').textContent = appliedCoupon.code;
    $('#disc_display').textContent = `-₹${discount.toLocaleString()}`;
  } else {
    discRow.style.display = 'none';
  }

  const finalTotal = Math.max(0, subtotal - discount);
  $('#tot').textContent = '₹' + finalTotal.toLocaleString();
  updateUpiQR(finalTotal);
}

function toggleCart(show) {
  $('#cart').classList.toggle('on', show);
  $('#shade').classList.toggle('on', show);
}

function updateOrderType() {
  const checked = document.querySelector('input[name="order_type"]:checked');
  if (checked) {
    currentOrderType = checked.value;
    document.querySelectorAll('.ot-chip').forEach(chip => {
      chip.classList.toggle('active', chip.querySelector('input').checked);
    });
    updateOrderTypePlaceholder();
  }
}

function updateOrderTypePlaceholder() {
  const addressInput = $('#ad');
  if (!addressInput) return;
  if (currentOrderType === 'dinein') {
    addressInput.placeholder = 'Table Number (e.g. Table 4)';
  } else if (currentOrderType === 'takeaway') {
    addressInput.placeholder = 'Pickup Notes / Car Number (Optional)';
  } else {
    addressInput.placeholder = 'Complete Delivery Address & Landmark *';
  }
}

function updateUpiQR(total) {
  const qrBox = $('#upi_qr_code');
  if (!qrBox) return;
  const upiId = 'prakruthi@upi';
  const name = 'Prakruthi Restaurant';
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR`;
  qrBox.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=0&data=${encodeURIComponent(upiUrl)}" alt="UPI QR" style="width:140px;height:140px;border-radius:4px;">`;
}

// ORDER PLACEMENT
async function place() {
  const items = Object.keys(cart).map(id => ({ id: +id, qty: cart[id] }));
  const name = ($('#nm').value || '').trim();
  const phone = ($('#ph').value || '').trim();
  const address = ($('#ad').value || '').trim();
  const payRadio = document.querySelector('[name=pay]:checked');
  const payment = payRadio ? payRadio.value : 'cash';
  const coupon_code = appliedCoupon ? appliedCoupon.code : '';

  const msgEl = $('#msg');
  if (!items.length || !name || !phone) {
    msgEl.style.color = '#ff7b72';
    msgEl.textContent = t('err');
    return;
  }

  // If Razorpay chosen
  if (payment === 'razorpay') {
    handleRazorpayPayment({ items, name, phone, address, coupon_code });
    return;
  }

  msgEl.style.color = 'var(--gold)';
  msgEl.textContent = 'Placing your order with the kitchen...';

  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, name, phone, address, payment, order_type: currentOrderType, coupon_code })
    });
    const data = await res.json();
    if (res.ok) {
      cart = {};
      appliedCoupon = null;
      saveCart();
      localStorage.setItem('prakruthi_last_order', JSON.stringify({ id: data.order_id, phone }));
      msgEl.style.color = '#2ecc71';
      msgEl.textContent = `${t('ok')} #${data.order_id} · ₹${data.total}`;
      setTimeout(() => {
        toggleCart(false);
        openTrack(data.order_id, phone);
      }, 1000);
    } else {
      msgEl.style.color = '#ff7b72';
      msgEl.textContent = data.error || 'Failed to place order';
    }
  } catch(e) {
    msgEl.style.color = '#ff7b72';
    msgEl.textContent = 'Server connection error.';
  }
}

// RAZORPAY HANDLER
function handleRazorpayPayment(orderPayload) {
  const rzpKey = document.body.dataset.rzp || 'rzp_test_prakruthiDemo2026';
  const total = parseInt($('#tot').textContent.replace(/[^\d]/g, '')) || 100;

  const options = {
    key: rzpKey,
    amount: total * 100, // In Paise
    currency: "INR",
    name: "Prakruthi Restaurant",
    description: "Dining / Order Payment",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100",
    handler: async function (response) {
      $('#msg').style.color = '#2ecc71';
      $('#msg').textContent = "Payment Verified! Creating your order...";
      
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orderPayload, payment: 'razorpay', order_type: currentOrderType })
      });
      const data = await res.json();
      if (res.ok) {
        cart = {};
        appliedCoupon = null;
        saveCart();
        toggleCart(false);
        openTrack(data.order_id, orderPayload.phone);
      }
    },
    prefill: {
      name: orderPayload.name,
      contact: orderPayload.phone
    },
    theme: {
      color: "#d4b077"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

// WHATSAPP ORDERING
function orderViaWhatsApp() {
  const items = Object.keys(cart).map(id => {
    const d = dishes.find(x => x.id == id);
    return d ? `- ${dishName(d)} x${cart[id]} (₹${d.price * cart[id]})` : '';
  }).filter(Boolean);

  const name = ($('#nm').value || 'Guest').trim();
  const phone = ($('#ph').value || '').trim();
  const address = ($('#ad').value || 'Dine-In').trim();
  const total = $('#tot').textContent;
  const mgrPhone = document.body.dataset.mgr || '919876543210';

  if (!items.length) {
    alert("Please add dishes to your cart first.");
    return;
  }

  const message = `*NEW ORDER - PRAKRUTHI RESTAURANT*
--------------------------
*Customer:* ${name}
*Phone:* ${phone}
*Type:* ${currentOrderType.toUpperCase()} (${address})
--------------------------
*Dishes:*
${items.join('\n')}
--------------------------
*Total Amount:* ${total}
${appliedCoupon ? `*Coupon Applied:* ${appliedCoupon.code}` : ''}
--------------------------
Please confirm our order. Thank you!`;

  const waUrl = `https://wa.me/${mgrPhone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// ORDER TRACKING
let trackTimer = null;
function openTrack(prefillId, prefillPhone) {
  const last = JSON.parse(localStorage.getItem('prakruthi_last_order') || '{}');
  const idVal = prefillId || last.id || '';
  const phoneVal = prefillPhone || last.phone || '';

  $('#mbox').innerHTML = `
    <div class="pad">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <h2 style="color:var(--gold);font-family:'Cinzel',serif;font-size:20px;">📦 ${t('track')}</h2>
        <button class="modal-close-btn" onclick="closeD()">✕</button>
      </div>
      <div class="form-group">
        <label>${t('ordno')}</label>
        <input id="to" type="number" placeholder="e.g. 102" value="${idVal}">
      </div>
      <div class="form-group">
        <label>${t('phone')}</label>
        <input id="tp" type="tel" placeholder="e.g. 9876543210" value="${phoneVal}">
      </div>
      <button class="btn gold-btn" style="width:100%;" onclick="checkTrack()">${t('chk')}</button>
      <div id="tres" style="margin-top:20px;"></div>
    </div>
  `;
  $('#modal').classList.add('on');
  if (idVal && phoneVal) checkTrack();

  clearInterval(trackTimer);
  trackTimer = setInterval(() => {
    if ($('#to') && $('#modal').classList.contains('on')) {
      checkTrack(true);
    } else {
      clearInterval(trackTimer);
    }
  }, 6000);
}

async function checkTrack(quiet) {
  const id = ($('#to').value || '').trim();
  const phone = ($('#tp').value || '').trim();
  const tres = $('#tres');
  if (!id || !phone || !tres) return;

  try {
    const res = await fetch(`/api/track?id=${encodeURIComponent(id)}&phone=${encodeURIComponent(phone)}`);
    if (!res.ok) {
      if (!quiet) tres.innerHTML = `<p style="text-align:center;color:#ff7b72;padding:12px;">${t('nf')}</p>`;
      return;
    }
    const o = await res.json();
    localStorage.setItem('prakruthi_last_order', JSON.stringify({ id, phone }));

    const steps = ['New', 'Preparing', 'Delivered'];
    const curIdx = steps.indexOf(o.status);

    let progressHtml = '';
    if (o.status === 'Cancelled') {
      progressHtml = `<div style="background:rgba(231,76,60,0.15);border:1px solid #e74c3c;color:#ff8e8b;padding:10px;border-radius:8px;text-align:center;margin-bottom:14px;">${t('st_Cancelled')}</div>`;
    } else {
      progressHtml = `
        <div class="steps">
          ${steps.map((s, i) => {
            const isDone = i <= curIdx;
            const isNow = i === curIdx;
            return `
              <div class="stp ${isDone ? 'done' : ''} ${isNow ? 'now' : ''}">
                <i>${i < curIdx || o.status === 'Delivered' ? '✓' : i + 1}</i>
                <span>${t('st_' + s)}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    const langKey = 'name_' + L;
    const itemsList = (o.items || []).map(i => `${i[langKey] || i.name_en} ×${i.qty}`).join(', ');

    tres.innerHTML = `
      ${progressHtml}
      <div style="background:rgba(0,0,0,0.4);border:1px solid var(--border);border-radius:8px;padding:14px;margin-top:14px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <b style="color:var(--gold);">Order #${o.id}</b>
          <span style="font-weight:700;">₹${o.total}</span>
        </div>
        <div style="font-size:12px;color:var(--mut);margin-bottom:4px;">
          Type: <b>${o.order_type.toUpperCase()}</b> · Payment: ${escapeHtml(o.payment)}
        </div>
        <div style="font-size:13px;color:var(--txt);">
          ${escapeHtml(itemsList)}
        </div>
      </div>
    `;
  } catch(e) {
    if (!quiet) tres.innerHTML = `<p style="text-align:center;color:#ff7b72;">Connection error.</p>`;
  }
}

// REVIEWS
async function loadReviews() {
  try {
    const res = await fetch('/api/reviews');
    const data = await res.json();
    const container = $('#reviews_container');
    if (!container || !Array.isArray(data)) return;
    container.innerHTML = data.map(r => `
      <div class="review-card">
        <div class="review-header">
          <span class="review-user">${escapeHtml(r.name)}</span>
          <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
        </div>
        <div class="review-dish">${escapeHtml(r.dish_name || 'Authentic Experience')}</div>
        <div class="review-body">"${escapeHtml(r.comment)}"</div>
      </div>
    `).join('');
  } catch(e) {}
}

function openReviewModal() {
  $('#rev_msg').textContent = '';
  $('#review_modal').classList.add('on');
}
function closeReviewModal() {
  $('#review_modal').classList.remove('on');
}
async function submitReview(e) {
  e.preventDefault();
  const name = ($('#rev_name').value || '').trim();
  const dish_name = ($('#rev_dish').value || '').trim();
  const rating = parseInt($('#rev_rating').value);
  const comment = ($('#rev_comment').value || '').trim();

  const msg = $('#rev_msg');
  msg.style.color = 'var(--gold)';
  msg.textContent = 'Submitting review...';

  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, dish_name, rating, comment })
    });
    const data = await res.json();
    if (res.ok) {
      msg.style.color = '#2ecc71';
      msg.textContent = '✓ ' + data.message;
      setTimeout(() => {
        closeReviewModal();
        loadReviews();
      }, 1500);
    } else {
      msg.style.color = '#ff7b72';
      msg.textContent = data.error;
    }
  } catch(err) {
    msg.style.color = '#ff7b72';
    msg.textContent = 'Error submitting review.';
  }
}

// TABLE RESERVATION
function initDateInput() {
  const dateInput = $('#r_date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
}
function openReservationModal() {
  initDateInput();
  $('#res_msg').textContent = '';
  $('#res_modal').classList.add('on');
}
function closeReservationModal() {
  $('#res_modal').classList.remove('on');
}
async function submitReservation(e) {
  e.preventDefault();
  const name = ($('#r_name').value || '').trim();
  const phone = ($('#r_phone').value || '').trim();
  const guests = parseInt($('#r_guests').value);
  const date = $('#r_date').value;
  const time = $('#r_time').value;
  const notes = ($('#r_notes').value || '').trim();

  const msg = $('#res_msg');
  msg.style.color = 'var(--gold)';
  msg.textContent = 'Reserving table...';

  try {
    const res = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, guests, date, time, notes })
    });
    const data = await res.json();
    if (res.ok) {
      msg.style.color = '#2ecc71';
      msg.textContent = `✓ Reservation #${data.reservation_id} confirmed! See you on ${date} at ${time}.`;
      setTimeout(() => closeReservationModal(), 2000);
    } else {
      msg.style.color = '#ff7b72';
      msg.textContent = data.error || 'Failed to reserve table.';
    }
  } catch(err) {
    msg.style.color = '#ff7b72';
    msg.textContent = 'Server connection error.';
  }
}

// SEARCH & FILTERS
function clearSearch() {
  $('#q').value = '';
  filterState.q = '';
  $('#q_clear').style.display = 'none';
  renderMenu();
}
$('#q').oninput = e => {
  filterState.q = e.target.value;
  $('#q_clear').style.display = filterState.q ? 'block' : 'none';
  renderMenu();
};
$('#fc').onclick = e => {
  const btn = e.target.closest('button');
  if (!btn || !btn.dataset.c) return;
  filterState.c = btn.dataset.c;
  [...$('#fc').children].forEach(b => b.classList.toggle('on', b === btn));
  renderMenu();
};
$('#fv').onclick = e => {
  const btn = e.target.closest('button');
  if (!btn || btn.dataset.v === undefined) return;
  filterState.v = btn.dataset.v;
  [...$('#fv').children].forEach(b => b.classList.toggle('on', b === btn));
  renderMenu();
};
document.querySelectorAll('.lang button').forEach(btn => {
  btn.onclick = () => {
    L = btn.dataset.l;
    localStorage.setItem('prakruthi_lang', L);
    updateUIStrings();
    renderMenu();
  };
});
document.querySelectorAll('[name=pay]').forEach(radio => {
  radio.onchange = () => {
    const isUpi = radio.value === 'upi' && radio.checked;
    $('#upibox').hidden = !isUpi;
  };
});

function escapeHtml(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

init();
