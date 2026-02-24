// app/services/ttsService.ts v1.0.1
import { GoogleGenAI, Modality } from "@google/genai";

const audioCache: Map<string, AudioBuffer> = new Map();
let sharedAudioContext: AudioContext | null = null;
let globalAiInstance: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI | null {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return null;
    if (!globalAiInstance) {
        globalAiInstance = new GoogleGenAI({ apiKey });
    }
    return globalAiInstance;
}

function getAudioContext(): AudioContext {
  if (!sharedAudioContext) {
    sharedAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (sharedAudioContext.state === 'suspended') sharedAudioContext.resume();
  return sharedAudioContext!;
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
  return buffer;
}

function speakNative(text: string, lang: string = 'zh-CN') {
  return new Promise<void>((resolve) => {
    if (!('speechSynthesis' in window)) return resolve();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export const playPronunciation = async (text: string, language: string = 'zh-CN'): Promise<void> => {
  const ai = getAiInstance();
  
  // Quick return for offline or no key
  if (!ai || !navigator.onLine) {
    return speakNative(text, language);
  }

  const audioContext = getAudioContext();
  const cacheKey = `${language}:${text}`;
  
  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey);
    if (cached) {
      const source = audioContext.createBufferSource();
      source.buffer = cached;
      source.connect(audioContext.destination);
      source.start();
      return;
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say this clearly in Mandarin Chinese: ${text}` }] }],
      config: {
        systemInstruction: "You are a high-quality Mandarin Chinese text-to-speech engine. Output ONLY the raw audio for the text given.",
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
      },
    });

    const base64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64) throw new Error("No audio data");

    const audioBuffer = await decodeAudioData(decode(base64), audioContext);
    audioCache.set(cacheKey, audioBuffer);
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  } catch (error: any) {
    console.debug("Gemini TTS service unavailable, falling back to native engine.");
    return speakNative(text, language);
  }
};
