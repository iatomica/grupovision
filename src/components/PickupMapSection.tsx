import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Car,
  MessageCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PickupMapSectionData, PickupPoint } from '../data/siteContentData';

interface PickupMapSectionProps {
  data?: PickupMapSectionData;
  onOpenWhatsApp?: (customMsg?: string) => void;
}

export const PickupMapSection: React.FC<PickupMapSectionProps> = ({
  data,
  onOpenWhatsApp
}) => {
  if (!data || data.enabled === false) return null;

  const points = data.points && data.points.length > 0 ? data.points : [];
  const [selectedPointId, setSelectedPointId] = useState<string>(
    points.find(p => p.isPopular)?.id || points[0]?.id || ''
  );

  const activePoint = points.find(p => p.id === selectedPointId) || points[0];

  const mapLat = activePoint ? activePoint.lat : data.centerLat || -41.1342;
  const mapLng = activePoint ? activePoint.lng : data.centerLng || -71.3088;
  const mapZoom = data.zoom || 14;

  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapLat},${mapLng}&z=${mapZoom}&output=embed`;

  return (
    <section id="mapa-pickups" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00A896]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A896]/10 border border-[#00A896]/30 text-[#00A896] text-xs font-mono font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>{data.badge || 'MAPA DE PICKUPS · LOGÍSTICA RECEPTIVA'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            {data.title || '¿Dónde te Buscamos? Puntos de Salida y Recorrido'}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {data.subtitle || 'Nuestras combis y minibuses realizan paradas estratégicas en el centro y a lo largo de los principales corredores hoteleros de San Carlos de Bariloche.'}
          </p>
        </div>

        {/* Dual-Column Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Points List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#00A896]" />
                <span>Puntos de Salida Registrados ({points.length})</span>
              </span>
              <span className="text-[11px] font-mono text-[#00A896] font-bold">
                Tocá un punto para centrar
              </span>
            </div>

            <div className="space-y-3">
              {points.map((point) => {
                const isSelected = point.id === selectedPointId;

                return (
                  <motion.div
                    key={point.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedPointId(point.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-slate-900 border-[#00A896] ring-2 ring-[#00A896]/30 shadow-lg shadow-[#00A896]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected 
                          ? 'bg-[#00A896] text-slate-950 font-black shadow-md' 
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-sm text-white truncate flex items-center gap-1.5">
                            <span>{point.name}</span>
                            {point.isPopular && (
                              <span className="px-2 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-mono font-bold">
                                Sede Central
                              </span>
                            )}
                          </h4>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#00A896] shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-slate-400 font-medium leading-snug">
                          {point.address}
                        </p>

                        <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                          {point.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[10px] font-mono">
                          {point.estimatedTimeNote ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{point.estimatedTimeNote}</span>
                            </span>
                          ) : (
                            <span className="text-slate-500">Pick-up coordinado</span>
                          )}

                          <a
                            href={`https://maps.google.com/?q=${point.lat},${point.lng}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Abrir en Maps</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Note & WhatsApp CTA Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Car className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {data.infoNote || 'Para hoteles sobre Av. Bustillo (hasta Km 8) y Av. Pioneros, consultá con tu asesor si tu alojamiento cuenta con pick-up directo en puerta.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const msg = `Hola Grupo Visión! Quisiera consultar por el punto de pick-up para mi alojamiento en Bariloche.`;
                  if (onOpenWhatsApp) {
                    onOpenWhatsApp(msg);
                  } else {
                    window.open(`https://wa.me/5492944428800?text=${encodeURIComponent(msg)}`, '_blank');
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Consultar Pick-up de mi Hotel por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sleek Map Viewport (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative">
              
              {/* Map Floating Header Bar */}
              <div className="p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A896] animate-pulse" />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{activePoint?.name || 'San Carlos de Bariloche'}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {activePoint?.address || 'San Martín 398'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    Lat: {mapLat.toFixed(4)}, Lng: {mapLng.toFixed(4)}
                  </span>
                  <a
                    href={`https://maps.google.com/?q=${mapLat},${mapLng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all text-xs inline-flex items-center gap-1 font-mono font-bold"
                    title="Ver pantalla completa en Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                </div>
              </div>

              {/* Map Embed Iframe */}
              <div className="relative w-full h-[460px] sm:h-[520px] bg-slate-950">
                <iframe
                  title="Mapa de Pickups Bariloche"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="border-0 w-full h-full filter invert-[90%] hue-rotate-180 contrast-[88%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Overlaid Bottom Legend */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800/90 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00A896] shrink-0" />
                    <span className="text-[11px]">
                      Punto activo: <strong className="text-white">{activePoint?.name}</strong> ({activePoint?.address})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    {points.map((pt, idx) => (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => setSelectedPointId(pt.id)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          pt.id === selectedPointId
                            ? 'bg-[#00A896] text-slate-950 shadow-xs'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        P{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Helper under map */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Salida puntual con chofer y guía asignado por ticket</span>
              </span>
              <span>San Carlos de Bariloche · Río Negro</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
