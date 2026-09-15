import React, { useState } from 'react';
import { 
  Sliders, 
  Tag, 
  Search, 
  Edit3, 
  CheckCircle, 
  DollarSign, 
  Save, 
  RotateCcw,
  Star,
  Plus,
  Trash2,
  Copy,
  Clock,
  Calendar,
  AlertTriangle,
  HelpCircle,
  List,
  Compass,
  FileText,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Excursion } from '../data/excursionsData';

interface AdminPromosExcursionsProps {
  excursions: Excursion[];
  onUpdateExcursionPromo: (id: string, updates: Partial<Excursion>) => void;
  onSaveExcursion: (excursion: Excursion, isNew: boolean) => void;
  onDeleteExcursion: (id: string) => void;
  onResetCatalog: () => void;
}

const PRESET_IMAGES = [
  { label: 'Refugio Roca Negra', path: '/images/excursiones/refugio-roca-negra.webp' },
  { label: 'Camino de los 7 Lagos', path: '/images/excursiones/camino-de-los-7-lagos-san-martin-de-los-andes.webp' },
  { label: 'Cerro Catedral', path: '/images/excursiones/cerro-catedral.webp' },
  { label: 'Cerro Tronador & Glaciares', path: '/images/excursiones/cerro-tronador-y-glaciares.webp' },
  { label: 'Circuito Chico', path: '/images/excursiones/circuito-chico.webp' },
  { label: 'Circuito Grande & Traful', path: '/images/excursiones/circuito-grande-villa-traful-villa-la-angostura.webp' },
  { label: 'El Bolsón & Lago Puelo', path: '/images/excursiones/el-bolson-chacras-lago-puelo.webp' },
  { label: 'Isla Victoria & Arrayanes', path: '/images/excursiones/isla-victoria-y-bosque-de-arrayanes.webp' },
  { label: 'Puerto Blest & Cántaros', path: '/images/excursiones/puerto-blest-y-cascada-de-los-cantaros.webp' },
  { label: 'Rafting Río Manso', path: '/images/excursiones/rafting-rio-manso-al-limite.webp' },
  { label: 'Cabalgata La Fragua', path: '/images/excursiones/cabalgata-la-fragua.webp' },
  { label: 'Motos de Nieve', path: '/images/excursiones/motos-de-nieve.webp' },
  { label: 'Kayac Lago Gutiérrez', path: '/images/excursiones/kayac-lago-gutierrez.webp' },
  { label: 'Ski Nórdico', path: '/images/excursiones/ski-nordico.webp' },
  { label: 'Teleférico Cerro Otto', path: '/images/excursiones/teleferico-cerro-otto.webp' },
  { label: 'Velero El Orgulloso', path: '/images/excursiones/velero-el-orgulloso.webp' },
  { label: 'Villa La Angostura & Bayo', path: '/images/excursiones/villa-la-angostura-y-cerro-bayo.webp' },
  { label: 'Winter Park', path: '/images/excursiones/winter-park.webp' },
];

const CATEGORIES: Excursion['category'][] = [
  'Tradicional',
  'Aventura',
  'Navegación',
  'Experiencias',
  'Traslados',
  'Invierno',
  'Verano',
  'Alquileres'
];

const SEASONS: Excursion['season'][] = ['Todo el Año', 'Invierno', 'Verano'];
const DIFFICULTIES: Excursion['difficulty'][] = ['Fácil', 'Moderado', 'Desafiante'];

export const AdminPromosExcursions: React.FC<AdminPromosExcursionsProps> = ({
  excursions,
  onUpdateExcursionPromo,
  onSaveExcursion,
  onDeleteExcursion,
  onResetCatalog
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  
  // Quick Promo Modal state
  const [quickPromoExcursion, setQuickPromoExcursion] = useState<Excursion | null>(null);
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formDiscount, setFormDiscount] = useState<number>(0);
  const [formBadge, setFormBadge] = useState<string>('');
  const [formCustomNote, setFormCustomNote] = useState<string>('');

  // Comprehensive Edit / Create Modal state
  const [isFullEditorOpen, setIsFullEditorOpen] = useState(false);
  const [isNewExcursion, setIsNewExcursion] = useState(false);
  const [editorTab, setEditorTab] = useState<'general' | 'texts' | 'services' | 'faq' | 'rates'>('general');
  
  // Full Editor Form State
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<Excursion['category']>('Tradicional');
  const [formSeason, setFormSeason] = useState<Excursion['season']>('Todo el Año');
  const [formDuration, setFormDuration] = useState('Día Completo (8h)');
  const [formDifficulty, setFormDifficulty] = useState<Excursion['difficulty']>('Fácil');
  const [formImage, setFormImage] = useState('/images/excursiones/circuito-chico.webp');
  const [formDescription, setFormDescription] = useState('');
  const [formFullDetails, setFormFullDetails] = useState('');
  const [formHighlights, setFormHighlights] = useState<string[]>([]);
  const [formIncludes, setFormIncludes] = useState<string[]>([]);
  const [formNotIncludes, setFormNotIncludes] = useState<string[]>([]);
  const [formAdditionalInfo, setFormAdditionalInfo] = useState('');
  const [formFaq, setFormFaq] = useState<{ question: string; answer: string }[]>([]);
  const [formRecommendedFor, setFormRecommendedFor] = useState('Familias, Parejas y Grupos');
  const [formDepartureTime, setFormDepartureTime] = useState('09:00 hs');
  const [formPriceNum, setFormPriceNum] = useState<number>(50);
  const [formDiscountPercent, setFormDiscountPercent] = useState<number>(0);
  const [formPromoBadge, setFormPromoBadge] = useState('');
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // Temporary inputs for adding list items
  const [newHighlight, setNewHighlight] = useState('');
  const [newInclude, setNewInclude] = useState('');
  const [newNotInclude, setNewNotInclude] = useState('');
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  // Dialog states for Delete & Reset
  const [deletingExcursion, setDeletingExcursion] = useState<Excursion | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Filtered Excursions
  const filteredExcursions = excursions.filter(exc => {
    const matchesCategory = categoryFilter === 'Todas' || exc.category === categoryFilter;
    const matchesSearch = exc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (exc.description && exc.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Stats calculation
  const totalServices = excursions.length;
  const withDiscount = excursions.filter(e => (e.discountPercent && e.discountPercent > 0)).length;
  const featuredCount = excursions.filter(e => e.isFeatured).length;
  const avgPrice = totalServices > 0 
    ? Math.round(excursions.reduce((acc, curr) => acc + curr.priceNum, 0) / totalServices) 
    : 0;

  // --- Handlers for Quick Promo Modal ---
  const handleOpenQuickPromo = (exc: Excursion) => {
    setQuickPromoExcursion(exc);
    setFormPrice(exc.priceNum);
    setFormDiscount(exc.discountPercent || 0);
    setFormBadge(exc.promoBadge || '');
    setFormCustomNote(exc.customNote || '');
  };

  const handleSaveQuickPromo = () => {
    if (!quickPromoExcursion) return;
    onUpdateExcursionPromo(quickPromoExcursion.id, {
      priceNum: formPrice,
      discountPercent: formDiscount,
      promoBadge: formBadge || undefined,
      customNote: formCustomNote || undefined
    });
    setQuickPromoExcursion(null);
  };

  // --- Handlers for Comprehensive Full Editor ---
  const handleOpenCreateModal = () => {
    const newId = `exc-${Date.now()}`;
    setIsNewExcursion(true);
    setEditorTab('general');
    setFormId(newId);
    setFormTitle('');
    setFormCategory('Tradicional');
    setFormSeason('Todo el Año');
    setFormDuration('Medio Día (4h)');
    setFormDifficulty('Fácil');
    setFormImage('/images/excursiones/circuito-chico.webp');
    setFormDescription('');
    setFormFullDetails('');
    setFormHighlights(['Panorámica del lago', 'Guía bilingüe especializado']);
    setFormIncludes(['Traslado ida y vuelta desde hotel céntrico', 'Guía profesional']);
    setFormNotIncludes(['Entradas a parques nacionales o medios de elevación', 'Comidas']);
    setFormAdditionalInfo('Llevar calzado cómodo, abrigo liviano e identificación.');
    setFormFaq([
      { question: '¿Se suspende por mal clima?', answer: 'Solo en caso de alertas meteorológicas extremas notificadas por Parques Nacionales.' }
    ]);
    setFormRecommendedFor('Todo público, familias y parejas');
    setFormDepartureTime('09:30 hs');
    setFormPriceNum(45);
    setFormDiscountPercent(0);
    setFormPromoBadge('');
    setFormIsFeatured(false);
    setFormCustomNote('');
    setIsFullEditorOpen(true);
  };

  const handleOpenEditModal = (exc: Excursion) => {
    setIsNewExcursion(false);
    setEditorTab('general');
    setFormId(exc.id);
    setFormTitle(exc.title);
    setFormCategory(exc.category);
    setFormSeason(exc.season);
    setFormDuration(exc.duration);
    setFormDifficulty(exc.difficulty);
    setFormImage(exc.image);
    setFormDescription(exc.description || '');
    setFormFullDetails(exc.fullDetails || '');
    setFormHighlights(exc.highlights ? [...exc.highlights] : []);
    setFormIncludes(exc.includes ? [...exc.includes] : []);
    setFormNotIncludes(exc.notIncludes ? [...exc.notIncludes] : []);
    setFormAdditionalInfo(exc.additionalInfo || '');
    setFormFaq(exc.faq ? exc.faq.map(f => ({ ...f })) : []);
    setFormRecommendedFor(exc.recommendedFor || 'Todo público');
    setFormDepartureTime(exc.departureTime || '09:00 hs');
    setFormPriceNum(exc.priceNum);
    setFormDiscountPercent(exc.discountPercent || 0);
    setFormPromoBadge(exc.promoBadge || '');
    setFormIsFeatured(exc.isFeatured || false);
    setFormCustomNote(exc.customNote || '');
    setIsFullEditorOpen(true);
  };

  const handleDuplicate = (exc: Excursion) => {
    const clonedId = `${exc.id}-copia-${Math.floor(Math.random() * 1000)}`;
    const clonedExcursion: Excursion = {
      ...exc,
      id: clonedId,
      title: `${exc.title} (Copia)`,
      isFeatured: false
    };
    onSaveExcursion(clonedExcursion, true);
  };

  const handleSaveFullExcursion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('El título de la excursión es obligatorio.');
      return;
    }

    const compiledExcursion: Excursion = {
      id: formId || `exc-${Date.now()}`,
      title: formTitle.trim(),
      category: formCategory,
      season: formSeason,
      duration: formDuration.trim() || 'Medio Día (4h)',
      difficulty: formDifficulty,
      image: formImage.trim() || '/images/excursiones/circuito-chico.webp',
      description: formDescription.trim(),
      fullDetails: formFullDetails.trim(),
      highlights: formHighlights.filter(h => h.trim().length > 0),
      includes: formIncludes.filter(i => i.trim().length > 0),
      notIncludes: formNotIncludes.filter(n => n.trim().length > 0),
      additionalInfo: formAdditionalInfo.trim() || undefined,
      faq: formFaq.filter(f => f.question.trim().length > 0),
      recommendedFor: formRecommendedFor.trim() || 'Todo público',
      departureTime: formDepartureTime.trim() || '09:00 hs',
      priceNum: Number(formPriceNum) || 0,
      discountPercent: formDiscountPercent > 0 ? Number(formDiscountPercent) : undefined,
      promoBadge: formPromoBadge.trim() || undefined,
      isFeatured: formIsFeatured,
      customNote: formCustomNote.trim() || undefined
    };

    onSaveExcursion(compiledExcursion, isNewExcursion);
    setIsFullEditorOpen(false);
  };

  // Helper arrays manipulators
  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormHighlights([...formHighlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setFormHighlights(formHighlights.filter((_, i) => i !== index));
  };

  const addInclude = () => {
    if (newInclude.trim()) {
      setFormIncludes([...formIncludes, newInclude.trim()]);
      setNewInclude('');
    }
  };

  const removeInclude = (index: number) => {
    setFormIncludes(formIncludes.filter((_, i) => i !== index));
  };

  const addNotInclude = () => {
    if (newNotInclude.trim()) {
      setFormNotIncludes([...formNotIncludes, newNotInclude.trim()]);
      setNewNotInclude('');
    }
  };

  const removeNotInclude = (index: number) => {
    setFormNotIncludes(formNotIncludes.filter((_, i) => i !== index));
  };

  const addFaq = () => {
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      setFormFaq([...formFaq, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }]);
      setNewFaqQuestion('');
      setNewFaqAnswer('');
    }
  };

  const removeFaq = (index: number) => {
    setFormFaq(formFaq.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header Info & Metrics Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#00A896]/20 text-[#00E5CC] border border-[#00A896]/30 rounded-full text-xs font-bold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" /> Gestor Global de Catálogo & Tarifas
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[11px] font-semibold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Sincronización en Vivo en Sitio Público
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            Administración de Excursiones & Precios
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Modifica itinerarios, imágenes, puntos destacados y tarifas. Cualquier cambio o nueva excursión se refleja de inmediato en la <strong>Landing Page pública (sin necesidad de login)</strong>, la calculadora de cotizaciones y las vistas de viajeros.
          </p>
        </div>

        {/* Action Buttons & Quick Stats */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-3 w-full md:w-auto relative z-10">
          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-3 bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#028090] hover:to-[#00A896] text-white font-bold text-xs md:text-sm rounded-2xl shadow-lg shadow-[#00A896]/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Nueva Excursión
          </button>
          
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs rounded-2xl border border-slate-700/80 flex items-center justify-center gap-2 transition-all"
            title="Restaurar datos de fábrica originales"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            Restaurar Catálogo
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Activas</div>
            <div className="text-xl font-black text-slate-900">{totalServices}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">En Promoción</div>
            <div className="text-xl font-black text-slate-900">{withDiscount}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Destacadas</div>
            <div className="text-xl font-black text-slate-900">{featuredCount}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Tarifa Promedio</div>
            <div className="text-xl font-black text-slate-900">${avgPrice} USD</div>
          </div>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título, categoría o resumen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {['Todas', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Excursions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExcursions.map((exc) => {
          const discount = exc.discountPercent || 0;
          const discountedPrice = discount > 0 ? Math.round(exc.priceNum * (1 - discount / 100)) : exc.priceNum;

          return (
            <motion.div
              key={exc.id}
              whileHover={{ y: -3 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg uppercase tracking-wider">
                      {exc.category}
                    </span>
                    {exc.isFeatured && (
                      <span className="px-2 py-0.5 bg-amber-500/15 text-amber-700 text-[10px] font-bold rounded-md flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Top
                      </span>
                    )}
                  </div>
                  {exc.promoBadge && (
                    <span className="px-2.5 py-1 bg-rose-100 text-rose-800 text-[11px] font-extrabold rounded-lg flex items-center gap-1 shadow-xs">
                      <Tag className="w-3 h-3" />
                      {exc.promoBadge}
                    </span>
                  )}
                </div>

                {/* Image & Main Info */}
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
                    <img 
                      src={exc.image} 
                      alt={exc.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/excursiones/circuito-chico.webp';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-[#00A896] transition-colors">
                      {exc.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exc.duration}</span>
                      <span>•</span>
                      <span>{exc.season}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 italic">
                      {exc.description || 'Sin resumen cargado.'}
                    </p>
                  </div>
                </div>

                {/* Sub details chips */}
                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] text-slate-500">
                  <span className="px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100 font-mono">
                    Dificultad: {exc.difficulty}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100 font-mono">
                    Salida: {exc.departureTime}
                  </span>
                </div>
              </div>

              {/* Price & Actions Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Tarifa Pública</div>
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

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicate(exc)}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                      title="Duplicar excursión"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingExcursion(exc)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Eliminar excursión"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenQuickPromo(exc)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    Tarifa Rápida
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(exc)}
                    className="px-3 py-2 bg-slate-900 hover:bg-[#00A896] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Editar Ficha
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredExcursions.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No se encontraron excursiones</h3>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            No hay excursiones que coincidan con la búsqueda "{searchQuery}" o la categoría "{categoryFilter}".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setCategoryFilter('Todas'); }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: FULL EXCURSION EDITOR (CREATE / EDIT) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isFullEditorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#00A896]/20 text-[#00E5CC] text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {isNewExcursion ? 'Nueva Excursión' : 'Modo Edición'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">ID: {formId}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {isNewExcursion ? 'Crear Nueva Excursión' : `Editar: ${formTitle || 'Sin título'}`}
                  </h3>
                </div>
                <button
                  onClick={() => setIsFullEditorOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 sm:px-6 overflow-x-auto shrink-0 scrollbar-none gap-2">
                {[
                  { id: 'general', label: '1. General & Logística', icon: Compass },
                  { id: 'texts', label: '2. Textos & Ficha', icon: FileText },
                  { id: 'services', label: '3. Highlights & Servicios', icon: List },
                  { id: 'faq', label: '4. Preguntas Frecuentes', icon: HelpCircle },
                  { id: 'rates', label: '5. Tarifas & Descuento', icon: DollarSign }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setEditorTab(tab.id as any)}
                      className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                        editorTab === tab.id
                          ? 'border-[#00A896] text-[#00A896] bg-white'
                          : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Modal Body / Scroll Area */}
              <form id="excursion-form" onSubmit={handleSaveFullExcursion} className="p-6 overflow-y-auto flex-1 space-y-6">
                
                {/* TAB 1: GENERAL & LOGISTICS */}
                {editorTab === 'general' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Título de la Excursión *</label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Ej: Caminata al Glaciar Castaño Overa"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00A896] font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as any)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896] font-medium"
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Temporada</label>
                        <select
                          value={formSeason}
                          onChange={(e) => setFormSeason(e.target.value as any)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896] font-medium"
                        >
                          {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Duración</label>
                        <input
                          type="text"
                          value={formDuration}
                          onChange={(e) => setFormDuration(e.target.value)}
                          placeholder="Día Completo (8h)"
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Dificultad</label>
                        <select
                          value={formDifficulty}
                          onChange={(e) => setFormDifficulty(e.target.value as any)}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                        >
                          {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Horario de Salida</label>
                        <input
                          type="text"
                          value={formDepartureTime}
                          onChange={(e) => setFormDepartureTime(e.target.value)}
                          placeholder="09:00 hs"
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Público Recomendado</label>
                      <input
                        type="text"
                        value={formRecommendedFor}
                        onChange={(e) => setFormRecommendedFor(e.target.value)}
                        placeholder="Parejas, Familias con niños y Grupos"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                      />
                    </div>

                    {/* Image Selector & Preview */}
                    <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-800">Fotografía Principal de la Excursión</label>
                        <span className="text-[11px] text-slate-400">Ruta webp o URL remota</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                          <img 
                            src={formImage} 
                            alt="Previsualización" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/excursiones/circuito-chico.webp';
                            }}
                          />
                        </div>
                        <div className="flex-1 space-y-2 w-full">
                          <input
                            type="text"
                            value={formImage}
                            onChange={(e) => setFormImage(e.target.value)}
                            placeholder="/images/excursiones/... o https://..."
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                          />
                          <div>
                            <span className="text-[11px] text-slate-500 font-semibold block mb-1">O selecciona una imagen del catálogo Bariloche:</span>
                            <select
                              onChange={(e) => setFormImage(e.target.value)}
                              value={formImage}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                            >
                              <option value="">-- Galería Local Disponible --</option>
                              {PRESET_IMAGES.map(img => (
                                <option key={img.path} value={img.path}>{img.label} ({img.path})</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: TEXTS & NARRATIVE */}
                {editorTab === 'texts' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Resumen Breve (Aparece en la tarjeta del catálogo)
                      </label>
                      <input
                        type="text"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Ej: Navegación exclusiva por aguas cristalinas con vistas al bosque nativo."
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Itinerario & Descripción Detallada (Modal de Ficha Técnica)
                      </label>
                      <textarea
                        rows={7}
                        value={formFullDetails}
                        onChange={(e) => setFormFullDetails(e.target.value)}
                        placeholder="Escribe el desarrollo completo del recorrido, paradas, actividades y experiencia paso a paso..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-[#00A896]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Información Adicional & Recomendaciones
                      </label>
                      <textarea
                        rows={3}
                        value={formAdditionalInfo}
                        onChange={(e) => setFormAdditionalInfo(e.target.value)}
                        placeholder="Requisitos de edad, vestimenta sugerida, estado físico o avisos importantes."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-[#00A896]"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: HIGHLIGHTS, INCLUDES & EXCLUDES */}
                {editorTab === 'services' && (
                  <div className="space-y-6">
                    {/* Highlights */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-[#00A896] uppercase tracking-wider">
                        Puntos Destacados del Recorrido (Highlights)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newHighlight}
                          onChange={(e) => setNewHighlight(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addHighlight(); }}}
                          placeholder="Ej: Vista panorámica del Lago Nahuel Huapi"
                          className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                        />
                        <button
                          type="button"
                          onClick={addHighlight}
                          className="px-4 py-2 bg-[#00A896] text-white text-xs font-bold rounded-xl hover:bg-[#028090]"
                        >
                          + Agregar
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {formHighlights.map((hl, i) => (
                          <span key={i} className="px-3 py-1 bg-cyan-50 text-cyan-900 border border-cyan-200 rounded-lg text-xs flex items-center gap-1.5 font-medium">
                            <CheckCircle className="w-3 h-3 text-[#00A896]" />
                            {hl}
                            <button type="button" onClick={() => removeHighlight(i)} className="text-cyan-400 hover:text-rose-600 ml-1">✕</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        Servicios Incluidos
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newInclude}
                          onChange={(e) => setNewInclude(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInclude(); }}}
                          placeholder="Ej: Traslado ida y vuelta, Guía bilingüe, Almuerzo"
                          className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                        />
                        <button
                          type="button"
                          onClick={addInclude}
                          className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700"
                        >
                          + Agregar
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {formIncludes.map((inc, i) => (
                          <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs flex items-center gap-1.5 font-medium">
                            {inc}
                            <button type="button" onClick={() => removeInclude(i)} className="text-emerald-400 hover:text-rose-600 ml-1">✕</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Not Includes */}
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      <label className="block text-xs font-bold text-rose-700 uppercase tracking-wider">
                        No Incluido
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newNotInclude}
                          onChange={(e) => setNewNotInclude(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNotInclude(); }}}
                          placeholder="Ej: Entrada a Parque Nacional, Propinas, Gastos personales"
                          className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                        />
                        <button
                          type="button"
                          onClick={addNotInclude}
                          className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700"
                        >
                          + Agregar
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {formNotIncludes.map((notInc, i) => (
                          <span key={i} className="px-3 py-1 bg-rose-50 text-rose-900 border border-rose-200 rounded-lg text-xs flex items-center gap-1.5 font-medium">
                            {notInc}
                            <button type="button" onClick={() => removeNotInclude(i)} className="text-rose-400 hover:text-rose-700 ml-1">✕</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: FREQUENTLY ASKED QUESTIONS */}
                {editorTab === 'faq' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Añadir Pregunta Frecuente
                      </h4>
                      <input
                        type="text"
                        value={newFaqQuestion}
                        onChange={(e) => setNewFaqQuestion(e.target.value)}
                        placeholder="Pregunta (ej: ¿Qué vestimenta se debe llevar?)"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                      />
                      <textarea
                        rows={2}
                        value={newFaqAnswer}
                        onChange={(e) => setNewFaqAnswer(e.target.value)}
                        placeholder="Respuesta explicativa para el viajero..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                      />
                      <button
                        type="button"
                        onClick={addFaq}
                        className="px-4 py-2 bg-slate-900 hover:bg-[#00A896] text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        + Incorporar Pregunta
                      </button>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold text-slate-600">Preguntas asociadas ({formFaq.length})</div>
                      {formFaq.map((f, i) => (
                        <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl relative space-y-1 shadow-xs">
                          <button
                            type="button"
                            onClick={() => removeFaq(i)}
                            className="absolute top-3 right-3 text-slate-300 hover:text-rose-600"
                            title="Eliminar pregunta"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="font-bold text-xs text-slate-900 pr-6">P: {f.question}</div>
                          <div className="text-xs text-slate-600 leading-relaxed">R: {f.answer}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: RATES & PROMOTIONS */}
                {editorTab === 'rates' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Precio Base en Dólares (USD) *
                        </label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                          <input
                            type="number"
                            required
                            min={1}
                            max={5000}
                            value={formPriceNum}
                            onChange={(e) => setFormPriceNum(parseFloat(e.target.value) || 0)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-black text-slate-900 focus:outline-none focus:border-[#00A896]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Descuento Promocional (%)
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={0}
                            max={60}
                            step={5}
                            value={formDiscountPercent}
                            onChange={(e) => setFormDiscountPercent(parseInt(e.target.value) || 0)}
                            className="w-full accent-[#00A896]"
                          />
                          <span className="text-lg font-black text-rose-600 min-w-[3rem] text-right">
                            {formDiscountPercent}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Real-time calculated price preview banner */}
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                          Tarifa Final que verá el Cliente
                        </span>
                        <span className="text-xs text-emerald-600">
                          {formDiscountPercent > 0 ? `Aplica ${formDiscountPercent}% de descuento sobre el precio base` : 'Sin descuento activo'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-700">
                          ${formDiscountPercent > 0 ? Math.round(formPriceNum * (1 - formDiscountPercent / 100)) : formPriceNum} USD
                        </div>
                        {formDiscountPercent > 0 && (
                          <div className="text-xs text-slate-400 line-through">${formPriceNum} USD</div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Etiqueta Promocional (Badge)
                        </label>
                        <input
                          type="text"
                          value={formPromoBadge}
                          onChange={(e) => setFormPromoBadge(e.target.value)}
                          placeholder="Ej: 2x1 Invierno, 15% OFF, Cupos Limitados"
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nota Comercial Interna
                        </label>
                        <input
                          type="text"
                          value={formCustomNote}
                          onChange={(e) => setFormCustomNote(e.target.value)}
                          placeholder="Ej: Disponible solo con reserva 48hs antes"
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                        />
                      </div>
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <input
                        type="checkbox"
                        id="isFeaturedToggle"
                        checked={formIsFeatured}
                        onChange={(e) => setFormIsFeatured(e.target.checked)}
                        className="w-5 h-5 accent-[#00A896] rounded"
                      />
                      <label htmlFor="isFeaturedToggle" className="text-xs font-semibold text-slate-800 cursor-pointer">
                        Destacar Excursión en la Portada / Landing Page (Aparece con insignia y prioridad)
                      </label>
                    </div>
                  </div>
                )}
              </form>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => setIsFullEditorOpen(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancelar
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    form="excursion-form"
                    className="px-6 py-2.5 bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <Save className="w-4 h-4" />
                    Guardar y Publicar en el Sitio
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: QUICK RATE / PROMO EDITOR */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {quickPromoExcursion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#00A896]" />
                  Ajuste Rápido de Tarifa & Promoción
                </h3>
                <button onClick={() => setQuickPromoExcursion(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div>
                <div className="font-bold text-slate-900">{quickPromoExcursion.title}</div>
                <div className="text-xs text-slate-500">{quickPromoExcursion.category} • ID: {quickPromoExcursion.id}</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Precio Base en USD</label>
                  <input
                    type="number"
                    min={1}
                    max={3000}
                    value={formPrice}
                    onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00A896] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Porcentaje de Descuento (%)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={60}
                      step={5}
                      value={formDiscount}
                      onChange={(e) => setFormDiscount(parseInt(e.target.value) || 0)}
                      className="w-full accent-[#00A896]"
                    />
                    <span className="text-lg font-black text-rose-600 min-w-[3rem] text-right">
                      {formDiscount}%
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Etiqueta Promocional</label>
                  <input
                    type="text"
                    placeholder="Ej: 2x1 Invierno, 15% OFF..."
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setQuickPromoExcursion(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveQuickPromo}
                  className="px-5 py-2 bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Actualizar Tarifa
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 3: DELETE CONFIRMATION */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {deletingExcursion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-100 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="font-bold text-slate-900 text-base">¿Eliminar Excursión?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Estás por dar de baja <strong className="text-slate-800">"{deletingExcursion.title}"</strong>. Dejará de aparecer en la Landing Page pública y en los motores de reserva.
              </p>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setDeletingExcursion(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onDeleteExcursion(deletingExcursion.id);
                    setDeletingExcursion(null);
                  }}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Sí, Eliminar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 4: RESET CATALOG CONFIRMATION */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isResetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-100 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <RotateCcw className="w-6 h-6" />
              </div>

              <h3 className="font-bold text-slate-900 text-base">Restaurar Catálogo Original</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Esta acción restablecerá todas las excursiones a sus valores iniciales de fábrica, descartando cambios y excursiones personalizadas.
              </p>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onResetCatalog();
                    setIsResetConfirmOpen(false);
                  }}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Confirmar Restauración
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
