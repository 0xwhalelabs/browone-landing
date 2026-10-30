/* 눈썹 디자인 목록
 *
 * 실제 시술 디자인으로 바꾸려면
 *   1) 배경이 투명한 PNG를 brows/ 폴더에 넣고
 *   2) 아래 목록에 { name: '이름', tag: '결 · 섀도우 같은 설명', src: 'brows/파일이름.png' } 를 추가하세요.
 *
 * 이미지 방향: 한쪽 눈썹만 있는 이미지는 "사진에서 왼쪽에 보이는 눈썹"(앞머리가 오른쪽, 꼬리가 왼쪽) 기준이에요.
 *   반대로 그려진 이미지면 flip: true 를 붙여주세요. 양쪽 눈썹이 같이 있는 이미지는 왼쪽 눈썹만 잘라서 써요.
 *   흰 배경 이미지도 배경을 자동으로 빼서 쓰지만, 투명 PNG가 가장 깔끔해요.
 *
 * sample 항목은 실제 디자인이 준비되기 전까지 쓰는 그림 샘플이에요. 실제 PNG를 넣으면 지워도 돼요.
 */
window.BROW_DESIGNS = [
  { name: '내추럴 일자', tag: '결', sample: { arch: 0.025, peak: 0.66, angular: 0, lift: 0.015, head: 0.15, body: 0.125, tail: 0.028, style: 'hair', seed: 11 } },
  { name: '세미 아치', tag: '결', sample: { arch: 0.06, peak: 0.62, angular: 0.15, lift: 0.01, head: 0.155, body: 0.125, tail: 0.026, style: 'hair', seed: 23 } },
  { name: '소프트 아치', tag: '콤보', sample: { arch: 0.085, peak: 0.6, angular: 0.2, lift: 0, head: 0.16, body: 0.13, tail: 0.025, style: 'combo', seed: 37 } },
  { name: '하이 아치', tag: '섀도우', sample: { arch: 0.12, peak: 0.58, angular: 0.55, lift: -0.005, head: 0.15, body: 0.115, tail: 0.022, style: 'powder', seed: 41 } },
  { name: '도톰 일자', tag: '섀도우', sample: { arch: 0.02, peak: 0.7, angular: 0, lift: 0.02, head: 0.19, body: 0.16, tail: 0.035, style: 'powder', seed: 53 } },
  // { name: '원장 추천 내추럴', tag: '엠보', src: 'brows/natural.png' },
];

/* 그림 샘플 눈썹 만들기 — "사진 왼쪽 눈썹" 방향(앞머리 오른쪽)으로 투명 캔버스에 그려요.
 * p: arch(아치 높이), peak(가장 높은 지점, 0=앞머리 1=꼬리), angular(각진 정도 0~1), lift(꼬리 올림),
 *    head·body·tail(두께, 길이 대비), style('hair' 결 | 'powder' 섀도우 | 'combo'), color, seed
 */
window.drawSampleBrow = (() => {
  const W = 760, H = 260, L = 640, X0 = 700, Y0 = 178;
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const smooth = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const rng = (seed) => { let s = seed >>> 0 || 1; return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296; };
  const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

  return function drawSampleBrow(p) {
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');
    const rand = rng(p.seed || 7);
    const color = p.color || '#3f2b23';
    const rgb = hexRgb(color);

    const bump = (t) => {
      const pk = p.peak, a = p.angular || 0;
      if (t < pk) { const u = t / pk; return (1 - (1 - u) * (1 - u)) * (1 - a) + u * a; }
      const u = (t - pk) / (1 - pk);
      return (1 - u * u) * (1 - a) + (1 - u) * a;
    };
    const center = (t) => ({ x: X0 - L * t, y: Y0 - L * (p.arch * bump(t) + p.lift * t) });
    const half = (t) => (L / 2) * (t < 0.22
      ? p.head + (p.body - p.head) * (t / 0.22)
      : p.body + (p.tail - p.body) * Math.pow((t - 0.22) / 0.78, 1.25));
    // t 지점의 중심·진행 방향(앞머리→꼬리)·아래쪽 법선·반두께
    const frame = (t) => {
      const a = center(Math.max(0, t - 0.003)), b = center(Math.min(1, t + 0.003));
      let tx = b.x - a.x, ty = b.y - a.y;
      const m = Math.hypot(tx, ty) || 1; tx /= m; ty /= m;
      return { c: center(t), tx, ty, nx: ty, ny: -tx, h: half(t) };
    };
    // 앞머리는 옅게 시작해서 몸통에서 진해지고 꼬리 끝에서 살짝 빠져요
    const dens = (t) => (0.42 + 0.58 * smooth(0, 0.3, t)) * (1 - 0.25 * smooth(0.86, 1, t));

    const outline = (scale) => {
      const N = 90, path = new Path2D();
      const pt = (t, side) => { const f = frame(t), h = f.h * scale * side; return [f.c.x + f.nx * h, f.c.y + f.ny * h]; };
      const f0 = frame(0), h0 = f0.h * scale, b0 = pt(0, 1), t0 = pt(0, -1);
      const ox = -f0.tx * h0 * 0.6, oy = -f0.ty * h0 * 0.6;
      path.moveTo(b0[0], b0[1]);
      path.bezierCurveTo(b0[0] + ox, b0[1] + oy, t0[0] + ox, t0[1] + oy + h0 * 0.15, t0[0], t0[1]);
      for (let i = 1; i <= N; i++) { const q = pt(i / N, -1); path.lineTo(q[0], q[1]); }
      for (let i = N; i >= 0; i--) { const q = pt(i / N, 1); path.lineTo(q[0], q[1]); }
      path.closePath();
      return path;
    };

    // 섀도우(파우더): 흐린 가장자리 + 길이 방향 농도 + 잔 점묘
    const powder = (alpha) => {
      const tmp = document.createElement('canvas');
      tmp.width = W; tmp.height = H;
      const tg = tmp.getContext('2d', { willReadFrequently: true });
      // ctx.filter 대신 그림자 블러로 가장자리를 흐려요(사파리에서도 동작)
      tg.shadowColor = color; tg.shadowBlur = 9; tg.shadowOffsetX = W + 40;
      tg.translate(-(W + 40), 0);
      tg.fillStyle = color;
      tg.fill(outline(0.94));
      const im = tg.getImageData(0, 0, W, H), d = im.data;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        if (d[i + 3]) d[i + 3] *= alpha * dens((X0 - x) / L) * (0.8 + 0.2 * rand());
      }
      tg.putImageData(im, 0, 0);
      g.drawImage(tmp, 0, 0);
    };

    // 결(헤어스트로크): 앞머리는 위로 서고, 몸통은 아래 결이 위로·위 결이 아래로 모여요
    const hairs = (count, alpha, width) => {
      g.save();
      g.clip(outline(1.1));
      g.lineCap = 'round';
      const hmax = (L / 2) * Math.max(p.head, p.body);
      let drawn = 0, guard = 0;
      while (drawn < count && guard++ < count * 20) {
        const t = rand(), f = frame(t);
        if (rand() > f.h / hmax) continue;
        drawn++;
        const s = rand() * 2 - 1;
        const rx = f.c.x + f.nx * f.h * s * 0.92, ry = f.c.y + f.ny * f.h * s * 0.92;
        const headness = 1 - smooth(0.06, 0.3, t);
        const body = s > 0 ? 0.32 + 0.3 * s : -0.12 + 0.14 * s;
        const ang = body * (1 - headness) + 1.2 * headness + (rand() - 0.5) * 0.22;
        const ca = Math.cos(ang), sa = Math.sin(ang);
        const dx = f.tx * ca - f.nx * sa, dy = f.ty * ca - f.ny * sa;
        const len = 2 * f.h * (0.5 + 0.45 * rand()) * (1 - 0.25 * headness);
        const ex = rx + dx * len, ey = ry + dy * len;
        let px = -dy, py = dx;
        if (px * f.tx + py * f.ty < 0) { px = -px; py = -py; }
        const bend = len * (0.1 + 0.1 * rand()), k = 0.78 + 0.4 * rand();
        g.strokeStyle = `rgba(${(rgb[0] * k) | 0},${(rgb[1] * k) | 0},${(rgb[2] * k) | 0},${(alpha * dens(t) * (0.55 + 0.45 * rand())).toFixed(3)})`;
        g.lineWidth = width * (0.75 + 0.5 * rand());
        g.beginPath();
        g.moveTo(rx, ry);
        g.quadraticCurveTo((rx + ex) / 2 + px * bend, (ry + ey) / 2 + py * bend, ex, ey);
        g.stroke();
      }
      g.restore();
    };

    if (p.style === 'powder') powder(0.95);
    else if (p.style === 'combo') { powder(0.5); hairs(260, 0.85, 2.1); }
    else { powder(0.16); hairs(420, 0.9, 2.1); }
    return c;
  };
})();
