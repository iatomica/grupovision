import React, { useState, useMemo } from 'react';
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
  Sparkles,
  Image as ImageIcon,
  UploadCloud,
  Download,
  Eye,
  EyeOff,
  CalendarDays,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Excursion, ExcursionShift, ExcursionTranslations } from '../data/excursionsData';
import { SuggestionBannerItem } from '../data/siteContentData';
import { MediaLibraryModal } from './MediaLibraryModal';
import { groupBlockedDates, BlockedDateGroup } from '../utils/calendarCapacity';

interface AdminPromosExcursionsProps {
  excursions: Excursion[];
  promoSuggestions?: SuggestionBannerItem[];
  onUpdatePromoSuggestions?: (items: SuggestionBannerItem[]) => void;
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
  'Alquileres',
  'Fuera de Temporada'
];

const SEASONS: Excursion['season'][] = ['Todo el Año', 'Invierno', 'Verano'];
const DIFFICULTIES: Excursion['difficulty'][] = ['Fácil', 'Moderado', 'Desafiante'];

const DAYS_OF_WEEK = [
  { day: 1, label: 'Lunes', short: 'Lun' },
  { day: 2, label: 'Martes', short: 'Mar' },
  { day: 3, label: 'Miércoles', short: 'Mié' },
  { day: 4, label: 'Jueves', short: 'Jue' },
  { day: 5, label: 'Viernes', short: 'Vie' },
  { day: 6, label: 'Sábado', short: 'Sáb' },
  { day: 0, label: 'Domingo', short: 'Dom' },
];

export const AdminPromosExcursions: React.FC<AdminPromosExcursionsProps> = ({
  excursions,
  promoSuggestions = [],
  onUpdatePromoSuggestions,
  onUpdateExcursionPromo,
  onSaveExcursion,
  onDeleteExcursion,
  onResetCatalog
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  
  // Home Promo helper functions
  const isExcursionInHomePromos = (exc: Excursion) => {
    return promoSuggestions.some(p => 
      p.excursionId === exc.id || 
      p.title.toLowerCase().trim() === exc.title.toLowerCase().trim()
    );
  };

  const handleToggleHomePromo = (exc: Excursion) => {
    if (!onUpdatePromoSuggestions) return;
    const exists = isExcursionInHomePromos(exc);
    if (exists) {
      const filtered = promoSuggestions.filter(p => 
        p.excursionId !== exc.id && 
        p.title.toLowerCase().trim() !== exc.title.toLowerCase().trim()
      );
      onUpdatePromoSuggestions(filtered);
    } else {
      const orig = exc.priceNum ? exc.priceNum * 1200 : 75000;
      const disc = exc.discountPercent || 15;
      const finalPrice = Math.round(orig * (1 - disc / 100));
      const newItem: SuggestionBannerItem = {
        id: `sug-${Date.now()}`,
        title: exc.title,
        tagline: exc.description ? exc.description.slice(0, 110) + '...' : '',
        badge: exc.promoBadge || `${disc}% OFF · PROMO`,
        discountPercent: disc,
        originalPrice: orig,
        finalPrice,
        duration: exc.duration || 'Día Completo',
        image: exc.image,
        excursionId: exc.id,
        whatsappMessage: `Hola Grupo Visión! Deseo aprovechar la promoción de "${exc.title}" (${disc}% OFF) | Tarifa Especial: $${finalPrice.toLocaleString('es-AR')} ARS | ¿Tienen disponibilidad confirmada?`
      };
      onUpdatePromoSuggestions([...promoSuggestions, newItem]);
    }
  };

  // Quick Promo Modal state
  const [quickPromoExcursion, setQuickPromoExcursion] = useState<Excursion | null>(null);
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formDiscount, setFormDiscount] = useState<number>(0);
  const [formBadge, setFormBadge] = useState<string>('');
  const [formCustomNote, setFormCustomNote] = useState<string>('');
  const [formIncludeInHomePromo, setFormIncludeInHomePromo] = useState<boolean>(false);

  // Comprehensive Edit / Create Modal state
  const [isFullEditorOpen, setIsFullEditorOpen] = useState(false);
  const [isNewExcursion, setIsNewExcursion] = useState(false);
  const [editorTab, setEditorTab] = useState<'general' | 'texts' | 'shifts' | 'services' | 'faq' | 'rates'>('general');
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  
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
  const [formPriceNum, setFormPriceNum] = useState<number>(50000);
  const [formPriceEnglish, setFormPriceEnglish] = useState<number>(65000);
  const [formPriceChild, setFormPriceChild] = useState<number | ''>('');
  const [formChildAgePolicy, setFormChildAgePolicy] = useState<string>('');
  const [formHasEnglishGuide, setFormHasEnglishGuide] = useState<boolean>(true);
  const [formDiscountPercent, setFormDiscountPercent] = useState<number>(0);
  const [formPromoBadge, setFormPromoBadge] = useState('');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsPublished, setFormIsPublished] = useState<boolean>(true);
  const [formGallery, setFormGallery] = useState<string[]>([]);
  const [formOperatingDays, setFormOperatingDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [formBlockedDates, setFormBlockedDates] = useState<string[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState<string>('');
  const [blockedDateMode, setBlockedDateMode] = useState<'single' | 'range'>('range');
  const [newBlockedStartDate, setNewBlockedStartDate] = useState<string>('');
  const [newBlockedEndDate, setNewBlockedEndDate] = useState<string>('');
  const [rangeFeedbackMessage, setRangeFeedbackMessage] = useState<string | null>(null);
  const [editingRangeGroup, setEditingRangeGroup] = useState<BlockedDateGroup | null>(null);
  const [expandedGroupIds, setExpandedGroupIds] = useState<Record<string, boolean>>({});
  const [formMinBookingAdvanceHours, setFormMinBookingAdvanceHours] = useState<number>(24);
  const [newGalleryUrl, setNewGalleryUrl] = useState<string>('');
  const [mediaModalMode, setMediaModalMode] = useState<'cover' | 'gallery'>('cover');
  const [formShifts, setFormShifts] = useState<ExcursionShift[]>([]);

  // Shift form temp states (New shift)
  const [newShiftName, setNewShiftName] = useState('Turno Mañana');
  const [newShiftTime, setNewShiftTime] = useState('09:00 hs');
  const [newShiftCapacity, setNewShiftCapacity] = useState<number>(16);
  const [newShiftAvailable, setNewShiftAvailable] = useState<number>(6);

  // Shift editing states (Existing shift)
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);
  const [editShiftName, setEditShiftName] = useState('');
  const [editShiftTime, setEditShiftTime] = useState('');
  const [editShiftCapacity, setEditShiftCapacity] = useState<number>(16);
  const [editShiftAvailable, setEditShiftAvailable] = useState<number>(6);

  // Status Filter for Catalog view
  const [statusFilter, setStatusFilter] = useState<'Todas' | 'Publicadas' | 'Pausadas' | 'Fuera de Temporada'>('Todas');

  // Translations temp states for Text Tab
  const [textsLang, setTextsLang] = useState<'es' | 'en' | 'pt'>('es');
  const [transTitleEn, setTransTitleEn] = useState('');
  const [transDescEn, setTransDescEn] = useState('');
  const [transDetailsEn, setTransDetailsEn] = useState('');
  const [transTitlePt, setTransTitlePt] = useState('');
  const [transDescPt, setTransDescPt] = useState('');
  const [transDetailsPt, setTransDetailsPt] = useState('');

  // Temporary inputs for adding list items
  const [newHighlight, setNewHighlight] = useState('');
  const [newInclude, setNewInclude] = useState('');
  const [newNotInclude, setNewNotInclude] = useState('');
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  // Dialog states for Delete
  const [deletingExcursion, setDeletingExcursion] = useState<Excursion | null>(null);

  // Filtered Excursions
  const filteredExcursions = excursions.filter(exc => {
    const matchesCategory = categoryFilter === 'Todas' || exc.category === categoryFilter;
    const matchesStatus = 
      statusFilter === 'Todas' ||
      (statusFilter === 'Publicadas' && exc.isPublished !== false && exc.category !== 'Fuera de Temporada') ||
      (statusFilter === 'Pausadas' && exc.isPublished === false) ||
      (statusFilter === 'Fuera de Temporada' && exc.category === 'Fuera de Temporada');
    const matchesSearch = exc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (exc.description && exc.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Stats calculation
  const totalServices = excursions.length;
  const publishedCount = excursions.filter(e => e.isPublished !== false && e.category !== 'Fuera de Temporada').length;
  const pausedCount = excursions.filter(e => e.isPublished === false).length;
  const offSeasonCount = excursions.filter(e => e.category === 'Fuera de Temporada').length;
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
    setFormIncludeInHomePromo(isExcursionInHomePromos(exc));
  };

  const handleSaveQuickPromo = () => {
    if (!quickPromoExcursion) return;
    onUpdateExcursionPromo(quickPromoExcursion.id, {
      priceNum: formPrice,
      discountPercent: formDiscount,
      promoBadge: formBadge || undefined,
      customNote: formCustomNote || undefined
    });

    // Sync with Home Promo Carousel if changed
    const currentlyInHome = isExcursionInHomePromos(quickPromoExcursion);
    if (formIncludeInHomePromo !== currentlyInHome) {
      handleToggleHomePromo(quickPromoExcursion);
    }

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
    setFormPriceNum(45000);
    setFormPriceEnglish(55000);
    setFormPriceChild('');
    setFormChildAgePolicy('4 a 11 años');
    setFormHasEnglishGuide(true);
    setEditingShiftId(null);
    setFormDiscountPercent(0);
    setFormPromoBadge('');
    setFormIsFeatured(false);
    setFormIsPublished(true);
    setFormGallery([]);
    setFormOperatingDays([0, 1, 2, 3, 4, 5, 6]);
    setFormBlockedDates([]);
    setNewBlockedDate('');
    setNewBlockedStartDate('');
    setNewBlockedEndDate('');
    setRangeFeedbackMessage(null);
    setFormMinBookingAdvanceHours(24);
    setNewGalleryUrl('');
    setFormCustomNote('');
    setFormShifts([
      { id: `shift-1`, name: 'Turno Mañana', time: '09:00 hs', totalCapacity: 16, availableSpots: 6, enabled: true },
      { id: `shift-2`, name: 'Turno Tarde', time: '14:30 hs', totalCapacity: 16, availableSpots: 12, enabled: true }
    ]);
    setTextsLang('es');
    setTransTitleEn('');
    setTransDescEn('');
    setTransDetailsEn('');
    setTransTitlePt('');
    setTransDescPt('');
    setTransDetailsPt('');
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
    setFormPriceNum(exc.priceNum ?? 0);
    const hasEn = exc.hasEnglishGuide !== false && (typeof exc.priceEnglish === 'number' ? exc.priceEnglish > (exc.priceNum ?? 0) : true);
    setFormHasEnglishGuide(exc.hasEnglishGuide ?? hasEn);
    setFormPriceEnglish(typeof exc.priceEnglish === 'number' ? exc.priceEnglish : (exc.priceNum ?? 0));
    setFormPriceChild(typeof exc.priceChild === 'number' ? exc.priceChild : '');
    setFormChildAgePolicy(exc.childAgePolicy || '');
    setEditingShiftId(null);
    setFormDiscountPercent(exc.discountPercent || 0);
    setFormPromoBadge(exc.promoBadge || '');
    setFormIsFeatured(exc.isFeatured || false);
    setFormIsPublished(exc.isPublished !== false);
    setFormGallery(Array.isArray(exc.gallery) ? [...exc.gallery] : []);
    setFormOperatingDays(
      Array.isArray(exc.operatingDays) && exc.operatingDays.length > 0 
        ? [...exc.operatingDays] 
        : [0, 1, 2, 3, 4, 5, 6]
    );
    setFormBlockedDates(Array.isArray(exc.blockedDates) ? [...exc.blockedDates] : []);
    setNewBlockedDate('');
    setNewBlockedStartDate('');
    setNewBlockedEndDate('');
    setEditingRangeGroup(null);
    setExpandedGroupIds({});
    setRangeFeedbackMessage(null);
    setFormMinBookingAdvanceHours(typeof exc.minBookingAdvanceHours === 'number' ? exc.minBookingAdvanceHours : 24);
    setNewGalleryUrl('');
    setFormCustomNote(exc.customNote || '');
    setFormShifts(
      Array.isArray(exc.shifts) && exc.shifts.length > 0
        ? exc.shifts.map(s => ({ ...s }))
        : [
            { id: `${exc.id}-shift-1`, name: 'Turno Mañana', time: exc.departureTime || '09:00 hs', totalCapacity: 16, availableSpots: 6, enabled: true },
            { id: `${exc.id}-shift-2`, name: 'Turno Tarde', time: '14:30 hs', totalCapacity: 16, availableSpots: 12, enabled: true }
          ]
    );
    setTextsLang('es');
    setTransTitleEn(exc.translations?.en?.title || '');
    setTransDescEn(exc.translations?.en?.description || '');
    setTransDetailsEn(exc.translations?.en?.fullDetails || '');
    setTransTitlePt(exc.translations?.pt?.title || '');
    setTransDescPt(exc.translations?.pt?.description || '');
    setTransDetailsPt(exc.translations?.pt?.fullDetails || '');
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

  const handleAddShift = () => {
    if (!newShiftName.trim() || !newShiftTime.trim()) return;
    const newS: ExcursionShift = {
      id: `shift-${Date.now()}`,
      name: newShiftName.trim(),
      time: newShiftTime.trim(),
      totalCapacity: Math.max(1, Number(newShiftCapacity) || 1),
      availableSpots: Math.max(0, Math.min(Number(newShiftAvailable) || 0, Number(newShiftCapacity) || 1)),
      enabled: true
    };
    setFormShifts(prev => [...prev, newS]);
    setNewShiftName('Turno ' + (formShifts.length + 2));
  };

  const handleRemoveShift = (id: string) => {
    setFormShifts(prev => prev.filter(s => s.id !== id));
    if (editingShiftId === id) setEditingShiftId(null);
  };

  const handleUpdateShift = (id: string, updates: Partial<ExcursionShift>) => {
    setFormShifts(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleStartEditShift = (s: ExcursionShift) => {
    setEditingShiftId(s.id);
    setEditShiftName(s.name);
    setEditShiftTime(s.time);
    setEditShiftCapacity(s.totalCapacity);
    setEditShiftAvailable(s.availableSpots);
  };

  const handleSaveShiftEdit = (id: string) => {
    if (!editShiftName.trim() || !editShiftTime.trim()) return;
    const capacity = Math.max(1, Number(editShiftCapacity) || 1);
    const available = Math.max(0, Math.min(Number(editShiftAvailable) || 0, capacity));
    handleUpdateShift(id, {
      name: editShiftName.trim(),
      time: editShiftTime.trim(),
      totalCapacity: capacity,
      availableSpots: available
    });
    setEditingShiftId(null);
  };

  // Calendar operating days helper
  const handleToggleOperatingDay = (day: number) => {
    setFormOperatingDays(prev => 
      prev.includes(day) 
        ? (prev.length > 1 ? prev.filter(d => d !== day) : prev) 
        : [...prev, day].sort()
    );
  };

  // Blocked dates helpers
  const handleStartEditGroup = (group: BlockedDateGroup) => {
    setEditingRangeGroup(group);
    if (group.isRange) {
      setBlockedDateMode('range');
      setNewBlockedStartDate(group.startDate);
      setNewBlockedEndDate(group.endDate);
    } else {
      setBlockedDateMode('single');
      setNewBlockedDate(group.startDate);
    }
    setRangeFeedbackMessage(`Editando bloqueo: ${group.label}. Modificá las fechas arriba y presioná Guardar.`);
  };

  const handleCancelEditGroup = () => {
    setEditingRangeGroup(null);
    setNewBlockedStartDate('');
    setNewBlockedEndDate('');
    setNewBlockedDate('');
    setRangeFeedbackMessage(null);
  };

  const handleToggleExpandGroup = (groupId: string) => {
    setExpandedGroupIds(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate) return;
    if (editingRangeGroup) {
      const oldDatesSet = new Set(editingRangeGroup.dates);
      const filtered = formBlockedDates.filter(d => !oldDatesSet.has(d));
      const updated = Array.from(new Set([...filtered, newBlockedDate])).sort();
      setFormBlockedDates(updated);
      setEditingRangeGroup(null);
      setNewBlockedDate('');
      setRangeFeedbackMessage(`Se actualizó la fecha bloqueada a ${newBlockedDate}.`);
    } else {
      if (!formBlockedDates.includes(newBlockedDate)) {
        setFormBlockedDates(prev => [...prev, newBlockedDate].sort());
      }
      setNewBlockedDate('');
      setRangeFeedbackMessage(`Se bloqueó la fecha ${newBlockedDate}.`);
    }
    setTimeout(() => setRangeFeedbackMessage(null), 3500);
  };

  const handleAddBlockedRange = () => {
    if (!newBlockedStartDate || !newBlockedEndDate) {
      setRangeFeedbackMessage('Por favor seleccioná tanto la fecha de inicio como la de fin.');
      setTimeout(() => setRangeFeedbackMessage(null), 3500);
      return;
    }

    if (newBlockedStartDate > newBlockedEndDate) {
      setRangeFeedbackMessage('La fecha de inicio debe ser anterior o igual a la de fin.');
      setTimeout(() => setRangeFeedbackMessage(null), 3500);
      return;
    }

    const start = new Date(newBlockedStartDate + 'T12:00:00');
    const end = new Date(newBlockedEndDate + 'T12:00:00');
    const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 250) {
      setRangeFeedbackMessage('El rango seleccionado no puede superar los 250 días corridos (~8 meses).');
      setTimeout(() => setRangeFeedbackMessage(null), 3500);
      return;
    }

    const generatedDates: string[] = [];
    const current = new Date(start);
    while (current <= end) {
      generatedDates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    const formatD = (dStr: string) => {
      const [y, m, d] = dStr.split('-');
      return `${d}/${m}/${y}`;
    };

    if (editingRangeGroup) {
      const oldDatesSet = new Set(editingRangeGroup.dates);
      const filtered = formBlockedDates.filter(d => !oldDatesSet.has(d));
      const updated = Array.from(new Set([...filtered, ...generatedDates])).sort();
      setFormBlockedDates(updated);
      setEditingRangeGroup(null);
      setNewBlockedStartDate('');
      setNewBlockedEndDate('');
      setRangeFeedbackMessage(`Se actualizó el rango exitosamente: del ${formatD(newBlockedStartDate)} al ${formatD(newBlockedEndDate)} (${generatedDates.length} días corridos).`);
    } else {
      const updated = Array.from(new Set([...formBlockedDates, ...generatedDates])).sort();
      setFormBlockedDates(updated);
      setNewBlockedStartDate('');
      setNewBlockedEndDate('');
      setRangeFeedbackMessage(`Se bloqueó exitosamente el rango del ${formatD(newBlockedStartDate)} al ${formatD(newBlockedEndDate)} (${generatedDates.length} días corridos).`);
    }

    setTimeout(() => setRangeFeedbackMessage(null), 4000);
  };

  const handleClearAllBlockedDates = () => {
    if (window.confirm('¿Seguro que deseas desbloquear todas las fechas de esta excursión?')) {
      setFormBlockedDates([]);
      setEditingRangeGroup(null);
      setExpandedGroupIds({});
      setRangeFeedbackMessage('Se desbloquearon todas las fechas.');
      setTimeout(() => setRangeFeedbackMessage(null), 3500);
    }
  };

  const handleRemoveBlockedDate = (dateStr: string) => {
    setFormBlockedDates(prev => prev.filter(d => d !== dateStr));
  };

  const groupedBlockedDates = useMemo(() => {
    return groupBlockedDates(formBlockedDates);
  }, [formBlockedDates]);

  const handleRemoveBlockedGroup = (group: BlockedDateGroup) => {
    const toRemoveSet = new Set(group.dates);
    setFormBlockedDates(prev => prev.filter(d => !toRemoveSet.has(d)));
    if (editingRangeGroup?.id === group.id) {
      handleCancelEditGroup();
    }
    setRangeFeedbackMessage(
      group.isRange 
        ? `Se canceló y desbloqueó el rango (${group.count} fechas liberadas).` 
        : `Se desbloqueó la fecha ${group.startDate}.`
    );
    setTimeout(() => setRangeFeedbackMessage(null), 3000);
  };

  // Gallery helpers
  const handleAddGalleryImage = (url: string) => {
    if (!url || !url.trim()) return;
    const trimmed = url.trim();
    if (!formGallery.includes(trimmed)) {
      setFormGallery(prev => [...prev, trimmed]);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormGallery(prev => prev.filter((_, i) => i !== index));
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
      priceNum: typeof formPriceNum === 'number' ? formPriceNum : (parseFloat(String(formPriceNum)) || 0),
      hasEnglishGuide: formHasEnglishGuide,
      priceEnglish: formHasEnglishGuide 
        ? (typeof formPriceEnglish === 'number' ? formPriceEnglish : (parseFloat(String(formPriceEnglish)) || (typeof formPriceNum === 'number' ? formPriceNum : 0)))
        : (typeof formPriceNum === 'number' ? formPriceNum : (parseFloat(String(formPriceNum)) || 0)),
      priceChild: formPriceChild !== '' && !isNaN(Number(formPriceChild)) ? Math.max(0, Number(formPriceChild)) : undefined,
      childAgePolicy: formChildAgePolicy.trim() || undefined,
      shifts: formShifts,
      translations: {
        en: (transTitleEn.trim() || transDescEn.trim() || transDetailsEn.trim()) ? {
          title: transTitleEn.trim() || undefined,
          description: transDescEn.trim() || undefined,
          fullDetails: transDetailsEn.trim() || undefined
        } : undefined,
        pt: (transTitlePt.trim() || transDescPt.trim() || transDetailsPt.trim()) ? {
          title: transTitlePt.trim() || undefined,
          description: transDescPt.trim() || undefined,
          fullDetails: transDetailsPt.trim() || undefined
        } : undefined
      },
      discountPercent: formDiscountPercent > 0 ? Number(formDiscountPercent) : undefined,
      promoBadge: formPromoBadge.trim() || undefined,
      isFeatured: formIsFeatured,
      isPublished: formIsPublished,
      gallery: formGallery.filter(url => Boolean(url && url.trim())),
      operatingDays: formOperatingDays,
      blockedDates: formBlockedDates,
      minBookingAdvanceHours: Number(formMinBookingAdvanceHours) || 24,
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
          
          <a
            href="/api/admin/backup"
            download
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs rounded-2xl border border-slate-700/80 flex items-center justify-center gap-2 transition-all"
            title="Descargar copia de seguridad en JSON de todas las excursiones, precios y textos"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            Descargar Backup
          </a>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Catálogo</div>
            <div className="text-xl font-black text-slate-900">{totalServices}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Publicadas (Web)</div>
            <div className="text-xl font-black text-emerald-600">{publishedCount}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <EyeOff className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Pausadas / Ocultas</div>
            <div className="text-xl font-black text-amber-600">{pausedCount}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">En Promoción</div>
            <div className="text-xl font-black text-slate-900">{withDiscount}</div>
          </div>
        </div>
      </div>

      {/* Controls, Status & Category Filters */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
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

          {/* Quick Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold self-start md:self-auto overflow-x-auto">
            {(['Todas', 'Publicadas', 'Pausadas', 'Fuera de Temporada'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'Publicadas' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                {st === 'Pausadas' && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                {st === 'Fuera de Temporada' && <span className="w-2 h-2 rounded-full bg-cyan-500" />}
                <span>{st}</span>
                <span className="text-[10px] opacity-60 font-mono">
                  ({st === 'Todas' ? totalServices : st === 'Publicadas' ? publishedCount : st === 'Pausadas' ? pausedCount : offSeasonCount})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none border-t border-slate-100 pt-3">
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
          const isExcPublished = exc.isPublished !== false;

          return (
            <motion.div
              key={exc.id}
              whileHover={{ y: -3 }}
              className={`bg-white border rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group ${
                isExcPublished ? 'border-slate-200/80' : 'border-amber-200/80 bg-amber-50/20'
              }`}
            >
              <div className="space-y-3">
                {/* Header tags & 1-Click Publish Toggle */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg uppercase tracking-wider">
                      {exc.category}
                    </span>
                    {exc.isFeatured && (
                      <span className="px-2 py-0.5 bg-amber-500/15 text-amber-700 text-[10px] font-bold rounded-md flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Top
                      </span>
                    )}
                    {exc.promoBadge && (
                      <span className="px-2.5 py-1 bg-rose-100 text-rose-800 text-[11px] font-extrabold rounded-lg flex items-center gap-1 shadow-xs">
                        <Tag className="w-3 h-3" />
                        {exc.promoBadge}
                      </span>
                    )}
                    {exc.gallery && exc.gallery.length > 0 && (
                      <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-md text-[10px] font-bold">
                        📷 {exc.gallery.length} fotos
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Home Promo Carousel Toggle Button */}
                    {onUpdatePromoSuggestions && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleHomePromo(exc);
                        }}
                        className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition-all shrink-0 cursor-pointer ${
                          isExcursionInHomePromos(exc)
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 shadow-2xs'
                            : 'bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200'
                        }`}
                        title={isExcursionInHomePromos(exc) ? 'Excursión activa en el Carrusel de Promociones del Home. Clic para quitar.' : 'Clic para destacar esta excursión en el Carrusel de Promociones del Home'}
                      >
                        <Sparkles size={11} className={isExcursionInHomePromos(exc) ? 'text-amber-600' : 'text-slate-400'} />
                        <span>{isExcursionInHomePromos(exc) ? '⭐ En Home' : '+ Promo Home'}</span>
                      </button>
                    )}

                    {/* 1-Click Toggle ON/OFF Publicar Excursión */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateExcursionPromo(exc.id, { isPublished: !isExcPublished });
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 transition-all shadow-2xs shrink-0 cursor-pointer ${
                        isExcPublished
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                      }`}
                      title={isExcPublished ? 'Clic para pausar/ocultar de la web' : 'Clic para activar y publicar en la web'}
                    >
                      {isExcPublished ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <Eye className="w-3 h-3 text-emerald-600" />
                          <span>Publicada</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <EyeOff className="w-3 h-3 text-amber-700" />
                          <span>Pausada</span>
                        </>
                      )}
                    </button>
                  </div>
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

                {/* Blocked dates info on card */}
                {Array.isArray(exc.blockedDates) && exc.blockedDates.length > 0 && (() => {
                  const groups = groupBlockedDates(exc.blockedDates);
                  return (
                    <div className="p-2.5 rounded-2xl bg-rose-50/90 border border-rose-200/90 text-rose-900 text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                        <span className="flex items-center gap-1.5 text-rose-800">
                          <span>⛔</span>
                          <span>Bloqueos: {groups.length} {groups.length === 1 ? 'rango' : 'rangos'} ({exc.blockedDates.length} d)</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(exc);
                            setEditorTab('shifts');
                          }}
                          className="text-[#00A896] hover:text-[#028090] hover:underline font-bold text-[10px] flex items-center gap-0.5 cursor-pointer bg-white px-2 py-0.5 rounded-md border border-rose-200 shadow-2xs"
                          title="Gestionar, editar o cancelar bloqueos de esta excursión"
                        >
                          <Edit3 className="w-2.5 h-2.5" />
                          <span>Ver / Editar</span>
                        </button>
                      </div>
                      <div className="space-y-1">
                        {groups.map((grp) => (
                          <div
                            key={grp.id}
                            className="flex items-center justify-between text-[10px] font-mono bg-white px-2 py-1 rounded-lg border border-rose-100 shadow-2xs"
                          >
                            <span className="truncate max-w-[210px] font-semibold" title={grp.label}>
                              {grp.label}
                            </span>
                            <span className="text-slate-500 font-bold shrink-0">{grp.isRange ? `${grp.count} días` : '1 día'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Price & Actions Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Tarifa Pública</div>
                    <div className="flex items-baseline gap-2">
                      {discount > 0 ? (
                        <>
                          <span className="text-xs text-slate-400 line-through">${(exc.priceNum || 0).toLocaleString('es-AR')}</span>
                          <span className="text-xl font-black text-emerald-600">${discountedPrice.toLocaleString('es-AR')} ARS</span>
                          <span className="text-[11px] font-bold text-rose-600">({discount}% OFF)</span>
                        </>
                      ) : (
                        <span className="text-xl font-black text-slate-900">${(exc.priceNum || 0).toLocaleString('es-AR')} ARS</span>
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
                  { id: 'general', label: '1. General & Estado', icon: Compass },
                  { id: 'texts', label: '2. Textos & Idiomas', icon: FileText },
                  { id: 'shifts', label: '3. Turnos & Calendario', icon: CalendarDays },
                  { id: 'services', label: '4. Galería & Highlights', icon: ImageIcon },
                  { id: 'faq', label: '5. Preguntas Frecuentes', icon: HelpCircle },
                  { id: 'rates', label: '6. Tarifas & Descuento', icon: DollarSign }
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
                    {/* Status & Publication Toggle */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${formIsPublished ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-amber-500 ring-4 ring-amber-100'}`} />
                          <span className="text-xs font-bold text-slate-800">
                            {formIsPublished ? 'Excursión Publicada (Visible en Catálogo Público)' : 'Excursión Oculta / Pausada (Borrador Interno)'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {formIsPublished 
                            ? 'Los visitantes del sitio pueden ver esta excursión, sus fotos, turnos y solicitar reserva.' 
                            : 'Esta excursión no se mostrará a los clientes en la web hasta que la actives.'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormIsPublished(!formIsPublished)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                          formIsPublished 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm' 
                            : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                        }`}
                      >
                        {formIsPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{formIsPublished ? 'Activa / Publicada' : 'Pausada / Oculta'}</span>
                      </button>
                    </div>

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

                    {/* Image Selector via Media Library (WordPress Style) */}
                    <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-800">Fotografía Principal de Portada</label>
                        <span className="text-[11px] font-mono text-[#00A896] font-bold">FORMATO WEBP OPTIMIZADO</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-24 h-24 sm:w-28 sm:h-24 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border-2 border-slate-300 shadow-sm relative group">
                          <img 
                            src={formImage} 
                            alt="Previsualización" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/excursiones/circuito-chico.webp';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setMediaModalMode('cover');
                              setIsMediaModalOpen(true);
                            }}
                            className="absolute inset-0 bg-slate-950/60 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1"
                          >
                            <ImageIcon className="w-4 h-4 text-cyan-300" />
                            <span>Cambiar</span>
                          </button>
                        </div>

                        <div className="flex-1 space-y-2.5 w-full">
                          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 shadow-xs">
                            <div className="truncate text-xs font-mono text-slate-600">
                              <span className="text-slate-400 mr-1.5 font-sans font-bold">Archivo actual:</span>
                              <span className="font-bold text-slate-800">{formImage.split('/').pop()}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 shrink-0">
                              WebP
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setMediaModalMode('cover');
                                setIsMediaModalOpen(true);
                              }}
                              className="px-4 py-2 rounded-xl bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                              <span>Elegir de Biblioteca Multimedia / Subir</span>
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-tight">
                            Podés seleccionar una imagen del catálogo existente o subir una foto desde tu equipo. Toda imagen subida se convertirá automáticamente a WebP ultraligero con miniatura.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: TEXTS & NARRATIVE (MULTILINGUAL) */}
                {editorTab === 'texts' && (
                  <div className="space-y-5">
                    {/* Language Switcher for Content */}
                    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-100 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-700 font-mono">Idioma a editar:</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setTextsLang('es')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            textsLang === 'es' ? 'bg-white text-slate-900 shadow-sm border border-slate-300' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <span>🇪🇸</span> Español (Base)
                        </button>
                        <button
                          type="button"
                          onClick={() => setTextsLang('en')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            textsLang === 'en' ? 'bg-white text-cyan-800 shadow-sm border border-cyan-300' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <span>🇬🇧</span> English
                        </button>
                        <button
                          type="button"
                          onClick={() => setTextsLang('pt')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            textsLang === 'pt' ? 'bg-white text-emerald-800 shadow-sm border border-emerald-300' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <span>🇧🇷</span> Português
                        </button>
                      </div>
                    </div>

                    {/* Spanish (Default / Base) */}
                    {textsLang === 'es' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Título en Español
                          </label>
                          <input
                            type="text"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            placeholder="Ej: Refugio Roca Negra"
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Resumen Breve (Aparece en la tarjeta del catálogo)
                          </label>
                          <input
                            type="text"
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            placeholder="Ej: Caminata con raquetas para nieve y ascenso 4x4"
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Itinerario & Descripción Detallada (Modal de Ficha Técnica)
                          </label>
                          <textarea
                            rows={6}
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

                    {/* English Translation */}
                    {textsLang === 'en' && (
                      <div className="space-y-4">
                        <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-[11px] text-cyan-800">
                          ℹ️ Si dejas algún campo vacío, el sitio usará la versión en español como respaldo automático.
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Title in English
                          </label>
                          <input
                            type="text"
                            value={transTitleEn}
                            onChange={(e) => setTransTitleEn(e.target.value)}
                            placeholder={`Ej: ${formTitle || 'Roca Negra Mountain Refuge'}`}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Short Summary (English)
                          </label>
                          <input
                            type="text"
                            value={transDescEn}
                            onChange={(e) => setTransDescEn(e.target.value)}
                            placeholder="e.g., Snowshoeing mountain walk and 4x4 ascent"
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Full Itinerary & Details (English)
                          </label>
                          <textarea
                            rows={6}
                            value={transDetailsEn}
                            onChange={(e) => setTransDetailsEn(e.target.value)}
                            placeholder="Write the full itinerary in English..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-[#00A896]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Portuguese Translation */}
                    {textsLang === 'pt' && (
                      <div className="space-y-4">
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800">
                          ℹ️ Se deixar algum campo vazio, o site exibirá o texto original em espanhol automaticamente.
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Título em Português
                          </label>
                          <input
                            type="text"
                            value={transTitlePt}
                            onChange={(e) => setTransTitlePt(e.target.value)}
                            placeholder={`Ex: ${formTitle || 'Refúgio Roca Negra'}`}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Resumo Breve (Português)
                          </label>
                          <input
                            type="text"
                            value={transDescPt}
                            onChange={(e) => setTransDescPt(e.target.value)}
                            placeholder="Ex: Caminhada com raquetes de neve e subida em 4x4"
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Itinerário Completo & Detalhes (Português)
                          </label>
                          <textarea
                            rows={6}
                            value={transDetailsPt}
                            onChange={(e) => setTransDetailsPt(e.target.value)}
                            placeholder="Escreva o roteiro detalhado em português..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-[#00A896]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: SHIFTS, CALENDAR & CAPACITY */}
                {editorTab === 'shifts' && (
                  <div className="space-y-6">
                    {/* Calendar: Operating Days & Blocked Dates */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-[#00A896]" />
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            1. Días Operativos en la Semana (Calendario de Salidas)
                          </h4>
                        </div>
                        <span className="text-[11px] font-mono text-[#00A896] bg-[#00A896]/10 px-2.5 py-0.5 rounded-full font-bold">
                          {formOperatingDays.length === 7 ? 'Opera todos los días' : `${formOperatingDays.length} días por semana`}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Selecciona qué días de la semana opera esta excursión. Los usuarios solo podrán elegir fechas en el calendario que coincidan con estos días.
                      </p>

                      {/* Day pills */}
                      <div className="flex flex-wrap items-center gap-2">
                        {DAYS_OF_WEEK.map((d) => {
                          const isSelected = formOperatingDays.includes(d.day);
                          return (
                            <button
                              key={d.day}
                              type="button"
                              onClick={() => handleToggleOperatingDay(d.day)}
                              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#00A896] text-white shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                              <span>{d.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Quick Presets for Days */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
                        <span className="text-slate-400 font-semibold mr-1">Preajustes rápidos:</span>
                        <button
                          type="button"
                          onClick={() => setFormOperatingDays([0, 1, 2, 3, 4, 5, 6])}
                          className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 font-medium cursor-pointer"
                        >
                          Todos los días (7/7)
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormOperatingDays([1, 2, 3, 4, 5])}
                          className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 font-medium cursor-pointer"
                        >
                          Lunes a Viernes
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormOperatingDays([6, 0])}
                          className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 font-medium cursor-pointer"
                        >
                          Fines de Semana (Sáb/Dom)
                        </button>
                      </div>

                      {/* Blocked Dates Sub-section */}
                      <div className="pt-3 border-t border-slate-200/60 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <label className="block text-xs font-bold text-slate-700">
                            2. Fechas Específicas Bloqueadas (Cierre de Salidas / Mantenimiento)
                          </label>
                          <div className="flex items-center gap-1.5 self-start sm:self-auto">
                            <button
                              type="button"
                              onClick={() => setBlockedDateMode('range')}
                              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                                blockedDateMode === 'range'
                                  ? 'bg-[#00A896] text-white font-bold shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              🗓️ Rango de Fechas
                            </button>
                            <button
                              type="button"
                              onClick={() => setBlockedDateMode('single')}
                              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                                blockedDateMode === 'single'
                                  ? 'bg-[#00A896] text-white font-bold shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              📅 Fecha Única
                            </button>
                          </div>
                        </div>

                        {/* Modo Rango de Fechas */}
                        {blockedDateMode === 'range' ? (
                          <div className={`p-3 rounded-xl border space-y-2 transition-all ${
                            editingRangeGroup 
                              ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200' 
                              : 'bg-slate-50/80 border-slate-200'
                          }`}>
                            {editingRangeGroup && (
                              <div className="flex items-center justify-between pb-1 border-b border-amber-200 text-xs text-amber-900">
                                <span className="font-bold flex items-center gap-1.5">
                                  <span>✏️ Editando Rango:</span>
                                  <span className="font-mono text-[11px]">{editingRangeGroup.label}</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={handleCancelEditGroup}
                                  className="text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
                                >
                                  ✕ Cancelar Edición
                                </button>
                              </div>
                            )}
                            <div className="flex flex-col sm:flex-row sm:items-end gap-2.5">
                              <div className="flex-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                  Fecha Desde
                                </label>
                                <input
                                  type="date"
                                  value={newBlockedStartDate}
                                  onChange={(e) => setNewBlockedStartDate(e.target.value)}
                                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                  Fecha Hasta (Inclusive)
                                </label>
                                <input
                                  type="date"
                                  value={newBlockedEndDate}
                                  onChange={(e) => setNewBlockedEndDate(e.target.value)}
                                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={handleAddBlockedRange}
                                className="px-4 py-2 bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                              >
                                <CalendarDays className="w-3.5 h-3.5 text-white" />
                                <span>{editingRangeGroup ? 'Guardar Cambios del Rango' : 'Bloquear Rango Completo'}</span>
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-500">
                              {editingRangeGroup 
                                ? 'Ajustá las fechas de inicio y fin para reconfigurar el período de cierre.' 
                                : 'Permite cerrar varios días continuados de una sola vez (ej: período de mantenimiento, temporada baja o veda de senderos).'}
                            </p>
                          </div>
                        ) : (
                          /* Modo Fecha Única */
                          <div className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                            editingRangeGroup ? 'bg-amber-50/70 border-amber-300' : 'bg-slate-50/80 border-slate-200'
                          }`}>
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                type="date"
                                value={newBlockedDate}
                                onChange={(e) => setNewBlockedDate(e.target.value)}
                                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                              />
                              <button
                                type="button"
                                onClick={handleAddBlockedDate}
                                className="px-4 py-2 bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>{editingRangeGroup ? 'Guardar Fecha' : 'Bloquear Fecha'}</span>
                              </button>
                            </div>
                            {editingRangeGroup && (
                              <button
                                type="button"
                                onClick={handleCancelEditGroup}
                                className="text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer self-end sm:self-auto"
                              >
                                ✕ Cancelar Edición
                              </button>
                            )}
                          </div>
                        )}

                        {/* Mensaje de feedback de rango */}
                        {rangeFeedbackMessage && (
                          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium flex items-center justify-between shadow-2xs">
                            <span>{rangeFeedbackMessage}</span>
                            <button
                              type="button"
                              onClick={() => setRangeFeedbackMessage(null)}
                              className="text-emerald-500 hover:text-emerald-800 ml-2"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        {/* List of blocked dates / ranges */}
                        {formBlockedDates.length > 0 ? (
                          <div className="space-y-2 pt-1">
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                              <span>
                                Bloqueos activos: <strong>{groupedBlockedDates.length} {groupedBlockedDates.length === 1 ? 'rango/fecha' : 'rangos/fechas'}</strong> ({formBlockedDates.length} días en total)
                              </span>
                              <button
                                type="button"
                                onClick={handleClearAllBlockedDates}
                                className="text-rose-600 hover:text-rose-800 underline cursor-pointer font-bold"
                              >
                                Desbloquear todas
                              </button>
                            </div>

                            <div className="space-y-2 max-h-56 overflow-y-auto p-2 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
                              {groupedBlockedDates.map((group) => (
                                <div
                                  key={group.id}
                                  className={`rounded-2xl p-3 text-xs transition-all border shadow-xs ${
                                    editingRangeGroup?.id === group.id
                                      ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300'
                                      : group.isRange
                                        ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-200/60'
                                        : 'bg-white border-slate-200'
                                  }`}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                    <div className="flex items-center gap-2.5">
                                      <span className="text-base p-1.5 rounded-xl bg-white border border-rose-200 shadow-2xs shrink-0">
                                        {group.isRange ? '⛔' : '📅'}
                                      </span>
                                      <div>
                                        <div className="font-bold text-slate-900 font-mono flex items-center gap-2 flex-wrap">
                                          <span>{group.label}</span>
                                          {group.isRange && (
                                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                                              {group.count} días corridos
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[11px] text-slate-500 font-mono">
                                          Rango: <strong>{group.startDate}</strong> al <strong>{group.endDate}</strong>
                                        </span>
                                      </div>
                                    </div>

                                    {/* Botones de acción del rango */}
                                    <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 font-sans">
                                      {group.isRange && (
                                        <button
                                          type="button"
                                          onClick={() => handleToggleExpandGroup(group.id)}
                                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                                          title="Ver o consultar los días individuales incluidos en este rango"
                                        >
                                          <span>{expandedGroupIds[group.id] ? '▲ Ocultar días' : '▼ Ver días'}</span>
                                        </button>
                                      )}

                                      <button
                                        type="button"
                                        onClick={() => handleStartEditGroup(group)}
                                        className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                                        title="Editar las fechas de este rango"
                                      >
                                        <span>✏️ Editar</span>
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => handleRemoveBlockedGroup(group)}
                                        className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-900 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                                        title={group.isRange ? 'Cancelar y desbloquear este rango completo' : 'Desbloquear esta fecha'}
                                      >
                                        <span>✕ Desbloquear</span>
                                      </button>
                                    </div>
                                  </div>

                                  {/* Lista expandible de días puntuales del rango */}
                                  {group.isRange && expandedGroupIds[group.id] && (
                                    <div className="mt-2.5 pt-2.5 border-t border-rose-200/80 space-y-1.5 font-sans">
                                      <div className="text-[11px] text-slate-600 font-medium flex items-center justify-between">
                                        <span>Días individuales incluidos en este rango (podés desmarcar una fecha puntual con ✕):</span>
                                        <span className="font-mono text-slate-400 font-bold">{group.count} días</span>
                                      </div>
                                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-white rounded-xl border border-rose-100">
                                        {group.dates.map((dStr) => (
                                          <span
                                            key={dStr}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono border border-slate-200"
                                          >
                                            <span>{dStr}</span>
                                            <button
                                              type="button"
                                              onClick={() => handleRemoveBlockedDate(dStr)}
                                              className="text-rose-500 hover:text-rose-800 font-bold ml-0.5 cursor-pointer"
                                              title={`Habilitar exclusivamente el día ${dStr}`}
                                            >
                                              ✕
                                            </button>
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-400 italic">
                            No hay fechas específicas bloqueadas para esta excursión. Opera todos los días habilitados.
                          </p>
                        )}
                      </div>

                      {/* Minimum Booking Advance Cutoff Setting */}
                      <div className="pt-3 border-t border-slate-200/60 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>3. Anticipación Mínima para Reserva Online (Corte de Venta)</span>
                          </label>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-mono font-bold">
                            {formMinBookingAdvanceHours} horas antes
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Bloquea automáticamente la contratación online en la web cuando falten menos horas que las configuradas aquí para el turno/salida. Evita ventas sin tiempo operativo de despacho.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
                            <input
                              type="number"
                              min="0"
                              max="168"
                              value={formMinBookingAdvanceHours}
                              onChange={(e) => setFormMinBookingAdvanceHours(Math.max(0, parseInt(e.target.value, 10) || 0))}
                              className="w-16 text-xs font-mono font-bold text-slate-800 focus:outline-none"
                            />
                            <span className="text-xs text-slate-400 font-mono">horas</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1 text-[11px]">
                            <button
                              type="button"
                              onClick={() => setFormMinBookingAdvanceHours(6)}
                              className={`px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                                formMinBookingAdvanceHours === 6
                                  ? 'bg-amber-600 text-white border-amber-600 font-bold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              6 hs
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormMinBookingAdvanceHours(12)}
                              className={`px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                                formMinBookingAdvanceHours === 12
                                  ? 'bg-amber-600 text-white border-amber-600 font-bold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              12 hs
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormMinBookingAdvanceHours(24)}
                              className={`px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                                formMinBookingAdvanceHours === 24
                                  ? 'bg-[#00A896] text-white border-[#00A896] font-bold shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              24 hs (Recomendado)
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormMinBookingAdvanceHours(48)}
                              className={`px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                                formMinBookingAdvanceHours === 48
                                  ? 'bg-amber-600 text-white border-amber-600 font-bold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              48 hs
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormMinBookingAdvanceHours(72)}
                              className={`px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                                formMinBookingAdvanceHours === 72
                                  ? 'bg-amber-600 text-white border-amber-600 font-bold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              72 hs (Expediciones)
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-cyan-50/70 border border-cyan-200/80 rounded-2xl flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-cyan-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-cyan-600" />
                          4. Configuración de Turnos y Cupos Operativos
                        </h4>
                        <p className="text-[11px] text-cyan-800 mt-0.5">
                          Define los horarios de salida y el cupo de pasajeros para que los visitantes puedan ver la disponibilidad y elegir turno desde la web.
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-cyan-800 border border-cyan-300 rounded-lg text-xs font-mono font-bold shrink-0">
                        {formShifts.filter(s => s.enabled).length} turnos activos
                      </span>
                    </div>

                    {/* Formulario para agregar turno */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <span className="text-xs font-bold text-slate-800 block">Incorporar Nuevo Turno</span>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nombre del Turno</label>
                          <input
                            type="text"
                            value={newShiftName}
                            onChange={(e) => setNewShiftName(e.target.value)}
                            placeholder="Ej: Turno Mañana"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Horario de Salida</label>
                          <input
                            type="text"
                            value={newShiftTime}
                            onChange={(e) => setNewShiftTime(e.target.value)}
                            placeholder="09:00 hs"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Capacidad Total</label>
                          <input
                            type="number"
                            min={1}
                            max={200}
                            value={newShiftCapacity}
                            onChange={(e) => setNewShiftCapacity(parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Lugares Disponibles</label>
                          <input
                            type="number"
                            min={0}
                            max={newShiftCapacity}
                            value={newShiftAvailable}
                            onChange={(e) => setNewShiftAvailable(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A896]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={handleAddShift}
                          className="px-4 py-2 bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Agregar Turno</span>
                        </button>
                      </div>
                    </div>

                    {/* Lista de Turnos */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-700 block">Turnos Configurados ({formShifts.length})</span>
                      {formShifts.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                          No hay turnos configurados para esta excursión. Agrega al menos uno arriba.
                        </div>
                      ) : (
                        formShifts.map((s, idx) => (
                          editingShiftId === s.id ? (
                            <div key={s.id || idx} className="p-4 rounded-2xl border-2 border-[#00A896] bg-cyan-50/20 shadow-md space-y-3">
                              <div className="flex items-center justify-between border-b border-cyan-100 pb-2">
                                <span className="text-xs font-bold text-[#00A896] flex items-center gap-1.5">
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Editando #{idx + 1} - {s.name}</span>
                                </span>
                                <span className="text-[11px] font-mono text-slate-400">ID: {s.id}</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                <div className="sm:col-span-2">
                                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nombre del Turno *</label>
                                  <input
                                    type="text"
                                    value={editShiftName}
                                    onChange={(e) => setEditShiftName(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00A896]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Horario de Salida *</label>
                                  <input
                                    type="text"
                                    value={editShiftTime}
                                    onChange={(e) => setEditShiftTime(e.target.value)}
                                    placeholder="Ej: 09:30 hs"
                                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#00A896]"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Capacidad</label>
                                    <input
                                      type="number"
                                      min={1}
                                      value={editShiftCapacity}
                                      onChange={(e) => setEditShiftCapacity(parseInt(e.target.value) || 1)}
                                      className="w-full px-2 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#00A896]"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Libres</label>
                                    <input
                                      type="number"
                                      min={0}
                                      max={editShiftCapacity}
                                      value={editShiftAvailable}
                                      onChange={(e) => setEditShiftAvailable(parseInt(e.target.value) || 0)}
                                      className="w-full px-2 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#00A896]"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => setEditingShiftId(null)}
                                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-semibold cursor-pointer"
                                >
                                  Cancelar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveShiftEdit(s.id)}
                                  className="px-4 py-1.5 rounded-lg bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold shadow-sm flex items-center gap-1 cursor-pointer"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                  <span>Guardar Turno</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              key={s.id || idx}
                              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                s.enabled ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-50/80 border-slate-200 opacity-60'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-mono font-bold text-xs text-slate-700 shrink-0">
                                  #{idx + 1}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-sm text-slate-900">{s.name}</span>
                                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                      {s.time}
                                    </span>
                                    {s.availableSpots === 0 ? (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-700 border border-rose-200">
                                        Agotado
                                      </span>
                                    ) : s.availableSpots <= 3 ? (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                        Últimos {s.availableSpots} lugares
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                        {s.availableSpots} lugares libres
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-0.5 font-mono">
                                    Capacidad Total: {s.totalCapacity} pasajeros · Disponibles: {s.availableSpots}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                                <label className="flex items-center gap-1.5 text-xs text-slate-600 font-medium cursor-pointer mr-2">
                                  <input
                                    type="checkbox"
                                    checked={s.enabled}
                                    onChange={(e) => handleUpdateShift(s.id, { enabled: e.target.checked })}
                                    className="rounded text-[#00A896] focus:ring-[#00A896]"
                                  />
                                  <span>{s.enabled ? 'Habilitado' : 'Deshabilitado'}</span>
                                </label>

                                <button
                                  type="button"
                                  onClick={() => handleStartEditShift(s)}
                                  className="p-1.5 text-slate-400 hover:text-[#00A896] rounded-lg hover:bg-[#00A896]/10 transition-colors"
                                  title="Editar turno"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleRemoveShift(s.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                                  title="Eliminar turno"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 4: GALLERY & HIGHLIGHTS */}
                {editorTab === 'services' && (
                  <div className="space-y-6">
                    {/* Excursion Photo Gallery Manager */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-[#00A896]" />
                            Galería de Fotos de la Excursión ({formGallery.length} fotos)
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Los viajeros podrán navegar estas fotos interactivamente dentro del modal de detalle de la excursión.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setMediaModalMode('gallery');
                            setIsMediaModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Agregar desde Biblioteca / Subir</span>
                        </button>
                      </div>

                      {/* Quick URL Adder */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newGalleryUrl.trim()) {
                                handleAddGalleryImage(newGalleryUrl.trim());
                                setNewGalleryUrl('');
                              }
                            }
                          }}
                          placeholder="O pegar URL directa de imagen (ej: /images/excursiones/... o https://...)"
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newGalleryUrl.trim()) {
                              handleAddGalleryImage(newGalleryUrl.trim());
                              setNewGalleryUrl('');
                            }
                          }}
                          className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Añadir URL
                        </button>
                      </div>

                      {/* Gallery Thumbnails Grid */}
                      {formGallery.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs bg-white border border-dashed border-slate-200 rounded-xl">
                          No hay fotos secundarias en la galería. En el modal del sitio se mostrará únicamente la foto de portada principal.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-1">
                          {formGallery.map((imgUrl, idx) => (
                            <div 
                              key={idx} 
                              className="group relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs"
                            >
                              <img 
                                src={imgUrl} 
                                alt={`Galería ${idx + 1}`} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/excursiones/circuito-chico.webp';
                                }}
                              />
                              <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGalleryImage(idx)}
                                  className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
                                  title="Quitar foto de la galería"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono">
                                #{idx + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

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

                {/* TAB 6: RATES & PROMOTIONS */}
                {editorTab === 'rates' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tarifa Base Adulto Español / Portugués (ARS) *
                        </label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                          <input
                            type="number"
                            required
                            min={0}
                            max={10000000}
                            value={formPriceNum}
                            onChange={(e) => setFormPriceNum(e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-black text-slate-900 focus:outline-none focus:border-[#00A896]"
                          />
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Tarifa estándar en pesos argentinos (ingresá 0 para paseos gratuitos o walking tours).
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                          <span>Tarifa en Inglés (ARS)</span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                            formHasEnglishGuide 
                              ? 'text-cyan-700 bg-cyan-50 border-cyan-200' 
                              : 'text-slate-500 bg-slate-100 border-slate-200'
                          }`}>
                            {formHasEnglishGuide ? '🇬🇧 Guía Bilingüe Activa' : 'Sin Guía en Inglés'}
                          </span>
                        </label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                          <input
                            type="number"
                            min={0}
                            max={10000000}
                            disabled={!formHasEnglishGuide}
                            value={formHasEnglishGuide ? formPriceEnglish : formPriceNum}
                            onChange={(e) => setFormPriceEnglish(e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                            placeholder={`Sugerido: $${Math.round(formPriceNum * 1.25).toLocaleString('es-AR')} ARS`}
                            className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-base font-black transition-colors ${
                              formHasEnglishGuide
                                ? 'bg-slate-50 border-slate-200 text-slate-900 focus:outline-none focus:border-[#00A896]'
                                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          />
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          {formHasEnglishGuide 
                            ? 'Tarifa diferenciada en ARS con guía en inglés.' 
                            : 'Al no tener guía en inglés, se aplicará automáticamente la tarifa estándar en pesos sin recargo.'}
                        </span>
                      </div>
                    </div>

                    {/* Switch: ¿Dispone de guía bilingüe en inglés? */}
                    <div className="p-3.5 rounded-2xl bg-cyan-50/50 border border-cyan-200/80 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                          <span>🇬🇧</span>
                          <span>¿Dispone de opción con Guía Bilingüe en Inglés?</span>
                        </span>
                        <span className="text-[11px] text-slate-600 block mt-0.5">
                          {formHasEnglishGuide
                            ? 'Activado: los turistas que naveguen en inglés verán la opción bilingüe con la tarifa inglesa.'
                            : 'Desactivado: si el turista navega en inglés, se le ofrecerá el paseo con guía en español al mismo precio estándar sin recargo.'}
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={formHasEnglishGuide}
                          onChange={(e) => setFormHasEnglishGuide(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A896]"></div>
                      </label>
                    </div>

                    {/* Tarifas Diferenciadas para Menores */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tarifa Reducida Menores (ARS) — Opcional
                        </label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                          <input
                            type="number"
                            min={0}
                            max={10000000}
                            value={formPriceChild}
                            onChange={(e) => setFormPriceChild(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                            placeholder="Dejar vacío si aplica tarifa general"
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#00A896]"
                          />
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Si se define, el cotizador y la web permitirán desglosar pasajeros Adultos y Menores.
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Rango de Edad / Política de Menores
                        </label>
                        <input
                          type="text"
                          value={formChildAgePolicy}
                          onChange={(e) => setFormChildAgePolicy(e.target.value)}
                          placeholder="Ej: 4 a 11 años / Menores de 5 sin cargo"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#00A896]"
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Texto aclaratorio visible en el calendario y presupuesto.
                        </span>
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

                    {/* Real-time calculated price preview banner */}
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                          Tarifas Finales en la Web (con descuento aplicado)
                        </span>
                        <span className="text-xs text-emerald-600">
                          {formDiscountPercent > 0 ? `Aplica ${formDiscountPercent}% de descuento sobre el precio base` : 'Sin descuento activo'}
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-500 block uppercase">ES / PT</span>
                          <div className="text-xl font-black text-emerald-700">
                            ${(formDiscountPercent > 0 ? Math.round(formPriceNum * (1 - formDiscountPercent / 100)) : formPriceNum).toLocaleString('es-AR')} ARS
                          </div>
                        </div>
                        <div className="text-right border-l border-emerald-200 pl-6">
                          <span className="text-[10px] font-bold text-cyan-700 block uppercase">EN (Inglés)</span>
                          <div className="text-xl font-black text-cyan-800">
                            ${(formDiscountPercent > 0 ? Math.round(formPriceEnglish * (1 - formDiscountPercent / 100)) : formPriceEnglish).toLocaleString('es-AR')} ARS
                          </div>
                        </div>
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
                          placeholder="Ej: Promoción válida hasta agotar cupos"
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A896]"
                        />
                      </div>
                    </div>

                    {/* Home Promo Carousel Toggle */}
                    {onUpdatePromoSuggestions && (
                      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Carrusel Promocional de Portada (Home)</span>
                          </span>
                          <span className="text-[11px] text-amber-800 block">
                            {isExcursionInHomePromos({ id: formId, title: formTitle } as any)
                              ? '✓ Esta excursión se muestra activamente en el banner principal del home'
                              : 'Podés incluirla con 1 clic en el carrusel destacado del inicio'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleHomePromo({
                            id: formId,
                            title: formTitle,
                            description: formDescription,
                            priceNum: formPriceNum,
                            discountPercent: formDiscountPercent,
                            promoBadge: formPromoBadge,
                            duration: formDuration,
                            image: formImage
                          } as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 ${
                            isExcursionInHomePromos({ id: formId, title: formTitle } as any)
                              ? 'bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300'
                              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
                          }`}
                        >
                          {isExcursionInHomePromos({ id: formId, title: formTitle } as any)
                            ? 'Quitar de Portada'
                            : '⭐ Destacar en Portada'}
                        </button>
                      </div>
                    )}

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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Precio Base en ARS</label>
                  <input
                    type="number"
                    min={0}
                    max={10000000}
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

      {/* WordPress-Style Media Library Modal */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectImage={(url) => {
          if (mediaModalMode === 'gallery') {
            handleAddGalleryImage(url);
          } else {
            setFormImage(url);
          }
        }}
        currentSelectedUrl={mediaModalMode === 'gallery' ? undefined : formImage}
        defaultFolder={formTitle || undefined}
      />

    </div>
  );
};
