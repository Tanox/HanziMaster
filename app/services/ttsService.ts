/**
 * app/services/ttsService.ts v0.7.1
 */
import { GoogleGenAI, Modality } from "@google/genai";

const audioCache: Map<string, AudioBuffer> = new Map();
let sharedAudioContext: AudioContext | null = null;
const aiInstances: Map<string, GoogleGenAI> = new Map();

function getAiInstance(apiKey: string): GoogleGenAI {
    if (!aiInstances.has(apiKey)) {
        aiInstances.set(apiKey, new GoogleGenAI({ apiKey }));
    }
    return aiInstances.get(apiKey)!;
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

export const playPronunciation = async (text: string, language: string = 'zh-CN', apiKeyOverride?: string): Promise<void> => {
  const apiKey = apiKeyOverride || (process.env.API_KEY as string);
  if (!apiKey || !navigator.onLine) {
    if (!apiKey) console.warn("TTS Fallback: No API Key provided.");
    if (!navigator.onLine) console.warn("TTS Fallback: Offline.");
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
    const ai = getAiInstance(apiKey);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-native-audio-preview-12-2025",
      contents: [{ parts: [{ text: `Speak this in Mandarin Chinese: ${text}` }] }],
      config: {
        systemInstruction: "You are a native Mandarin Chinese text-to-speech engine. Only output the audio for the provided text, accurately and clearly.",
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
      },
    });

    const base64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64) throw new Error("No audio data in AI response");

    const audioBuffer = await decodeAudioData(decode(base64), audioContext);
    audioCache.set(cacheKey, audioBuffer);
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.error("AI TTS failed, falling back to native speech.", error);
    return speakNative(text, language);
  }
};