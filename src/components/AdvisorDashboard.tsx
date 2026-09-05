import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Plus, 
  Search, 
  Percent, 
  Ticket, 
  Tag, 
  Edit3, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Filter,
  DollarSign,
  User,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TravelerUser } from '../data/usersData';
import { Booking } from './JiraTicketModal';
import { Excursion } from '../data/excursionsData';

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
  const [activeTab, setActiveTab] = useState<'directory' | 'new-ticket'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('TODOS');
  
  // Discount Modal state
  const [editingTraveler, setEditingTraveler] = useState<TravelerUser | null>(null);
  const [newDiscountValue, setNewDiscountValue] = useState<number>(0);

  // New Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    excursionTitle: excursions[0]?.title || '',
    date: new Date().toISOString().split('T')[0],
    guests: 2,
    pickupLocation: '',
    notes: '',
    ticketType: 'Reserva' as const,
    priority: 'NORMAL' as const
  });

  const filteredTravelers = travelers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'TODOS' || t.membershipLevel === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleSaveDiscount = () => {
    if (!editingTraveler) return;
    onUpdateTravelerDiscount(editingTraveler.id, newDiscountValue);
    setEditingTraveler(null);
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate price with excursion base price & customer discount
    const selectedExcursion = excursions.find(ex => ex.title === ticketForm.excursionTitle) || excursions[0];
    const customer = travelers.find(tr => tr.email.toLowerCase() === ticketForm.customerEmail.toLowerCase());
    const discount = customer ? customer.customDiscountPercent : 0;
    
    const baseTotal = (selectedExcursion ? selectedExcursion.priceNum : 100) * ticketForm.guests;
    const finalTotal = Math.round(baseTotal * (1 - discount / 100));

    onCreateBookingForTraveler({
      customerName: ticketForm.customerName,
      customerEmail: ticketForm.customerEmail,
      customerPhone: ticketForm.customerPhone || '+54 9 294 440-0000',
      excursionTitle: ticketForm.excursionTitle,
      date: ticketForm.date,
      guests: ticketForm.guests,
      totalPriceUSD: finalTotal,
      pickupLocation: ticketForm.pickupLocation || 'Oficina Urquiza 276',
      status: 'COTIZACION',
      ticketType: ticketForm.ticketType,
      priority: ticketForm.priority,
      assignedGuide: 'Asignación Comercial Asesor',
      assignedVehicle: 'Minibus Habilitado',
      operatorNotes: ticketForm.notes || 'Ticket ingresado por Asesor Comercial.'
    });

    setTicketForm({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      excursionTitle: excursions[0]?.title || '',
      date: new Date().toISOString().split('T')[0],
      guests: 2,
      pickupLocation: '',
      notes: '',
      ticketType: 'Reserva',
      priority: 'NORMAL'
    });

    setActiveTab('directory');
    alert('¡Ticket y Cotización creados con éxito! Aparecen en la bandeja de operación.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-bold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> Rol Asesor Comercial
            </span>
            <span className="text-xs text-slate-400">Escritorio de Gestión de Pasajeros</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Directorio de Viajeros & Gestión de Solicitudes</h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Permite administrar la base de viajeros, otorgar descuentos discrecionales, emitir cotizaciones personalizadas y crear tickets comerciales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
              activeTab === 'directory'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            Directorio Viajeros ({travelers.length})
          </button>
          <button
            onClick={() => setActiveTab('new-ticket')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
              activeTab === 'new-ticket'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            Crear Solicitud / Ticket
          </button>
        </div>
      </div>

      {/* TAB 1: DIRECTORIO DE VIAJEROS */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o ciudad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Nivel:
              </span>
              {['TODOS', 'VIP', 'Gold', 'Frecuente', 'Nuevo'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                    levelFilter === lvl
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Travelers Table */}
          <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Pasajero</th>
                    <th className="py-4 px-6">Contacto</th>
                    <th className="py-4 px-6">Membresía</th>
                    <th className="py-4 px-6 text-center">Descuento Asesor</th>
                    <th className="py-4 px-6 text-center">Puntos</th>
                    <th className="py-4 px-6 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredTravelers.map((tr) => (
                    <tr key={tr.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 text-cyan-400 font-bold flex items-center justify-center text-xs">
                            {tr.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{tr.name}</div>
                            <div className="text-xs text-slate-400">{tr.city} • {tr.passportOrDni}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-xs text-slate-600 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {tr.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {tr.phone}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          tr.membershipLevel === 'VIP' ? 'bg-purple-100 text-purple-700' :
                          tr.membershipLevel === 'Gold' ? 'bg-amber-100 text-amber-800' :
                          tr.membershipLevel === 'Frecuente' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {tr.membershipLevel}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                          <Percent className="w-3.5 h-3.5" />
                          {tr.customDiscountPercent}% OFF
                        </div>
                      </td>

                      <td className="py-4 px-6 text-center font-semibold text-slate-700">
                        {tr.loyaltyPoints} pts
                      </td>

                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingTraveler(tr);
                            setNewDiscountValue(tr.customDiscountPercent);
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl inline-flex items-center gap-1 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Asignar % Descuento
                        </button>
                        <button
                          onClick={() => {
                            setTicketForm(prev => ({
                              ...prev,
                              customerName: tr.name,
                              customerEmail: tr.email,
                              customerPhone: tr.phone
                            }));
                            setActiveTab('new-ticket');
                          }}
                          className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs rounded-xl inline-flex items-center gap-1 transition-all shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Crear Ticket
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CREAR SOLICITUD / TICKET */}
      {activeTab === 'new-ticket' && (
        <div className="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-cyan-600" />
              Nueva Solicitud de Reserva o Consulta (Asesor Comercial)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Completa los datos del viajero para emitir una cotización. El sistema aplicará automáticamente el descuento asignado a la cuenta del pasajero.
            </p>
          </div>

          <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo Pasajero</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Carolina Rossi"
                  value={ticketForm.customerName}
                  onChange={(e) => setTicketForm({ ...ticketForm, customerName: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email del Pasajero</label>
                <input
                  type="email"
                  required
                  placeholder="carolina.rossi@gmail.com"
                  value={ticketForm.customerEmail}
                  onChange={(e) => setTicketForm({ ...ticketForm, customerEmail: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Excursión Seleccionada</label>
                <select
                  value={ticketForm.excursionTitle}
                  onChange={(e) => setTicketForm({ ...ticketForm, excursionTitle: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                >
                  {excursions.map(ex => (
                    <option key={ex.id} value={ex.title}>
                      {ex.title} (${ex.priceNum} USD)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Programada</label>
                <input
                  type="date"
                  required
                  value={ticketForm.date}
                  onChange={(e) => setTicketForm({ ...ticketForm, date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pasajeros</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={ticketForm.guests}
                  onChange={(e) => setTicketForm({ ...ticketForm, guests: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Ticket</label>
                <select
                  value={ticketForm.ticketType}
                  onChange={(e) => setTicketForm({ ...ticketForm, ticketType: e.target.value as any })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="Reserva">Reserva Estándar</option>
                  <option value="Consulta">Consulta Comercial</option>
                  <option value="VIP">Servicio VIP Especial</option>
                  <option value="Logística">Requerimiento Logístico</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prioridad</label>
                <select
                  value={ticketForm.priority}
                  onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value as any })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="NORMAL">NORMAL</option>
                  <option value="ALTA">ALTA</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hotel / Lugar de Pickup</label>
              <input
                type="text"
                placeholder="Ej: Llao Llao Resort / Alma del Lago"
                value={ticketForm.pickupLocation}
                onChange={(e) => setTicketForm({ ...ticketForm, pickupLocation: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Notas Internas del Asesor</label>
              <textarea
                rows={3}
                placeholder="Indicar si requiere equipamiento especial, restricciones alimenticias..."
                value={ticketForm.notes}
                onChange={(e) => setTicketForm({ ...ticketForm, notes: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('directory')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs rounded-xl shadow-md shadow-cyan-600/20 transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Generar Ticket Cotizado
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT DISCOUNT MODAL */}
      <AnimatePresence>
        {editingTraveler && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Percent className="w-4 h-4 text-cyan-600" />
                  Asignar Descuento a Pasajero
                </h3>
                <button onClick={() => setEditingTraveler(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div>
                <div className="font-bold text-slate-900">{editingTraveler.name}</div>
                <div className="text-xs text-slate-500">{editingTraveler.email} • Membresía {editingTraveler.membershipLevel}</div>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700">Porcentaje de Descuento Exclusivo (%)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={5}
                    value={newDiscountValue}
                    onChange={(e) => setNewDiscountValue(parseInt(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                  <span className="text-xl font-black text-cyan-700 min-w-[3.5rem] text-right">
                    {newDiscountValue}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Este porcentaje aplicará automáticamente en el catálogo del viajero y en nuevas cotizaciones emitidas.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditingTraveler(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveDiscount}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-medium rounded-xl shadow-sm"
                >
                  Guardar Descuento
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
