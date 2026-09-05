// Auto-generated Excursions Data from Grupo Visión Receptive Catalog
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
  priceNum: number;
  discountPercent?: number;
  promoBadge?: string;
  isFeatured?: boolean;
  customNote?: string;
}

export const EXCURSIONS_DATA: Excursion[] = [
  {
    "id": "refugio-roca-negra",
    "title": "Refugio Roca Negra",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/refugio-roca-negra.webp",
    "description": "Caminata con raquetas para nieve",
    "fullDetails": "El refugio \"Roca Negra\" está ubicado a más\nde mil seiscientos metros sobre el nivel del mar, y ofrece una vista panorámica\ndel lago Nahuel Huapi y del Parque Nacional con sus lagos, islas y montañas. Es\nuna parada intermedia, antes de llegar a la cima del cerro López\n\nPara acceder\nal sendero se debe llegar hasta el cruce del Arroyo López con la Ruta\nProvincial 77, dentro del circuito panorámico, comúnmente conocido como\nCircuito Chico.\n\n Desde la base del Cerro López,\ncomienza la aventura de ascenso en camionetas 4x4, por un escarpado camino de\nmontaña entre el bosque de Coihues centenarios y altas Lengas. Luego de tomar\nlas primeras fotografías, se da comienzo a la caminata, junto con el guía se\nprocese a equiparse con Raquetas de nieve; con ellas podremos transitar por zonas nevadas sin hundirnos. Durante\nel recorrido, los guías contaran acerca del lugar y disfrutaran de la belleza\nnatural que la montaña tiene para ofrecerles. Finalizada la caminata, en el\nRefugio Roca Negra les darán una cálida bienvenida donde disfrutarán de una\nFondue de chocolate acompañada con fruta fresca, galletas y turrones o de una\nFondue de Queso. Luego, descenderán nuevamente en las camionetas 4x4 hasta\nla base, donde terminará la excursión y se llevará a los pasajeros a sus\nrespectivos hoteles.",
    "highlights": [
      "Lago Moreno.",
      "Cerro López.",
      "Ascensos en camionetas 4×4.",
      "Caminatas con Raquetas",
      "Refugio de montaña Roca Negra.",
      "Vistas de lagos, bosques y cordillera de los Andes"
    ],
    "includes": [
      "Traslado",
      "Raquetas de nieve",
      "Ascenso en camionetas 4x4",
      "Almuerzo/ Merienda",
      "Guías"
    ],
    "notIncludes": [
      "Ropa de nieve"
    ],
    "additionalInfo": "Horarios de salida:\n*Por la mañana- (Fondue de queso) A partir de las 10.00hs a 16.30hs\n*Por la tarde-(Fondue de Chocolate) A partir de las 14:00 hs a 20:30hs\n*Mayores $ \n*Menores de 12 a 5 años $",
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
    "recommendedFor": "Parejas, Familias y Grupos",
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
    "title": "Camino de los 7 Lagos  - San Martín de los Andes",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/camino-de-los-7-lagos-san-martin-de-los-andes.webp",
    "description": "Conozca el maravilloso  Camino de los 7 Lagos, la ciudad de Villa La Angostura y la hermosa San Martin de los Andes",
    "fullDetails": "Es una de las excursiones  tradicionales que nos ofrece la Patagonia Andina, recorre en su trayecto de 360 kilómetros. Saliendo hacia al norte  por ruta nacional 237 cruzando el río Limay , dejando atrás  la provincia de Rio Negro e ingresando a la provincia del Neuquén , se va bordeando  la costa norte del lago Nahuel Huapi por la ruta nacional 231 que nos une con la ciudad de Villa la Angostura.Durante este recorrido veremos el  brazo Huemul,  Isla Victoria y un pequeño bosquecillo de Arrayanes, de esta forma arribamos a Villa La Angostura, una típica aldea de montaña, donde haremos un pequeño alto en el camino para recorrer su calle principal. Desde aquí iniciamos el recorrido por el Camino de los 7 lagos, el cual va bordeando la cordillera de los andes, inmerso en un frondoso bosque húmedo donde podremos reconocer las más importantes especies de flora autóctona,  este camino nos deslumbrará con sus paisajes y lagos mágicamente distribuidos en la región, a partir del  lago Correntoso , el primero de los siete , se iran sucediendo  cada uno con sus particulares vistas, llegaremos al mirador de Lago Espejo, y luego con la  laguna Bailey Willis , siguiendo  el  recorrido nos volveremos a encontrar con el brazo norte del Lago Correntoso , cruzaremos el puente sobre el arroyo Ruca Malén y màs adelante el puente sobre el río Pichi Traful  hasta llegar al lago Escondido con un pequeño mirador donde podrás tomar unas hermosas fotografías .\nDe aquí en más tendremos una seguidilla de lagos comenzando por el Villarino, enfrentado al lago Falkner el cual  posee una hermosas playas de arena y un paisaje de ensueño con el cerro Buque sobre su costa sur. Siguiendo  nuestro camino llegaremos a la formidable cascada de Vuliñanco, con su salto de mas de 35 mts., luego veremos el lago Machónico, con su espectacular mirador natural  y desde aquí iremos directamente al encuentro de nuestro último lago, El Lácar, el cual corona la ciudad de San Martín de los Andes, una urbanización realmente deslumbrante tanto por sus paisajes como  por su rica arquitectura. Sus calles repletas de rosales, hace de  esta ciudad un hermoso jardín patagónico. Llegaremos a San Martín de los Andes en horas del mediodía donde  permaneceremos aproximadamente dos horas para  almorzar y recorrerla ciudad.\nEl regreso se realiza por el mismo camino.",
    "highlights": [
      "Salida de Bariloche por costa norte de Lago Nahuel Huapi",
      "Ciudad de Villa la Angostura",
      "Camino de los 7 Lagos",
      "Lagos : Espejo, Correntoso, Falkner, Villarino, Escondido, Machònico, Lacar",
      "Ciudad de San Martin de los Andes"
    ],
    "includes": [
      "Recorrido de la excursión y Guía"
    ],
    "notIncludes": [
      "Almuerzo"
    ],
    "additionalInfo": "*Valor del paseo $100.000- por persona\n*Llevar ropa y calzado cómodo. \n*Los menores que ocupen asiento abonan la excursión",
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
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 7
  },
  {
    "id": "cerro-catedral",
    "title": "Cerro Catedral",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/cerro-catedral.webp",
    "description": "Visita al centro de Esquí más importante de Sudamérica",
    "fullDetails": "Sus picos se asemejan a las torres de un templo medieval del estilo gótico, de ahí su nombre. El cerro Catedral, ubicado a 19 kilómetros de la ciudad de San Carlos de Bariloche, abre camino a los habitantes del mundo deseosos de experimentar la aventura que prometen los deportes de montaña. Su  Altura  máxima es de 2.338 metros de altura sobre el nivel del mar, el Catedral es pionero entre los centros de esquí de Sudamérica, hoy es el más completo y sigue modernizando sus instalaciones para ofrecer al visitante la más avanzada infraestructura. Podemos acceder a su cumbre a través de los diferentes medios de elevación y desde ella podemos admirar un impactante paisaje hacia la parte central de la cordillera de los Andes, con vistas al Cerro Tronador y el volcán Puntiagudo de Chile. Con opciones a todas las modalidades de esquí, incluyendo el fuera de pista, aquéllos que practican el freestyle y snowboard tendrán un área especialmente diseñada con bumps y rails para demostrar sus habilidades en el nuevo snowpark. Catedral también es escenario para las más importantes competencias internacionales. \nAdemás, Catedral cuenta con un avanzado sistema de fabricación de nieve que da como resultado copos reales que cubren una superficie esquiable de alrededor de 10 hectáreas.  Durante el invierno se puede realizar  Esquí Alpino, Esquí de Fondo, Esquí de Travesía,  Snowboard, Trineos, Snow Cats ( motos de nieve) Parapente,  y durante el verano las actividades más importantes son las de Trekking, Montañismo , Mountain Bike y Four Trax ( cuatriciclos). El cerro catedral cuenta con variados servicios para sus visitantes durante todo el año  paradores, restaurantes de primer nivel, locales de indumentaria y souvenirs, servicio médico en la base del cerro, acceso a internet en la base y estación 1600, ski rental, amplio estacionamiento, centro de informes, guardería infantil, escuela de esquí, shopping, discotecas, etc.",
    "highlights": [
      "Traslado con guía desde el Hotel a la base del Cerro Catedral",
      "Centro de Esquí más importante de Sudamérica",
      "Visita Villa Catedral",
      "Ascenso opcional a los medios de elevación"
    ],
    "includes": [
      "Recorrido de la excursión y Guía"
    ],
    "notIncludes": [
      "Ascenso en los medios de elevación"
    ],
    "additionalInfo": "*Valor del paseo $ 45.000- por persona\n*Durante los meses de invierno, es importante llevar ropa y calzado adecuado para nieve\n*El resto del año llevar ropa y calzado cómodo. \n*Política de menores: \n*Menores  entre 0 y 3 años no abonan el paseo, sin derecho a asiento",
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
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 2
  },
  {
    "id": "cerro-tronador-y-glaciares",
    "title": "Cerro Tronador y Glaciares",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/cerro-tronador-y-glaciares.webp",
    "description": "Visita al Corazón de la cordillera, para apreciar el cerro más imponente del Parque Nacional junto a sus glaciares, y su magnífico ventisquero negro",
    "fullDetails": "Excursión de todo el día Dentro de la amplísima variedad de posibilidades que brinda la  zona patagónica, la visita a cerro Tronador y sus glaciares, puede ser el lugar elegido para una experiencia inolvidable.  A  90 Km de la ciudad de S.C. de Bariloche se encuentra el Cerro Tronador con 3478 m de altura. El recorrido se inicia por la ruta 40 sur que bordea el Lago Gutiérrez y  en su margen oeste se encuentra el imponente paisaje del Cerro Catedral Sur, luego se recorre la costa Este al lago Mascardi  hasta llegar al desvío de caminos que nos permite llegar al corazón de la cordillera de los andes, el camino es enripiado y flanqueado por exuberante vegetación autóctona. En su recorrido atraviesa el puente sobre el río Manso,  el camping Los Rápidos y más adelante  transita la costa del brazo Oeste del lago Mascardi, conociendo el mirador de la maravillosa  Isla PIUKE (Isla Corazón).\nSe atraviesa el Gran  Valle de Los VURILOCHES con sus magníficas vistas, el cual finaliza en Pampa Linda, pintoresca zona con una perspectiva maravillosa del Cerro Tronador y sus Glaciares, en este lugar se realiza un alto para almorzar. El paseo continua  hasta arribar al ventisquero Negro, uno de los cuatro glaciares que posee el cerro Tronador, este lugar es el más impactante de la excursión debido a las características del mismo, más adelante se llega al punto culmine del paseo al llegar a la base del majestuoso cerro donde se aprecia las paredes de sus glaciares en la altura y sus innumerables caídas de agua\nRegreso por el mismo camino",
    "highlights": [
      "Ruta 40 sur",
      "Lago Gutiérrez",
      "Lago Mascardi",
      "Rápidos del Rio Manso",
      "Valles de los Vuriloches",
      "Pampa Linda",
      "Ventisquero Negro",
      "Caminata por la base del Cerro Tronador con vistas a los glaciares"
    ],
    "includes": [
      "Recorrido de la excursión y Guía"
    ],
    "notIncludes": [
      "Entrada a Parques Nacionales $ 15000 turistas argentinos - $35000 turistas extranjeros",
      "Comidas"
    ],
    "additionalInfo": "*Valor del paseo $90.000- por persona\n*Llevar ropa y calzado cómodo para caminar \n*En época invernal, ropa y calzado adecuado para nieve\n*Política de menores: \n*Menores  entre 0 y 3 años no abonan el paseo, sin derecho a asiento",
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
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 6
  },
  {
    "id": "circuito-chico",
    "title": "Circuito Chico",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/circuito-chico.webp",
    "description": "Esta excursión es la esencia de San Carlos de Bariloche, nos invita a conocer y entender la belleza natural que nos rodea",
    "fullDetails": "Tradicional paseo de medio día, es la carta de presentación de San Carlos de Bariloche, Tiene un  recorrido de  60 km que se inicia  por la Av. Ezequiel Bustillo  bordeando el lago Nahuel Huapi, el más grande de los lagos de la región, el cual nos ira acompañando en gran parte del circuito. En los primeros kmts. del recorrido,  podrán  contemplar el desarrollo urbanístico de  los barrios residenciales  con sus  construcciones típicas; casas de pioneros, club náutico, barrio Melipal, como también las diferentes especies arbóreas como los cipreses , maitenes, cohiues y ñires que serán a partir de ahora parte importante del circuito, el cual, durante el verano se enriquece con arbustos de rosa mosqueta, plantas de moras, frambuesas y retamas de un brillante color amarillo, junto a flores silvestres que enmarcan todo un espectáculo de color y formas. En el Km 8 del paseo se arribara a Playa Bonita, el balneario más importante de la ciudad  y frente a ella la Histórica Isla Huemul; luego se conoce Bahía Serena,  cerro Campanario , pudiendo acceder a la cumbre por medio de aerosillas, donde hay una confitería y una vista excepcional de paisaje de 360 grados. Continuando el itinerario se continúa  hacia la península de Llao-Llao donde se  visita la capilla San Eduardo, Puerto. Pañuelo y enmarcado por los lagos Perito Moreno y Nahuel Huapi el hotel Llao-Llao y sus canchas de golf, en este punto, el paisaje, se convierte en una conjunción de colores y formas que dan una impresionante vista de este Parque Nacional Nahuel Huapi El paseo continúa  internándose en una  zona de bosques de cohiues y cañas colihues conformando una reserva que pretende preservar todo este ambiente poco alterado por el hombre, es el Parque Municipal del Llao-Llao digno de ser recorrido por sus caminos interiores que permiten observar la proliferación de  diferentes ejemplares de árboles autóctonos. A continuación se distingue el acceso a Villa Tacul y  Lago Escondido, también  se visita el Lago Moreno, su unión natural al Lago Nahuel Huapi en el arroyo Angostura, y desde alli  se llega al  sitio  más importante del circuito \"Punto Panoramico\" , desde donde se puede admirar uno de los paisajes más impactantes de toda la región, para finalizar se recorre la base del cerro López, laguna El Trébol y desde allí  se retoma la Av.Bustillo para regresar al centro de la ciudad.",
    "highlights": [
      "Costa sur del lago Nahuel Huapi",
      "Barrios Residenciales",
      "Cerro Campanario ( ascenso opcional )",
      "Mirador Punto Panorámico",
      "Lago Moreno – Lago Escondido",
      "Laguna El Trébol",
      "Cerro Capilla – Cerro López",
      "Hotel Llao Llao",
      "Capilla San Eduardo"
    ],
    "includes": [
      "Valor del paseo $45.000- por persona",
      "Recorrido de la excursión y Guía"
    ],
    "notIncludes": [
      "Ascenso a Cerro Campanario",
      "Costo del Ascenso :  Mayores $22.000 Menores $ 11.000 ( entre 06 a 12 años )",
      "Menores de 06 años no pagan ascenso"
    ],
    "additionalInfo": "*Valor del paseo $45.000- por persona\n*Salidas todos los días\n- De  08:30 hs. a 13:00 hs\n- De 14:00 hs. a 18:00 hs (Bilingüe)\n*Llevar ropa y calzado cómodo. \n*Los menores que ocupen asiento abonan la excursión",
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
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs",
    "priceNum": 2
  },
  {
    "id": "circuito-grande-villa-traful-villa-la-angostura",
    "title": "Circuito Grande - Villa Traful - Villa La Angostura",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/circuito-grande-villa-traful-villa-la-angostura.webp",
    "description": "Una increíble combinación de paisajes !!  Estepa, Ríos, Montañas, Bosques y Lagos. Conozca Villa Traful y Villa La Angostura",
    "fullDetails": "Excursión de Todo el día Salida 08:30 hs Regreso 18:00, los días Lunes, Miércoles y Viernes Opera únicamente desde Noviembre hasta Abril Este paseo comienza saliendo de Bariloche hacia el noreste, llegando a la desembocadura natural del lago Nahuel Huapi donde nace el río Limay, límite natural entre las provincias de Río Negro y Neuquén. El camino nos lleva bordeando sus costas contemplando un paisaje de estepa donde nos deslumbra con sus formaciones naturales como el Anfiteatro y el Valle Encantado, llamado así por sus inmensas y extrañas formaciones rocosas que la naturaleza fue moldeando con el transcurso de los años sobre los cerros, aquí podremos descubrir  las figuras que los lugareños  han bautizado como el dedo de dios, el centinela, tren expreso. Los siameses, entre otros. Luego llegaremos a la confluencia de Limay con el Rio Traful quien nos acompañara en esta nueva etapa. Aquí la ruta se transforma en un camino de ripio, el cual nos sorprenderá por su transformación de paisajes a medida que vayamos avanzando de la estepa al bosque andino, en las laderas de las montañas veremos los nidos de Cóndores , cruzaremos el rio Cuyin Manzano y Minero hasta llegar al famoso Mirador del Viento sobre el Lago Traful y así llegar a esta hermosa villa de montaña. Villa Traful\nSi bien fue creada en 1936 sus orígenes se remontan a finales de 1600 cuando desde diferentes puntos de la región llegaron los primeros pobladores  en su mayoría Mapuches, hoy cuenta con una población estable de aproximadamente 700 habitantes. Caminaremos por la villa, su pintoresco muelle sobre el lago y luego seguiremos camino hacia el Oeste donde conoceremos Puerto Arrayán y asi llegar a Paso Portezuelo, donde ingresaremos al Camino de los Siete Lagos para conocer el Lago Correntoso , el puente Ruca Malen , Lago Espejo y extremo noroeste del Nahuel Huapi. De esta forma arribamos a Villa La Angostura “Jardin de la Patagonia” se encuentra ubicada al sur de la Provincia del Neuquén, a solo 35 kmts. de la frontera con el vecino país chileno, en la margen noreste del Lago Nahuel Huapi . Rodeada de tupidos bosques autóctonos y enmarcados por imponentes cumbres, es uno de esos lugares ideales en cualquiera de las cuatro estaciones. Recibe su nombre por el itsmo Angostura de la Península de Quetrihue, donde se encuentra el famoso Bosque de los Arrayanes. \nDurante el recorrido conoceremos  los puntos más sobresalientes del centro de la ciudad, La capilla Nuestra Señora de la Asunción (1936), la famosa residencia El Messidor, Edificio de Parques Nacionales y a unos metros, el muelle de Puerto Angostura, sobre bahía Mansa y al muelle de Bahía Brava. (y sus bellísimas playas, que en verano nos invita a disfrutarlas), Luego del almuerzo visitaremos Puerto Manzano, Bahia Manzano, lugares que tienen un especial atractivo.\nPor la tarde bordeando el lago Nahuel Huapi, regresamos a Bariloche",
    "highlights": [
      "Valor del Paseo $90.000-",
      "Rio Limay",
      "Limite de Rio Negro y Neuquén",
      "Valle Encantado",
      "Confluencia del Rio Traful y Limay",
      "Mirador Lago Traful",
      "Villa Traful",
      "Lago Correntoso",
      "Lago Espejo",
      "Villa la Angostura",
      "Costa Norte Lago Nahuel Huapi"
    ],
    "includes": [
      "Recorrido de la excursión y Guía"
    ],
    "notIncludes": [
      "Comidas"
    ],
    "additionalInfo": "* Valor del Paseo $90.000 -\n*Guia Bilingue $130.000.- \n*Llevar ropa y calzado cómodo para caminar \n*Política de menores: \n*Menores  entre 0 y 3 años no abonan el paseo, sin derecho a asiento",
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
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 6
  },
  {
    "id": "el-bolson-chacras-lago-puelo",
    "title": "El Bolsón - Chacras - Lago Puelo",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/el-bolson-chacras-lago-puelo.webp",
    "description": "El Bolsón y la Comarca Andina  nos deslumbra con sus increíbles paisajes  patagónicos !!!",
    "fullDetails": "Excursión de Todo el día Salida 08:30 hs Regreso 18:00, los días Jueves, Sábados\nPartiendo hacia el sur  desde Bariloche por la Ruta Nacional 258 , bordeando los lagos Gutiérrez, Mascardi y Guillelmo, después de atravesar la Pampa del Toro, el Cañadón de la Mosca y El Foyel, esta excursión nos lleva a la localidad de El Bolsón, enclavada en un valle con características climáticas especiales que facilitan el desarrollo agrícola del poblado y nos invita a realizar esta visita a sus atractivos principales.\nEl Bolsón debe su nombre a la conformación geográfica cerrada por montañas y antiguos glaciares que la circundan, dejándola bajo el cobijo de la alta montaña que limitan al Sur con el Paralelo 42, al Norte con el Cordón Paleta, al Este el Cerro Piltriquitrón y al Oeste con la Cordillera de los Andes, siendo parte componente de la denominada \"Comarca Andina\". \nEntre sus puntos más sobresalientes visitaremos la famosa y pintoresca  Feria Artesanal, ubicada en la plaza central de la ciudad.\nMás adelante, atravesando fincas y chacras cubiertas por cultivos de lúpulo, trigo, maíz, frutillas, frambuesas, grosellas, cerezas y manzanas, visitamos una chacra modelo para conocer las características de las plantaciones y ver su producción \nLuego llegaremos  al lago Puelo para disfrutar de su singular tonalidad celeste-turquesa y sus alrededores, donde tendremos tiempo para disfrutar de sus costas \nPor la tarde regresamos por el mismo camino",
    "highlights": [
      "Lago Gutiérrez",
      "Lago Mascardi",
      "Lago Guillemo",
      "Rio Villegas",
      "Rio Foyel",
      "Centro de El Bolsón",
      "Feria Artesanal",
      "Chacras De Fruta Fina",
      "Lago Puelo"
    ],
    "includes": [
      "Recorrido de la excursión y Guía"
    ],
    "notIncludes": [
      "Comidas",
      "Entrada Parque Nacional Lago Puelo",
      "$ 15000 turistas argentinos - $35000 turistas extranjeros"
    ],
    "additionalInfo": "*Valor del paseo $85.000- por persona\n*Llevar ropa y calzado cómodo para caminar \n*Política de menores: \n*Menores  entre 0 y 3 años no abonan el paseo, sin derecho a asiento",
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
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 6
  },
  {
    "id": "el-refugio",
    "title": "El Refugio",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/el-refugio.webp",
    "description": "Aventura en motos de nieve",
    "fullDetails": "Este restaurante de montaña se\nencuentra ubicado en ARELAUQUEN GOLF & CC sobre un mirador natural a 1300\nmts de altura en la cumbre sur del Cerro Otto. \n\nLa excursion hasta El Refugio nos proporciona una aventura que combina un ascenso en camionetas 4x4 y luego un trayecto en moto de nieve. \n\nUna inolvidable travesía de curvas y contracurvas ascendiendo en el profundo\nsilencio del bosque de lengas cubiertas de nieve y bajo un manto de estrellas.\nLuego de sentir la adrenalina de la subida, la tranquilidad y calidez del\nRefugio reconfortan. La luz de las velas junto al fuego de la chimenea,\npermiten disfrutar de la incomparable vista.\n\nEl\nrefugio, un deck de madera cubierto de nieve balconeando sobre los lagos Nahuel\nHuapi, Gutiérrez y Moreno brinda la mejor vista de la cordillera y el más bello\npaisaje patagónico.",
    "highlights": [
      "ARELAUQUEN GOLF & CC¨",
      "Transfer desde el Hotel hasta Arelauquen y transfer de regreso al hotel",
      "Motos de nieve",
      "Ascenso en camionetas 4x4",
      "Cena en Refugio"
    ],
    "includes": [
      "Transfer",
      "Moto de nieve",
      "Ascenso en 4x4",
      "Cena"
    ],
    "notIncludes": [
      "Ropa de nieve"
    ],
    "additionalInfo": "*Incluye transfer desde el Hotel hasta Arelauquen y transfer de regreso al hotel\n* Motos de nieve (2 personas por moto) \n*Tiempo aproximado de excursión 3:30h desde la recepción del club\n*Turnos 18h, 19h, 20:30h y 21:30\n*Grupos de 16 personas por turno.\n*Tarifa Mayores (+12 años) u$d.- (dolores américanos)",
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
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 52
  },
  {
    "id": "free-walking-tour",
    "title": "Free Walking Tour",
    "category": "Tradicional",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/free-walking-tour.webp",
    "description": "¡La mejor manera de descubrir Bariloche!!  Su apasionante historia, su arquitectura, su cultura y la influencia de los inmigrantes europeos, caminando por los barrios del casco histórico.",
    "fullDetails": "Valor: Sin Cargo (Al finalizar cada asistente entrega al guía la cantidad que considere, de acuerdo a la satisfacción obtenida)Salidas:  09:45 hs. y  17:45  Duración: 2 hs.\nNivel de Dificultad: Bajo - Medio El recorrido nos lleva a conocer la historia de San Carlos de Bariloche, a través de su gente, sus principales barrios del casco histórico. Como influyeron las comunidades europeas, especialmente la Alemana, entendiendo la idiosincrasia de los habitantes de principios de siglo 20 hasta nuestros días.\nRecorreremos sus calles para conocer las edificaciones más icónicas de la ciudad, sus variados estilos, la importancia que tuvieron y como se fueron transformando con el trascurso del tiempo. Conoceremos como se fue formando culturalmente la ciudad, cuáles fueron las principales influencias y como de un pueblo agrícola ganadero se fue trasformando en el destino turístico más importante de la Argentina.\nMitos, Leyendas y verdades sobre el pasado de la Alemania nazi de la postguerra en la ciudad, enriqueciendo las miradas del participante a través de los diferentes lugares documentados.\nUn paseo necesario, para comenzar a comprender lo que la mayoría de los visitantes la denominan la JOYA PATAGONICA",
    "highlights": [
      "Salida desde San Martin 398",
      "Caminata de 02:00 hs por el casco histórico de la ciudad",
      "Barrio Cervecero - Club Andino Bariloche – Barrio Belgrano – Capilla de la Inmaculada – Paseo de las Colectividades – Catedral Nuestra Señora del Nahuel Huapi – Centro Cívico"
    ],
    "includes": [
      "Caminata",
      "Guías"
    ],
    "notIncludes": [
      "Extras de ningún tipo"
    ],
    "additionalInfo": "*Valor Sin Cargo (Al finalizar cada asistente entrega al guía la cantidad que considere, de acuerdo a la satisfacción obtenida)\n*Ropa adecuada para las condiciones del clima y calzado cómodo\n*Apto para todas las edades\n*Horarios:\n 9:45 a 12:30 hs\n17:45 a 20:00 hs ( Enero , Febrero y Marzo)  \n16:45 a 19:00 hs ( resto del año)",
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
    "title": "Isla Victoria y Bosque de  Arrayanes",
    "category": "Navegación",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/isla-victoria-y-bosque-de-arrayanes.webp",
    "description": "Navegamos el Lago Nahuel Huapi para conocer el Maravilloso Bosque de los Arrayanes y la gran Isla Victoria",
    "fullDetails": "Salidas todos los días, en varios horarios\nEste paseo se puede iniciar  tanto desde el Hotel ó  desde Puerto Pañuelo lugar enclavado en la península de Llao-Llao a 25 Kmts del centro de la ciudad\nSi comenzamos desde el hotel , es por medio de un traslado terrestre  que nos lleva hasta el Puerto.\nUna vez en el puerto se realiza el embarque y comienza el recorrido lacustre por el maravilloso lago Nahuel Huapi, admirando el color de sus aguas, el verdor de la vegetación de sus costas y los picos nevados de las montañas que sobresalen en el horizonte este hermoso paisaje que fue transformándose en el transcurso de millones de años por diversos procesos geológicos. Se navega durante aproximadamente una hora por la zona central del lago, hasta llegar a  puerto Quetrihue situado al sur de la península de igual nombre. Aquí nos encontramos  con el mundialmente famoso  Bosque de Arrayanes  que da nombre a este Parque Nacional.   Este árbol inconfundible por su corteza color canela y muy lisa, al desprenderse deja manchas claras y rojizas, que dan al bosque un color absolutamente distinto a todos. En el final del verano los arrayanes se cubren de flores blancas que en otoño darán un fruto color negro brillante, algunos ejemplares llegan a tener entre 500 y 650 años de edad.\nLuego de realizar el recorrido por sus senderos se inicia una nueva navegación  hacia la Isla Victoria  de aproximadamente 30 minutos  hasta llegar a Puerto Anchorena .\nLa isla tiene un largo máximo de 20 Km y un ancho de 4 Km, y está dividida en tres sectores de los cuales el único habilitado al turismo es el central, los demás son áreas intangibles\nEste lugar habitado hace miles de años por aborígenes que dejaron evidencias de su presencia y podrás comprobarlo en las cuevas y pinturas rupestres existentes en la isla: También observarás las diferentes especies de flora en una  caminata guiada por los senderos donde iras conociendo las diferentes características de las especies, tales como,  sequoias gigantes, tuyas, eucaliptos, pinos, robles junto a cipreses, cohiues y ñires que en su follaje esconden gran diversidad de pájaros. En lo alto de la fronda percibirás el vuelo de algún CORMORAN imperial. \nPodrás llegar hasta  Playa del Toro, durante el verano, es un magnifico balneario \nSe regresa a Puerto Pañuelo luego de 30 minutos de navegación y desde aquí al hotel",
    "highlights": [
      "Puerto Pañuelo",
      "Península de Quetrihue",
      "Bosque de Arrayanes",
      "Isla Victoria",
      "Puerto Anchorena",
      "Caminatas Guiadas",
      "Flora autóctona  e introducida",
      "Playa del Toro"
    ],
    "includes": [
      "CONSULTE TARIFAS PLAN FAMILIAR",
      "Navegación y Caminatas con guía durante la excursión"
    ],
    "notIncludes": [
      "Traslado al puerto",
      "Tasa de embarque",
      "Ingreso al Parque Nacional $ 15000 turistas argentinos - $35000 turistas extranjeros",
      "Comidas"
    ],
    "additionalInfo": "*Valor del paseo Mayor  $140.000-por persona ( No Incluye Traslado a Puerto)\n*Valor del paseo Menor o Jubilado  $70.000- por persona ( No Incluye Traslado a Puerto)\n*Traslado a Puerto Pañuelo $22.000- por persona\n* CONSULTE TARIFAS PLAN FAMILIAR\n*Llevar ropa y calzado cómodo para caminar \n-El servicio se puede contratar con y sin traslado a puerto pañuelo ida y vuelta.\nPolítica de menores: \nMenores  entre 0 y 3 años no abonan el paseo\nMenores de 4 a 12 años abonan el 50% del precio de la embarcación\nJubilados ARGENTINOS (ÚNICAMENTE  presentando credencial)  abonan el 50% del precio de la embarcación\nPara quienes no tengan movilidad propia aconsejamos reservar el servicio CON TRASLADO ya que el puerto queda 25 km de la ciudad.\nEl recorrido de nuestro traslado se realiza por algunos hoteles específicos. Si Ud. está en un hotel que no se encuentra en el listado, puede buscar el punto que le quede más cercano o bien seleccionar nuestra oficina comercial del centro.\nLos puntos de partida posibles son:\nHOTEL PANAMERICANO (San Martin 536)\nHOTEL NH EDELWEISS  (San Martin 202)\nHOTEL NAHUEL HUAPI (Moreno 252)\nHOTEL TRES REYES (12 de octubre 135)\nMitre 219\nKM 1.5 (Puerta Hotel Patagonia)\nKM 2,5 (Puerta Hoteles DESIGN SUITES-VILLA HUINID)\nKM 6 (Puerta Hotel LA CASCADA)\nKM 7 (Puerta Hoteles NIDO DEL CONDOR –ROCHESTER-LIROLAY)\nKM 7,5 (Puerta Hotel CHARMING)\nKM 11,5 (Puerta Hotel EL CASCO)\nKM 25 (Puerta Hotel LLAO LLAO)",
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
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 6
  },
  {
    "id": "kayac-lago-gutierrez",
    "title": "Kayac Lago Gutierrez",
    "category": "Aventura",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Moderado",
    "image": "/images/excursiones/kayac-lago-gutierrez.webp",
    "description": "Navegar en Kayak en el lago Gutiérrez, IMPERDIBLE!!!",
    "fullDetails": "Excursión de medio Salida 13:00 hs Regreso 17:30 hs Nivel de Dificultad: Bajo  Traslado desde la ciudad la costa  Noroeste del lago Gutiérrez. Al llegar los guías darán una charlas de seguridad, donde se explica desde cómo subirse al kayak, hasta que hacer en caso de imprevistos y nos equiparemos con:   Chalecos salvavidas especiales para kayak y los remos  Se embarca, y dependiendo de las condiciones del lago (si hay o no viento) y del grupo, se decide por donde se realiza la navegación.\nEl tiempo total de estadía en el lago es de aproximadamente 2 horas, lo que incluye una parada en alguna de sus playas desoladas y paradisíacas. Descubra una actividad que lo llenará de buenos momentos, con la sensación única de flotar muy pero muy cerca de la superficie, inmerso en un mundo diferente.\nDespués volvemos a embarcar y regresamos.",
    "highlights": [
      "Traslado a  Lago Gutiérrez",
      "Charla Técnica",
      "Navegación en Kayac",
      "Avistaje de Flora y Fauna"
    ],
    "includes": [
      "Traslados",
      "Equipamiento",
      "Guías Bilingues",
      "Navegación en Kayac",
      "Seguro"
    ],
    "notIncludes": [
      "Fotografías"
    ],
    "additionalInfo": "* Valor $80.000 por pax  con traslado\n*Ser mayor de 04 años\n*Saber Nadar\n*Estado Físico acorde a la actividad\n*Estar dispuesto a cumplir estrictamente las explicaciones y órdenes de los guías durante la navegación\n*Llevar Documentos\n*Llevar Protector Solar",
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
    "title": "Motos de Nieve",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/motos-de-nieve.webp",
    "description": "Travesía en Motos de Nieve",
    "fullDetails": "La travesía en motos de nieve se lleva a cabo en la ladera\ndel Cerro Catedral, en un recorrido de 7 kms con paradas en miradores naturales.\n\nEs una actividad ideal para quienes quieren realizar la\nexperiencia y combinarlo con otras actividades dentro del centro de esquí.\n\nLa excursión atraviesa arroyos y bosques de lengas, hasta\nlos 1400 metros de altura, con paradas en miradores naturales, recorriendo un\nárea del cerro que sólo puede ser visitada con estos vehículos todo-terreno,\nconociendo un Catedral diferente.",
    "highlights": [
      "Cerro Catedral",
      "Centro de esquí",
      "Bosque de lengas",
      "Motos de nieve",
      "Cuatriciclos"
    ],
    "includes": [
      "Guías",
      "Ascenso en Cuatriciclos",
      "Ascenso en Motos de Nieve"
    ],
    "notIncludes": [
      "Traslado ida y vuelta"
    ],
    "additionalInfo": "*Las excursiones se realizan en cuatriciclos y/o motos de nieve según las condiciones de nieve.\n*Recomendamos concurrir con ropa y calzado impermeable adecuado para “la montaña\"\n*HORARIOS\n*10:00 hs/ 11:15 hs/ 12:30 hs/ 13:15 hs/ 15:00 hs\n*Valor por moto u$d ( Dolares americanos)  (1 o 2 personas)",
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
    "recommendedFor": "Parejas, Familias y Grupos",
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
    "title": "Piedras Blancas",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/piedras-blancas.webp",
    "description": "Parque de Nieve",
    "fullDetails": "Piedras Blancas es un importante centro de atracción turística con características propias y exclusivas, pensado para el turista que toma contacto por primera vez con la nieve. Se encuentra ubicado casi en la cima del Cerro Otto, a 1400 msnm.Es además un lugar con historia. Porque fue aquí que comenzó a desarrollarse el esquí en nuestro país, con la primera escuela dirigida por el mítico Otto Meiling.\nTomando las aerosillas se accede a la cumbre del cerro y donde se puede  apreciar y fotografiar paisajes únicos. Una vez allí podrás descender de la misma forma o deslizándote en trineos a través de curvas y descensos muy divertidos.Piedras Blancas cuenta con 3000 metros de pistas exclusivas para trineos, algo único en Sudamérica, y medios de elevación para 1200 pax/hora.",
    "highlights": [
      "Complejo Piedras Blancas",
      "Medios de elevacion",
      "Pistas de trineos",
      "Puntos Gastronómicos",
      "Charlas de Seguridad",
      "Guardarropa"
    ],
    "includes": [
      "Ingreso a complejo",
      "Trineos",
      "Medios de elevacion ( 04 ascensos Aerosilla - 02 Magic Carpet)"
    ],
    "notIncludes": [
      "Comidas",
      "Ropa de nieve"
    ],
    "additionalInfo": "*Ingreso al complejo\n*Trineos $ .-\n*Pista Infantil \n*Traslado $ \n*Menores de 0 a 3 años no abonan traslado,sin derecho a butaca",
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
    "recommendedFor": "Parejas, Familias y Grupos",
    "departureTime": "08:30 hs / 14:00 hs",
    "priceNum": 9
  },
  {
    "id": "puerto-blest-y-cascada-de-los-cantaros",
    "title": "Puerto Blest y Cascada de los Cantaros",
    "category": "Navegación",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/puerto-blest-y-cascada-de-los-cantaros.webp",
    "description": "Navegar  el Lago Nahuel Huapi  hasta el corazón de la cordillera de los andes, una excursión única !!",
    "fullDetails": "Este paseo se puede iniciar  tanto desde el Hotel ó  desde Puerto Pañuelo lugar enclavado en la península de Llao-Llao a 25 Kmts del centro de la ciudadSi comenzamos desde el hotel , es por medio de un traslado terrestre  que nos lleva hasta el Puerto. Luego del embarque  comienza la navegación  recorriendo  el angosto y extenso brazo Blest del lago Nahuel Huapi donde se observa  un paisaje espectacular rodeado de bosques  tupidos,  montañas imponentes y las aguas transparentes de glaciares milenarios. La entrada al brazo Blest está custodiada por la Isla Centinela, lugar donde descansan los restos del creador de Los Parques Nacionales, Francisco Pascacio Moreno y los cerros Capilla y Millaqueo. Minutos  después al pasar por las Islas Mellizas se encuentra la máxima profundidad del lago de 464 mts. , màs adelante la Playa de las Arañas y la Cascada Blanca\nDespués de una hora de navegación llegamos a Puerto  Cántaros ubicado en la Bahía Blest en pleno corazón de la cordillera inmerso en plena Selva Valdiviana, uno de los lugares más lluviosos del país (3000 mm de precipitaciones anuales) que  ofrece una selva siempre verde con árboles de gran tamaño, como el coihue y el alerce, alternando con un piso arbustivo  donde se enlazan lianas y enredaderas, todo cubierto permanentemente por una atmósfera húmeda, que permite el desarrollo de hierbas, musgos y hongos. En Puerto Blest se puede visitar la hostería, de cálido estilo y un interesante centro de interpretación de esta zona, situado a pocos metros de la anterior. A pocos metros se encuentra el Río Frías que desemboca al lago llevando un color lechoso que tiñe de un verde esmeralda este sector. Existe la posibilidad de realizar, desde aquí,  una segunda parte de este  maravilloso paseo que consiste en recorrer 3 kmts. por el  único camino vehicular que nos lleva a  Puerto Alegre,  a orillas del espectacular Lago Frías,  este lago ,de un color verde indescriptible, se puede navegar  durante  20 minutos para llegar a Puerto Frías donde nace el camino internacional  PEREZ ROSALES que comunica con el  vecino país Chileno. Esta opción de navegar el Lago Frías, tiene costo adicional, pero también existe la posibilidad de conocer el Lago realizando una caminata bordeando el rio Frias hasta las orillas de este hermoso  lago. Al regresar a Puerto Blest, se realiza un alto para almorzar (la Hosteria cuenta con servicios de restaurante). Luego el paseo continua navegando hasta la Cascada de Los Cántaros, que por medio de una escalinata nos lleva a conocer los maravillosos saltos y llegar a su parte más alta donde se encuentra la Laguna Cantaros que da origen a la cascada. Luego de esta última etapa, se regresa a la embarcación para regresar a Puerto Pañuelo.",
    "highlights": [
      "Puerto Pañuelo",
      "Puerto Blest",
      "Cascada de los Cantaros",
      "Lago Cantaros",
      "Rio Frias",
      "Lago Frias",
      "Selva Valdiviana"
    ],
    "includes": [
      "Valor del paseo Mayor  $140.000- por persona ( No Incluye Traslado a Puerto)",
      "Valor del paseo Menor o Jubilado  $70.000- por persona ( No Incluye Traslado a Puerto)",
      "Valor de Lago Frias Mayor  $54.000.- por persona",
      "Valor  de Lago Frias Menor o Jubilado  $27.000- por persona",
      "Traslado a Puerto Pañuelo $22.000- por persona",
      "Navegación y Caminatas con guía durante la excursión"
    ],
    "notIncludes": [
      "Traslado al puerto",
      "Tasa de embarque",
      "Ingreso al Parque Nacional $ 15000 turistas argentinos - $35000 turistas extranjeros",
      "Navegaciòn por Lago Frias",
      "Comidas"
    ],
    "additionalInfo": "*Valor del paseo Mayor  $140.000- por persona ( No Incluye Traslado a Puerto)\n*Valor del paseo Menor o Jubilado  $70.000- por persona ( No Incluye Traslado a Puerto)\n*Valor de Lago Frias Mayor  $54.000- por persona\n*Valor  de Lago Frias Menor o Jubilado  $27.000- por persona\n*Traslado a Puerto Pañuelo $22.000- por persona\n* Llevar ropa y calzado cómodo para caminar \nEl servicio se puede contratar con y sin traslado a puerto pañuelo ida y vuelta.\nPolítica de menores: \nMenores  entre 0 y 3 años no abonan el paseo\nMenores de 4 a 12 años abonan el 50% del precio de la embarcación\nJubilados ARGENTINOS (ÚNICAMENTE  presentando credencial)  abonan el 50% del precio de la embarcación\nPara quienes no tengan movilidad propia aconsejamos reservar el servicio CON TRASLADO ya que el puerto queda 25 km de la ciudad.\nEl recorrido de nuestro traslado se realiza por algunos hoteles específicos. Si Ud. está en un hotel que no se encuentra en el listado, puede buscar el punto que le quede más cercano o bien seleccionar nuestra oficina comercial del centro.\n\nLos puntos de partida posibles son:\nHOTEL SHERATON (San Martin 536)\nHOTEL NH EDELWEISS (San Martin 202)\nHOTEL TRES REYES (12 de Octubre 135)\nMitre 219\nKM 1 (Puerta Hotel Patagonia)\nKM 2,5 (Puerta Hoteles DESIGN SUITES-VILLA HUINID)\nKM 6 (Puerta Hotel LA CASCADA)\nKM 7 (Puerta Hoteles NIDO DEL CONDOR –ROCHESTER-LIROLAY)\nKM 7,5 (Puerta Hotel CHARMING)\nKM 11,5 (Puerta Hotel EL CASCO)\nKM 25 (Puerta Hotel LLAO LLAO)",
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
    "recommendedFor": "Parejas, Familias y Grupos",
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
    "title": "Ski Nordico",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/ski-nordico.webp",
    "description": "Ski Nórdico o de Travesía",
    "fullDetails": "El centro de Ski Nórdico, se encuentra ubicado en el Cerro\nOtto, a sólo 6km del centro de la ciudad. A 1280 mts. sobre el nivel del mar,\nen un entorno rodeado de bosques de Lengas y de vistas únicas, acompañadas de\nla nieve hacen que los paisajes sean únicos y soñados.\n\nEn el Km. 1 de la Avenida de los Pioneros se encuentra el acceso al Cerro Otto.\nUna vez que se ingresa a dicho acceso se deberá recorrer 5 km hasta el centro\ninvernal “Piedras Blancas”.\nPasando la playa de estacionamiento de este Centro se continuará 1 km más hasta\nllegar al Centro de Ski Nórdico.\n\nEl Ski nórdico es la conjunción perfecta entre el deporte y\nla naturaleza, una modalidad para practicar y disfrutar en familia. Esta\nmodalidad de ski te permite desplazarte tanto en subidas como en bajadas. Esto\nes gracias a la forma del ski, que posee en la base un tipo de escama.  De esta manera, el esquiador podrá incursionar\nen pistas trazadas por el bosque, disfrutando de toda la naturaleza y del paisaje\nque lo rodea. La actividad consta de una clase grupal, con una duración\naproximada de una hora y media, son muy participativas ideales para realizar en\nfamilia o amigos. El instructor, luego de enseñarles los primeros pasos, los\nacompaña por las pistas en un recorrido por el bosque hasta miradores con\nexcelentes vistas.\n\nPor otro lado, el centro cuenta con paseos en cuatriciclos\ncon orugas, una actividad única en Latinoamérica. Los cuadriciclos que utilizan\nson 4×4 “Can-Am BRP” biplaza homologados para 2 personas, equipados con orugas\nApache para nieve.  La actividad consiste\nen un paseo guiado por el bosque, de unos 40 min. aproximadamente, parando en\nmiradores donde se pueden apreciar maravillosos paisajes. Es sin duda, una\nactividad para disfrutar en familia en un divertido paseo.",
    "highlights": [
      "Cerro Otto",
      "Centro de Ski Nórdico.",
      "Bosque  de Lengas.",
      "Vistas panorámicas del lago Nahuel Huapi",
      "Escuela de Ski Nordico",
      "Cuatriciclos con orugas"
    ],
    "includes": [
      "Equipo Ski Nordico",
      "Cuatriciclos",
      "Clases grupales"
    ],
    "notIncludes": [
      "Ropa de nieve",
      "Comidas"
    ],
    "additionalInfo": "*Dia de Ski Nórdico-por persona-u$D.- ( Dolares americanos) \n*Paseo en moto de nieve -2 personas-u$D.- ( Dolares americanos) \n*Ski +Moto de nieve - promo dos personas-u$D .- ( Dolares americanos ) \n*Traslado Ida y vuelta- por -persona-u$D.- ( Dolares americanos)",
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
    "title": "Velero \"El Orgulloso\"",
    "category": "Navegación",
    "season": "Todo el Año",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/velero-el-orgulloso.webp",
    "description": "Navegación en velero por el lago Nahuel Huapi",
    "fullDetails": "Excursión de medio día Salidas:  10:00 hs - 13:30 hs – 17:00 hs  Nivel de Dificultad: Bajo El Lago Nahuel Huapi, un verdadero paraíso náutico en la Patagonia Argentina. Te invitamos a disfrutarlo en su estado más puro... Iniciamos nuestra experiencia a bordo del Velero El Orgulloso desde el Puerto Municipal ( av. Bustillo kmt 13), navegaremos por el Brazo Campanario del lago Nahuel Huapi, bordeando la península San Pedro hasta llegar a Puerto Bueno, una hermosa y solitaria bahía.  Teniendo en cuenta las condiciones climáticas, el viaje continúa a “lago abierto” dirigiéndonos hacia la Isla de los Víveres y Puerto Venado en la Costa de Neuquén, observándose la Bahía Serena, la Isla Huemul y de las Gallinas. Descubriremos playas y bahías solitarias que muy pocos conocen, realizando paradas para compartir infusiones y disfrutar de la naturalezaSALIDAS EXCLUSIVAS:   Temática “Sorprende a quien quieras” Festejamos navegando cumpleaños, Aniversarios, tardes románticas con servicio de catering a bordo.",
    "highlights": [
      "Salida desde Puerto Municipal (kmt 13,500 Av. Bustillo)",
      "Charla Técnica",
      "Navegación de 03 horas"
    ],
    "includes": [
      "Valor $90.000.- por persona",
      "Navegación",
      "Infusiones"
    ],
    "notIncludes": [
      "Traslado a Puerto Petunia"
    ],
    "additionalInfo": "*Valor $90.000.- por persona\n*Ropa y Calzado Cómodo\n*Llevar: Traje de baño, Protector Solar, Campera ò Rompeviento",
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
    "title": "Villa La Angostura y Cerro bayo",
    "category": "Invierno",
    "season": "Invierno",
    "duration": "Día Completo (8h)",
    "difficulty": "Fácil",
    "image": "/images/excursiones/villa-la-angostura-y-cerro-bayo.webp",
    "description": "Hermosa Villa de Montaña, un lugar de ensueño ...",
    "fullDetails": "Se inicia saliendo de Bariloche por ruta nacional 237 cruzando el río Limay , hasta encontrarnos con la Ruta Nacional 231, que nos une en 80 kmts. con la ciudad de Villa la Angostura , Esta Hermosa Villa, conocida como el JARDIN DE LA PATAGONIA  se encuentra ubicada al sur de la Provincia del Neuquén, a solo 35 kmts. De la frontera con el vecino país chileno, está a 870 Mts sobre el nivel del mar, en la margen noreste del Lago Nahuel Huapi. Rodeada de tupidos bosques autóctonos y enmarcados por imponentes cumbres, es uno de esos lugares ideales en cualquiera de las cuatro estaciones. Recibe su nombre por el itsmo o Angostura de la Península de Quetrihue, sobre los faldeos de los cerros Bayo (1782 Mts), Inacayal (1849 Mts) y Belvedere (1992 Mts) fue oficialmente fundada en 1932. Durante el recorrido veremos Puerto Manzano, y los accesos a Bahía Las Balsas, Cerro Bayo y Cumelén, lugares que tienen cada uno su particular atractivo.\nEn este paseo recorreremos, Por el boulevard Nahuel Huapi, los puntos más sobresalientes de la ciudad, Comenzaremos por El Cruce, y desde allí tomaremos rumbo  sur, hacia el  puerto, por  este camino  se encuentra la capilla Nuestra Señora de la Asunción ( 1936 ) ,cien metros más adelante, está la entrada a la famosa residencia El Messidor, obras del Arquitecto Alejandro Bustillo y el Museo Histórico Regional. Frente a éste podemos ver la entrada del Hotel Angostura (1938).\nSiguiendo el recorrido al edificio de Parques Nacionales y a unos metros, el muelle de Puerto Angostura, sobre bahía Mansa , desde el cual parten excursiones lacustres al Bosque de Arrayanes, y otros paseos por el lago  y apenas unos metros más adelante, llegaremos al acceso del Parque Nacional Los Arrayanes. Sobre  el final de esta calle se encuentra el muelle de Bahía Brava. luego visitaremos la zona norte de la Villa  para conocer la otra cara del lago Nahuel Huapi , la unión con el  Lago Correntoso y el hermoso río que los une, que lleva el mismo nombre. Aquí se encuentra el famoso Hotel Correntoso. Esta zona es especialmente elegida por los pescadores ya que  la pesca de truchas y salmónidos tiene en este lugar posibilidades incomparables. En uno de los puntos más preciados para la pesca con mosca. \nEn el invierno, visitamos también el Cerro Bayo, centro de esqui de Villa la Angostura, cuya base se encuentra a 1.050 m.s.n.m. y dista a 9 km de la zona comercial de la Villa. La dotación de medios de elevación nos permite visitar  la cumbre y apreciar su espectacular paisaje como jugar con trineos ò disfrutar del esqui\nAl Atardecer regresamos a San Carlos de Bariloche",
    "highlights": [
      "Salida de Bariloche por costa norte de Lago Nahuel Huapi",
      "Costa Norte del Lago Nahuel Huapi",
      "Bahía Manzano",
      "Ciudad de Villa La Angostura",
      "Bahia Mansa y Bahia Brava",
      "Residencia El Messidor",
      "Lago Correntoso",
      "Visita al Cerro Bayo"
    ],
    "includes": [
      "Recorrido de la excursión y Guía"
    ],
    "notIncludes": [
      "Comidas",
      "Ascenso a Cerro Bayo"
    ],
    "additionalInfo": "*Valor del paseo $-\n*Llevar ropa y calzado cómodo para caminar \n*Durante el invierno llevar ropa de nieve \n*Política de menores: \n*Menores  entre 0 y 3 años no abonan el paseo, sin derecho a asiento",
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
    "recommendedFor": "Parejas, Familias y Grupos",
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
  }
];
