import fs from 'fs';

const current = JSON.parse(fs.readFileSync('server/defaultExcursions.json', 'utf8'));
const parsed = JSON.parse(fs.readFileSync('scratch/parsed_tours.json', 'utf8'));

// Mapeo propuesto
const mapping = [
  { docNum: '01', docTitle: 'Walking Tour Bariloche · Historia, Arquitectura y Lago Nahuel Huapi', currentId: 'free-walking-tour', action: 'REPLACE_CONTENT' },
  { docNum: '02', docTitle: 'Circuito Chico', currentId: 'circuito-chico', action: 'REPLACE_CONTENT' },
  { docNum: '03', docTitle: 'Circuito Chico y Colonia Suiza', currentId: null, action: 'NEW_OR_COMBINED' },
  { docNum: '04', docTitle: 'Colonia Suiza', currentId: null, action: 'NEW' },
  { docNum: '05', docTitle: 'Cerro Catedral Panorámico', currentId: 'cerro-catedral', action: 'REPLACE_CONTENT' },
  { docNum: '06', docTitle: 'Cerro Tronador y Ventisquero Negro', currentId: 'cerro-tronador-y-glaciares', action: 'REPLACE_CONTENT' },
  { docNum: '07', docTitle: 'San Martín de los Andes por la Ruta de los 7 Lagos', currentId: 'camino-de-los-7-lagos-san-martin-de-los-andes', action: 'REPLACE_CONTENT' },
  { docNum: '08', docTitle: 'Isla Victoria y Bosque de Arrayanes', currentId: 'isla-victoria-y-bosque-de-arrayanes', action: 'REPLACE_CONTENT' },
  { docNum: '09', docTitle: 'Puerto Blest y Cascada de los Cántaros', currentId: 'puerto-blest-y-cascada-de-los-cantaros', action: 'REPLACE_CONTENT' },
  { docNum: '10', docTitle: 'Villa La Angostura y Cerro Bayo', currentId: 'villa-la-angostura-y-cerro-bayo', action: 'REPLACE_CONTENT' },
  { docNum: '11', docTitle: 'La Cueva — After Ski y Cena', currentId: 'motos-de-nieve', action: 'REPLACE_CONTENT' },
  { docNum: '12', docTitle: 'Refugio Arelauquen — 4x4, Moto de Nieve y Cena', currentId: 'el-refugio', action: 'REPLACE_CONTENT' },
  { docNum: '13', docTitle: 'Noche Nórdica — Aventura y Cena en Refugio', currentId: null, action: 'NEW' },
  { docNum: '14', docTitle: 'Roca Negra —Travesia en  4x4, Raquetas de Nieve y Fondue', currentId: 'refugio-roca-negra', action: 'REPLACE_CONTENT' },
  { docNum: '15', docTitle: 'El Bolsón y Lago Puelo', currentId: 'el-bolson-chacras-lago-puelo', action: 'REPLACE_CONTENT' },
  { docNum: '16', docTitle: 'Circuito Grande — Villa Traful y Villa La Angostura', currentId: 'circuito-grande-villa-traful-villa-la-angostura', action: 'REPLACE_CONTENT' },
  { docNum: '17', docTitle: 'Piedras Blancas — Trineos y Magic Carpet', currentId: 'piedras-blancas', action: 'REPLACE_CONTENT' },
  { docNum: '18', docTitle: 'Día de Ski Nórdico en Cerro Otto', currentId: 'ski-nordico', action: 'REPLACE_CONTENT' },
  { docNum: '19', docTitle: 'Kayak en Lago Gutiérrez', currentId: 'kayac-lago-gutierrez', action: 'REPLACE_CONTENT' },
  { docNum: '20', docTitle: 'Navegación en Velero por el Lago Nahuel Huapi (El Orgulloso)', currentId: 'velero-el-orgulloso', action: 'REPLACE_CONTENT' },
];

console.log('=== MAPEO DETALLADO DE EXCURSIONES ===\n');
mapping.forEach(m => {
  const cur = current.find(c => c.id === m.currentId);
  console.log(`Doc #${m.docNum} "${m.docTitle}"`);
  console.log(`  -> Catálogo actual: ${cur ? `[${cur.id}] "${cur.title}"` : 'NO EXISTE AÚN (Nueva incorporación)'}`);
  console.log(`  -> Acción: ${m.action}`);
  console.log('');
});

// Ver qué excursiones del catálogo actual NO están en el documento maestro
const mappedIds = new Set(mapping.map(m => m.currentId).filter(Boolean));
const unmappedCurrent = current.filter(c => !mappedIds.has(c.id));
console.log('=== EXCURSIONES ACTUALES CONSERVADAS (NO TOCADAS) ===');
unmappedCurrent.forEach(c => console.log(`- [${c.id}] "${c.title}" (Cat: ${c.category})`));
