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

  const whatsappUrl = `https://wa.me/5492944558899?text=${encodeURIComponent(
    currentItem.whatsappMessage || `Hola Grupo Visión! Quiero consultar por la promo de ${currentItem.title}.`
  )}`;

  return (
    <section className="py-16 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-mono font-bold tracking-wider mb-2">
              <Sparkles size={14} className="animate-pulse" />
              <span>{data?.badge || '⚡ TOP SUGERENCIAS & OFERTAS EXCLUSIVAS'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {data?.title || 'Excursiones Destacadas con Descuento Especial'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl font-medium">
              {data?.subtitle || 'Aprovechá cupos limitados y beneficios exclusivos reservando anticipadamente online o por WhatsApp.'}
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center space-x-3 self-end md:self-auto">
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

        {/* Main Banner Slide Container */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 transition-all group"
        >
          {/* Background Image with Transition */}
          <div className="relative h-[520px] sm:h-[460px] w-full overflow-hidden">
            <img
              key={currentItem.id}
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105 filter brightness-95"
            />
            {/* Cinematic Gradient Overlays for Maximum Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* Banner Floating Content */}
          <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-10">
            
            {/* Top Row: Promo Badge & Limited Seats */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black tracking-wider uppercase shadow-lg shadow-orange-500/30 flex items-center gap-1.5 animate-bounce-subtle">
                <Tag size={13} />
                <span>{currentItem.badge}</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5">
                <Clock size={12} className="text-[#00A896]" />
                <span>{currentItem.duration}</span>
              </span>

              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <ShieldCheck size={12} />
                <span>Cupos Limitados</span>
              </span>
            </div>

            {/* Middle Section: Title, Description & Pricing Block */}
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight drop-shadow-md">
                {currentItem.title}
              </h3>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 font-medium drop-shadow-sm">
                {currentItem.tagline}
              </p>

              {/* E-Commerce Price Tag */}
              <div className="pt-2 flex flex-wrap items-baseline gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-400 text-sm sm:text-base font-mono line-through">
                    ${currentItem.originalPrice.toLocaleString('es-AR')}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight text-emerald-400 drop-shadow-sm">
                    ${currentItem.finalPrice.toLocaleString('es-AR')}
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    ARS / persona
                  </span>
                </div>

                {savings > 0 && (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
                    Ahorrás ${savings.toLocaleString('es-AR')}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Row: Call to Actions & Slide Dots */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectExcursion(currentItem.excursionId)}
                  className="bg-[#00A896] hover:bg-[#028090] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-[#00A896]/30 flex items-center space-x-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>Ver Excursión &amp; Reservar</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 hover:scale-[1.02] active:scale-95"
                >
                  <MessageSquare size={15} className="text-emerald-400" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>

              {/* Progress Line Dots */}
              <div className="flex items-center space-x-2 self-start sm:self-center">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx 
                        ? 'w-8 bg-[#00A896] shadow-md shadow-[#00A896]/50' 
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    title={`Ir a sugerencia ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Thumbnail Quick Selector Bar below banner (Virtual Store Style) */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-2.5 rounded-2xl border text-left transition-all flex items-center space-x-3 cursor-pointer ${
                currentIndex === idx
                  ? 'bg-white border-[#00A896] shadow-md ring-2 ring-[#00A896]/20'
                  : 'bg-white/60 hover:bg-white border-slate-200 text-slate-700'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-11 h-11 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-orange-600 font-mono">
                  <span>{item.discountPercent}% OFF</span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 truncate">
                  {item.title}
                </h5>
                <span className="text-[11px] font-mono font-bold text-emerald-600">
                  ${item.finalPrice.toLocaleString('es-AR')}
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
