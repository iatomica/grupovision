import React, { useState } from 'react';
import { 
  User, 
  Award, 
  Tag, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  Send,
  Ticket,
  HelpCircle,
  Percent,
  CheckCircle,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Booking } from './JiraTicketModal';
import { TravelerUser } from '../data/usersData';
import { Excursion } from '../data/excursionsData';

interface TravelerDashboardProps {
  currentUser: TravelerUser;
  bookings: Booking[];
  excursions: Excursion[];
  onRequestDiscountBooking: (excursionTitle: string, note: string) => void;
  onOpenTicketDetails: (booking: Booking) => void;
}

export const TravelerDashboard: React.FC<TravelerDashboardProps> = ({
  currentUser,
  bookings,
  excursions,
  onRequestDiscountBooking,
  onOpenTicketDetails
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'promos' | 'advisor'>('bookings');
  const [selectedExcursionForRequest, setSelectedExcursionForRequest] = useState<Excursion | null>(null);
  const [requestNote, setRequestNote] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Filter bookings for this traveler
  const myBookings = bookings.filter(b => 
    b.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
    b.customerName.toLowerCase().includes(currentUser.name.toLowerCase())
  );

  // Excursions with discount or promo badges
  const promoExcursions = excursions.filter(e => (e.discountPercent && e.discountPercent > 0) || e.promoBadge);

  const handleDownloadVoucher = (booking: Booking) => {
    // Generate text content for voucher
    const voucherText = `
=====================================================
          GRUPO VISION RECEPTIVO BARILOCHE
                VOUCHER DE RESERVA
=====================================================
Código de Reserva : ${booking.code}
Pasajero Principal: ${booking.customerName}
Excursión         : ${booking.excursionTitle}
Fecha de Salida   : ${booking.date}
Cantidad Pasajeros: ${booking.guests}
Punto de Encuentro: ${booking.pickupLocation || 'Oficina Urquiza 276'}
Guía Asignado     : ${booking.assignedGuide || 'Guía AAGM Oficial'}
Vehículo Flota    : ${booking.assignedVehicle || 'Unidad Habilitada'}
Total USD         : $${booking.totalPriceUSD} USD
Estado            : ${booking.status}

Instrucciones: Presentar este voucher digital o impreso al momento de abordar la unidad.
Consultas 24/7: +54 9 294 442-8800 | Urquiza 276 (Centro Cívico)
=====================================================
    `.trim();

    const blob = new Blob([voucherText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Voucher_${booking.code}_${booking.customerName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessMessage(`Voucher ${booking.code} descargado con éxito.`);
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  const handleSendRequest = () => {
    if (!selectedExcursionForRequest) return;
    onRequestDiscountBooking(selectedExcursionForRequest.title, requestNote);
    setIsRequestModalOpen(false);
    setSelectedExcursionForRequest(null);
    setRequestNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Traveler Header Profile Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-cyan-500/20">
              {currentUser.avatar}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{currentUser.name}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Socio {currentUser.membershipLevel}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1 flex items-center gap-4">
                <span>{currentUser.email}</span>
                <span>•</span>
                <span>{currentUser.city}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Beneficio Asesor Asignado</div>
              <div className="text-xl font-black text-emerald-400 flex items-center justify-end gap-1">
                <Percent className="w-4 h-4" />
                {currentUser.customDiscountPercent}% OFF Exclusivo
              </div>
            </div>
            <div className="h-10 w-px bg-slate-700" />
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Puntos Fidelidad</div>
              <div className="text-xl font-black text-amber-400 flex items-center justify-end gap-1">
                <Sparkles className="w-4 h-4" />
                {currentUser.loyaltyPoints} pts
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-8 border-t border-slate-800/80 pt-6">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
              activeTab === 'bookings'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Ticket className="w-4 h-4" />
            Mis Reservas & Paquetes ({myBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('promos')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
              activeTab === 'promos'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Tag className="w-4 h-4" />
            Promociones & Descuentos
          </button>
          <button
            onClick={() => setActiveTab('advisor')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
              activeTab === 'advisor'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Soporte Asesor Directo
          </button>
        </div>
      </motion.div>

      {/* Success Banner */}
      {downloadSuccessMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-5 py-3 rounded-2xl flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>{downloadSuccessMessage}</span>
          </div>
        </motion.div>
      )}

      {/* TAB 1: MIS RESERVAS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-600" />
              Estado de tus Salidas y Paquetes
            </h2>
            <span className="text-xs text-slate-500">Actualización en tiempo real</span>
          </div>

          {myBookings.length === 0 ? (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-4">
              <Clock className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-700">No posees reservas activas registradas</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Explora nuestras excursiones y promociones exclusivas para planificar tu próxima aventura en la Patagonia.
              </p>
              <button 
                onClick={() => setActiveTab('promos')}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl text-sm transition-all"
              >
                Ver Excursiones en Promoción
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {myBookings.map((booking) => {
                const statusSteps = ['BACKLOG', 'COTIZACION', 'CONFIRMADA', 'COMPLETADA'];
                const currentStepIndex = statusSteps.indexOf(booking.status);

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all space-y-6"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-slate-900 text-cyan-400 font-mono text-xs font-bold rounded-lg">
                            {booking.code}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'CONFIRMADA' ? 'bg-emerald-100 text-emerald-700' :
                            booking.status === 'COMPLETADA' ? 'bg-blue-100 text-blue-700' :
                            booking.status === 'COTIZACION' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {booking.status}
                          </span>
                          {booking.priority === 'VIP' && (
                            <span className="px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-md">
                              Servicio VIP
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mt-2">{booking.excursionTitle}</h3>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onOpenTicketDetails(booking)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl flex items-center gap-2 transition-all"
                        >
                          <FileText className="w-4 h-4 text-slate-500" />
                          Detalles & Comentarios
                        </button>
                        <button
                          onClick={() => handleDownloadVoucher(booking)}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs rounded-xl flex items-center gap-2 transition-all shadow-sm"
                        >
                          <Download className="w-4 h-4" />
                          Descargar Voucher
                        </button>
                      </div>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Progreso de Operación</div>
                      <div className="grid grid-cols-4 gap-2">
                        {statusSteps.map((step, idx) => {
                          const isCompleted = idx <= currentStepIndex;
                          const isCurrent = idx === currentStepIndex;

                          return (
                            <div key={step} className="space-y-1.5">
                              <div className={`h-2 rounded-full transition-all ${
                                isCurrent ? 'bg-cyan-500 shadow-sm shadow-cyan-500/50' :
                                isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                              }`} />
                              <div className={`text-[11px] font-semibold text-center ${
                                isCurrent ? 'text-cyan-700 font-bold' :
                                isCompleted ? 'text-slate-700' : 'text-slate-400'
                              }`}>
                                {step === 'BACKLOG' ? 'Recibida' :
                                 step === 'COTIZACION' ? 'En Cotización' :
                                 step === 'CONFIRMADA' ? 'Confirmada' : 'Realizada'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-start gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                        <Calendar className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-slate-400 font-medium">Fecha y Pasajeros</div>
                          <div className="font-semibold text-slate-800">{booking.date}</div>
                          <div className="text-xs text-slate-500">{booking.guests} Pasajeros</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                        <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-slate-400 font-medium">Pickup / Punto de Encuentro</div>
                          <div className="font-semibold text-slate-800 truncate max-w-[200px]">
                            {booking.pickupLocation || 'Oficina Centro (Urquiza 276)'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-slate-400 font-medium">Guía y Logística</div>
                          <div className="font-semibold text-slate-800">{booking.assignedGuide || 'Guía Asignado AAGM'}</div>
                          <div className="text-xs text-slate-500">{booking.assignedVehicle || 'Unidad Sprinter 4x4'}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PROMOCIONES & DESCUENTOS */}
      {activeTab === 'promos' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-cyan-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
                <Percent className="w-3.5 h-3.5" />
                Descuento Exclusivo Viajero VIP
              </span>
              <h2 className="text-2xl font-bold">¡Tenés un {currentUser.customDiscountPercent}% OFF directo acumulable!</h2>
              <p className="text-slate-300 text-sm max-w-xl">
                Como miembro **{currentUser.membershipLevel}**, puedes aplicar tu descuento personalizado del {currentUser.customDiscountPercent}% en cualquiera de las siguientes excursiones.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center shrink-0">
              <div className="text-xs text-cyan-200">Tu código de beneficios</div>
              <div className="text-2xl font-black font-mono tracking-widest text-cyan-400 mt-1">
                VIP-{currentUser.name.split(' ')[0].toUpperCase()}15
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promoExcursions.map((exc) => {
              const originalPrice = exc.priceNum;
              const globalDiscount = exc.discountPercent || 0;
              const combinedDiscount = Math.max(globalDiscount, currentUser.customDiscountPercent);
              const finalPrice = Math.round(originalPrice * (1 - combinedDiscount / 100));

              return (
                <motion.div
                  key={exc.id}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={exc.image} 
                      alt={exc.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {exc.promoBadge && (
                        <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black rounded-full shadow-md">
                          {exc.promoBadge}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-rose-600 text-white text-xs font-black rounded-full shadow-md">
                        {combinedDiscount}% OFF
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">{exc.category}</div>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{exc.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-2">{exc.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-400 line-through">${originalPrice} USD</div>
                        <div className="text-2xl font-black text-slate-900 flex items-center gap-1">
                          ${finalPrice} <span className="text-xs text-emerald-600 font-semibold">USD</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedExcursionForRequest(exc);
                          setIsRequestModalOpen(true);
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-cyan-600 text-white font-medium text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        Solicitar con Descuento
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SOPORTE ASESOR DIRECTO */}
      {activeTab === 'advisor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <div className="text-center space-y-3 border-b border-slate-100 pb-6">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto text-cyan-700 font-bold text-xl border-4 border-white shadow-md">
                TB
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Thomas Benítez</h3>
                <p className="text-xs text-cyan-700 font-medium">Asesor Comercial de Viajes</p>
                <p className="text-xs text-slate-500">Urquiza 276 (Centro Cívico)</p>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" /> En línea ahora
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-medium">Atención Presencial:</span>
                <span>09:00 a 20:00 hs</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-medium">Respuesta Promedio:</span>
                <span>&lt; 15 minutos</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-medium">Canal Directo:</span>
                <span className="font-mono text-cyan-700">lucia.m@grupovision.tur.ar</span>
              </div>
            </div>

            <a
              href={`https://wa.me/5492944235278?text=Hola%20Luc%C3%ADa!%20Soy%20el%20pasajero%20${encodeURIComponent(currentUser.name)}%20(Socio%20${currentUser.membershipLevel}).%20Deseo%20consultar%20con%20mostrador%20por%20mis%20reservas.`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25D366]/20"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              Chatear por WhatsApp con Asesor
            </a>
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Crear Consulta o Requerimiento Especial</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tu solicitud generará automáticamente un ticket prioritario en la mesa de ayuda de nuestro equipo.
              </p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const topic = (form.elements.namedItem('topic') as HTMLInputElement).value;
              const msg = (form.elements.namedItem('msg') as HTMLTextAreaElement).value;
              if (!msg) return;
              onRequestDiscountBooking(`Consulta: ${topic}`, msg);
              form.reset();
              alert('Tu consulta ha sido enviada con éxito a tu asesora. Se generó un ticket de seguimiento.');
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Asunto o Tipo de Solicitud</label>
                <input 
                  name="topic"
                  type="text" 
                  placeholder="Ej: Cambio de fecha, Transfer privado, Menú vegetariano..."
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Detalle del Requerimiento</label>
                <textarea 
                  name="msg"
                  rows={4}
                  placeholder="Describe tus necesidades o inquietudes para que tu asesora pueda cotizar o coordinar la mejor alternativa..."
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-600/20"
              >
                <Send className="w-4 h-4" />
                Enviar Mensaje a mi Asesora
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REQUEST MODAL */}
      <AnimatePresence>
        {isRequestModalOpen && selectedExcursionForRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-cyan-700 font-bold text-sm">
                  <Sparkles className="w-4 h-4" /> Solicitud con Beneficio VIP
                </div>
                <button 
                  onClick={() => setIsRequestModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedExcursionForRequest.title}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Se aplicará tu descuento asignado del <strong className="text-emerald-600">{currentUser.customDiscountPercent}% OFF</strong> sobre la tarifa base de ${selectedExcursionForRequest.priceNum} USD.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">Notas o Preferencias de Salida (Opcional)</label>
                <textarea
                  rows={3}
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  placeholder="Ej: Deseo realizar la excursión el día 28 de Agosto, somos 2 adultos."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendRequest}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs rounded-xl shadow-md shadow-cyan-600/20 transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Confirmar Solicitud de Ticket
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
