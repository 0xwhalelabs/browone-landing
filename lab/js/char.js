/* BrowChar — the brow-hair generator behind the signature move: a brow built from procedural hair
   strokes (head → tail angles), the same idea as the feathering generator in films/20261027_browone-ad.
   Used for the hero brow, the progress brow, the analysing screen, the draw cards and the PNG cards.
   (Result people are illustrations in assets/img; COLORS are the per-result type colours.) */
(function () {
  const BROW = '#4a3238', BROW2 = '#6b4a47';

  const COLORS = {
    rose:   { bg: '#f9e0e1', mid: '#f0c0c4', deep: '#d58d96', ink: '#9b4f5a' },
    peach:  { bg: '#fde4d4', mid: '#f7c4a6', deep: '#e49a72', ink: '#a05a36' },
    butter: { bg: '#fbf0cc', mid: '#f3db92', deep: '#d9ad45', ink: '#8a6a17' },
    sage:   { bg: '#e4edda', mid: '#c4d8b8', deep: '#8fae86', ink: '#4f6e48' },
    lilac:  { bg: '#ece3f5', mid: '#d4c3ea', deep: '#a58bc9', ink: '#634a8c' },
    sky:    { bg: '#e0ebf6', mid: '#bdd3ea', deep: '#7ea5cf', ink: '#3f6690' },
    cocoa:  { bg: '#eee1da', mid: '#d9bfb2', deep: '#9a7366', ink: '#5e4038' }
  };

  // ---------- seeded rng ----------
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  const f1 = n => (Math.round(n * 10) / 10).toString();

  // ---------- brow geometry ----------
  const bump = (s, p) => s < p ? Math.sin(Math.PI / 2 * s / p) : Math.cos(Math.PI / 2 * (s - p) / (1 - p));
  const bumpLin = (s, p) => s < p ? Math.pow(s / p, 0.92) : 1 - Math.pow((s - p) / (1 - p), 1.15);
  const SHAPES = {
    'straight':  s => -0.055 * bump(s, 0.55) + 0.035 * s,
    'soft-arch': s => -0.16 * bump(s, 0.62) + 0.045 * s,
    'high-arch': s => -0.27 * bump(s, 0.6) + 0.08 * s,
    'angled':    s => -0.23 * bumpLin(s, 0.66) + 0.09 * s,
    'round':     s => -0.21 * Math.sin(Math.PI * s) + 0.06 * s,
    'up':        s => -0.17 * s - 0.07 * Math.sin(Math.PI * s),
    'down':      s => 0.15 * Math.pow(s, 1.3) - 0.07 * Math.sin(Math.PI * s)
  };
  const THICK = { thin: 0.14, mid: 0.2, bold: 0.27 };
  const DENS = { thin: 0.7, mid: 1.0, bold: 1.35 };

  /* One brow. H = head (inner) point, dx = +1 tail to the right / -1 to the left, L = length.
     opt: { w: hair width, dens: density multiplier, seed, boost: thickness multiplier }
     → { base: soft body path d, hairs: [{ d, w, o, c, s }] sorted head → tail } */
  function brow(shape, thick, H, dx, L, opt) {
    const yf = SHAPES[shape] || SHAPES['soft-arch'];
    const T0 = L * (THICK[thick] || THICK.mid) * (opt.boost || 1);
    const sp = s => [H[0] + dx * s * L, H[1] + yf(s) * L];
    const tan = s => { const a = sp(Math.max(0, s - 0.01)), b = sp(Math.min(1, s + 0.01)); return Math.atan2(b[1] - a[1], b[0] - a[0]); };
    const up = a => { const n = [Math.sin(a) * dx, -Math.cos(a) * dx]; return n[1] > 0 ? [-n[0], -n[1]] : n; };
    const prof = s => (s < 0.1 ? 0.78 + 2.2 * s : 1) * (1 - 0.72 * Math.pow(s, 1.8));
    // soft body (powder layer): spine ± T/2
    const top = [], bot = [];
    for (let i = 0; i <= 24; i++) {
      const s = i / 24, c = sp(s), n = up(tan(s)), T = T0 * prof(s) / 2;
      top.push([c[0] + n[0] * T, c[1] + n[1] * T]); bot.push([c[0] - n[0] * T, c[1] - n[1] * T]);
    }
    const base = 'M' + top.concat(bot.reverse()).map(p => f1(p[0]) + ' ' + f1(p[1])).join(' L') + ' Z';
    // hairs: steep at the head, flattening toward the tail; lower hairs lie flatter
    const r = rng(opt.seed), N = Math.round(L * (DENS[thick] || 1) * (opt.dens || 1)), hairs = [];
    for (let i = 0; i < N; i++) {
      const s = 0.01 + Math.pow(r(), 0.85) * 0.97, v = r() * 0.7 - 0.35, c = sp(s), a = tan(s), T = T0 * prof(s), n = up(a);
      const b = [c[0] - n[0] * v * T, c[1] - n[1] * v * T];
      let off = s < 0.18 ? -60 + s * 70 : s < 0.6 ? -44 + (s - 0.18) / 0.42 * 26 : -18 + (s - 0.6) / 0.4 * 10;
      if (v > 0.1) off += 12;
      const th = a + dx * (off + (r() - 0.5) * 9) * Math.PI / 180;
      const dir = [Math.cos(th), Math.sin(th)], Lh = T * (s < 0.12 ? 0.5 : 0.62) + opt.w * 1.2 + r() * T * 0.14;
      const p0 = [b[0] - dir[0] * Lh * 0.5, b[1] - dir[1] * Lh * 0.5], p2 = [p0[0] + dir[0] * Lh, p0[1] + dir[1] * Lh];
      const bend = (r() * 0.5 + 0.1) * Lh * 0.2 * dx, p1 = [(p0[0] + p2[0]) / 2 + dir[1] * bend, (p0[1] + p2[1]) / 2 - dir[0] * bend];
      hairs.push({ s: s + r() * 0.06, d: `M${f1(p0[0])} ${f1(p0[1])}Q${f1(p1[0])} ${f1(p1[1])} ${f1(p2[0])} ${f1(p2[1])}`,
        w: opt.w * (0.8 + r() * 0.45), o: 0.62 + r() * 0.36, c: r() < 0.28 ? BROW2 : BROW });
    }
    hairs.sort((a, b) => a.s - b.s);
    return { base, hairs };
  }

  window.BrowChar = { brow, COLORS, rng };
})();
