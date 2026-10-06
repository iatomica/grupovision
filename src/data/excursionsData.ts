// Auto-generated Excursions Data from Grupo Visión Receptive Catalog

export interface ExcursionShift {
  id: string;
  name: string;          // Ej: "Turno Mañana"
  time: string;          // Ej: "09:00 hs"
  totalCapacity: number; // Ej: 15
  availableSpots: number;// Ej: 4
  enabled: boolean;      // true / false
}

export interface ExcursionTranslations {
  title?: string;
  description?: string;
  fullDetails?: string;
  highlights?: string[];
  includes?: string[];
  notIncludes?: string[];
  departureTime?: string;
}

export interface Excursion {
  id: string;
  title: string;
  category: 'Tradicional' | 'Aventura' | 'Navegación' | 'Experiencias' | 'Traslados' | 'Invierno' | 'Verano' | 'Alquileres';
  season: 'Todo el Año' | 'Invierno' | 'Verano';
  duration: string;
  difficulty: 'Fácil' | 'Moderado' | 'Desafiante';
  image: string;
  description: string;
  fullDetails: string;
  highlights: string[];
  includes: string[];
  notIncludes?: string[];
  additionalInfo?: string;
  faq?: { question: string; answer: string }[];
  recommendedFor: string;
  departureTime: string;
  priceNum: number;        // Tarifa base en USD para Español y Portugués
  priceEnglish?: number;   // Tarifa diferenciada en USD para Inglés (guía bilingüe)
  isPublished?: boolean;   // Toggle ON/OFF para publicar en la web o dejar en borrador (default: true)
  gallery?: string[];      // Galería de fotos adicionales de la excursión
  operatingDays?: number[];// Días de la semana que opera (0=Dom, 1=Lun, ..., 6=Sáb). Default: [0,1,2,3,4,5,6]
  blockedDates?: string[]; // Fechas específicas bloqueadas o cerradas (formato YYYY-MM-DD)
  shifts?: ExcursionShift[]; // Turnos y cupos configurables por el Admin
  translations?: {
    en?: ExcursionTranslations;
    pt?: ExcursionTranslations;
  };
  discountPercent?: number;
  promoBadge?: string;
  isFeatured?: boolean;
  customNote?: string;
}

export const EXCURSIONS_DATA: Excursion[] = [
  {
    "id": "refugio-roca-negra",
    "title": "Roca Negra —Travesia en  4x4, Raquetas de Nieve y Fondue",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/refugio-roca-negra.webp",
    "description": "Descubrí la cara invernal del Cerro López en una experiencia de día completo que combina ascenso en Land Rover 4x4, caminata con raquetas de nieve y fondue en el refugio Roca Negra. Una propuesta ideal para disfrutar la nieve, los bosques y las vistas de la Cordillera.",
    "fullDetails": "Roca Negra es una experiencia diurna pensada para disfrutar la nieve y los paisajes del Cerro López sin necesidad de tener experiencia previa. La aventura comienza con el traslado desde Bariloche hasta la base del cerro, donde subirás en vehículos Land Rover 4x4 por caminos de montaña rodeados de bosque nativo.\n\nAl llegar al área del refugio, recibirás las raquetas de nieve para realizar una caminata guiada por senderos nevados. El recorrido permite descubrir el entorno de lenga y coihue, contemplar las vistas de la Cordillera y vivir la nieve de una manera activa, accesible y segura.\n\nLa experiencia finaliza en el refugio Roca Negra con una propuesta de fondue. El turno de la mañana incluye fondue de queso y el turno de la tarde, fondue de chocolate. Las bebidas no están incluidas.\n\nUna opción excelente para familias, parejas y grupos que buscan una jornada diferente de nieve, naturaleza y gastronomía patagónica.",
    "highlights": [
      "Te trasladarás desde Bariloche hasta la base del Cerro López.",
      "Ascenderás en vehículos Land Rover 4x4.",
      "Recorrerás senderos nevados con raquetas de nieve.",
      "Descubrirás bosques nativos y vistas de la Cordillera.",
      "Disfrutarás una propuesta de fondue en el refugio.",
      "Elegirás entre la experiencia de mañana con fondue de queso o la de tarde con fondue de chocolate."
    ],
    "includes": [
      "Traslado ida y vuelta entre Bariloche y la base del Cerro López.",
      "Ascenso y descenso en vehículos Land Rover 4x4.",
      "Caminata guiada con raquetas de nieve.",
      "Raquetas de nieve durante la actividad.",
      "Guías especializados.",
      "Fondue de queso en el turno de la mañana.",
      "Fondue de chocolate en el turno de la tarde."
    ],
    "notIncludes": [
      "Bebidas.",
      "Indumentaria de nieve, salvo que se indique expresamente al momento de reservar.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Traslado desde Bariloche hacia la base del Cerro López.\n• Recepción e inicio del ascenso en Land Rover 4x4.\n• Llegada al área del refugio y entrega de raquetas de nieve.\n• Caminata guiada por senderos habilitados, según las condiciones de nieve.\n• Regreso al refugio Roca Negra.\n• Fondue según el turno elegido.\n• Descenso en 4x4 y traslado de regreso a Bariloche.\n• El orden de las actividades puede variar por condiciones de nieve, clima y operación del complejo.\n• Roca Negra Travesia en 4x4 Raquetas de Nieve y Fondue\n\nTURNOS Y MODALIDADES:\n• Turno mañana — 10:00 a 16:00 hs\n• Incluye ascenso en Land Rover 4x4, caminata guiada con raquetas de nieve y fondue de queso.\n• Turno tarde — 14:00 a 20:00 hs\n• Incluye ascenso en Land Rover 4x4, caminata guiada con raquetas de nieve y fondue de chocolate.\n\nRECOMENDACIONES:\n• Usar ropa de abrigo, campera impermeable, guantes, gorro y calzado apto para nieve.\n• Informar con anticipación alergias, restricciones alimentarias o dietas especiales.\n• Consultar previamente si hay indumentaria de nieve disponible.\n• Seguir siempre las indicaciones de los guías.\n• La actividad está sujeta a condiciones de nieve, clima y operación del complejo.\n\nDATOS DE LA EXPERIENCIA:\n• Temporada: invierno, sujeta a condiciones de nieve.\n• Ubicación: Cerro López, Bariloche.\n• Turno mañana: 10:00 a 16:00 hs.\n• Turno tarde: 14:00 a 20:00 hs.\n• Actividad física: baja a moderada.\n• Dificultad: baja; no se requiere experiencia previa.\n• Edad tarifaria: adultos y menores de 4 a 11 años.\n• Público recomendado: familias, parejas, grupos y viajeros que buscan una experiencia de nieve durante el día.",
    "faq": [
      {
        "question": "¿Incluye comidas?",
        "answer": "Sí, de acuerdo con el horario elegido para el paseo, podrá disfrutar de una rica Fondue de Queso o de una Fondue de Chocolate"
      },
      {
        "question": "¿Se suspende por lluvia?",
        "answer": "No. no se suspende"
      },
      {
        "question": "¿Es necesario llevar ropa de nieve?",
        "answer": "Si, ropa de nieve, abrigada e impermeable."
      }
    ],
    "recommendedFor": "familias, parejas, grupos y viajeros que buscan una experiencia de nieve durante el día.",
    "departureTime": "14:00 hs",
    "priceNum": 25
  },
  {
    "id": "cabalgata-la-fragua",
    "title": "Cabalgata \" La Fragua \"",
    "category": "Aventura",
    "season": "Todo el Año",
    "duration": "Medio Día (4h)",
    "difficulty": "Moderado",
    "image": "/images/excursiones/cabalgata-la-fragua.webp",
    "description": "Cabalgar en el medio de la estepa Patagónica !!!",
    "fullDetails": "Salida 09:30 hs Regreso 15:00 hs Nivel de Dificultad: Bajo Traslados desde el centro de la ciudad hasta la Estancia San Ramón, a 30 Kmts.  de distancia. Realizaremos una cabalgata de aproximadamente 2 hs. por un paisaje único, en plena estepa patagónica, que nos permite admirar la flora la fauna y el característico paisaje que nos rodea. Al mediodía disfrutaremos un asado de campo en las instalaciones de la antigua escuela rural de la zona llamada La Fragua.",
    "highlights": [
      "Traslado a La Fragua",
      "Charla Técnica",
      "Cabalgata",
      "Asado"
    ],
    "includes": [
      "Traslados",
      "Cabalgata",
      "Almuerzo ( Asado) con Bebidas"
    ],
    "notIncludes": [
      "Fotografías"
    ],
    "additionalInfo": "* Valor: $190.000.- \n*Ser mayor de 04 años\n*Menores de 5 años sin cargo",
    "faq": [
      {
        "question": "En qué momento del año se puede realizar ?",
        "answer": "Este paseo se realiza todo el año"
      },
      {
        "question": "Opera todos los días ?",
        "answer": "Si, opera todos los días"
      },
      {
        "question": "Cuales son horarios de la excursión ?",
        "answer": "Salida a las 09:30 hs regresa 15:00 hs"
      },
      {
        "question": "Que debo llevar a la excursión?",
        "answer": "Se debe llevar, ropa y calzado cómodo para la montaña, no llevar vestidos ni faldas"
      },
      {
        "question": "Es necesario tener experiencia previa?",
        "answer": "No, no es necesario tener experiencia en este paseo."
      },
      {
        "question": "Incluye alguna comida o snacks ?",
        "answer": "Si , incluye almuerzo con bebidas"
      },
      {
        "question": "La excursión se suspende por lluvia?",
        "answer": "No, no se suspende por lluvia"
      },
      {
        "question": "Se puede llevar cámaras fotográficas?",
        "answer": "Sí, se puede, hay lugares muy lindos para fotografiar"
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 9
  },
  {
    "id": "camino-de-los-7-lagos-san-martin-de-los-andes",
    "title": "San Martín de los Andes por la Ruta de los 7 Lagos",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "11 a 12 horas.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/camino-de-los-7-lagos-san-martin-de-los-andes.webp",
    "description": "Recorré una de las rutas panorámicas más espectaculares de la Patagonia en una excursión de día completo. Lagos de montaña, bosques andinos, miradores inolvidables y tiempo libre para conocer San Martín de los Andes, a orillas del lago Lácar.",
    "fullDetails": "San Martín de los Andes por la Ruta de los 7 Lagos es una de las excursiones más completas y paisajísticas de la región. Durante el día recorrerás un tramo inolvidable de la Ruta Nacional 40, atravesando los Parques Nacionales Nahuel Huapi y Lanín, entre lagos de origen glaciar, bosques nativos, montañas y miradores.\n\nEl camino une Bariloche con San Martín de los Andes y permite disfrutar de algunos de los lagos más bellos de la Patagonia, como Nahuel Huapi, Correntoso, Espejo, Escondido, Falkner, Villarino y Machónico, entre otros paisajes de montaña. Durante el recorrido se realizan paradas panorámicas para contemplar el entorno y tomar fotografías.\n\nAntes de llegar a destino, se visita la zona de Villa La Angostura, reconocida por su arquitectura de montaña y su entorno natural. Finalmente se llega a San Martín de los Andes, una ciudad encantadora ubicada a orillas del lago Lácar, donde tendrás tiempo libre para almorzar, caminar por el centro y disfrutar de la tranquilidad de la cordillera.\n\nEs una experiencia ideal para quienes desean descubrir la Patagonia en su máxima expresión: naturaleza, lagos, montañas y pueblos de montaña en una jornada inolvidable.",
    "highlights": [
      "Recorrerás la famosa Ruta de los 7 Lagos.",
      "Disfrutarás lagos de origen glaciar, bosques andinos y paisajes de montaña.",
      "Realizarás paradas panorámicas para tomar fotografías.",
      "Conocerás la zona de Villa La Angostura.",
      "Tendrás tiempo libre en San Martín de los Andes, a orillas del lago Lácar.",
      "Recorrerás paisajes de los Parques Nacionales Nahuel Huapi y Lanín."
    ],
    "includes": [
      "Traslado ida y vuelta desde Bariloche.",
      "Guía de turismo.",
      "Paradas panorámicas previstas en el itinerario.",
      "Tiempo libre en San Martín de los Andes."
    ],
    "notIncludes": [
      "Comidas y bebidas.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Salida desde Bariloche por la mañana.\n• Inicio del recorrido por la Ruta Nacional 40, bordeando el lago Nahuel Huapi.\n• Paso por la zona de Villa La Angostura.\n• Continuación por la Ruta de los 7 Lagos, con paradas panorámicas en distintos lagos y miradores del camino.\n• Llegada a San Martín de los Andes, a orillas del lago Lácar.\n• Tiempo libre para almorzar, recorrer el centro de la ciudad y disfrutar del entorno.\n• Regreso a Bariloche por la tarde.\n• El orden de las paradas, los lagos visitados y los tiempos puede variar por razones climáticas, de tránsito u operativas.\n• San Martín de los Andes por la Ruta de los 7 Lagos\n\nRECOMENDACIONES:\n• Usar calzado cómodo y ropa adecuada al clima.\n• Llevar abrigo, incluso en verano, ya que las temperaturas pueden variar durante el recorrido.\n• Llevar agua, protector solar, anteojos de sol y cámara fotográfica.\n• Llevar dinero o un medio de pago para almuerzo y consumos personales.\n• Es una excursión de día completo: se recomienda llevar lo necesario para pasar varias horas fuera del hotel.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: 11 a 12 horas.\n• Modalidad: servicio regular o privado.\n• Temporada: todo el año, sujeto a condiciones climáticas y de acceso.\n• Dificultad: baja.\n• Actividad física: baja, con caminatas cortas y opcionales.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.",
    "faq": [
      {
        "question": "Cuales son los horarios de la excursión?",
        "answer": "Sale a las 08:00 am y regresa 18:30 pm"
      },
      {
        "question": "Cuantos kilómetros se recorren en total ?",
        "answer": "Se recorren aproximadamente 360  kmts en el día"
      },
      {
        "question": "Incluye almuerzo ?",
        "answer": "No, no incluye almuerzo"
      }
    ],
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 7
  },
  {
    "id": "cerro-catedral",
    "title": "Cerro Catedral Panorámico",
    "category": "Tradicional",
    "season": "Invierno",
    "duration": "medio día.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/cerro-catedral.webp",
    "description": "Descubrí uno de los centros de montaña más importantes de Sudamérica en una excursión panorámica de medio día al Cerro Catedral. Disfrutá paisajes de altura, vistas de los lagos y la Cordillera de los Andes, con la posibilidad de realizar un ascenso opcional en medios de elevación.",
    "fullDetails": "Cerro Catedral Panorámico es una excursión de medio día pensada para quienes desean conocer uno de los paisajes de montaña más imponentes de Bariloche durante la temporada invernal. El recorrido se dirige hacia la base del Cerro Catedral, atravesando un entorno de bosques, montañas y vistas abiertas hacia el Parque Nacional Nahuel Huapi.\n\nAl llegar al cerro tendrás tiempo para recorrer la base, disfrutar del ambiente de montaña y contemplar los paisajes que rodean uno de los centros de ski más reconocidos de Sudamérica. Quienes lo deseen podrán realizar, de manera opcional, un ascenso en los medios de elevación habilitados para acceder a vistas panorámicas de la Cordillera de los Andes, los lagos y las cumbres de la región.\n\nEs una propuesta ideal para viajeros que quieren conocer Cerro Catedral sin practicar ski o snowboard, disfrutar de la nieve cuando las condiciones lo permiten y vivir una experiencia de montaña accesible y memorable.",
    "highlights": [
      "Viajarás desde Bariloche hacia la base del Cerro Catedral.",
      "Disfrutarás paisajes de bosque, montaña y vistas del Parque Nacional Nahuel Huapi.",
      "Conocerás uno de los centros de ski más importantes de Sudamérica.",
      "Tendrás tiempo libre para recorrer la base y disfrutar del ambiente de montaña.",
      "Podrás realizar opcionalmente un ascenso en medios de elevación habilitados."
    ],
    "includes": [
      "Traslado ida y vuelta desde Bariloche.",
      "Guía de turismo.",
      "Tiempo libre en la base del Cerro Catedral."
    ],
    "notIncludes": [
      "Ascenso en medios de elevación.",
      "Alquiler de ropa o equipamiento de nieve.",
      "Ski, snowboard, clases o pases de medios de elevación para actividades de nieve.",
      "Comidas y bebidas.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Salida desde Bariloche en horario a confirmar.\n• Traslado hacia el Cerro Catedral, disfrutando del paisaje de montaña durante el camino.\n• Llegada a la base del cerro y tiempo libre para recorrer el área.\n• Posibilidad de realizar el ascenso opcional en medios de elevación, sujeto a disponibilidad, condiciones climáticas y operación del centro de montaña.\n• Tiempo para disfrutar del paisaje y tomar fotografías.\n• Regreso a Bariloche.\n• El orden de las actividades y los tiempos pueden variar por razones climáticas, de tránsito u operativas.\n• Cerro Catedral Panorámico\n\nRECOMENDACIONES:\n• Usar calzado cerrado, cómodo e impermeable o apto para nieve.\n• Llevar abrigo, campera impermeable, guantes, gorro y anteojos de sol.\n• Consultar previamente el estado de los medios de elevación y las condiciones meteorológicas.\n• Llevar agua y dinero o un medio de pago para consumos personales.\n• El ascenso está sujeto a disponibilidad y se abona por separado.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: medio día.\n• Temporada: de julio a septiembre.\n• Modalidad: servicio regular o privado.\n• Dificultad: baja.\n• Actividad física: baja.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.\n• Ascenso en medios de elevación: opcional y abonado por separado.",
    "faq": [
      {
        "question": "Cuales son los horarios de la excursión ?",
        "answer": "Sale a las 13:00 pm , regresa 17:00 pm"
      },
      {
        "question": "Cuantos kilómetros se recorren en total ?",
        "answer": "Se recorren de ida y vuelta  50 kmts"
      },
      {
        "question": "Incluye medios de elevación ?",
        "answer": "No, no los incluye"
      },
      {
        "question": "Si no uso los medios de elevación que actividad se puede realizar ?",
        "answer": "Se realizan caminatas recorriendo la base y la villa Catedral"
      }
    ],
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 2
  },
  {
    "id": "cerro-tronador-y-glaciares",
    "title": "Cerro Tronador y Ventisquero Negro",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "10 a 11 horas.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/cerro-tronador-y-glaciares.webp",
    "description": "Viví una jornada inolvidable en el corazón del Parque Nacional Nahuel Huapi. Recorré lagos, bosques y valles de montaña hasta llegar al imponente Cerro Tronador y al Ventisquero Negro, uno de los paisajes glaciares más impactantes de Bariloche.",
    "fullDetails": "Cerro Tronador y Ventisquero Negro es una excursión de día completo hacia uno de los escenarios naturales más impresionantes de la Patagonia. El recorrido atraviesa la zona sur del Parque Nacional Nahuel Huapi, entre lagos, bosques nativos, ríos y montañas, con paisajes que cambian a cada tramo del camino.\n\nDurante el viaje se bordean los lagos Gutiérrez y Mascardi, se atraviesa Villa Mascardi y se continúa hacia Pampa Linda, un valle de montaña rodeado de bosques y cumbres andinas. Desde allí, el paisaje se vuelve cada vez más imponente hasta llegar al área del Cerro Tronador, cuyo nombre proviene del estruendo que producen los desprendimientos de hielo en sus glaciares.\n\nUno de los momentos más especiales de la excursión es la visita al Ventisquero Negro, un glaciar de tonalidades oscuras formado por sedimentos que descienden desde el hielo. Tendrás tiempo para contemplar este paisaje único, tomar fotografías y disfrutar de la inmensidad de la montaña.\n\nUna experiencia ideal para quienes buscan conocer la naturaleza más salvaje y espectacular de Bariloche.",
    "highlights": [
      "Recorrerás la zona sur del Parque Nacional Nahuel Huapi.",
      "Disfrutarás vistas de los lagos Gutiérrez y Mascardi.",
      "Conocerás Villa Mascardi y el valle de Pampa Linda.",
      "Llegarás a la base del imponente Cerro Tronador.",
      "Visitarás el Ventisquero Negro y sus paisajes glaciares.",
      "Tendrás tiempo para tomar fotografías y disfrutar de la naturaleza patagónica."
    ],
    "includes": [
      "Traslado ida y vuelta desde Bariloche.",
      "Guía de turismo.",
      "Paradas panorámicas previstas en el itinerario.",
      "Visita al área del Ventisquero Negro."
    ],
    "notIncludes": [
      "Entrada al Parque Nacional Nahuel Huapi.",
      "Comidas y bebidas.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Salida desde Bariloche por la mañana.\n• Recorrido junto al lago Gutiérrez y continuación hacia la zona de Villa Mascardi.\n• Bordeo del lago Mascardi y tránsito por caminos de montaña dentro del Parque Nacional Nahuel Huapi.\n• Llegada a Pampa Linda, un valle rodeado de bosques y cumbres andinas.\n• Continuación hacia el área del Cerro Tronador, con tiempo para contemplar el paisaje y tomar fotografías.\n• Visita al Ventisquero Negro.\n• Tiempo libre para almorzar, sujeto a la disponibilidad operativa de los servicios del área.\n• Regreso a Bariloche por la tarde.\n• El orden de las paradas y los tiempos puede variar por razones climáticas, de tránsito u operativas.\n• Cerro Tronador y Ventisquero Negro\n\nRECOMENDACIONES:\n• Usar calzado cómodo y cerrado, adecuado para terreno irregular.\n• Llevar abrigo, campera impermeable y ropa en capas.\n• Llevar agua, protector solar, anteojos de sol y cámara fotográfica.\n• Llevar dinero o un medio de pago para el ingreso al Parque Nacional y consumos personales.\n• Es una excursión de día completo: se recomienda llevar lo necesario para pasar varias horas fuera del hotel.\n• El recorrido está sujeto a las condiciones climáticas y al estado de los caminos.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: 10 a 11 horas.\n• Modalidad: servicio regular o privado.\n• Temporada: todo el año, sujeto a condiciones climáticas y de acceso.\n• Dificultad: baja.\n• Actividad física: baja, con caminatas cortas y opcionales.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.",
    "faq": [
      {
        "question": "Cuales son los horarios de la excursión ?",
        "answer": "Sale a las 09:00 am y regresa 18:00 pm"
      },
      {
        "question": "Cuantos kilómetros se recorren en total ?",
        "answer": "Se recorren aproximadamente 180  kmts en el día"
      },
      {
        "question": "Incluye almuerzo ?",
        "answer": "No, no incluye almuerzo"
      }
    ],
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 6
  },
  {
    "id": "circuito-chico",
    "title": "Circuito Chico",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "4 horas.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/circuito-chico.webp",
    "description": "Descubrí los paisajes más emblemáticos de Bariloche en una excursión panorámica por la Avenida Bustillo, entre lagos, bosques y montañas. Conocé la Capilla San Eduardo, la zona de Llao Llao y el Punto Panorámico, con tiempo para disfrutar cada vista y tomar fotografías inolvidables.",
    "fullDetails": "Circuito Chico es una de las excursiones imprescindibles de Bariloche y la mejor manera de descubrir, en pocas horas, los paisajes que hacen única a esta ciudad patagónica. El recorrido bordea el lago Nahuel Huapi por la Avenida Bustillo, atravesando bosques de montaña y miradores con vistas a lagos, penínsulas y cumbres andinas.\n\nDurante la excursión se visita la zona de Llao Llao, Puerto Pañuelo y la Capilla San Eduardo, donde se realiza una parada para contemplar el Hotel Llao Llao y su entorno natural. El paseo continúa hacia el Punto Panorámico, uno de los miradores más fotografiados de la región, con una vista privilegiada del lago Moreno, la península Llao Llao y las montañas.\n\nA lo largo del recorrido, un guía compartirá información sobre la historia, la naturaleza y las curiosidades de Bariloche. De manera opcional, quienes lo deseen podrán realizar el ascenso en aerosilla al Cerro Campanario, reconocido por ofrecer una de las mejores vistas panorámicas de la ciudad.",
    "highlights": [
      "Recorrerás la Avenida Bustillo junto al lago Nahuel Huapi.",
      "Conocerás la zona de Llao Llao, Puerto Pañuelo y la Capilla San Eduardo.",
      "Disfrutarás una parada con vista al Hotel Llao Llao y su entorno.",
      "Visitarás el Punto Panorámico, con vistas al lago Moreno y la península Llao Llao.",
      "Tendrás la posibilidad de realizar opcionalmente el ascenso al Cerro Campanario."
    ],
    "includes": [
      "Traslado durante todo el recorrido.",
      "Guía de turismo.",
      "Paradas panorámicas previstas en el itinerario."
    ],
    "notIncludes": [
      "Ascenso en aerosilla al Cerro Campanario.",
      "Comidas y bebidas.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Salida desde Bariloche e inicio del recorrido por la Avenida Bustillo, bordeando el lago Nahuel Huapi.\n• Paso por Playa Bonita y continuación hacia la península Llao Llao.\n• Parada en la Capilla San Eduardo, con vistas al Hotel Llao Llao, Puerto Pañuelo y el lago Nahuel Huapi.\n• Recorrido por el área de Llao Llao, entre bosques, lagos y montañas.\n• Parada en el Punto Panorámico para contemplar el lago Moreno, la península Llao Llao y el paisaje andino.\n• Opción de realizar el ascenso en aerosilla al Cerro Campanario, sujeto a disponibilidad y condiciones operativas.\n• Regreso a Bariloche.\n• El orden de las paradas y los tiempos puede variar por razones climáticas u operativas.\n• Circuito Chico\n\nRECOMENDACIONES:\n• Usar calzado cómodo y ropa adecuada al clima.\n• Llevar abrigo durante todo el año.\n• Llevar agua, protector solar, anteojos de sol y cámara fotográfica.\n• Consultar previamente el horario y punto de encuentro.\n• El ascenso al Cerro Campanario es opcional y se abona por separado.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: 4 horas.\n• Modalidad: servicio regular o privado.\n• Temporada: todo el año.\n• Dificultad: baja.\n• Actividad física: mínima.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.",
    "faq": [
      {
        "question": "Cuantos kilómetros se recorren ?",
        "answer": "60 kilómetros es todo  el recorrido."
      },
      {
        "question": "Se puede realizar durante todo el año ?",
        "answer": "Si ,  opera todo el año"
      },
      {
        "question": "Los guías son bilingues ?",
        "answer": "Usualmente los guías hablan español y portugués, en la excursión  con salida a las 15:00 hs es acompañada por guía con idioma español e ingles"
      },
      {
        "question": "Se ingresa al hotel Llao Llao",
        "answer": "No, el hotel no permite en ingreso de excursiones"
      }
    ],
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "08:30 hs",
    "priceNum": 2
  },
  {
    "id": "circuito-grande-villa-traful-villa-la-angostura",
    "title": "Circuito Grande — Villa Traful y Villa La Angostura",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "día completo.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/circuito-grande-villa-traful-villa-la-angostura.webp",
    "description": "Descubrí una de las rutas más sorprendentes del norte patagónico en una excursión de día completo por Villa Traful y Villa La Angostura. Recorré estepa, ríos, bosques andinos, lagos y miradores únicos, con tiempo para conocer dos de las villas más pintorescas de Neuquén.",
    "fullDetails": "Circuito Grande es una excursión de día completo que une algunos de los paisajes más variados y sorprendentes de la región. El recorrido comienza saliendo de Bariloche hacia el noreste, hasta llegar a la desembocadura del lago Nahuel Huapi, donde nace el río Limay y se marca el límite natural entre las provincias de Río Negro y Neuquén.\n\nEl camino continúa junto al río Limay, atravesando paisajes de estepa y formaciones rocosas únicas como el Anfiteatro y el Valle Encantado. Allí la naturaleza creó siluetas que los pobladores identifican con nombres como el Dedo de Dios, el Centinela y los Siameses.\n\nLuego se llega a la confluencia de los ríos Limay y Traful. A partir de ese punto, el recorrido avanza por caminos de ripio y el paisaje se transforma gradualmente: la estepa da paso al bosque andino, los valles se vuelven más cerrados y las cumbres acompañan el trayecto hasta Villa Traful. Desde el Mirador del Viento se obtiene una de las panorámicas más imponentes del lago Traful.\n\nEn Villa Traful tendrás tiempo para caminar por su pintoresco muelle y disfrutar de la tranquilidad de esta pequeña villa. El regreso se realiza por el Camino de los Siete Lagos, visitando lugares como Puerto Arrayán, Paso Portezuelo, el lago Correntoso, el puente Ruca Malén y el lago Espejo. Finalmente se llega a Villa La Angostura, con tiempo para conocer sus puntos más representativos, y a Puerto Manzano antes de regresar a Bariloche.",
    "highlights": [
      "Conocerás el nacimiento del río Limay en la desembocadura del lago Nahuel Huapi.",
      "Descubrirás el Anfiteatro y las formaciones rocosas del Valle Encantado.",
      "Contemplarás la confluencia de los ríos Limay y Traful.",
      "Visitarás el Mirador del Viento, con una vista excepcional del lago Traful.",
      "Tendrás tiempo libre en Villa Traful y su muelle.",
      "Recorrerás parte del Camino de los Siete Lagos.",
      "Conocerás Villa La Angostura, Puerto Manzano y la costa norte del lago Nahuel Huapi."
    ],
    "includes": [
      "Recorrido completo de la excursión.",
      "Guía durante la actividad.",
      "Paradas panorámicas previstas en el itinerario.",
      "Tiempo libre en Villa Traful.",
      "Tiempo libre en Villa La Angostura."
    ],
    "notIncludes": [
      "Comidas y bebidas.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Salida desde Bariloche a las 08:30 hs.\n• Recorrido hacia el noreste hasta la desembocadura del lago Nahuel Huapi y el nacimiento del río Limay.\n• Paso por el Anfiteatro y el Valle Encantado.\n• Parada en la confluencia de los ríos Limay y Traful.\n• Continuación por caminos de ripio hacia el Mirador del Viento y Villa Traful.\n• Tiempo libre para caminar por Villa Traful y su muelle.\n• Recorrido hacia el oeste por Puerto Arrayán y Paso Portezuelo, ingresando al Camino de los Siete Lagos.\n• Paradas panorámicas en el lago Correntoso, puente Ruca Malén y lago Espejo.\n• Llegada a Villa La Angostura, con tiempo para recorrer sus puntos destacados.\n• Visita a Puerto Manzano y Bahía Manzano.\n• Regreso a Bariloche, bordeando el lago Nahuel Huapi.\n• El orden de las paradas y los tiempos puede variar por razones climáticas, de tránsito u operativas.\n• Circuito Grande Villa Traful y Villa La Angostura\n\nRECOMENDACIONES:\n• Usar calzado cómodo y ropa adecuada para caminar.\n• Llevar abrigo, campera impermeable y protección solar.\n• Llevar agua, anteojos de sol y cámara fotográfica.\n• Llevar dinero o un medio de pago para almuerzo y consumos personales.\n• Es una excursión de día completo con tramos de camino de ripio.\n• Consultar previamente las condiciones climáticas y el estado de los caminos.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: día completo.\n• Horario: 08:30 a 18:00 hs.\n• Días de salida: lunes, miércoles y viernes.\n• Temporada: de noviembre a abril.\n• Distancia aproximada: 250 km.\n• Modalidad: servicio regular o privado.\n• Dificultad: baja.\n• Actividad física: baja, con caminatas cortas y opcionales.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.",
    "faq": [
      {
        "question": "Cuales son los horarios de la excursión ?",
        "answer": "Sale a las 08:30 am y regresa 18:00 pm"
      },
      {
        "question": "Cuantos kilómetros se recorren en total ?",
        "answer": "Se recorren aproximadamente 250  kmts en el día"
      },
      {
        "question": "Incluye almuerzo ?",
        "answer": "No, no incluye almuerzo"
      },
      {
        "question": "Opera todo el año ?",
        "answer": "No, opera desde Noviembre hasta Abril"
      },
      {
        "question": "Opera todos los dias ?",
        "answer": "No, opera Lunes, Miércoles y Viernes"
      },
      {
        "question": "Se visita el Bosque de los Arrayanes ?",
        "answer": "No, esa visita se realiza en otras excursiones"
      }
    ],
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 6
  },
  {
    "id": "el-bolson-chacras-lago-puelo",
    "title": "El Bolsón y Lago Puelo",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "día completo.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/el-bolson-chacras-lago-puelo.webp",
    "description": "Recorré la Comarca Andina del Paralelo 42 en una excursión de día completo hacia El Bolsón y Lago Puelo. Conocé la feria regional, los sabores de la producción local y las aguas turquesa del Parque Nacional Lago Puelo, rodeadas de bosques y Cordillera.",
    "fullDetails": "El Bolsón y Lago Puelo es una excursión de día completo que invita a descubrir una de las regiones más auténticas y pintorescas de la Patagonia. El recorrido parte desde Bariloche hacia el sur por la Ruta Nacional 40, atravesando valles, lagos y paisajes de bosque nativo hasta llegar a la Comarca Andina del Paralelo 42.\n\nLa primera visita es El Bolsón, una localidad reconocida por su ambiente relajado, su producción artesanal, sus frutas finas y su identidad ligada a la naturaleza. Tendrás tiempo libre para recorrer el centro, conocer comercios locales y, en los días de funcionamiento, visitar la Feria Regional de Artesanos en Plaza Pagano.\n\nLa excursión continúa hacia Lago Puelo, en la provincia de Chubut. Allí se visita el área del Parque Nacional Lago Puelo, donde las aguas de tonalidades turquesa, los bosques y las cumbres crean uno de los paisajes más característicos de la Comarca Andina.\n\nEs una propuesta ideal para quienes desean combinar naturaleza, cultura local, productos regionales y paisajes diferentes a los de Bariloche en una misma jornada.",
    "highlights": [
      "Recorrerás la Ruta Nacional 40 hacia el sur de Bariloche.",
      "Descubrirás paisajes de lagos, valles y bosque nativo.",
      "Conocerás El Bolsón y su identidad artesanal.",
      "Tendrás tiempo libre para visitar la feria regional, cuando se encuentre operativa.",
      "Podrás conocer productos locales y propuestas gastronómicas de la Comarca Andina.",
      "Visitarás el Parque Nacional Lago Puelo y sus aguas turquesa."
    ],
    "includes": [
      "Traslado ida y vuelta desde Bariloche.",
      "Guía de turismo.",
      "Visita a El Bolsón.",
      "Tiempo libre en el centro de la localidad.",
      "Visita al área del Parque Nacional Lago Puelo."
    ],
    "notIncludes": [
      "Entrada al Parque Nacional Lago Puelo.",
      "Comidas y bebidas.",
      "Compras en feria, comercios o puestos locales.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Salida desde Bariloche por la mañana.\n• Recorrido hacia el sur por la Ruta Nacional 40, con vistas de lagos, valles y bosque nativo.\n• Llegada a El Bolsón.\n• Tiempo libre para recorrer el centro, conocer comercios locales y visitar la Feria Regional de Artesanos, según día y horario de funcionamiento.\n• Tiempo libre para almorzar o disfrutar productos regionales.\n• Traslado hacia Lago Puelo.\n• Visita al área del Parque Nacional Lago Puelo y tiempo para disfrutar del paisaje.\n• Regreso a Bariloche por la tarde.\n• El orden de las paradas y los tiempos puede variar por razones climáticas, de tránsito u operativas.\n• El Bolsón y Lago Puelo\n\nRECOMENDACIONES:\n• Usar calzado cómodo y ropa adecuada al clima.\n• Llevar abrigo y una campera impermeable; las condiciones pueden variar durante el recorrido.\n• Llevar agua, protector solar, anteojos de sol y cámara fotográfica.\n• Llevar dinero o un medio de pago para almuerzo, ingreso al Parque Nacional y consumos personales.\n• Consultar previamente los días y horarios de la Feria Regional de Artesanos.\n• La excursión está sujeta a las condiciones climáticas y al estado de las rutas.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: día completo.\n• Modalidad: servicio regular o privado.\n• Temporada: todo el año, sujeta a condiciones climáticas y de acceso.\n• Dificultad: baja.\n• Actividad física: baja, con caminatas cortas y opcionales.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.",
    "faq": [
      {
        "question": "Cuales son los horarios de la excursión?",
        "answer": "Sale a las 08:30 am y regresa 18:00 pm"
      },
      {
        "question": "Opera todo el año ?",
        "answer": "Si, opera todo el año"
      },
      {
        "question": "Opera todos los dias ?",
        "answer": "No, opera Jueves y Sabados"
      },
      {
        "question": "Cuantos kilómetros se recorren en total ?",
        "answer": "Se recorren aproximadamente 250  kmts en el día"
      },
      {
        "question": "Incluye almuerzo ?",
        "answer": "No, no incluye almuerzo"
      },
      {
        "question": "Se visita el Lago Puelo ?",
        "answer": "Si, se visita"
      },
      {
        "question": "Esta incluida la entrada al Parque Nacional Lago Puelo ?",
        "answer": "No , No está Incluida"
      }
    ],
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 6
  },
  {
    "id": "el-refugio",
    "title": "Refugio Arelauquen — 4x4, Moto de Nieve y Cena",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/el-refugio.webp",
    "description": "Viví una noche de aventura en el entorno nevado de Arelauquen. Ascendé en vehículos 4x4, recorré senderos invernales en moto de nieve y disfrutá una cena en un refugio de montaña rodeado de bosque y Cordillera.",
    "fullDetails": "Refugio Arelauquen combina tres momentos inolvidables en una misma experiencia: un ascenso en vehículos 4x4, una travesía guiada en moto de nieve y una cena en un refugio de montaña.\n\nLa aventura comienza con el ascenso en 4x4 por caminos de nieve y bosque, una forma diferente de ingresar al entorno andino de Arelauquen. Al llegar al punto de partida de la travesía, recibirás las indicaciones de seguridad y conducción antes de subir a la moto de nieve.\n\nCada vehículo es compartido por dos pasajeros. Acompañado por guías especializados, recorrerás senderos nevados entre lengas y paisajes invernales hasta llegar al refugio. Allí podrás relajarte, disfrutar del ambiente cálido del interior y compartir una cena en plena naturaleza.\n\nEs una propuesta ideal para quienes buscan una experiencia nocturna completa, con aventura, nieve y gastronomía patagónica.",
    "highlights": [
      "Ascenderás en vehículos 4x4 por caminos de nieve.",
      "Recibirás instrucciones de seguridad y conducción.",
      "Realizarás una travesía guiada en moto de nieve.",
      "Compartirás una moto de nieve con otro pasajero.",
      "Recorrerás bosques nevados y paisajes del entorno de Arelauquen.",
      "Disfrutarás una cena en un refugio de montaña."
    ],
    "includes": [
      "Ascenso en vehículos 4x4.",
      "Travesía guiada en moto de nieve.",
      "Una moto de nieve doble cada dos pasajeros.",
      "Instrucciones de seguridad y conducción.",
      "Guías especializados durante la actividad.",
      "Cena en refugio de montaña."
    ],
    "notIncludes": [
      "Traslados desde o hacia el complejo, salvo que se indiquen expresamente al momento de reservar.",
      "Bebidas no especificadas dentro de la cena.",
      "Indumentaria de nieve, salvo que se indique expresamente.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Presentación en el punto de encuentro del complejo.\n• Recepción e inicio del ascenso en vehículos 4x4.\n• Llegada al punto de partida de la travesía.\n• Charla de seguridad, asignación de motos e inicio del recorrido guiado.\n• Llegada al refugio de montaña.\n• Cena y tiempo para disfrutar del entorno.\n• Regreso al punto de partida según el circuito operativo.\n• El orden de las actividades puede variar por condiciones de nieve, clima y operación del complejo.\n• Refugio Arelauquen 4x4 Moto de Nieve y Cena\n\nRECOMENDACIONES:\n• Usar ropa de abrigo, campera impermeable, guantes, gorro y calzado apto para nieve.\n• Informar con anticipación alergias, restricciones alimentarias o dietas especiales.\n• Consultar previamente si el servicio incluye indumentaria de nieve o traslados.\n• Seguir siempre las indicaciones de los guías.\n• La actividad está sujeta a las condiciones de nieve, clima y operación del complejo.\n• La conducción de la moto de nieve se realiza bajo las condiciones y requisitos establecidos por el prestador.\n\nDATOS DE LA EXPERIENCIA:\n• Temporada: invierno, sujeta a condiciones de nieve.\n• Ubicación: Arelauquen, Bariloche.\n• Actividad física: baja a moderada.\n• Dificultad: baja; no se requiere experiencia previa.\n• Vehículo: moto de nieve doble, compartida por dos pasajeros.\n• Público recomendado: parejas, grupos de amigos, familias y viajeros que buscan una experiencia de nieve completa.",
    "faq": [
      {
        "question": "¿Incluye comida?",
        "answer": "Si, la cena está incluida en la tarifa"
      },
      {
        "question": "¿Se suspende por lluvia?",
        "answer": "No"
      }
    ],
    "recommendedFor": "parejas, grupos de amigos, familias y viajeros que buscan una experiencia de nieve completa.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 52
  },
  {
    "id": "free-walking-tour",
    "title": "Walking Tour Bariloche · Historia, Arquitectura y Lago Nahuel Huapi",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "2 horas",
    "difficulty": "Fácil",
    "image": "/images/excursiones/free-walking-tour.webp",
    "description": "Descubrí Bariloche caminando por las calles de su casco histórico. Un recorrido guiado que combina historia, arquitectura y paisajes para conocer la esencia de la Joya de la Patagonia.",
    "fullDetails": "Conocé Bariloche desde una mirada local en una caminata guiada por los rincones más emblemáticos de su centro histórico. Durante dos horas recorreremos el Centro Cívico, la Catedral Nuestra Señora del Nahuel Huapi, la tradicional calle Mitre y la costanera del lago Nahuel Huapi, descubriendo las historias, personajes y curiosidades que dieron identidad a la ciudad.\n\nA lo largo del recorrido, un guía profesional compartirá la evolución de Bariloche, su arquitectura de inspiración alpina, el desarrollo del montañismo, la cultura patagónica y los secretos que muchas veces pasan desapercibidos para quienes la visitan por primera vez.\n\nLa experiencia finaliza junto al lago, con una de las postales más representativas de la Patagonia y recomendaciones personalizadas para seguir disfrutando Bariloche.",
    "highlights": [
      "Recorrido guiado por el casco histórico de Bariloche.",
      "Centro Cívico, Calle Mitre, Iglesia Catedral y costanera del Lago Nahuel Huapi.",
      "Historia, arquitectura y cultura local contadas por un guía profesional.",
      "Ideal para comenzar tu viaje y descubrir la ciudad desde otra perspectiva."
    ],
    "includes": [
      "Guía profesional",
      "Caminata guiada de aproximadamente 2 horas",
      "Recomendaciones gastronómicas y culturales"
    ],
    "notIncludes": [
      "Comidas y bebidas",
      "Traslado al punto de encuentro",
      "Gastos personales"
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Centro Cívico\n• Historia fundacional y arquitectura patagónica.\n• Calle Mitre\n• Vida local, chocolaterías y patrimonio urbano.\n• Catedral\n• Uno de los edificios más emblemáticos de la ciudad.\n• Lago Nahuel Huapi\n• Miradores, fotografías y recomendaciones locales.\n• Walking Tour Bariloche Historia Arquitectura y Lago Nahuel Huapi\n\nDATOS DE LA EXPERIENCIA:\n• Duración: 2 horas\n• Modalidad: Caminata guiada\n• Salidas: 10:15 y 17:45\n• Dificultad: Baja\n• Ideal para: Primer día en Bariloche\n• Punto de encuentro: Av. San Martín 398",
    "faq": [
      {
        "question": "En qué momento del año se puede realizar ?",
        "answer": "Este paseo se realiza todo el año"
      },
      {
        "question": "Opera todos los días ?",
        "answer": "Opera de lunes a sábados."
      },
      {
        "question": "Cuales son horarios de la excursión ?",
        "answer": "Los horarios son 09:45hs. a 12:30 hs  y de 17:45 a 20:00 hs"
      },
      {
        "question": "de donde sale el paseo ?",
        "answer": "El paseo comienza en los locales de nuestra empresa en San Martin 398 y Urquiza 276"
      },
      {
        "question": "¿Que debo llevar a la excursión?",
        "answer": "Ropa adecuada al clima reinante y calzado cómodo"
      },
      {
        "question": "Cuanto dura la caminata?",
        "answer": "La caminata tiene una distancia de 3500 mts., con subidas, bajadas por las calles de la ciudad con una duración de 02 horas y 30 minutos"
      },
      {
        "question": "Incluye alguna comida o snacks ?",
        "answer": "No , No incluye"
      },
      {
        "question": "La excursión se suspende por condiciones climáticas?",
        "answer": "Si, esta excursión puede suspenderse con antelación o sobre la partida por condiciones climáticas adversa"
      },
      {
        "question": "Pueden concurrir personas con discapacidad motrices?",
        "answer": "Lamentablemente el recorrido se realiza por calles de la ciudad que tienen marcados desniveles y escaleras, las cuales no son están muy preparadas para personas con discapacidad, pero si los acompañantes consideran que lo pueden realizar no hay ninguna restricción de nuestra parte"
      },
      {
        "question": "Se puede llevar cámaras fotográficas?",
        "answer": "Sí, se puede, hay lugares muy lindos para fotografiar"
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "12:30 hs",
    "priceNum": 0
  },
  {
    "id": "isla-victoria-y-bosque-de-arrayanes",
    "title": "Isla Victoria y Bosque de Arrayanes",
    "category": "Navegación",
    "season": "Todo el Año",
    "duration": "día completo.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/isla-victoria-y-bosque-de-arrayanes.webp",
    "description": "Navegá por el lago Nahuel Huapi y descubrí dos de los paisajes más encantadores de Bariloche: Isla Victoria y el Bosque de Arrayanes. Una experiencia de día completo que combina navegación, senderos de baja dificultad y bosques únicos de la Patagonia.",
    "fullDetails": "Isla Victoria y Bosque de Arrayanes es una de las excursiones lacustres más tradicionales y fascinantes de Bariloche. La experiencia comienza con una navegación desde Puerto Pañuelo por las aguas del lago Nahuel Huapi, rodeado de montañas, bosques y paisajes del Parque Nacional.\n\nLa primera parte de la jornada permite descubrir Isla Victoria, una isla de gran valor natural e histórico. Allí podrás recorrer senderos de bosque, contemplar el lago desde distintos puntos y disfrutar del paisaje patagónico en un entorno tranquilo y protegido.\n\nLa navegación continúa hacia la península de Quetrihue, donde se encuentra el Bosque de Arrayanes. Este bosque es uno de los pocos del mundo con ejemplares de arrayán de gran tamaño y antigüedad, reconocibles por su corteza color canela y su aspecto singular. Una caminata suave por sus senderos permite apreciar de cerca este paisaje único.\n\nEs una excursión ideal para quienes desean combinar navegación, naturaleza y caminatas accesibles, disfrutando una jornada diferente en el corazón del Parque Nacional Nahuel Huapi.",
    "highlights": [
      "Navegarás por el lago Nahuel Huapi desde Puerto Pañuelo.",
      "Descubrirás los paisajes de Isla Victoria.",
      "Recorrerás senderos de bosque de baja dificultad.",
      "Visitarás la península de Quetrihue.",
      "Caminarás por el Bosque de Arrayanes, uno de los más singulares de la Patagonia.",
      "Disfrutarás vistas del lago, las montañas y la naturaleza del Parque Nacional."
    ],
    "includes": [
      "Navegación por el lago Nahuel Huapi.",
      "Visita a Isla Victoria.",
      "Visita al Bosque de Arrayanes.",
      "Guía durante la excursión.",
      "Caminatas por senderos habilitados."
    ],
    "notIncludes": [
      "Traslado desde o hacia el hotel, salvo que se contrate expresamente.",
      "Entrada al Parque Nacional Nahuel Huapi.",
      "Tasa de embarque.",
      "Comidas y bebidas.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Presentación en Puerto Pañuelo y embarque.\n• Navegación por el lago Nahuel Huapi con vistas de la península Llao Llao y el paisaje montañoso de la región.\n• Desembarco en Isla Victoria y tiempo para recorrer senderos habilitados, según el circuito operativo del día.\n• Navegación hacia la península de Quetrihue.\n• Desembarco y caminata por los senderos del Bosque de Arrayanes.\n• Tiempo para tomar fotografías y disfrutar del entorno.\n• Navegación de regreso a Puerto Pañuelo.\n• El orden de los desembarcos, senderos y tiempos puede variar por razones climáticas, de navegación u operativas.\n• Isla Victoria y Bosque de Arrayanes\n\nRECOMENDACIONES:\n• Usar calzado cómodo y cerrado, apto para caminar por senderos.\n• Llevar abrigo, campera impermeable y ropa adecuada al clima.\n• Llevar agua, protector solar, anteojos de sol y cámara fotográfica.\n• Llevar dinero o un medio de pago para el ingreso al Parque Nacional, la tasa de embarque y consumos personales.\n• Llegar con anticipación al puerto para realizar el embarque.\n• La excursión depende de las condiciones climáticas y de navegación.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: día completo.\n• Modalidad: navegación regular o privada.\n• Temporada: todo el año, sujeta a condiciones de navegación.\n• Dificultad: baja.\n• Actividad física: baja, con caminatas suaves por senderos.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.",
    "faq": [
      {
        "question": "Opera todo el año ?",
        "answer": "Si, opera todo el año"
      },
      {
        "question": "Opera todos los dias ?",
        "answer": "Si, opera todos los días"
      },
      {
        "question": "Cuales son horarios de la excursión desde Puerto Pañuelo?",
        "answer": "Existen dos horarios diferentes : \nTemporada Alta (Verano e Invierno) \nDesde Puerto Pañuelo sale a las 10:30hs regresa 17:00 y 13:30hs regresa 18:30 hs\nDesde el centro sale a las 09:00hs regresa 18:00 PM y 12:30hs regresa 19:30 hs\nTemporada Baja ( Otoño y Prmavera) \nDesde Puerto Pañuelo sale a las 11:45hs regresa 18:30 PM y 13:30hs regresa 18:30 hs\nDesde el centro sale a las 10:30hs regresa 18:00 PM y 12:30hs regresa 19:30 hs"
      },
      {
        "question": "Por qué existen precios con y sin traslado al puerto?",
        "answer": "Las embarcaciones parte de Puerto Pañuelo que queda a 25 km de la ciudad, si no posees movilidad propia te recomendamos reservar el TICKET DE NAVEGACIÓN CON TRASLADO A PUERTO. También existe un colectivo de línea que va hasta el Puerto."
      },
      {
        "question": "Por qué existen 2 horarios y cuál es la diferencia entre ambos?",
        "answer": "El recorrido en ambos casos es exactamente el mismo, la diferencia es que la salida más temprana te da un tiempo libre extra de permanencia en la Isla Victoria"
      },
      {
        "question": "Incluye almuerzo ?",
        "answer": "No, no incluye almuerzo"
      },
      {
        "question": "Existe la posibilidad de comprar alimento ó llevar vianda?",
        "answer": "Si, las embarcaciones ofrecen algunas opciones básicas al igual que los lugares que visitas (Isla Victoria y Bosque de los Arrayanes) además podes llevar tu propia vianda."
      },
      {
        "question": "Qué dificultad y duración tienen las caminatas?",
        "answer": "La excursión es para todo público, en el Bosque la caminata dura unos 30 minutos por un sendero escalonado y en la Isla Victoria es de aproximadamente 1 hora , ambas son de baja dificultad"
      },
      {
        "question": "La excursión se suspende por lluvia ò nieve?",
        "answer": "La excursión se realiza con todo tipo de clima, las lluvias, nieve y los intensos vientos son muy comunes en la Patagonia."
      },
      {
        "question": "En qué embarcación se realiza la navegación?",
        "answer": "Se puede realizar en Catamarán y/ò en el Barco Modesta Victoria"
      },
      {
        "question": "Qué costo tiene el Ingreso a Parques Nacionales y la tasa de embarque y donde se paga?",
        "answer": "Costo del Ingreso al Parque Nacional: $ 5500 (extranjeros)  $ 1500 (residentes nacionales)  \nMenores de 6 a 12 años: $1000. Menores hasta los 5 años y jubilados argentinos no abonan.\nCosto de la Tasa de Embarque : $ 1060.- pagan todos\nEl Ingreso al Parque y la tasa de embarque se abonan en el Puerto el día de la excursión, únicamente en efectivo."
      },
      {
        "question": "La tarifa de jubilado es solo para residentes Argentinos?",
        "answer": "Sí. La tarifa de jubilados es exclusiva para residentes Argentinos. La misma NO aplica para personas que residan en otros países aunque estas sean jubilados y pensionados. Se deberá presentar la credencial de jubilado al momento de embarque."
      }
    ],
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 6
  },
  {
    "id": "kayac-lago-gutierrez",
    "title": "Kayak en Lago Gutiérrez",
    "category": "Aventura",
    "season": "Verano",
    "duration": "medio día.",
    "difficulty": "Moderado",
    "image": "/images/excursiones/kayac-lago-gutierrez.webp",
    "description": "Descubrí el Lago Gutiérrez desde el agua en una experiencia de kayak de medio día. Navegá rodeado de bosques y paisajes patagónicos, con instrucción previa, dos horas de actividad y merienda incluida.",
    "fullDetails": "Viví una tarde diferente en el Lago Gutiérrez, uno de los espejos de agua más atractivos de Bariloche. La experiencia comienza con el traslado hacia el punto de inicio, donde recibirás una instrucción previa antes de salir a navegar.\n\nDurante dos horas, recorrerás el lago en kayak y podrás disfrutar del entorno desde una perspectiva única: el agua, los bosques de la costa y las vistas que ofrece este rincón de la Patagonia. No se trata solo de una actividad deportiva, sino de una forma tranquila y cercana de conectar con el paisaje.\n\nAl finalizar la navegación, disfrutarás de una merienda antes del regreso a Bariloche. Es una propuesta ideal para quienes buscan combinar actividad al aire libre, naturaleza y un momento de desconexión durante la tarde.",
    "highlights": [
      "Navegarás en kayak por el Lago Gutiérrez.",
      "Recibirás una instrucción previa antes de comenzar.",
      "Disfrutarás dos horas de actividad en el agua.",
      "Compartirás una merienda al finalizar la experiencia."
    ],
    "includes": [
      "Traslado ida y vuelta.",
      "Instrucción previa a la actividad.",
      "Dos horas de navegación en kayak.",
      "Merienda."
    ],
    "notIncludes": [
      "Servicios no detallados expresamente como incluidos.",
      "Gastos personales."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Traslado hacia Lago Gutiérrez.\n• Instrucción previa.\n• Navegación en kayak.\n• Merienda.\n• Regreso a Bariloche.\n• Kayak en Lago Gutiérrez\n\nRECOMENDACIONES:\n• Llevar ropa cómoda y adecuada para actividades al aire libre.\n• Se recomienda llevar abrigo liviano, protección solar y una muda de ropa.\n• Seguir siempre las indicaciones del equipo a cargo.\n• La actividad puede modificarse o reprogramarse según las condiciones climáticas y del lago.\n\nDATOS DE LA EXPERIENCIA:\n• Modalidad: kayak en lago.\n• Duración: medio día.\n• Horario estimado: de 13 a 17 h.\n• Tiempo de navegación: 2 horas.\n• Ubicación: Lago Gutiérrez, Bariloche.\n• Temporada: primavera, verano y otoño, sujeta a condiciones climáticas.",
    "faq": [
      {
        "question": "Que debo llevar a la excursión?",
        "answer": "La vestimenta debe ser acorde a la época del año en que escojas hacer la travesía, siempre teniendo en cuenta de que puede refrescar y llover en cualquier estación del año. Vestirse con varias capas (como una cebolla). Recomendamos evitar el algodón, ya que al mojarse tarda mucho en secar y nos mantiene mojados, dándonos la sensación de frío. Un material ideal, aún mojado, como primera capa pegada al cuerpo, es la Lycra, el Polipropileno, Nylon, o Polyester."
      },
      {
        "question": "Es necesario tener experiencia previa?",
        "answer": "No, no es necesario tener experiencia en este paseo."
      },
      {
        "question": "Qué requisitos necesito para realizar una travesía?",
        "answer": "Necesitas un estado físico acorde a la actividad a realizar. Saber nadar (no es un requisito excluyente).Estar dispuesto a cumplir estrictamente las explicaciones de los guías y la mejor predisposición para vivir una aventura en la Patagonia\nP : Incluye alguna comida o snacks ?\nR : No incluye"
      },
      {
        "question": "La excursión se suspende por lluvia?",
        "answer": "No, no se suspende por lluvia"
      },
      {
        "question": "La excursión se puede suspender por vientos",
        "answer": "Depende las condiciones reinantes al momento de la salida, si son adversas para la navegación puede suspenderse por parte del organizador"
      },
      {
        "question": "Se puede llevar cámaras fotográficas?",
        "answer": "Sí, se puede, hay lugares muy lindos para fotografiar"
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 4
  },
  {
    "id": "motos-de-nieve",
    "title": "La Cueva — After Ski y Cena",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/motos-de-nieve.webp",
    "description": "Disfrutá una experiencia invernal en Cerro Catedral que combina una travesía guiada en moto de nieve y una propuesta gastronómica en La Cueva. Elegí entre el ambiente relajado del After Ski al atardecer o una cena nocturna de varios pasos en un refugio rodeado de nieve.",
    "fullDetails": "La Cueva propone dos maneras de disfrutar una experiencia diferente en Cerro Catedral: After Ski o Nocturno & Cena. Ambas combinan una travesía guiada en moto de nieve por un sector exclusivo del centro de ski con una propuesta gastronómica en un ambiente cálido y acogedor.\n\nLa experiencia comienza con el traslado hacia Cerro Catedral y la recepción en La Cueva. Luego de recibir las indicaciones de seguridad y conducción, se inicia el recorrido en moto de nieve por caminos nevados, bosques y paisajes de altura. Cada moto es compartida por dos pasajeros, siempre acompañados por guías especializados.\n\nEn la modalidad After Ski, la travesía se combina con una propuesta gastronómica para disfrutar el atardecer y el ambiente de la cordillera. En la opción Nocturno & Cena, el recorrido se realiza de noche y finaliza con una cena de varios pasos, inspirada en sabores regionales.\n\nEs una experiencia ideal para quienes quieren combinar nieve, aventura y gastronomía sin necesidad de practicar ski o snowboard.",
    "highlights": [
      "Te trasladarás desde Bariloche hacia Cerro Catedral.",
      "Recibirás indicaciones de seguridad y conducción.",
      "Realizarás una travesía guiada en moto de nieve.",
      "Recorrerás bosques y senderos nevados dentro de un sector exclusivo del centro de ski.",
      "Compartirás una moto de nieve con otro pasajero.",
      "Disfrutarás una propuesta gastronómica en La Cueva.",
      "Podrás elegir entre la modalidad After Ski o Nocturno & Cena."
    ],
    "includes": [
      "Traslado ida y vuelta entre Bariloche y Cerro Catedral.",
      "Travesía guiada en moto de nieve.",
      "Una moto de nieve doble cada dos pasajeros.",
      "Instrucciones de seguridad y conducción.",
      "Guías especializados durante la actividad.",
      "Propuesta gastronómica según la modalidad elegida.",
      "Cena de varios pasos en la modalidad Nocturno & Cena."
    ],
    "notIncludes": [
      "Indumentaria de nieve, salvo que se indique expresamente al momento de reservar.",
      "Bebidas no especificadas dentro de la propuesta gastronómica.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Traslado desde Bariloche hacia Cerro Catedral.\n• Recepción en La Cueva e indicaciones de seguridad.\n• Asignación de motos e inicio de la travesía guiada.\n• Recorrido por caminos nevados y bosques del centro de ski.\n• Regreso a La Cueva.\n• Propuesta gastronómica según la modalidad elegida: After Ski o Nocturno & Cena.\n• Traslado de regreso a Bariloche.\n• El orden de las actividades puede variar por condiciones climáticas, de nieve u operativas.\n• La Cueva After Ski y Cena\n\nTURNOS Y MODALIDADES:\n• After Ski\n• Una travesía guiada en moto de nieve seguida de una propuesta gastronómica en el living de La Cueva. Ideal para disfrutar de la tarde, el entorno nevado y los últimos colores del día en Cerro Catedral.\n• Nocturno & Cena\n• Una travesía guiada en moto de nieve por paisajes nocturnos de Cerro Catedral, seguida de una cena de varios pasos en La Cueva. Una propuesta pensada para vivir la nieve desde una perspectiva diferente, en un ambiente íntimo y cálido.\n\nRECOMENDACIONES:\n• Usar ropa de abrigo, campera impermeable, guantes, gorro y calzado apto para nieve.\n• Informar con anticipación alergias, restricciones alimentarias o dietas especiales.\n• Seguir en todo momento las indicaciones de los guías.\n• Consultar previamente qué indumentaria está incluida o disponible.\n• La actividad está sujeta a las condiciones de nieve, clima y operación del centro de ski.\n• La conducción de la moto de nieve se realiza bajo las condiciones y requisitos establecidos por el prestador.\n\nDATOS DE LA EXPERIENCIA:\n• Temporada: invierno, sujeta a condiciones de nieve.\n• Modalidades: After Ski y Nocturno & Cena.\n• Ubicación: Base de Cerro Catedral, Bariloche.\n• Actividad física: baja.\n• Dificultad: baja; no se requiere experiencia previa.\n• Vehículo: moto de nieve doble, compartida por dos pasajeros.\n• Público recomendado: parejas, grupos de amigos, familias y viajeros que buscan una experiencia invernal diferente.",
    "faq": [
      {
        "question": "¿Dónde se realiza la actividad?",
        "answer": "En el centro de ski Cerro Catedral."
      },
      {
        "question": "¿A partir de qué edad se permite conducir la moto?",
        "answer": "A partir de los 18 años en adelante"
      },
      {
        "question": "¿A partir de qué edad pueden realizar la actividad los niños?",
        "answer": "A partir de los 6 años"
      }
    ],
    "recommendedFor": "parejas, grupos de amigos, familias y viajeros que buscan una experiencia invernal diferente.",
    "departureTime": "10:00 hs",
    "priceNum": 22
  },
  {
    "id": "navegacion-en-brazo-tristeza",
    "title": "Navegaciòn en Brazo Tristeza",
    "category": "Navegación",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/navegacion-en-brazo-tristeza.webp",
    "description": "Travesía por el increíble y salvaje brazo Tristeza del lago Nahuel Huapi",
    "fullDetails": "Excursión de medio día Salidas:  10:00 hs \nNivel de Dificultad: Bajo - Medio La excursión comienza y termina en el Puerto Bahía López (Circuito Chico a 30 kmts de la ciudad) La partida se realiza desde el histórico puerto construido en 1929 y en 10 minutos de navegación nos internamos en el increíble y agreste paisaje del Brazo Tristeza, un profundo fiordo glaciario en el sector suroeste del lago Nahuel Huapi.  Las aguas del lago se aquietan, protegidas del viento por las escarpadas montañas, a medida que avanzamos nos reciben numerosas cascadas y el bosque va transformándose en selva, denominada “Valdiviana”, debido a la cantidad de precipitaciones que recibe el lugar\nPodremos realizar avistajes de numerosas especies de aves, inclusive es común ver majestuosos cóndores en las cimas de las montañas y ver como las laderas llegan de forma abrupta a las costas del lago donde podremos apreciar los surcos dejados por el paso de los glaciares. Si el clima lo permite, es posible observar el majestuoso Monte Tronador de 3450 metros, que se eleva sobre el paisaje con sus glaciares y nieves eternas.\nArribados al final del brazo, desembarcamos para realizar una sencilla caminata de 1500 mts, por un sendero agreste, con escasas subidas y bajadas, hasta llegar a la gran cascada del Arroyo Frey, sorprendente e increíble, en el corazón de la selva, un lugar idílico y de naturaleza imponente, muy apreciado por todos los que disfrutan de esta excursión. Luego de un generoso momento de contemplación, regresamos por el mismo camino, para embarcar y navegar de regreso.  \nLa embarcación “Kaiken Patagonia” es muy confortable y se logra un estrecho contacto entre la tripulación, guía y los asistentes.",
    "highlights": [
      "Salida desde Puerto Pañuelo Av.Bustillo kmt. 25,000)",
      "Navegación 01 hora por el Brazo Tristeza del Lago Nahuel Huapi",
      "Caminata al arroyo y cascada Frey ( 01:30 hs)"
    ],
    "includes": [
      "Navegación",
      "Caminata",
      "Guías"
    ],
    "notIncludes": [
      "Traslado a Puerto Pañuelo",
      "Almuerzo"
    ],
    "additionalInfo": "*Mayor $ 120.000.-\n*Menor $ 84.000.-\n*Jubilado $ 60.000.-\n*Ropa y Calzado Cómodo\n*Llevar: En verano traje de baño, Protector Solar, Campera ò Rompeviento, en invierno ropa de abrigo.",
    "faq": [
      {
        "question": "Que debo llevar a la excursión?",
        "answer": "Ropa, Calzado Cómodo, en verano: Traje de baño, Protector Solar, campera ò rompeviento y en invierno, ropa de abrigo"
      },
      {
        "question": "Cuanto dura la caminata?",
        "answer": "La caminata tiene una distancia de 1500 mts., ondulados y agreste con una duración de 01 hora de ida y 30 minutos al regreso\nP : Incluye alguna comida o snacks ?\nR : No , No incluye \nP : Hay algún lugar donde comprar el almuerzo ?\nR : No, recomendamos llevar su propio almuerzo"
      },
      {
        "question": "La excursión se suspende por condiciones climáticas?",
        "answer": "Si, esta excursión puede suspenderse con antelación o sobre la partida por condiciones adversas para la navegación"
      },
      {
        "question": "Las embarcaciones cuentan con seguros y habilitaciones correspondientes?",
        "answer": "Si, nuestro barco se encuentra con todas las habilitaciones correspondientes, tanto de Parques Nacionales como de Prefectura Naval Argentina.  Así mismo contamos con todos los seguros que requieren las autoridades."
      },
      {
        "question": "Pueden concurrir personas con discapacidad motrices?",
        "answer": "Lamentablemente las instalaciones portuarias como la embarcación y el\nsendero no están preparadas para personas con discapacidades motrices."
      },
      {
        "question": "Se puede llevar cámaras fotográficas?",
        "answer": "Sí, se puede, hay lugares muy lindos para fotografiar"
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 7
  },
  {
    "id": "piedras-blancas",
    "title": "Piedras Blancas — Trineos y Magic Carpet",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/piedras-blancas.webp",
    "description": "Disfrutá una jornada de nieve en Piedras Blancas, uno de los complejos invernales más tradicionales de Bariloche. El ingreso incluye ascensos para las pistas de trineo y para Magic Carpet, una propuesta ideal para compartir en familia y vivir la nieve de forma divertida.",
    "fullDetails": "Piedras Blancas es una experiencia de nieve pensada para quienes quieren disfrutar del invierno en Bariloche de una manera entretenida y accesible. El complejo cuenta con pistas especialmente preparadas para descender en trineo y sectores con Magic Carpet, un sistema de ascenso que permite volver cómodamente a las áreas de actividad.\n\nCon el ingreso tendrás acceso al complejo, cuatro ascensos para las pistas de trineo y dos ascensos en Magic Carpet. Es una propuesta ideal para familias, parejas y grupos que desean pasar tiempo en la nieve, jugar, deslizarse y disfrutar del entorno invernal sin necesidad de practicar ski o snowboard.\n\nEl traslado desde Bariloche puede contratarse como servicio adicional, con diferentes franjas horarias de ida y vuelta para adaptarse a la duración de tu visita.",
    "highlights": [
      "Ingresarás al complejo invernal Piedras Blancas.",
      "Disfrutarás cuatro ascensos para las pistas de trineo.",
      "Contarás con dos ascensos en Magic Carpet.",
      "Vivirás una actividad de nieve ideal para compartir en familia o con amigos.",
      "Podrás sumar el traslado ida y vuelta desde Bariloche como adicional."
    ],
    "includes": [
      "Entrada al complejo Piedras Blancas.",
      "Cuatro ascensos para trineo.",
      "Dos ascensos en Magic Carpet."
    ],
    "notIncludes": [
      "Traslado desde o hacia el complejo, salvo que se contrate como adicional.",
      "Comidas y bebidas.",
      "Indumentaria de nieve.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Piedras Blancas Trineos y Magic Carpet\n\nRECOMENDACIONES:\n• Usar ropa de abrigo, campera impermeable, guantes, gorro y calzado apto para nieve.\n• Consultar previamente la disponibilidad de indumentaria y equipamiento en el complejo.\n• Llegar con anticipación al horario de traslado o ingreso seleccionado.\n• Seguir siempre las indicaciones del personal del complejo.\n• La actividad está sujeta a condiciones de nieve, clima y operación.\n\nDATOS DE LA EXPERIENCIA:\n• Temporada: invierno, sujeta a condiciones de nieve.\n• Ubicación: Piedras Blancas, Bariloche.\n• Actividad física: baja.\n• Dificultad: baja.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.\n• Traslado: adicional opcional.",
    "faq": [
      {
        "question": "¿Incluye almuerzo?",
        "answer": "No, no incluye. El complejo cuenta con puntos gastronómicos"
      },
      {
        "question": "¿Se suspende por lluvia?",
        "answer": "No, no se suspende"
      },
      {
        "question": "¿Es necesaria la ropa de nieve?",
        "answer": "Si, ropa de nieve, abrigada e impermeable"
      }
    ],
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 9
  },
  {
    "id": "puerto-blest-y-cascada-de-los-cantaros",
    "title": "Puerto Blest y Cascada de los Cántaros",
    "category": "Navegación",
    "season": "Todo el Año",
    "duration": "día completo.",
    "difficulty": "Moderado",
    "image": "/images/excursiones/puerto-blest-y-cascada-de-los-cantaros.webp",
    "description": "Navegá por el lago Nahuel Huapi hasta Puerto Blest, uno de los rincones más verdes y espectaculares del Parque Nacional. Descubrí la Cascada de los Cántaros entre senderos de bosque y sumá, de manera opcional, la navegación por las aguas color esmeralda del Lago Frías.",
    "fullDetails": "Puerto Blest y Cascada de los Cántaros es una excursión lacustre de día completo que invita a descubrir uno de los sectores más húmedos, verdes y sorprendentes del Parque Nacional Nahuel Huapi. La experiencia comienza con una navegación desde Puerto Pañuelo por el brazo Blest del lago Nahuel Huapi, rodeado de montañas, bosques nativos y paisajes patagónicos.\n\nEl primer desembarco se realiza en Puerto Blest, un lugar de gran belleza natural ubicado al pie de la Cordillera de los Andes. Allí tendrás tiempo para recorrer el área, disfrutar del entorno y apreciar la vegetación característica de esta región.\n\nLa excursión continúa hacia la Cascada de los Cántaros, donde un sendero de bosque conduce junto al arroyo que alimenta la cascada. Durante la caminata podrás observar distintos saltos de agua, vegetación nativa y vistas del lago, hasta llegar al sector principal de la cascada. El recorrido incluye tramos con escaleras y desnivel moderado.\n\nDe manera opcional, podrás sumar una navegación por el Lago Frías, reconocido por el color turquesa de sus aguas, originado en los sedimentos de los glaciares del Cerro Tronador. Una experiencia ideal para combinar navegación, bosque, cascadas y paisajes de montaña en una jornada inolvidable.",
    "highlights": [
      "Navegarás por el brazo Blest del lago Nahuel Huapi.",
      "Desembarcarás en Puerto Blest, al pie de la Cordillera de los Andes.",
      "Recorrerás senderos rodeados de vegetación nativa.",
      "Visitarás la Cascada de los Cántaros y sus distintos saltos de agua.",
      "Disfrutarás vistas de lagos, bosques y montañas.",
      "Podrás sumar opcionalmente la navegación por el Lago Frías."
    ],
    "includes": [
      "Navegación por el lago Nahuel Huapi hacia Puerto Blest.",
      "Visita a Puerto Blest.",
      "Visita a la Cascada de los Cántaros.",
      "Guía durante la excursión.",
      "Caminata por senderos habilitados."
    ],
    "notIncludes": [
      "Traslado desde o hacia el hotel, salvo que se contrate expresamente.",
      "Entrada al Parque Nacional Nahuel Huapi.",
      "Tasa de embarque.",
      "Navegación por el Lago Frías.",
      "Comidas y bebidas.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Presentación en Puerto Pañuelo y embarque.\n• Navegación por el lago Nahuel Huapi hacia Puerto Blest.\n• Desembarco en Puerto Blest y tiempo para recorrer el área.\n• Navegación o traslado hacia el sector de la Cascada de los Cántaros, según el circuito operativo.\n• Caminata por el sendero de la cascada, con tiempo para disfrutar del bosque, los saltos de agua y las vistas.\n• Navegación opcional por el Lago Frías, sujeto a disponibilidad y condiciones operativas.\n• Navegación de regreso a Puerto Pañuelo.\n• El orden de los desembarcos, senderos y tiempos puede variar por razones climáticas, de navegación u operativas.\n• Puerto Blest y Cascada de los Cántaros\n\nRECOMENDACIONES:\n• Usar calzado cómodo, cerrado y con buena suela para caminar por senderos y escaleras.\n• Llevar abrigo, campera impermeable y ropa adecuada al clima.\n• Llevar agua, protector solar, anteojos de sol y cámara fotográfica.\n• Llevar dinero o un medio de pago para la entrada al Parque Nacional, la tasa de embarque, la navegación opcional por Lago Frías y consumos personales.\n• La caminata a la Cascada de los Cántaros incluye escaleras y tramos de desnivel moderado.\n• Llegar con anticipación al puerto para realizar el embarque.\n• La excursión depende de las condiciones climáticas y de navegación.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: día completo.\n• Modalidad: navegación regular o privada.\n• Temporada: todo el año, sujeta a condiciones de navegación.\n• Dificultad: baja a moderada.\n• Actividad física: moderada en el recorrido a la Cascada de los Cántaros.\n• Público recomendado: personas con movilidad suficiente para caminar por senderos y subir escaleras.\n• Navegación por Lago Frías: opcional y abonada por separado.",
    "faq": [
      {
        "question": "Opera todo el año ?",
        "answer": "Si, opera todo el año"
      },
      {
        "question": "Opera todos los dias ?",
        "answer": "Si, opera todos los días"
      },
      {
        "question": "Cuales son horarios de la excursión desde Puerto Pañuelo?",
        "answer": "Existen dos horarios diferentes : \nTemporada Alta (Verano e Invierno) \nDesde Puerto Pañuelo sale a las 09:30hs regresa 17:00 y sale 12:30hs regresa 19:30 hs\nDesde el centro sale a las 08:30hs regresa 18:00 PM y sale 11:30hs regresa 20:30 hs\nTemporada Baja ( Otoño y Primavera) \nDesde Puerto Pañuelo sale a las 09:30hs regresa 18:00\nDesde el centro sale a las 08:30hs regresa 18:30"
      },
      {
        "question": "Por qué existen precios con y sin traslado al puerto?",
        "answer": "Las embarcaciones parte de Puerto Pañuelo que queda a 25 km de la ciudad, si no posees movilidad propia te recomendamos reservar el TICKET DE NAVEGACIÓN CON TRASLADO A PUERTO. También existe un colectivo de línea que va hasta el Puerto."
      },
      {
        "question": "Por qué existen 2 horarios y cuál es la diferencia entre ambos?",
        "answer": "El recorrido en ambos casos es exactamente el mismo"
      },
      {
        "question": "Incluye almuerzo ?",
        "answer": "No, no incluye almuerzo"
      },
      {
        "question": "Existe la posibilidad de comprar alimento ó llevar vianda?",
        "answer": "Si, la embarcación ofrece algunas opciones básicas , la Hosteria cuenta con Snack Bar , restaurante y  además se puede  llevar su propia vianda."
      },
      {
        "question": "Qué dificultad y duración tienen las caminatas?",
        "answer": "La excursión es para todo público, La caminata a la Cascada de los Cantaros dura unos 45 minutos por un sendero escalonado, si bien el trayecto cuenta con unos 700 escalones, hay 4 miradores en los que se puede ir parando y descansar un poco antes de seguir avanzando. Cada persona decide hasta donde caminar."
      },
      {
        "question": "La excursión se suspende por lluvia ò nieve?",
        "answer": "La excursión se realiza con todo tipo de clima, las lluvias, nieve y los intensos vientos son muy comunes en la Patagonia."
      },
      {
        "question": "En qué embarcación se realiza la navegación?",
        "answer": "Se realiza en Catamarán"
      },
      {
        "question": "Esta incluida la entrada al Parque Nacional y la tasa de Embarque ?",
        "answer": "No , No están Incluidas"
      },
      {
        "question": "Qué costo tiene el Ingreso a Parques Nacionales y la tasa de embarque y donde se paga?",
        "answer": "Costo del Ingreso al Parque Nacional: $ 15.000 (extranjeros)  $ 6.000 (residentes nacionales) Menores de 6 a 12 años: $ 3000. Menores hasta los 5 años y jubilados argentinos no abonan.\nCosto de la Tasa de Embarque : $ 1400.- pagan todos\nEl Ingreso al Parque y la tasa de embarque se abonan en el Puerto el día de la excursión, únicamente en efectivo."
      },
      {
        "question": "La tarifa de jubilado es solo para residentes Argentinos?",
        "answer": "Sí. La tarifa de jubilados es exclusiva para residentes Argentinos. La misma NO aplica para personas que residan en otros países aunque estas sean jubilados y pensionados. Se deberá presentar la credencial de jubilado al momento de embarque."
      }
    ],
    "recommendedFor": "personas con movilidad suficiente para caminar por senderos y subir escaleras.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 7
  },
  {
    "id": "rafting-rio-manso-al-limite",
    "title": "Rafting Rio Manso \" Al Limite\"",
    "category": "Aventura",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Moderado",
    "image": "/images/excursiones/rafting-rio-manso-al-limite.webp",
    "description": "Pura Adrenalina en los ríos de montaña, si buscas acción no te la podes perder!!!",
    "fullDetails": "Excursión de Todo el día Salida 08:30 hs Regreso 18:30 hs Nivel de Dificultad: Grado III – IV ( Medio /Alto) Este paseo se inicia en el hotel, con un traslado hacia el sur de Bariloche , de 60 kmts aproximadamente hasta el Valle del Manso Al llegar tomaremos un desayuno (Tostadas, café, té etc.), tendremos la charla técnica y luego de equiparnos, comienza la aventura!! Navegaremos 12km. por la sección del Manso inferior con rápidos potentes y emocionantes! Durante el recorrido podrás disfrutar de la belleza del cañón del Manso atravesando el cañón de terciopelo y 9 rápidos espectaculares, que nos harán sentir la fuerza de los rápidos, luego de unas 2hs. de navegación llegaremos al hito fronterizo con Chile, donde nos esperan para trasladarnos de regreso al punto de partida, donde podremos almorzar y disfrutar de las costas de este maravilloso rio. Al atardecer regresamos a Bariloche.",
    "highlights": [
      "Traslado al Rio Manso",
      "Desayuno",
      "Equipamento",
      "Charla Técnica",
      "Rafting",
      "Hito Limítrofe con Chile",
      "Guías Bilingües"
    ],
    "includes": [
      "Valor del Paseo $150.000 .- por persona",
      "Traslados",
      "Equipamiento",
      "Guías Bilingües",
      "Navegación"
    ],
    "notIncludes": [
      "Almuerzo",
      "Fotografía"
    ],
    "additionalInfo": "* Valor del Paseo $ 150.000\n*Ser mayor de 14 años\n*Saber Nadar\n*Tener  estado físico aceptable\n*Llevar  Documento de Identidad\n*Llevar Calzado que se pueda mojar (se navega con calzado) \n*Llevar Traje de Baño ò Short \n*Llevar Toalla\n*Llevar Protector Solar",
    "faq": [
      {
        "question": "Que debo llevar a la excursión?",
        "answer": "Se debe llevar, una muda de ropa completa, toalla, traje de baño y calzado que se pueda mojar (no está permitido ir descalzo). Documento de identidad o pasaporte."
      },
      {
        "question": "Es Seguro la navegación en las balsas?",
        "answer": "En el Manso a la frontera hay riesgos de ir al agua o que se dé vuelta la balsa, pero no va más allá de un chapuzón, ya que aquí tenemos Kayaks de apoyo que te rescatan inmediatamente."
      },
      {
        "question": "Es necesario tener experiencia previa?",
        "answer": "Recomendamos para la salida de rafting Manso a la frontera (clase III/IV) haber tenido una experiencia previa de navegación, sobre todo para tener una referencia de qué se trata, pero no es indispensable. \nP : Es necesario saber nadar ?\nR : Si, es una de las condiciones obligatorias\nP : Pueden ir menores de edad ?\nR : La edad mínima para realizar esta actividad son 14 años\nP : Incluye almuerzo ?\nR : No, no incluye almuerzo"
      },
      {
        "question": "Existe la posibilidad de comprar alimentos o llevar vianda?",
        "answer": "Si, en nuestro campamento base existe un bar - restaurant donde poder almorzar y  además podes llevar tu propia vianda."
      },
      {
        "question": "La excursión se suspende por lluvia?",
        "answer": "Las excursiones de rafting están pensadas para poder efectuarse aún con lluvia, dado que los equipos (trajes de neoprene y/o chaquetas impermeables según corresponda) sirven para resguardar del agua a los clientes (sea del río o de lluvia) cuando están navegando en el río"
      },
      {
        "question": "Se puede llevar cámaras fotográficas?",
        "answer": "Sí, se puede, durante el camino hay lugares muy lindos para fotografiar y en la balsa se colocan en bolsas secas, si no te animás la dejas en el vehículo. De todas maneras tenemos servicio de fotografía."
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 14
  },
  {
    "id": "rafting-rio-manso-desde-villegas",
    "title": "Rafting Rio Manso desde Villegas \"",
    "category": "Aventura",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Moderado",
    "image": "/images/excursiones/rafting-rio-manso-desde-villegas.webp",
    "description": "Es la excursión de Rafting más divertida para todas las edades !!!",
    "fullDetails": "Excursión de Todo el día Salida 9:00-14:00 o 11:30-17:00Nivel de Dificultad: Grado II – III (Bajo /Medio) Partiendo desde Bariloche nos dirigimos por la ruta 40 hacia el sur hasta llegar al Paraje Villegas. Este recorrido implica 70 km aproximadamente de ruta asfaltada, trayecto en el que podrás ir disfrutando del paisaje de lagos y montañas.Al llegar al paraje será necesario desviarse por camino de ripio durante 1,5km hasta el punto de embarque. Allí los guías te proveerán del equipamiento necesario para realizar la excursión. Una vez equipado recibirás las instrucciones y la charla de seguridad para luego subirte a la balsa donde comienza la diversión!Banda de Billar, Diente de Hipopótamo, Montaña Rusa y Roca Magnética son algunos de los rápidos que navegaremos durante los 6 km de recorrido.\nEl escenario que nos rodeara es fascinante: aguas cristalinas, pozones, bosques frondosos, montañas….\nAl llegar al valle del Manso Inferior finalizaremos la navegación desembarcando en el campo de la Familia Lanfré donde podrás secarte y cambiarte antes de compartir un refrigerio. Finalmente emprenderemos el regreso a Bariloche con una nueva anécdota de vacaciones.",
    "highlights": [
      "Valor $95.000.- por persona",
      "Traslado al Rio Villegas",
      "Equipamiento",
      "Charla Técnica",
      "Rafting por el rio Manso"
    ],
    "includes": [
      "Traslados",
      "Equipamiento",
      "Guías Bilingües",
      "Navegación"
    ],
    "notIncludes": [
      "Servicio  Fotografía"
    ],
    "additionalInfo": "* Valor $95.000.- por persona\n*Ser mayor de 05 años\n*Llevar  Documento de Identidad\n*Llevar Calzado que se pueda mojar (se navega con calzado) \n*Llevar Traje de Baño ò Short \n*Llevar Toalla\n*Llevar Protector Solar",
    "faq": [
      {
        "question": "Que debo llevar a la excursión?",
        "answer": "Se debe llevar, una muda de ropa completa, toalla, traje de baño y calzado que se pueda mojar (no está permitido ir descalzo). Documento de identidad o pasaporte."
      },
      {
        "question": "Es Seguro la navegación en las balsas?",
        "answer": "Si es seguro, van niños a partir de los 5 años de edad aproximadamente y nos acompaña kayak de seguridad en todo el recorrido"
      },
      {
        "question": "Es necesario tener experiencia previa?",
        "answer": "No, este paseo es  ideal para principiantes y para aquellos que aún no tomaron confianza.\nP : Es necesario saber nadar ?\nR : No , no es necesario"
      },
      {
        "question": "La excursión se suspende por lluvia?",
        "answer": "Las excursiones de rafting están pensadas para poder efectuarse aún con lluvia, dado que los equipos (trajes de neoprene y/o chaquetas impermeables según corresponda) sirven para resguardar del agua a los clientes (sea del río o de lluvia) cuando están navegando en el río"
      },
      {
        "question": "Se puede llevar cámaras fotográficas?",
        "answer": "Sí, se puede, durante el camino hay lugares muy lindos para fotografiar y en la balsa se colocan en bolsas secas, si no te animás la dejas en el vehículo. De todas maneras tenemos servicio de fotografía."
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 12
  },
  {
    "id": "ski-nordico",
    "title": "Día de Ski Nórdico en Cerro Otto",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/ski-nordico.webp",
    "description": "Descubrí el esquí de fondo en un entorno de bosque nevado, a pocos kilómetros del centro de Bariloche. Recibí una clase grupal, el equipo completo y acceso a las pistas para disfrutar una jornada diferente sobre la nieve.",
    "fullDetails": "Viví una experiencia de invierno distinta en el Centro de Ski Nórdico, ubicado en Cerro Otto, a solo 6 km del centro de Bariloche. Esta actividad propone iniciarse o disfrutar del esquí de fondo, una modalidad que permite desplazarse tanto en terrenos llanos como en suaves subidas y bajadas.\n\nAl llegar, recibirás el equipo completo —esquíes, botas y bastones— y participarás de una clase grupal con instructor. Durante aproximadamente 1 hora y 15 minutos aprenderás las técnicas iniciales, el manejo del equipo y las nociones necesarias para desplazarte con seguridad sobre la nieve.\n\nLuego de la clase, podrás continuar recorriendo las pistas preparadas hasta las 17 h. El circuito atraviesa un bosque de lengas y ofrece espacios para conectar con el paisaje invernal de Cerro Otto. Es una propuesta ideal para realizar en familia, con amigos o en pareja, tanto para quienes se acercan por primera vez a esta modalidad como para quienes desean seguir practicándola.",
    "highlights": [
      "Aprenderás los fundamentos del esquí de fondo con un instructor.",
      "Recibirás el equipo completo para realizar la actividad.",
      "Recorrerás pistas trazadas entre bosques nevados.",
      "Continuarás disfrutando de las pistas luego de la clase, hasta las 17 h."
    ],
    "includes": [
      "Equipo de ski nórdico: esquíes, botas y bastones.",
      "Clase grupal con instructor de aproximadamente 1 hora y 15 minutos.",
      "Derecho de uso de pistas hasta las 17 h."
    ],
    "notIncludes": [
      "Traslado al Centro de Ski Nórdico.",
      "Ropa de nieve.",
      "Lockers.",
      "Servicio de fotografía.",
      "Comidas y bebidas.",
      "Gastos personales."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Llegada al Centro de Ski Nórdico en Cerro Otto.\n• Entrega y ajuste de esquíes, botas y bastones.\n• Clase grupal de ski nórdico con instructor.\n• Recorrido acompañado por las pistas del bosque.\n• Tiempo libre para continuar utilizando las pistas hasta las 17 h.\n• Día de Ski Nórdico en Cerro Otto\n\nRECOMENDACIONES:\n• Actividad apta para mayores de 5 años.\n• No apta para mujeres embarazadas.\n• Llevar ropa adecuada para nieve, campera y pantalón impermeables, guantes, antiparras o lentes de sol y protector solar.\n• No se recomienda realizar la actividad con bolsos o mochilas pesadas, ya que pueden afectar la estabilidad.\n• El traslado puede contratarse de forma opcional, sujeto a disponibilidad.\n\nDATOS DE LA EXPERIENCIA:\n• Modalidad: ski nórdico o esquí de fondo.\n• Nivel: apto para principiantes y personas con experiencia previa.\n• Clase: grupal, no individual, de hasta 14 participantes.\n• Duración de la clase: aproximadamente 1 hora y 15 minutos.\n• Ubicación: Cerro Otto, a 6 km del centro de Bariloche.\n• Temporada: invierno, sujeta a condiciones de nieve.",
    "faq": [
      {
        "question": "¿QUÉ INCLUYE?",
        "answer": "El día de Ski Nórdico incluye una clase grupal de 1:30hs de duración con un instructor capacitado, botas, bastones y esquíes, y luego pase a pista."
      },
      {
        "question": "¿QUÉ INCLUYE EL PASEO EN CUATRICICLOS?",
        "answer": "Un paseo en cuadriciclos guiado por el bosque, de aproximadamente 40 minutos de duración, haciendo paradas para sacarse fotos en miradores con hermosas vistas."
      },
      {
        "question": "¿INCLUYE ROPA DE NIEVE?",
        "answer": "No, la ropa de nieve debe conseguirla el pasajero por su cuenta. Se recomienda llevar guantes, gorro, calzado impermeable, antiparras, campera y pantalón impermeables."
      },
      {
        "question": "EDAD MÍNIMA PARA CONDUCIR",
        "answer": "Los vehículos sólo pueden ser conducidos por mayores de 18 años, y sólo niños mayores a 6 años pueden ir de acompañantes en los mismos."
      },
      {
        "question": "CAPACIDAD DE LOS CUATRICICLOS",
        "answer": "Las unidades son para dos personas. En caso de contratar para una persona, deberá abonar el vehículo entero."
      },
      {
        "question": "SOBRE EL TRANSPORTE",
        "answer": "El rango de búsqueda deL transporte abarca hasta el KM 11 de Avenida de los Pioneros y Avenida Bustillo."
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 16
  },
  {
    "id": "teleferico-cerro-otto",
    "title": "Teleferico Cerro Otto",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/teleferico-cerro-otto.webp",
    "description": "En Complejo Turístico Teleférico Cerro Otto los amantes de la naturaleza encontrarán incontables razones para pasar un día inolvidable.\nDiversión, Aventura, Naturaleza y Cultura para Todos.",
    "fullDetails": "Confitería Giratoria:\nA 1.405 metros de altura s.n.m., la exclusiva Confitería gira en un radio de 360° en un tiempo de 20 o 40 minutos (sus dos velocidades pre establecidas) y a una velocidad casi imperceptible, mientras los pasajeros degustan alguna de las variadas opciones gastronómicas, al tiempo que se maravillan con una postal única y fascinante de todo el Parque Nacional Nahuel Huapi. Lleno de incomparables tesoros para los sentidos, el lugar ofrece a los visitantes imponentes espectáculos naturales los 365 días del año. Cada estación con su encanto particular y variadas actividades para la familia, convierten a este complejo en la excursión tradicional por excelencia de San Carlos de Bariloche.\nMontañas; lagos; bosques y cielos increíbles hacen de este lugar un verdadero paraíso terrenal.Sus actividades, diferentes según la época del año, permiten además divertirse en perfecta armonía con la naturaleza.\nTeleférico:\nAscenso confortable en cualquier época\nEstación Inferior: a 800 m.s.n.m., en el km 5,000 de Av. De los Pioneros.\nEstación Superior: a 1.405 m.s.n.m., en la cima del Cerro Otto. Este medio de elevación cubre el recorrido desde la Estación Inferior (a 800 m.s.n.m.), hasta la Estación Superior, ubicada en la cima del Cerro Otto (a 1.405 m.s.n.m.), sobre una distancia de 2.100 m., a una velocidad de 3 m./segundo aproximadamente, pudiendo transportar hasta 500 pasajeros/hora. Incomparables imágenes del entorno natural y del Lago Nahuel Huapi\nEl Deck Panorámico es uno de los espacios más visitados por los turistas, ya que desde el mismo se cuenta con una espectacular vista hacia el sector sur del lago Nahuel Huapi, la estepa patagónica, los cerros Ñireco, Carbón y Ventana y a toda la ciudad de San Carlos de Bariloche, en su mejor imagen. Actividades: \nEn Teleférico Cerro Otto se puede disfrutar de distintas actividades tanto en el interior como en el exterior, muchas de ellas con el ticket de ascenso/descenso. En el Interior: Exclusiva Confitería Giratoria, donde degustar exquisita gastronomía durante todo el día; \nGalería de Arte con calcos exactos en tamaño original de las tres obras más importantes del artista italiano M.A. Buonarroti: El David, La Piedad y El Moisés; Otto House Music: Disco y Microcine, en donde se vive la noche más divertida pero de día y en la que se proyectan distintos documentales de la región, sobre la historia de Teleférico Cerro Otto y su propietaria la Fundación Sara María Furman; vistosos locales de Merchandising y Regionales.Rincón Homenaje al creador de esta gran obra: Don Boris Furman. En el Exterior: Pistas de trineos para deslizarse por la pendiente de la montaña en época invernal, o en vistosos inflables (Otto Kart) el resto del año; Funicular de la Cumbre, único medio de transporte en la cima de la montaña; Caminatas con raquetas para nieve o trekking cuando la nieve se retira; Circuito Otto:  Puente Colgante, Laberinto del Bosque, Cabaña de los Espejos Deformantes y caminata guiada; Deck y Terrazas Panorámicas donde poder disfrutar de las espectaculares vistas del entorno  natural.",
    "highlights": [
      "Traslados desde el centro de la ciudad",
      "Ascensos en Teleférico",
      "Acceso a la Confitería Giratoria",
      "Acceso a la galería de arte",
      "Actividades opcionales en la cumbre"
    ],
    "includes": [
      "Traslado sin cargo",
      "Ascenso en Teleférico"
    ],
    "notIncludes": [
      "Actividades opcionales en la cumbre",
      "Consumiciones en la confitería giratoria"
    ],
    "additionalInfo": "*Salidas todos los días con traslados desde el centro cada 40 minutos\nDe 10:00 hs. a 16:30 hs.\n*Llevar ropa y calzado cómodo. \n*Costo del Ascenso:  Mayores $40.000.- Menores $ 20.000.- (entre 06 a 12 años) Mayores de 65 años $ 20.000.-",
    "faq": [
      {
        "question": "Se puede realizar durante todo el año?",
        "answer": "Si, opera todo el año"
      },
      {
        "question": "El traslado desde el centro a la base tiene costo?",
        "answer": "No, no tiene ningún costo"
      },
      {
        "question": "Cual es el horario del traslado?",
        "answer": "Los traslados funcionan desde la 10:00 hasta las 16:30 hs, todos los días"
      },
      {
        "question": "Se suspende por mal tiempo?",
        "answer": "Si, si las condiciones climáticas no son óptimas se puede suspender en el momento"
      },
      {
        "question": "Lo pueden realizar personas con discapacidad motora?",
        "answer": "Personas con Discapacidad y/o que pudieren requerir algún tipo de asistencia especial.\nAscenso: las personas con Certificado de cualquier tipo de discapacidad, con menores de 6 años, con muletas, bastones, etc. y embarazo avanzado, podrán ascender y disfrutar de nuestro Complejo, siempre y cuando el funcionamiento del medio de elevación sea de forma NORMAL.\nPor decisión de la Fundación Sara María Furman, el ascenso de las personas con discapacidad, con certificado, es Gratuito.\nSiendo esta una excursión de montaña, con los riesgos inherentes a la misma, las personas con discapacidad deberán ascender con un acompañante mayor de edad que no tenga restricciones.\nLos acompañantes de las personas con discapacidad pagarán una tarifa con descuento de residente, y deberán firmar un formulario donde constan las normas aplicables\nLos menores de 16 años podrán ascender con un acompañante mayor de edad.\nPOR NORMAS DE LOS MEDIOS DE TRANSPORTE DE PERSONAS POR CABLE, y al sólo efecto de la seguridad de los usuarios, EL JEFE DE ESTACIÓN/OPERACIONES DEL MEDIO DE ELEVACIÓN, podrá limitar el ascenso DE PERSONAS, en función de la condición Técnica que OBSERVE de los mismos, en relación a la situación climática y de funcionamiento del medio de elevación."
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "10:00 hs",
    "priceNum": 2
  },
  {
    "id": "velero-el-orgulloso",
    "title": "Navegación en Velero por el Lago Nahuel Huapi (El Orgulloso)",
    "category": "Navegación",
    "season": "Todo el Año",
    "duration": "2 horas.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/velero-el-orgulloso.webp",
    "description": "Navegá por las aguas del Lago Nahuel Huapi en velero y descubrí Bariloche desde una perspectiva diferente. Una experiencia tranquila que combina paisajes, navegación y una merienda a bordo.",
    "fullDetails": "Viví una experiencia de navegación a vela desde Puerto Petunia, sobre las aguas del Lago Nahuel Huapi. La travesía recorre el Brazo Campanario, bordeando la península de San Pedro y disfrutando de vistas abiertas hacia la Cordillera de los Andes.\n\nDurante dos horas, el velero navega por sectores de lago abierto y bahías tranquilas, siempre de acuerdo con las condiciones climáticas. El recorrido permite apreciar el entorno natural de la costa de Bariloche, los bosques que rodean el lago y distintos puntos panorámicos de la zona.\n\nEn una pausa de la navegación, disfrutarás de una merienda a bordo. Es una propuesta ideal para quienes buscan conocer el Nahuel Huapi de una forma diferente, relajada y cercana a la naturaleza.",
    "highlights": [
      "Navegarás a vela por el Lago Nahuel Huapi.",
      "Recorrerás el Brazo Campanario.",
      "Disfrutarás vistas de la península de San Pedro y el entorno andino.",
      "Harás una pausa para compartir una merienda a bordo."
    ],
    "includes": [
      "Navegación en velero por el Lago Nahuel Huapi.",
      "Tripulación profesional.",
      "Merienda a bordo."
    ],
    "notIncludes": [
      "Traslado hasta Puerto Petunia.",
      "Gastos personales."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Encuentro en Puerto Petunia.\n• Embarque.\n• Navegación por Brazo Campanario.\n• Merienda a bordo.\n• Regreso a Puerto Petunia.\n• Navegación en Velero por el Lago Nahuel Huapi El Orgulloso\n\nRECOMENDACIONES:\n• Llevar ropa cómoda y abrigo o cortaviento.\n• Se recomienda protector solar, lentes de sol y gorro.\n• La navegación está sujeta a condiciones climáticas y de seguridad.\n\nDATOS DE LA EXPERIENCIA:\n• Modalidad: navegación a vela.\n• Duración: 2 horas.\n• Punto de salida: Puerto Petunia, Av. Bustillo km 13.500.\n• Ubicación: Lago Nahuel Huapi, Bariloche.\n• Traslado: no incluido.\n• Temporada: todo el año, sujeto a condiciones climáticas.",
    "faq": [
      {
        "question": "Que debo llevar a la excursión?",
        "answer": "Ropa, Calzado Cómodo, Traje de baño, Protector Solar, Campera ò Rompeviento"
      },
      {
        "question": "Es necesario tener experiencia previa?",
        "answer": "No, no es necesario tener experiencia en este paseo.\nP : Incluye alguna comida o snacks ?\nR : Si , incluye infusiones con Snacks"
      },
      {
        "question": "La excursión se suspende por condiciones climáticas?",
        "answer": "Si, esta excursión puede suspenderse con antelación o sobre la partida por condiciones adversas para la navegación"
      },
      {
        "question": "Las embarcaciones cuentan con seguros y habilitaciones correspondientes?",
        "answer": "Si, Nuestros barcos se encuentran con todas las habilitaciones correspondientes, tanto de Parques Nacionales como de Prefectura Naval Argentina.  Así mismo contamos con todos los seguros que requieren las autoridades."
      },
      {
        "question": "Que capacidad tiene el velero?",
        "answer": "06 Pasajeros y 02 Tripulantes \nP : Incluye alguna comida o snacks ?\nR : Si , incluye infusiones con Snacks"
      },
      {
        "question": "Se puede llevar cámaras fotográficas?",
        "answer": "Sí, se puede, hay lugares muy lindos para fotografiar"
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 6
  },
  {
    "id": "villa-la-angostura-y-cerro-bayo",
    "title": "Villa La Angostura y Cerro Bayo",
    "category": "Invierno",
    "season": "Todo el Año",
    "duration": "día completo.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/villa-la-angostura-y-cerro-bayo.webp",
    "description": "Conocé Villa La Angostura, uno de los pueblos de montaña más encantadores de la Patagonia, y descubrí los paisajes del Cerro Bayo. Una excursión de día completo entre lagos, bosques, arquitectura andina y vistas inolvidables de la Cordillera.",
    "fullDetails": "Villa La Angostura y Cerro Bayo es una excursión de día completo que combina paisajes patagónicos, pueblos de montaña y vistas de la Cordillera de los Andes. El recorrido parte desde Bariloche por la Ruta Nacional 40, bordeando el lago Nahuel Huapi y atravesando entornos de bosque nativo y montaña.\n\nAl llegar a Villa La Angostura, tendrás tiempo para conocer su centro, reconocido por su arquitectura, sus comercios, su gastronomía y su ambiente tranquilo. La localidad se encuentra rodeada de lagos, bosques y montañas, lo que la convierte en uno de los destinos más atractivos de la región.\n\nEl paseo continúa hacia Cerro Bayo, el centro de ski de Villa La Angostura. Allí podrás disfrutar del entorno, contemplar las vistas hacia el lago Nahuel Huapi y la Cordillera, y optar por ascender en los medios de elevación habilitados.\n\nEs una propuesta ideal para quienes desean descubrir la belleza de Villa La Angostura y vivir una experiencia de montaña durante su estadía en Bariloche.",
    "highlights": [
      "Recorrerás la Ruta Nacional 40 junto al lago Nahuel Huapi.",
      "Conocerás Villa La Angostura y su arquitectura de montaña.",
      "Tendrás tiempo libre para caminar por el centro y disfrutar de sus comercios o gastronomía.",
      "Visitarás Cerro Bayo, uno de los centros de ski  más reconocidos de la región.",
      "Disfrutarás paisajes de lagos, bosques y Cordillera.",
      "Podrás realizar opcionalmente un ascenso en medios de elevación habilitados."
    ],
    "includes": [
      "Traslado ida y vuelta desde Bariloche.",
      "Guía de turismo.",
      "Visita a Villa La Angostura.",
      "Tiempo libre en el centro de la localidad.",
      "Visita al área de Cerro Bayo."
    ],
    "notIncludes": [
      "Ascenso en medios de elevación en Cerro Bayo.",
      "Comidas y bebidas.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Salida desde Bariloche por la mañana.\n• Recorrido por la Ruta Nacional 40, con vistas del lago Nahuel Huapi y paisajes de montaña.\n• Llegada a Villa La Angostura.\n• Tiempo libre para recorrer el centro de la localidad, disfrutar de la gastronomía y conocer su arquitectura característica.\n• Traslado hacia Cerro Bayo.\n• Tiempo libre para disfrutar del paisaje de montaña y posibilidad de realizar el ascenso opcional en medios de elevación, sujeto a disponibilidad y condiciones operativas.\n• Regreso a Bariloche por la tarde.\n• El orden de las paradas y los tiempos puede variar por razones climáticas, de tránsito u operativas.\n• Villa La Angostura y Cerro Bayo\n\nRECOMENDACIONES:\n• Usar calzado cómodo y ropa adecuada al clima.\n• Llevar abrigo; las temperaturas pueden variar en la montaña.\n• Llevar agua, protector solar, anteojos de sol y cámara fotográfica.\n• Llevar dinero o un medio de pago para almuerzo y consumos personales.\n• Consultar previamente la disponibilidad de los medios de elevación en Cerro Bayo.\n• El ascenso es opcional y se abona por separado.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: día completo.\n• Modalidad: servicio regular o privado.\n• Temporada: de Junio a Septiembre\n• Dificultad: baja.\n• Actividad física: baja, con caminatas cortas y opcionales.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.",
    "faq": [
      {
        "question": "Cuales son los horarios de la excursión?",
        "answer": "Sale a las 08:30 am y regresa 18:00 pm"
      },
      {
        "question": "Opera todo el año?",
        "answer": "No, únicamente de Junio a Septiembre"
      },
      {
        "question": "Opera todos los días?",
        "answer": "Si, opera todos los días"
      },
      {
        "question": "Cuantos kilómetros se recorren en total ?",
        "answer": "Se recorren aproximadamente 200  kmts en el día"
      },
      {
        "question": "Incluye almuerzo?",
        "answer": "No, no incluye almuerzo"
      },
      {
        "question": "Se visita el Cerro Bayo ?",
        "answer": "Si, se visita"
      },
      {
        "question": "Esta incluido el ascenso a la cumbre del Cerro Bayo ?",
        "answer": "No , No está Incluido ( el valor varía de acuerdo a las fechas)"
      },
      {
        "question": "Que actividades se pueden desarrollar en la visita al Cerro Bayo ?",
        "answer": "Se puede visitar la cumbre como visitante peatón , jugar en el aérea de los trineos y si bien el tiempo que visitamos el cerro Bayo, es acotado, se puede esquiar o practicar Snowboard"
      }
    ],
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 10
  },
  {
    "id": "winter-park",
    "title": "Winter Park",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/winter-park.webp",
    "description": "Escuela de Esquí para principiantes",
    "fullDetails": "El cerro Otto\nse prepara de la mejor manera para el invierno que ya llegó. Una de las\nopciones que ofrece es Winter Park, sobre su ladera sur, en el complejo Piedras\nBlancas.\n\nWinter Park,\nubicado a sólo cinco kilómetros del Centro Cívico y en medio de un paisaje\nincomparable, rodeado de lengas y cipreses, cuenta con tres pistas de esquí\nalpino con leves pendientes pensadas para principiantes y para esquiadores\nrecién iniciados. \n\nAdemás, tiene\ndos medios de elevación, un pisanieve y cuatro máquinas que generan nieve\nartificial, lo que asegura un invierno a pura actividad todos los días.\n\nSe trata de\nuna excelente opción para los turistas y residentes de la ciudad que quieran\naprender los secretos del esquí. Al mismo tiempo es un lugar ideal y tranquilo\npara disfrutar en familia. Es importante señalar que cualquiera puede\nintentarlo, ya que las clases se imparten tanto a niños como adultos, de forma\ngrupal e individual.",
    "highlights": [
      "Cerro Otto",
      "Winter Park",
      "Piedras Blancas",
      "Escuela de esquí para principiantes",
      "Pistas de esquí alpino"
    ],
    "includes": [
      "Equipo de ski",
      "Clase d e2 hs",
      "Pase de mediodía"
    ],
    "notIncludes": [
      "Ropa de nieve",
      "Comidas"
    ],
    "additionalInfo": "*Valor clase colectiva- hasta 8 pax- \n*Traslado- \n*Horario de traslados:  8:30 a 12:30 hs / 12:30 a 18:00 hs",
    "faq": [
      {
        "question": "¿Incluye comidas?",
        "answer": "No, no incluye"
      },
      {
        "question": "¿Es necesario llevar ropa de nieve?",
        "answer": "Sí, ropa de nieve, impermeable y abrigada"
      },
      {
        "question": "¿Se puede conectar con actividades de piedras blancas?",
        "answer": "Sí, se puede conectar"
      },
      {
        "question": "¿Se suspende por lluvia?",
        "answer": "No, no se suspende"
      }
    ],
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "12:30 hs",
    "priceNum": 15
  },
  {
    "id": "circuito-chico-y-colonia-suiza",
    "title": "Circuito Chico y Colonia Suiza",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "día completo.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/circuito-chico.webp",
    "description": "Descubrí los paisajes más emblemáticos de Bariloche y el encanto de Colonia Suiza en una excursión de día completo. Recorré lagos, bosques y miradores, realizá una parada en el Cerro Campanario y conocé la histórica Capilla San Eduardo, con vistas hacia el Hotel Llao Llao.",
    "fullDetails": "Circuito Chico y Colonia Suiza reúne en una sola jornada dos de las experiencias más representativas de Bariloche: sus paisajes clásicos de montaña y el encanto de su primer asentamiento europeo.\n\nLa excursión comienza por la Avenida Bustillo, bordeando el lago Nahuel Huapi y atravesando un entorno de bosques, bahías y montañas. Se realiza una parada en el Cerro Campanario, donde quienes lo deseen podrán ascender opcionalmente en aerosilla para disfrutar de una de las vistas panorámicas más reconocidas de la ciudad.\n\nEl recorrido continúa hacia la zona de Llao Llao, Puerto Pañuelo y la Capilla San Eduardo. Allí se realiza una parada para contemplar el Hotel Llao Llao, el lago Nahuel Huapi y el entorno natural que caracteriza a esta región. Más adelante, el Punto Panorámico ofrece una de las postales más buscadas de Bariloche, con vistas al lago Moreno, la península Llao Llao y las montañas andinas.\n\nLuego, la excursión se dirige a Colonia Suiza, un pintoresco pueblo de montaña fundado por inmigrantes europeos a fines del siglo XIX. Tendrás tiempo libre para caminar por sus calles, conocer sus construcciones tradicionales, visitar ferias de artesanos y disfrutar de la gastronomía regional. Según el día de visita, también podrás encontrar la tradicional preparación del curanto.\n\nEs una propuesta ideal para quienes desean combinar naturaleza, historia, cultura y tiempo libre en uno de los rincones más auténticos de Bariloche.",
    "highlights": [
      "Recorrerás la Avenida Bustillo junto al lago Nahuel Huapi.",
      "Harás una parada en el Cerro Campanario, con posibilidad de ascenso opcional en aerosilla.",
      "Conocerás la zona de Llao Llao, Puerto Pañuelo y la Capilla San Eduardo.",
      "Disfrutarás una parada con vista al Hotel Llao Llao y su entorno.",
      "Visitarás el Punto Panorámico, con vistas al lago Moreno y la península Llao Llao.",
      "Tendrás tiempo libre para recorrer Colonia Suiza, sus ferias y propuestas gastronómicas."
    ],
    "includes": [
      "Traslado durante todo el recorrido.",
      "Guía de turismo.",
      "Paradas panorámicas previstas en el itinerario.",
      "Tiempo libre en Colonia Suiza."
    ],
    "notIncludes": [
      "Ascenso en aerosilla al Cerro Campanario.",
      "Comidas y bebidas.",
      "Consumos en Colonia Suiza.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Salida desde Bariloche e inicio del recorrido por la Avenida Bustillo, bordeando el lago Nahuel Huapi.\n• Paso por Playa Bonita y parada en el Cerro Campanario. Tiempo disponible para realizar, de manera opcional, el ascenso en aerosilla.\n• Continuación hacia la zona de Llao Llao, rodeada de bosques, lagos y montañas.\n• Parada en la Capilla San Eduardo, con vistas al Hotel Llao Llao, Puerto Pañuelo y el lago Nahuel Huapi.\n• Parada en el Punto Panorámico para contemplar el lago Moreno, la península Llao Llao y el paisaje andino.\n• Traslado hacia Colonia Suiza.\n• Tiempo libre para recorrer el pueblo, visitar ferias artesanales, almorzar o probar productos regionales.\n• Regreso a Bariloche.\n• El orden de las paradas y los tiempos puede variar por razones climáticas u operativas.\n• Circuito Chico y Colonia Suiza\n\nRECOMENDACIONES:\n• Usar calzado cómodo, apto para caminar por calles de montaña.\n• Llevar abrigo y ropa adecuada al clima durante todo el año.\n• Llevar agua, protector solar, anteojos de sol y cámara fotográfica.\n• Llevar dinero o un medio de pago para consumos personales en Colonia Suiza.\n• Consultar previamente horarios, días de salida y punto de encuentro.\n• La disponibilidad de ferias, restaurantes y curanto depende del día de visita y de la operación de cada establecimiento.\n\nDATOS DE LA EXPERIENCIA:\n• Duración aproximada: día completo.\n• Modalidad: servicio regular o privado.\n• Temporada: todo el año.\n• Dificultad: baja.\n• Actividad física: baja, con caminatas cortas y opcionales.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.\n• Ascenso al Cerro Campanario: opcional y abonado por separado.",
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "09:00 hs",
    "priceNum": 45,
    "shifts": [
      {
        "id": "circuito-chico-y-colonia-suiza-shift-1",
        "name": "Turno Mañana",
        "time": "09:00 hs",
        "totalCapacity": 18,
        "availableSpots": 18,
        "enabled": true
      },
      {
        "id": "circuito-chico-y-colonia-suiza-shift-2",
        "name": "Turno Tarde",
        "time": "14:00 hs",
        "totalCapacity": 18,
        "availableSpots": 18,
        "enabled": true
      }
    ],
    "gallery": [],
    "isPublished": true
  },
  {
    "id": "colonia-suiza",
    "title": "Colonia Suiza",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "4 horas.",
    "difficulty": "Fácil",
    "image": "/images/excursiones/circuito-chico.webp",
    "description": "Descubrí uno de los rincones más auténticos de Bariloche en una excursión de medio día a Colonia Suiza, el primer asentamiento europeo de la Patagonia. Recorré sus calles de montaña, conocé su historia, visitá ferias, disfrutá propuestas gastronómicas locales y admir á los paisajes de bosque que rodean este tradicional pueblo.",
    "fullDetails": "A pocos kilómetros de Bariloche se encuentra Colonia Suiza, un pintoresco pueblo de montaña fundado por inmigrantes europeos a fines del siglo XIX. Esta excursión de medio día propone descubrir una faceta diferente de la ciudad, donde la historia de sus primeros pobladores se combina con paisajes de bosque, arquitectura tradicional y una atmósfera relajada.\n\nAl llegar, tendrás tiempo libre para recorrer sus calles, observar las construcciones típicas, visitar ferias de artesanos y conocer productos regionales. También podrás disfrutar de las propuestas gastronómicas del lugar en restaurantes, cervecerías o puestos tradicionales. Según el día de visita y la operación de cada establecimiento, es posible encontrar el curanto, una preparación típica de la región cocida bajo tierra.\n\nColonia Suiza es una experiencia ideal para quienes buscan un paseo tranquilo, con identidad local, naturaleza y tiempo para disfrutar a su propio ritmo.",
    "highlights": [
      "Visitarás Colonia Suiza, el primer asentamiento europeo de la Patagonia.",
      "Conocerás la historia y las tradiciones de este pueblo de montaña.",
      "Recorrerás sus calles y construcciones típicas.",
      "Visitarás ferias de artesanos y comercios locales.",
      "Disfrutarás propuestas gastronómicas regionales.",
      "Admirarás los paisajes de bosque que rodean al pueblo."
    ],
    "includes": [
      "Traslado ida y vuelta desde Bariloche.",
      "Guía de turismo.",
      "Tiempo libre en Colonia Suiza."
    ],
    "notIncludes": [
      "Comidas y bebidas.",
      "Curanto u otros consumos gastronómicos.",
      "Compras en ferias, comercios o puestos de artesanos.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Salida desde Bariloche a las 11:00 hs.\n• Traslado hacia Colonia Suiza.\n• Llegada al pueblo e introducción sobre su historia y sus primeros pobladores.\n• Tiempo libre para recorrer las calles, visitar ferias, conocer comercios locales y disfrutar de la gastronomía regional.\n• Regreso hacia Bariloche.\n• Llegada estimada a las 15:00 hs.\n• Los tiempos y el orden del recorrido pueden variar por razones climáticas u operativas.\n• Colonia Suiza\n\nRECOMENDACIONES:\n• Usar calzado cómodo para caminar.\n• Llevar abrigo y ropa adecuada al clima.\n• Llevar agua, protector solar, anteojos de sol y cámara fotográfica.\n• Llevar dinero o un medio de pago para consumos personales.\n• Consultar previamente la disponibilidad de curanto, ferias y restaurantes para el día de la excursión.\n\nDATOS DE LA EXPERIENCIA:\n• Duración: 4 horas.\n• Horario: de 11:00 a 15:00 hs.\n• Modalidad: servicio regular o privado.\n• Temporada: todo el año.\n• Dificultad: baja.\n• Actividad física: baja, con caminatas cortas y opcionales.\n• Público recomendado: familias, parejas, grupos y personas de todas las edades.",
    "recommendedFor": "familias, parejas, grupos y personas de todas las edades.",
    "departureTime": "09:00 hs",
    "priceNum": 30,
    "shifts": [
      {
        "id": "colonia-suiza-shift-1",
        "name": "Turno Mañana",
        "time": "09:00 hs",
        "totalCapacity": 18,
        "availableSpots": 18,
        "enabled": true
      },
      {
        "id": "colonia-suiza-shift-2",
        "name": "Turno Tarde",
        "time": "14:00 hs",
        "totalCapacity": 18,
        "availableSpots": 18,
        "enabled": true
      }
    ],
    "gallery": [],
    "isPublished": true
  },
  {
    "id": "noche-nordica",
    "title": "Noche Nórdica — Aventura y Cena en Refugio",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Medio Día (4h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/ski-nordico.webp",
    "description": "Viví una noche diferente en el Centro de Ski Nórdico con una travesía guiada por bosques nevados y una cena en refugio. Según las condiciones de nieve, la aventura se realiza en moto de nieve o cuatriciclo, siempre acompañada por guías especializados.",
    "fullDetails": "Noche Nórdica es una experiencia invernal que combina aventura, paisajes nocturnos y gastronomía en el Centro de Ski Nórdico de Bariloche. La propuesta comienza con el traslado desde la ciudad hacia el complejo, ubicado en un entorno de bosque y Cordillera.\n\nAl llegar, recibirás las indicaciones de seguridad antes de iniciar una travesía guiada por caminos de nieve y bosques de lengas. Según las condiciones del terreno y la nieve, el recorrido se realiza en moto de nieve o cuatriciclo. Cada vehículo es compartido por dos pasajeros y el grupo está acompañado en todo momento por guías especializados.\n\nLuego de la travesía, llegarás al refugio para disfrutar de una cena en un ambiente cálido y acogedor. La combinación de aventura, nieve, bosque nocturno y gastronomía convierte a Noche Nórdica en una propuesta ideal para vivir Bariloche de una manera diferente.",
    "highlights": [
      "Te trasladarás desde Bariloche al Centro de Ski Nórdico.",
      "Recibirás indicaciones de seguridad y conducción.",
      "Realizarás una travesía guiada en moto de nieve o cuatriciclo.",
      "Recorrerás senderos de nieve y bosques de lengas.",
      "Compartirás un vehículo con otro pasajero.",
      "Disfrutarás una cena en refugio."
    ],
    "includes": [
      "Traslado ida y vuelta desde Bariloche.",
      "Travesía guiada en moto de nieve o cuatriciclo, según las condiciones operativas.",
      "Un vehículo doble cada dos pasajeros.",
      "Instrucciones de seguridad y conducción.",
      "Guías especializados durante la actividad.",
      "Cena en refugio."
    ],
    "notIncludes": [
      "Bebidas no especificadas dentro de la cena.",
      "Indumentaria de nieve, salvo que se indique expresamente al momento de reservar.",
      "Gastos personales.",
      "Propinas.",
      "Servicios no mencionados como incluidos."
    ],
    "additionalInfo": "ITINERARIO DETALLADO:\n• Traslado desde Bariloche hacia el Centro de Ski Nórdico.\n• Recepción en el complejo e indicaciones de seguridad.\n• Asignación de vehículos e inicio de la travesía guiada.\n• Recorrido por senderos de nieve o caminos habilitados, según las condiciones operativas.\n• Llegada al refugio.\n• Cena y tiempo para disfrutar del entorno.\n• Traslado de regreso a Bariloche.\n• El orden de las actividades puede variar por condiciones de nieve, clima y operación del complejo.\n• Noche Nórdica Aventura y Cena en Refugio\n\nRECOMENDACIONES:\n• Usar ropa de abrigo, campera impermeable, guantes, gorro y calzado apto para nieve.\n• Informar con anticipación alergias, restricciones alimentarias o dietas especiales.\n• Seguir siempre las indicaciones de los guías.\n• La elección entre moto de nieve y cuatriciclo depende de las condiciones de nieve y del terreno.\n• La actividad está sujeta a condiciones climáticas y operativas.\n• La conducción se realiza bajo las condiciones y requisitos establecidos por el prestador.\n\nDATOS DE LA EXPERIENCIA:\n• Temporada: invierno, sujeta a condiciones de nieve.\n• Ubicación: Centro de Ski Nórdico, Bariloche.\n• Actividad física: baja a moderada.\n• Dificultad: baja; no se requiere experiencia previa.\n• Vehículo: moto de nieve o cuatriciclo doble, compartido por dos pasajeros.\n• Público recomendado: parejas, grupos de amigos, familias y viajeros que buscan una experiencia nocturna de nieve.",
    "recommendedFor": "parejas, grupos de amigos, familias y viajeros que buscan una experiencia nocturna de nieve.",
    "departureTime": "09:00 hs",
    "priceNum": 170,
    "shifts": [
      {
        "id": "noche-nordica-shift-1",
        "name": "Turno Mañana",
        "time": "09:00 hs",
        "totalCapacity": 18,
        "availableSpots": 18,
        "enabled": true
      },
      {
        "id": "noche-nordica-shift-2",
        "name": "Turno Tarde",
        "time": "14:00 hs",
        "totalCapacity": 18,
        "availableSpots": 18,
        "enabled": true
      }
    ],
    "gallery": [],
    "isPublished": true
  }
];

export function normalizeExcursion(e: Excursion): Excursion {
  const priceNum = e.priceNum || 30;
  const priceEnglish = (typeof e.priceEnglish === 'number' && e.priceEnglish > 0)
    ? e.priceEnglish
    : Math.max(priceNum, Math.round((priceNum * 1.25) / 5) * 5);

  const defaultShifts: ExcursionShift[] = [
    {
      id: `${e.id}-shift-1`,
      name: 'Turno Mañana',
      time: e.departureTime && e.departureTime.includes(':') ? e.departureTime : '09:00 hs',
      totalCapacity: 16,
      availableSpots: 6,
      enabled: true
    },
    {
      id: `${e.id}-shift-2`,
      name: 'Turno Tarde',
      time: '14:30 hs',
      totalCapacity: 16,
      availableSpots: 11,
      enabled: true
    }
  ];

  const isPublished = e.isPublished !== undefined ? e.isPublished : true;
  const gallery = (Array.isArray(e.gallery) && e.gallery.length > 0)
    ? e.gallery
    : [e.image];
  const operatingDays = (Array.isArray(e.operatingDays) && e.operatingDays.length > 0)
    ? e.operatingDays
    : [0, 1, 2, 3, 4, 5, 6];
  const blockedDates = Array.isArray(e.blockedDates) ? e.blockedDates : [];

  return {
    ...e,
    isPublished,
    gallery,
    operatingDays,
    blockedDates,
    priceEnglish,
    shifts: (Array.isArray(e.shifts) && e.shifts.length > 0) ? e.shifts : defaultShifts,
    translations: e.translations || {}
  };
}
