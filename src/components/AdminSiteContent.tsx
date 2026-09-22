import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RotateCcw, 
  CheckCircle, 
  Sparkles, 
  Award, 
  Car, 
  ShieldCheck, 
  Building2, 
  MessageCircle, 
  Image as ImageIcon,
  ExternalLink,
  HelpCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteContentData, AboutSectionData, ExclusiveSectionData } from '../data/siteContentData';
import { MediaLibraryModal } from './MediaLibraryModal';

interface AdminSiteContentProps {
  content: SiteContentData;
  onSaveContent: (updated: SiteContentData) => void;
  onResetContent: () => void;
  onViewPublicSite: () => void;
}

export const AdminSiteContent: React.FC<AdminSiteContentProps> = ({
  content,
  onSaveContent,
  onResetContent,
  onViewPublicSite
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'exclusive'>('about');
  const [formData, setFormData] = useState<SiteContentData>(content);
  const [isSavedAlert, setIsSavedAlert] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // Sync when prop updates
  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleSave = () => {
    onSaveContent(formData);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3500);
  };

  const updateAbout = (updates: Partial<AboutSectionData>) => {
    setFormData(prev => ({
      ...prev,
      about: { ...prev.about, ...updates }
    }));
  };

  const updateExclusive = (updates: Partial<ExclusiveSectionData>) => {
    setFormData(prev => ({
      ...prev,
      exclusive: { ...prev.exclusive, ...updates }
    }));
  };

  const updateMetric = (index: number, field: 'value' | 'label', val: string) => {
    setFormData(prev => {
      const metrics = [...prev.about.fleetMetrics];
      metrics[index] = { ...metrics[index], [field]: val };
      return {
        ...prev,
        about: { ...prev.about, fleetMetrics: metrics }
      };
    });
  };

  return (
    <div className="space-y-6">
      
      {/* TOP HEADER WITH SAVE BAR */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00A896] block mb-1">
            AUTOGESTIÓN DE CONTENIDOS WEB · GRUPO VISIÓN
          </span>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            Editor de Secciones Institucionales
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-1">
            Modificá fácilmente los textos, imágenes y tarjetas informativas del sitio público sin necesidad de tocar código.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Restablecer textos por defecto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>

          <button
            onClick={onViewPublicSite}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Ver Sitio Público</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold transition-all shadow-md shadow-[#00A896]/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION */}
      <AnimatePresence>
        {isSavedAlert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>¡Los cambios se guardaron y ya están visibles en el sitio web público!</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
              Persistido en Servidor
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION TABS */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-3xl px-6 pt-2">
        <button
          onClick={() => setActiveTab('about')}
          className={`py-4 px-5 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'about'
              ? 'border-[#00A896] text-[#00A896]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>1. Sección Quiénes Somos & Trayectoria</span>
        </button>

        <button
          onClick={() => setActiveTab('exclusive')}
          className={`py-4 px-5 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'exclusive'
              ? 'border-[#00A896] text-[#00A896]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>2. Sección Expediciones Exclusivas & VIP</span>
        </button>
      </div>

      {/* TAB 1: QUIÉNES SOMOS */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-b-3xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-8 shadow-sm">
          
          {/* Header Texts */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00A896]" />
              <span>Encabezado Principal de "Quiénes Somos"</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Insignia / Etiqueta Superior</label>
                <input
                  type="text"
                  value={formData.about.badge}
                  onChange={e => updateAbout({ badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Título Principal</label>
                <input
                  type="text"
                  value={formData.about.title}
                  onChange={e => updateAbout({ title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Párrafo Descriptivo / Reseña Institucional</label>
              <textarea
                rows={3}
                value={formData.about.description}
                onChange={e => updateAbout({ description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896] leading-relaxed"
              />
            </div>
          </div>

          {/* Background Image with WordPress Media Library */}
          <div className="space-y-3 pt-2">
            <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#00A896]" />
              <span>Imagen de Fondo de la Sección</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-32 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shrink-0 relative group">
                <img 
                  src={formData.about.backgroundImage} 
                  alt="Fondo Quiénes Somos"
                  className="w-full h-full object-cover" 
                />
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(true)}
                  className="absolute inset-0 bg-slate-950/60 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Cambiar</span>
                </button>
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="text-xs font-mono text-slate-600 truncate">
                  <span className="font-sans font-bold text-slate-400 mr-2">Archivo actual:</span>
                  <span className="font-bold text-slate-900">{formData.about.backgroundImage.split('/').pop()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Elegir de Biblioteca Multimedia / Subir nueva imagen</span>
                </button>
                <p className="text-[11px] text-slate-500">
                  Podés seleccionar fotos del catálogo o subir fotos propias. El sistema las normaliza a WebP automáticamente.
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid Editors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            
            {/* Card 1: Flota Propia */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b border-slate-200 pb-2">
                <Car className="w-4 h-4 text-cyan-600" />
                <span>Tarjeta 1: Flota Propia & Unidades</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título de Tarjeta</label>
                <input
                  type="text"
                  value={formData.about.fleetTitle}
                  onChange={e => updateAbout({ fleetTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción de la Flota</label>
                <textarea
                  rows={2}
                  value={formData.about.fleetDescription}
                  onChange={e => updateAbout({ fleetDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>

              {/* 3 Metrics */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-500">
                  3 Indicadores Numéricos (Métricas):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {formData.about.fleetMetrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white border border-slate-200 space-y-1">
                      <input
                        type="text"
                        value={m.value}
                        onChange={e => updateMetric(idx, 'value', e.target.value)}
                        placeholder="Ej: 15+"
                        className="w-full px-1.5 py-1 text-center font-black text-cyan-600 text-sm border-b border-slate-100 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={m.label}
                        onChange={e => updateMetric(idx, 'label', e.target.value)}
                        placeholder="Etiqueta"
                        className="w-full px-1.5 py-0.5 text-center text-[10px] font-mono text-slate-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Guías Profesionales */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b border-slate-200 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Tarjeta 2: Guías Profesionales & Certificación</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título de Tarjeta</label>
                <input
                  type="text"
                  value={formData.about.guidesTitle}
                  onChange={e => updateAbout({ guidesTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción de los Guías</label>
                <textarea
                  rows={2}
                  value={formData.about.guidesDescription}
                  onChange={e => updateAbout({ guidesDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Distintivo / Certificación</label>
                  <input
                    type="text"
                    value={formData.about.guidesBadgeTitle}
                    onChange={e => updateAbout({ guidesBadgeTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Detalle Certificación</label>
                  <input
                    type="text"
                    value={formData.about.guidesBadgeDesc}
                    onChange={e => updateAbout({ guidesBadgeDesc: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: EXPEDICIONES EXCLUSIVAS */}
      {activeTab === 'exclusive' && (
        <div className="bg-white rounded-b-3xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-8 shadow-sm">
          
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00A896]" />
              <span>Bloque de Expediciones Exclusivas & Paquetes a Medida</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Insignia / Badge Superior</label>
                <input
                  type="text"
                  value={formData.exclusive.badge}
                  onChange={e => updateExclusive({ badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Título de la Propuesta</label>
                <input
                  type="text"
                  value={formData.exclusive.title}
                  onChange={e => updateExclusive({ title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Texto Descriptivo del Servicio Exclusivo</label>
              <textarea
                rows={3}
                value={formData.exclusive.description}
                onChange={e => updateExclusive({ description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896] leading-relaxed"
              />
            </div>
          </div>

          {/* Action & WhatsApp Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            
            {/* WhatsApp CTA */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b border-slate-200 pb-2">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Botón de Cotización por WhatsApp</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Texto del Botón</label>
                <input
                  type="text"
                  value={formData.exclusive.buttonText}
                  onChange={e => updateExclusive({ buttonText: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mensaje Predefinido de WhatsApp</label>
                <textarea
                  rows={2}
                  value={formData.exclusive.whatsappMessage}
                  onChange={e => updateExclusive({ whatsappMessage: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Este es el mensaje que se abrirá automáticamente en la app del cliente al tocar el botón.
                </span>
              </div>
            </div>

            {/* Office Info Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b border-slate-200 pb-2">
                <Building2 className="w-4 h-4 text-cyan-600" />
                <span>Tarjeta de Atención Presencial</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título de Atención</label>
                <input
                  type="text"
                  value={formData.exclusive.officeTitle}
                  onChange={e => updateExclusive({ officeTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de la Sucursal</label>
                <input
                  type="text"
                  value={formData.exclusive.officeAddress}
                  onChange={e => updateExclusive({ officeAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Horarios de Atención</label>
                <input
                  type="text"
                  value={formData.exclusive.officeSchedule}
                  onChange={e => updateExclusive({ officeSchedule: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* MODAL MEDIA LIBRARY FOR BACKGROUND IMAGE */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectImage={(url) => updateAbout({ backgroundImage: url })}
        currentSelectedUrl={formData.about.backgroundImage}
      />

      {/* RESET CONFIRMATION DIALOG */}
      <AnimatePresence>
        {isResetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h4 className="font-black text-lg text-slate-900">¿Restablecer Secciones?</h4>
                <p className="text-xs text-slate-500">
                  Esta acción restaurará los textos y configuración original de fábrica para "Quiénes Somos" y "Expediciones Exclusivas".
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onResetContent();
                    setIsResetConfirmOpen(false);
                    setIsSavedAlert(true);
                    setTimeout(() => setIsSavedAlert(false), 3500);
                  }}
                  className="w-1/2 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md"
                >
                  Restablecer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
