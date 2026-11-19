const express    = require('express');
const mysql      = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors       = require('cors');
const crypto     = require('crypto');

const app  = express();
const PORT = 3000;

// ── Middleware ───────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.static('public'));   // sirve index.html, style.css, script.js

// ── Conexión MySQL ───────────────────────────────────────────
// Cambiá estos valores por los de tu MySQL local
const DB_CONFIG = {
  host:     'localhost',
  user:     'root',        // tu usuario de MySQL
  password: '1234',            // tu contraseña de MySQL
  database: 'gamequest'
};

let db;

async function initDB() {
  // Primero conectamos sin base de datos para crearla si no existe
  const tmpConn = await mysql.createConnection({
    host:     DB_CONFIG.host,
    user:     DB_CONFIG.user,
    password: DB_CONFIG.password
  });

  await tmpConn.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\``);
  await tmpConn.end();

  // Ahora conectamos a la base
  db = await mysql.createPool(DB_CONFIG);

  // Crear tablas
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      username   VARCHAR(50)  NOT NULL UNIQUE,
      email      VARCHAR(100) NOT NULL UNIQUE,
      password   CHAR(64)     NOT NULL,        -- SHA-256 hex
      created_at DATETIME     DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS quiz_history (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      user_id    INT          NOT NULL,
      profile    VARCHAR(100) NOT NULL,
      answers    JSON         NOT NULL,
      results    JSON         NOT NULL,          -- top 6 juegos
      created_at DATETIME     DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      user_id    INT          NULL,
      name       VARCHAR(100) NOT NULL,
      email      VARCHAR(100) NOT NULL,
      address    VARCHAR(255) NOT NULL,
      items      JSON         NOT NULL,
      total      INT          NOT NULL,          -- en pesos
      created_at DATETIME     DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  console.log('✅  Base de datos lista');
}

// ── Helpers ──────────────────────────────────────────────────
function hashPassword(plain) {
  return crypto.createHash('sha256').update(plain).digest('hex');
}

// Simple "token" = base64(userId:username:timestamp) — para producción usá JWT
function makeToken(userId, username) {
  const payload = `${userId}:${username}:${Date.now()}`;
  return Buffer.from(payload).toString('base64');
}

function parseToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [userId, username] = decoded.split(':');
    return { userId: parseInt(userId), username };
  } catch {
    return null;
  }
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '').trim();
  const user  = parseToken(token);
  if (!user) return res.status(401).json({ error: 'No autenticado' });
  req.user = user;
  next();
}

// ── Rutas: Auth ──────────────────────────────────────────────

// POST /api/register
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'Faltan campos obligatorios' });

  try {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username.trim(), email.trim().toLowerCase(), hashPassword(password)]
    );
    const token = makeToken(result.insertId, username);
    res.json({ ok: true, token, username });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ error: 'Usuario o email ya registrado' });
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Faltan campos' });

  try {
    const [rows] = await db.execute(
      'SELECT id, username FROM users WHERE email = ? AND password = ?',
      [email.trim().toLowerCase(), hashPassword(password)]
    );
    if (!rows.length)
      return res.status(401).json({ error: 'Credenciales incorrectas' });

    const { id, username } = rows[0];
    res.json({ ok: true, token: makeToken(id, username), username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ── Rutas: Historial ─────────────────────────────────────────

// POST /api/history  — guarda un resultado de quiz
app.post('/api/history', authMiddleware, async (req, res) => {
  const { profile, answers, results } = req.body;
  if (!profile || !answers || !results)
    return res.status(400).json({ error: 'Datos incompletos' });

  try {
    await db.execute(
      'INSERT INTO quiz_history (user_id, profile, answers, results) VALUES (?, ?, ?, ?)',
      [req.user.userId, profile, JSON.stringify(answers), JSON.stringify(results)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar' });
  }
});

// GET /api/history  — devuelve el historial del usuario autenticado
app.get('/api/history', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, profile, answers, results, created_at
       FROM quiz_history
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 20`,
      [req.user.userId]
    );
    res.json({ ok: true, history: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

// DELETE /api/history/:id  — borra una entrada del historial
app.delete('/api/history/:id', authMiddleware, async (req, res) => {
  try {
    await db.execute(
      'DELETE FROM quiz_history WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// ── Rutas: Tienda ────────────────────────────────────────────

// El catálogo está en public/productos.js. Aunque el navegador también lo lee para
// mostrarlo, el total de un pedido se recalcula SIEMPRE acá con estos precios.
const PRODUCTS = require('./public/productos.js');   // catálogo compartido con el front

const MAX_QTY_PER_ITEM = 10;

// Si viene un token válido asocia el pedido al usuario; si no, compra como invitado.
function optionalUser(req) {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  const user  = token ? parseToken(token) : null;
  return user && Number.isInteger(user.userId) ? user : null;
}

// GET /api/products
app.get('/api/products', (req, res) => {
  res.json({ ok: true, products: PRODUCTS });
});

// POST /api/orders  — { customer: {name,email,address}, items: [{id,qty,size?}] }
app.post('/api/orders', async (req, res) => {
  const { customer, items } = req.body || {};

  const name    = String(customer?.name    || '').trim();
  const email   = String(customer?.email   || '').trim().toLowerCase();
  const address = String(customer?.address || '').trim();

  if (name.length < 2 || name.length > 100)
    return res.status(400).json({ error: 'Ingresá tu nombre' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 100)
    return res.status(400).json({ error: 'Email inválido' });
  if (address.length < 6 || address.length > 255)
    return res.status(400).json({ error: 'Ingresá una dirección de envío válida' });
  if (!Array.isArray(items) || !items.length || items.length > 50)
    return res.status(400).json({ error: 'El carrito está vacío' });

  // Reconstruimos cada línea desde el catálogo del servidor
  const lines = [];
  let total = 0;
  for (const it of items) {
    const product = PRODUCTS.find(p => p.id === it?.id);
    const qty     = Number(it?.qty);
    if (!product)
      return res.status(400).json({ error: 'Producto inexistente' });
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_ITEM)
      return res.status(400).json({ error: `Cantidad inválida para ${product.name}` });
    if (product.sizes && !product.sizes.includes(it.size))
      return res.status(400).json({ error: `Elegí un talle para ${product.name}` });

    lines.push({ id: product.id, name: product.name, size: it.size || null, qty, unitPrice: product.price });
    total += product.price * qty;
  }

  try {
    // Solo asociamos el pedido a un usuario que realmente exista
    let userId = null;
    const user = optionalUser(req);
    if (user) {
      const [rows] = await db.execute(
        'SELECT id FROM users WHERE id = ? AND username = ?', [user.userId, user.username]
      );
      if (rows.length) userId = rows[0].id;
    }
    const [result] = await db.execute(
      'INSERT INTO orders (user_id, name, email, address, items, total) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, name, email, address, JSON.stringify(lines), total]
    );
    res.json({ ok: true, orderId: result.insertId, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo registrar el pedido' });
  }
});

// ── Inicio ───────────────────────────────────────────────────
initDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀  Servidor corriendo en http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌  No se pudo conectar a MySQL:', err.message);
    process.exit(1);
  });
