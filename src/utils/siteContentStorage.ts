import { SiteContentData, DEFAULT_SITE_CONTENT } from '../data/siteContentData';

const SITE_CONTENT_STORAGE_KEY = 'grupovision_site_content_v1';

/**
 * Carga el contenido del sitio sincrónicamente desde localStorage como estado inicial inmediato.
 */
export function loadSiteContent(): SiteContentData {
  try {
    const raw = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
    if (!raw) {
      saveSiteContent(DEFAULT_SITE_CONTENT);
      return DEFAULT_SITE_CONTENT;
    }
    const parsed = JSON.parse(raw);
    if (parsed && parsed.about && parsed.exclusive) {
      return parsed;
    }
    saveSiteContent(DEFAULT_SITE_CONTENT);
    return DEFAULT_SITE_CONTENT;
  } catch (err) {
    console.warn('[SiteContentStorage] Error al leer localStorage, usando valores por defecto:', err);
    return DEFAULT_SITE_CONTENT;
  }
}

/**
 * Sincroniza desde el backend persistido (/api/site-content).
 * Si tiene éxito, actualiza localStorage y devuelve los datos frescos.
 */
export async function fetchSiteContentAsync(): Promise<SiteContentData> {
  try {
    const res = await fetch('/api/site-content');
    if (res.ok) {
      const data = await res.json();
      if (data && data.about && data.exclusive) {
        localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('[SiteContentStorage] No se pudo conectar a la API backend, usando datos locales:', err);
  }
  return loadSiteContent();
}

/**
 * Guarda el contenido del sitio en localStorage y sincroniza con el backend persistente.
 */
export async function saveSiteContent(content: SiteContentData): Promise<void> {
  try {
    localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));

    fetch('/api/site-content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    }).catch(err => {
      console.warn('[SiteContentStorage] Falló sincronización con backend persistente:', err);
    });
  } catch (err) {
    console.error('[SiteContentStorage] Error al guardar contenido:', err);
  }
}

/**
 * Restablece el contenido del sitio a los valores de fábrica.
 */
export async function resetSiteContentToDefault(): Promise<SiteContentData> {
  try {
    const res = await fetch('/api/site-content/reset', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.content) {
        localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(data.content));
        return data.content;
      }
    }
  } catch (err) {
    console.warn('[SiteContentStorage] Falló reset vía API, reseteando localmente:', err);
  }

  localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_CONTENT));
  return JSON.parse(JSON.stringify(DEFAULT_SITE_CONTENT));
}
