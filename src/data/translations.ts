import { Excursion } from './excursionsData';

export type LanguageCode = 'es' | 'en' | 'pt';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  flag: string;
  guideLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸', guideLabel: 'Guía en Español' },
  { code: 'en', name: 'English', flag: '🇬🇧', guideLabel: 'English Bilingual Guide' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', guideLabel: 'Guia em Espanhol / Português' }
];

export const UI_TRANSLATIONS = {
  es: {
    nav: {
      excursions: 'Excursiones',
      corredor: 'Corredor de los Lagos',
      about: 'Quiénes Somos',
      offices: 'Sucursales',
      directWhatsapp: 'WhatsApp Directo',
      access: 'Acceder',
      panel: 'Panel',
      logout: 'Salir'
    },
    hero: {
      badge: 'BARILOCHE · CORREDOR DE LOS LAGOS · CHILE',
      titleHighlight: 'Grupo Visión',
      titlePre: 'Descubrí Bariloche con ',
      subtitle: 'Más de 30 años organizando excursiones tradicionales, navegaciones por el Nahuel Huapi, trekking y traslados privados.',
      searchPlaceholder: '¿Qué excursión buscás? (Ej: 7 Lagos, Tronador, Raquetas)...',
      searchButton: 'Buscar'
    },
    catalog: {
      badge: 'CATÁLOGO COMPLETO',
      title: 'Excursiones & Servicios Receptivos',
      all: 'Todas',
      showing: 'Mostrando',
      to: 'a',
      of: 'de',
      excursions: 'excursiones',
      page: 'Página',
      viewDetail: 'Ver Detalle',
      rate: 'Tarifa',
      shiftsAvailable: 'turnos con cupo',
      noResults: 'No se encontraron excursiones que coincidan con la búsqueda.'
    },
    modal: {
      difficulty: 'Dificultad',
      duration: 'Duración',
      departure: 'Horario Habitual',
      recommended: 'Recomendado',
      availableShiftsTitle: 'Turnos y Disponibilidad de Cupos',
      availableShiftsDesc: 'Selecciona el turno que mejor se adapte a tu itinerario. Disponibilidad en tiempo real para hoy y fechas próximas:',
      selectShift: 'Seleccionar este turno',
      selectedShift: 'Turno Seleccionado',
      spotsAvailable: 'lugares disponibles',
      lastSpots: '¡Últimos {n} lugares!',
      soldOut: 'Agotado',
      passengers: 'Pasajeros / Pasajes',
      totalEstimated: 'Total Estimado',
      whatsappInquiry: 'Consultar por WhatsApp',
      whatsappNotice: 'Al consultar, se adjuntará el turno y número de pasajeros automáticamente para que nuestros asesores confirmen al instante.',
      includes: '¿Qué Incluye el Servicio?',
      notIncludes: 'No Incluye',
      highlights: 'Puntos Destacados del Recorrido',
      faq: 'Preguntas Frecuentes',
      close: 'Cerrar'
    },
    langSelector: {
      label: 'Idioma & Tarifa',
      rateNoticeEn: 'Tarifa en USD con guía bilingüe en inglés',
      rateNoticeEsPt: 'Tarifa estándar en USD para Español y Portugués'
    }
  },
  en: {
    nav: {
      excursions: 'Excursions',
      corredor: 'Lakes Route',
      about: 'About Us',
      offices: 'Branches',
      directWhatsapp: 'Direct WhatsApp',
      access: 'Sign In',
      panel: 'Dashboard',
      logout: 'Sign Out'
    },
    hero: {
      badge: 'BARILOCHE · LAKES CORRIDOR · CHILE',
      titleHighlight: 'Grupo Visión',
      titlePre: 'Discover Bariloche with ',
      subtitle: 'Over 30 years organizing traditional tours, Nahuel Huapi sailing, mountain trekking, and private transfers.',
      searchPlaceholder: 'What excursion are you looking for? (e.g., 7 Lakes, Tronador)...',
      searchButton: 'Search'
    },
    catalog: {
      badge: 'COMPLETE CATALOG',
      title: 'Excursions & Receptive Services',
      all: 'All',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      excursions: 'excursions',
      page: 'Page',
      viewDetail: 'View Details',
      rate: 'Fare',
      shiftsAvailable: 'shifts available',
      noResults: 'No excursions matched your search criteria.'
    },
    modal: {
      difficulty: 'Difficulty',
      duration: 'Duration',
      departure: 'Departure Time',
      recommended: 'Recommended For',
      availableShiftsTitle: 'Shifts & Spot Availability',
      availableShiftsDesc: 'Select the shift that best fits your travel schedule. Real-time availability for today and upcoming dates:',
      selectShift: 'Select this shift',
      selectedShift: 'Selected Shift',
      spotsAvailable: 'spots available',
      lastSpots: 'Last {n} spots!',
      soldOut: 'Sold Out',
      passengers: 'Passengers',
      totalEstimated: 'Estimated Total',
      whatsappInquiry: 'Book / Inquire via WhatsApp',
      whatsappNotice: 'When inquiring, your chosen shift and passenger count will be included automatically so our advisors can confirm instantly.',
      includes: 'What Does It Include?',
      notIncludes: 'Does Not Include',
      highlights: 'Tour Highlights',
      faq: 'Frequently Asked Questions',
      close: 'Close'
    },
    langSelector: {
      label: 'Language & Rates',
      rateNoticeEn: 'USD Rate with English bilingual guide',
      rateNoticeEsPt: 'Standard USD rate for Spanish & Portuguese'
    }
  },
  pt: {
    nav: {
      excursions: 'Passeios',
      corredor: 'Rota dos Lagos',
      about: 'Quem Somos',
      offices: 'Agências',
      directWhatsapp: 'WhatsApp Direto',
      access: 'Entrar',
      panel: 'Painel',
      logout: 'Sair'
    },
    hero: {
      badge: 'BARILOCHE · CORREDOR DOS LAGOS · CHILE',
      titleHighlight: 'Grupo Visión',
      titlePre: 'Descubra Bariloche com ',
      subtitle: 'Mais de 30 anos organizando passeios tradicionais, navegação pelo Nahuel Huapi, trekking e traslados privativos.',
      searchPlaceholder: 'Que passeio você procura? (Ex: 7 Lagos, Tronador, Raquetes)...',
      searchButton: 'Buscar'
    },
    catalog: {
      badge: 'CATÁLOGO COMPLETO',
      title: 'Passeios & Serviços Receptivos',
      all: 'Todos',
      showing: 'Mostrando',
      to: 'a',
      of: 'de',
      excursions: 'passeios',
      page: 'Página',
      viewDetail: 'Ver Detalhes',
      rate: 'Tarifa',
      shiftsAvailable: 'turnos com vagas',
      noResults: 'Nenhum passeio encontrado para esta busca.'
    },
    modal: {
      difficulty: 'Dificuldade',
      duration: 'Duração',
      departure: 'Horário de Saída',
      recommended: 'Recomendado Para',
      availableShiftsTitle: 'Turnos e Vagas Disponíveis',
      availableShiftsDesc: 'Selecione o turno mais conveniente para seu roteiro. Disponibilidade em tempo real para hoje e próximos dias:',
      selectShift: 'Selecionar este turno',
      selectedShift: 'Turno Selecionado',
      spotsAvailable: 'vagas disponíveis',
      lastSpots: 'Últimas {n} vagas!',
      soldOut: 'Esgotado',
      passengers: 'Passageiros',
      totalEstimated: 'Total Estimado',
      whatsappInquiry: 'Consultar pelo WhatsApp',
      whatsappNotice: 'Ao consultar, o turno selecionado e número de passageiros serão incluídos automaticamente para confirmação imediata.',
      includes: 'O que está incluído?',
      notIncludes: 'Não Inclui',
      highlights: 'Destaques do Roteiro',
      faq: 'Perguntas Frequentes',
      close: 'Fechar'
    },
    langSelector: {
      label: 'Idioma & Tarifa',
      rateNoticeEn: 'Tarifa em USD com guia bilíngue em inglês',
      rateNoticeEsPt: 'Mesma tarifa padrão em USD para Espanhol e Português'
    }
  }
};

/**
 * Retorna el precio correspondiente según el idioma activo:
 * - 'en': Retorna priceEnglish (tarifa en inglés con guía bilingüe). Si no está definido, calcula ~1.25x.
 * - 'es' | 'pt': Retorna priceNum (Español y Portugués comparten la misma tarifa estándar).
 */
export function getExcursionPrice(excursion: Excursion, lang: LanguageCode): number {
  if (lang === 'en') {
    if (typeof excursion.priceEnglish === 'number' && excursion.priceEnglish > 0) {
      return excursion.priceEnglish;
    }
    // Diferencial por defecto en inglés si no se especificó (+25% redondeado a múltiplo de 5)
    const base = excursion.priceNum || 30;
    return Math.max(base, Math.round((base * 1.25) / 5) * 5);
  }

  // Español y Portugués comparten el mismo precio estándar
  return excursion.priceNum || 30;
}

/**
 * Retorna los textos de la excursión adaptados al idioma, con fallback a español.
 */
export function getExcursionContent(excursion: Excursion, lang: LanguageCode) {
  if (lang === 'es') {
    return {
      title: excursion.title,
      description: excursion.description,
      fullDetails: excursion.fullDetails,
      highlights: excursion.highlights,
      includes: excursion.includes,
      notIncludes: excursion.notIncludes || [],
      departureTime: excursion.departureTime
    };
  }

  const trans = excursion.translations?.[lang];
  return {
    title: trans?.title || excursion.title,
    description: trans?.description || excursion.description,
    fullDetails: trans?.fullDetails || excursion.fullDetails,
    highlights: trans?.highlights && trans.highlights.length > 0 ? trans.highlights : excursion.highlights,
    includes: trans?.includes && trans.includes.length > 0 ? trans.includes : excursion.includes,
    notIncludes: trans?.notIncludes && trans.notIncludes.length > 0 ? trans.notIncludes : (excursion.notIncludes || []),
    departureTime: trans?.departureTime || excursion.departureTime
  };
}
