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
} {
  const totalCapacity = shift.totalCapacity > 0 ? shift.totalCapacity : 16;
  const bookedPax = getBookedPaxForShift(excursion.title, shift, dateStr, bookings);
  const availableSpots = Math.max(0, totalCapacity - bookedPax);

  return {
    totalCapacity,
    bookedPax,
    availableSpots,
    isSoldOut: availableSpots <= 0
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

  return {
    isOperational,
    isBlocked,
    isPast,
    totalCapacity,
    bookedPax,
    availableSpots,
    isSoldOut,
    shiftsSummary
  };
}
