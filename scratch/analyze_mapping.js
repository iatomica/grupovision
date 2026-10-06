import fs from 'fs';

// 1. Leer excursiones actuales desde server/defaultExcursions.json (o data/excursions.json)
let currentExcursions = [];
if (fs.existsSync('server/defaultExcursions.json')) {
  currentExcursions = JSON.parse(fs.readFileSync('server/defaultExcursions.json', 'utf8'));
} else if (fs.existsSync('data/excursions.json')) {
  currentExcursions = JSON.parse(fs.readFileSync('data/excursions.json', 'utf8'));
}

console.log('=== EXCURSIONES ACTUALES EN EL CATÁLOGO (' + currentExcursions.length + ') ===');
currentExcursions.forEach((e, idx) => {
  console.log(`${idx + 1}. [${e.id}] "${e.title}" (Cat: ${e.category})`);
});

// 2. Extraer las 20 excursiones del archivo Word
const lines = fs.readFileSync('scratch/extracted_doc_text.txt', 'utf8').split('\n').map(l => l.trim());

// Localizar inicio de cada excursión
const docExcursions = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const match = line.match(/^(\d{2})\s*·\s*Presentación y recorrido/);
  if (match) {
    const num = match[1];
    let title = lines[i - 1];
    let descBreve = '';
    let descCompleta = '';
    let highlights = [];
    let itinerary = [];
    let includes = [];
    let notIncludes = [];
    let recommendations = [];

    let j = i + 1;
    let currentField = '';
    while (j < lines.length && !lines[j].match(/^\d{2}\s*·\s*Presentación y recorrido/) && !lines[j].includes('Notas para el equipo web')) {
      const cur = lines[j];
      if (cur === 'Título') {
        currentField = 'title';
        if (lines[j+1]) title = lines[j+1];
      } else if (cur === 'Descripción breve') {
        currentField = 'descBreve';
      } else if (cur === 'Descripción completa') {
        currentField = 'descCompleta';
      } else if (cur === 'Aspectos destacados') {
        currentField = 'highlights';
      } else if (cur === 'Itinerario') {
        currentField = 'itinerary';
      } else if (cur === 'Incluye') {
        currentField = 'includes';
      } else if (cur === 'No incluye') {
        currentField = 'notIncludes';
      } else if (cur === 'Recomendaciones') {
        currentField = 'recommendations';
      } else if (cur.match(/^\d{2}\s*·\s*Información para reservar/)) {
        currentField = 'infoReserva';
      } else if (cur === 'Ficha técnica' || cur === 'Preguntas frecuentes') {
        currentField = 'other';
      } else {
        if (currentField === 'descBreve' && cur && !cur.startsWith('0') && cur !== 'Descripción completa') {
          descBreve += (descBreve ? ' ' : '') + cur;
        } else if (currentField === 'descCompleta' && cur && cur !== 'Aspectos destacados') {
          descCompleta += (descCompleta ? '\n\n' : '') + cur;
        } else if (currentField === 'highlights' && cur && cur !== 'Itinerario') {
          highlights.push(cur);
        } else if (currentField === 'itinerary' && cur && !cur.match(/^\d{2}\s*·\s*Información/)) {
          itinerary.push(cur);
        } else if (currentField === 'includes' && cur && cur !== 'No incluye') {
          includes.push(cur);
        } else if (currentField === 'notIncludes' && cur && cur !== 'Recomendaciones') {
          notIncludes.push(cur);
        } else if (currentField === 'recommendations' && cur && cur !== 'Ficha técnica') {
          recommendations.push(cur);
        }
      }
      j++;
    }

    docExcursions.push({
      num,
      title,
      descBreve,
      descCompleta,
      highlightsCount: highlights.length,
      itineraryCount: itinerary.length,
      includesCount: includes.length,
      notIncludesCount: notIncludes.length
    });
  }
}

console.log('\n=== EXCURSIONES EN EL DOCUMENTO MAESTRO (' + docExcursions.length + ') ===');
docExcursions.forEach(d => {
  console.log(`${d.num}. "${d.title}" -> Breve: ${d.descBreve.length} chars | Completa: ${d.descCompleta.length} chars | Highlights: ${d.highlightsCount} | Itinerario: ${d.itineraryCount}`);
});
