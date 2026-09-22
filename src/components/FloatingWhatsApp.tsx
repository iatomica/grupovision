import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingWhatsAppProps {
  isVisible?: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ isVisible = true }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none select-none">
      
      {/* SUTTLE TOOLTIP */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold py-2 px-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2 mb-1 group"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>¿Tenés dudas? Chateá con nosotros</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors ml-1"
              title="Cerrar mensaje"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHATSAPP ACTION BUTTON */}
      <motion.a
        href="https://wa.me/5492944235278?text=Hola!%20Deseo%20consultar%20por%20excursiones%20en%20Bariloche%20con%20Grupo%20Vision"
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp Directo con Grupo Visión"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/50 hover:bg-[#20bd5a] transition-colors group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Glow pulse wave */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 text-white" />
      </motion.a>

    </div>
  );
};
