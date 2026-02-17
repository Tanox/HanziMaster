/**
 * app/services/geminiService.ts v0.7.1
 */
// Fix: The type for responseSchema is `Schema`, not `ResponseSchema`.
import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold, Schema } from "@google/genai";
import { CharacterAnalysis, IdiomAnalysis } from '../types';

// --- AI 实例缓存 ---
const aiInstances: Map<string, GoogleGenAI> = new Map();

/**
 * 获取或创建一个缓存的 GoogleGenAI 实例
 * @param apiKey - 用于AI调用的API密钥
 * @returns GoogleGenAI 实例
 */
function getAiInstance(apiKey: string): GoogleGenAI {
    if (!aiInstances.has(apiKey)) {
        aiInstances.set(apiKey, new GoogleGenAI({ apiKey }));
    }
    return aiInstances.get(apiKey)!;
}


// --- 离线回退逻辑 ---

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

  return {
    char: char,
    pinyin: "-", 
    meaning: meaning,
    radical: "?",
    strokeCount: 0,
    etymology: "Detailed analysis requires an active AI connection.",
    mnemonic: "Focus on writing practice.",
    examples: [
      { word: char, pinyin: "-", meaning: meaning.startsWith('Mode:') ? "Analysis unavailable" : meaning },
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


// --- 核心请求与解析逻辑 ---

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
 * 鲁棒的 JSON 提取器
 * 即使模型输出了 Markdown 或前置说明，也能精准定位 JSON 主体
 */
function cleanJsonResponse(text: string): string {
    if (!text) return "";
    text = text.trim();
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return match[0];
    return text.replace(/^```(json)?\s*/i, '').replace(/\s*```$/, '');
}

/**
 * 通用 AI 解析函数，用于从 Gemini API 获取结构化 JSON 数据。
 * 封装了 API Key 校验、离线回退、及鲁棒的 JSON 解析逻辑。
 */
async function fetchAiAnalysis<T>({
  entity, languageName, forceOffline, apiKeyOverride,
  promptGenerator, systemInstructionGenerator, responseSchema,
  offlineGenerator, errorReason = "Service Error",
}: {
  entity: string;
  languageName: string;
  forceOffline: boolean;
  apiKeyOverride?: string;
  promptGenerator: (entity: string, language: string) => string;
  systemInstructionGenerator: (language: string) => string;
  // Fix: The type for responseSchema is `Schema`, not `ResponseSchema`.
  responseSchema: Schema;
  offlineGenerator: (entity: string, reason: string) => T;
  errorReason?: string;
}): Promise<T> {
  if (!navigator.onLine || forceOffline) {
    return offlineGenerator(entity, forceOffline ? "Offline Mode" : "Network Unavailable");
  }

  const apiKey = apiKeyOverride || process.env.API_KEY;
  if (!apiKey) {
    return offlineGenerator(entity, "No API Key");
  }

  try {
    const ai = getAiInstance(apiKey);
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
    return JSON.parse(jsonText) as T;
  } catch (error: any) {
    console.error(`AI analysis for "${entity}" failed:`, error);
    return offlineGenerator(entity, errorReason);
  }
}

// --- Schema 定义 ---

// Fix: The type for responseSchema is `Schema`, not `ResponseSchema`.
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

// Fix: The type for responseSchema is `Schema`, not `ResponseSchema`.
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


// --- 导出的服务函数 ---

export const analyzeCharacter = async (char: string, languageName: string = 'English', forceOffline: boolean = false, apiKeyOverride?: string): Promise<CharacterAnalysis> => {
  return fetchAiAnalysis<CharacterAnalysis>({
    entity: char,
    languageName,
    forceOffline,
    apiKeyOverride,
    promptGenerator: (entity, lang) => `Please analyze the Chinese character "${entity}" for a student learning in ${lang}.`,
    systemInstructionGenerator: (lang) => `You are a professional Chinese etymologist and linguist. Your task is to provide a detailed analysis of a single Chinese character. Respond ONLY with a valid JSON object that adheres to the provided schema. The language for all descriptive fields must be ${lang}.`,
    responseSchema: characterAnalysisSchema,
    offlineGenerator: generateOfflineAnalysis,
  });
};

export const analyzeIdiom = async (idiom: string, languageName: string = 'English', forceOffline: boolean = false, apiKeyOverride?: string): Promise<IdiomAnalysis> => {
  return fetchAiAnalysis<IdiomAnalysis>({
    entity: idiom,
    languageName,
    forceOffline,
    apiKeyOverride,
    promptGenerator: (entity, lang) => `Please analyze the Chinese idiom "${entity}" for a student learning in ${lang}.`,
    systemInstructionGenerator: (lang) => `You are a Chinese literature expert specializing in idioms. Respond ONLY with a valid JSON object. The language for all descriptive fields must be ${lang}.`,
    responseSchema: idiomAnalysisSchema,
    offlineGenerator: generateOfflineIdiomAnalysis,
  });
};