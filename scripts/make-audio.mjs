// Synthesizes the BGM + light SFX for the motion piece.
// Pure Node, no dependencies. Output: public/audio/bgm.wav
import fs from 'node:fs';
import path from 'node:path';

const SR = 44100;
const DURATION = 30.6;
const N = Math.floor(SR * DURATION);
const L = new Float32Array(N);
const R = new Float32Array(N);

const clamp = (x, a = -1, b = 1) => Math.min(b, Math.max(a, x));
const rnd = (() => {
  let s = 1234567;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
})();

const add = (t, v, pan = 0) => {
  const i = Math.floor(t * SR);
  if (i < 0 || i >= N) return;
  const gl = Math.cos(((pan + 1) * Math.PI) / 4);
  const gr = Math.sin(((pan + 1) * Math.PI) / 4);
  L[i] += v * gl;
  R[i] += v * gr;
};

const env = (t, dur, attack = 0.005, release = 0.08) => {
  if (t < 0 || t > dur) return 0;
  const a = Math.min(1, t / attack);
  const r = Math.min(1, Math.max(0, (dur - t) / release));
  return a * r;
};

const kick = (t0, gain = 0.5) => {
  for (let t = 0; t < 0.34; t += 1 / SR) {
    const f = 118 * Math.exp(-t * 26) + 44;
    const a = Math.exp(-t * 9) * 0.9;
    const click = t < 0.004 ? (rnd() * 2 - 1) * 0.3 : 0;
    add(t0 + t, (Math.sin(2 * Math.PI * f * t) * a + click) * gain);
  }
};

const snare = (t0, gain = 0.14) => {
  for (let t = 0; t < 0.16; t += 1 / SR) {
    const n = rnd() * 2 - 1;
    const a = Math.exp(-t * 30);
    add(t0 + t, (n * 0.55 + Math.sin(2 * Math.PI * 190 * t) * 0.45) * a * gain, 0.05);
  }
};

const hat = (t0, gain = 0.05, pan = -0.25) => {
  let prev = 0;
  for (let t = 0; t < 0.055; t += 1 / SR) {
    const n = rnd() * 2 - 1;
    const hp = n - prev;
    prev = n;
    add(t0 + t, hp * Math.exp(-t * 70) * gain, pan);
  }
};

const note = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

const bass = (t0, midi, dur = 0.7, gain = 0.2) => {
  const f = note(midi);
  for (let t = 0; t < dur; t += 1 / SR) {
    const a = env(t, dur, 0.01, 0.2);
    const s = Math.sin(2 * Math.PI * f * t) * 0.85 + Math.sin(2 * Math.PI * f * 2 * t) * 0.15;
    add(t0 + t, s * a * gain);
  }
};

const ep = (t0, midi, dur = 1.4, gain = 0.06, pan = 0) => {
  const f = note(midi);
  for (let t = 0; t < dur; t += 1 / SR) {
    const a = Math.exp(-t * 2.4) * env(t, dur, 0.008, 0.3);
    const s =
      Math.sin(2 * Math.PI * f * t) * 0.6 +
      Math.sin(2 * Math.PI * f * 2 * t) * 0.22 +
      Math.sin(2 * Math.PI * f * 3.01 * t) * 0.1;
    add(t0 + t, s * a * gain, pan);
  }
};

const pluck = (t0, midi, gain = 0.07, pan = 0.15) => {
  const f = note(midi);
  for (let t = 0; t < 0.7; t += 1 / SR) {
    const a = Math.exp(-t * 7) * env(t, 0.7, 0.004, 0.1);
    const s = Math.sin(2 * Math.PI * f * t) * 0.8 + Math.sin(2 * Math.PI * f * 2 * t) * 0.18;
    add(t0 + t, s * a * gain, pan);
  }
};

// ---------------- harmony ----------------
const BPM = 96;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const chords = [
  [60, 64, 67, 71], // Cmaj7
  [57, 60, 64, 67], // Am7
  [53, 57, 60, 64], // Fmaj7
  [55, 59, 62, 65], // G7
];
const roots = [36, 33, 29, 31];
const melody = [72, 74, 76, 79, 76, 74, 72, 67, 69, 72, 74, 76, 79, 76, 74, 72];

for (let bar = 0; bar < 12; bar++) {
  const t0 = bar * BAR;
  const ch = chords[bar % 4];
  const root = roots[bar % 4];
  for (let b = 0; b < 4; b++) {
    const t = t0 + b * BEAT;
    if (b === 0 || b === 2) kick(t, 0.32);
    if (b === 1 || b === 3) snare(t, 0.1);
    hat(t, 0.035);
    hat(t + BEAT / 2, 0.022, 0.25);
  }
  bass(t0, root, 0.9, 0.15);
  bass(t0 + BEAT * 2, root + 7, 0.7, 0.11);
  bass(t0 + BEAT * 3.5, root + 12, 0.45, 0.08);
  ch.forEach((m, i) => ep(t0 + 0.02 + i * 0.012, m, 1.6, 0.045, (i - 1.5) * 0.2));
  ch.forEach((m, i) => ep(t0 + BEAT * 2.5 + i * 0.01, m, 1.1, 0.032, (1.5 - i) * 0.2));
  // sparse melody
  const m1 = melody[(bar * 2) % melody.length];
  const m2 = melody[(bar * 2 + 1) % melody.length];
  if (bar % 2 === 0) pluck(t0 + BEAT * 1.5, m1, 0.05, 0.2);
  if (bar % 3 !== 1) pluck(t0 + BEAT * 3, m2, 0.04, -0.2);
}

// ---------------- SFX ----------------
// typing ticks
for (let i = 0; i < 22; i++) {
  const t = 0.12 + i * 0.055;
  for (let k = 0; k < 0.012; k += 1 / SR) {
    add(t + k, (rnd() * 2 - 1) * Math.exp(-k * 240) * 0.03, 0.1);
  }
}
// terminal confirm
[72, 76, 79].forEach((m, i) => pluck(1.12 + i * 0.07, m, 0.055));

// whoosh at 5.2s
{
  const t0 = 5.15;
  let prev = 0;
  for (let t = 0; t < 0.55; t += 1 / SR) {
    const n = rnd() * 2 - 1;
    const bp = n - prev * 0.7;
    prev = n;
    const a = Math.sin(Math.PI * Math.min(1, t / 0.55)) ** 2 * 0.12;
    add(t0 + t, bp * a, Math.sin(t * 9) * 0.4);
  }
}
// metallic clang 5.62
{
  const t0 = 5.62;
  const partials = [420, 781, 1190, 1620, 2360];
  for (let t = 0; t < 0.9; t += 1 / SR) {
    let s = 0;
    partials.forEach((f, i) => {
      s += Math.sin(2 * Math.PI * f * t + i) * Math.exp(-t * (4 + i * 2)) / (i + 1);
    });
    add(t0 + t, s * 0.09);
  }
}
// pops when clips land
[1.72, 2.78, 3.72, 4.72, 5.6].forEach((t, i) => {
  for (let k = 0; k < 0.09; k += 1 / SR) {
    const f = 420 + i * 40;
    add(t + k, Math.sin(2 * Math.PI * f * k) * Math.exp(-k * 40) * 0.06);
  }
});

// ctrl+z click
[0.0, 0.045].forEach((d) => {
  for (let k = 0; k < 0.03; k += 1 / SR) {
    add(10.62 + d + k, (rnd() * 2 - 1) * Math.exp(-k * 160) * 0.05);
  }
});
// stamp thud 11.2
for (let k = 0; k < 0.2; k += 1 / SR) {
  add(11.2 + k, Math.sin(2 * Math.PI * 90 * k) * Math.exp(-k * 26) * 0.14);
}

// saturation slam riser 14.9-15.3 + boom
{
  const t0 = 14.9;
  for (let t = 0; t < 0.4; t += 1 / SR) {
    const f = 300 * Math.exp(t * 2.6);
    add(t0 + t, Math.sin(2 * Math.PI * f * t) * (t / 0.4) * 0.05);
  }
  for (let k = 0; k < 0.5; k += 1 / SR) {
    add(15.3 + k, Math.sin(2 * Math.PI * 62 * k) * Math.exp(-k * 7) * 0.22);
  }
}

// beat marker ticks 20.6-22.2
for (let i = 0; i < 34; i++) {
  const t = 20.6 + i * 0.048;
  if (t > 22.1) break;
  for (let k = 0; k < 0.02; k += 1 / SR) {
    add(t + k, Math.sin(2 * Math.PI * 1450 * k) * Math.exp(-k * 180) * 0.022, i % 2 ? 0.3 : -0.3);
  }
}

// export click + render hum + done chime
{
  for (let k = 0; k < 0.05; k += 1 / SR) add(23.0 + k, (rnd() * 2 - 1) * Math.exp(-k * 90) * 0.06);
  for (let t = 23.1; t < 26.1; t += 1 / SR) {
    const a = Math.min(1, (t - 23.1) / 0.2) * Math.min(1, (26.1 - t) / 0.3);
    add(t, (Math.sin(2 * Math.PI * 110 * t) * 0.2 + Math.sin(2 * Math.PI * 220 * t) * 0.08) * a * 0.03);
  }
  [72, 76, 79, 84].forEach((m, i) => pluck(26.2 + i * 0.09, m, 0.06));
}

// gentle master fade + soft clip
const fadeIn = 0.5;
const fadeOut = 1.2;
const out = Buffer.alloc(44 + N * 2 * 2);
out.write('RIFF', 0);
out.writeUInt32LE(36 + N * 4, 4);
out.write('WAVE', 8);
out.write('fmt ', 12);
out.writeUInt32LE(16, 16);
out.writeUInt16LE(1, 20);
out.writeUInt16LE(2, 22);
out.writeUInt32LE(SR, 24);
out.writeUInt32LE(SR * 4, 28);
out.writeUInt16LE(4, 32);
out.writeUInt16LE(16, 34);
out.write('data', 36);
out.writeUInt32LE(N * 4, 40);

for (let i = 0; i < N; i++) {
  const t = i / SR;
  const g = Math.min(1, t / fadeIn) * Math.min(1, (DURATION - t) / fadeOut);
  const l = clamp(Math.tanh(L[i] * 1.2) * 0.85 * g);
  const r = clamp(Math.tanh(R[i] * 1.2) * 0.85 * g);
  out.writeInt16LE(Math.round(l * 32767), 44 + i * 4);
  out.writeInt16LE(Math.round(r * 32767), 46 + i * 4);
}

const dest = path.join(process.cwd(), 'public', 'audio', 'bgm.wav');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, out);
console.log('wrote', dest, (out.length / 1024 / 1024).toFixed(2), 'MB');
