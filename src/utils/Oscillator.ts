type TOscillatorType = "sine" | "square" | "sawtooth" | "triangle";

export class Oscillator {
  public oscillator;
  public type;
  // frequency in Hertz
  public frequency;
  public gain;
  public audioCtx;
  constructor(type: TOscillatorType, frequency: number, ctx: any) {
    this.type = type;
    this.audioCtx = ctx;
    this.frequency = frequency;
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.type = this.type;
    this.oscillator.frequency.setValueAtTime(
      this.frequency,
      this.audioCtx.currentTime
    );
    this.gain = this.audioCtx.createGain();
    this.oscillator.connect(this.gain);
    this.oscillator.connect(this.audioCtx.destination);
    this.oscillator.start();
  }
  setType(type: TOscillatorType) {
    this.oscillator.type = type;
  }

  setFrequency(frequency: number) {
    this.frequency = frequency;
    this.oscillator.frequency.setValueAtTime(
      frequency,
      this.audioCtx.currentTime
    );
  }

  setSound(newGain: number) {
    this.gain.gain.setValueAtTime(
      this.gain.gain.value,
      this.audioCtx.currentTime
    );
    this.gain.gain.linearRampToValueAtTime(
      newGain,
      this.audioCtx.currentTime + 1 * 0.3
    );
  }
  mute(newGain: number) {
    this.gain.gain.setValueAtTime(
      this.gain.gain.value,
      this.audioCtx.currentTime
    );
    this.gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 2);
  }

  stop() {
    this.oscillator.stop();
  }
}
