
// app/services/geminiService.ts v1.1.5
import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold, Schema } from "@google/genai";
import { CharacterAnalysis, IdiomAnalysis } from '../types';
import { PINYIN_MAP } from '../constants/pinyinData';

// --- AI Instance Cache ---
let globalAiInstance: GoogleGenAI | null = null;

/**
 * Gets or creates the global GoogleGenAI instance using process.env.API_KEY.
 * Strictly follows system rules: Exclusive use of process.env.API_KEY.
 */
function getAiInstance(): GoogleGenAI | null {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    if (!globalAiInstance) {
        globalAiInstance = new GoogleGenAI({ apiKey });
    }
    return globalAiInstance;
}

// --- Offline Fallback Logic ---

const generateOfflineAnalysis = (char: string, reason: string = "Network Unavailable"): CharacterAnalysis => {
  let meaning = `Mode: ${reason}`;
  try {
    const dictStr = window.localStorage.getItem('offlineDictionary');
    if (dictStr) {
      const dict = JSON.parse(dictStr);
      if (dict[char]) {
        meaning = dict[char];
      }
    }
  } catch (e) {
    console.warn("Could not read offline dictionary", e);
  }

  const pinyin = PINYIN_MAP[char] || "-";

  return {
    char: char,
    pinyin: pinyin,
    meaning: meaning,
    radical: "?",
    strokeCount: 0,
    etymology: "Detailed analysis requires an active AI connection.",
    mnemonic: "Focus on writing practice.",
    examples: [
      { word: char, pinyin: pinyin, meaning: meaning.startsWith('Mode:') ? "Analysis unavailable" : meaning },
    ]
  };
};

const generateOfflineIdiomAnalysis = (idiom: string, reason: string = "Network Unavailable"): IdiomAnalysis => {
  return {
    idiom: idiom,
    pinyin: "-",
    meaning: `Mode: ${reason}`,
    origin: "Idiom analysis requires an active AI connection.",
    usage: "-"
  };
};

// --- Core Request & Parsing Logic ---

const commonConfig = {
  responseMimeType: "application/json",
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ],
};

/**
 * Robust JSON Extractor.
 */
function cleanJsonResponse(text: string): string {
    if (!text) return "";
    const trimmed = text.trim();
    // Prioritize finding a JSON object/array
    const match = trimmed.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (match) return match[0];
    // Fallback for markdown-wrapped JSON
    return trimmed.replace(/^```(json)?\s*/i, '').replace(/\s*```$/, '').trim();
}

/**
 * Generic AI analysis function to fetch structured JSON data from Gemini API.
 */
async function fetchAiAnalysis<T>({
  entity, languageName, forceOffline,
  promptGenerator, systemInstructionGenerator, responseSchema,
  offlineGenerator, errorReason = "Service Error",
}: {
  entity: string;
  languageName: string;
  forceOffline: boolean;
  promptGenerator: (entity: string, language: string) => string;
  systemInstructionGenerator: (language: string) => string;
  responseSchema: Schema;
  offlineGenerator: (entity: string, reason: string) => T;
  errorReason?: string;
}): Promise<T> {
  if (!navigator.onLine || forceOffline) {
    return offlineGenerator(entity, forceOffline ? "Offline Mode" : "Network Unavailable");
  }

  const ai = getAiInstance();
  if (!ai) {
    return offlineGenerator(entity, "No API Key configured");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: promptGenerator(entity, languageName),
      config: {
        ...commonConfig,
        systemInstruction: systemInstructionGenerator(languageName),
        responseSchema: responseSchema,
      }
    });

    const jsonText = cleanJsonResponse(response.text || "");
    
    if (!jsonText) {
      throw new Error("Received empty JSON response from AI.");
    }

    return JSON.parse(jsonText) as T;
  } catch (error: any) {
    console.error(`AI analysis for "${entity}" failed:`, error);
    return offlineGenerator(entity, errorReason);
  }
}

// --- Schema Definitions ---

const characterAnalysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    char: { type: Type.STRING },
    pinyin: { type: Type.STRING },
    meaning: { type: Type.STRING },
    radical: { type: Type.STRING },
    strokeCount: { type: Type.INTEGER },
    etymology: { type: Type.STRING },
    mnemonic: { type: Type.STRING },
    examples: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          pinyin: { type: Type.STRING },
          meaning: { type: Type.STRING },
        }
      }
    }
  },
  required: ["char", "pinyin", "meaning", "radical", "strokeCount", "etymology", "mnemonic", "examples"]
};

const idiomAnalysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    idiom: { type: Type.STRING },
    pinyin: { type: Type.STRING },
    meaning: { type: Type.STRING },
    origin: { type: Type.STRING },
    usage: { type: Type.STRING }
  },
  required: ["idiom", "pinyin", "meaning", "origin", "usage"]
};

// --- Exported Service Functions ---

export const analyzeCharacter = async (char: string, languageName: string = 'English', forceOffline: boolean = false): Promise<CharacterAnalysis> => {
  return fetchAiAnalysis<CharacterAnalysis>({
    entity: char,
    languageName,
    forceOffline,
    promptGenerator: (entity, lang) => `Please analyze the Chinese character "${entity}" for a student learning in ${lang}.`,
    systemInstructionGenerator: (lang) => `You are a professional Chinese etymologist and linguist. Respond ONLY with a valid JSON object. The language for all descriptive fields must be ${lang}.`,
    responseSchema: characterAnalysisSchema,
    offlineGenerator: generateOfflineAnalysis,
  });
};

export const analyzeIdiom = async (idiom: string, languageName: string = 'English', forceOffline: boolean = false): Promise<IdiomAnalysis> => {
  return fetchAiAnalysis<IdiomAnalysis>({
    entity: idiom,
    languageName,
    forceOffline,
    promptGenerator: (entity, lang) => `Please analyze the Chinese idiom "${entity}" for a student learning in ${lang}.`,
    systemInstructionGenerator: (lang) => `You are a Chinese literature expert specializing in idioms. Respond ONLY with a valid JSON object. The language for all descriptive fields must be ${lang}.`,
    responseSchema: idiomAnalysisSchema,
    offlineGenerator: generateOfflineIdiomAnalysis,
  });
};
