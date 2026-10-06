import fs from 'fs';

// Cargar catálogo original (desde git o respaldo limpio si es necesario)
// Restauramos el catálogo base original antes de sobrescribir campos tipados
const currentCatalog = JSON.parse(fs.readFileSync('server/defaultExcursions.json', 'utf8'));
const parsedTours = JSON.parse(fs.readFileSync('scratch/parsed_tours.json', 'utf8'));

// Mapeo de Doc a ID existente
const mappingDocToCatalog = {
  '01': { id: 'free-walking-tour', defaultPrice: 20 },
  '02': { id: 'circuito-chico', defaultPrice: 35 },
  '03': { id: 'circuito-chico-y-colonia-suiza', isNew: true, category: 'Tradicional', image: '/images/excursiones/circuito-chico.webp', defaultPrice: 45, season: 'Todo el Año', difficulty: 'Fácil', duration: 'Día Completo (8h)' },
  '04': { id: 'colonia-suiza', isNew: true, category: 'Tradicional', image: '/images/excursiones/circuito-chico.webp', defaultPrice: 30, season: 'Todo el Año', difficulty: 'Fácil', duration: 'Medio Día (4h)' },
  '05': { id: 'cerro-catedral', defaultPrice: 40 },
  '06': { id: 'cerro-tronador-y-glaciares', defaultPrice: 65 },
  '07': { id: 'camino-de-los-7-lagos-san-martin-de-los-andes', defaultPrice: 85 },
  '08': { id: 'isla-victoria-y-bosque-de-arrayanes', defaultPrice: 95 },
  '09': { id: 'puerto-blest-y-cascada-de-los-cantaros', defaultPrice: 105 },
  '10': { id: 'villa-la-angostura-y-cerro-bayo', defaultPrice: 70 },
  '11': { id: 'motos-de-nieve', defaultPrice: 180 },
  '12': { id: 'el-refugio', defaultPrice: 190 },
  '13': { id: 'noche-nordica', isNew: true, category: 'Invierno', image: '/images/excursiones/ski-nordico.webp', defaultPrice: 170, season: 'Invierno', difficulty: 'Fácil', duration: 'Medio Día (4h)' },
  '14': { id: 'refugio-roca-negra', defaultPrice: 160 },
  '15': { id: 'el-bolson-chacras-lago-puelo', defaultPrice: 65 },
  '16': { id: 'circuito-grande-villa-traful-villa-la-angostura', defaultPrice: 80 },
  '17': { id: 'piedras-blancas', defaultPrice: 50 },
  '18': { id: 'ski-nordico', defaultPrice: 55 },
  '19': { id: 'kayac-lago-gutierrez', defaultPrice: 60 },
  '20': { id: 'velero-el-orgulloso', defaultPrice: 80 },
};

function formatItineraryText(itineraryList, recommendationsList, techSheet, shiftsInfo) {
  let text = '';
  if (itineraryList && itineraryList.length > 0) {
    text += 'ITINERARIO DETALLADO:\n' + itineraryList.map(item => `• ${item}`).join('\n') + '\n\n';
  }
  if (shiftsInfo && shiftsInfo.length > 0) {
    text += 'TURNOS Y MODALIDADES:\n' + shiftsInfo.map(item => `• ${item}`).join('\n') + '\n\n';
  }
  if (recommendationsList && recommendationsList.length > 0) {
    text += 'RECOMENDACIONES:\n' + recommendationsList.map(item => `• ${item}`).join('\n') + '\n\n';
  }
  if (techSheet && Object.keys(techSheet).length > 0) {
    text += 'DATOS DE LA EXPERIENCIA:\n' + Object.entries(techSheet).map(([k, v]) => `• ${k}: ${v === true ? 'Sí' : v}`).join('\n');
  }
  return text.trim();
}

// Normalizador estricto para valores TypeScript
function normalizeDifficulty(raw, fallback = 'Fácil') {
  if (!raw) return fallback;
  const lower = raw.toLowerCase();
  if (lower.includes('desaf') || lower.includes('alta') || lower.includes('difícil')) return 'Desafiante';
  if (lower.includes('modera') || lower.includes('media')) return 'Moderado';
  return 'Fácil';
}

function normalizeSeason(raw, fallback = 'Todo el Año') {
  if (!raw) return fallback;
  const lower = raw.toLowerCase();
  if (lower.includes('inviern') || lower.includes('nieve') || lower.includes('julio')) return 'Invierno';
  if (lower.includes('veran') || lower.includes('diciembre') || lower.includes('enero')) return 'Verano';
  return 'Todo el Año';
}

const updatedCatalog = currentCatalog.map(item => {
  // Buscar si coincide con alguna ficha del documento
  const matchedDocEntry = Object.entries(mappingDocToCatalog).find(([num, conf]) => conf.id === item.id);
  if (!matchedDocEntry) {
    return {
      ...item,
      difficulty: normalizeDifficulty(item.difficulty, 'Fácil'),
      season: normalizeSeason(item.season, 'Todo el Año')
    };
  }

  const [docNum, mapConfig] = matchedDocEntry;
  const docTour = parsedTours.find(t => t.num === docNum);
  if (!docTour) return item;

  const itineraryFormatted = formatItineraryText(
    docTour.itinerary,
    docTour.recommendations,
    docTour.technicalSheet,
    docTour.shiftsInfo
  );

  return {
    ...item,
    title: docTour.title || item.title,
    description: docTour.shortDesc || item.description,
    fullDetails: docTour.fullDesc || item.fullDetails,
    highlights: (docTour.highlights && docTour.highlights.length > 0) ? docTour.highlights : item.highlights,
    includes: (docTour.includes && docTour.includes.length > 0) ? docTour.includes : item.includes,
    notIncludes: (docTour.notIncludes && docTour.notIncludes.length > 0) ? docTour.notIncludes : (item.notIncludes || []),
    additionalInfo: itineraryFormatted || item.additionalInfo,
    difficulty: normalizeDifficulty(item.difficulty, 'Fácil'),
    season: normalizeSeason(item.season, 'Todo el Año')
  };
});

// Agregar las nuevas si no existen
['03', '04', '13'].forEach(num => {
  const conf = mappingDocToCatalog[num];
  const docTour = parsedTours.find(t => t.num === num);
  if (!conf || !docTour) return;

  const exists = updatedCatalog.some(x => x.id === conf.id);
  if (!exists) {
    const itineraryFormatted = formatItineraryText(
      docTour.itinerary,
      docTour.recommendations,
      docTour.technicalSheet,
      docTour.shiftsInfo
    );

    updatedCatalog.push({
      id: conf.id,
      title: docTour.title,
      category: conf.category,
      season: conf.season,
      duration: conf.duration,
      difficulty: conf.difficulty,
      image: conf.image,
      description: docTour.shortDesc,
      fullDetails: docTour.fullDesc,
      highlights: docTour.highlights,
      includes: docTour.includes,
      notIncludes: docTour.notIncludes,
      additionalInfo: itineraryFormatted,
      recommendedFor: 'Familias, Parejas y Grupos',
      departureTime: '09:00 hs',
      priceNum: conf.defaultPrice,
      shifts: [
        { id: `${conf.id}-shift-1`, name: 'Turno Mañana', time: '09:00 hs', totalCapacity: 18, availableSpots: 18, enabled: true },
        { id: `${conf.id}-shift-2`, name: 'Turno Tarde', time: '14:00 hs', totalCapacity: 18, availableSpots: 18, enabled: true }
      ],
      gallery: [],
      isPublished: true
    });
  }
});

// Guardar en server/defaultExcursions.json
fs.writeFileSync('server/defaultExcursions.json', JSON.stringify(updatedCatalog, null, 2), 'utf8');

// Guardar en data/excursions.json si existe
if (fs.existsSync('data/excursions.json')) {
  fs.writeFileSync('data/excursions.json', JSON.stringify(updatedCatalog, null, 2), 'utf8');
}

// Sincronizar src/data/excursionsData.ts
const originalTS = fs.readFileSync('src/data/excursionsData.ts', 'utf8');
const headerEnd = originalTS.indexOf('export const EXCURSIONS_DATA: Excursion[] = [');
const header = originalTS.slice(0, headerEnd);
const footerStart = originalTS.indexOf('export function normalizeExcursion(');
const footer = originalTS.slice(footerStart);

const newTSContent = `${header}export const EXCURSIONS_DATA: Excursion[] = ${JSON.stringify(updatedCatalog, null, 2)};\n\n${footer}`;
fs.writeFileSync('src/data/excursionsData.ts', newTSContent, 'utf8');

console.log(`Catálogo y TypeScript sincronizados con éxito. Total: ${updatedCatalog.length}`);
