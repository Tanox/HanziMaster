// app/services/geminiService.ts v1.3.5
import { GoogleGenAI, HarmCategory, HarmBlockThreshold, Schema } from "@google/genai";
import { CharacterAnalysis, IdiomAnalysis } from '../types';
import { characterAnalysisSchema, idiomAnalysisSchema } from './aiSchemas';
import { generateOfflineAnalysis, generateOfflineIdiomAnalysis } from './offlineGenerators';

// --- AI Instance Cache ---
let globalAiInstance: GoogleGenAI | null = null;

/**
 * Gets or creates the global GoogleGenAI instance using process.env.NEXT_PUBLIC_GEMINI_API_KEY.
 * Strictly follows system rules: Exclusive use of process.env.NEXT_PUBLIC_GEMINI_API_KEY.
 */
function getAiInstance(): GoogleGenAI | null {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return null;
    if (!globalAiInstance) {
        globalAiInstance = new GoogleGenAI({ apiKey });
    }
    return globalAiInstance;
}

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
    let cleaned = text.trim();
    
    // Remove markdown code blocks if present
    if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    }
    
    // Find the first '{' or '[' and the last '}' or ']'
    const firstOpenBrace = cleaned.indexOf('{');
    const firstOpenBracket = cleaned.indexOf('[');
    const lastCloseBrace = cleaned.lastIndexOf('}');
    const lastCloseBracket = cleaned.lastIndexOf(']');
    
    let start = -1;
    let end = -1;
    
    if (firstOpenBrace !== -1 && (firstOpenBracket === -1 || firstOpenBrace < firstOpenBracket)) {
        start = firstOpenBrace;
    } else if (firstOpenBracket !== -1) {
        start = firstOpenBracket;
    }
    
    if (lastCloseBrace !== -1 && (lastCloseBracket === -1 || lastCloseBrace > lastCloseBracket)) {
        end = lastCloseBrace;
    } else if (lastCloseBracket !== -1) {
        end = lastCloseBracket;
    }
    
    if (start !== -1 && end !== -1 && end > start) {
        return cleaned.substring(start, end + 1);
    }
    
    return cleaned;
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
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  if (!isOnline || forceOffline) {
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
