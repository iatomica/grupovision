import React, { useState } from 'react';
import { 
  Sliders, 
  Tag, 
  Search, 
  Edit3, 
  CheckCircle, 
  Sparkles, 
  Percent, 
  DollarSign, 
  Eye, 
  EyeOff, 
  Save, 
  RotateCcw,
  Star,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Excursion } from '../data/excursionsData';

interface AdminPromosExcursionsProps {
  excursions: Excursion[];
  onUpdateExcursionPromo: (id: string, updates: Partial<Excursion>) => void;
}

export const AdminPromosExcursions: React.FC<AdminPromosExcursionsProps> = ({
  excursions,
  onUpdateExcursionPromo
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [editingExcursion, setEditingExcursion] = useState<Excursion | null>(null);

  // Form State
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formDiscount, setFormDiscount] = useState<number>(0);
  const [formBadge, setFormBadge] = useState<string>('');
  const [formCustomNote, setFormCustomNote] = useState<string>('');

  const filteredExcursions = excursions.filter(exc => {
    const matchesCategory = categoryFilter === 'Todas' || exc.category === categoryFilter;
    const matchesSearch = exc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEditClick = (exc: Excursion) => {
    setEditingExcursion(exc);
    setFormPrice(exc.priceNum);
    setFormDiscount(exc.discountPercent || 0);
    setFormBadge(exc.promoBadge || '');
    setFormCustomNote(exc.customNote || '');
  };

  const handleSavePromo = () => {
    if (!editingExcursion) return;
    onUpdateExcursionPromo(editingExcursion.id, {
      priceNum: formPrice,
      discountPercent: formDiscount,
      promoBadge: formBadge || undefined,
      customNote: formCustomNote || undefined
    });
    setEditingExcursion(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-bold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" /> Gestor Dinámico de Tarifas & Promociones
            </span>
            <span className="text-xs text-slate-400">Impacto Global Real</span>
          </div>
          <h2 className="text-2xl font-bold">Configuración de Excursiones & Descuentos</h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Cualquier modificación en el precio base, % de descuento o badges promocionales impactará inmediatamente en la **Landing Page**, la **Vista de Viajeros**, las **Cotizaciones del Asesor** y la **Calculadora Financiera**.
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 text-right">
          <div className="text-xs text-slate-400 font-medium">Excursiones Activas</div>
          <div className="text-2xl font-black text-cyan-400">{excursions.length} Servicios</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título de excursión..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['Todas', 'Tradicional', 'Aventura', 'Navegación', 'Experiencias', 'Invierno'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Excursions Promo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExcursions.map((exc) => {
          const discount = exc.discountPercent || 0;
          const discountedPrice = discount > 0 ? Math.round(exc.priceNum * (1 - discount / 100)) : exc.priceNum;

          return (
            <motion.div
              key={exc.id}
              whileHover={{ y: -3 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg uppercase tracking-wider">
                    {exc.category}
                  </span>
                  {exc.promoBadge && (
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[11px] font-extrabold rounded-lg flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {exc.promoBadge}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <img src={exc.image} alt={exc.title} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{exc.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{exc.duration} • {exc.season}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Tarifa Base / Con Descuento</div>
                  <div className="flex items-baseline gap-2">
                    {discount > 0 ? (
                      <>
                        <span className="text-xs text-slate-400 line-through">${exc.priceNum}</span>
                        <span className="text-xl font-black text-emerald-600">${discountedPrice} USD</span>
                        <span className="text-[11px] font-bold text-rose-600">({discount}% OFF)</span>
                      </>
                    ) : (
                      <span className="text-xl font-black text-slate-900">${exc.priceNum} USD</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleEditClick(exc)}
                  className="px-3 py-2 bg-slate-900 hover:bg-cyan-600 text-white font-medium text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Editar Promo
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingExcursion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-600" />
                  Configurar Tarifa & Promoción
                </h3>
                <button onClick={() => setEditingExcursion(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div>
                <div className="font-bold text-slate-900">{editingExcursion.title}</div>
                <div className="text-xs text-slate-500">{editingExcursion.category} • ID: {editingExcursion.id}</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Precio Base en USD</label>
                  <input
                    type="number"
                    min={10}
                    max={2000}
                    value={formPrice}
                    onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Porcentaje de Descuento Global (%)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={50}
                      step={5}
                      value={formDiscount}
                      onChange={(e) => setFormDiscount(parseInt(e.target.value))}
                      className="w-full accent-cyan-600"
                    />
                    <span className="text-lg font-black text-rose-600 min-w-[3rem] text-right">
                      {formDiscount}%
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Etiqueta Promocional (Badge)</label>
                  <input
                    type="text"
                    placeholder="Ej: 2x1 Invierno, 15% OFF Early Bird..."
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setEditingExcursion(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePromo}
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-medium rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Impactar Cambios Globalmente
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
