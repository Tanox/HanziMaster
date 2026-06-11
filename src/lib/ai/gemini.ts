// src/lib/ai/gemini.ts v2.4.0
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

function getModel(): GenerativeModel {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI.getGenerativeModel({ model: 'gemini-pro' });
}

export interface CharacterAnalysis {
  char: string;
  pinyin: string;
  meaning: string;
  strokes: number;
  radical: string;
  structure: string;
  etymology: string;
  examples: string[];
  tips: string[];
}

export interface WritingFeedback {
  accuracy: number;
  suggestions: string[];
  strokeOrder: string[];
}

export async function analyzeCharacter(char: string): Promise<CharacterAnalysis> {
  const model = getModel();
  
  const prompt = `
    请分析汉字「${char}」：
    1. 拼音（带声调）
    2. 基本含义
    3. 笔画数
    4. 部首
    5. 结构类型（左右/上下/包围等）
    6. 字源演变
    7. 常见组词（3-5个）
    8. 记忆技巧（2-3条）
    
    请用JSON格式输出，键名：char, pinyin, meaning, strokes, radical, structure, etymology, examples, tips
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  try {
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // JSON解析失败，返回默认值
  }
  
  return {
    char,
    pinyin: '',
    meaning: '',
    strokes: 0,
    radical: '',
    structure: '',
    etymology: '',
    examples: [],
    tips: [],
  };
}

export async function getWritingFeedback(
  char: string,
  strokes: string[]
): Promise<WritingFeedback> {
  const model = getModel();
  
  const prompt = `
    分析用户书写汉字「${char}」的笔画序列：
    用户笔画：${JSON.stringify(strokes)}
    
    请评估：
    1. 准确度评分（0-100）
    2. 改进建议（3条以内）
    3. 正确笔画顺序
    
    请用JSON格式输出，键名：accuracy, suggestions, strokeOrder
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  try {
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // JSON解析失败，返回默认值
  }
  
  return {
    accuracy: 0,
    suggestions: [],
    strokeOrder: [],
  };
}

export async function generateQuiz(characters: string[]): Promise<string[]> {
  const model = getModel();
  
  const prompt = `
    基于以下汉字生成5道选择题：
    汉字：${characters.join('、')}
    
    请生成JSON数组，每道题包含：question, options(4个), answer(正确选项索引)
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  try {
    const text = response.text();
    const jsonMatch = text.match(/\[.*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // JSON解析失败，返回默认值
  }
  
  return [];
}
