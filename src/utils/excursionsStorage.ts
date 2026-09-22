import { Excursion, EXCURSIONS_DATA } from '../data/excursionsData';

const STORAGE_KEY = 'grupovision_excursions_catalog_v1';

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  thumbUrl: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  updatedAt: string;
  source: 'catalog' | 'upload';
}

/**
 * Carga el catálogo de excursiones sincrónicamente desde localStorage como estado inicial instantáneo.
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
 * Sincroniza desde el backend persistido (/api/excursions).
 * Si tiene éxito, actualiza localStorage y devuelve la lista fresca.
 */
export async function fetchExcursionsAsync(): Promise<Excursion[]> {
  try {
    const res = await fetch('/api/excursions');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('[ExcursionsStorage] No se pudo conectar a la API backend, usando datos locales:', err);
  }
  return loadExcursions();
}

/**
 * Guarda el catálogo completo de excursiones en localStorage y sincroniza con el backend persistente.
 */
export async function saveExcursions(excursions: Excursion[]): Promise<void> {
  try {
    // 1. Guardado inmediato en localStorage para respuesta instantánea en UI
    localStorage.setItem(STORAGE_KEY, JSON.stringify(excursions));

    // 2. Persistencia en backend /api/excursions
    fetch('/api/excursions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(excursions)
    }).catch(err => {
      console.warn('[ExcursionsStorage] Falló sincronización con backend persistente:', err);
    });
  } catch (error) {
    console.error('[ExcursionsStorage] Error al guardar en storage:', error);
  }
}

/**
 * Restaura el catálogo de fábrica (EXCURSIONS_DATA) y limpia las modificaciones locales y del servidor.
 */
export async function resetExcursionsToDefault(): Promise<Excursion[]> {
  try {
    const res = await fetch('/api/excursions/reset', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (data.excursions) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.excursions));
        return data.excursions;
      }
    }
  } catch (err) {
    console.warn('[ExcursionsStorage] Falló reset vía API, reseteando localmente:', err);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(EXCURSIONS_DATA));
  return [...EXCURSIONS_DATA];
}

// ==========================================
// MEDIA LIBRARY API CLIENT
// ==========================================

/**
 * Obtiene el listado completo de imágenes de la biblioteca multimedia.
 */
export async function fetchMediaLibrary(): Promise<MediaItem[]> {
  try {
    const res = await fetch('/api/media');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('[MediaLibrary] Error consultando /api/media:', err);
  }
  return [];
}

/**
 * Sube una imagen al servidor, donde Sharp la convierte a WebP y genera thumbnail.
 */
export async function uploadMediaImage(file: File): Promise<MediaItem> {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/api/media/upload', {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Error al subir y procesar la imagen a WebP');
  }

  const result = await res.json();
  return result.item;
}

/**
 * Elimina una imagen subida por el usuario de la biblioteca.
 */
export async function deleteMediaImage(filename: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/media/${encodeURIComponent(filename)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.error('[MediaLibrary] Error al eliminar archivo:', err);
    return false;
  }
}
