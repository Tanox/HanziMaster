/**
 * ttsService.ts
 * HanziMaster v0.4.2
 * 更新日期: 2026-02-12 22:52
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
  // Ensure context is running (browsers may suspend it if no user gesture)
  if (sharedAudioContext.state === 'suspended') {
    sharedAudioContext.resume();
  }
  return sharedAudioContext;
}

// Helper to decode Base64
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper to decode Audio Data
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

// Fallback: Browser Native TTS
function speakNative(text: string, lang: string = 'zh-CN') {
  return new Promise<void>((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve(); // Fail silently/gracefully so UI doesn't break
      return;
    }

    // Cancel any current speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // e.g., 'zh-CN'
    utterance.rate = 0.8; // Slightly slower for learning

    // Attempt to pick a voice that matches the language
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Try to find a voice matching the specific lang code (zh-CN)
      let selectedVoice = voices.find(v => v.lang === lang);
      // Fallback to any voice starting with zh (e.g. zh-TW or zh-HK if CN not found)
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('zh'));
      }
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (e) => {
      console.warn("Native TTS Error", e);
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
}

export const playPronunciation = async (text: string, language: string = 'zh-CN', apiKeyOverride?: string): Promise<void> => {
  const apiKey = apiKeyOverride || process.env.API_KEY;

  // 1. Check Offline / No API Key -> Immediate Native Fallback
  if (!apiKey || !navigator.onLine) {
    console.log("Using native TTS (Offline/No Key)");
    return speakNative(text, language);
  }

  const audioContext = getAudioContext();
  const cacheKey = `${language}:${text}`;

  // 2. Check Cache
  if (audioCache.has(cacheKey)) {
    const cachedBuffer = audioCache.get(cacheKey);
    if (cachedBuffer) {
      playSound(audioContext, cachedBuffer);
      return;
    }
  }

  try {
    // 3. Try Gemini API
    const ai = new GoogleGenAI({ apiKey });

    // Use a very direct prompt to reduce chance of chatty intro/outro
    const promptText = `Say: ${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: promptText }] }],
      config: {
        // System instruction forces the model to behave purely as a TTS engine
        systemInstruction: "You are a Chinese text-to-speech engine. Read the provided text aloud in standard Mandarin Chinese. Do not provide any introductory text or translation. Just speak the Chinese characters.",
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              // 'Kore' is a good balanced voice.
              voiceName: 'Kore'
            },
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

    // Cache the decoded buffer for future use
    audioCache.set(cacheKey, audioBuffer);

    playSound(audioContext, audioBuffer);

  } catch (error: any) {
    if (error.status === 429 || (error.message && error.message.includes('429'))) {
      console.warn("Gemini TTS Quota Exceeded. Falling back to native.");
    } else {
      console.warn("Gemini TTS failed, falling back to native:", error);
    }
    // 4. Fallback to Native if API fails
    return speakNative(text, language);
  }
};

function playSound(ctx: AudioContext, buffer: AudioBuffer) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
}