import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common characters list (Sync with App.tsx)
// This ensures these characters are available offline immediately.
const COMMON_CHARS = "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样想向道命此位理望果信公手争利实情军最代意强做光今变通各少并口战问气每九许何格名类利手但身象六风业决定几教技元无总反给提解路比解看管认使问知系正实务期展很眼五书开论别光起区系长次手接觉门听见问题日力件员任先海带强特许通位活那员给名几入心几种政只那老受直界张很历革便入几立身千做南比东算且结形又马代光热拉快白算什路运道口布许问但教战主象六风业决公手争利实情军最代意强做光今变通各少并口战问气每九许何格名类利手但身象六风业决定几教技元无总反给提解路比解看管认使问知系正实务期展很眼五书开论别光起区系长次手接觉门听见问题日力件员任先海带强特许通位活那员给名几入心几种政只那老受直界张很历革便入几立身千做南比东算且结形又马代光热拉快白算什路运道口布许问但教战主象六风业决爱喜喜欢谢谢客气不客气再见对不起没关系名字哪儿哪里学校学生老师医生医院椅子猫狗多少钱米饭苹果今天明天昨天上午中午下午星期年日月生日号岁时候现在点分衣服水杯东西块永";

// Path to node_modules/hanzi-writer-data
// Adjust based on where the script is run. Assuming run from root via npm run.
const SOURCE_DIR = path.resolve(process.cwd(), 'node_modules', 'hanzi-writer-data');
const DEST_DIR = path.resolve(process.cwd(), 'public', 'hanzi-data');

// Ensure destination exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

console.log('Copying Hanzi data...');
console.log(`Source: ${SOURCE_DIR}`);
console.log(`Destination: ${DEST_DIR}`);

if (!fs.existsSync(SOURCE_DIR)) {
  console.error('Error: hanzi-writer-data package not found in node_modules.');
  console.error('Please run "npm install" first.');
  process.exit(1);
}

let count = 0;
let errors = 0;

// Get unique characters
const uniqueChars = [...new Set(COMMON_CHARS.split(''))];

uniqueChars.forEach(char => {
  const fileName = `${char}.json`;
  const srcPath = path.join(SOURCE_DIR, fileName);
  const destPath = path.join(DEST_DIR, fileName);

  if (fs.existsSync(srcPath)) {
    try {
      fs.copyFileSync(srcPath, destPath);
      count++;
    } catch (e) {
      console.error(`Failed to copy ${char}:`, e);
      errors++;
    }
  } else {
    // Some chars in the common list might not be in the dataset (punctuation etc)
    // console.warn(`Data not found for: ${char}`);
  }
});

console.log(`Data copy complete.`);
console.log(`Copied: ${count} files`);
console.log(`Errors: ${errors}`);
