import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const SRC_DIR = path.join(__dirname, '../src');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function optimizeAll() {
  console.log('Optimizing all images in public/ to WebP via buffer...');
  const allFiles = getAllFiles(PUBLIC_DIR);

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const destPath = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      try {
        const metadata = await sharp(file).metadata();
        const width = Math.min(metadata.width || 1200, 1200);

        const webpBuffer = await sharp(file)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toBuffer();

        fs.writeFileSync(destPath, webpBuffer);
        fs.unlinkSync(file); // Cleanly remove original jpg/png without file lock
        console.log(`Converted & Deleted: ${path.relative(PUBLIC_DIR, file)} -> ${path.relative(PUBLIC_DIR, destPath)}`);
      } catch (err) {
        console.error(`Failed to process ${file}:`, err.message);
      }
    }
  }

  // Update references in src directory
  console.log('Updating image references in src/...');
  const srcFiles = getAllFiles(SRC_DIR);
  for (const file of srcFiles) {
    if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.html')) {
      let content = fs.readFileSync(file, 'utf-8');
      const updated = content
        .replace(/\.jpg\b/g, '.webp')
        .replace(/\.jpeg\b/g, '.webp')
        .replace(/\.png\b/g, '.webp');

      if (updated !== content) {
        fs.writeFileSync(file, updated, 'utf-8');
        console.log(`Updated references in ${path.relative(SRC_DIR, file)}`);
      }
    }
  }

  console.log('All images optimized to WebP and references updated successfully!');
}

optimizeAll().catch(console.error);
