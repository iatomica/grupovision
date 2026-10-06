import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Users, 
  Plus, 
  Ticket, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Filter,
  Eye,
  MapPin,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { Excursion } from '../data/excursionsData';
import { Booking } from './JiraTicketModal';
import { getDayLiveCapacity, getExcursionEffectiveShifts, getShiftLiveCapacity } from '../utils/calendarCapacity';

interface AdminCalendarOperationsProps {
  excursions: Excursion[];
  bookings: Booking[];
  onOpenManualModal: (date?: string, excursionId?: string) => void;
  onSelectBookingTicket?: (booking: Booking) => void;
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const WEEKDAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export const AdminCalendarOperations: React.FC<AdminCalendarOperationsProps> = ({
  excursions,
  bookings,
  onOpenManualModal,
  onSelectBookingTicket
}) => {
  const [selectedExcursionFilter, setSelectedExcursionFilter] = useState<string>('all');
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [inspectedDate, setInspectedDate] = useState<string>(() => new Date().toISOString().split('T')[0]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleGoToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setInspectedDate(today.toISOString().split('T')[0]);
  };

  const filteredExcursions = useMemo(() => {
    if (selectedExcursionFilter === 'all') return excursions.filter(e => e.isPublished !== false);
    return excursions.filter(e => e.id === selectedExcursionFilter);
  }, [excursions, selectedExcursionFilter]);

  // Días del mes a renderizar
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayWeekday = new Date(year, month, 1).getDay(); // 0=Dom..6=Sáb

  const calendarDays = useMemo(() => {
    const days: {
      dayNum: number;
      dateStr: string;
      isCurrentMonth: boolean;
      totalCapacity: number;
      bookedPax: number;
      availableSpots: number;
      bookingsCount: number;
      isOperational: boolean;
    }[] = [];

    // Mes anterior
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const dNum = prevMonthDays - i;
      const prevDate = new Date(year, month - 1, dNum);
      const dateStr = prevDate.toISOString().split('T')[0];
      days.push({
        dayNum: dNum,
        dateStr,
        isCurrentMonth: false,
        totalCapacity: 0,
        bookedPax: 0,
        availableSpots: 0,
        bookingsCount: 0,
        isOperational: false
      });
    }

    // Mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dateStr = d.toISOString().split('T')[0];

      // Calcular capacidad agregada para las excursiones filtradas en esta fecha
      let dayCapacity = 0;
      let dayBooked = 0;
      let dayOperational = false;

      filteredExcursions.forEach(exc => {
        const diag = getDayLiveCapacity(exc, dateStr, bookings);
        if (diag.isOperational && !diag.isBlocked) {
          dayOperational = true;
          dayCapacity += diag.totalCapacity;
          dayBooked += diag.bookedPax;
        }
      });

      // Contar reservas en esa fecha
      const dayBookings = bookings.filter(b => {
        if (b.date !== dateStr) return false;
        if (selectedExcursionFilter === 'all') return true;
        const target = excursions.find(e => e.id === selectedExcursionFilter);
        return target ? b.excursionTitle.toLowerCase().includes(target.title.toLowerCase()) : true;
      });

      days.push({
        dayNum: day,
        dateStr,
        isCurrentMonth: true,
        totalCapacity: dayCapacity,
        bookedPax: dayBooked,
        availableSpots: Math.max(0, dayCapacity - dayBooked),
        bookingsCount: dayBookings.length,
        isOperational: dayOperational
      });
    }

    // Mes posterior
    const remaining = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remaining; day++) {
      const nextDate = new Date(year, month + 1, day);
      const dateStr = nextDate.toISOString().split('T')[0];
      days.push({
        dayNum: day,
        dateStr,
        isCurrentMonth: false,
        totalCapacity: 0,
        bookedPax: 0,
        availableSpots: 0,
        bookingsCount: 0,
        isOperational: false
      });
    }

    return days;
  }, [year, month, filteredExcursions, bookings, selectedExcursionFilter, excursions]);

  // Reservas del día inspeccionado
  const inspectedDayBookings = useMemo(() => {
    return bookings.filter(b => {
      if (b.date !== inspectedDate) return false;
      if (selectedExcursionFilter === 'all') return true;
      const target = excursions.find(e => e.id === selectedExcursionFilter);
      return target ? b.excursionTitle.toLowerCase().includes(target.title.toLowerCase()) : true;
    });
  }, [bookings, inspectedDate, selectedExcursionFilter, excursions]);

  // Turnos y cupos del día inspeccionado para las excursiones activas
  const inspectedDayShifts = useMemo(() => {
    const list: {
      excursion: Excursion;
      shift: any;
      totalCapacity: number;
      bookedPax: number;
      availableSpots: number;
      isSoldOut: boolean;
    }[] = [];

    filteredExcursions.forEach(exc => {
      const diag = getDayLiveCapacity(exc, inspectedDate, bookings);
      if (diag.isOperational && !diag.isBlocked) {
        diag.shiftsSummary.forEach(s => {
          list.push({
            excursion: exc,
            shift: s.shift,
            totalCapacity: s.totalCapacity,
            bookedPax: s.bookedPax,
            availableSpots: s.availableSpots,
            isSoldOut: s.isSoldOut
          });
        });
      }
    });

    return list;
  }, [filteredExcursions, inspectedDate, bookings]);

  // Totales del día inspeccionado
  const totalInspectedPax = inspectedDayBookings.reduce((sum, b) => sum + (Number(b.guests) || 1), 0);
  const totalInspectedCapacity = inspectedDayShifts.reduce((sum, s) => sum + s.totalCapacity, 0);

  // Formato de fecha
  const formattedInspectedDate = useMemo(() => {
    try {
      const [y, m, d] = inspectedDate.split('-').map(Number);
      return new Date(y, m - 1, d).toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return inspectedDate;
    }
  }, [inspectedDate]);

  return (
    <div className="space-y-6">
      {/* 1. Barra de Controles y Filtros */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00A896]/10 border border-[#00A896]/20 flex items-center justify-center text-[#00A896]">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-lg">
              Calendario de Salidas, Turnos & Ocupación
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Control de cupos en tiempo real, gestión de flota y prevención de sobreventas
            </p>
          </div>
        </div>

        {/* Controles de Filtro & Acción de Carga Mostrador */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Selector de Excursión */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedExcursionFilter}
              onChange={e => setSelectedExcursionFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              <option value="all">Todas las Excursiones ({excursions.length})</option>
              {excursions.map(e => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>

          {/* Botón Carga Manual Mostrador */}
          <button
            type="button"
            onClick={() => onOpenManualModal(inspectedDate, selectedExcursionFilter !== 'all' ? selectedExcursionFilter : undefined)}
            className="inline-flex items-center gap-2 bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Cargar Pasajeros (Mostrador)</span>
          </button>
        </div>
      </div>

      {/* 2. Grid Principal: Calendario Mensual a la izquierda, Detalle a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: CALENDARIO MENSUAL (7 o 8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
          
          {/* Cabecera del mes con Navegación */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-slate-900 capitalize">
                {MONTH_NAMES[month]} {year}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {filteredExcursions.length} servicios activos
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleGoToday}
                className="px-3 py-1.5 text-xs font-mono font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer mr-1"
              >
                Hoy
              </button>
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                title="Mes anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                title="Mes siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Días de la Semana */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-mono font-bold text-slate-400">
            {WEEKDAY_NAMES.map((wd, i) => (
              <div key={i} className="py-1">{wd}</div>
            ))}
          </div>

          {/* Cuadrícula de Días */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((item, idx) => {
              const isInspected = item.dateStr === inspectedDate;
              const hasCapacity = item.totalCapacity > 0;
              const occupancyPercent = hasCapacity 
                ? Math.round((item.bookedPax / item.totalCapacity) * 100) 
                : 0;

              const isFull = hasCapacity && item.availableSpots === 0;
              const isHigh = hasCapacity && occupancyPercent >= 75 && !isFull;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (item.isCurrentMonth) {
                      setInspectedDate(item.dateStr);
                    }
                  }}
                  className={`min-h-[78px] sm:min-h-[88px] p-2 rounded-2xl border flex flex-col justify-between transition-all text-left relative cursor-pointer ${
                    isInspected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-[#00A896]'
                      : !item.isCurrentMonth
                      ? 'opacity-25 bg-slate-50 border-slate-100 cursor-default'
                      : !item.isOperational
                      ? 'bg-slate-50/70 border-slate-200/80 text-slate-400'
                      : isFull
                      ? 'bg-rose-50/70 border-rose-200 text-slate-900 hover:border-rose-400'
                      : isHigh
                      ? 'bg-amber-50/70 border-amber-200 text-slate-900 hover:border-amber-400'
                      : 'bg-white border-slate-200 hover:border-[#00A896] hover:bg-emerald-50/20 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs font-black font-mono leading-none ${
                      isInspected ? 'text-white' : 'text-slate-800'
                    }`}>
                      {item.dayNum}
                    </span>

                    {/* Bookings Counter Pill */}
                    {item.isCurrentMonth && item.bookingsCount > 0 && (
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                        isInspected
                          ? 'bg-[#00A896] text-white'
                          : 'bg-slate-200 text-slate-800'
                      }`}>
                        {item.bookingsCount} res.
                      </span>
                    )}
                  </div>

                  {/* Detalle Operativo en la Celda */}
                  {item.isCurrentMonth && item.isOperational && hasCapacity ? (
                    <div className="space-y-1 w-full pt-1">
                      <div className="flex items-center justify-between text-[10px] font-mono leading-none">
                        <span className={isInspected ? 'text-slate-300' : 'text-slate-500'}>
                          {item.bookedPax} / {item.totalCapacity} pax
                        </span>
                        <span className={`font-bold ${
                          isInspected 
                            ? 'text-emerald-300' 
                            : isFull 
                            ? 'text-rose-600' 
                            : isHigh 
                            ? 'text-amber-600' 
                            : 'text-emerald-600'
                        }`}>
                          {occupancyPercent}%
                        </span>
                      </div>

                      {/* Mini Barra de Progreso de Ocupación */}
                      <div className={`h-1.5 rounded-full overflow-hidden ${
                        isInspected ? 'bg-slate-700' : 'bg-slate-100'
                      }`}>
                        <div 
                          className={`h-full rounded-full transition-all ${
                            isFull 
                              ? 'bg-rose-500' 
                              : isHigh 
                              ? 'bg-amber-500' 
                              : 'bg-[#00A896]'
                          }`}
                          style={{ width: `${Math.min(100, occupancyPercent)}%` }}
                        />
                      </div>

                      <div className={`text-[9px] font-mono truncate leading-none ${
                        isInspected 
                          ? 'text-slate-300' 
                          : isFull 
                          ? 'text-rose-600 font-bold' 
                          : 'text-slate-400'
                      }`}>
                        {isFull ? 'AGOTADO' : `${item.availableSpots} libres`}
                      </div>
                    </div>
                  ) : item.isCurrentMonth && !item.isOperational ? (
                    <div className="text-[10px] text-slate-400 font-mono italic">
                      Sin salidas
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Referencias */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A896]" />
                <span>Ocupación Normal (&lt;75%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Alta Demanda (≥75%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Completo / Agotado</span>
              </span>
            </div>
            <span>Clic en cualquier día para ver pasajeros y turnos</span>
          </div>
        </div>

        {/* COLUMNA DERECHA: DETALLE DEL DÍA INSPECCIONADO (4 o 5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          
          {/* Tarjeta Resumen del Día */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Detalle de Operaciones Diarias
                </span>
                <h4 className="font-black text-slate-900 text-base capitalize">
                  {formattedInspectedDate}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => onOpenManualModal(inspectedDate, selectedExcursionFilter !== 'all' ? selectedExcursionFilter : undefined)}
                className="px-3 py-1.5 rounded-xl bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer transition-all"
                title="Cargar pasajeros para esta fecha"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Cargar Pax</span>
              </button>
            </div>

            {/* KPIs del Día */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Total Pasajeros</span>
                <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                  {totalInspectedPax} pax
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  de {totalInspectedCapacity} cupos totales
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <span className="text-[10px] font-mono text-emerald-800 uppercase block">Cupos Libres</span>
                <div className="text-xl font-black text-[#00A896] font-mono mt-0.5">
                  {Math.max(0, totalInspectedCapacity - totalInspectedPax)}
                </div>
                <span className="text-[10px] text-emerald-700 font-mono">
                  disponibles para venta
                </span>
              </div>
            </div>

            {/* Turnos Programados para el Día */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Turnos y Salidas del Día ({inspectedDayShifts.length}):</span>
              </label>

              {inspectedDayShifts.length > 0 ? (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {inspectedDayShifts.map((item, sIdx) => {
                    const isSoldOut = item.availableSpots <= 0;
                    return (
                      <div 
                        key={sIdx}
                        className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate text-[11px]">
                            {item.excursion.title}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3 h-3 text-[#00A896]" />
                            <span>{item.shift.name} ({item.shift.time})</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          {isSoldOut ? (
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-mono font-bold">
                              LLENO ({item.totalCapacity})
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                              {item.availableSpots} libres
                            </span>
                          )}
                          <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                            {item.bookedPax} / {item.totalCapacity} pax
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 text-xs text-slate-400 font-mono text-center bg-slate-50 rounded-xl">
                  Sin turnos operativos configurados para esta fecha.
                </div>
              )}
            </div>
          </div>

          {/* Listado de Pasajeros / Reservas del Día */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00A896]" />
                <span>Pasajeros Confirmados ({inspectedDayBookings.length})</span>
              </h5>
              <span className="text-[11px] font-mono text-slate-400">
                {totalInspectedPax} pax totales
              </span>
            </div>

            {inspectedDayBookings.length > 0 ? (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {inspectedDayBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => onSelectBookingTicket && onSelectBookingTicket(b)}
                    className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50/80 transition-all cursor-pointer space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <span>{b.customerName}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">
                            {b.guests} pax
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{b.customerPhone}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {b.code}
                        </span>
                        <div className="text-[9px] font-mono text-[#00A896] font-bold mt-1">
                          USD ${b.totalPriceUSD}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
                      <span className="truncate max-w-[180px]">{b.excursionTitle}</span>
                      <span className="capitalize px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                        {b.source ? b.source.replace('mostrador-', 'Local ') : 'Web'}
                      </span>
                    </div>

                    {b.pickupLocation && (
                      <div className="text-[10px] text-slate-600 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#00A896] shrink-0" />
                        <span className="truncate">{b.pickupLocation}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 space-y-2">
                <p>No hay pasajeros registrados para este día.</p>
                <button
                  type="button"
                  onClick={() => onOpenManualModal(inspectedDate, selectedExcursionFilter !== 'all' ? selectedExcursionFilter : undefined)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Registrar Pasajeros Ahora</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
