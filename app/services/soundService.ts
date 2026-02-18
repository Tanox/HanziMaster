
// app/services/soundService.ts v1.0.5
type SoundEffect = 'correct' | 'error' | 'complete';

class SoundService {
  private audioContext: AudioContext | null = null;
  private soundCache: Map<SoundEffect, AudioBuffer> = new Map();
  private isLoading: Set<SoundEffect> = new Set();

  private initializeAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.error("Web Audio API is not supported in this browser.");
      }
    }
    // Resume context if it's suspended (e.g., due to browser policy on user interaction)
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  private async loadSound(name: SoundEffect): Promise<AudioBuffer | null> {
    this.initializeAudioContext();
    if (!this.audioContext) return null;
    if (this.soundCache.has(name)) return this.soundCache.get(name)!;
    if (this.isLoading.has(name)) return null;

    this.isLoading.add(name);
    try {
      // Assuming sound files are located in /public/audio/
      const response = await fetch(`/audio/${name}.mp3`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.soundCache.set(name, audioBuffer);
      return audioBuffer;
    } catch (e) {
      console.warn(`Failed to load sound: ${name}.mp3`, e);
      return null;
    } finally {
      this.isLoading.delete(name);
    }
  }

  public playSound(name: SoundEffect): void {
    this.initializeAudioContext();
    const audioCtx = this.audioContext;
    if (!audioCtx) return;

    const play = (buffer: AudioBuffer) => {
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(0);
    };

    if (this.soundCache.has(name)) {
      play(this.soundCache.get(name)!);
    } else {
      this.loadSound(name).then(buffer => {
        if (buffer) play(buffer);
      });
    }
  }

  public preloadSounds(): void {
    // Preload sounds without waiting for them to complete.
    // This warms up the cache for a better user experience.
    this.loadSound('correct');
    this.loadSound('error');
    this.loadSound('complete');
  }
}

export const soundService = new SoundService();
