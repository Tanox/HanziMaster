/**
 * HanziMaster v0.3.1
 */
import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { CharacterAnalysis, IdiomAnalysis } from '../types';

// Simple offline fallback generator
const generateOfflineAnalysis = (char: string, reason: string = "Network Unavailable"): CharacterAnalysis => {
  return {
    char: char,
    pinyin: "-", 
    meaning: `Mode: ${reason}`,
    radical: "?",
    strokeCount: 0,
    etymology: "Detailed analysis requires an active AI connection.",
    mnemonic: "Focus on writing practice.",
    examples: [
      { word: char, pinyin: "-", meaning: "Analysis unavailable" },
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

const commonConfig = {
  responseMimeType: "application/json",
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
};

function cleanJsonResponse(text: string): string {
    text = text.trim();
    if (text.startsWith('```')) {
      text = text.replace(/^```(json)?\s*/i, '').replace(/\s*```$/, '');
    }
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    
    if (startIndex !== -1) {
        if (endIndex !== -1 && endIndex > startIndex) {
            text = text.substring(startIndex, endIndex + 1);
        } else {
            // Handle potentially truncated JSON
            text = text.substring(startIndex);
            if (!text.endsWith('}')) {
                text += '}';
            }
        }
    }
    return text;
}

export const analyzeCharacter = async (char: string, languageName: string = 'English', forceOffline: boolean = false, apiKeyOverride?: string): Promise<CharacterAnalysis | null> => {
  if (!navigator.onLine || forceOffline) {
    return generateOfflineAnalysis(char, forceOffline ? "Offline Mode" : "Network Unavailable");
  }

  try {
    const apiKey = apiKeyOverride || process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found, using offline fallback");
      return generateOfflineAnalysis(char, "No API Key");
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Analyze the Chinese character "${char}". 
    Provide a detailed breakdown in ${languageName}.
    
    Fields requirements:
    - meaning: Basic meaning in ${languageName}.
    - radical: The radical character and its name in ${languageName}.
    - etymology: Brief origin story in ${languageName}.
    - mnemonic: A memory aid in ${languageName}.
    - examples: 3 common compound words. For each example, 'meaning' should be in ${languageName}.
    
    Ensure the response is strictly valid JSON matching the specified schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        ...commonConfig,
        systemInstruction: "You are a professional Chinese etymologist and calligraphy expert. You provide accurate, scholarly, yet accessible explanations of Chinese characters.",
        responseSchema: {
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
          required: ["char", "pinyin", "meaning", "etymology", "mnemonic", "examples"]
        }
      }
    });

    const text = cleanJsonResponse(response.text || "");
    if (!text) return generateOfflineAnalysis(char, "No Response");
    
    try {
        return JSON.parse(text) as CharacterAnalysis;
    } catch (parseError) {
        console.error("JSON Parse Error in analyzeCharacter:", parseError, "Response was:", text);
        return generateOfflineAnalysis(char, "AI Data Corruption");
    }

  } catch (error: any) {
    if (error.status === 429 || (error.message && error.message.includes('429'))) {
        console.warn("Gemini API Quota Exceeded. Falling back.");
        return generateOfflineAnalysis(char, "AI Quota Exceeded");
    }
    console.error("Gemini API Error:", error);
    return generateOfflineAnalysis(char, "Service Error");
  }
};

export const analyzeIdiom = async (idiom: string, languageName: string = 'English', forceOffline: boolean = false, apiKeyOverride?: string): Promise<IdiomAnalysis | null> => {
    if (!navigator.onLine || forceOffline) {
        return generateOfflineIdiomAnalysis(idiom, forceOffline ? "Offline Mode" : "Network Unavailable");
    }

    try {
        const apiKey = apiKeyOverride || process.env.API_KEY;
        if (!apiKey) return generateOfflineIdiomAnalysis(idiom, "No API Key");

        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Analyze the Chinese Idiom (Chengyu) "${idiom}". 
        Provide a detailed breakdown in ${languageName}.
        
        Fields requirements:
        - meaning: The definition of the idiom in ${languageName}.
        - origin: The story or historical background behind this idiom in ${languageName}.
        - usage: An example sentence using this idiom, with translation in ${languageName}.
        
        Ensure the response is strictly valid JSON.`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                ...commonConfig,
                systemInstruction: "You are a Chinese literature expert specializing in Chengyu (Idioms).",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        idiom: { type: Type.STRING },
                        pinyin: { type: Type.STRING },
                        meaning: { type: Type.STRING },
                        origin: { type: Type.STRING },
                        usage: { type: Type.STRING }
                    },
                    required: ["idiom", "pinyin", "meaning", "origin", "usage"]
                }
            }
        });

        const text = cleanJsonResponse(response.text || "");
        if (!text) return generateOfflineIdiomAnalysis(idiom, "No Response");

        try {
            return JSON.parse(text) as IdiomAnalysis;
        } catch (parseError) {
            console.error("JSON Parse Error in analyzeIdiom:", parseError, "Response was:", text);
            return generateOfflineIdiomAnalysis(idiom, "AI Data Corruption");
        }

    } catch (error: any) {
        if (error.status === 429 || (error.message && error.message.includes('429'))) {
             return generateOfflineIdiomAnalysis(idiom, "AI Quota Exceeded");
        }
        console.error("Gemini Idiom API Error:", error);
        return generateOfflineIdiomAnalysis(idiom, "Service Error");
    }
};
