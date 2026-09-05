import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MessageSquare, 
  Paperclip, 
  User, 
  Car, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Tag, 
  Send, 
  AtSign, 
  FileText, 
  Download, 
  ChevronRight, 
  Shield, 
  Plus, 
  Phone, 
  Mail, 
  DollarSign, 
  Lock,
  ChevronLeft
} from 'lucide-react';

export interface TicketComment {
  id: string;
  authorName: string;
  authorEmail: string;
  avatar: string;
  content: string;
  createdAt: string;
  mentions?: string[];
  attachments?: { name: string; url: string; size: string }[];
}

export interface Booking {
  id: string;
  code: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  excursionTitle: string;
  date: string;
  guests: number;
  totalPriceUSD: number;
  pickupLocation: string;
  status: 'BACKLOG' | 'COTIZACION' | 'CONFIRMADA' | 'COMPLETADA';
  ticketType: 'Reserva' | 'Incidencia' | 'Consulta' | 'Logística' | 'VIP';
  priority: 'ALTA' | 'NORMAL' | 'VIP';
  assignedGuide: string;
  assignedVehicle: string;
  operatorNotes: string;
  createdAt: string;
  comments: TicketComment[];
  attachments: { name: string; url: string; size: string }[];
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface JiraTicketModalProps {
  ticket: Booking | null;
  userRole: 'admin' | 'asesor' | 'traveler' | 'operador' | null;
  staffList: StaffMember[];
  onClose: () => void;
  onUpdateTicket: (updated: Booking) => void;
  onMoveStatus: (id: string, direction: 'next' | 'prev') => void;
  onAddNotification: (notif: { recipientEmail: string; senderName: string; ticketCode: string; ticketId: string; message: string }) => void;
}

export const JiraTicketModal: React.FC<JiraTicketModalProps> = ({
  ticket,
  userRole,
  staffList,
  onClose,
  onUpdateTicket,
  onMoveStatus,
  onAddNotification
}) => {
  if (!ticket) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'attachments'>('details');
  const [newCommentText, setNewCommentText] = useState('');
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);
  const [newAttachmentName, setNewAttachmentName] = useState('');
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Quick mention insert
  const handleInsertMention = (staff: StaffMember) => {
    const mentionTag = `@${staff.name.split(' ')[0]}`;
    if (!newCommentText.includes(mentionTag)) {
      setNewCommentText(prev => prev ? `${prev} ${mentionTag}` : mentionTag);
    }
    if (!selectedMentions.includes(staff.email)) {
      setSelectedMentions([...selectedMentions, staff.email]);
    }
  };

  // Submit New Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: TicketComment = {
      id: `c-${Date.now().toString().slice(-4)}`,
      authorName: userRole === 'admin' ? 'Operador Central' : 'Viajero VIP',
      authorEmail: userRole === 'admin' ? 'operador@grupovision.tur.ar' : ticket.customerEmail,
      avatar: userRole === 'admin' ? 'OP' : 'VIP',
      content: newCommentText,
      createdAt: 'Justo ahora',
      mentions: selectedMentions
    };

    const updatedTicket: Booking = {
      ...ticket,
      comments: [newComment, ...(ticket.comments || [])]
    };

    onUpdateTicket(updatedTicket);

    // Trigger notifications for mentioned staff
    selectedMentions.forEach(email => {
      onAddNotification({
        recipientEmail: email,
        senderName: userRole === 'admin' ? 'Operador Central' : 'Viajero VIP',
        ticketCode: ticket.code,
        ticketId: ticket.id,
        message: `te mencionó en el ticket ${ticket.code}: "${newCommentText.slice(0, 60)}..."`
      });
    });

    setNewCommentText('');
    setSelectedMentions([]);
  };

  // Add simulated attachment
  const handleAddAttachment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttachmentName.trim()) return;

    const newFile = {
      name: newAttachmentName.trim(),
      url: '#',
      size: `${Math.floor(Math.random() * 800 + 100)} KB`
    };

    const updatedTicket: Booking = {
      ...ticket,
      attachments: [...(ticket.attachments || []), newFile]
    };

    onUpdateTicket(updatedTicket);
    setNewAttachmentName('');
  };

  // Handle Move Ticket Status (Checking Admin Permission for backward move)
  const handleMove = (direction: 'next' | 'prev') => {
    if (direction === 'prev' && userRole !== 'admin') {
      setPermissionError('Solo el usuario Administrador puede mover tickets hacia etapas anteriores.');
      setTimeout(() => setPermissionError(null), 4000);
      return;
    }
    setPermissionError(null);
    onMoveStatus(ticket.id, direction);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-[#00A896]/10 text-[#00A896] font-mono font-bold text-xs flex items-center gap-1.5 border border-[#00A896]/20">
              <Tag className="w-3.5 h-3.5" />
              <span>{ticket.code}</span>
            </div>
            
            <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
              ticket.ticketType === 'Incidencia' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
              ticket.ticketType === 'VIP' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
              ticket.ticketType === 'Logística' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
              'bg-blue-100 text-blue-800 border border-blue-300'
            }`}>
              {ticket.ticketType || 'Reserva'}
            </span>

            <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
              ticket.priority === 'VIP' ? 'bg-purple-600 text-white' :
              ticket.priority === 'ALTA' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              Prioridad: {ticket.priority}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Stage Move Controls */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm text-xs font-mono">
              <button 
                onClick={() => handleMove('prev')}
                disabled={ticket.status === 'BACKLOG'}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 font-bold"
                title={userRole !== 'admin' ? 'Requiere usuario Admin para mover hacia atrás' : 'Retroceder etapa'}
              >
                {userRole !== 'admin' && <Lock className="w-3 h-3 text-amber-600" />}
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Atrás</span>
              </button>
              
              <span className="px-2 font-bold text-slate-900 text-[11px]">{ticket.status}</span>

              <button 
                onClick={() => handleMove('next')}
                disabled={ticket.status === 'COMPLETADA'}
                className="px-2.5 py-1 rounded-lg bg-[#00A896] hover:bg-[#028090] text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 font-bold"
              >
                <span>Avanzar</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-200/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Permission Warning Notification */}
        <AnimatePresence>
          {permissionError && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-amber-500 text-slate-950 px-6 py-2.5 text-xs font-mono font-bold flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>{permissionError}</span>
              </div>
              <button onClick={() => setPermissionError(null)}><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Body Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Main Column (Details, Comments, Attachments) */}
          <div className="lg:col-span-2 p-6 sm:p-8 space-y-6">
            
            {/* Title & Customer */}
            <div>
              <span className="text-[11px] font-mono text-[#00A896] font-bold uppercase tracking-wider block mb-1">
                {ticket.excursionTitle}
              </span>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {ticket.customerName}
              </h2>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mt-2 flex-wrap">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#00A896]" /> {ticket.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#00A896]" /> {ticket.guests} Pax</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-900 font-bold"><DollarSign className="w-3.5 h-3.5 text-emerald-600" /> USD {ticket.totalPriceUSD}</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-mono font-bold">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'details' ? 'bg-[#00A896] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Detalles & Notas</span>
              </button>

              <button
                onClick={() => setActiveTab('comments')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'comments' ? 'bg-[#00A896] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Comentarios & @Menciones ({ticket.comments?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('attachments')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'attachments' ? 'bg-[#00A896] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Adjuntos ({ticket.attachments?.length || 0})</span>
              </button>
            </div>

            {/* TAB 1: DETAILS & NOTES */}
            {activeTab === 'details' && (
              <div className="space-y-6 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-mono font-bold text-slate-500 text-[10px] uppercase block">Notas Operativas del Ticket</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {ticket.operatorNotes || 'Sin notas registradas aún por el operador.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Lugar de Pick-Up / Hotel</span>
                    <span className="font-bold text-slate-900 block">{ticket.pickupLocation}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Fecha de Creación</span>
                    <span className="font-bold text-slate-900 block">{ticket.createdAt}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COMMENTS & MENTIONS */}
            {activeTab === 'comments' && (
              <div className="space-y-6">
                
                {/* New Comment Box */}
                <form onSubmit={handleAddComment} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700">Agregar Comentario / Actualización</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono text-slate-400 mr-1">@Mencionar:</span>
                      {staffList.map(staff => (
                        <button
                          key={staff.id}
                          type="button"
                          onClick={() => handleInsertMention(staff)}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-[#00A896] text-[10px] font-mono text-slate-700 hover:text-[#00A896] transition-colors"
                        >
                          @{staff.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    required
                    placeholder="Escribe tu actualización o menciona a otro miembro del equipo con @"
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896] text-xs font-sans placeholder-slate-400"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      {selectedMentions.length > 0 ? `Se notificará a ${selectedMentions.length} miembros` : 'Sin menciones directas'}
                    </span>

                    <button
                      type="submit"
                      className="bg-[#00A896] hover:bg-[#028090] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#00A896]/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Comentar</span>
                    </button>
                  </div>
                </form>

                {/* Comment Thread List */}
                <div className="space-y-3">
                  {(ticket.comments || []).map(comment => (
                    <div key={comment.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#00A896] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                            {comment.avatar}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block leading-none">{comment.authorName}</span>
                            <span className="text-[10px] font-mono text-slate-400">{comment.authorEmail}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{comment.createdAt}</span>
                      </div>

                      <p className="text-slate-700 leading-relaxed font-medium pl-9 whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>
                  ))}

                  {(!ticket.comments || ticket.comments.length === 0) && (
                    <div className="text-center py-8 text-slate-400 text-xs font-mono">
                      No hay comentarios registrados en este ticket. ¡Sé el primero en actualizar!
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 3: ATTACHMENTS */}
            {activeTab === 'attachments' && (
              <div className="space-y-6">
                
                {/* Add Attachment Form */}
                <form onSubmit={handleAddAttachment} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Nombre del documento o archivo adjunto (ej: Voucher_Firmado.pdf)"
                    value={newAttachmentName}
                    onChange={e => setNewAttachmentName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00A896]"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adjuntar</span>
                  </button>
                </form>

                {/* Attachments Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(ticket.attachments || []).map((att, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <Paperclip className="w-4 h-4 text-[#00A896] shrink-0" />
                        <div className="truncate">
                          <span className="font-bold text-slate-900 block truncate">{att.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{att.size}</span>
                        </div>
                      </div>
                      <a 
                        href="#" 
                        onClick={e => { e.preventDefault(); alert(`Descargando ${att.name}...`); }}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                        title="Descargar adjunto"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))}

                  {(!ticket.attachments || ticket.attachments.length === 0) && (
                    <div className="col-span-2 text-center py-8 text-slate-400 text-xs font-mono">
                      No hay archivos adjuntos en este ticket.
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Sidebar Column (Metadata & Quick Actions) */}
          <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50 text-xs">
            <div>
              <span className="font-mono font-bold text-slate-400 text-[10px] uppercase block mb-2">Clasificación & Asignación</span>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-500 font-mono text-[10px] uppercase mb-1">Tipo de Ticket</label>
                  <select
                    value={ticket.ticketType || 'Reserva'}
                    onChange={e => onUpdateTicket({ ...ticket, ticketType: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 focus:outline-none focus:border-[#00A896]"
                  >
                    <option value="Reserva">Reserva Receptiva</option>
                    <option value="Incidencia">Incidencia / Reclamo</option>
                    <option value="Consulta">Consulta Comercial</option>
                    <option value="Logística">Logística & Flota</option>
                    <option value="VIP">Atención VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-mono text-[10px] uppercase mb-1">Guía Asignado</label>
                  <input
                    type="text"
                    value={ticket.assignedGuide}
                    onChange={e => onUpdateTicket({ ...ticket, assignedGuide: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 focus:outline-none focus:border-[#00A896]"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-mono text-[10px] uppercase mb-1">Vehículo / Flota</label>
                  <input
                    type="text"
                    value={ticket.assignedVehicle}
                    onChange={e => onUpdateTicket({ ...ticket, assignedVehicle: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <span className="font-mono font-bold text-slate-400 text-[10px] uppercase block">Contacto del Pasajero</span>
              
              <div className="space-y-2 font-mono text-slate-700">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-[#00A896] shrink-0" />
                  <span className="truncate">{ticket.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#00A896] shrink-0" />
                  <span>{ticket.customerPhone}</span>
                </div>
              </div>

              <a 
                href={`https://wa.me/${ticket.customerPhone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(ticket.customerName)},%20te%20contactamos%20respecto%20a%20tu%20reserva%20${ticket.code}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm text-xs mt-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
