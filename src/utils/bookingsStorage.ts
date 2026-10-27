import { Booking } from '../components/JiraTicketModal';

const STORAGE_KEY = 'grupovision_bookings';

/**
 * Carga inicial sincrónica desde localStorage.
 */
export function loadBookings(initialFallback: Booking[] = []): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialFallback;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (error) {
    console.warn('[BookingsStorage] Error al leer de localStorage:', error);
  }
  return initialFallback;
}

/**
 * Consulta la API persistida (/api/bookings) que escribe en data/bookings.json.
 * Mantiene la persistencia canónica tras redeploys de Coolify o pushes de git.
 */
export async function fetchBookingsAsync(fallback: Booking[] = []): Promise<Booking[]> {
  try {
    const res = await fetch('/api/bookings');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('[BookingsStorage] No se pudo conectar a /api/bookings, usando estado local:', err);
  }
  return loadBookings(fallback);
}

/**
 * Guarda o actualiza una reserva individual en el backend (/api/bookings)
 * y actualiza localStorage de inmediato.
 */
export async function saveBookingAsync(booking: Booking): Promise<void> {
  try {
    // 1. Actualizar localStorage inmediatamente
    const current = loadBookings();
    const idx = current.findIndex(b => b.id === booking.id);
    let updated: Booking[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = booking;
    } else {
      updated = [booking, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // 2. Persistir en backend (/api/bookings)
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    });
  } catch (err) {
    console.error('[BookingsStorage] Error al persistir reserva individual en backend:', err);
  }
}

/**
 * Actualiza la lista completa de reservas en el backend de forma atómica.
 */
export async function saveAllBookingsAsync(bookings: Booking[]): Promise<void> {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    await fetch('/api/bookings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookings)
    });
  } catch (err) {
    console.error('[BookingsStorage] Error al persistir reservas en backend:', err);
  }
}
