import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { CharacterAnalysis } from '../types';

// Simple offline fallback generator
const generateOfflineAnalysis = (char: string): CharacterAnalysis => {
  return {
    char: char,
    pinyin: "Offline", // Pinyin conversion requires a library, simplified for now
    meaning: "Mode: Network Unavailable",
    radical: "?",
    strokeCount: 0, // This will be updated by the stroke viewer data if possible
    etymology: "Detailed etymology requires an internet connection.",
    mnemonic: "Practice writing this character while offline.",
    examples: [
      { word: char, pinyin: "-", meaning: "Analysis unavailable" },
    ]
  };
};

export const analyzeCharacter = async (char: string, languageName: string = 'English'): Promise<CharacterAnalysis | null> => {
  // Immediate offline check
  if (!navigator.onLine) {
    return generateOfflineAnalysis(char);
  }

  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found, using offline fallback");
      return generateOfflineAnalysis(char);
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
        systemInstruction: "You are a professional Chinese etymologist and calligraphy expert. You provide accurate, scholarly, yet accessible explanations of Chinese characters.",
        responseMimeType: "application/json",
        // Adjust safety settings to allow educational content about origins (which may include 'violence' like weapons, hunting, etc.)
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

    let text = response.text;
    if (!text) return generateOfflineAnalysis(char);
    
    // Clean up markdown code blocks if present (common cause of JSON parse errors)
    text = text.trim();
    // Remove markdown code fences (e.g. ```json ... ```)
    if (text.startsWith('```')) {
      text = text.replace(/^```(json)?\s*/i, '').replace(/\s*```$/, '');
    }

    // Additional safety: extract JSON object if surrounded by other text or whitespace
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
        text = text.substring(startIndex, endIndex + 1);
    }
    
    return JSON.parse(text) as CharacterAnalysis;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback on error
    return generateOfflineAnalysis(char);
  }
};