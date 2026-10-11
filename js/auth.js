/**
 * MECHA CORE - AUTH MODULE
 * Quản lý đăng nhập, đăng ký, phiên người dùng và bảng điều khiển tài khoản
 */

// =========================================================================
// CẤU HÌNH API
// =========================================================================
const AUTH_API = {
  login: 'http://localhost:5000/api/auth/login',
  register: 'http://localhost:5000/api/auth/register',
  orders: (userId) => `http://localhost:5000/api/orders/user/${userId}`
};

// =========================================================================
// QUẢN LÝ PHIÊN NGƯỜI DÙNG (SESSION)
// =========================================================================
const authState = {
  user: null,
  isLoggedIn: false
};

/**
 * Lưu phiên đăng nhập vào localStorage
 */
function saveSession(user) {
  localStorage.setItem('mecha_user', JSON.stringify(user));
  authState.user = user;
  authState.isLoggedIn = true;
}

/**
 * Xoá phiên đăng nhập
 */
function clearSession() {
  localStorage.removeItem('mecha_user');
  authState.user = null;
  authState.isLoggedIn = false;
}

/**
 * Khôi phục phiên từ localStorage khi tải trang
 */
function restoreSession() {
  const saved = localStorage.getItem('mecha_user');
  if (saved) {
    try {
      const user = JSON.parse(saved);
      authState.user = user;
      authState.isLoggedIn = true;
      renderUserNav(user);
    } catch (e) {
      clearSession();
    }
  }
}

/**
 * Kiểm tra xem người dùng hiện tại đã đăng nhập hay chưa
 */
function isUserLoggedIn() {
  if (authState && authState.isLoggedIn && authState.user) {
    return true;
  }
  const saved = localStorage.getItem('mecha_user');
  if (saved) {
    try {
      const user = JSON.parse(saved);
      return !!user;
    } catch (e) {
      return false;
    }
  }
  return false;
}

window.authState = authState;
window.isUserLoggedIn = isUserLoggedIn;

// =========================================================================
// ĐIỀU HƯỚNG AUTH NAV
// =========================================================================

function renderUserNav(user) {
  const loginBtn = document.getElementById('loginNavBtn');
  const userMenu = document.getElementById('userNavMenu');
  const userAvatar = document.getElementById('userNavAvatar');
  const userName = document.getElementById('userNavName');
  const dropdownRole = document.getElementById('userDropdownRole');

  if (!loginBtn || !userMenu) return;

  if (user) {
    loginBtn.style.display = 'none';
    userMenu.style.display = 'flex';
    userAvatar.src = user.avatar || '';
    userName.textContent = user.fullName || user.username;
    dropdownRole.textContent = user.role === 'admin' ? '👑 QUẢN TRỊ VIÊN' : '🤖 MECHA BUILDER';
    dropdownRole.className = 'user-role-badge ' + (user.role === 'admin' ? 'role-admin' : 'role-user');
  } else {
    loginBtn.style.display = '';
    userMenu.style.display = 'none';
  }
}

function toggleUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  if (!dropdown) return;
  const isVisible = dropdown.style.display !== 'none';
  dropdown.style.display = isVisible ? 'none' : 'block';
}

document.addEventListener('click', (e) => {
  const wrap = document.getElementById('authNavWrap');
  const dropdown = document.getElementById('userDropdown');
  if (wrap && dropdown && !wrap.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// =========================================================================
// AUTH MODAL
// =========================================================================

function openAuthModal(tab) {
  tab = tab || 'login';
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.add('active');
  switchAuthTab(tab);
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  clearAuthErrors();
}

document.addEventListener('DOMContentLoaded', function() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.addEventListener('click', function(e) {
      if (e.target === authModal) closeAuthModal();
    });
  }
  const accountModal = document.getElementById('accountModal');
  if (accountModal) {
    accountModal.addEventListener('click', function(e) {
      if (e.target === accountModal) closeAccountModal();
    });
  }
});

function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');

  if (!loginForm || !registerForm) return;

  if (tab === 'login') {
    loginForm.style.display = '';
    registerForm.style.display = 'none';
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = '';
    tabLogin.classList.remove('active');
    tabRegister.classList.add('active');
  }
  clearAuthErrors();
}

function clearAuthErrors() {
  ['loginError', 'registerError'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.style.display = 'none'; }
  });
}

function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

function fillDemo(username, password) {
  const usernameEl = document.getElementById('loginUsername');
  const passwordEl = document.getElementById('loginPassword');
  if (usernameEl) usernameEl.value = username;
  if (passwordEl) passwordEl.value = password;
}

// =========================================================================
// XỬ LÝ ĐĂNG NHẬP
// =========================================================================

async function handleLogin(e) {
  e.preventDefault();
  const username = (document.getElementById('loginUsername')?.value || '').trim();
  const password = document.getElementById('loginPassword')?.value || '';
  const errEl = document.getElementById('loginError');
  const submitBtn = document.getElementById('loginSubmitBtn');

  if (!username || !password) {
    showAuthError(errEl, 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '⏳ Đang xác thực...';

  try {
    const res = await fetch(AUTH_API.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      onLoginSuccess(data.user);
    } else {
      showAuthError(errEl, data.message || 'Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  } catch (err) {
    // Offline fallback
    const demoAccounts = [
      { username: 'builder01', email: 'builder@gmail.com', password: '123456', fullName: 'Gundam Builder Việt Nam', phone: '0912345678', address: 'Hà Nội, Việt Nam', role: 'user', id: 2, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
      { username: 'admin', email: 'admin@mechacore.vn', password: 'admin123', fullName: 'Chỉ Huy Trưởng Mecha Core', phone: '1900-GUNDAM', address: 'Trụ Sở Mecha Core', role: 'admin', id: 1, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' }
    ];
    const demo = demoAccounts.find(function(a) {
      return (a.username === username || a.email === username) && a.password === password;
    });
    if (demo) {
      onLoginSuccess({ id: demo.id, username: demo.username, email: demo.email, fullName: demo.fullName, phone: demo.phone, address: demo.address, role: demo.role, avatar: demo.avatar });
      showToast('📡 Chế độ ngoại tuyến: Đăng nhập demo thành công!', 'info');
    } else {
      showAuthError(errEl, '⚠️ Server đang offline. Thử demo: builder01 / 123456 hoặc admin / admin123');
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '⚡ ĐĂNG NHẬP';
  }
}

function onLoginSuccess(user) {
  saveSession(user);
  renderUserNav(user);
  closeAuthModal();
  autoFillCheckout(user);
  showToast('✅ Chào mừng ' + (user.fullName || user.username) + '! Đăng nhập thành công.', 'success');
  if (typeof mechaSound !== 'undefined') mechaSound.playSuccess();
  if (typeof window.executePendingAuthAction === 'function') {
    window.executePendingAuthAction();
  }
}

// =========================================================================
// XỬ LÝ ĐĂNG KÝ
// =========================================================================

async function handleRegister(e) {
  e.preventDefault();
  const errEl = document.getElementById('registerError');
  const submitBtn = document.getElementById('registerSubmitBtn');

  const username = (document.getElementById('regUsername')?.value || '').trim();
  const fullName = (document.getElementById('regFullName')?.value || '').trim();
  const email = (document.getElementById('regEmail')?.value || '').trim();
  const phone = (document.getElementById('regPhone')?.value || '').trim();
  const address = (document.getElementById('regAddress')?.value || '').trim();
  const password = document.getElementById('regPassword')?.value || '';
  const confirmPw = document.getElementById('regPasswordConfirm')?.value || '';

  if (!username || !email || !password) {
    showAuthError(errEl, 'Vui lòng điền đầy đủ các trường bắt buộc (*)!');
    return;
  }
  if (username.length < 4) {
    showAuthError(errEl, 'Tên đăng nhập phải có ít nhất 4 ký tự!');
    return;
  }
  if (password.length < 6) {
    showAuthError(errEl, 'Mật khẩu phải có ít nhất 6 ký tự!');
    return;
  }
  if (password !== confirmPw) {
    showAuthError(errEl, 'Xác nhận mật khẩu không khớp!');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAuthError(errEl, 'Địa chỉ email không hợp lệ!');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '⏳ Đang tạo tài khoản...';

  try {
    const res = await fetch(AUTH_API.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, fullName, phone, address })
    });

    const data = await res.json();

    if (data.success) {
      saveSession(data.user);
      renderUserNav(data.user);
      closeAuthModal();
      autoFillCheckout(data.user);
      showToast('🎉 Tài khoản ' + data.user.username + ' đã được tạo! Chào mừng phi công mới!', 'success');
      if (typeof mechaSound !== 'undefined') mechaSound.playSuccess();
      if (typeof window.executePendingAuthAction === 'function') {
        window.executePendingAuthAction();
      }
    } else {
      showAuthError(errEl, data.message || 'Đăng ký thất bại. Vui lòng thử lại!');
    }
  } catch (err) {
    showAuthError(errEl, '⚠️ Không thể kết nối server. Vui lòng kiểm tra server ASP.NET đang chạy tại localhost:5000.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '🚀 TẠO TÀI KHOẢN';
  }
}

// =========================================================================
// ĐĂNG XUẤT
// =========================================================================

function logoutUser() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.style.display = 'none';
  clearSession();
  renderUserNav(null);
  showToast('👋 Đã đăng xuất. Hẹn gặp lại phi công!', 'info');
  if (typeof mechaSound !== 'undefined') mechaSound.playClick();
  if (typeof renderProducts === 'function') renderProducts();
}

// =========================================================================
// TỰ ĐỘNG ĐIỀN THÔNG TIN CHECKOUT
// =========================================================================

function autoFillCheckout(user) {
  if (!user) return;
  const nameField = document.querySelector('#checkoutForm [name="fullName"]');
  const phoneField = document.querySelector('#checkoutForm [name="phone"]');
  const addressField = document.querySelector('#checkoutForm [name="address"]');
  if (nameField && user.fullName) nameField.value = user.fullName;
  if (phoneField && user.phone) phoneField.value = user.phone;
  if (addressField && user.address) addressField.value = user.address;
}

// =========================================================================
// BẢNG ĐIỀU KHIỂN TÀI KHOẢN
// =========================================================================

function openAccountDashboard() {
  const user = authState.user;
  if (!user) { openAuthModal('login'); return; }

  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.style.display = 'none';

  function setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val || '';
  }
  function setImg(id, src) {
    const el = document.getElementById(id);
    if (el) el.src = src || '';
  }

  setImg('accAvatar', user.avatar);
  setEl('accFullName', user.fullName || user.username);
  setEl('accUsername', '@' + user.username);
  setEl('accEmail', '✉️ ' + user.email);
  setEl('accPhone', user.phone ? '📞 ' + user.phone : '');
  setEl('accAddress', user.address ? '📍 ' + user.address : '');

  const roleEl = document.getElementById('accRoleBadge');
  if (roleEl) {
    roleEl.textContent = user.role === 'admin' ? '👑 QUẢN TRỊ VIÊN' : '🤖 MECHA BUILDER';
    roleEl.className = 'acc-role ' + (user.role === 'admin' ? 'role-admin' : 'role-user');
  }

  const modal = document.getElementById('accountModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  loadUserOrders(user.id);
}

function closeAccountModal() {
  const modal = document.getElementById('accountModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

async function loadUserOrders(userId) {
  const listEl = document.getElementById('accountOrdersList');
  if (!listEl) return;

  listEl.innerHTML = '<div class="acc-orders-loading">⏳ Đang tải đơn hàng...</div>';

  try {
    const res = await fetch(AUTH_API.orders(userId));
    const orders = await res.json();

    if (!Array.isArray(orders) || orders.length === 0) {
      listEl.innerHTML = renderEmptyOrders();
    } else {
      listEl.innerHTML = orders.map(renderOrderCard).join('');
    }
  } catch (err) {
    const localOrders = JSON.parse(localStorage.getItem('mecha_orders') || '[]');
    if (localOrders.length === 0) {
      listEl.innerHTML = renderEmptyOrders();
    } else {
      listEl.innerHTML = localOrders.map(function(o) {
        return renderOrderCard({
          orderId: o.id,
          name: o.customerName,
          address: o.address,
          total: o.total,
          status: o.status,
          createdAt: o.createdAt
        });
      }).join('');
    }
  }
}

function renderEmptyOrders() {
  return '<div class="acc-orders-empty"><div style="font-size:2.5rem;margin-bottom:10px;">📦</div><div style="font-family:var(--font-tech);color:var(--text-dim);">Chưa có đơn hàng nào</div><div style="font-size:0.82rem;color:var(--text-muted);margin-top:6px;">Hãy khám phá cửa hàng và đặt bộ kit đầu tiên!</div></div>';
}

function renderOrderCard(order) {
  const statusColor = getOrderStatusColor(order.status);
  const total = typeof formatVND === 'function' ? formatVND(order.total || 0) : (order.total || 0).toLocaleString('vi-VN') + '₫';
  return '<div class="acc-order-card mecha-cut">' +
    '<div class="acc-order-header">' +
      '<div><div class="acc-order-id">🔖 ' + (order.orderId || order.id || '') + '</div>' +
      '<div class="acc-order-date">' + (order.createdAt || '') + '</div></div>' +
      '<div class="acc-order-total">' + total + '</div>' +
    '</div>' +
    '<div class="acc-order-status" style="color:' + statusColor + ';">' +
      '<span class="status-dot" style="background:' + statusColor + ';box-shadow:0 0 6px ' + statusColor + ';"></span>' +
      (order.status || 'Đang xử lý') +
    '</div>' +
    (order.address ? '<div class="acc-order-addr">📍 ' + order.address + '</div>' : '') +
  '</div>';
}

function getOrderStatusColor(status) {
  if (!status) return 'var(--text-dim)';
  const s = status.toLowerCase();
  if (s.includes('hoàn tất') || s.includes('thành công')) return 'var(--green)';
  if (s.includes('vận chuyển') || s.includes('giao')) return 'var(--cyan)';
  if (s.includes('hủy')) return 'var(--crimson)';
  return 'var(--gold)';
}

// =========================================================================
// AUTH ERROR HELPER
// =========================================================================

function showAuthError(el, msg) {
  if (!el) return;
  el.textContent = '⚠️ ' + msg;
  el.style.display = 'block';
}

// =========================================================================
// KHỞI TẠO
// =========================================================================

document.addEventListener('DOMContentLoaded', function() {
  restoreSession();

  if (authState.isLoggedIn && authState.user) {
    setTimeout(function() { autoFillCheckout(authState.user); }, 300);
  }
});
