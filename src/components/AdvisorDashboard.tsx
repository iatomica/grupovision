import React, { useState, useMemo } from 'react';
import { 
  User, 
  UserPlus, 
  Users, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Ticket, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Compass, 
  Mountain, 
  Waves, 
  Sun, 
  ExternalLink, 
  Copy, 
  ShoppingBag, 
  DollarSign, 
  Percent,
  UserCheck,
  ChevronRight,
  Luggage,
  CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TravelerUser } from '../data/usersData';
import { Booking } from './JiraTicketModal';
import { Excursion } from '../data/excursionsData';

interface AdditionalPassenger {
  id: string;
  name: string;
  type: 'Adulto' | 'Menor';
  dni?: string;
}

interface AdvisorDashboardProps {
  travelers: TravelerUser[];
  bookings: Booking[];
  excursions: Excursion[];
  onUpdateTravelerDiscount: (travelerId: string, discountPercent: number) => void;
  onCreateBookingForTraveler: (bookingData: Omit<Booking, 'id' | 'code' | 'createdAt' | 'comments' | 'attachments'>) => void;
  onOpenTicketDetails: (booking: Booking) => void;
}

export const AdvisorDashboard: React.FC<AdvisorDashboardProps> = ({
  travelers,
  bookings,
  excursions,
  onUpdateTravelerDiscount,
  onCreateBookingForTraveler,
  onOpenTicketDetails
}) => {
  // Navigation: Kiosco POS (Principal) vs Historial de Tickets
  const [activeTab, setActiveTab] = useState<'kiosk' | 'history'>('kiosk');

  // Kiosk Step Stepper: 1. Pasajeros | 2. Excursión | 3. Fecha & Turno | 4. Confirmar
  const [kioskStep, setKioskStep] = useState<1 | 2 | 3 | 4>(1);

  // =========================================================================
  // FASE 1: PASAJEROS (SIN DIRECTORIO ESTÁTICO - ENTRADA DIRECTA)
  // =========================================================================
  const [leadPassenger, setLeadPassenger] = useState({
    name: '',
    phone: '',
    dni: '',
    email: '',
    hotel: ''
  });

  // Lista dinámica de acompañantes (si es 1 solo, se puede agregar con +)
  const [additionalPassengers, setAdditionalPassengers] = useState<AdditionalPassenger[]>([]);

  // Manual guest count overrides (para cuando el asesor sólo quiere indicar cantidad rápido)
  const [extraAdultsCount, setExtraAdultsCount] = useState<number>(0);
  const [extraChildrenCount, setExtraChildrenCount] = useState<number>(0);

  // Descuento discrecional que otorga el asesor (ej: 0%, 10%, 15%)
  const [advisorDiscountPercent, setAdvisorDiscountPercent] = useState<number>(0);

  // =========================================================================
  // FASE 2: EXCURSIÓN SELECCIONADA (ESTILO MCDONALD'S TOUCH)
  // =========================================================================
  const [categoryFilter, setCategoryFilter] = useState<string>('TODAS');
  const [selectedExcursion, setSelectedExcursion] = useState<Excursion | null>(excursions[0] || null);

  // =========================================================================
  // FASE 3: FECHA, TURNO & LOGÍSTICA
  // =========================================================================
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr);
  const [selectedShift, setSelectedShift] = useState<string>('09:00 hs');
  const [pickupOption, setPickupOption] = useState<string>('Oficina San Martín 398');
  const [advisorNotes, setAdvisorNotes] = useState<string>('');

  // =========================================================================
  // RESULTADO: MODAL DE ÉXITO POST-PEDIDO
  // =========================================================================
  const [lastCreatedTicket, setLastCreatedTicket] = useState<{
    code: string;
    customerName: string;
    customerPhone: string;
    excursionTitle: string;
    date: string;
    shift: string;
    totalGuests: number;
    passengersList: string[];
    total: number;
    pickup: string;
    emittedBy: string;
  } | null>(null);

  // =========================================================================
  // DETECCIÓN INTELIGENTE EN VIVO DE LO QUE YA TIENE RESERVADO
  // Busca en 'bookings' existentes del sistema central por Nombre o Teléfono
  // =========================================================================
  const detectedPastBookings = useMemo(() => {
    const cleanName = leadPassenger.name.trim().toLowerCase();
    const cleanPhone = leadPassenger.phone.replace(/[^0-9]/g, '');

    if (cleanName.length < 3 && cleanPhone.length < 6) return [];

    return bookings.filter(b => {
      const matchName = cleanName.length >= 3 && b.customerName.toLowerCase().includes(cleanName);
      const matchPhone = cleanPhone.length >= 6 && b.customerPhone.replace(/[^0-9]/g, '').includes(cleanPhone);
      return matchName || matchPhone;
    });
  }, [leadPassenger.name, leadPassenger.phone, bookings]);

  // Fechas ocupadas por reservas previas del pasajero
  const bookedDatesOfCustomer = useMemo(() => {
    return Array.from(new Set(detectedPastBookings.map(b => b.date)));
  }, [detectedPastBookings]);

  // Conflicto de fecha elegida con lo que ya tiene reservado
  const conflictingBooking = useMemo(() => {
    if (!selectedDate) return null;
    return detectedPastBookings.find(b => b.date === selectedDate);
  }, [selectedDate, detectedPastBookings]);

  // =========================================================================
  // CÁLCULO DE PASAJEROS & TARIFA
  // =========================================================================
  // El titular siempre es 1 adulto
  const totalAdults = 1 + additionalPassengers.filter(p => p.type === 'Adulto').length + extraAdultsCount;
  const totalChildren = additionalPassengers.filter(p => p.type === 'Menor').length + extraChildrenCount;
  const totalGuests = totalAdults + totalChildren;

  const adultPrice = selectedExcursion?.priceNum || 0;
  const childPrice = Math.round(adultPrice * 0.8); // 20% descuento menor
  const subtotal = (totalAdults * adultPrice) + (totalChildren * childPrice);
  const discountAmount = Math.round(subtotal * (advisorDiscountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  // Filtrado de excursiones para el paso 2
  const filteredExcursions = useMemo(() => {
    if (categoryFilter === 'TODAS') return excursions;
    return excursions.filter(ex => 
      ex.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
      ex.title.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }, [excursions, categoryFilter]);

  // =========================================================================
  // VALIDADOR DE FLUJO PROGRESIVO OBLIGATORIO (CERO ATAJOS)
  // =========================================================================
  const canGoToStep = (targetStep: 1 | 2 | 3 | 4) => {
    if (targetStep <= kioskStep) return true; // Siempre permite volver a pasos anteriores
    if (targetStep === 2) return Boolean(leadPassenger.name.trim());
    if (targetStep === 3) return Boolean(leadPassenger.name.trim() && selectedExcursion);
    if (targetStep === 4) return Boolean(leadPassenger.name.trim() && selectedExcursion && selectedDate);
    return false;
  };

  const handleStepClick = (targetStep: 1 | 2 | 3 | 4) => {
    if (canGoToStep(targetStep)) {
      setKioskStep(targetStep);
    }
  };

  // =========================================================================
  // CONTROLADORES DE ACOMPAÑANTES (+ AGREGAR PASAJERO)
  // =========================================================================
  const handleAddPassenger = () => {
    const newPassenger: AdditionalPassenger = {
      id: `pax-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: '',
      type: 'Adulto',
      dni: ''
    };
    setAdditionalPassengers(prev => [...prev, newPassenger]);
  };

  const handleUpdatePassenger = (id: string, field: keyof AdditionalPassenger, val: string) => {
    setAdditionalPassengers(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: val } : p
    ));
  };

  const handleRemovePassenger = (id: string) => {
    setAdditionalPassengers(prev => prev.filter(p => p.id !== id));
  };

  // =========================================================================
  // CONFIRMACIÓN DE PEDIDO & REGISTRO CENTRAL
  // =========================================================================
  const handleConfirmOrder = () => {
    if (!leadPassenger.name.trim() || !selectedExcursion) return;

    const ticketCode = `GV-${Math.floor(1000 + Math.random() * 9000)}`;

    // Construir lista nominal completa
    const nominalPassengerList: Array<{ name: string; type: 'Adulto' | 'Menor'; dni?: string }> = [
      { name: leadPassenger.name.trim(), type: 'Adulto', dni: leadPassenger.dni.trim() || undefined }
    ];

    additionalPassengers.forEach(p => {
      if (p.name.trim()) {
        nominalPassengerList.push({
          name: p.name.trim(),
          type: p.type,
          dni: p.dni?.trim() || undefined
        });
      }
    });

    const fullPassengerNames = nominalPassengerList.map((p, idx) => `${idx + 1}. ${p.name} (${p.type})`).join(', ');

    const finalPickup = leadPassenger.hotel.trim() 
      ? `Hotel: ${leadPassenger.hotel.trim()}` 
      : pickupOption;

    const orderNotes = [
      `Salida: ${selectedShift}`,
      leadPassenger.dni ? `DNI Titular: ${leadPassenger.dni}` : null,
      nominalPassengerList.length > 1 ? `Pasajeros: ${fullPassengerNames}` : null,
      advisorNotes.trim() ? `Observaciones: ${advisorNotes.trim()}` : null,
      advisorDiscountPercent > 0 ? `Descuento Asesor: ${advisorDiscountPercent}%` : null
    ].filter(Boolean).join(' | ');

    onCreateBookingForTraveler({
      customerName: leadPassenger.name.trim(),
      customerEmail: leadPassenger.email.trim() || `${leadPassenger.name.toLowerCase().replace(/\s+/g, '.')}@mostrador.com`,
      customerPhone: leadPassenger.phone.trim() || '+54 9 294 400-0000',
      excursionTitle: selectedExcursion.title,
      date: selectedDate,
      guests: totalGuests,
      totalPriceUSD: finalTotal,
      pickupLocation: finalPickup,
      status: 'COTIZACION',
      ticketType: 'Reserva',
      priority: 'NORMAL',
      shiftTime: selectedShift,
      shiftName: selectedShift.includes('09:') ? 'Turno Mañana' : 'Turno Tarde',
      source: 'mostrador-san-martin',
      emittedBy: 'Thomas González (Asesor Mostrador)',
      assignedGuide: 'Asignación Comercial Mostrador',
      assignedVehicle: 'Minibus Habilitado',
      operatorNotes: orderNotes,
      passengerList: nominalPassengerList
    });

    setLastCreatedTicket({
      code: ticketCode,
      customerName: leadPassenger.name.trim(),
      customerPhone: leadPassenger.phone.trim() || '+54 9 294 400-0000',
      excursionTitle: selectedExcursion.title,
      date: selectedDate,
      shift: selectedShift,
      totalGuests: totalGuests,
      passengersList: nominalPassengerList.map(p => `${p.name} (${p.type})`),
      total: finalTotal,
      pickup: finalPickup,
      emittedBy: 'Thomas González (Asesor Mostrador)'
    });
  };

  // Reset para el siguiente cliente en mostrador
  const handleResetKiosk = () => {
    setLastCreatedTicket(null);
    setKioskStep(1);
    setLeadPassenger({ name: '', phone: '', dni: '', email: '', hotel: '' });
    setAdditionalPassengers([]);
    setExtraAdultsCount(0);
    setExtraChildrenCount(0);
    setAdvisorDiscountPercent(0);
    setAdvisorNotes('');
    setSelectedDate(tomorrowStr);
  };

  // WhatsApp preformateado
  const getWhatsAppMessage = () => {
    if (!lastCreatedTicket) return '';
    const paxListText = lastCreatedTicket.passengersList.length > 1
      ? `\n👥 *Pasajeros:* \n${lastCreatedTicket.passengersList.map(p => `  • ${p}`).join('\n')}`
      : `\n👥 *Pasajeros:* ${lastCreatedTicket.totalGuests} persona`;

    return encodeURIComponent(
      `¡Hola ${lastCreatedTicket.customerName}! Te saluda Thomas del equipo de Grupo Visión Bariloche. 🏔️\n\n` +
      `Ya generé tu pedido de reserva en el sistema central:\n` +
      `📌 *Ticket:* #${lastCreatedTicket.code}\n` +
      `🌲 *Excursión:* ${lastCreatedTicket.excursionTitle}\n` +
      `📅 *Fecha:* ${lastCreatedTicket.date} (${lastCreatedTicket.shift})` +
      `${paxListText}\n` +
      `📍 *Punto de Salida:* ${lastCreatedTicket.pickup}\n` +
      `💰 *Total:* $${lastCreatedTicket.total.toLocaleString('es-AR')} ARS\n\n` +
      `Cualquier consulta me avisás por acá. ¡Que disfrutes la experiencia!`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* ========================================================================= */}
      {/* HEADER DE ASESOR & TOGGLES DE VISTA */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-[#00A896]/20 text-[#00A896] text-xs font-mono font-bold border border-[#00A896]/30 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Rol Asesor Comercial
            </span>
            <span className="text-xs text-slate-400 font-mono">Mostrador San Martín 398</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            Kiosco Táctil de Pedidos
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1">
            Cargá reservas directas ingresando al pasajero al instante y armando su pedido paso a paso.
          </p>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('kiosk')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'kiosk'
                ? 'bg-[#00A896] text-white shadow-md shadow-[#00A896]/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Kiosco Rápido (POS)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#00A896] text-white shadow-md shadow-[#00A896]/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Historial de Tickets ({bookings.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: KIOSCO DE PEDIDOS RÁPIDOS (TOUCH POS ESTILO MCDONALD'S) */}
      {/* ========================================================================= */}
      {activeTab === 'kiosk' && (
        <div className="space-y-6">

          {/* STEPPER BAR NAVEGACIÓN SUPERIOR */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-xs flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
            {[
              { num: 1, label: '1. Pasajeros', icon: User },
              { num: 2, label: '2. Excursión', icon: Compass },
              { num: 3, label: '3. Fecha & Turno', icon: CalendarDays },
              { num: 4, label: '4. Confirmar Pedido', icon: CheckCircle }
            ].map((stepItem, idx) => {
              const isActive = kioskStep === stepItem.num;
              const isPast = kioskStep > stepItem.num;
              const isAllowed = canGoToStep(stepItem.num as any);
              return (
                <React.Fragment key={stepItem.num}>
                  <button
                    type="button"
                    disabled={!isAllowed}
                    onClick={() => handleStepClick(stepItem.num as any)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#00A896] text-white shadow-sm ring-2 ring-[#00A896]/20 cursor-default'
                        : isPast
                        ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 cursor-pointer'
                        : isAllowed
                        ? 'text-slate-600 hover:text-slate-900 cursor-pointer bg-slate-50'
                        : 'text-slate-300 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isActive ? 'bg-white text-[#00A896]' : isPast ? 'bg-[#00A896] text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isPast ? '✓' : stepItem.num}
                    </div>
                    <span className="hidden sm:inline">{stepItem.label}</span>
                    <span className="sm:hidden">Paso {stepItem.num}</span>
                  </button>
                  {idx < 3 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                </React.Fragment>
              );
            })}
          </div>

          {/* LAYOUT PRINCIPAL: AREA TÁCTIL (IZQUIERDA) + COMANDA DIGITAL (DERECHA) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* WORKSPACE INTERACTIVO (8 COLUMNAS) */}
            <div className="lg:col-span-8 space-y-6">

              {/* ------------------------------------------------------------------- */}
              {/* FASE 1: ENTRADA DIRECTA DE PASAJERO Y OPCIÓN "+ AGREGAR PASAJERO" */}
              {/* ------------------------------------------------------------------- */}
              {kioskStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6"
                >
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#00A896]" />
                      1. Datos del Pasajero Titular
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ingresá los datos del pasajero en mostrador. No necesitás buscar en listas previas.
                    </p>
                  </div>

                  {/* FORMULARIO DIRECTO DEL TITULAR */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nombre Completo del Pasajero Titular *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Mariana López o Carlos Giménez"
                        value={leadPassenger.name}
                        onChange={(e) => setLeadPassenger({ ...leadPassenger, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        WhatsApp / Teléfono de Contacto *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej: +54 9 11 4455-6677"
                        value={leadPassenger.phone}
                        onChange={(e) => setLeadPassenger({ ...leadPassenger, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        DNI / Pasaporte (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: DNI 34.819.002"
                        value={leadPassenger.dni}
                        onChange={(e) => setLeadPassenger({ ...leadPassenger, dni: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email del Pasajero (Opcional para voucher)
                      </label>
                      <input
                        type="email"
                        placeholder="mariana@gmail.com"
                        value={leadPassenger.email}
                        onChange={(e) => setLeadPassenger({ ...leadPassenger, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Hotel / Alojamiento (Opcional para pick-up)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Hotel Panamericano / Alma del Lago"
                        value={leadPassenger.hotel}
                        onChange={(e) => setLeadPassenger({ ...leadPassenger, hotel: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* SMART DETECTOR: ANÁLISIS EN TIEMPO REAL DE LO QUE YA TIENE RESERVADO */}
                  {detectedPastBookings.length > 0 && (
                    <div className="bg-cyan-50/80 border border-cyan-200 rounded-2xl p-4 space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#00A896]" />
                          Pasajero Recurrente Detectado en el Sistema Central:
                        </span>
                        <span className="text-[11px] font-mono font-bold text-cyan-800">
                          {detectedPastBookings.length} {detectedPastBookings.length === 1 ? 'actividad previa' : 'actividades previas'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {detectedPastBookings.map((b, bIdx) => (
                          <div key={bIdx} className="bg-white border border-cyan-200 rounded-xl p-2.5 text-xs shadow-2xs">
                            <div className="font-bold text-slate-900 truncate">{b.excursionTitle}</div>
                            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3 text-[#00A896]" />
                              <span>{b.date} • {b.shiftTime || 'Turno Mañana'}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] text-cyan-800 font-medium pt-1">
                        <strong>Días ya ocupados:</strong> {bookedDatesOfCustomer.join(', ')}. Sugerí fechas libres para este nuevo pedido.
                      </div>
                    </div>
                  )}

                  {/* SECCIÓN DE ACOMPAÑANTES: "+ AGREGAR PASAJERO" */}
                  <div className="pt-2 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#00A896]" />
                          Pasajeros & Acompañantes del Pedido ({totalGuests} pax)
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          El titular ya está incluido. Si viaja con acompañantes, sumalos con el botón a continuación.
                        </p>
                      </div>

                      {/* BOTÓN CLAVE: + AGREGAR PASAJERO */}
                      <button
                        type="button"
                        onClick={handleAddPassenger}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <UserPlus className="w-4 h-4 text-[#00A896]" />
                        <span>+ Agregar Pasajero</span>
                      </button>
                    </div>

                    {/* LISTA DE ACOMPAÑANTES AGREGADOS */}
                    {additionalPassengers.length > 0 && (
                      <div className="space-y-2.5">
                        {additionalPassengers.map((pax, idx) => (
                          <div 
                            key={pax.id} 
                            className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-in fade-in duration-150"
                          >
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="w-6 h-6 rounded-lg bg-[#00A896]/15 text-[#00A896] text-xs font-bold font-mono flex items-center justify-center">
                                #{idx + 2}
                              </span>
                              <span className="text-xs font-bold text-slate-700">Acompañante</span>
                            </div>

                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2">
                              <input
                                type="text"
                                placeholder="Nombre y Apellido *"
                                value={pax.name}
                                onChange={(e) => handleUpdatePassenger(pax.id, 'name', e.target.value)}
                                className="sm:col-span-6 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00A896]"
                              />
                              
                              <select
                                value={pax.type}
                                onChange={(e) => handleUpdatePassenger(pax.id, 'type', e.target.value as any)}
                                className="sm:col-span-3 px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00A896]"
                              >
                                <option value="Adulto">Adulto</option>
                                <option value="Menor">Menor (3-11a)</option>
                              </select>

                              <input
                                type="text"
                                placeholder="DNI (opcional)"
                                value={pax.dni || ''}
                                onChange={(e) => handleUpdatePassenger(pax.id, 'dni', e.target.value)}
                                className="sm:col-span-3 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00A896]"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemovePassenger(pax.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors shrink-0 self-end sm:self-center cursor-pointer"
                              title="Quitar acompañante"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* BOTÓN CONTINUAR AL PASO 2 */}
                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={!leadPassenger.name.trim()}
                      onClick={() => setKioskStep(2)}
                      className="px-6 py-3 bg-[#00A896] hover:bg-[#028090] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md shadow-[#00A896]/20 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Elegir Excursión</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ------------------------------------------------------------------- */}
              {/* FASE 2: CATÁLOGO VISUAL DE EXCURSIONES (TOUCH GRID TIPO MCDONALD'S) */}
              {/* ------------------------------------------------------------------- */}
              {kioskStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Compass className="w-5 h-5 text-[#00A896]" />
                        2. ¿Qué excursión desea sumar al pedido?
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Tocá la tarjeta de la excursión para seleccionarla con 1 toque.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setKioskStep(1)}
                      className="text-xs font-mono text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Modificar Pasajeros
                    </button>
                  </div>

                  {/* PÍLDORAS DE CATEGORÍA TÁCTILES CON ICONOS */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      { id: 'TODAS', label: 'Todas', icon: Sparkles },
                      { id: 'Lagos', label: 'Lagos & Barco', icon: Waves },
                      { id: 'Montaña', label: 'Montaña & Nieve', icon: Mountain },
                      { id: 'Clásica', label: 'Tradicionales', icon: Sun }
                    ].map((cat) => {
                      const Icon = cat.icon;
                      const isCatActive = categoryFilter === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategoryFilter(cat.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                            isCatActive
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* GRID DE EXCURSIONES CON FOTOS DE PORTADA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredExcursions.map((ex) => {
                      const isSelected = selectedExcursion?.id === ex.id;
                      return (
                        <button
                          key={ex.id}
                          type="button"
                          onClick={() => setSelectedExcursion(ex)}
                          className={`rounded-2xl border text-left overflow-hidden transition-all flex flex-col justify-between group cursor-pointer relative ${
                            isSelected
                              ? 'border-[#00A896] ring-4 ring-[#00A896]/20 bg-[#00A896]/5 shadow-md'
                              : 'border-slate-200 hover:border-slate-300 hover:shadow-sm bg-white'
                          }`}
                        >
                          {/* Foto de portada */}
                          <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                            <img
                              src={ex.image}
                              alt={ex.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/excursiones/circuito-chico.webp';
                              }}
                            />
                            <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                              {ex.duration}
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-[#00A896] text-white p-1 rounded-full shadow-md">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>

                          {/* Cuerpo de la tarjeta */}
                          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                            <div>
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00A896]">
                                {ex.category}
                              </span>
                              <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 mt-0.5">
                                {ex.title}
                              </h3>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                              <span className="text-[10px] text-slate-400 font-mono">Tarifa Adulto</span>
                              <span className="text-sm font-black text-slate-900 font-mono">
                                ${(ex.priceNum || 0).toLocaleString('es-AR')} ARS
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* BOTONES DE PASO */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setKioskStep(1)}
                      className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Volver a Pasajeros
                    </button>

                    <button
                      type="button"
                      disabled={!selectedExcursion}
                      onClick={() => setKioskStep(3)}
                      className="px-6 py-3 bg-[#00A896] hover:bg-[#028090] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md shadow-[#00A896]/20 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Configurar Fecha & Turno</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ------------------------------------------------------------------- */}
              {/* FASE 3: FECHA, TURNO, DESCUENTO ASESOR & LOGÍSTICA */}
              {/* ------------------------------------------------------------------- */}
              {kioskStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-[#00A896]" />
                        3. Fecha, Turno y Descuento del Asesor
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Definí el día de la salida y personalizá los detalles para el operador.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setKioskStep(2)}
                      className="text-xs font-mono text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Cambiar Excursión
                    </button>
                  </div>

                  {/* ALERTA DE CONFLICTO DE AGENDA SI ELIGE FECHA OCUPADA */}
                  {conflictingBooking && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>¡Alerta de Superposición de Fechas!</strong> El pasajero ya tiene contratada la actividad <strong>{conflictingBooking.excursionTitle}</strong> el día <strong>{conflictingBooking.date}</strong> ({conflictingBooking.shiftTime || 'Turno Mañana'}). Se sugiere coordinar en otra fecha.
                      </div>
                    </div>
                  )}

                  {/* SELECTOR DE FECHA CON ATAJOS */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Fecha de la Excursión
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          setSelectedDate(d.toISOString().split('T')[0]);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedDate === new Date().toISOString().split('T')[0]
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Hoy
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedDate(tomorrowStr)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedDate === tomorrowStr
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Mañana
                      </button>
                    </div>
                  </div>

                  {/* SELECTOR DE TURNO (BOTONES GRANDES TÁCTILES) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Turno / Horario de Salida
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: '09:00 hs', name: 'Turno Mañana', time: '09:00 a 13:30 hs' },
                        { id: '14:00 hs', name: 'Turno Tarde', time: '14:00 a 18:30 hs' }
                      ].map((sh) => {
                        const isShiftActive = selectedShift === sh.id;
                        return (
                          <button
                            key={sh.id}
                            type="button"
                            onClick={() => setSelectedShift(sh.id)}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              isShiftActive
                                ? 'bg-[#00A896]/10 border-[#00A896] ring-2 ring-[#00A896]/20'
                                : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/70'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-slate-900 text-xs">{sh.name}</div>
                              <div className="text-[11px] text-slate-400 font-mono mt-0.5">{sh.time}</div>
                            </div>
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                              isShiftActive ? 'bg-[#00A896] text-white' : 'bg-slate-200 text-slate-400'
                            }`}>
                              ✓
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* DESCUENTO DISCRECIONAL DEL ASESOR */}
                  <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                        <Percent className="w-4 h-4 text-emerald-600" />
                        Descuento Comercial de Asesor
                      </label>
                      <span className="text-sm font-black text-emerald-700 font-mono">
                        {advisorDiscountPercent}% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[0, 5, 10, 15, 20].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setAdvisorDiscountPercent(pct)}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            advisorDiscountPercent === pct
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-100/60'
                          }`}
                        >
                          {pct === 0 ? 'Sin desc.' : `${pct}%`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* OBSERVACIONES INTERNAS */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Observaciones para el Operador / Conductor
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Asiento delantero para adulto mayor, hablar despacio, etc."
                      value={advisorNotes}
                      onChange={(e) => setAdvisorNotes(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    />
                  </div>

                  {/* BOTONES DE PASO */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setKioskStep(2)}
                      className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Volver a Excursión
                    </button>

                    <button
                      type="button"
                      onClick={() => setKioskStep(4)}
                      className="px-6 py-3 bg-[#00A896] hover:bg-[#028090] text-white font-bold text-xs rounded-xl shadow-md shadow-[#00A896]/20 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Revisar y Confirmar Pedido</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ------------------------------------------------------------------- */}
              {/* FASE 4: REVISIÓN FINAL & EMISIÓN CENTRAL DE RESERVA */}
              {/* ------------------------------------------------------------------- */}
              {kioskStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6"
                >
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#00A896]" />
                      4. Revisión Final del Pedido de Excursión
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verificá los datos antes de emitir la reserva hacia el sistema central.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pasajeros detallados */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Nómina de Pasajeros ({totalGuests} pax)
                      </span>
                      <div className="font-bold text-slate-900 text-sm">
                        1. {leadPassenger.name} (Titular - Adulto)
                      </div>
                      {additionalPassengers.map((p, pIdx) => (
                        <div key={p.id} className="text-xs text-slate-700 font-medium pl-3 border-l-2 border-[#00A896]/40">
                          {pIdx + 2}. {p.name || 'Acompañante'} ({p.type})
                        </div>
                      ))}
                      <div className="text-[11px] text-slate-500 pt-1 font-mono">
                        📞 {leadPassenger.phone || 'Sin teléfono'} • {leadPassenger.hotel ? `🏨 ${leadPassenger.hotel}` : '📍 San Martín 398'}
                      </div>
                    </div>

                    {/* Excursión y Turno */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00A896]">
                        Servicio Contratado
                      </span>
                      <div className="font-bold text-slate-900 text-sm">{selectedExcursion?.title}</div>
                      <div className="text-xs text-slate-600 font-mono">
                        📅 {selectedDate} • ⏰ {selectedShift}
                      </div>
                      {advisorNotes && (
                        <div className="text-[11px] text-slate-500 italic pt-1">
                          "{advisorNotes}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resumen económico */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-inner">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Desglose del Pedido en ARS
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                      <div className="flex justify-between">
                        <span>{totalAdults} Adulto(s) x ${adultPrice.toLocaleString('es-AR')}</span>
                        <span>${(totalAdults * adultPrice).toLocaleString('es-AR')} ARS</span>
                      </div>
                      {totalChildren > 0 && (
                        <div className="flex justify-between text-slate-400">
                          <span>{totalChildren} Menor(es) (20% desc.) x ${childPrice.toLocaleString('es-AR')}</span>
                          <span>${(totalChildren * childPrice).toLocaleString('es-AR')} ARS</span>
                        </div>
                      )}
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                          <span>Descuento Asesor ({advisorDiscountPercent}%)</span>
                          <span>- ${discountAmount.toLocaleString('es-AR')} ARS</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                      <span className="text-sm font-bold text-white">TOTAL DEL PEDIDO:</span>
                      <span className="text-2xl font-black text-[#00A896] font-mono">
                        ${finalTotal.toLocaleString('es-AR')} ARS
                      </span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setKioskStep(3)}
                      className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Modificar Datos
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmOrder}
                      className="px-8 py-3.5 bg-[#00A896] hover:bg-[#028090] text-white font-black text-sm rounded-xl shadow-lg shadow-[#00A896]/30 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <Check className="w-5 h-5" />
                      <span>CONFIRMAR & EMITIR RESERVA</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* COMANDA DIGITAL EN VIVO LATERAL (RECEIPT POS TIPO MCDONALD'S) */}
            <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-4 sticky top-6">
              
              <div className="border-b-2 border-dashed border-slate-200 pb-3 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                  GRUPO VISIÓN TURISMO
                </span>
                <h3 className="font-mono font-black text-sm text-slate-900 tracking-tight">
                  TICKET DE COMANDA RÁPIDA
                </h3>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Asesor: Thomas González
                </div>
              </div>

              {/* Líneas de detalle */}
              <div className="space-y-3 font-mono text-xs text-slate-700">
                {/* Titular */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 text-[11px]">TITULAR:</span>
                  <span className="font-bold text-slate-900 text-right truncate max-w-[160px]">
                    {leadPassenger.name.trim() || 'A completar...'}
                  </span>
                </div>

                {/* Excursión */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 text-[11px]">EXCURSIÓN:</span>
                  <span className="font-bold text-slate-900 text-right truncate max-w-[160px]">
                    {selectedExcursion ? selectedExcursion.title : 'Sin elegir'}
                  </span>
                </div>

                {/* Miniatura de portada de la excursión */}
                {selectedExcursion && (
                  <div className="h-20 w-full rounded-xl overflow-hidden border border-slate-200 relative my-1">
                    <img 
                      src={selectedExcursion.image} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/excursiones/circuito-chico.webp';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-white text-[10px] font-bold">
                        {selectedExcursion.duration}
                      </span>
                    </div>
                  </div>
                )}

                {/* Fecha y Turno */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 text-[11px]">FECHA / TURNO:</span>
                  <span className="font-bold text-slate-900 text-right">
                    {selectedDate} ({selectedShift})
                  </span>
                </div>

                {/* Cantidad de Pasajeros */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 text-[11px]">PASAJEROS:</span>
                  <span className="font-bold text-slate-900 text-right">
                    {totalGuests} pax ({totalAdults} Ad. {totalChildren > 0 ? `+ ${totalChildren} Men.` : ''})
                  </span>
                </div>

                {/* Nómina rápida si hay acompañantes */}
                {additionalPassengers.length > 0 && (
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] text-slate-600 space-y-0.5">
                    <div className="font-bold text-slate-800">Acompañantes:</div>
                    {additionalPassengers.map((p, idx) => (
                      <div key={p.id} className="truncate">• {p.name || `Acompañante ${idx + 2}`} ({p.type})</div>
                    ))}
                  </div>
                )}

                {/* Punto de salida */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 text-[11px]">SALIDA:</span>
                  <span className="font-medium text-slate-700 text-right truncate max-w-[150px]">
                    {leadPassenger.hotel.trim() ? `Hotel: ${leadPassenger.hotel}` : pickupOption}
                  </span>
                </div>

                {/* Desglose de precios */}
                <div className="border-t border-dashed border-slate-200 pt-3 space-y-1">
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Subtotal:</span>
                    <span>${subtotal.toLocaleString('es-AR')} ARS</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold text-[11px]">
                      <span>Descuento Asesor ({advisorDiscountPercent}%):</span>
                      <span>-${discountAmount.toLocaleString('es-AR')} ARS</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                    <span>TOTAL:</span>
                    <span className="text-[#00A896]">
                      ${finalTotal.toLocaleString('es-AR')} ARS
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón de avance progresivo por fases (Sin atajos para emitir directo) */}
              <div className="pt-2">
                {kioskStep === 1 && (
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      disabled={!leadPassenger.name.trim()}
                      onClick={() => setKioskStep(2)}
                      className="w-full py-3 bg-[#00A896] hover:bg-[#028090] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md shadow-[#00A896]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Siguiente: Elegir Excursión</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="text-[10px] text-center font-mono text-slate-400">
                      Paso 1 de 4 • Completá el nombre del titular
                    </div>
                  </div>
                )}

                {kioskStep === 2 && (
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      disabled={!selectedExcursion}
                      onClick={() => setKioskStep(3)}
                      className="w-full py-3 bg-[#00A896] hover:bg-[#028090] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md shadow-[#00A896]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Siguiente: Fecha & Turno</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="text-[10px] text-center font-mono text-slate-400">
                      Paso 2 de 4 • Seleccioná la excursión
                    </div>
                  </div>
                )}

                {kioskStep === 3 && (
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      disabled={!selectedDate}
                      onClick={() => setKioskStep(4)}
                      className="w-full py-3 bg-[#00A896] hover:bg-[#028090] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md shadow-[#00A896]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Siguiente: Revisar Pedido</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="text-[10px] text-center font-mono text-slate-400">
                      Paso 3 de 4 • Verificá fecha y turno
                    </div>
                  </div>
                )}

                {kioskStep === 4 && (
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      disabled={!leadPassenger.name.trim() || !selectedExcursion || !selectedDate}
                      onClick={handleConfirmOrder}
                      className="w-full py-3.5 bg-[#00A896] hover:bg-[#028090] disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-lg shadow-[#00A896]/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Check className="w-4 h-4" />
                      <span>CONFIRMAR & EMITIR RESERVA</span>
                    </button>
                    <div className="text-[10px] text-center font-mono text-emerald-600 font-bold">
                      Paso 4 de 4 • Flujo completado y listo para emitir
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: HISTORIAL DE TICKETS EMITIDOS */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#00A896]" />
                Tickets Emitidos en el Sistema Central
              </h3>
              <p className="text-xs text-slate-500">
                Historial de reservas registradas en el sistema receptivo.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                  <th className="py-3 px-4">Código</th>
                  <th className="py-3 px-4">Pasajero Titular</th>
                  <th className="py-3 px-4">Excursión</th>
                  <th className="py-3 px-4">Fecha & Turno</th>
                  <th className="py-3 px-4">Pax</th>
                  <th className="py-3 px-4">Total ARS</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Ver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {b.code}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {b.customerName}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {b.excursionTitle}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {b.date} • {b.shiftTime || 'Mañana'}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {b.guests} pax
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      ${(b.totalPriceUSD || 0).toLocaleString('es-AR')}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        b.status === 'CONFIRMADA' ? 'bg-emerald-100 text-emerald-800' :
                        b.status === 'COTIZACION' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onOpenTicketDetails(b)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SUCCESS TICKET CONFIRMATION (CONFIRMACIÓN POST-PEDIDO) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lastCreatedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-6 shadow-2xl border border-slate-100 text-slate-800"
            >
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">
                  ¡Pedido Emitido con Éxito al Sistema Central!
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Ticket #{lastCreatedTicket.code}
                </h3>
                <p className="text-xs text-slate-500">
                  La reserva se registró en el calendario y tablero operativo del Administrador.
                </p>
              </div>

              {/* Resumen del ticket */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs space-y-2 text-slate-700">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-400">EMITIDO POR:</span>
                  <span className="font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-0.5 rounded-md">
                    {lastCreatedTicket.emittedBy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TITULAR:</span>
                  <span className="font-bold text-slate-900">{lastCreatedTicket.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">EXCURSIÓN:</span>
                  <span className="font-bold text-slate-900">{lastCreatedTicket.excursionTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">FECHA / TURNO:</span>
                  <span>{lastCreatedTicket.date} ({lastCreatedTicket.shift})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">PASAJEROS:</span>
                  <span>{lastCreatedTicket.totalGuests} personas</span>
                </div>
                {lastCreatedTicket.passengersList.length > 1 && (
                  <div className="pt-1 text-[11px] text-slate-600">
                    <span className="text-slate-400 block mb-0.5">ACOMPAÑANTES:</span>
                    {lastCreatedTicket.passengersList.slice(1).map((p, idx) => (
                      <div key={idx} className="pl-2">• {p}</div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">SALIDA:</span>
                  <span className="truncate max-w-[200px]">{lastCreatedTicket.pickup}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
                  <span>TOTAL ESTIMADO:</span>
                  <span className="text-[#00A896]">
                    ${lastCreatedTicket.total.toLocaleString('es-AR')} ARS
                  </span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-2">
                <a
                  href={`https://wa.me/${lastCreatedTicket.customerPhone.replace(/[^0-9]/g, '')}?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Enviar Confirmación Completa por WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleResetKiosk}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#00A896]" />
                  <span>Tomar Nuevo Pedido en Mostrador</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
