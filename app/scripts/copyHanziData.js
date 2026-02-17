/**
 * app/scripts/copyHanziData.js v0.7.1
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to node_modules/hanzi-writer-data
const SOURCE_DIR = path.resolve(process.cwd(), 'node_modules', 'hanzi-writer-data');
const DEST_DIR = path.resolve(process.cwd(), 'public', 'hanzi-data');

// Ensure destination exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

console.log('Starting full offline data copy...');
console.log(`Source: ${SOURCE_DIR}`);
console.log(`Destination: ${DEST_DIR}`);

if (!fs.existsSync(SOURCE_DIR)) {
  console.error('Error: hanzi-writer-data package not found in node_modules.');
  console.error('Please run "npm install" first.');
  process.exit(1);
}

// Read all files from source
let files = [];
try {
    files = fs.readdirSync(SOURCE_DIR);
} catch (e) {
    console.error("Failed to read source directory", e);
    process.exit(1);
}

let count = 0;
let errors = 0;

// Filter for JSON files only
const jsonFiles = files.filter(file => file.endsWith('.json'));

console.log(`Found ${jsonFiles.length} character files. Copying...`);

jsonFiles.forEach((fileName, index) => {
  const srcPath = path.join(SOURCE_DIR, fileName);
  const destPath = path.join(DEST_DIR, fileName);

  try {
    // We use copyFileSync for simplicity in build script
    fs.copyFileSync(srcPath, destPath);
    count++;
    
    // Log progress every 1000 files
    if (count % 1000 === 0) {
        console.log(`Copied ${count}/${jsonFiles.length} files...`);
    }
  } catch (e) {
    console.error(`Failed to copy ${fileName}:`, e);
    errors++;
  }
});

console.log(`Full data copy complete.`);
console.log(`Successfully copied: ${count} characters.`);
console.log(`Errors: ${errors}`);