import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR = path.join(__dirname, '../public/images/excursiones');
const DATA_FILE = path.join(__dirname, '../src/data/excursionsData.ts');

async function convertImages() {
  console.log('Converting cover images to WebP...');
  const files = fs.readdirSync(DIR);

  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const srcPath = path.join(DIR, file);
      const webpName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const destPath = path.join(DIR, webpName);

      try {
        await sharp(srcPath)
          .resize(800, 600, { fit: 'cover', position: 'center' })
          .webp({ quality: 80 })
          .toFile(destPath);
        
        console.log(`Converted ${file} -> ${webpName}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }
  }

  // Update Data File to reference .webp images
  if (fs.existsSync(DATA_FILE)) {
    let content = fs.readFileSync(DATA_FILE, 'utf-8');
    content = content.replace(/\.jpg"/g, '.webp"');
    fs.writeFileSync(DATA_FILE, content, 'utf-8');
    console.log('Updated excursionsData.ts references to .webp format');
  }
}

convertImages().catch(console.error);
