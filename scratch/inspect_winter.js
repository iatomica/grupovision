import fs from 'fs';

const data = JSON.parse(fs.readFileSync('server/defaultExcursions.json', 'utf8'));

['el-refugio', 'motos-de-nieve', 'winter-park', 'free-walking-tour'].forEach(id => {
  const item = data.find(x => x.id === id);
  if (item) {
    console.log(`\n=== ID: ${id} ===`);
    console.log('Title:', item.title);
    console.log('Desc:', item.description?.slice(0, 150));
    console.log('FullDetails:', item.fullDetails?.slice(0, 150));
  }
});
