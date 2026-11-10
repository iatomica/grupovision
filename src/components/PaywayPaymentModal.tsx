import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Printer, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  Building2, 
  Phone, 
  Mail, 
  User, 
  Sparkles,
  HelpCircle,
  QrCode
} from 'lucide-react';
import { Booking } from './JiraTicketModal';

export interface PaywayBookingData {
  excursionId?: string;
  excursionTitle: string;
  date: string;
  shiftId?: string;
  shiftTime?: string;
  shiftName?: string;
  guests: number;
  paxBreakdown?: {
    adults: number;
    children?: number;
    seniors?: number;
    infants?: number;
  };
  passengerList?: Array<{ name: string; type: 'Adulto' | 'Menor' | 'Jubilado' | 'Infante'; dni?: string }>;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  notes?: string;
  totalPriceUSD: number; // In Grupo Vision, internal rates are formatted in ARS
}

interface PaywayPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: PaywayBookingData;
  amountARS: number;
  emittedBy?: string; // 'Web (Turista)' or advisor name
  onSuccess: (booking: Booking) => void;
}

export const PaywayPaymentModal: React.FC<PaywayPaymentModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  amountARS,
  emittedBy = 'Web (Turista)',
  onSuccess
}) => {
  // Modal Stages: 'form' | 'processing' | 'success' | 'error'
  const [stage, setStage] = useState<'form' | 'processing' | 'success' | 'error'>('form');

  // Contact Info
  const [customerName, setCustomerName] = useState(bookingData.customerName || '');
  const [customerEmail, setCustomerEmail] = useState(bookingData.customerEmail || '');
  const [customerPhone, setCustomerPhone] = useState(bookingData.customerPhone || '');
  const [pickupLocation, setPickupLocation] = useState(bookingData.pickupLocation || '');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [docType, setDocType] = useState('DNI');
  const [docNumber, setDocNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [installments, setInstallments] = useState<number>(1);

  // Results
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Sync initial bookingData if changed
  useEffect(() => {
    if (bookingData) {
      setCustomerName(bookingData.customerName || '');
      setCustomerEmail(bookingData.customerEmail || '');
      setCustomerPhone(bookingData.customerPhone || '');
      setPickupLocation(bookingData.pickupLocation || '');
    }
  }, [bookingData]);

  // Card Brand Detection
  const detectBrand = (num: string) => {
    const clean = num.replace(/\D/g, '');
    if (clean.startsWith('4')) return { brand: 'VISA', color: 'text-blue-600', icon: 'VISA' };
    if (/^(5[1-5]|2[2-7])/.test(clean)) return { brand: 'MASTERCARD', color: 'text-red-500', icon: 'MASTERCARD' };
    if (/^3[47]/.test(clean)) return { brand: 'AMEX', color: 'text-cyan-600', icon: 'AMEX' };
    if (/^(589562|6042|6043)/.test(clean)) return { brand: 'NARANJA', color: 'text-orange-500', icon: 'NARANJA' };
    if (/^(6042|5041)/.test(clean)) return { brand: 'CABAL', color: 'text-emerald-600', icon: 'CABAL' };
    return { brand: 'TARJETA', color: 'text-slate-500', icon: 'GENÉRICA' };
  };

  const currentBrand = detectBrand(cardNumber);

  // Format card number with spaces (4 4 4 4)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Submit Payment to Backend Payway endpoint
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      alert('Por favor, completá los datos de contacto del pasajero titular.');
      return;
    }

    const cleanCard = cardNumber.replace(/\D/g, '');
    if (cleanCard.length < 15) {
      alert('Por favor ingresá un número de tarjeta válido (16 dígitos).');
      return;
    }

    if (!expiryMonth || !expiryYear || !securityCode || !docNumber) {
      alert('Por favor completá todos los campos de la tarjeta.');
      return;
    }

    setStage('processing');
    setErrorMessage('');

    try {
      const payload = {
        cardData: {
          cardNumber: cleanCard,
          cardHolderName: cardHolderName.trim() || customerName.trim(),
          cardExpirationMonth: expiryMonth,
          cardExpirationYear: expiryYear,
          securityCode: securityCode.trim(),
          docType: docType.toLowerCase(),
          docNumber: docNumber.trim()
        },
        bookingData: {
          ...bookingData,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          customerPhone: customerPhone.trim(),
          pickupLocation: pickupLocation.trim() || 'A coordinar en Bariloche'
        },
        amount: amountARS,
        installments: Number(installments) || 1,
        emittedBy
      };

      const res = await fetch('/api/payway/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success && data.booking) {
        setConfirmedBooking(data.booking);
        setStage('success');
        onSuccess(data.booking);
      } else {
        setErrorMessage(data.error || 'No se pudo procesar la transacción con la tarjeta.');
        setStage('error');
      }
    } catch (err: any) {
      console.error('[Payway UI] Error:', err);
      setErrorMessage(err.message || 'Error de conexión con la pasarela de pagos.');
      setStage('error');
    }
  };

  // WhatsApp Voucher Share
  const handleShareWhatsApp = () => {
    if (!confirmedBooking) return;
    const msg = `¡Hola Grupo Visión! Acabo de reservar y pagar online con Payway la excursión "${confirmedBooking.excursionTitle}" para el ${confirmedBooking.date}. Mi ticket de reserva es ${confirmedBooking.code}. Total abonado: $${amountARS.toLocaleString('es-AR')} ARS.`;
    window.open(`https://wa.me/5492944712818?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto"
        >
          {/* Top Brand Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-[#028090] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <CreditCard className="w-5 h-5 text-[#00A896]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base tracking-tight">Pasarela de Pago Segura</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#00A896]/20 text-emerald-300 border border-emerald-400/30">
                    Payway Oficial
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono">
                  Grupo Visión Bariloche EVT · Legajo 12044
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* STAGE: FORMULARIO DE COBRO */}
          {/* ========================================================================= */}
          {stage === 'form' && (
            <form onSubmit={handleSubmitPayment} className="p-6 space-y-6">
              {/* Excursion & Pricing Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00A896]">
                      Excursión Seleccionada
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      {bookingData.excursionTitle}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block">TOTAL A ABONAR</span>
                    <span className="text-2xl font-black text-[#00A896] font-mono">
                      ${amountARS.toLocaleString('es-AR')} <span className="text-xs font-semibold text-slate-500">ARS</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-600">
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-[#00A896] shrink-0" />
                    <span className="truncate">{bookingData.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-[#00A896] shrink-0" />
                    <span className="truncate">{bookingData.shiftTime || 'Salida fija'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200">
                    <Users className="w-3.5 h-3.5 text-[#00A896] shrink-0" />
                    <span>{bookingData.guests} {bookingData.guests === 1 ? 'Pasajero' : 'Pasajeros'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200">
                    <Building2 className="w-3.5 h-3.5 text-[#00A896] shrink-0" />
                    <span className="truncate text-[11px]">{emittedBy.slice(0, 14)}</span>
                  </div>
                </div>
              </div>

              {/* Passenger Contact Information */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#00A896]" />
                  <span>1. Datos del Pasajero Titular</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Nombre y Apellido Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Sofía Martínez"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Correo Electrónico (Para Voucher) *</label>
                    <input
                      type="email"
                      required
                      placeholder="sofia@ejemplo.com"
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Teléfono / Celular (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+54 9 11 4567-8901"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Hotel o Alojamiento en Bariloche</label>
                    <input
                      type="text"
                      placeholder="Ej: Hotel Panamericano (Mitre 299)"
                      value={pickupLocation}
                      onChange={e => setPickupLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#00A896] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payway Card Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#00A896]" />
                    <span>2. Datos de la Tarjeta de Débito / Crédito</span>
                  </h5>
                  <span className={`text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-lg bg-slate-100 ${currentBrand.color}`}>
                    {currentBrand.brand}
                  </span>
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Número de Tarjeta *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4507 9900 0000 0001"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm tracking-wider focus:outline-none focus:border-[#00A896] focus:bg-white transition-all font-semibold"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                {/* Cardholder Name & DNI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Nombre como figura en la Tarjeta *</label>
                    <input
                      type="text"
                      required
                      placeholder="JUAN PEREZ"
                      value={cardHolderName}
                      onChange={e => setCardHolderName(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium uppercase focus:outline-none focus:border-[#00A896] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="block font-medium text-slate-700 mb-1">Tipo</label>
                      <select
                        value={docType}
                        onChange={e => setDocType(e.target.value)}
                        className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-[#00A896]"
                      >
                        <option value="DNI">DNI</option>
                        <option value="PASSPORT">Pasaporte</option>
                        <option value="CUIT">CUIT</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block font-medium text-slate-700 mb-1">Número Documento *</label>
                      <input
                        type="text"
                        required
                        placeholder="30111222"
                        value={docNumber}
                        onChange={e => setDocNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium font-mono text-xs focus:outline-none focus:border-[#00A896]"
                      />
                    </div>
                  </div>
                </div>

                {/* Expiration, CVV, Installments */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Mes *</label>
                    <select
                      required
                      value={expiryMonth}
                      onChange={e => setExpiryMonth(e.target.value)}
                      className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:border-[#00A896]"
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Año *</label>
                    <select
                      required
                      value={expiryYear}
                      onChange={e => setExpiryYear(e.target.value)}
                      className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:border-[#00A896]"
                    >
                      <option value="">AA</option>
                      {['26', '27', '28', '29', '30', '31', '32', '33'].map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">CVV *</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="123"
                      value={securityCode}
                      onChange={e => setSecurityCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-center text-xs focus:outline-none focus:border-[#00A896]"
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block font-medium text-slate-700 mb-1">Plan de Cuotas</label>
                    <select
                      value={installments}
                      onChange={e => setInstallments(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-[#00A896]"
                    >
                      <option value={1}>1 pago de ${amountARS.toLocaleString('es-AR')} (Débito/Crédito)</option>
                      <option value={3}>3 cuotas de ${Math.round(amountARS / 3).toLocaleString('es-AR')}</option>
                      <option value={6}>6 cuotas de ${Math.round(amountARS / 6).toLocaleString('es-AR')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="leading-tight">
                  <strong>Transacción protegida:</strong> Tus datos se procesan con tokenización segura PCI-DSS a través del Gateway oficial de Payway Argentina.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 rounded-xl bg-[#00A896] hover:bg-[#028090] text-white font-black text-sm shadow-lg shadow-[#00A896]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pagar ${amountARS.toLocaleString('es-AR')} ARS con Payway</span>
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* STAGE: PROCESANDO EN TIEMPO REAL */}
          {/* ========================================================================= */}
          {stage === 'processing' && (
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#00A896] border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900">
                  Procesando Cobro con Payway...
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  Validando tarjeta y generando tu voucher de reserva seguro.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-mono text-slate-600">
                <Lock className="w-3 h-3 text-[#00A896]" />
                <span>Encriptación TLS 1.3 · Payway Prisma</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE: COMPRA EXITOSA (VOUCHER DIGITAL OFICIAL) */}
          {/* ========================================================================= */}
          {stage === 'success' && confirmedBooking && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-1">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  ¡Pago y Reserva Confirmados!
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  Tu excursión ha quedado garantizada en el sistema operativo central.
                </p>
              </div>

              {/* Digital Boarding Pass / Voucher */}
              <div className="border-2 border-dashed border-[#00A896]/40 rounded-3xl p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold tracking-tight text-white text-sm">GRUPO VISIÓN</span>
                    <span className="text-[10px] text-slate-400 font-mono">· VOUCHER OFICIAL</span>
                  </div>
                  <span className="font-mono font-black text-emerald-400 text-sm tracking-wider">
                    {confirmedBooking.code}
                  </span>
                </div>

                <div className="space-y-3">
                  <h5 className="text-lg font-black text-white">
                    {confirmedBooking.excursionTitle}
                  </h5>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="bg-white/10 p-2.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">FECHA</span>
                      <span className="font-bold">{confirmedBooking.date}</span>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">TURNO</span>
                      <span className="font-bold">{confirmedBooking.shiftTime || 'Salida Fija'}</span>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">PASAJEROS</span>
                      <span className="font-bold">{confirmedBooking.guests} pax</span>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">TOTAL PAGADO</span>
                      <span className="font-bold text-emerald-400">${amountARS.toLocaleString('es-AR')} ARS</span>
                    </div>
                  </div>

                  <div className="text-xs bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Titular del Ticket:</span>
                      <span className="font-bold text-white">{confirmedBooking.customerName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Punto de Pick-up / Encuentro:</span>
                      <span className="font-bold text-emerald-300">{confirmedBooking.pickupLocation}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-white/5">
                      <span>Comprobante Payway:</span>
                      <span>{confirmedBooking.paymentDetails?.transactionId || 'PWY-CONFIRMED'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                  >
                    <Printer className="w-4 h-4 text-[#00A896]" />
                    <span>Imprimir / Descargar PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enviar a mi WhatsApp</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 text-slate-500 hover:text-slate-800 text-xs font-mono underline cursor-pointer"
                >
                  Volver al Catálogo de Excursiones
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE: ERROR DE TRANSACCIÓN */}
          {/* ========================================================================= */}
          {stage === 'error' && (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-red-500/20">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900">
                  No se pudo completar el cobro
                </h4>
                <p className="text-xs text-red-600 font-medium">
                  {errorMessage || 'Ocurrió un error al contactar al emisor de la tarjeta.'}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStage('form')}
                  className="px-6 py-3 rounded-xl bg-[#00A896] hover:bg-[#028090] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Reintentar Pago
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
