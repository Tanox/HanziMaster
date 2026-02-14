/**
 * HanziMaster v0.5.3
 */
import { GoogleGenAI, Modality } from "@google/genai";

// Cache for audio buffers to avoid re-fetching the same text
const audioCache: Map<string, AudioBuffer> = new Map();

// Global Singleton Audio Context
let sharedAudioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!sharedAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    sharedAudioContext = new AudioContextClass();
  }
  if (sharedAudioContext.state === 'suspended') {
    sharedAudioContext.resume();
  }
  return sharedAudioContext!;
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function speakNative(text: string, lang: string = 'zh-CN') {
  return new Promise<void>((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        let selectedVoice = voices.find(v => v.lang === lang);
        if (!selectedVoice) {
            selectedVoice = voices.find(v => v.lang.startsWith('zh'));
        }
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
    }
    
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

export const playPronunciation = async (text: string, language: string = 'zh-CN', apiKeyOverride?: string): Promise<void> => {
  const apiKey = apiKeyOverride || (process.env.API_KEY as string);

  if (!apiKey || !navigator.onLine) {
    return speakNative(text, language);
  }

  const audioContext = getAudioContext();
  const cacheKey = `${language}:${text}`;

  if (audioCache.has(cacheKey)) {
    const cachedBuffer = audioCache.get(cacheKey);
    if (cachedBuffer) {
      playSound(audioContext, cachedBuffer);
      return;
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const promptText = `Say: ${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: promptText,
      config: {
        systemInstruction: "You are a Chinese text-to-speech engine. Read the provided text aloud in standard Mandarin Chinese. Do not provide any introductory text or translation. Just speak the Chinese characters.",
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("No audio data received");
    }

    const audioBytes = decode(base64Audio);
    const audioBuffer = await decodeAudioData(audioBytes, audioContext);
    
    audioCache.set(cacheKey, audioBuffer);
    playSound(audioContext, audioBuffer);

  } catch (error: any) {
    console.error("TTS generation failed, falling back to native", error);
    return speakNative(text, language);
  }
};

function playSound(ctx: AudioContext, buffer: AudioBuffer) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
}