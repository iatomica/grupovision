import fs from 'fs';

const rawLines = fs.readFileSync('scratch/extracted_doc_text.txt', 'utf8').split('\n').map(l => l.trim());

// Dividir por cada ficha
const tours = [];
let currentTour = null;

for (let i = 0; i < rawLines.length; i++) {
  const line = rawLines[i];
  const startMatch = line.match(/^(\d{2})\s*·\s*Presentación y recorrido/);
  
  if (startMatch) {
    if (currentTour) tours.push(currentTour);
    currentTour = {
      num: startMatch[1],
      rawTitle: rawLines[i - 1] || '',
      title: '',
      shortDesc: '',
      fullDesc: '',
      highlights: [],
      itinerary: [],
      includes: [],
      notIncludes: [],
      recommendations: [],
      technicalSheet: {},
      shiftsInfo: ''
    };
    continue;
  }

  if (!currentTour) continue;

  if (line.includes('Notas para el equipo web')) {
    if (currentTour) tours.push(currentTour);
    currentTour = null;
    break;
  }
}

// Ahora parsear cada ficha en detalle
const tourRanges = [];
for (let i = 0; i < rawLines.length; i++) {
  const line = rawLines[i];
  const startMatch = line.match(/^(\d{2})\s*·\s*Presentación y recorrido/);
  if (startMatch) {
    tourRanges.push({ num: startMatch[1], lineIndex: i });
  }
}

const parsedTours = [];

for (let t = 0; t < tourRanges.length; t++) {
  const startIdx = tourRanges[t].lineIndex;
  const endIdx = (t + 1 < tourRanges.length) ? tourRanges[t + 1].lineIndex - 1 : rawLines.indexOf('Notas para el equipo web');
  const slice = rawLines.slice(startIdx, endIdx !== -1 ? endIdx : rawLines.length);

  const item = {
    num: tourRanges[t].num,
    title: '',
    shortDesc: '',
    fullDesc: '',
    highlights: [],
    itinerary: [],
    includes: [],
    notIncludes: [],
    recommendations: [],
    technicalSheet: {},
    shiftsInfo: []
  };

  let section = '';
  for (let j = 0; j < slice.length; j++) {
    const l = slice[j];
    if (l === 'Título') {
      section = 'title';
      continue;
    }
    if (l === 'Subtítulo') {
      section = 'subtitle';
      continue;
    }
    if (l === 'Descripción breve') {
      section = 'shortDesc';
      continue;
    }
    if (l === 'Descripción completa') {
      section = 'fullDesc';
      continue;
    }
    if (l === 'Aspectos destacados') {
      section = 'highlights';
      continue;
    }
    if (l === 'Itinerario') {
      section = 'itinerary';
      continue;
    }
    if (l.match(/^\d{2}\s*·\s*Información para reservar/)) {
      section = 'infoReserva';
      continue;
    }
    if (l === 'Turnos y modalidades') {
      section = 'shifts';
      continue;
    }
    if (l === 'Incluye') {
      section = 'includes';
      continue;
    }
    if (l === 'No incluye') {
      section = 'notIncludes';
      continue;
    }
    if (l === 'Recomendaciones') {
      section = 'recommendations';
      continue;
    }
    if (l === 'Ficha técnica') {
      section = 'technicalSheet';
      continue;
    }
    if (l === 'Preguntas frecuentes') {
      section = 'faq';
      continue;
    }

    if (!l) continue;

    // Asignar según sección
    if (section === 'title' && !item.title) {
      item.title = l;
    } else if (section === 'shortDesc') {
      item.shortDesc += (item.shortDesc ? ' ' : '') + l;
    } else if (section === 'fullDesc') {
      item.fullDesc += (item.fullDesc ? '\n\n' : '') + l;
    } else if (section === 'highlights') {
      item.highlights.push(l);
    } else if (section === 'itinerary' && l !== 'Parada' && l !== 'Descripción') {
      item.itinerary.push(l);
    } else if (section === 'shifts') {
      item.shiftsInfo.push(l);
    } else if (section === 'includes') {
      item.includes.push(l);
    } else if (section === 'notIncludes') {
      item.notIncludes.push(l);
    } else if (section === 'recommendations') {
      item.recommendations.push(l);
    } else if (section === 'technicalSheet') {
      const parts = l.split(':');
      if (parts.length > 1) {
        item.technicalSheet[parts[0].trim()] = parts.slice(1).join(':').trim();
      } else {
        item.technicalSheet[l] = true;
      }
    }
  }

  parsedTours.push(item);
}

fs.writeFileSync('scratch/parsed_tours.json', JSON.stringify(parsedTours, null, 2), 'utf8');
console.log(`Parsed ${parsedTours.length} tours from Word master document.`);
parsedTours.forEach(t => {
  console.log(`[${t.num}] ${t.title} | Short: ${t.shortDesc.slice(0, 50)}... | Highlights: ${t.highlights.length} | Itinerary: ${t.itinerary.length} | Inc: ${t.includes.length}`);
});
