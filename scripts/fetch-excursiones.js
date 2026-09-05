import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://grupovision.tur.ar/ws/api/excursiones?enabled=true&from=0&count=100&estadoExcursion=PUBLICADA';
const OUTPUT_DIR = path.join(__dirname, '../public/images/excursiones');
const DATA_FILE = path.join(__dirname, '../src/data/excursionsData.ts');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url) return resolve(false);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        return resolve(false);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

function cleanHtmlText(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseFaq(faqRaw) {
  if (!faqRaw) return [];
  const text = cleanHtmlText(faqRaw);
  const parts = text.split(/P:\s*/).filter(Boolean);
  const faqs = [];
  for (const part of parts) {
    const lines = part.split(/\nR:\s*/);
    if (lines.length >= 2) {
      faqs.push({
        question: lines[0].trim(),
        answer: lines[1].trim()
      });
    }
  }
  return faqs;
}

function parseBulletList(rawText) {
  if (!rawText) return [];
  const clean = cleanHtmlText(rawText);
  return clean
    .split(/\n|\*/)
    .map(s => s.replace(/^[\*\-•]\s*/, '').trim())
    .filter(s => s.length > 2);
}

function mapCategory(tipoExcursion) {
  const cat = (tipoExcursion || '').toUpperCase().trim();
  switch (cat) {
    case 'TRADICIONAL': return 'Tradicional';
    case 'AVENTURA': return 'Aventura';
    case 'NAVEGACION': return 'Navegación';
    case 'EXPERIENCIAS': return 'Experiencias';
    case 'TRASLADOS': return 'Traslados';
    case 'INVIERNO': return 'Invierno';
    case 'VERANO': return 'Verano';
    case 'ALQUILERES': return 'Alquileres';
    default: return 'Tradicional';
  }
}

function mapSeason(tipoExcursion) {
  const cat = (tipoExcursion || '').toUpperCase().trim();
  if (cat === 'INVIERNO') return 'Invierno';
  if (cat === 'VERANO') return 'Verano';
  return 'Todo el Año';
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log('Fetching excursions from Grupo Visión API...');
  const json = await fetchUrl(API_URL);
  const results = json.results || json;
  console.log(`Found ${results.length} excursions.`);

  const processed = [];

  for (const item of results) {
    const title = (item.nombre?.es || '').trim();
    if (!title) continue;

    const slug = slugify(title);
    let mainImgUrl = '';
    if (item.imagenPrincipal && item.imagenPrincipal.card) {
      mainImgUrl = `https://grupovision.tur.ar/ws/archivos/download/${item.imagenPrincipal.card.id}`;
    } else if (item.multimedia && item.multimedia.length > 0 && item.multimedia[0].card) {
      mainImgUrl = `https://grupovision.tur.ar/ws/archivos/download/${item.multimedia[0].card.id}`;
    }

    const imageFilename = `${slug}.jpg`;
    const imagePathLocal = path.join(OUTPUT_DIR, imageFilename);
    const publicImageRelPath = `/images/excursiones/${imageFilename}`;

    console.log(`Downloading cover image for "${title}"...`);
    const downloaded = await downloadImage(mainImgUrl, imagePathLocal);
    
    // Gallery images
    const galleryUrls = (item.multimedia || [])
      .map(m => m.archivo && m.archivo.id ? `https://grupovision.tur.ar/ws/archivos/download/${m.archivo.id}` : '')
      .filter(Boolean)
      .slice(0, 5);

    const priceNum = item.periodos && item.periodos[0] && item.periodos[0].precioMayor ? Math.round(item.periodos[0].precioMayor / 1000) : 120;

    processed.push({
      id: slug,
      title: title,
      category: mapCategory(item.tipoExcursion),
      season: mapSeason(item.tipoExcursion),
      duration: item.informacionAdicional?.es?.includes('medio') || item.descripcionCorta?.es?.includes('medio') ? 'Medio Día (4h)' : 'Día Completo (8h)',
      difficulty: item.tipoExcursion === 'AVENTURA' ? 'Moderado' : 'Fácil',
      image: downloaded ? publicImageRelPath : (mainImgUrl || '/images/hero.jpg'),
      description: cleanHtmlText(item.descripcionCorta?.es) || cleanHtmlText(item.descripcion?.es).substring(0, 150) + '...',
      fullDetails: cleanHtmlText(item.descripcion?.es),
      highlights: parseBulletList(item.puntosDestacados?.es),
      includes: parseBulletList(item.incluido?.es),
      notIncludes: parseBulletList(item.noIncluido?.es),
      additionalInfo: cleanHtmlText(item.informacionAdicional?.es),
      faq: parseFaq(item.preguntasFrecuentes?.es),
      recommendedFor: 'Parejas, Familias y Grupos',
      departureTime: item.informacionAdicional?.es?.match(/\d{2}:\d{2}\s*hs/)?.[0] || '08:30 hs / 14:00 hs',
      priceNum: priceNum
    });
  }

  const tsContent = `// Auto-generated Excursions Data from Grupo Visión Receptive Catalog
export interface Excursion {
  id: string;
  title: string;
  category: 'Tradicional' | 'Aventura' | 'Navegación' | 'Experiencias' | 'Traslados' | 'Invierno' | 'Verano' | 'Alquileres';
  season: 'Todo el Año' | 'Invierno' | 'Verano';
  duration: string;
  difficulty: 'Fácil' | 'Moderado' | 'Desafiante';
  image: string;
  description: string;
  fullDetails: string;
  highlights: string[];
  includes: string[];
  notIncludes?: string[];
  additionalInfo?: string;
  faq?: { question: string; answer: string }[];
  recommendedFor: string;
  departureTime: string;
  priceNum: number;
}

export const EXCURSIONS_DATA: Excursion[] = ${JSON.stringify(processed, null, 2)};
`;

  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(DATA_FILE, tsContent, 'utf-8');
  console.log(`Saved ${processed.length} processed excursions to ${DATA_FILE}`);
}

main().catch(err => {
  console.error('Error running script:', err);
  process.exit(1);
});
