// =====================================================================
// CATÁLOGO DE LA TIENDA — única fuente de datos de productos
// =====================================================================
// Lo usan los dos lados:
//   · el navegador (lo carga tienda.html como <script>, sin necesitar servidor)
//   · el servidor (server.js lo importa con require para calcular los totales)
// Los precios están en pesos argentinos. Las imágenes viven en public/img/.
const PRODUCTS = [
  {
    id: 'remera-logo', image: 'img/remera-logo.svg',
    name: 'Remera ILOVEJUEGUITOS', category: 'Ropa', price: 18000,
    badge: 'Más vendido',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Algodón peinado 100%, estampa del logo en pecho.'
  },
  {
    id: 'buzo-player', image: 'img/buzo-player.svg',
    name: 'Buzo Player One', category: 'Ropa', price: 42000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Hoodie frisado con capucha y bolsillo canguro.'
  },
  {
    id: 'gorra-pixel', image: 'img/gorra-pixel.svg',
    name: 'Gorra Pixel', category: 'Ropa', price: 14500,
    badge: 'Nuevo',
    desc: 'Visera curva, bordado pixel art, talle ajustable.'
  },
  {
    id: 'medias-combo', image: 'img/medias-combo.svg',
    name: 'Medias Gamer (x3)', category: 'Ropa', price: 9500,
    sizes: ['36-39', '40-44'],
    desc: 'Pack de tres pares con diseños retro.'
  },
  {
    id: 'mousepad-xl', image: 'img/mousepad-xl.svg',
    name: 'Mousepad XL', category: 'Escritorio', price: 21000,
    badge: 'Más vendido',
    desc: '90x40 cm, base antideslizante y bordes cosidos.'
  },
  {
    id: 'taza-respawn', image: 'img/taza-respawn.svg',
    name: 'Taza Respawn', category: 'Escritorio', price: 8500,
    desc: 'Cerámica de 350 ml, apta lavavajillas.'
  },
  {
    id: 'lampara-neon', image: 'img/lampara-neon.svg',
    name: 'Lámpara Neón LED', category: 'Escritorio', price: 27500,
    desc: 'Cartel luminoso USB para tu setup.'
  },
  {
    id: 'soporte-joy', image: 'img/soporte-joy.svg',
    name: 'Soporte de Joystick', category: 'Escritorio', price: 16000,
    desc: 'Soporte de acrílico para guardar tu control.'
  },
  {
    id: 'mochila-loot', image: 'img/mochila-loot.svg',
    name: 'Mochila Loot', category: 'Accesorios', price: 38000,
    desc: 'Compartimento acolchado para notebook de 15,6".'
  },
  {
    id: 'stickers-pack', image: 'img/stickers-pack.svg',
    name: 'Pack de Stickers (x20)', category: 'Accesorios', price: 4500,
    badge: 'Nuevo',
    desc: 'Vinilo resistente al agua, ideal para tu notebook.'
  },
  {
    id: 'llavero-heart', image: 'img/llavero-heart.svg',
    name: 'Llavero Corazón 8-bit', category: 'Accesorios', price: 3500,
    desc: 'Acrílico impreso doble faz con anilla metálica.'
  },
  {
    id: 'poster-quest', image: 'img/poster-quest.svg',
    name: 'Póster Quest A2', category: 'Accesorios', price: 7000,
    desc: 'Impresión en papel mate de 200 g.'
  }
];

if (typeof module !== 'undefined' && module.exports) module.exports = PRODUCTS;
