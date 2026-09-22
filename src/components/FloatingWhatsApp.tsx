import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingWhatsAppProps {
  isVisible?: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center justify-center select-none">
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
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/50 hover:bg-[#20bd5a] transition-colors group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Subtle glow pulse wave */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 text-white" />
      </motion.a>
    </div>
  );
};
