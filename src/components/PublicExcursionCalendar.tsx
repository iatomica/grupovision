import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Users, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  DollarSign,
  MessageCircle
} from 'lucide-react';
import { Excursion, ExcursionShift } from '../data/excursionsData';
import { Booking } from './JiraTicketModal';
import { getDayLiveCapacity, getShiftLiveCapacity, getExcursionEffectiveShifts } from '../utils/calendarCapacity';

interface PublicExcursionCalendarProps {
  excursion: Excursion;
  activePrice: number;
  currentLang: 'es' | 'en' | 'pt';
  bookings: Booking[];
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  selectedShiftId: string | null;
  onSelectShiftId: (shiftId: string) => void;
  passengers: number;
  onChangePassengers: (pax: number) => void;
  onConfirmWhatsApp: () => void;
}

const MONTH_NAMES = {
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
};

const WEEKDAY_NAMES = {
  es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  pt: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
};

export const PublicExcursionCalendar: React.FC<PublicExcursionCalendarProps> = ({
  excursion,
  activePrice,
  currentLang,
  bookings,
  selectedDate,
  onSelectDate,
  selectedShiftId,
  onSelectShiftId,
  passengers,
  onChangePassengers,
  onConfirmWhatsApp
}) => {
  // Inicializar en el mes de la fecha seleccionada o fecha actual
  const initialDate = useMemo(() => {
    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        return new Date(Number(parts[0]), Number(parts[1]) - 1, 1);
      }
    }
    return new Date();
  }, []);

  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(initialDate);

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const handleGoToday = () => {
    const today = new Date();
    setCurrentMonthDate(new Date(today.getFullYear(), today.getMonth(), 1));
    const todayStr = today.toISOString().split('T')[0];
    onSelectDate(todayStr);
  };

  // Días del mes a renderizar
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayWeekday = new Date(year, month, 1).getDay(); // 0=Dom..6=Sáb

  const calendarDays = useMemo(() => {
    const days: {
      dayNum: number;
      dateStr: string;
      isCurrentMonth: boolean;
      status: ReturnType<typeof getDayLiveCapacity>;
    }[] = [];

    // Relleno días mes anterior
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const dNum = prevMonthDays - i;
      const prevDate = new Date(year, month - 1, dNum);
      const dateStr = prevDate.toISOString().split('T')[0];
      const status = getDayLiveCapacity(excursion, dateStr, bookings);
      days.push({
        dayNum: dNum,
        dateStr,
        isCurrentMonth: false,
        status
      });
    }

    // Días del mes corriente
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dateStr = d.toISOString().split('T')[0];
      const status = getDayLiveCapacity(excursion, dateStr, bookings);
      days.push({
        dayNum: day,
        dateStr,
        isCurrentMonth: true,
        status
      });
    }

    // Relleno mes posterior hasta completar cuadrícula múltiplo de 7
    const remaining = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remaining; day++) {
      const nextDate = new Date(year, month + 1, day);
      const dateStr = nextDate.toISOString().split('T')[0];
      const status = getDayLiveCapacity(excursion, dateStr, bookings);
      days.push({
        dayNum: day,
        dateStr,
        isCurrentMonth: false,
        status
      });
    }

    return days;
  }, [year, month, excursion, bookings]);

  // Diagnóstico en vivo de la fecha seleccionada
  const selectedDateStatus = useMemo(() => {
    return getDayLiveCapacity(excursion, selectedDate, bookings);
  }, [excursion, selectedDate, bookings]);

  // Turno seleccionado actualmente
  const effectiveShifts = useMemo(() => {
    return selectedDateStatus.shiftsSummary;
  }, [selectedDateStatus]);

  const activeShiftItem = effectiveShifts.find(s => s.shift.id === selectedShiftId) || effectiveShifts[0];

  // Máximo cupo para el turno activo
  const maxAvailableForShift = activeShiftItem ? activeShiftItem.availableSpots : 0;

  // Formato legible de la fecha seleccionada
  const formattedSelectedDate = useMemo(() => {
    try {
      const [y, m, d] = selectedDate.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : currentLang === 'en' ? 'en-US' : 'es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return selectedDate;
    }
  }, [selectedDate, currentLang]);

  // Cotización estimada
  const totalUSD = activePrice * passengers;
  const estimatedARS = totalUSD * 1400; // Tipo de cambio estimado

  return (
    <div className="space-y-4">
      {/* 1. Header con Navegación de Mes */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00A896]/20 border border-[#00A896]/40 flex items-center justify-center text-[#00A896]">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <span>{MONTH_NAMES[currentLang][month]} {year}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Tarifas & Cupos en Vivo
                </span>
              </h4>
              <p className="text-[11px] text-slate-300">
                Seleccioná una fecha para ver horarios, cupos disponibles y cotización
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleGoToday}
              className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-700/80 hover:bg-slate-600 text-slate-200 transition-all mr-1 cursor-pointer"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-600 text-white transition-all cursor-pointer"
              title="Mes anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-600 text-white transition-all cursor-pointer"
              title="Mes siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Cuadrícula de Calendario Mensual */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs space-y-2">
        {/* Cabecera de días de la semana */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center text-[11px] font-mono font-bold text-slate-500 pb-2 border-b border-slate-100">
          {WEEKDAY_NAMES[currentLang].map((wd, i) => (
            <div key={i} className="py-0.5">{wd}</div>
          ))}
        </div>

        {/* Celdas de los días */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {calendarDays.map((item, idx) => {
            const isSelected = item.dateStr === selectedDate;
            const { isOperational, isBlocked, isPast, isSoldOut, availableSpots } = item.status;
            
            const isClickable = !isPast && isOperational && !isBlocked;

            return (
              <button
                key={idx}
                type="button"
                disabled={!isClickable}
                onClick={() => {
                  if (isClickable) {
                    onSelectDate(item.dateStr);
                    // auto seleccionar primer turno con cupo
                    const firstWithSpots = item.status.shiftsSummary.find(s => s.availableSpots > 0);
                    if (firstWithSpots) {
                      onSelectShiftId(firstWithSpots.shift.id);
                    }
                  }
                }}
                className={`min-h-[58px] sm:min-h-[64px] p-1 sm:p-1.5 rounded-xl border flex flex-col justify-between items-start transition-all text-left relative cursor-pointer ${
                  isSelected
                    ? 'bg-[#00A896] text-white border-[#00A896] shadow-md ring-2 ring-[#00A896]/30 z-10'
                    : !item.isCurrentMonth
                    ? 'opacity-35 bg-slate-50 border-slate-100'
                    : isPast
                    ? 'opacity-40 bg-slate-50 border-slate-200 cursor-not-allowed'
                    : !isOperational || isBlocked
                    ? 'bg-slate-50/80 border-slate-200 text-slate-400 cursor-not-allowed'
                    : isSoldOut
                    ? 'bg-rose-50/50 border-rose-200 text-slate-600'
                    : 'bg-white border-slate-200/90 hover:border-[#00A896] hover:bg-emerald-50/20 text-slate-800'
                }`}
              >
                {/* Número de día y badge rápido */}
                <div className="w-full flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-bold font-mono leading-none ${
                    isSelected ? 'text-white' : 'text-slate-800'
                  }`}>
                    {item.dayNum}
                  </span>

                  {/* Indicador de estado */}
                  {isClickable && (
                    <span className={`w-2 h-2 rounded-full ${
                      isSelected 
                        ? 'bg-white' 
                        : isSoldOut 
                        ? 'bg-rose-500' 
                        : availableSpots <= 4 
                        ? 'bg-amber-400 animate-pulse' 
                        : 'bg-emerald-500'
                    }`} />
                  )}
                </div>

                {/* Subtítulo: Tarifa y Cupos en celda */}
                <div className="w-full text-[9px] sm:text-[10px] leading-tight space-y-0.5">
                  {isClickable ? (
                    <>
                      <div className={`font-mono font-black ${
                        isSelected ? 'text-emerald-100' : 'text-[#00A896]'
                      }`}>
                        ${activePrice}
                      </div>
                      <div className={`truncate font-mono ${
                        isSelected ? 'text-white/90' : isSoldOut ? 'text-rose-600 font-bold' : availableSpots <= 4 ? 'text-amber-700 font-bold' : 'text-slate-500'
                      }`}>
                        {isSoldOut ? 'Agotado' : `${availableSpots} cupos`}
                      </div>
                    </>
                  ) : isPast ? (
                    <span className="text-slate-400 text-[8px] font-mono">Pasado</span>
                  ) : !isOperational ? (
                    <span className="text-slate-400 text-[8px] font-mono">Sin salida</span>
                  ) : isBlocked ? (
                    <span className="text-rose-400 text-[8px] font-mono">Cerrado</span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {/* Referencias del calendario */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Cupos Disponibles</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Últimos Lugares (≤ 4)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Agotado</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span>No Operativo / Cerrado</span>
            </span>
          </div>

          <span className="text-[#00A896] font-bold">
            Tarifa Base: USD ${activePrice} / pax
          </span>
        </div>
      </div>

      {/* 3. Panel de Turnos y Cupos para la Fecha Seleccionada */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 border border-slate-200 shadow-sm space-y-4">
        {/* Banner de Fecha Seleccionada */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
            <span className="font-bold text-slate-900 text-sm capitalize">
              {formattedSelectedDate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500">Tarifa para esta fecha:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-black text-xs">
              USD ${activePrice} / pax
            </span>
          </div>
        </div>

        {/* Turnos disponibles */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00A896]" />
              <span>Turnos y Horarios de Salida Disponibles:</span>
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              Cupos actualizados en tiempo real
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {effectiveShifts.map(({ shift, availableSpots, totalCapacity, isSoldOut }) => {
              const isSelected = activeShiftItem?.shift.id === shift.id;
              const isLow = availableSpots > 0 && availableSpots <= 4;

              return (
                <div
                  key={shift.id}
                  onClick={() => {
                    if (!isSoldOut) {
                      onSelectShiftId(shift.id);
                    }
                  }}
                  className={`p-3 rounded-xl border text-xs transition-all relative flex flex-col justify-between gap-2 ${
                    isSoldOut
                      ? 'bg-slate-100/70 border-slate-200 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-white border-[#00A896] ring-2 ring-[#00A896]/20 shadow-sm cursor-pointer'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{shift.name}</span>
                        {isSelected && !isSoldOut && (
                          <span className="w-2 h-2 rounded-full bg-[#00A896]" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{shift.time}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    {isSoldOut ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-mono font-bold shrink-0">
                        Agotado
                      </span>
                    ) : isLow ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold shrink-0 animate-pulse">
                        ¡Últimos {availableSpots} lugares!
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold shrink-0">
                        {availableSpots} cupos libres
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100 font-mono">
                    <span className="text-slate-400">Capacidad: {totalCapacity} pax</span>
                    <span className={`font-bold ${isSelected && !isSoldOut ? 'text-[#00A896]' : 'text-slate-600'}`}>
                      {isSoldOut ? 'Sin disponibilidad' : isSelected ? '✓ Seleccionado' : 'Elegir turno'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Selector de Pasajeros y Resumen de Cotización */}
        <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-mono text-slate-700 font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#00A896]" />
              <span>Pasajeros:</span>
            </span>

            <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => onChangePassengers(Math.max(1, passengers - 1))}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm cursor-pointer"
              >
                -
              </button>
              <span className="px-4 py-1 text-xs font-mono font-bold text-slate-900">
                {passengers}
              </span>
              <button
                type="button"
                disabled={passengers >= maxAvailableForShift}
                onClick={() => {
                  if (passengers < maxAvailableForShift) {
                    onChangePassengers(passengers + 1);
                  }
                }}
                className={`px-3 py-1.5 font-bold text-sm ${
                  passengers >= maxAvailableForShift
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer'
                }`}
                title={passengers >= maxAvailableForShift ? `Cupo máximo disponible: ${maxAvailableForShift}` : 'Agregar pasajero'}
              >
                +
              </button>
            </div>

            {maxAvailableForShift > 0 && passengers >= maxAvailableForShift && (
              <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Límite de cupo alcanzado ({maxAvailableForShift} máx)
              </span>
            )}
          </div>

          {/* Resumen de Tarifa */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-500">
                Tarifa total ({passengers} pax):
              </div>
              <div className="text-lg font-black text-[#00A896] font-mono leading-tight">
                USD ${totalUSD}
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                ~ ARS ${estimatedARS.toLocaleString('es-AR')}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Alerta de Sobreventa / Disponibilidad Confirmada */}
        {maxAvailableForShift <= 0 ? (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>Este turno está agotado para la fecha seleccionada. Elegí otro turno u otra fecha en el calendario.</span>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Salida y cupos confirmados para <strong>{passengers} pasajeros</strong> el <strong>{formattedSelectedDate}</strong> en <strong>{activeShiftItem?.shift.name} ({activeShiftItem?.shift.time})</strong>.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
