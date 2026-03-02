
// app/services/soundService.ts v1.3.4
type SoundEffect = 'correct' | 'error' | 'complete';

class SoundService {
  private audioContext: AudioContext | null = null;

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

  public playSound(name: SoundEffect): void {
    this.initializeAudioContext();
    const ctx = this.audioContext;
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (name === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
      osc.start(t);
      osc.stop(t + 0.3);
    } else if (name === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.2);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
      osc.start(t);
      osc.stop(t + 0.3);
    } else if (name === 'complete') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);
      osc.frequency.setValueAtTime(800, t + 0.15);
      osc.frequency.exponentialRampToValueAtTime(1600, t + 0.25);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.1, t + 0.1);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
      
      osc.start(t);
      osc.stop(t + 0.4);
    }
  }

  public preloadSounds(): void {
    // No longer needed since we synthesize sounds
  }
}

export const soundService = new SoundService();
