import { Excursion, EXCURSIONS_DATA } from '../data/excursionsData';

const STORAGE_KEY = 'grupovision_excursions_catalog_v1';

/**
 * Carga el catálogo de excursiones persistido en localStorage.
 * Si no existe o está corrupto, inicializa con EXCURSIONS_DATA por defecto.
 */
export function loadExcursions(): Excursion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveExcursions(EXCURSIONS_DATA);
      return EXCURSIONS_DATA;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    saveExcursions(EXCURSIONS_DATA);
    return EXCURSIONS_DATA;
  } catch (error) {
    console.warn('[ExcursionsStorage] Error al leer de localStorage, usando datos base:', error);
    return EXCURSIONS_DATA;
  }
}

/**
 * Guarda el catálogo completo de excursiones en localStorage.
 */
export function saveExcursions(excursions: Excursion[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(excursions));
  } catch (error) {
    console.error('[ExcursionsStorage] Error al guardar en localStorage:', error);
  }
}

/**
 * Restaura el catálogo de fábrica (EXCURSIONS_DATA) y limpia las modificaciones locales.
 */
export function resetExcursionsToDefault(): Excursion[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(EXCURSIONS_DATA));
  } catch (error) {
    console.error('[ExcursionsStorage] Error al reiniciar a fábrica:', error);
  }
  return [...EXCURSIONS_DATA];
}
