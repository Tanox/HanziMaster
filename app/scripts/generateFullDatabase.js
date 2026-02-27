import { GoogleGenAI, Type } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini API - Using the environment variable directly
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Paths
const CHAR_LIST_PATH = path.resolve(process.cwd(), 'public', 'hanzi-data', 'character-list.json');
const OUTPUT_PATH = path.resolve(process.cwd(), 'app', 'data', 'hanzi_master_1000.json');

async function generateHanziDatabase() {
  console.log("Starting automated Hanzi database generation...");

  if (!fs.existsSync(CHAR_LIST_PATH)) {
    console.error("Character list not found. Please run 'npm run copy-data' first.");
    return;
  }

  const allChars = JSON.parse(fs.readFileSync(CHAR_LIST_PATH, 'utf-8'));
  // Take top 1000 or all available if less
  const targetChars = allChars.slice(0, 1000);
  
  const BATCH_SIZE = 20;
  const results = [];

  for (let i = 0; i < targetChars.length; i += BATCH_SIZE) {
    const batch = targetChars.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${i / BATCH_SIZE + 1} (${i} to ${i + batch.length})...`);

    const prompt = `Provide detailed linguistic data for the following Chinese characters: ${batch.join(', ')}. 
    For each character, return:
    1. char (the character itself)
    2. pinyin (with tone marks)
    3. radical (部首)
    4. structure (结构, e.g., 左右结构, 上下结构, 独体字)
    5. strokes_count (total strokes)
    6. stroke_order (a list of stroke names in order, e.g., ["横", "竖"])
    7. examples (3 common words using this character)
    
    Return the data as a JSON array of objects.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                char: { type: Type.STRING },
                pinyin: { type: Type.STRING },
                radical: { type: Type.STRING },
                structure: { type: Type.STRING },
                strokes_count: { type: Type.INTEGER },
                stroke_order: { type: Type.ARRAY, items: { type: Type.STRING } },
                examples: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["char", "pinyin", "radical", "structure", "strokes_count", "stroke_order", "examples"]
            }
          }
        }
      });

      const batchData = JSON.parse(response.text);
      results.push(...batchData);
      
      // Save progress incrementally
      fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error processing batch starting at ${i}:`, error);
    }
  }

  console.log(`Database generation complete. Saved to ${OUTPUT_PATH}`);
}

generateHanziDatabase();
