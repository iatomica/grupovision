import React, { useState, useEffect, useRef } from 'react';
import type { SuggestionBannerItem, TopSuggestionsSectionData } from '../data/siteContentData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  Pause,
  Play
} from 'lucide-react';

interface TopSuggestionsBannerProps {
  data?: TopSuggestionsSectionData;
  onSelectExcursion: (excursionId: string) => void;
}

export const TopSuggestionsBanner: React.FC<TopSuggestionsBannerProps> = ({
  data,
  onSelectExcursion
}) => {
  const items: SuggestionBannerItem[] = data?.items || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play timer
  useEffect(() => {
    if (items.length <= 1) return;

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 5500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, isPaused]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const savings = Math.max(0, currentItem.originalPrice - currentItem.finalPrice);

  const whatsappUrl = `https://wa.me/5492944235278?text=${encodeURIComponent(
    currentItem.whatsappMessage || `Hola Grupo Visión! Quiero consultar por la promo de ${currentItem.title}.`
  )}`;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#00A896] border border-[#00A896]/20 text-xs font-mono font-bold tracking-wider mb-2 shadow-xs">
              <Sparkles size={14} className="text-[#00A896] animate-pulse" />
              <span>{data?.badge || '⚡ TOP SUGERENCIAS & OFERTAS EXCLUSIVAS'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {data?.title || 'Excursiones Destacadas con Descuento Especial'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl font-medium">
              {data?.subtitle || 'Aprovechá cupos limitados y beneficios exclusivos reservando anticipadamente online o por WhatsApp.'}
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center space-x-3 self-end md:self-auto shrink-0">
            <span className="text-xs font-mono font-bold text-slate-400">
              <span className="text-slate-900 font-black">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
            </span>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs"
              title={isPaused ? 'Reanudar carrusel automático' : 'Pausar carrusel'}
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
            </button>

            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-white hover:bg-[#00A896] hover:border-[#00A896] transition-all shadow-xs"
              title="Anterior sugerencia"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-white hover:bg-[#00A896] hover:border-[#00A896] transition-all shadow-xs"
              title="Siguiente sugerencia"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Luminous, High-Contrast Split Banner Card (Sin sombras oscuras ni overlays opacos) */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 overflow-hidden transition-all grid grid-cols-1 lg:grid-cols-12 min-h-[440px]"
        >
          {/* Left Column: Clean, Bright Information & CTAs */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/20">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black tracking-wider uppercase shadow-sm flex items-center gap-1.5">
                <Tag size={13} />
                <span>{currentItem.badge}</span>
              </span>

              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 border border-slate-200">
                <Clock size={12} className="text-[#00A896]" />
                <span>{currentItem.duration}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
                <ShieldCheck size={13} />
                <span>Cupos Limitados</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-3 mb-6">
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {currentItem.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 font-medium">
                {currentItem.tagline}
              </p>

              {/* Price & Savings Tag */}
              <div className="pt-3 flex flex-wrap items-baseline gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-400 text-sm sm:text-base font-mono line-through">
                    ${currentItem.originalPrice.toLocaleString('es-AR')}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-[#00A896] font-mono tracking-tight">
                    ${currentItem.finalPrice.toLocaleString('es-AR')}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    ARS / persona
                  </span>
                </div>

                {savings > 0 && (
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold font-mono border border-emerald-200">
                    Ahorrás ${savings.toLocaleString('es-AR')}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Row: Action Buttons & Dots */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectExcursion(currentItem.excursionId)}
                  className="bg-[#00A896] hover:bg-[#028090] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-[#00A896]/20 flex items-center space-x-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>Ver Excursión &amp; Reservar</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400 text-xs sm:text-sm font-bold px-5 py-3.5 rounded-2xl transition-all flex items-center space-x-2 shadow-xs hover:scale-[1.02] active:scale-95"
                >
                  <MessageSquare size={15} className="text-[#25D366]" />
                  <span>WhatsApp Directo</span>
                </a>
              </div>

              {/* Slide Dots Indicator */}
              <div className="flex items-center space-x-1.5">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx 
                        ? 'w-7 bg-[#00A896]' 
                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={`Ir a sugerencia ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: 100% Bright, Crisp, Unshaded High-Res Photography */}
          <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-slate-100">
            <img
              key={currentItem.id}
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-transform duration-700 scale-100 hover:scale-105"
            />
            {/* Subtle light edge vignette only */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-[11px] font-mono font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#00A896]" />
              <span>Garantía Receptiva Visión</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
