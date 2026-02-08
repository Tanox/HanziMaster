import { GoogleGenAI, Type } from "@google/genai";
import { CharacterAnalysis } from '../types';

export const analyzeCharacter = async (char: string, languageName: string = 'English'): Promise<CharacterAnalysis | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key not found");
      return null;
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

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as CharacterAnalysis;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};