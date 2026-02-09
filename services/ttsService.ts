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
  return new Promise<void>((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error("Browser does not support Speech Synthesis"));
      return;
    }

    // Cancel any current speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // e.g., 'zh-CN'
    utterance.rate = 0.8; // Slightly slower for learning
    
    utterance.onend = () => {
      resolve();
    };
    
    utterance.onerror = (e) => {
      console.error("Native TTS Error", e);
      // Even on error, we resolve to unblock UI, but log it.
      resolve(); 
    };

    window.speechSynthesis.speak(utterance);
  });
}

export const playPronunciation = async (text: string, language: string = 'zh-CN'): Promise<void> => {
  const apiKey = process.env.API_KEY;

  // 1. Check Offline / No API Key -> Immediate Native Fallback
  if (!apiKey || !navigator.onLine) {
    console.log("Using native TTS (Offline/No Key)");
    return speakNative(text, 'zh-CN');
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
    
    // Construct a natural prompt based on the text type
    const promptText = `Please read the following Chinese text clearly and naturally: "${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: promptText }] }],
      config: {
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
    return speakNative(text, 'zh-CN');
  }
};

function playSound(ctx: AudioContext, buffer: AudioBuffer) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
}