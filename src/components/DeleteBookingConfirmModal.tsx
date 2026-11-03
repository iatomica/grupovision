import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, X, Calendar, User, DollarSign, ShieldAlert } from 'lucide-react';
import { Booking } from './JiraTicketModal';

interface DeleteBookingConfirmModalProps {
  isOpen: boolean;
  booking: Booking | null;
  onConfirm: () => void;
  onClose: () => void;
  isDeleting?: boolean;
}

export const DeleteBookingConfirmModal: React.FC<DeleteBookingConfirmModalProps> = ({
  isOpen,
  booking,
  onConfirm,
  onClose,
  isDeleting = false
}) => {
  if (!isOpen || !booking) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-rose-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 to-red-600 p-6 text-white flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full font-bold">
                  Acción de Administrador
                </span>
                <h3 className="text-xl font-black mt-1">¿Eliminar Ticket {booking.code}?</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="p-1.5 rounded-xl hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed">
              Estás a punto de eliminar definitivamente este pedido de los registros operativos y del tablero Kanban:
            </p>

            {/* Ticket Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-bold">Ticket Code:</span>
                <span className="font-extrabold text-[#00A896] bg-[#00A896]/10 px-2 py-0.5 rounded-md">
                  {booking.code}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5 font-sans font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Pasajero Titular:
                </span>
                <span className="font-bold text-slate-900 font-sans">{booking.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5 font-sans font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Excursión & Fecha:
                </span>
                <span className="font-semibold text-slate-800 font-sans text-right max-w-[240px] truncate">
                  {booking.excursionTitle} ({booking.date})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5 font-sans font-medium">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Monto Total:
                </span>
                <span className="font-bold text-slate-900 font-sans">
                  ${booking.totalPriceUSD.toLocaleString('es-AR')} ARS
                </span>
              </div>
              {booking.emittedBy && (
                <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
                  <span className="text-slate-500 font-sans font-medium">Emitido por:</span>
                  <span className="text-teal-800 font-sans font-bold">{booking.emittedBy}</span>
                </div>
              )}
            </div>

            {/* Warning Alert */}
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="font-bold">Atención:</strong> Esta operación se actualizará en los registros centrales del sistema (<code className="font-mono text-[11px] bg-rose-100 px-1 rounded">data/bookings.json</code>) y en la auditoría general. No se puede revertir.
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isDeleting ? 'Eliminando de registros...' : 'Sí, Eliminar Definitivamente'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
