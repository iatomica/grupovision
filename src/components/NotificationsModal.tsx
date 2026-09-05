import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, AtSign, CheckCircle, Tag, ChevronRight } from 'lucide-react';

export interface UserNotification {
  id: string;
  recipientEmail: string;
  senderName: string;
  ticketCode: string;
  ticketId: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  notifications: UserNotification[];
  onClose: () => void;
  onSelectNotification: (ticketId: string) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  notifications,
  onClose,
  onSelectNotification,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 border border-[#00A896]/30 flex items-center justify-center text-[#00A896]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Notificaciones & Menciones</h3>
              <span className="text-xs font-mono text-slate-500">Menciones en equipo y tickets asignados</span>
            </div>
          </div>

          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] font-mono text-[#00A896] font-bold hover:underline"
          >
            Marcar leídas
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {notifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                onSelectNotification(notif.ticketId);
                onClose();
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                notif.isRead ? 'bg-slate-50 border-slate-200/80 opacity-75' : 'bg-white border-[#00A896]/40 shadow-sm hover:border-[#00A896]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <AtSign className="w-3.5 h-3.5 text-[#00A896]" />
                  {notif.senderName}
                </span>
                <span className="text-slate-400 text-[10px]">{notif.createdAt}</span>
              </div>

              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {notif.message}
              </p>

              <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                <span className="text-[#00A896] font-bold">Ticket {notif.ticketCode}</span>
                <span className="text-slate-400 hover:text-slate-900 flex items-center gap-0.5">Ver ticket <ChevronRight className="w-3 h-3" /></span>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs font-mono">
              No tienes notificaciones pendientes.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
