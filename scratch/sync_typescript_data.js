import fs from 'fs';

const rawData = fs.readFileSync('server/defaultExcursions.json', 'utf8');
const catalog = JSON.parse(rawData);

const originalTS = fs.readFileSync('src/data/excursionsData.ts', 'utf8');

// Obtener la cabecera hasta "export const EXCURSIONS_DATA: Excursion[] = ["
const headerEnd = originalTS.indexOf('export const EXCURSIONS_DATA: Excursion[] = [');
if (headerEnd === -1) {
  throw new Error('No se encontró export const EXCURSIONS_DATA');
}
const header = originalTS.slice(0, headerEnd);

// Obtener la parte final desde "export function normalizeExcursion"
const footerStart = originalTS.indexOf('export function normalizeExcursion(');
if (footerStart === -1) {
  throw new Error('No se encontró export function normalizeExcursion');
}
const footer = originalTS.slice(footerStart);

// Armar el nuevo archivo TS
const newTSContent = `${header}export const EXCURSIONS_DATA: Excursion[] = ${JSON.stringify(catalog, null, 2)};\n\n${footer}`;

fs.writeFileSync('src/data/excursionsData.ts', newTSContent, 'utf8');
console.log('src/data/excursionsData.ts actualizado con éxito.');
