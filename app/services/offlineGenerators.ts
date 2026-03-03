// app/services/offlineGenerators.ts v1.3.5
import { CharacterAnalysis, IdiomAnalysis } from '../types';
import { PINYIN_MAP } from '../constants/pinyinData';

export const generateOfflineAnalysis = (char: string, reason: string = "Network Unavailable"): CharacterAnalysis => {
  let meaning = `Mode: ${reason}`;
  try {
    if (typeof window !== 'undefined') {
        const dictStr = window.localStorage.getItem('offlineDictionary');
        if (dictStr) {
        const dict = JSON.parse(dictStr);
        if (dict[char]) {
            meaning = dict[char];
        }
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
    structure: "?",
    strokeCount: 0,
    etymology: "Detailed analysis requires an active AI connection.",
    mnemonic: "Focus on writing practice.",
    examples: [
      { word: char, pinyin: pinyin, meaning: meaning.startsWith('Mode:') ? "Analysis unavailable" : meaning },
    ]
  };
};

export const generateOfflineIdiomAnalysis = (idiom: string, reason: string = "Network Unavailable"): IdiomAnalysis => {
  return {
    idiom: idiom,
    pinyin: "-",
    meaning: `Mode: ${reason}`,
    origin: "Idiom analysis requires an active AI connection.",
    usage: "-"
  };
};
