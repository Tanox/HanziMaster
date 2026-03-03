// app/services/aiSchemas.ts v1.3.5
import { Type, Schema } from "@google/genai";

export const characterAnalysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    char: { type: Type.STRING },
    pinyin: { type: Type.STRING },
    meaning: { type: Type.STRING },
    radical: { type: Type.STRING },
    structure: { type: Type.STRING, description: "The structure of the character (e.g., Left-Right, Top-Bottom, Single Component)" },
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
  required: ["char", "pinyin", "meaning", "radical", "structure", "strokeCount", "etymology", "mnemonic", "examples"]
};

export const idiomAnalysisSchema: Schema = {
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
