import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('server/defaultExcursions.json', 'utf8'));

const cleaned = raw.map(item => {
  const shifts = (item.shifts || []).map(s => ({
    id: s.id,
    name: s.name,
    time: s.time,
    totalCapacity: s.totalCapacity || s.capacity || 16,
    availableSpots: s.availableSpots !== undefined ? s.availableSpots : 6,
    enabled: s.enabled !== undefined ? s.enabled : true
  }));

  const copy = { ...item };
  if (shifts.length > 0) {
    copy.shifts = shifts;
  }
  return copy;
});

fs.writeFileSync('server/defaultExcursions.json', JSON.stringify(cleaned, null, 2), 'utf8');
if (fs.existsSync('data/excursions.json')) {
  fs.writeFileSync('data/excursions.json', JSON.stringify(cleaned, null, 2), 'utf8');
}

// Sincronizar excursionsData.ts
const originalTS = fs.readFileSync('src/data/excursionsData.ts', 'utf8');
const headerEnd = originalTS.indexOf('export const EXCURSIONS_DATA: Excursion[] = [');
const header = originalTS.slice(0, headerEnd);
const footerStart = originalTS.indexOf('export function normalizeExcursion(');
const footer = originalTS.slice(footerStart);

const newTSContent = `${header}export const EXCURSIONS_DATA: Excursion[] = ${JSON.stringify(cleaned, null, 2)};\n\n${footer}`;
fs.writeFileSync('src/data/excursionsData.ts', newTSContent, 'utf8');

console.log('Shifts normalizados y excursionsData.ts actualizado.');
