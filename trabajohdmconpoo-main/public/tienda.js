// =====================================================================
// TIENDA — catálogo, carrito y pedidos (Express/MySQL)
// =====================================================================
// El catálogo (PRODUCTS) viene de productos.js y las imágenes de img/, así que
// la tienda se ve y el carrito funciona SIN servidor. Solo confirmar un pedido lo necesita.
// Si abrís el HTML directo desde el disco, el pedido apunta al servidor local.
const API = location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api';

const money = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0
});

// Escapa texto antes de insertarlo como HTML
function esc(value) {
  return String(value).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// ── Producto del catálogo ─────────────────────────────────────────
class Product {
  constructor({ id, name, category, price, image, desc, sizes = null, badge = null }) {
    Object.assign(this, { id, name, category, price, image, desc, sizes, badge });
  }

  get hasSizes() { return Array.isArray(this.sizes) && this.sizes.length > 0; }
  get priceLabel() { return money.format(this.price); }
}

// ── Línea del carrito: un producto + talle + cantidad ─────────────
class CartItem {
  static MAX_QTY = 10;

  constructor(product, size, qty = 1) {
    this.product = product;
    this.size = size || null;
    this.qty = qty;
  }

  get key() { return `${this.product.id}|${this.size ?? ''}`; }
  get subtotal() { return this.product.price * this.qty; }
}

// ── Carrito: guarda su estado en localStorage ─────────────────────
class Cart {
  static STORAGE_KEY = 'gq_cart';

  #items = [];
  #listeners = [];

  get items() { return [...this.#items]; }
  get count() { return this.#items.reduce((n, it) => n + it.qty, 0); }
  get total() { return this.#items.reduce((sum, it) => sum + it.subtotal, 0); }
  get isEmpty() { return this.#items.length === 0; }

  onChange(fn) { this.#listeners.push(fn); }

  #emit() {
    this.#save();
    this.#listeners.forEach(fn => fn(this));
  }

  add(product, size) {
    const probe = new CartItem(product, size);
    const existing = this.#items.find(it => it.key === probe.key);
    if (existing) existing.qty = Math.min(existing.qty + 1, CartItem.MAX_QTY);
    else this.#items.push(probe);
    this.#emit();
  }

  changeQty(key, delta) {
    const item = this.#items.find(it => it.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) return this.remove(key);
    item.qty = Math.min(item.qty, CartItem.MAX_QTY);
    this.#emit();
  }

  remove(key) {
    this.#items = this.#items.filter(it => it.key !== key);
    this.#emit();
  }

  clear() {
    this.#items = [];
    this.#emit();
  }

  // Datos mínimos que se envían al servidor (el precio lo calcula él)
  toOrderItems() {
    return this.#items.map(it => ({ id: it.product.id, qty: it.qty, size: it.size }));
  }

  // Reconstruye el carrito guardado usando el catálogo actual
  restore(catalog) {
    try {
      const saved = JSON.parse(localStorage.getItem(Cart.STORAGE_KEY) || '[]');
      this.#items = saved
        .map(s => {
          const product = catalog.find(p => p.id === s.id);
          const sizeOk = product && (!product.hasSizes || product.sizes.includes(s.size));
          return product && sizeOk
            ? new CartItem(product, s.size, Math.min(Math.max(parseInt(s.qty) || 1, 1), CartItem.MAX_QTY))
            : null;
        })
        .filter(Boolean);
    } catch {
      this.#items = [];
    }
    this.#emit();
  }

  #save() {
    try {
      const data = this.#items.map(it => ({ id: it.product.id, size: it.size, qty: it.qty }));
      localStorage.setItem(Cart.STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }
}

// ── Tienda: arma la interfaz y conecta todo ───────────────────────
class Shop {
  #catalog = [];
  #cart = new Cart();
  #category = 'Todos';
  #sort = 'default';
  #toastTimer = null;

  constructor() {
    this.$ = id => document.getElementById(id);
  }

  init() {
    this.#showUser();
    this.#bindEvents();
    this.#cart.onChange(() => this.#renderCart());

    // Catálogo local: no depende del servidor
    this.#catalog = PRODUCTS.map(p => new Product(p));

    this.#renderFilters();
    this.#renderProducts();
    this.#cart.restore(this.#catalog);
  }

  // Muestra el nombre del usuario si hay sesión iniciada en el sitio
  #showUser() {
    try {
      const user = JSON.parse(sessionStorage.getItem('gq_user') || 'null');
      if (user?.username) this.$('navUsername').textContent = '👋 ' + user.username;
    } catch {}
  }

  #bindEvents() {
    this.$('cartBtn').addEventListener('click', () => this.#toggleDrawer(true));
    this.$('drawerClose').addEventListener('click', () => this.#toggleDrawer(false));
    this.$('drawerOverlay').addEventListener('click', () => this.#toggleDrawer(false));
    this.$('clearBtn').addEventListener('click', () => this.#cart.clear());
    this.$('checkoutBtn').addEventListener('click', () => this.#openCheckout());
    this.$('checkoutClose').addEventListener('click', () => this.#closeCheckout());
    this.$('checkoutOverlay').addEventListener('click', e => {
      if (e.target === this.$('checkoutOverlay')) this.#closeCheckout();
    });
    this.$('confirmBtn').addEventListener('click', () => this.#submitOrder());
    this.$('doneBtn').addEventListener('click', () => this.#closeCheckout());

    this.$('sortSelect').addEventListener('change', e => {
      this.#sort = e.target.value;
      this.#renderProducts();
    });

    // Delegación de eventos: filtros
    this.$('filters').addEventListener('click', e => {
      const chip = e.target.closest('.shop-chip');
      if (!chip) return;
      this.#category = chip.dataset.cat;
      this.#renderFilters();
      this.#renderProducts();
    });

    // Delegación de eventos: botón "Agregar" de cada producto
    this.$('productGrid').addEventListener('click', e => {
      const btn = e.target.closest('.product-add');
      if (!btn) return;
      const card = btn.closest('.product-card');
      const product = this.#catalog.find(p => p.id === card.dataset.id);
      const size = card.querySelector('.shop-size')?.value || null;
      this.#cart.add(product, size);
      this.#toast(`${product.name} agregado al carrito`);
      this.$('cartBtn').classList.remove('bump');
      void this.$('cartBtn').offsetWidth; // reinicia la animación
      this.$('cartBtn').classList.add('bump');
    });

    // Delegación de eventos: cantidades y quitar dentro del carrito
    this.$('drawerBody').addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const { action, key } = btn.dataset;
      if (action === 'inc') this.#cart.changeQty(key, 1);
      if (action === 'dec') this.#cart.changeQty(key, -1);
      if (action === 'remove') this.#cart.remove(key);
    });

    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      this.#toggleDrawer(false);
      this.#closeCheckout();
    });
  }

  // ── Catálogo ────────────────────────────────────────────────────
  #renderFilters() {
    const cats = ['Todos', ...new Set(this.#catalog.map(p => p.category))];
    this.$('filters').innerHTML = cats.map(c =>
      `<button class="shop-chip ${c === this.#category ? 'active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join('');
  }

  #visibleProducts() {
    const list = this.#catalog.filter(p => this.#category === 'Todos' || p.category === this.#category);
    const sorters = {
      'price-asc':  (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'name':       (a, b) => a.name.localeCompare(b.name, 'es')
    };
    if (sorters[this.#sort]) list.sort(sorters[this.#sort]);
    return list;
  }

  #renderProducts() {
    const list = this.#visibleProducts();
    if (!list.length) {
      this.$('productGrid').innerHTML = '<div class="shop-state">No hay productos en esta categoría.</div>';
      return;
    }
    this.$('productGrid').innerHTML = list.map(p => `
      <article class="product-card" data-id="${esc(p.id)}">
        <div class="product-visual">
          ${p.badge ? `<span class="product-badge">${esc(p.badge)}</span>` : ''}
          <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" width="400" height="300">
        </div>
        <div class="product-body">
          <div class="product-cat">${esc(p.category)}</div>
          <h3 class="product-name">${esc(p.name)}</h3>
          <p class="product-desc">${esc(p.desc)}</p>
          <div class="product-price">${p.priceLabel}</div>
          <div class="product-actions">
            ${p.hasSizes ? `
              <select class="shop-size" aria-label="Talle de ${esc(p.name)}">
                ${p.sizes.map((s, i) => `<option value="${esc(s)}" ${i === 1 ? 'selected' : ''}>${esc(s)}</option>`).join('')}
              </select>` : ''}
            <button class="product-add">Agregar</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  // ── Carrito ─────────────────────────────────────────────────────
  #renderCart() {
    const count = this.#cart.count;
    this.$('cartCount').textContent = count;
    this.$('drawerTotal').textContent = money.format(this.#cart.total);
    this.$('drawerFoot').style.display = this.#cart.isEmpty ? 'none' : 'block';

    if (this.#cart.isEmpty) {
      this.$('drawerBody').innerHTML = `
        <div class="drawer-empty">
          <span class="big">🛒</span>
          Tu carrito está vacío.<br>Agregá algo del catálogo para empezar.
        </div>`;
      return;
    }

    this.$('drawerBody').innerHTML = this.#cart.items.map(it => `
      <div class="cart-line">
        <img class="cart-thumb" src="${esc(it.product.image)}" alt="${esc(it.product.name)}">
        <div class="cart-info">
          <div class="cart-name">${esc(it.product.name)}</div>
          <div class="cart-meta">${it.size ? 'Talle ' + esc(it.size) + ' · ' : ''}${it.product.priceLabel} c/u</div>
          <div class="cart-qty">
            <button data-action="dec" data-key="${esc(it.key)}" aria-label="Quitar uno">−</button>
            <span>${it.qty}</span>
            <button data-action="inc" data-key="${esc(it.key)}" aria-label="Agregar uno">+</button>
          </div>
        </div>
        <div class="cart-side">
          <div class="cart-price">${money.format(it.subtotal)}</div>
          <button class="cart-remove" data-action="remove" data-key="${esc(it.key)}">Quitar</button>
        </div>
      </div>
    `).join('');
  }

  #toggleDrawer(open) {
    this.$('drawer').classList.toggle('open', open);
    this.$('drawerOverlay').classList.toggle('open', open);
    this.$('drawer').setAttribute('aria-hidden', String(!open));
  }

  // ── Checkout ────────────────────────────────────────────────────
  #openCheckout() {
    if (this.#cart.isEmpty) return;
    this.#toggleDrawer(false);

    const rows = this.#cart.items.map(it => `
      <div class="row">
        <span>${it.qty} × ${esc(it.product.name)}${it.size ? ' (' + esc(it.size) + ')' : ''}</span>
        <span>${money.format(it.subtotal)}</span>
      </div>`).join('');
    this.$('checkoutSummary').innerHTML =
      rows + `<div class="row total"><span>Total</span><span>${money.format(this.#cart.total)}</span></div>`;

    this.$('checkoutError').textContent = '';
    this.$('checkoutForm').style.display = 'block';
    this.$('checkoutDone').style.display = 'none';
    this.$('checkoutOverlay').style.display = 'flex';
  }

  #closeCheckout() {
    this.$('checkoutOverlay').style.display = 'none';
  }

  async #submitOrder() {
    const customer = {
      name:    this.$('coName').value.trim(),
      email:   this.$('coEmail').value.trim(),
      address: this.$('coAddress').value.trim()
    };
    const errorBox = this.$('checkoutError');
    const btn = this.$('confirmBtn');
    errorBox.textContent = '';

    if (!customer.name || !customer.email || !customer.address) {
      errorBox.textContent = 'Completá todos los campos.';
      return;
    }

    // Si hay sesión iniciada, el pedido queda asociado a la cuenta
    const headers = { 'Content-Type': 'application/json' };
    try {
      const user = JSON.parse(sessionStorage.getItem('gq_user') || 'null');
      if (user?.token) headers.Authorization = `Bearer ${user.token}`;
    } catch {}

    btn.disabled = true;
    btn.textContent = 'Enviando...';
    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ customer, items: this.#cart.toOrderItems() })
      });
      const data = await res.json();
      if (!res.ok) {
        errorBox.textContent = data.error || 'No se pudo procesar el pedido.';
        return;
      }

      this.$('doneText').innerHTML =
        `Tu pedido <strong>#${Number(data.orderId)}</strong> por <strong>${money.format(data.total)}</strong> quedó registrado.<br>` +
        `Te escribimos a <strong>${esc(customer.email)}</strong> para coordinar el pago y el envío.`;
      this.$('checkoutForm').style.display = 'none';
      this.$('checkoutDone').style.display = 'block';
      this.#cart.clear();
    } catch {
      errorBox.textContent = 'No pudimos conectar con el servidor. Para confirmar el pedido tiene que estar encendido (npm start). Tu carrito sigue guardado.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Confirmar pedido';
    }
  }

  // ── Aviso emergente ─────────────────────────────────────────────
  #toast(message, isError = false) {
    const el = this.$('toast');
    el.textContent = message;
    el.classList.toggle('error', isError);
    el.classList.add('show');
    clearTimeout(this.#toastTimer);
    this.#toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }
}

document.addEventListener('DOMContentLoaded', () => new Shop().init());
