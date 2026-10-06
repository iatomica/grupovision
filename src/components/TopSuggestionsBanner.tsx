import React, { useState, useEffect, useRef } from 'react';
import type { SuggestionBannerItem, TopSuggestionsSectionData } from '../data/siteContentData';
import type { Excursion } from '../data/excursionsData';
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
  excursions?: Excursion[];
  onSelectExcursion: (excursionId: string) => void;
}

export const TopSuggestionsBanner: React.FC<TopSuggestionsBannerProps> = ({
  data,
  excursions = [],
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

  // Resolve matching excursion from live catalog to ensure image/data sync
  const matchedExcursion = excursions.find(e => 
    e.id === currentItem.excursionId ||
    e.title.toLowerCase().trim() === currentItem.title.toLowerCase().trim() ||
    (currentItem.excursionId && (e.id.includes(currentItem.excursionId) || currentItem.excursionId.includes(e.id)))
  );

  const displayImage = currentItem.image || matchedExcursion?.image;
  const displayTitle = currentItem.title || matchedExcursion?.title || 'Excursión Bariloche';
  const displayDuration = currentItem.duration || matchedExcursion?.duration || 'Día Completo';

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const savings = Math.max(0, currentItem.originalPrice - currentItem.finalPrice);
  const discountLabel = currentItem.discountPercent ? `${currentItem.discountPercent}% OFF` : (currentItem.badge || 'Promoción Especial');

  // Dynamic WhatsApp message generation for each promo
  const dynamicWhatsappMessage = currentItem.whatsappMessage && currentItem.whatsappMessage.trim() !== ''
    ? currentItem.whatsappMessage
    : `Hola Grupo Visión! Deseo aprovechar la promoción de "${displayTitle}" (${discountLabel}) | Tarifa Especial Promo: $${currentItem.finalPrice.toLocaleString('es-AR')} ARS / persona${savings > 0 ? ` (Ahorro: $${savings.toLocaleString('es-AR')})` : ''} | ¿Tienen disponibilidad confirmada para los próximos días?`;

  const whatsappUrl = `https://wa.me/5492944235278?text=${encodeURIComponent(dynamicWhatsappMessage)}`;

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-slate-100 via-white to-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
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
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-slate-900 font-black">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
            </span>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
              title={isPaused ? 'Reanudar carrusel automático' : 'Pausar carrusel'}
            >
              {isPaused ? <Play size={15} /> : <Pause size={15} />}
            </button>

            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-white hover:bg-[#00A896] hover:border-[#00A896] transition-all shadow-xs cursor-pointer"
              title="Anterior sugerencia"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-white hover:bg-[#00A896] hover:border-[#00A896] transition-all shadow-xs cursor-pointer"
              title="Siguiente sugerencia"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* FULL BANNER CARD WITH REDUCED / LESS OPAQUE GRADIENT OVERLAY */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[460px] sm:min-h-[500px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 border border-slate-300/40 group"
        >
          {/* 1. Full Banner Image Covering Entire Card */}
          <img
            key={currentItem.id + displayImage}
            src={displayImage}
            alt={displayTitle}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* 2. Reduced, Less Opaque Elegant Gradient Shadow Overlay */}
          {/* Lighter on desktop right side so nature/mountain is fully visible, darker on left for crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-900/25 sm:from-slate-950/80 sm:via-slate-900/50 sm:to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

          {/* 3. Top Banner Badges Row (Floating on Top-Left) */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-10 flex flex-wrap items-center gap-2 z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1.5 backdrop-blur-xs">
              <Tag size={13} />
              <span>{currentItem.badge}</span>
            </span>

            <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-mono font-bold flex items-center gap-1.5 border border-white/25 shadow-xs">
              <Clock size={12} className="text-emerald-300" />
              <span>{displayDuration}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/25 backdrop-blur-md text-emerald-300 border border-emerald-400/30 text-xs font-bold font-mono shadow-xs">
              <ShieldCheck size={13} />
              <span>Cupos Limitados</span>
            </span>
          </div>

          {/* Guarantee Tag on Top-Right */}
          <div className="hidden sm:flex absolute top-6 right-6 sm:top-8 sm:right-10 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-white/90 text-xs font-mono font-bold items-center gap-1.5 z-10">
            <Sparkles size={13} className="text-[#00A896]" />
            <span>Garantía Receptiva Visión</span>
          </div>

          {/* 4. Banner Content (Bottom & Left Aligned, High Contrast & Crisp) */}
          <div className="relative z-10 max-w-3xl space-y-4 pt-16 sm:pt-12">
            
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight drop-shadow-md">
              {displayTitle}
            </h3>

            <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-3 font-normal drop-shadow-xs max-w-2xl">
              {currentItem.tagline}
            </p>

            {/* Price & Savings Tag */}
            <div className="pt-2 flex flex-wrap items-baseline gap-3 sm:gap-4">
              <div className="flex items-baseline gap-2.5 bg-slate-950/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15">
                <span className="text-slate-400 text-sm sm:text-base font-mono line-through">
                  ${currentItem.originalPrice.toLocaleString('es-AR')}
                </span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 font-mono tracking-tight drop-shadow-sm">
                  ${currentItem.finalPrice.toLocaleString('es-AR')}
                </span>
                <span className="text-xs sm:text-sm font-mono text-slate-300 font-semibold">
                  ARS / persona
                </span>
              </div>

              {savings > 0 && (
                <span className="px-3.5 py-2 rounded-2xl bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-black font-mono border border-emerald-400/40 shadow-xs">
                  Ahorrás ${savings.toLocaleString('es-AR')}
                </span>
              )}
            </div>

            {/* Action CTAs & Slide Dots */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectExcursion(currentItem.excursionId || matchedExcursion?.id || '')}
                  className="bg-[#00A896] hover:bg-[#028090] text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-[#00A896]/30 flex items-center space-x-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>Ver Excursión &amp; Reservar</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs sm:text-sm font-black px-5 py-3.5 rounded-2xl transition-all flex items-center space-x-2 shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <MessageSquare size={16} className="fill-current" />
                  <span>WhatsApp Directo</span>
                </a>
              </div>

              {/* Dots navigation */}
              <div className="flex items-center space-x-2 self-start sm:self-center bg-slate-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx 
                        ? 'w-7 bg-emerald-400' 
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    title={`Ir a sugerencia ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
