// =====================================================================
// PREGUNTAS
// =====================================================================
const QUESTIONS = [
  {
    id: 'criticas',
    text: '¿Qué tan importante son las críticas y puntuaciones para elegir un juego?',
    type: 'single',
    options: ['Muy importante','Importante','Moderado','No me importa'],
    cols: 2
  },
  {
    id: 'pc',
    text: '¿Cuál es la potencia de tu PC?',
    type: 'single',
    options: ['Muy bajo','Bajo','Medio','Alto','Muy alto','Ultra'],
    cols: 3
  },
  {
    id: 'generos',
    text: '¿Qué géneros te gustan? Puedes elegir varios.',
    type: 'multi',
    options: ['FPS','Aventura','Mundo Abierto','RPG','Estrategia','Terror','Survival','Simulación','Carreras','Deportes','Roguelike','Plataformas','Puzzle','MMORPG','Cooperativo','Competitivo'],
    cols: 3
  },
  {
    id: 'estilo',
    text: '¿Cuál es tu estilo artístico favorito?',
    type: 'single',
    options: ['Realista','Cartoon','Pixel Art','Low Poly','Anime','Artístico','No me importa'],
    cols: 3
  },
  {
    id: 'dificultad',
    text: '¿Qué nivel de dificultad prefieres?',
    type: 'single',
    options: ['Muy baja','Baja','Regular','Alta','Muy alta','Extrema'],
    cols: 3
  },
  {
    id: 'modo',
    text: '¿Cómo prefieres jugar?',
    type: 'single',
    options: ['Solo','Cooperativo','Multijugador online','Me adapto'],
    cols: 2
  },
  {
    id: 'competitivo',
    text: '¿Qué tan competitivo eres?',
    type: 'single',
    options: ['Muy competitivo','Algo competitivo','Casual','Indiferente'],
    cols: 2
  },
  {
    id: 'presupuesto',
    text: '¿Cuál es tu presupuesto para un juego?',
    type: 'single',
    options: ['Gratis','Hasta 10 USD','Hasta 30 USD','Hasta 60 USD','Hasta 100 USD','Sin límite'],
    cols: 2
  }
];

// =====================================================================
// BASE DE DATOS (85 juegos)
// =====================================================================
const GAMES = [
  // ---- RPG / Mundo abierto ----
  {titulo:'The Witcher 3',generos:['RPG','Mundo Abierto','Aventura'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:29,pc:'Medio',meta:92},
  {titulo:'Cyberpunk 2077',generos:['RPG','Mundo Abierto','FPS'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:39,pc:'Alto',meta:86},
  {titulo:'Elden Ring',generos:['RPG','Aventura'],estilo:'Realista',dificultad:'Extrema',modo:'Solo',competitivo:false,precio:59,pc:'Medio',meta:96},
  {titulo:'Baldur\'s Gate 3',generos:['RPG','Estrategia','Cooperativo'],estilo:'Realista',dificultad:'Alta',modo:'Solo',competitivo:false,precio:59,pc:'Medio',meta:96},
  {titulo:'Skyrim',generos:['RPG','Mundo Abierto','Aventura'],estilo:'Realista',dificultad:'Baja',modo:'Solo',competitivo:false,precio:19,pc:'Bajo',meta:94},
  {titulo:'Red Dead Redemption 2',generos:['Mundo Abierto','Aventura'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:39,pc:'Alto',meta:97},
  {titulo:'Persona 5 Royal',generos:['RPG'],estilo:'Anime',dificultad:'Regular',modo:'Solo',competitivo:false,precio:39,pc:'Bajo',meta:95},
  {titulo:'Dragon Age Inquisition',generos:['RPG','Mundo Abierto'],estilo:'Realista',dificultad:'Alta',modo:'Solo',competitivo:false,precio:19,pc:'Medio',meta:85},
  {titulo:'Divinity Original Sin 2',generos:['RPG','Estrategia','Cooperativo'],estilo:'Artístico',dificultad:'Alta',modo:'Solo',competitivo:false,precio:39,pc:'Medio',meta:93},
  {titulo:'Monster Hunter Wilds',generos:['RPG','Aventura','Cooperativo'],estilo:'Realista',dificultad:'Alta',modo:'Solo',competitivo:false,precio:59,pc:'Alto',meta:91},
  {titulo:'Dark Souls III',generos:['RPG','Aventura'],estilo:'Realista',dificultad:'Muy alta',modo:'Solo',competitivo:false,precio:29,pc:'Medio',meta:89},
  {titulo:'Final Fantasy XVI',generos:['RPG','Aventura'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:59,pc:'Alto',meta:87},
  {titulo:'Sekiro',generos:['RPG','Aventura'],estilo:'Artístico',dificultad:'Extrema',modo:'Solo',competitivo:false,precio:49,pc:'Medio',meta:90},
  {titulo:'Ghost of Tsushima',generos:['Mundo Abierto','Aventura','RPG'],estilo:'Artístico',dificultad:'Regular',modo:'Solo',competitivo:false,precio:49,pc:'Medio',meta:83},
  {titulo:'Horizon Forbidden West',generos:['Mundo Abierto','Aventura','RPG'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:49,pc:'Alto',meta:88},

  // ---- FPS / Shooter ----
  {titulo:'Valorant',generos:['FPS','Competitivo'],estilo:'Cartoon',dificultad:'Alta',modo:'Multijugador online',competitivo:true,precio:0,pc:'Bajo',meta:80},
  {titulo:'Counter-Strike 2',generos:['FPS','Competitivo'],estilo:'Realista',dificultad:'Muy alta',modo:'Multijugador online',competitivo:true,precio:0,pc:'Bajo',meta:84},
  {titulo:'Overwatch 2',generos:['FPS','Competitivo','Cooperativo'],estilo:'Cartoon',dificultad:'Regular',modo:'Multijugador online',competitivo:true,precio:0,pc:'Bajo',meta:75},
  {titulo:'Apex Legends',generos:['FPS','Competitivo','Survival'],estilo:'Realista',dificultad:'Alta',modo:'Multijugador online',competitivo:true,precio:0,pc:'Medio',meta:82},
  {titulo:'Call of Duty Warzone',generos:['FPS','Competitivo'],estilo:'Realista',dificultad:'Alta',modo:'Multijugador online',competitivo:true,precio:0,pc:'Medio',meta:78},
  {titulo:'Halo Infinite',generos:['FPS','Competitivo','Cooperativo'],estilo:'Realista',dificultad:'Regular',modo:'Multijugador online',competitivo:true,precio:0,pc:'Medio',meta:87},
  {titulo:'Doom Eternal',generos:['FPS','Aventura'],estilo:'Artístico',dificultad:'Muy alta',modo:'Solo',competitivo:false,precio:29,pc:'Medio',meta:88},
  {titulo:'Titanfall 2',generos:['FPS','Aventura'],estilo:'Realista',dificultad:'Alta',modo:'Solo',competitivo:false,precio:19,pc:'Bajo',meta:89},
  {titulo:'Bioshock Infinite',generos:['FPS','Aventura'],estilo:'Artístico',dificultad:'Regular',modo:'Solo',competitivo:false,precio:19,pc:'Bajo',meta:94},
  {titulo:'Deep Rock Galactic',generos:['FPS','Cooperativo','Survival'],estilo:'Cartoon',dificultad:'Regular',modo:'Cooperativo',competitivo:false,precio:29,pc:'Bajo',meta:91},

  // ---- Acción / Aventura ----
  {titulo:'God of War Ragnarök',generos:['Aventura','RPG'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:49,pc:'Alto',meta:94},
  {titulo:'Spider-Man 2',generos:['Mundo Abierto','Aventura'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:49,pc:'Alto',meta:90},
  {titulo:'Batman Arkham Knight',generos:['Mundo Abierto','Aventura'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:19,pc:'Medio',meta:87},
  {titulo:'Resident Evil 4 Remake',generos:['Terror','Aventura'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:49,pc:'Medio',meta:93},
  {titulo:'Alan Wake 2',generos:['Terror','Aventura'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:49,pc:'Alto',meta:89},
  {titulo:'Control',generos:['Aventura','Acción'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:29,pc:'Medio',meta:82},
  {titulo:'Disco Elysium',generos:['RPG','Aventura'],estilo:'Artístico',dificultad:'Baja',modo:'Solo',competitivo:false,precio:29,pc:'Bajo',meta:97},
  {titulo:'Outer Wilds',generos:['Aventura','Puzzle'],estilo:'Low Poly',dificultad:'Alta',modo:'Solo',competitivo:false,precio:24,pc:'Bajo',meta:85},

  // ---- Indie / Plataformas ----
  {titulo:'Hollow Knight',generos:['Aventura','Plataformas'],estilo:'Artístico',dificultad:'Alta',modo:'Solo',competitivo:false,precio:14,pc:'Bajo',meta:90},
  {titulo:'Celeste',generos:['Plataformas','Puzzle'],estilo:'Pixel Art',dificultad:'Muy alta',modo:'Solo',competitivo:false,precio:19,pc:'Muy bajo',meta:94},
  {titulo:'Hades',generos:['Roguelike','Aventura'],estilo:'Artístico',dificultad:'Alta',modo:'Solo',competitivo:false,precio:24,pc:'Bajo',meta:93},
  {titulo:'Hades II',generos:['Roguelike','Aventura'],estilo:'Artístico',dificultad:'Alta',modo:'Solo',competitivo:false,precio:29,pc:'Bajo',meta:91},
  {titulo:'Cuphead',generos:['Plataformas','Aventura'],estilo:'Cartoon',dificultad:'Muy alta',modo:'Solo',competitivo:false,precio:19,pc:'Muy bajo',meta:88},
  {titulo:'Ori and the Will of the Wisps',generos:['Plataformas','Aventura'],estilo:'Artístico',dificultad:'Regular',modo:'Solo',competitivo:false,precio:24,pc:'Bajo',meta:93},
  {titulo:'Undertale',generos:['RPG','Aventura'],estilo:'Pixel Art',dificultad:'Baja',modo:'Solo',competitivo:false,precio:9,pc:'Muy bajo',meta:92},
  {titulo:'Dead Cells',generos:['Roguelike','Plataformas'],estilo:'Pixel Art',dificultad:'Alta',modo:'Solo',competitivo:false,precio:24,pc:'Muy bajo',meta:91},
  {titulo:'Shovel Knight',generos:['Plataformas','Aventura'],estilo:'Pixel Art',dificultad:'Regular',modo:'Solo',competitivo:false,precio:24,pc:'Muy bajo',meta:90},
  {titulo:'Inscryption',generos:['Roguelike','Puzzle','Estrategia'],estilo:'Artístico',dificultad:'Alta',modo:'Solo',competitivo:false,precio:19,pc:'Muy bajo',meta:90},

  // ---- Survival / Sandbox ----
  {titulo:'Minecraft',generos:['Survival','Mundo Abierto','Cooperativo'],estilo:'Pixel Art',dificultad:'Baja',modo:'Solo',competitivo:false,precio:29,pc:'Bajo',meta:93},
  {titulo:'Terraria',generos:['Survival','Aventura','Cooperativo'],estilo:'Pixel Art',dificultad:'Regular',modo:'Solo',competitivo:false,precio:9,pc:'Muy bajo',meta:85},
  {titulo:'Valheim',generos:['Survival','Mundo Abierto','Cooperativo'],estilo:'Low Poly',dificultad:'Regular',modo:'Cooperativo',competitivo:false,precio:19,pc:'Bajo',meta:86},
  {titulo:'Subnautica',generos:['Survival','Mundo Abierto','Aventura'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:29,pc:'Medio',meta:87},
  {titulo:'No Man\'s Sky',generos:['Survival','Mundo Abierto','Simulación','Cooperativo'],estilo:'Artístico',dificultad:'Baja',modo:'Solo',competitivo:false,precio:39,pc:'Medio',meta:78},
  {titulo:'The Forest',generos:['Survival','Terror','Cooperativo'],estilo:'Realista',dificultad:'Alta',modo:'Cooperativo',competitivo:false,precio:19,pc:'Medio',meta:78},
  {titulo:'ARK Survival Evolved',generos:['Survival','Mundo Abierto','Cooperativo'],estilo:'Realista',dificultad:'Alta',modo:'Cooperativo',competitivo:false,precio:19,pc:'Alto',meta:70},
  {titulo:'Rust',generos:['Survival','Mundo Abierto','Competitivo'],estilo:'Realista',dificultad:'Muy alta',modo:'Multijugador online',competitivo:true,precio:39,pc:'Medio',meta:75},

  // ---- Estrategia ----
  {titulo:'Civilization VI',generos:['Estrategia'],estilo:'Cartoon',dificultad:'Alta',modo:'Solo',competitivo:false,precio:29,pc:'Bajo',meta:88},
  {titulo:'Age of Empires IV',generos:['Estrategia'],estilo:'Realista',dificultad:'Alta',modo:'Solo',competitivo:false,precio:39,pc:'Medio',meta:81},
  {titulo:'RimWorld',generos:['Estrategia','Simulación','Survival'],estilo:'Pixel Art',dificultad:'Muy alta',modo:'Solo',competitivo:false,precio:34,pc:'Muy bajo',meta:89},
  {titulo:'Factorio',generos:['Estrategia','Simulación'],estilo:'Pixel Art',dificultad:'Muy alta',modo:'Solo',competitivo:false,precio:34,pc:'Bajo',meta:90},
  {titulo:'Total War Warhammer III',generos:['Estrategia','RPG'],estilo:'Realista',dificultad:'Alta',modo:'Solo',competitivo:false,precio:59,pc:'Medio',meta:80},
  {titulo:'Into the Breach',generos:['Estrategia','Roguelike','Puzzle'],estilo:'Pixel Art',dificultad:'Alta',modo:'Solo',competitivo:false,precio:14,pc:'Muy bajo',meta:90},
  {titulo:'Slay the Spire',generos:['Roguelike','Estrategia'],estilo:'Artístico',dificultad:'Alta',modo:'Solo',competitivo:false,precio:24,pc:'Muy bajo',meta:89},
  {titulo:'Starcraft II',generos:['Estrategia','Competitivo'],estilo:'Realista',dificultad:'Muy alta',modo:'Multijugador online',competitivo:true,precio:0,pc:'Bajo',meta:90},

  // ---- Multijugador / Competitivo ----
  {titulo:'League of Legends',generos:['Competitivo','MMORPG'],estilo:'Cartoon',dificultad:'Alta',modo:'Multijugador online',competitivo:true,precio:0,pc:'Bajo',meta:78},
  {titulo:'Dota 2',generos:['Competitivo','Estrategia'],estilo:'Artístico',dificultad:'Extrema',modo:'Multijugador online',competitivo:true,precio:0,pc:'Bajo',meta:90},
  {titulo:'Rocket League',generos:['Competitivo','Deportes','Cooperativo'],estilo:'Cartoon',dificultad:'Alta',modo:'Multijugador online',competitivo:true,precio:0,pc:'Bajo',meta:86},
  {titulo:'EA FC 25',generos:['Deportes','Competitivo'],estilo:'Realista',dificultad:'Regular',modo:'Multijugador online',competitivo:true,precio:59,pc:'Medio',meta:75},
  {titulo:'Fortnite',generos:['FPS','Competitivo','Survival'],estilo:'Cartoon',dificultad:'Regular',modo:'Multijugador online',competitivo:true,precio:0,pc:'Bajo',meta:81},
  {titulo:'Brawlhalla',generos:['Competitivo','Plataformas'],estilo:'Cartoon',dificultad:'Regular',modo:'Multijugador online',competitivo:true,precio:0,pc:'Muy bajo',meta:75},
  {titulo:'Mortal Kombat 1',generos:['Competitivo','Aventura'],estilo:'Realista',dificultad:'Regular',modo:'Multijugador online',competitivo:true,precio:49,pc:'Medio',meta:87},

  // ---- Cooperativo ----
  {titulo:'Helldivers 2',generos:['Cooperativo','Estrategia','FPS'],estilo:'Realista',dificultad:'Alta',modo:'Cooperativo',competitivo:false,precio:39,pc:'Medio',meta:82},
  {titulo:'Among Us',generos:['Cooperativo','Competitivo'],estilo:'Cartoon',dificultad:'Baja',modo:'Multijugador online',competitivo:true,precio:4,pc:'Muy bajo',meta:85},
  {titulo:'Left 4 Dead 2',generos:['FPS','Cooperativo','Terror'],estilo:'Realista',dificultad:'Regular',modo:'Cooperativo',competitivo:false,precio:9,pc:'Muy bajo',meta:89},
  {titulo:'Dead by Daylight',generos:['Terror','Competitivo','Cooperativo'],estilo:'Realista',dificultad:'Regular',modo:'Multijugador online',competitivo:true,precio:19,pc:'Bajo',meta:78},
  {titulo:'Phasmophobia',generos:['Terror','Cooperativo'],estilo:'Realista',dificultad:'Regular',modo:'Cooperativo',competitivo:false,precio:13,pc:'Bajo',meta:82},
  {titulo:'It Takes Two',generos:['Cooperativo','Plataformas','Aventura'],estilo:'Cartoon',dificultad:'Baja',modo:'Cooperativo',competitivo:false,precio:39,pc:'Bajo',meta:96},
  {titulo:'A Way Out',generos:['Cooperativo','Aventura'],estilo:'Realista',dificultad:'Baja',modo:'Cooperativo',competitivo:false,precio:29,pc:'Bajo',meta:78},

  // ---- Simulación ----
  {titulo:'Stardew Valley',generos:['Simulación','RPG','Cooperativo'],estilo:'Pixel Art',dificultad:'Muy baja',modo:'Solo',competitivo:false,precio:14,pc:'Muy bajo',meta:89},
  {titulo:'Cities: Skylines 2',generos:['Simulación','Estrategia'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:49,pc:'Alto',meta:71},
  {titulo:'Flight Simulator',generos:['Simulación'],estilo:'Realista',dificultad:'Muy alta',modo:'Solo',competitivo:false,precio:59,pc:'Ultra',meta:91},
  {titulo:'Euro Truck Simulator 2',generos:['Simulación','Carreras'],estilo:'Realista',dificultad:'Baja',modo:'Solo',competitivo:false,precio:19,pc:'Bajo',meta:80},

  // ---- Carreras ----
  {titulo:'Forza Horizon 5',generos:['Carreras','Mundo Abierto','Competitivo'],estilo:'Realista',dificultad:'Regular',modo:'Multijugador online',competitivo:true,precio:59,pc:'Medio',meta:92},
  {titulo:'Gran Turismo 7',generos:['Carreras','Simulación'],estilo:'Realista',dificultad:'Regular',modo:'Solo',competitivo:false,precio:59,pc:'Medio',meta:87},
  {titulo:'F1 24',generos:['Carreras','Simulación','Competitivo'],estilo:'Realista',dificultad:'Alta',modo:'Multijugador online',competitivo:true,precio:59,pc:'Medio',meta:74},

  // ---- Puzzle / Narrativa ----
  {titulo:'Portal 2',generos:['Puzzle','Cooperativo'],estilo:'Artístico',dificultad:'Regular',modo:'Solo',competitivo:false,precio:9,pc:'Muy bajo',meta:95},
  {titulo:'The Stanley Parable Ultra Deluxe',generos:['Aventura','Puzzle'],estilo:'Realista',dificultad:'Muy baja',modo:'Solo',competitivo:false,precio:19,pc:'Muy bajo',meta:84},
  {titulo:'Tunic',generos:['Aventura','Puzzle','RPG'],estilo:'Low Poly',dificultad:'Alta',modo:'Solo',competitivo:false,precio:24,pc:'Bajo',meta:86},
  {titulo:'Return of the Obra Dinn',generos:['Puzzle','Aventura'],estilo:'Artístico',dificultad:'Alta',modo:'Solo',competitivo:false,precio:19,pc:'Muy bajo',meta:87},
  {titulo:'What Remains of Edith Finch',generos:['Aventura'],estilo:'Artístico',dificultad:'Muy baja',modo:'Solo',competitivo:false,precio:14,pc:'Bajo',meta:88},
  {titulo:'Firewatch',generos:['Aventura'],estilo:'Artístico',dificultad:'Muy baja',modo:'Solo',competitivo:false,precio:19,pc:'Bajo',meta:81},

  // ---- MMORPG / Online masivo ----
  {titulo:'Final Fantasy XIV',generos:['MMORPG','RPG','Cooperativo'],estilo:'Anime',dificultad:'Regular',modo:'Multijugador online',competitivo:false,precio:14,pc:'Bajo',meta:90},
  {titulo:'World of Warcraft',generos:['MMORPG','RPG','Cooperativo'],estilo:'Cartoon',dificultad:'Regular',modo:'Multijugador online',competitivo:false,precio:14,pc:'Bajo',meta:91},
  {titulo:'Guild Wars 2',generos:['MMORPG','RPG','Cooperativo'],estilo:'Artístico',dificultad:'Regular',modo:'Multijugador online',competitivo:false,precio:0,pc:'Bajo',meta:90},
  {titulo:'Genshin Impact',generos:['RPG','Mundo Abierto','MMORPG'],estilo:'Anime',dificultad:'Baja',modo:'Solo',competitivo:false,precio:0,pc:'Bajo',meta:84},
  {titulo:'Warframe',generos:['FPS','RPG','Cooperativo'],estilo:'Realista',dificultad:'Regular',modo:'Cooperativo',competitivo:false,precio:0,pc:'Bajo',meta:79},
  {titulo:'Path of Exile',generos:['RPG','Roguelike'],estilo:'Realista',dificultad:'Muy alta',modo:'Solo',competitivo:false,precio:0,pc:'Bajo',meta:86},
];

// =====================================================================
// ESTADO
// =====================================================================
let currentQ = 0;
let answers = {};

// PC levels (ordered)
const PC_LEVELS = ['Muy bajo','Bajo','Medio','Alto','Muy alto','Ultra'];
const DIFF_LEVELS = ['Muy baja','Baja','Regular','Alta','Muy alta','Extrema'];
const BUDGET_MAP = {'Gratis':0,'Hasta 10 USD':10,'Hasta 30 USD':30,'Hasta 60 USD':60,'Hasta 100 USD':100,'Sin límite':9999};

// =====================================================================
// ALGORITMO DE COMPATIBILIDAD
// =====================================================================
function scoreGame(game, ans) {
  let score = 0;

  // 1) Géneros (+20 por coincidencia)
  const userGeneros = ans.generos || [];
  game.generos.forEach(g => {
    if (userGeneros.includes(g)) score += 20;
  });

  // 2) Estilo artístico (+10)
  if (ans.estilo === 'No me importa' || ans.estilo === game.estilo) score += 10;

  // 3) Dificultad (+10 exacto, +5 cercano)
  const uDiff = DIFF_LEVELS.indexOf(ans.dificultad);
  const gDiff = DIFF_LEVELS.indexOf(game.dificultad);
  if (uDiff === gDiff) score += 10;
  else if (Math.abs(uDiff - gDiff) === 1) score += 5;

  // 4) Modo de juego (+15)
  if (ans.modo === 'Me adapto') {
    score += 10;
  } else if (ans.modo === 'Solo' && game.modo === 'Solo') score += 15;
  else if (ans.modo === 'Cooperativo' && game.modo === 'Cooperativo') score += 15;
  else if (ans.modo === 'Multijugador online' && game.modo === 'Multijugador online') score += 15;

  // 5) Competitividad (+15)
  const userComp = ans.competitivo;
  if (userComp === 'Muy competitivo' || userComp === 'Algo competitivo') {
    if (game.competitivo) score += 15;
  } else if (userComp === 'Casual' || userComp === 'Indiferente') {
    if (!game.competitivo) score += 10;
    else score += 3;
  }

  // 6) Presupuesto
  const budget = BUDGET_MAP[ans.presupuesto] ?? 9999;
  if (game.precio <= budget) score += 10;
  else score -= 20;

  // 7) Potencia PC
  const uPcIdx = PC_LEVELS.indexOf(ans.pc);
  const gPcIdx = PC_LEVELS.indexOf(game.pc);
  if (uPcIdx >= gPcIdx) score += 15;
  else score -= 50;

  // 8) Críticas
  const criticas = ans.criticas;
  if (criticas === 'Muy importante') {
    if (game.meta >= 90) score += 15;
    else if (game.meta >= 80) score += 10;
    else if (game.meta >= 70) score += 5;
    else score -= 5;
  } else if (criticas === 'Importante') {
    if (game.meta >= 90) score += 10;
    else if (game.meta >= 80) score += 6;
    else if (game.meta >= 70) score += 2;
  } else if (criticas === 'Moderado') {
    if (game.meta >= 85) score += 5;
  }

  return score;
}

function getMaxPossible() {
  // géneros (máx 3 coincidencias) + estilo + dificultad + modo + competitivo + presupuesto + pc + criticas
  return 3*20 + 10 + 10 + 15 + 15 + 10 + 15 + 15;
}

function calcResults() {
  const maxScore = getMaxPossible();
  return GAMES.map(g => {
    const raw = scoreGame(g, answers);
    const pct = Math.round(Math.max(0, Math.min(100, (raw / maxScore) * 100)));
    return { ...g, score: raw, pct };
  }).sort((a,b) => b.score - a.score).slice(0, 6);
}

// =====================================================================
// PERFIL DE JUGADOR
// =====================================================================
function getProfile() {
  const g = answers.generos || [];
  const comp = answers.competitivo;
  const modo = answers.modo;
  const diff = answers.dificultad;

  if (['Muy alta','Extrema'].includes(diff) && (comp === 'Muy competitivo' || comp === 'Algo competitivo')) return {name:'⚔️ Competidor Hardcore', icon:'⚔️'};
  if (g.includes('RPG') && g.includes('Mundo Abierto')) return {name:'🗺️ Coleccionista de Mundos Abiertos', icon:'🗺️'};
  if (g.includes('RPG') && (g.includes('Aventura') || g.includes('Puzzle'))) return {name:'📖 Explorador Narrativo', icon:'📖'};
  if (g.includes('RPG') && !g.includes('FPS')) return {name:'🏰 Fanático del RPG', icon:'🏰'};
  if ((comp === 'Muy competitivo' || comp === 'Algo competitivo') && (g.includes('FPS') || g.includes('Competitivo'))) return {name:'🎯 Francotirador Competitivo', icon:'🎯'};
  if (g.includes('Estrategia')) return {name:'🧠 Estratega Maestro', icon:'🧠'};
  if (g.includes('Terror') || g.includes('Survival')) return {name:'💀 Superviviente', icon:'💀'};
  if (g.includes('Simulación') || g.includes('Carreras')) return {name:'🚗 Simulador de Élite', icon:'🚗'};
  if (modo === 'Cooperativo' || g.includes('Cooperativo')) return {name:'🤝 Jugador Social', icon:'🤝'};
  if (g.includes('Roguelike') || ['Alta','Muy alta','Extrema'].includes(diff)) return {name:'🔥 Cazador de Desafíos', icon:'🔥'};
  if (g.includes('Plataformas') || g.includes('Puzzle')) return {name:'🧩 Puzzle Master', icon:'🧩'};
  if (['Muy baja','Baja'].includes(diff) && comp === 'Casual') return {name:'🌟 Aventurero Casual', icon:'🌟'};
  return {name:'🎮 Jugador Versátil', icon:'🎮'};
}

// =====================================================================
// RENDERIZADO DEL QUIZ
// =====================================================================
function renderQuestion() {
  const q = QUESTIONS[currentQ];
  const pct = Math.round((currentQ / QUESTIONS.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `Pregunta ${currentQ + 1} de ${QUESTIONS.length}`;
  document.getElementById('progressPct').textContent = pct + '%';

  const ans = answers[q.id];

  const isMulti = q.type === 'multi';
  const selected = isMulti ? (Array.isArray(ans) ? ans : []) : ans;

  const colsClass = q.cols === 3 ? 'cols-3' : q.cols === 2 ? 'cols-2' : '';

  const card = document.getElementById('quizCard');
  card.innerHTML = `
    <div class="q-number">Pregunta ${currentQ + 1} / ${QUESTIONS.length}</div>
    <div class="q-text">${q.text}</div>
    ${isMulti ? '<div class="multi-hint">✦ Selección múltiple permitida</div>' : ''}
    <div class="options-grid ${colsClass}" id="optGrid">
      ${q.options.map(opt => {
        const isSel = isMulti ? selected.includes(opt) : selected === opt;
        return `<button class="opt-btn ${isSel ? 'selected' : ''}" onclick="selectOpt('${opt.replace(/'/g,"\\'")}')">
          <span class="check">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          ${opt}
        </button>`;
      }).join('')}
    </div>
    <div class="quiz-nav">
      <button class="btn-ghost" onclick="prevQ()" ${currentQ === 0 ? 'style="visibility:hidden"' : ''}>← Anterior</button>
      <button class="btn-next" id="btnNext" onclick="nextQ()" ${!ans && !(Array.isArray(ans) && ans.length) ? 'disabled' : ''}>
        ${currentQ === QUESTIONS.length - 1 ? 'Ver resultados' : 'Siguiente'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  `;
}

function selectOpt(opt) {
  const q = QUESTIONS[currentQ];
  if (q.type === 'multi') {
    let arr = Array.isArray(answers[q.id]) ? [...answers[q.id]] : [];
    if (arr.includes(opt)) arr = arr.filter(x => x !== opt);
    else arr.push(opt);
    answers[q.id] = arr;
  } else {
    answers[q.id] = opt;
  }
  renderQuestion();
}

function nextQ() {
  const q = QUESTIONS[currentQ];
  const ans = answers[q.id];
  const valid = q.type === 'multi' ? (Array.isArray(ans) && ans.length > 0) : !!ans;
  if (!valid) return;
  if (currentQ === QUESTIONS.length - 1) {
    showLoading();
    return;
  }
  currentQ++;
  renderQuestion();
}

function prevQ() {
  if (currentQ > 0) { currentQ--; renderQuestion(); }
}

// =====================================================================
// NAVEGACIÓN
// =====================================================================
function show(id) {
  ['landing','quiz','loading','results'].forEach(s => {
    const el = document.getElementById(s);
    el.style.display = 'none';
    el.classList.remove('active');
  });
  const target = document.getElementById(id);
  target.style.display = 'flex';
  target.classList.add('active');
}

function startQuiz() {
  currentQ = 0;
  answers = {};
  show('quiz');
  renderQuestion();
  window.scrollTo({top:0});
}

function showLoading() {
  show('loading');
  const msgs = [
    'Analizando tu perfil de jugador...',
    'Calculando compatibilidad con 85 juegos...',
    'Construyendo tus recomendaciones...',
    'Últimos ajustes...'
  ];
  let i = 0;
  const el = document.getElementById('loadingText');
  const interval = setInterval(() => {
    i++;
    if (i < msgs.length) el.textContent = msgs[i];
  }, 600);
  setTimeout(() => { clearInterval(interval); showResults(); }, 2600);
}

function showResults() {
  const top6 = calcResults();
  const profile = getProfile();

  document.getElementById('profileName').textContent = profile.name;

  const grid = document.getElementById('gamesGrid');
  const medals = ['gold','silver','bronze'];
  const medalLabels = ['#1 Mejor coincidencia','#2 Gran elección','#3 Muy recomendado','#4 Recomendado','#5 Vale la pena','#6 Alternativa'];

  grid.innerHTML = top6.map((g, i) => `
    <div class="game-card" style="animation-delay:${i*0.08}s">
      <div class="game-rank ${medals[i] || ''}">${medalLabels[i]}</div>
      <div class="game-title">${g.titulo}</div>
      <div class="game-match">
        <div class="match-bar"><div class="match-fill" style="width:${g.pct}%"></div></div>
        <div class="match-pct">${g.pct}%</div>
      </div>
      <div class="game-tags">
        ${g.generos.slice(0,3).map(gen => `<span class="tag genre">${gen}</span>`).join('')}
        <span class="tag meta">Metacritic ${g.meta}</span>
        <span class="tag price">${g.precio === 0 ? 'Gratis' : '$'+g.precio}</span>
      </div>
      <div class="game-meta-row">
        <span>${g.estilo}</span>
        <span>${g.dificultad}</span>
        <span>${g.modo}</span>
      </div>
    </div>
  `).join('');

  show('results');
  window.scrollTo({top:0});

  // Guardar en historial si hay sesión activa
  saveResultToHistory(profile, answers, top6);

  // Animate bars after render
  setTimeout(() => {
    document.querySelectorAll('.match-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => bar.style.width = w, 50);
    });
  }, 100);
}

function restart() {
  show('landing');
  window.scrollTo({top:0});
}

// (Init moved to auth section below)
// =====================================================================
// AUTH & HISTORIAL — comunicación con el servidor Express/MySQL
// =====================================================================
const API = 'http://localhost:3000/api';

// ── Clase AuthManager: encapsula toda la lógica de autenticación ──
class AuthManager {
  #user = null; // { token, username }  —  campo privado

  // ── Sesión ───────────────────────────────────────────────────
  loadSession() {
    try {
      const saved = sessionStorage.getItem('gq_user');
      if (saved) this.#user = JSON.parse(saved);
    } catch {}
    this.#updateNavUI();
  }

  #saveSession(data) {
    this.#user = data;
    sessionStorage.setItem('gq_user', JSON.stringify(data));
    this.#updateNavUI();
  }

  logout() {
    this.#user = null;
    sessionStorage.removeItem('gq_user');
    this.#updateNavUI();
  }

  getUser() {
    return this.#user;
  }

  // ── Actualizar navbar ─────────────────────────────────────────
  #updateNavUI() {
    const guest = document.getElementById('navGuest');
    const user  = document.getElementById('navUser');
    const name  = document.getElementById('navUsername');
    if (!guest || !user) return;
    if (this.#user) {
      guest.style.display = 'none';
      user.style.display  = 'flex';
      name.textContent    = '👋 ' + this.#user.username;
    } else {
      guest.style.display = 'flex';
      user.style.display  = 'none';
    }
  }

  // ── Modal auth ────────────────────────────────────────────────
  openModal(tab = 'login') {
    document.getElementById('authOverlay').style.display = 'flex';
    this.switchTab(tab);
    this.#clearErrors();
  }

  closeModal(e) {
    if (!e || e.target === document.getElementById('authOverlay'))
      document.getElementById('authOverlay').style.display = 'none';
  }

  switchTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('formLogin').style.display    = isLogin ? 'block' : 'none';
    document.getElementById('formRegister').style.display = isLogin ? 'none'  : 'block';
    document.getElementById('tabLogin').classList.toggle('active', isLogin);
    document.getElementById('tabRegister').classList.toggle('active', !isLogin);
    this.#clearErrors();
  }

  #clearErrors() {
    ['loginError', 'regError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  // ── Login ─────────────────────────────────────────────────────
  async doLogin() {
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPass').value;
    const errEl    = document.getElementById('loginError');
    errEl.textContent = '';

    if (!email || !password) { errEl.textContent = 'Completá todos los campos'; return; }

    try {
      const res  = await fetch(`${API}/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) { errEl.textContent = data.error || 'Error al ingresar'; return; }
      this.#saveSession({ token: data.token, username: data.username });
      document.getElementById('authOverlay').style.display = 'none';
    } catch {
      errEl.textContent = 'No se pudo conectar al servidor';
    }
  }

  // ── Registro ──────────────────────────────────────────────────
  async doRegister() {
    const username = document.getElementById('regUser').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPass').value;
    const errEl    = document.getElementById('regError');
    errEl.textContent = '';

    if (!username || !email || !password) { errEl.textContent = 'Completá todos los campos'; return; }
    if (password.length < 6) { errEl.textContent = 'La contraseña debe tener al menos 6 caracteres'; return; }

    try {
      const res  = await fetch(`${API}/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) { errEl.textContent = data.error || 'Error al registrarse'; return; }
      this.#saveSession({ token: data.token, username: data.username });
      document.getElementById('authOverlay').style.display = 'none';
    } catch {
      errEl.textContent = 'No se pudo conectar al servidor';
    }
  }
}

// POO
const auth = new AuthManager();

// Adaptadores globales para mantener compatibilidad con los onclick del HTML
const loadSession    = ()      => auth.loadSession();
const logout         = ()      => auth.logout();
const openAuth       = (tab)   => auth.openModal(tab);
const closeAuth      = (e)     => auth.closeModal(e);
const switchTab      = (tab)   => auth.switchTab(tab);
const doLogin        = ()      => auth.doLogin();
const doRegister     = ()      => auth.doRegister();

Object.defineProperty(window, 'currentUser', { get: () => auth.getUser() });

// ── Guardar resultado en historial ────────────────────────────
async function saveResultToHistory(profile, answers, results) {
  if (!currentUser) return;  // usuario no logueado → no guarda
  try {
    await fetch(`${API}/history`, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser.token
      },
      body: JSON.stringify({ profile: profile.name, answers, results })
    });
  } catch (e) {
    console.warn('No se pudo guardar en historial:', e);
  }
}

// ── Modal historial ───────────────────────────────────────────
async function openHistory() {
  document.getElementById('historyOverlay').style.display = 'flex';
  await loadHistory();
}

function closeHistory(e) {
  if (!e || e.target === document.getElementById('historyOverlay'))
    document.getElementById('historyOverlay').style.display = 'none';
}

async function loadHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:2rem;">Cargando...</div>';

  try {
    const res  = await fetch(`${API}/history`, {
      headers: { 'Authorization': 'Bearer ' + currentUser.token }
    });
    const data = await res.json();

    if (!data.history || !data.history.length) {
      list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:2rem;">Todavía no hiciste ningún quiz 🎮<br><small>Completá el test y tus resultados quedarán guardados acá.</small></div>';
      return;
    }

    list.innerHTML = data.history.map(entry => {
      const date    = new Date(entry.created_at).toLocaleDateString('es-AR', { day:'2-digit', month:'short', year:'numeric' });
      const results = typeof entry.results === 'string' ? JSON.parse(entry.results) : entry.results;
      const topGames = results.slice(0, 4).map(g =>
        `<span class="history-game-tag">${g.titulo} <span class="history-pct">${g.pct}%</span></span>`
      ).join('');

      return `
        <div class="history-entry" id="hentry-${entry.id}">
          <div class="history-entry-header">
            <div>
              <div class="history-profile">${entry.profile}</div>
              <div class="history-date">${date}</div>
            </div>
            <button class="btn-del-history" onclick="deleteHistory(${entry.id})">🗑 Borrar</button>
          </div>
          <div class="history-games">${topGames}</div>
        </div>
      `;
    }).join('');

  } catch {
    list.innerHTML = '<div style="text-align:center;color:var(--pink);padding:2rem;">Error al cargar el historial</div>';
  }
}

async function deleteHistory(id) {
  if (!currentUser) return;
  try {
    await fetch(`${API}/history/${id}`, {
      method:  'DELETE',
      headers: { 'Authorization': 'Bearer ' + currentUser.token }
    });
    document.getElementById(`hentry-${id}`)?.remove();
    const list = document.getElementById('historyList');
    if (!list.children.length)
      list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:2rem;">No hay más entradas.</div>';
  } catch {
    alert('No se pudo eliminar');
  }
}

// ── Init ──────────────────────────────────────────────────────
window.addEventListener('load', () => {
  show('landing');
  loadSession();
});
