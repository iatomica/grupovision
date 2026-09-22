import express from 'express';
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Storage directories configuration
const DATA_DIR = process.env.DATA_DIR || path.resolve(__dirname, '../data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const EXCURSIONS_FILE = path.join(DATA_DIR, 'excursions.json');
const DEFAULT_EXCURSIONS_FILE = path.join(__dirname, 'defaultExcursions.json');
const SITE_CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');
const DEFAULT_SITE_CONTENT_FILE = path.join(__dirname, 'defaultSiteContent.json');
const PUBLIC_EXCURSIONS_DIR = path.resolve(__dirname, '../public/images/excursiones');
const DIST_DIR = path.resolve(__dirname, '../dist');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initialize excursions and site-content data if not present
function initializeDataFiles() {
  if (!fs.existsSync(EXCURSIONS_FILE)) {
    console.log('[Server] excursions.json not found in data/. Initializing from default catalog...');
    if (fs.existsSync(DEFAULT_EXCURSIONS_FILE)) {
      fs.copyFileSync(DEFAULT_EXCURSIONS_FILE, EXCURSIONS_FILE);
      console.log('[Server] Successfully initialized excursions.json');
    } else {
      fs.writeFileSync(EXCURSIONS_FILE, JSON.stringify([], null, 2));
    }
  }

  if (!fs.existsSync(SITE_CONTENT_FILE)) {
    console.log('[Server] site-content.json not found in data/. Initializing from defaults...');
    if (fs.existsSync(DEFAULT_SITE_CONTENT_FILE)) {
      fs.copyFileSync(DEFAULT_SITE_CONTENT_FILE, SITE_CONTENT_FILE);
      console.log('[Server] Successfully initialized site-content.json');
    } else {
      fs.writeFileSync(SITE_CONTENT_FILE, JSON.stringify({}, null, 2));
    }
  }
}
initializeDataFiles();

// Helper to read excursions
function getExcursions() {
  try {
    const raw = fs.readFileSync(EXCURSIONS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Server] Error reading excursions.json:', err);
    return [];
  }
}

// Helper to write excursions atomically
function saveExcursions(data) {
  const tempPath = `${EXCURSIONS_FILE}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempPath, EXCURSIONS_FILE);
}

// Helpers for site content
function getSiteContent() {
  try {
    const raw = fs.readFileSync(SITE_CONTENT_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Server] Error reading site-content.json:', err);
    if (fs.existsSync(DEFAULT_SITE_CONTENT_FILE)) {
      return JSON.parse(fs.readFileSync(DEFAULT_SITE_CONTENT_FILE, 'utf8'));
    }
    return {};
  }
}

function saveSiteContent(data) {
  const tempPath = `${SITE_CONTENT_FILE}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempPath, SITE_CONTENT_FILE);
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Static file hosting
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/images', express.static(path.resolve(__dirname, '../public/images')));

// Multer in-memory storage for instant Sharp processing
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max before WebP compression
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  }
});

// ==========================================
// EXCURSIONS API
// ==========================================

// GET all excursions
app.get('/api/excursions', (req, res) => {
  try {
    const excursions = getExcursions();
    res.json(excursions);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener excursiones' });
  }
});

// PUT replace all excursions (bulk sync)
app.put('/api/excursions', (req, res) => {
  try {
    const data = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'El cuerpo debe ser una lista de excursiones' });
    }
    saveExcursions(data);
    res.json({ success: true, count: data.length });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar excursiones' });
  }
});

// POST save or update single excursion
app.post('/api/excursions', (req, res) => {
  try {
    const item = req.body;
    if (!item || !item.id) {
      return res.status(400).json({ error: 'Se requiere ID de excursión' });
    }
    const current = getExcursions();
    const index = current.findIndex(e => e.id === item.id);
    if (index >= 0) {
      current[index] = { ...current[index], ...item };
    } else {
      current.unshift(item);
    }
    saveExcursions(current);
    res.json({ success: true, excursion: item });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar excursión' });
  }
});

// DELETE single excursion
app.delete('/api/excursions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const current = getExcursions();
    const updated = current.filter(e => e.id !== id);
    saveExcursions(updated);
    res.json({ success: true, remaining: updated.length });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar excursión' });
  }
});

// POST reset to factory catalog
app.post('/api/excursions/reset', (req, res) => {
  try {
    if (fs.existsSync(DEFAULT_EXCURSIONS_FILE)) {
      const defaultData = JSON.parse(fs.readFileSync(DEFAULT_EXCURSIONS_FILE, 'utf8'));
      saveExcursions(defaultData);
      res.json({ success: true, excursions: defaultData });
    } else {
      res.status(500).json({ error: 'Catálogo de fábrica no disponible' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al restablecer catálogo' });
  }
});

// ==========================================
// SITE CONTENT CMS API (Editable Sections)
// ==========================================

// GET current site content
app.get('/api/site-content', (req, res) => {
  try {
    const content = getSiteContent();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener contenido del sitio' });
  }
});

// PUT update site content
app.put('/api/site-content', (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Formato de contenido inválido' });
    }
    saveSiteContent(data);
    res.json({ success: true, content: data });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar contenido del sitio' });
  }
});

// POST reset site content to defaults
app.post('/api/site-content/reset', (req, res) => {
  try {
    if (fs.existsSync(DEFAULT_SITE_CONTENT_FILE)) {
      const defaultData = JSON.parse(fs.readFileSync(DEFAULT_SITE_CONTENT_FILE, 'utf8'));
      saveSiteContent(defaultData);
      res.json({ success: true, content: defaultData });
    } else {
      res.status(500).json({ error: 'Contenido por defecto no disponible' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al restablecer contenido del sitio' });
  }
});

// ==========================================
// MEDIA LIBRARY API (WordPress Style)
// ==========================================

// GET all media assets
app.get('/api/media', async (req, res) => {
  try {
    const mediaList = [];

    // 1. List user uploaded files in data/uploads/
    if (fs.existsSync(UPLOADS_DIR)) {
      const files = fs.readdirSync(UPLOADS_DIR);
      for (const file of files) {
        // Skip thumb files in top list, we link them
        if (file.includes('_thumb.')) continue;
        if (!file.endsWith('.webp')) continue;

        const filePath = path.join(UPLOADS_DIR, file);
        const stats = fs.statSync(filePath);
        const thumbName = file.replace('.webp', '_thumb.webp');
        const hasThumb = fs.existsSync(path.join(UPLOADS_DIR, thumbName));

        mediaList.push({
          id: file,
          name: file,
          url: `/uploads/${file}`,
          thumbUrl: hasThumb ? `/uploads/${thumbName}` : `/uploads/${file}`,
          sizeBytes: stats.size,
          updatedAt: stats.mtime,
          source: 'upload'
        });
      }
    }

    // 2. List pre-existing catalog images in public/images/excursiones/
    if (fs.existsSync(PUBLIC_EXCURSIONS_DIR)) {
      const catalogFiles = fs.readdirSync(PUBLIC_EXCURSIONS_DIR);
      for (const file of catalogFiles) {
        if (!file.endsWith('.webp')) continue;
        const filePath = path.join(PUBLIC_EXCURSIONS_DIR, file);
        const stats = fs.statSync(filePath);

        // Format clean label from filename
        const cleanName = file.replace('.webp', '').replace(/-/g, ' ').toUpperCase();

        mediaList.push({
          id: `catalog-${file}`,
          name: cleanName,
          url: `/images/excursiones/${file}`,
          thumbUrl: `/images/excursiones/${file}`,
          sizeBytes: stats.size,
          updatedAt: stats.mtime,
          source: 'catalog'
        });
      }
    }

    // Sort by recent upload/update first
    mediaList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    res.json(mediaList);
  } catch (err) {
    console.error('[Server] Error fetching media library:', err);
    res.status(500).json({ error: 'Error al obtener biblioteca de medios' });
  }
});

// POST upload and normalize to WebP + generate thumbnail
app.post('/api/media/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ningún archivo de imagen' });
    }

    const originalName = req.file.originalname || 'imagen';
    const baseSlug = path.parse(originalName).name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 50);

    const timestamp = Date.now();
    const mainFileName = `gv-${baseSlug}-${timestamp}.webp`;
    const thumbFileName = `gv-${baseSlug}-${timestamp}_thumb.webp`;

    const mainFilePath = path.join(UPLOADS_DIR, mainFileName);
    const thumbFilePath = path.join(UPLOADS_DIR, thumbFileName);

    // 1. Process Main Image with Sharp:
    // Resize down if too big (max 1920 width), convert to WebP quality 85, strip heavy metadata
    const mainMetadata = await sharp(req.file.buffer)
      .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85, effort: 4 })
      .toFile(mainFilePath);

    // 2. Generate Thumbnail (360x240 cover fit) for the media picker
    await sharp(req.file.buffer)
      .resize({ width: 360, height: 240, fit: 'cover' })
      .webp({ quality: 78, effort: 3 })
      .toFile(thumbFilePath);

    console.log(`[Media] Uploaded and normalized: ${mainFileName} (${mainMetadata.size} bytes)`);

    const mediaItem = {
      id: mainFileName,
      name: `${baseSlug}.webp`,
      url: `/uploads/${mainFileName}`,
      thumbUrl: `/uploads/${thumbFileName}`,
      sizeBytes: mainMetadata.size,
      width: mainMetadata.width,
      height: mainMetadata.height,
      updatedAt: new Date().toISOString(),
      source: 'upload'
    };

    res.json({ success: true, item: mediaItem });
  } catch (err) {
    console.error('[Media] Error processing image:', err);
    res.status(500).json({ error: 'Error al procesar y normalizar la imagen a WebP' });
  }
});

// DELETE media item
app.delete('/api/media/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    // Security check: prevent directory traversal
    const safeName = path.basename(filename);
    const filePath = path.join(UPLOADS_DIR, safeName);
    const thumbName = safeName.replace('.webp', '_thumb.webp');
    const thumbPath = path.join(UPLOADS_DIR, thumbName);

    let deleted = false;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      deleted = true;
    }
    if (fs.existsSync(thumbPath)) {
      fs.unlinkSync(thumbPath);
    }

    if (deleted) {
      res.json({ success: true, message: `Archivo ${safeName} eliminado` });
    } else {
      res.status(404).json({ error: 'Archivo no encontrado en biblioteca' });
    }
  } catch (err) {
    console.error('[Media] Error deleting media file:', err);
    res.status(500).json({ error: 'Error al eliminar archivo de imagen' });
  }
});

// ==========================================
// PRODUCTION FRONTEND SERVING
// ==========================================
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

// SPA Fallback: return index.html for any GET request that doesn't match API or static files
app.use((req, res) => {
  if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
    const indexPath = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
  }
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Grupo Visión Server Running on Port ${PORT}`);
  console.log(` Persisting data at: ${DATA_DIR}`);
  console.log(` Media uploads at: ${UPLOADS_DIR}`);
  console.log(`=========================================`);
});

