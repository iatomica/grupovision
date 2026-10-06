import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Users, 
  Calendar, 
  Clock, 
  Building2, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Ticket,
  MapPin,
  Phone,
  User,
  CreditCard
} from 'lucide-react';
import { Excursion, ExcursionShift } from '../data/excursionsData';
import { Booking } from './JiraTicketModal';
import { getExcursionEffectiveShifts, getShiftLiveCapacity, getDayLiveCapacity } from '../utils/calendarCapacity';

interface ManualPassengerModalProps {
  isOpen: boolean;
  onClose: () => void;
  excursions: Excursion[];
  bookings: Booking[];
  defaultDate?: string;
  defaultExcursionId?: string;
  onSaveBooking: (newBooking: Booking) => void;
  currentUser?: string;
}

export const ManualPassengerModal: React.FC<ManualPassengerModalProps> = ({
  isOpen,
  onClose,
  excursions,
  bookings,
  defaultDate,
  defaultExcursionId,
  onSaveBooking,
  currentUser = 'Operador Mostrador'
}) => {
  const publishedExcursions = useMemo(() => {
    return excursions.filter(e => e.isPublished !== false);
  }, [excursions]);

  const [selectedExcursionId, setSelectedExcursionId] = useState<string>(() => {
    return defaultExcursionId || (publishedExcursions[0]?.id || '');
  });

  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return defaultDate || getTomorrowStr();
  });

  const [selectedShiftId, setSelectedShiftId] = useState<string>('');
  const [passengersCount, setPassengersCount] = useState<number>(2);
  const [branch, setBranch] = useState<'Urquiza 276 (Centro Cívico)' | 'San Martín 398 (Casa Central)'>('Urquiza 276 (Centro Cívico)');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<string>('Pasan por local Urquiza 276');
  const [paymentMethod, setPaymentMethod] = useState<string>('Efectivo en Mostrador (ARS)');
  const [notes, setNotes] = useState<string>('');
  const [priority, setPriority] = useState<'NORMAL' | 'ALTA' | 'VIP'>('NORMAL');

  // Excursión activa
  const currentExcursion = useMemo(() => {
    return publishedExcursions.find(e => e.id === selectedExcursionId) || publishedExcursions[0];
  }, [publishedExcursions, selectedExcursionId]);

  // Turnos efectivos de la excursión seleccionada
  const shifts = useMemo(() => {
    if (!currentExcursion) return [];
    return getExcursionEffectiveShifts(currentExcursion);
  }, [currentExcursion]);

  // Estado de cupos de cada turno para la fecha seleccionada
  const shiftsCapacity = useMemo(() => {
    if (!currentExcursion || !selectedDate) return [];
    return shifts.map(shift => {
      const cap = getShiftLiveCapacity(currentExcursion, shift, selectedDate, bookings);
      return {
        shift,
        ...cap
      };
    });
  }, [currentExcursion, shifts, selectedDate, bookings]);

  // Mantener o seleccionar automáticamente el primer turno con cupo disponible
  useEffect(() => {
    if (shiftsCapacity.length > 0) {
      const currentSelected = shiftsCapacity.find(s => s.shift.id === selectedShiftId);
      if (!currentSelected || currentSelected.availableSpots <= 0) {
        const firstAvailable = shiftsCapacity.find(s => s.availableSpots > 0);
        if (firstAvailable) {
          setSelectedShiftId(firstAvailable.shift.id);
        } else {
          setSelectedShiftId(shiftsCapacity[0].shift.id);
        }
      }
    }
  }, [shiftsCapacity, selectedShiftId]);

  // Capacidad del turno seleccionado actualmente
  const activeShiftInfo = useMemo(() => {
    return shiftsCapacity.find(s => s.shift.id === selectedShiftId) || shiftsCapacity[0];
  }, [shiftsCapacity, selectedShiftId]);

  const maxSpotsAvailable = activeShiftInfo ? activeShiftInfo.availableSpots : 0;
  const isOverbookingRisk = passengersCount > maxSpotsAvailable;

  // Cálculo de tarifas
  const rateUSD = currentExcursion ? currentExcursion.priceNum : 60;
  const totalUSD = rateUSD * passengersCount;
  const estimatedARS = totalUSD * 1400;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentExcursion) return;

    if (isOverbookingRisk) {
      alert(`No es posible confirmar la carga: se intentan registrar ${passengersCount} pasajeros pero solo quedan ${maxSpotsAvailable} cupos disponibles en este turno para evitar sobreventa.`);
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Por favor complete el nombre del titular y el teléfono de contacto.');
      return;
    }

    const code = `GV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      id: `b-desk-${Date.now().toString().slice(-5)}`,
      code,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || 'mostrador@grupovision.tur.ar',
      excursionTitle: currentExcursion.title,
      date: selectedDate,
      guests: Number(passengersCount),
      totalPriceUSD: totalUSD,
      pickupLocation: pickupLocation.trim() || 'Sucursal Mostrador',
      status: 'CONFIRMADA',
      ticketType: 'Reserva',
      priority,
      shiftId: activeShiftInfo?.shift.id,
      shiftTime: activeShiftInfo?.shift.time,
      shiftName: activeShiftInfo?.shift.name,
      source: branch.includes('Urquiza') ? 'mostrador-urquiza' : 'mostrador-san-martin',
      paymentMethod,
      assignedGuide: 'Asignación Logística Mostrador',
      assignedVehicle: 'Flota Receptiva Grupo Visión',
      operatorNotes: `[Carga Mostrador ${branch} por ${currentUser}]: ${paymentMethod}. ${notes}`.trim(),
      createdAt: new Date().toLocaleString('es-AR'),
      comments: [
        {
          id: `c-desk-${Date.now()}`,
          authorName: currentUser,
          authorEmail: 'operador@grupovision.tur.ar',
          avatar: 'OP',
          content: `Pasajeros recibidos presencialmente en ${branch}. Cupo confirmado de ${passengersCount} lugares para el ${selectedDate} en ${activeShiftInfo?.shift.name} (${activeShiftInfo?.shift.time}). Pago: ${paymentMethod}.`,
          createdAt: 'Justo ahora'
        }
      ],
      attachments: []
    };

    onSaveBooking(newBooking);
    onClose();

    // Reset form
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setNotes('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl relative flex flex-col max-h-[88vh] overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[88vh] overflow-hidden">
          {/* Header Modal (Fixed Top) */}
          <div className="shrink-0 flex items-center justify-between gap-4 p-5 sm:p-6 pb-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#00A896]/10 border border-[#00A896]/30 flex items-center justify-center text-[#00A896] shrink-0">
                <Ticket className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    Carga Manual de Pasajeros (Mostrador)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Anti-Sobreventa
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Registrá reservas presenciales en el local. Descuenta cupos en tiempo real para mantener el sistema actualizado.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer shrink-0"
              title="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Configuration Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          {/* 1. Sucursal de Atención & Prioridad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#00A896]" />
                <span>Sucursal Receptora (Local)</span>
              </label>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] text-xs"
              >
                <option value="Urquiza 276 (Centro Cívico)">Urquiza 276 (Centro Cívico)</option>
                <option value="San Martín 398 (Casa Central)">San Martín 398 (Casa Central)</option>
              </select>
            </div>

            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Tipo de Pasajero / Prioridad</span>
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] text-xs"
              >
                <option value="NORMAL">Turista Regular (Normal)</option>
                <option value="ALTA">Alta Prioridad / Contingente</option>
                <option value="VIP">Atención VIP / Huésped de Lujo</option>
              </select>
            </div>
          </div>

          {/* 2. Excursión y Fecha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1">
                Excursión Contratada
              </label>
              <select
                value={selectedExcursionId}
                onChange={e => setSelectedExcursionId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] text-xs"
              >
                {publishedExcursions.map(exc => (
                  <option key={exc.id} value={exc.id}>
                    {exc.title} (USD ${exc.priceNum})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00A896]" />
                <span>Fecha de Salida</span>
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold focus:outline-none focus:border-[#00A896] text-xs text-slate-800"
              />
            </div>
          </div>

          {/* 3. Selección de Turno & Control de Cupos */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-mono font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00A896]" />
                <span>Turno y Horario de Salida (Cupos en Vivo)</span>
              </label>
              <span className="text-[10px] font-mono text-slate-500">
                Seleccioná el horario que solicitó el cliente
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {shiftsCapacity.map(({ shift, availableSpots, totalCapacity, isSoldOut }) => {
                const isSelected = selectedShiftId === shift.id;
                const isLow = availableSpots > 0 && availableSpots <= 4;

                return (
                  <div
                    key={shift.id}
                    onClick={() => {
                      if (!isSoldOut) {
                        setSelectedShiftId(shift.id);
                      }
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSoldOut
                        ? 'bg-slate-100/80 border-slate-200 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-white border-[#00A896] ring-2 ring-[#00A896]/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{shift.name}</span>
                        {isSelected && !isSoldOut && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {shift.time} • Cap. {totalCapacity}
                      </div>
                    </div>

                    <div className="text-right">
                      {isSoldOut ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-mono font-bold">
                          Agotado (0)
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold animate-pulse">
                          {availableSpots} cupos
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                          {availableSpots} cupos
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selector de Cantidad de Pasajeros */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200/60">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-600" />
                <span className="font-mono font-bold text-slate-700">Cantidad de Pasajeros (Pax):</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setPassengersCount(prev => Math.max(1, prev - 1))}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={maxSpotsAvailable || 20}
                    value={passengersCount}
                    onChange={e => setPassengersCount(Math.max(1, Number(e.target.value)))}
                    className="w-12 text-center py-1 font-mono font-bold text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPassengersCount(prev => prev + 1)}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Indicador de Cupo Restante tras la carga */}
              <div className="text-right font-mono text-[11px]">
                {!isOverbookingRisk ? (
                  <span className="text-emerald-700 font-semibold">
                    Quedarán <strong>{maxSpotsAvailable - passengersCount}</strong> cupos libres tras confirmar
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold flex items-center gap-1 justify-end">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    ¡Supera el cupo disponible de {maxSpotsAvailable} lugares!
                  </span>
                )}
              </div>
            </div>

            {/* Banner de Bloqueo por Sobreventa */}
            {isOverbookingRisk && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2.5 mt-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Bloqueo de Prevención de Sobreventa:</strong>
                  Solo quedan <strong>{maxSpotsAvailable} cupos disponibles</strong> en el turno seleccionado. Reduzca la cantidad de pasajeros a {maxSpotsAvailable} o elija otro turno/fecha con cupo suficiente.
                </div>
              </div>
            )}
          </div>

          {/* 4. Datos del Pasajero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Nombre del Titular *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Marcos Etcheverry"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] text-xs"
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#00A896]" />
                <span>Teléfono / WhatsApp *</span>
              </label>
              <input
                type="text"
                required
                placeholder="+54 9 11 ..."
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-[#00A896] text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1">
                Lugar de Pick-Up / Hotel
              </label>
              <input
                type="text"
                placeholder="Ej: Hotel Cristal o Local Urquiza"
                value={pickupLocation}
                onChange={e => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] text-xs"
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                <span>Modalidad de Cobro en Local</span>
              </label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] text-xs"
              >
                <option value="Efectivo en Mostrador (ARS)">Efectivo en Mostrador (ARS)</option>
                <option value="Efectivo en Dólares (USD)">Efectivo en Dólares (USD)</option>
                <option value="Tarjeta de Débito / Crédito">Tarjeta de Débito / Crédito</option>
                <option value="Transferencia Bancaria / MP">Transferencia Bancaria / Mercado Pago</option>
                <option value="Seña 50% en Local">Seña 50% en Local (Saldo al subir)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-slate-600 mb-1">Notas Internas / Mostrador (Opcional)</label>
            <input
              type="text"
              placeholder="Ej: Pasajeros retiraron voucher impreso, solicitaron asiento adelante"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
            />
          </div>
          </div>
          {/* Fin del cuerpo scrolleable */}

          {/* Resumen Final de Cobro & Botón Confirmar (Fixed Footer) */}
          <div className="shrink-0 p-4 sm:p-5 bg-slate-900 text-white border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_-8px_20px_rgba(0,0,0,0.15)]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">
                Importe Total ({passengersCount} pax x USD ${rateUSD}):
              </span>
              <div className="text-xl font-black text-emerald-400 font-mono">
                USD ${totalUSD} <span className="text-xs text-slate-300 font-normal">~ ARS ${estimatedARS.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isOverbookingRisk || maxSpotsAvailable <= 0}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isOverbookingRisk || maxSpotsAvailable <= 0
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
                    : 'bg-[#00A896] hover:bg-[#028090] text-white cursor-pointer hover:scale-[1.02] active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar & Descontar Cupos</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
