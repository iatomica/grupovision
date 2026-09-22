export interface BentoMetric {
  value: string;
  label: string;
}

export interface AboutSectionData {
  badge: string;
  title: string;
  description: string;
  backgroundImage: string;
  fleetTitle: string;
  fleetDescription: string;
  fleetMetrics: BentoMetric[];
  guidesTitle: string;
  guidesDescription: string;
  guidesBadgeTitle: string;
  guidesBadgeDesc: string;
}

export interface ExclusiveSectionData {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  whatsappMessage: string;
  officeTitle: string;
  officeAddress: string;
  officeSchedule: string;
}

export interface SiteContentData {
  about: AboutSectionData;
  exclusive: ExclusiveSectionData;
}

export const DEFAULT_SITE_CONTENT: SiteContentData = {
  about: {
    badge: 'QUIÉNES SOMOS · OPERADORA RECEPTIVA BARILOCHE',
    title: 'Más de 30 Años Guiando Expediciones en la Patagonia',
    description: 'Desde nuestra fundación, Grupo Visión se ha consolidado como la agencia receptiva de referencia en San Carlos de Bariloche. Brindamos servicios integrales de transporte privado, excursiones de montaña, navegaciones lacustres y cruce de lagos.',
    backgroundImage: '/images/excursiones/camino-de-los-7-lagos-san-martin-de-los-andes.webp',
    fleetTitle: 'Flota Propia 4x4 & Unidades Especializadas',
    fleetDescription: 'Contamos con una flota moderna de combis Mercedes-Benz Sprinter, minibus Iveco Daily y camionetas 4x4 preparadas con cadenas, raquetas y equipamiento para ascensos invernales a refugios de montaña.',
    fleetMetrics: [
      { value: '15+', label: 'Unidades 4x4' },
      { value: '100%', label: 'Habilitación CNRT' },
      { value: '24/7', label: 'Asistencia Logística' }
    ],
    guidesTitle: 'Guías AAGM & WFR',
    guidesDescription: 'Todos nuestros recorridos están liderados por guías profesionales matriculados por el Parque Nacional Nahuel Huapi y la Asociación Argentina de Guías de Montaña.',
    guidesBadgeTitle: 'Certificación Médica WFR',
    guidesBadgeDesc: 'Primeros auxilios en áreas remotas y comunicación VHF de alta frecuencia.'
  },
  exclusive: {
    badge: 'DISEÑO DE EXPEDICIONES EXCLUSIVAS',
    title: '¿Buscás un Paquete a Medida o Traslado Privado VIP?',
    description: 'Diseñamos circuitos exclusivos por el Corredor de los Lagos (San Martín de los Andes, Villa La Angostura, El Bolsón) y el Cruce Andino a Chile adaptados al ritmo y preferencias de tu grupo.',
    buttonText: 'Cotizar por WhatsApp con Mostrador',
    whatsappMessage: 'Hola! Me interesa cotizar un paquete a medida con Grupo Vision',
    officeTitle: 'Atención Presencial en el Centro',
    officeAddress: 'Urquiza 276, San Carlos de Bariloche',
    officeSchedule: 'Abierta todos los días de 08:30 a 20:30 hs'
  }
};
