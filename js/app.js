/**
 * MECHA CORE - APP MAIN LOGIC
 * Quản lý trạng thái, bộ lọc, giỏ hàng, đặt hàng, âm thanh, modal và tương tác
 */

// Trạng thái ứng dụng (App State)
const state = {
  products: GUNDAM_PRODUCTS,
  cart: JSON.parse(localStorage.getItem("mecha_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("mecha_wishlist") || "[]"),
  appliedCoupon: null,
  filters: {
    grade: "ALL",
    series: "ALL",
    priceRange: "ALL",
    status: "ALL",
    search: "",
    sortBy: "popular"
  },
  currentProductModal: null,
  selectedPayment: "qr_bank",
  orders: JSON.parse(localStorage.getItem("mecha_orders") || "[]")
};

// Cấu hình các khoảng giá cho bộ lọc tầm giá
const PRICE_RANGE_MAP = {
  "100k-500k": [100000, 500000],
  "500k-1m":   [500000, 1000000],
  "1m-2m":     [1000000, 2000000],
  "2m-3m":     [2000000, 3000000],
  "3m-4m":     [3000000, 4000000],
  "4m-5m":     [4000000, 5000000],
  "5m-10m":    [5000000, 10000000]
};

// Định dạng tiền tệ VNĐ
function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  initUI();
  renderProducts();
  renderScaleComparison();
  renderAcademy();
  renderReviews();
  updateCartUI();
  updateWishlistUI();
  initSoundUI();
});

// Khởi tạo các sự kiện giao diện
function initUI() {
  // Tìm kiếm tức thì
  const searchInput = document.getElementById("searchInput");
  const autocompleteBox = document.getElementById("searchAutocomplete");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value.trim().toLowerCase();
      state.filters.search = val;
      renderProducts();
      handleAutocomplete(val, autocompleteBox);
    });

    // Đóng autocomplete khi click ra ngoài
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !autocompleteBox.contains(e.target)) {
        autocompleteBox.classList.remove("active");
      }
    });
  }

  // Bộ lọc Grade trên thanh Quick Nav
  const gradeBtns = document.querySelectorAll(".grade-btn");
  gradeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      gradeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.filters.grade = btn.dataset.grade;
      mechaSound.playClick();
      renderProducts();
    });
  });

  // Bộ lọc Series trong Sidebar
  const seriesSelect = document.getElementById("filterSeries");
  if (seriesSelect) {
    seriesSelect.addEventListener("change", (e) => {
      state.filters.series = e.target.value;
      mechaSound.playClick();
      renderProducts();
    });
  }

  // Bộ lọc Tầm giá
  const priceSelect = document.getElementById("filterPrice");
  if (priceSelect) {
    priceSelect.addEventListener("change", (e) => {
      state.filters.priceRange = e.target.value;
      mechaSound.playClick();
      renderProducts();
    });
  }

  // Sắp xếp Catalog
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.filters.sortBy = e.target.value;
      mechaSound.playClick();
      renderProducts();
    });
  }

  // Reset Filters
  const resetBtn = document.getElementById("resetFiltersBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.filters.grade = "ALL";
      state.filters.series = "ALL";
      state.filters.priceRange = "ALL";
      state.filters.status = "ALL";
      state.filters.search = "";
      
      if (searchInput) searchInput.value = "";
      const priceSelect = document.getElementById("filterPrice");
      if (priceSelect) priceSelect.value = "ALL";
      if (seriesSelect) seriesSelect.value = "ALL";

      gradeBtns.forEach(b => {
        if (b.dataset.grade === "ALL") b.classList.add("active");
        else b.classList.remove("active");
      });

      mechaSound.playClick();
      renderProducts();
      showToast("Đã thiết lập lại toàn bộ bộ lọc!", "info");
    });
  }

  // Giỏ hàng drawer toggles
  const cartBtn = document.getElementById("cartToggleBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartCloseBtn = document.getElementById("cartCloseBtn");
  const cartOverlay = document.getElementById("cartOverlay");

  if (cartBtn && cartDrawer) {
    cartBtn.addEventListener("click", () => {
      cartDrawer.classList.add("active");
      if (cartOverlay) cartOverlay.classList.add("active");
      mechaSound.playClick();
    });
  }

  const closeCart = () => {
    if (cartDrawer) cartDrawer.classList.remove("active");
    if (cartOverlay) cartOverlay.classList.remove("active");
  };

  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // Áp dụng Voucher
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  const couponInput = document.getElementById("couponInput");
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();
      applyCoupon(code);
    });
  }

  // Modal checkout
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!checkLoginRequired("tiến hành thanh toán")) {
        return;
      }
      if (state.cart.length === 0) {
        showToast("Giỏ hàng của bạn đang trống!", "error");
        mechaSound.playError();
        return;
      }
      closeCart();
      openCheckoutModal();
    });
  }

  // Checkout form submit
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleOrderSubmit(new FormData(checkoutForm));
    });
  }

  // Tra cứu đơn hàng
  const trackOrderBtn = document.getElementById("trackOrderNavBtn");
  if (trackOrderBtn) {
    trackOrderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openTrackModal();
    });
  }
}

// Xử lý gợi ý tìm kiếm
function handleAutocomplete(val, box) {
  if (!val || val.length < 2) {
    box.classList.remove("active");
    box.innerHTML = "";
    return;
  }

  const matches = state.products.filter(p => 
    p.name.toLowerCase().includes(val) || 
    p.sku.toLowerCase().includes(val) ||
    p.series.toLowerCase().includes(val)
  ).slice(0, 5);

  if (matches.length === 0) {
    box.classList.remove("active");
    box.innerHTML = "";
    return;
  }

  box.innerHTML = matches.map(p => `
    <div class="autocomplete-item" onclick="openProductModal('${p.id}')">
      <img src="${p.image}" alt="${p.name}" />
      <div class="autocomplete-info">
        <div class="autocomplete-name">${p.name}</div>
        <div class="autocomplete-meta">
          <span>${p.grade}</span>
          <span>${formatVND(p.price)}</span>
        </div>
      </div>
    </div>
  `).join("");

  box.classList.add("active");
}

// Lọc và hiển thị sản phẩm
function renderProducts() {
  const container = document.getElementById("productsGrid");
  const countEl = document.getElementById("productCount");
  if (!container) return;

  let list = [...state.products];

  // Lọc theo Grade
  if (state.filters.grade !== "ALL") {
    if (state.filters.grade === "Tools") {
      list = list.filter(p => p.grade === "Tools");
    } else {
      list = list.filter(p => p.grade === state.filters.grade);
    }
  }

  // Lọc theo Series
  if (state.filters.series !== "ALL") {
    list = list.filter(p => p.series === state.filters.series);
  }

  // Lọc theo Tầm giá
  if (state.filters.priceRange && state.filters.priceRange !== "ALL") {
    const range = PRICE_RANGE_MAP[state.filters.priceRange];
    if (range) {
      list = list.filter(p => p.price >= range[0] && p.price <= range[1]);
    }
  }

  // Lọc theo Từ khóa tìm kiếm
  if (state.filters.search) {
    const q = state.filters.search.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.sku.toLowerCase().includes(q) || 
      p.series.toLowerCase().includes(q) ||
      p.grade.toLowerCase().includes(q)
    );
  }

  // Sắp xếp
  switch (state.filters.sortBy) {
    case "price_asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      list.sort((a, b) => (b.status === "new" ? 1 : 0) - (a.status === "new" ? 1 : 0));
      break;
    default: // popular
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
      break;
  }

  if (countEl) {
    countEl.innerHTML = `Hiển thị <strong>${list.length}</strong> mô hình Gunpla`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: rgba(18,24,38,0.5); border: 1px dashed rgba(0,240,255,0.3);">
        <div style="font-size: 3rem; margin-bottom: 14px;">📡</div>
        <h3 style="font-family: var(--font-mecha); color: #fff; margin-bottom: 8px;">KHÔNG TÌM THẤY MẪU GUNDAM NÀO</h3>
        <p style="color: var(--text-dim); margin-bottom: 18px;">Vui lòng thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm khác.</p>
        <button class="btn btn-secondary mecha-cut" onclick="document.getElementById('resetFiltersBtn').click()">Xóa bộ lọc</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    return `
      <div class="product-card mecha-cut">
        <div class="card-img-wrap" onclick="openProductModal('${product.id}')">
          <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" />
          <span class="badge-grade">${product.grade}</span>
          ${product.status !== "hot" && product.status !== "sale" && product.status !== "new" ? "" : `
            <span class="badge-status ${product.status}">
              ${product.status === "hot" ? "🔥 HOT" : product.status === "sale" ? "⚡ SALE" : "✨ MỚI"}
            </span>
          `}
          <button class="wishlist-btn ${isWishlisted ? "active" : ""}" title="Yêu thích" onclick="event.stopPropagation(); toggleWishlist('${product.id}')">
            ${isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>
        
        <div class="card-body">
          <div class="card-series">${product.series}</div>
          <h4 class="card-title" onclick="openProductModal('${product.id}')">${product.name}</h4>
          
          <div class="card-specs">
            <span>📏 ${product.scale}</span>
            <span>⭐ ${product.rating.toFixed(1)} (${product.reviewsCount})</span>
          </div>

          <div class="card-price-row">
            <div>
              <div class="card-price">${formatVND(product.price)}</div>
              ${product.originalPrice ? `<div class="card-old-price">${formatVND(product.originalPrice)}</div>` : ""}
            </div>
            ${product.ledSupport ? `<span style="font-size: 0.72rem; color: var(--cyan); border: 1px solid var(--cyan); padding: 1px 5px;">LED Ready</span>` : ""}
          </div>

          <div class="card-actions">
            <button class="btn-add-cart mecha-cut" onclick="addToCart('${product.id}', 1)">
              🛒 Thêm Vào Giỏ
            </button>
            <button class="btn-quick-view" onclick="openProductModal('${product.id}')" title="Xem thông số kỹ thuật">
              🔍
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// =========================================================================
// KIỂM TRA ĐĂNG NHẬP CHO CÁC THAO TÁC CẦN TÀI KHOẢN (CART, WISHLIST)
// =========================================================================
function checkLoginRequired(actionText = "thực hiện thao tác này", pendingAction = null) {
  const loggedIn = (typeof isUserLoggedIn === "function" && isUserLoggedIn()) ||
                   (typeof authState !== "undefined" && authState && authState.isLoggedIn) ||
                   (window.authState && window.authState.isLoggedIn) ||
                   !!localStorage.getItem("mecha_user");

  if (!loggedIn) {
    if (pendingAction) {
      window.pendingAuthAction = pendingAction;
    }
    showToast(`⚠️ Vui lòng đăng nhập để ${actionText}!`, "error");
    if (typeof mechaSound !== "undefined" && mechaSound.playError) {
      mechaSound.playError();
    } else if (typeof mechaSound !== "undefined" && mechaSound.playClick) {
      mechaSound.playClick();
    }
    if (typeof openAuthModal === "function") {
      openAuthModal("login");
    }
    return false;
  }
  return true;
}

function executePendingAuthAction() {
  if (!window.pendingAuthAction) return;
  const action = window.pendingAuthAction;
  window.pendingAuthAction = null;

  if (action.type === "cart") {
    setTimeout(() => {
      addToCart(action.productId, action.quantity || 1);
    }, 300);
  } else if (action.type === "wishlist") {
    setTimeout(() => {
      toggleWishlist(action.productId);
    }, 300);
  } else if (action.type === "buyNow") {
    setTimeout(() => {
      addToCart(action.productId, action.quantity || 1);
      openCheckoutModal();
    }, 300);
  }
}
window.executePendingAuthAction = executePendingAuthAction;
window.checkLoginRequired = checkLoginRequired;

// Quản lý Giỏ hàng (Cart)
function addToCart(productId, quantity = 1) {
  if (!checkLoginRequired("thêm sản phẩm vào giỏ hàng", { type: "cart", productId, quantity })) {
    return false;
  }

  const product = state.products.find(p => p.id === productId);
  if (!product) return false;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      grade: product.grade,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  mechaSound.playAddToCart();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, "success");
  return true;
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartUI();
  mechaSound.playClick();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  showToast("Đã xóa mô hình khỏi giỏ hàng", "info");
}

function saveCart() {
  localStorage.setItem("mecha_cart", JSON.stringify(state.cart));
}

function updateCartUI() {
  const countBadges = document.querySelectorAll(".cart-count-badge");
  const cartContainer = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountEl = document.getElementById("cartDiscount");
  const shipEl = document.getElementById("cartShipping");
  const totalEl = document.getElementById("cartTotal");

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  countBadges.forEach(b => b.textContent = totalItems);

  if (!cartContainer) return;

  if (state.cart.length === 0) {
    cartContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">📦</div>
        <p>Giỏ hàng của bạn đang trống!</p>
        <p style="font-size: 0.8rem; margin-top: 6px;">Hãy khám phá các mẫu Gunpla cực phẩm ngay nhé.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatVND(0);
    if (discountEl) discountEl.textContent = formatVND(0);
    if (shipEl) shipEl.textContent = formatVND(0);
    if (totalEl) totalEl.textContent = formatVND(0);
    return;
  }

  cartContainer.innerHTML = state.cart.map(item => `
    <div class="cart-item mecha-border">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <h5>${item.name}</h5>
        <div class="cart-item-price">${formatVND(item.price)}</div>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
          <button class="qty-btn" style="width: 24px; height: 24px; font-size: 0.8rem;" onclick="updateCartQuantity('${item.id}', -1)">-</button>
          <span style="font-family: var(--font-mecha); font-size: 0.9rem; color: #fff;">${item.quantity}</span>
          <button class="qty-btn" style="width: 24px; height: 24px; font-size: 0.8rem;" onclick="updateCartQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Xóa món này">🗑️</button>
    </div>
  `).join("");

  // Tính toán tiền
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let shipping = subtotal > 500000 ? 0 : 35000;
  let discount = 0;

  if (state.appliedCoupon) {
    if (state.appliedCoupon.freeShipping) {
      shipping = 0;
    }
    if (state.appliedCoupon.discountPercent) {
      discount = Math.min((subtotal * state.appliedCoupon.discountPercent) / 100, state.appliedCoupon.maxDiscount || 99999999);
    }
    if (state.appliedCoupon.discountAmount) {
      discount += state.appliedCoupon.discountAmount;
    }
  }

  const finalTotal = Math.max(0, subtotal - discount + shipping);

  if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
  if (discountEl) discountEl.textContent = discount > 0 ? `-${formatVND(discount)}` : formatVND(0);
  if (shipEl) shipEl.textContent = shipping === 0 ? "MIỄN PHÍ" : formatVND(shipping);
  if (totalEl) totalEl.textContent = formatVND(finalTotal);
}

// Áp dụng Coupon
function applyCoupon(code) {
  if (!code) return;

  const coupon = COUPONS[code];
  if (!coupon) {
    showToast("Mã giảm giá không tồn tại hoặc đã hết hạn!", "error");
    mechaSound.playError();
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (coupon.minOrder && subtotal < coupon.minOrder) {
    showToast(`Mã này yêu cầu đơn hàng tối thiểu ${formatVND(coupon.minOrder)}!`, "error");
    mechaSound.playError();
    return;
  }

  state.appliedCoupon = coupon;
  updateCartUI();
  mechaSound.playSuccess();
  showToast(`Áp dụng thành công mã "${coupon.code}": ${coupon.description}`, "success");
}

// Yêu thích (Wishlist)
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const isAdding = index === -1;

  // Yêu cầu đăng nhập tài khoản khi muốn thêm sản phẩm yêu thích (hoặc thao tác wishlist)
  if (isAdding) {
    if (!checkLoginRequired("thêm sản phẩm vào danh sách yêu thích", { type: "wishlist", productId })) {
      return;
    }
  } else {
    if (!checkLoginRequired("quản lý danh sách yêu thích")) {
      return;
    }
  }

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast("Đã xóa khỏi danh sách yêu thích", "info");
  } else {
    state.wishlist.push(productId);
    showToast("Đã thêm vào danh sách yêu thích ❤️", "success");
  }

  localStorage.setItem("mecha_wishlist", JSON.stringify(state.wishlist));
  updateWishlistUI();
  renderProducts();
  mechaSound.playClick();
}

function updateWishlistUI() {
  const badge = document.getElementById("wishlistCountBadge");
  if (badge) badge.textContent = state.wishlist.length;
}

// Modal Xem Chi Tiết Mô Hình
function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.currentProductModal = product;
  const modal = document.getElementById("productModal");
  const modalBody = document.getElementById("productModalBody");
  if (!modal || !modalBody) return;

  let starsHtml = "★".repeat(Math.floor(product.rating)) + (product.rating % 1 !== 0 ? "½" : "");

  modalBody.innerHTML = `
    <div class="product-detail-grid">
      <div>
        <div class="gallery-main mecha-cut">
          <img id="mainDetailImg" src="${product.image}" alt="${product.name}" />
        </div>
        <div class="gallery-thumbs">
          ${product.gallery.map((img, idx) => `
            <img src="${img}" class="gallery-thumb ${idx === 0 ? "active" : ""}" onclick="changeDetailImage(this, '${img}')" />
          `).join("")}
        </div>
      </div>

      <div>
        <span class="badge-grade" style="position: static; display: inline-block; margin-bottom: 8px;">${product.grade} GRADE</span>
        <h2 style="font-family: var(--font-mecha); color: #fff; font-size: 1.45rem; margin-bottom: 6px;">${product.name}</h2>
        <div style="font-family: var(--font-tech); color: var(--cyan); font-size: 0.95rem; margin-bottom: 12px;">MÃ HIỆU: ${product.sku} | SERIES: ${product.series}</div>
        
        <div style="display: flex; align-items: baseline; gap: 14px; margin-bottom: 14px;">
          <span style="font-family: var(--font-mecha); font-size: 1.6rem; color: var(--gold); font-weight: 900;">${formatVND(product.price)}</span>
          ${product.originalPrice ? `<span style="text-decoration: line-through; color: var(--text-muted); font-size: 1rem;">${formatVND(product.originalPrice)}</span>` : ""}
        </div>

        <p style="color: var(--text-dim); font-size: 0.88rem; line-height: 1.6; margin-bottom: 16px;">${product.description}</p>

        <h4 style="font-family: var(--font-tech); color: var(--cyan); letter-spacing: 1px;">THÔNG SỐ KỸ THUẬT GUNPLA:</h4>
        <table class="detail-specs-table">
          <tr>
            <td>Tỷ lệ & Chiều cao:</td>
            <td>${product.scale} (~${product.height})</td>
          </tr>
          <tr>
            <td>Số lượng Runner (Vỉ):</td>
            <td>${product.runners > 0 ? `${product.runners} vỉ nhựa đúc đa sắc` : "Mô hình kim loại đúc sẵn"}</td>
          </tr>
          <tr>
            <td>Cấu trúc Khung xương:</td>
            <td>${product.innerFrame}</td>
          </tr>
          <tr>
            <td>Hỗ trợ Đèn LED:</td>
            <td>${product.ledSupport ? "✅ Có khe cắm LED phát sáng buồng lái / ngực" : "❌ Không hỗ trợ LED"}</td>
          </tr>
          <tr>
            <td>Trang bị đính kèm:</td>
            <td>${product.accessories.join(", ")}</td>
          </tr>
        </table>

        <div class="quantity-picker">
          <span style="color: var(--text-dim); font-size: 0.9rem;">Số lượng:</span>
          <button class="qty-btn" onclick="adjustModalQty(-1)">-</button>
          <input type="number" id="modalQtyInput" class="qty-input" value="1" min="1" max="${product.stock}" />
          <button class="qty-btn" onclick="adjustModalQty(1)">+</button>
          <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 8px;">(Còn ${product.stock} hộp sẵn hàng)</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;">
          <button class="btn btn-secondary mecha-cut" onclick="addModalToCart(false)">
            🛒 Thêm Vào Giỏ
          </button>
          <button class="btn btn-primary mecha-cut" onclick="addModalToCart(true)">
            ⚡ Mua Ngay
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  mechaSound.playClick();
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.remove("active");
}

function changeDetailImage(thumbEl, src) {
  document.getElementById("mainDetailImg").src = src;
  document.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
  thumbEl.classList.add("active");
  mechaSound.playClick();
}

function adjustModalQty(delta) {
  const input = document.getElementById("modalQtyInput");
  if (!input || !state.currentProductModal) return;
  let val = parseInt(input.value, 10) + delta;
  if (val < 1) val = 1;
  if (val > state.currentProductModal.stock) val = state.currentProductModal.stock;
  input.value = val;
}

function addModalToCart(buyNow = false) {
  if (!state.currentProductModal) return;
  const actionText = buyNow ? "mua hàng" : "thêm sản phẩm vào giỏ hàng";
  const input = document.getElementById("modalQtyInput");
  const qty = input ? parseInt(input.value, 10) : 1;

  if (!checkLoginRequired(actionText, { 
    type: buyNow ? "buyNow" : "cart", 
    productId: state.currentProductModal.id, 
    quantity: qty 
  })) {
    return;
  }

  const success = addToCart(state.currentProductModal.id, qty);
  if (!success) return;

  closeProductModal();

  if (buyNow) {
    setTimeout(() => {
      openCheckoutModal();
    }, 300);
  }
}

// So sánh tỷ lệ Gunpla (Grade Comparison)
function renderScaleComparison() {
  const container = document.getElementById("scaleVisualizerGrid");
  if (!container) return;

  const heightsMap = {
    "SD (Super Deformed)": "50px",
    "HG (High Grade)": "95px",
    "RG (Real Grade)": "100px",
    "MG (Master Grade)": "135px",
    "PG (Perfect Grade)": "190px",
    "Metal Build": "140px"
  };

  container.innerHTML = GRADE_SCALES.map((scale, idx) => `
    <div class="scale-card mecha-border ${idx === 1 ? "highlighted" : ""}">
      <div class="scale-figure-wrap">
        <div class="scale-silhouette" style="height: ${heightsMap[scale.grade]}; background: linear-gradient(to top, ${scale.color}, transparent); border-top-color: ${scale.color};"></div>
      </div>
      <h4 class="scale-name">${scale.grade}</h4>
      <div class="scale-ratio">${scale.scale} (${scale.height})</div>
      <ul class="scale-details">
        <li><strong>Độ khó:</strong> ${scale.difficulty}</li>
        <li><strong>Vỉ Runner:</strong> ${scale.runners}</li>
        <li><strong>Tầm giá:</strong> ${scale.priceRange}</li>
      </ul>
      <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 10px;">${scale.description}</p>
    </div>
  `).join("");
}

// Hiển thị cẩm nang Gunpla Academy
function renderAcademy() {
  const container = document.getElementById("academyGrid");
  if (!container) return;

  container.innerHTML = ACADEMY_GUIDES.map(guide => `
    <div class="academy-card mecha-cut mecha-border">
      <div class="academy-icon">${guide.icon}</div>
      <h4 class="academy-title">${guide.title}</h4>
      <div class="academy-summary">${guide.summary}</div>
      <div class="academy-content">${guide.content}</div>
    </div>
  `).join("");
}

// Hiển thị đánh giá khách hàng
function renderReviews() {
  const container = document.getElementById("reviewsGrid");
  if (!container) return;

  container.innerHTML = CUSTOMER_REVIEWS.map(r => `
    <div class="review-card mecha-cut mecha-border">
      <div class="review-user">
        <img src="${r.avatar}" alt="${r.name}" class="review-avatar" />
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-kit">Đã mua: ${r.kit}</div>
        </div>
      </div>
      <div class="review-stars">${"⭐".repeat(r.rating)}</div>
      <p class="review-comment">"${r.comment}"</p>
      <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 8px;">${r.date} • Đã xác nhận mua hàng</div>
    </div>
  `).join("");
}

// Checkout Modal
function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let shipping = subtotal > 500000 ? 0 : 35000;
  let discount = 0;

  if (state.appliedCoupon) {
    if (state.appliedCoupon.freeShipping) shipping = 0;
    if (state.appliedCoupon.discountPercent) {
      discount = Math.min((subtotal * state.appliedCoupon.discountPercent) / 100, state.appliedCoupon.maxDiscount || 99999999);
    }
    if (state.appliedCoupon.discountAmount) discount += state.appliedCoupon.discountAmount;
  }

  const finalTotal = Math.max(0, subtotal - discount + shipping);

  document.getElementById("checkoutSubtotal").textContent = formatVND(subtotal);
  document.getElementById("checkoutDiscount").textContent = discount > 0 ? `-${formatVND(discount)}` : formatVND(0);
  document.getElementById("checkoutShipping").textContent = shipping === 0 ? "Miễn phí" : formatVND(shipping);
  document.getElementById("checkoutTotal").textContent = formatVND(finalTotal);

  // Tạo mã QR VietQR tự động
  updateVietQR(finalTotal);

  modal.classList.add("active");
  mechaSound.playClick();
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("active");
}

function selectPaymentMethod(method, element) {
  state.selectedPayment = method;
  document.querySelectorAll(".payment-option").forEach(opt => opt.classList.remove("active"));
  element.classList.add("active");

  const qrBox = document.getElementById("qrBankBox");
  if (qrBox) {
    if (method === "qr_bank") {
      qrBox.style.display = "block";
    } else {
      qrBox.style.display = "none";
    }
  }
  mechaSound.playClick();
}

function updateVietQR(amount) {
  const qrImg = document.getElementById("vietQRImg");
  const qrTransferContent = document.getElementById("qrTransferContent");
  if (!qrImg) return;

  const orderCode = "MEC" + Math.floor(100000 + Math.random() * 900000);
  const bankAccount = "9988776655";
  const bankCode = "MB"; // MB Bank
  const qrUrl = `https://img.vietqr.io/image/${bankCode}-${bankAccount}-compact2.png?amount=${amount}&addInfo=MECHA%20${orderCode}&accountName=GUNDAM%20MECHA%20CORE`;

  qrImg.src = qrUrl;
  if (qrTransferContent) {
    qrTransferContent.textContent = `MECHA ${orderCode}`;
  }
}

function handleOrderSubmit(formData) {
  const name = formData.get("fullName");
  const phone = formData.get("phone");
  const address = formData.get("address");

  const orderId = "MEC-" + Math.floor(100000 + Math.random() * 900000);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let shipping = subtotal > 500000 ? 0 : 35000;
  let discount = 0;
  if (state.appliedCoupon) {
    if (state.appliedCoupon.freeShipping) shipping = 0;
    if (state.appliedCoupon.discountPercent) discount = Math.min((subtotal * state.appliedCoupon.discountPercent) / 100, state.appliedCoupon.maxDiscount || 99999999);
    if (state.appliedCoupon.discountAmount) discount += state.appliedCoupon.discountAmount;
  }
  const total = Math.max(0, subtotal - discount + shipping);

  const order = {
    orderId,
    name,
    phone,
    address,
    items: [...state.cart],
    total,
    paymentMethod: state.selectedPayment,
    status: "Đang đóng gói & chuẩn bị vận chuyển",
    createdAt: new Date().toLocaleString("vi-VN")
  };

  state.orders.push(order);
  localStorage.setItem("mecha_orders", JSON.stringify(state.orders));

  // Reset cart
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartUI();

  closeCheckoutModal();
  mechaSound.playSuccess();

  // Hiển thị Modal Đặt hàng thành công
  openSuccessOrderModal(order);
}

function openSuccessOrderModal(order) {
  const modal = document.getElementById("orderSuccessModal");
  const body = document.getElementById("orderSuccessBody");
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 3.5rem; color: var(--green); margin-bottom: 10px;">🚀</div>
      <h2 style="font-family: var(--font-mecha); color: #fff;">ĐẶT HÀNG THÀNH CÔNG!</h2>
      <p style="color: var(--cyan); font-family: var(--font-tech); font-size: 1.1rem; letter-spacing: 1px;">MÃ ĐƠN HÀNG: <strong>${order.orderId}</strong></p>
    </div>

    <div style="background: rgba(8,12,20,0.8); border: 1px solid rgba(0,240,255,0.2); padding: 18px; margin-bottom: 20px; font-size: 0.9rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: var(--text-muted);">Người nhận:</span>
        <strong style="color: #fff;">${order.name} (${order.phone})</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: var(--text-muted);">Địa chỉ nhận hàng:</span>
        <span style="color: #fff; text-align: right; max-width: 60%;">${order.address}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: var(--text-muted);">Tổng thanh toán:</span>
        <strong style="color: var(--gold); font-family: var(--font-mecha);">${formatVND(order.total)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">Trạng thái:</span>
        <span style="color: var(--green); font-weight: 600;">${order.status}</span>
      </div>
    </div>

    <div style="text-align: center;">
      <button class="btn btn-primary mecha-cut" onclick="document.getElementById('orderSuccessModal').classList.remove('active')">
        Tiếp Tục Mua Sắm
      </button>
    </div>
  `;

  modal.classList.add("active");
}

// Modal Tra cứu đơn hàng
function openTrackModal() {
  const modal = document.getElementById("trackModal");
  if (modal) {
    modal.classList.add("active");
    mechaSound.playClick();
  }
}

function searchOrderTrack() {
  const input = document.getElementById("trackOrderInput");
  const resultBox = document.getElementById("trackResultBox");
  if (!input || !resultBox) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast("Vui lòng nhập mã đơn hàng!", "error");
    return;
  }

  const order = state.orders.find(o => o.orderId.toUpperCase() === code);
  if (!order) {
    resultBox.innerHTML = `
      <div style="text-align: center; color: var(--crimson); padding: 20px;">
        ❌ Không tìm thấy đơn hàng "${code}". Vui lòng kiểm tra lại mã đơn!
      </div>
    `;
    mechaSound.playError();
    return;
  }

  resultBox.innerHTML = `
    <div style="background: rgba(8,12,20,0.9); border: 1px solid var(--cyan); padding: 18px; margin-top: 16px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <strong style="color: var(--cyan); font-family: var(--font-tech); font-size: 1.1rem;">ĐƠN HÀNG ${order.orderId}</strong>
        <span style="color: var(--gold); font-family: var(--font-mecha);">${formatVND(order.total)}</span>
      </div>
      <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 6px;">Người nhận: ${order.name} - ${order.phone}</div>
      <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 12px;">Thời gian đặt: ${order.createdAt}</div>

      <div style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 10px;">
        <div style="font-size: 0.85rem; color: var(--green); font-weight: 600; margin-bottom: 6px;">📍 Trạng thái: ${order.status}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">Món hàng (${order.items.length}): ${order.items.map(i => `${i.name} (x${i.quantity})`).join(", ")}</div>
      </div>
    </div>
  `;
  mechaSound.playSuccess();
}

// Countdown Flash Sale
function initCountdown() {
  let timeLeft = 24 * 3600 + 45 * 60 + 12; // 24h 45m 12s
  const hoursEl = document.getElementById("timerHours");
  const minsEl = document.getElementById("timerMins");
  const secsEl = document.getElementById("timerSecs");

  if (!hoursEl || !minsEl || !secsEl) return;

  setInterval(() => {
    if (timeLeft <= 0) timeLeft = 24 * 3600;
    timeLeft--;

    const hours = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;

    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
  }, 1000);
}

// Sound toggle UI
function initSoundUI() {
  const soundBtn = document.getElementById("soundToggleBtn");
  if (!soundBtn) return;

  const updateBtnText = () => {
    soundBtn.innerHTML = mechaSound.enabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
  };

  updateBtnText();

  soundBtn.addEventListener("click", () => {
    mechaSound.toggle();
    updateBtnText();
  });
}

// Toast notification helper
function showToast(msg, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type} mecha-cut`;
  
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "error") icon = "⚠️";

  toast.innerHTML = `
    <span>${icon}</span>
    <div style="font-size: 0.88rem;">${msg}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
