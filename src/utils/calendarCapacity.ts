import { Excursion, ExcursionShift } from '../data/excursionsData';
import { Booking } from '../components/JiraTicketModal';

/**
 * Normaliza los turnos configurados de una excursión.
 * Si no cuenta con turnos guardados o habilitados, genera turnos operativos estándar basados en su horario habitual.
 */
export function getExcursionEffectiveShifts(excursion: Excursion): ExcursionShift[] {
  if (excursion.shifts && excursion.shifts.length > 0) {
    const enabled = excursion.shifts.filter(s => s.enabled);
    if (enabled.length > 0) return enabled;
  }

  const defaultTime = excursion.departureTime || '09:00 hs';
  return [
    {
      id: `shift-manana-${excursion.id}`,
      name: 'Turno Mañana',
      time: defaultTime,
      totalCapacity: 16,
      availableSpots: 16,
      enabled: true
    },
    {
      id: `shift-tarde-${excursion.id}`,
      name: 'Turno Tarde',
      time: '14:00 hs',
      totalCapacity: 16,
      availableSpots: 16,
      enabled: true
    }
  ];
}

/**
 * Calcula los pasajeros ya reservados para una excursión, fecha y turno específico.
 */
export function getBookedPaxForShift(
  excursionTitle: string,
  shift: ExcursionShift,
  dateStr: string,
  bookings: Booking[]
): number {
  const normTitle = excursionTitle.toLowerCase().trim();

  return bookings
    .filter(b => {
      // Ignorar cancelados si existieran
      if ((b as any).status === 'CANCELADO') return false;

      const bTitle = (b.excursionTitle || '').toLowerCase().trim();
      const matchesTitle = bTitle === normTitle || bTitle.includes(normTitle) || normTitle.includes(bTitle);
      if (!matchesTitle) return false;

      if (b.date !== dateStr) return false;

      // Coincidencia por ID de turno o por horario
      if (b.shiftId && b.shiftId === shift.id) return true;
      if (b.shiftTime && (b.shiftTime === shift.time || shift.time.includes(b.shiftTime) || b.shiftTime.includes(shift.time))) return true;

      // Si la reserva no tiene turno especificado pero coincide el título y la fecha, se asigna al turno principal
      if (!b.shiftId && !b.shiftTime) {
        return shift.name.toLowerCase().includes('mañana') || shift.name.toLowerCase().includes('principal');
      }

      return false;
    })
    .reduce((sum, b) => sum + (Number(b.guests) || 1), 0);
}

/**
 * Determina si un turno en una fecha está bloqueado debido al límite de horas de anticipación mínima.
 * Por ejemplo: si la excursión requiere 24 hs de anticipación y faltan menos de 24 hs para la salida.
 */
export function isShiftBlockedByAdvance(
  dateStr: string,
  shiftTimeStr?: string,
  minAdvanceHours: number = 24
): boolean {
  if (!minAdvanceHours || minAdvanceHours <= 0) return false;

  let hours = 9;
  let minutes = 0;
  if (shiftTimeStr) {
    const match = shiftTimeStr.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
    }
  }

  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return false;

  const departureDate = new Date(y, m - 1, d, hours, minutes, 0, 0);
  const now = new Date();

  if (departureDate.getTime() <= now.getTime()) {
    return true;
  }

  const diffHours = (departureDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  return diffHours < minAdvanceHours;
}

/**
 * Obtiene la capacidad en vivo para un turno específico en una fecha.
 */
export function getShiftLiveCapacity(
  excursion: Excursion,
  shift: ExcursionShift,
  dateStr: string,
  bookings: Booking[]
): {
  totalCapacity: number;
  bookedPax: number;
  availableSpots: number;
  isSoldOut: boolean;
  isAdvanceBlocked: boolean;
} {
  const totalCapacity = shift.totalCapacity > 0 ? shift.totalCapacity : 16;
  const bookedPax = getBookedPaxForShift(excursion.title, shift, dateStr, bookings);
  const availableSpots = Math.max(0, totalCapacity - bookedPax);
  const minAdvanceHours = typeof excursion.minBookingAdvanceHours === 'number' ? excursion.minBookingAdvanceHours : 24;
  const isAdvanceBlocked = isShiftBlockedByAdvance(dateStr, shift.time || excursion.departureTime, minAdvanceHours);

  return {
    totalCapacity,
    bookedPax,
    availableSpots,
    isSoldOut: availableSpots <= 0,
    isAdvanceBlocked
  };
}

/**
 * Diagnóstico completo de disponibilidad de un día para una excursión.
 */
export function getDayLiveCapacity(
  excursion: Excursion,
  dateStr: string,
  bookings: Booking[]
): {
  isOperational: boolean;
  isBlocked: boolean;
  isPast: boolean;
  isAdvanceBlocked: boolean;
  minAdvanceHours: number;
  totalCapacity: number;
  bookedPax: number;
  availableSpots: number;
  isSoldOut: boolean;
  shiftsSummary: {
    shift: ExcursionShift;
    totalCapacity: number;
    bookedPax: number;
    availableSpots: number;
    isSoldOut: boolean;
    isAdvanceBlocked: boolean;
  }[];
} {
  // Comprobar si es fecha pasada
  const todayStr = new Date().toISOString().split('T')[0];
  const isPast = dateStr < todayStr;

  // Comprobar días de operación (0=Dom..6=Sáb)
  const d = new Date(dateStr + 'T12:00:00');
  const dayOfWeek = isNaN(d.getTime()) ? 1 : d.getDay();
  const operatingDays = Array.isArray(excursion.operatingDays) && excursion.operatingDays.length > 0
    ? excursion.operatingDays
    : [0, 1, 2, 3, 4, 5, 6];
  const isOperational = operatingDays.includes(dayOfWeek);

  // Comprobar fechas bloqueadas
  const blockedDates = excursion.blockedDates || [];
  const isBlocked = blockedDates.includes(dateStr);

  const minAdvanceHours = typeof excursion.minBookingAdvanceHours === 'number' ? excursion.minBookingAdvanceHours : 24;

  const shifts = getExcursionEffectiveShifts(excursion);
  const shiftsSummary = shifts.map(shift => {
    const cap = getShiftLiveCapacity(excursion, shift, dateStr, bookings);
    return {
      shift,
      ...cap
    };
  });

  const totalCapacity = shiftsSummary.reduce((acc, s) => acc + s.totalCapacity, 0);
  const bookedPax = shiftsSummary.reduce((acc, s) => acc + s.bookedPax, 0);
  const availableSpots = Math.max(0, totalCapacity - bookedPax);
  const isSoldOut = shiftsSummary.every(s => s.isSoldOut);
  // Un día está bloqueado por anticipación si todos sus turnos habilitados están bloqueados por anticipación
  const isAdvanceBlocked = shiftsSummary.length > 0 ? shiftsSummary.every(s => s.isAdvanceBlocked) : false;

  return {
    isOperational,
    isBlocked,
    isPast,
    isAdvanceBlocked,
    minAdvanceHours,
    totalCapacity,
    bookedPax,
    availableSpots,
    isSoldOut,
    shiftsSummary
  };
}
