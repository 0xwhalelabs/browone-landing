/* 눈썹 디자인 목록
 *
 * 실제 시술 디자인으로 바꾸려면
 *   1) 배경이 투명한 PNG를 brows/ 폴더에 넣고
 *   2) 아래 목록에 { name: '이름', cat: '페더링', tag: '설명', src: 'brows/파일이름.png' } 를 추가하세요.
 *      cat 은 위쪽 분류 탭(페더링 · 콤보 · 섀도우 · 남성)이고, tag 는 이름 아래 작은 글씨예요(없으면 cat).
 *
 * 이미지 방향: 한쪽 눈썹만 있는 이미지는 "사진에서 왼쪽에 보이는 눈썹"(앞머리가 오른쪽, 꼬리가 왼쪽) 기준이에요.
 *   반대로 그려진 이미지면 flip: true 를 붙여주세요. 양쪽 눈썹이 같이 있는 이미지는 왼쪽 눈썹만 잘라서 써요.
 *   흰 배경 이미지도 배경을 자동으로 빼서 쓰지만, 투명 PNG가 가장 깔끔해요.
 *
 * sample 항목은 코드로 그린 디자인이에요(실제 시술 사진이 아님). 실제 PNG가 준비되면 바꾸거나 지워도 돼요.
 *   style   feather 페더링 결 | natural 생눈썹 같은 잔결 | combo 결 + 음영 | shadow 섀도우 | ombre 앞머리가 더 흐린 섀도우
 *   arch    아치 높이(눈썹 길이 대비)   peak 아치 꼭대기 위치(0 앞머리 ~ 1 꼬리)   angular 각진 정도(0~1)
 *   lift    꼬리 끝 높이(앞머리 아랫선 기준)   head·body·tail 앞머리·몸통·꼬리 두께(길이 대비)
 *   round   앞머리 둥근 정도(0 각진 ~ 1 둥근)   density 결 촘촘함   weight 결 굵기   seed 결 배치(바꾸면 결이 달라져요)
 */
window.BROW_DESIGNS = [
  // 페더링: 한 올씩 그린 결
  { name: '내추럴 일자', cat: '페더링', sample: { style: 'feather', arch: 0.025, peak: 0.68, lift: 0.02, head: 0.15, body: 0.145, tail: 0.026, seed: 11 } },
  { name: '소프트 일자', cat: '페더링', sample: { style: 'feather', arch: 0.04, peak: 0.66, lift: 0.015, head: 0.135, body: 0.13, tail: 0.024, seed: 12 } },
  { name: '세미 아치', cat: '페더링', sample: { style: 'feather', arch: 0.065, peak: 0.64, angular: 0.15, lift: 0.01, head: 0.145, body: 0.135, tail: 0.024, seed: 13 } },
  { name: '내추럴 아치', cat: '페더링', sample: { style: 'feather', arch: 0.09, peak: 0.62, angular: 0.25, lift: 0.005, head: 0.145, body: 0.135, tail: 0.023, seed: 14 } },
  { name: '하이 아치', cat: '페더링', sample: { style: 'feather', arch: 0.125, peak: 0.6, angular: 0.5, lift: 0, head: 0.14, body: 0.125, tail: 0.022, seed: 15 } },
  { name: '도톰 일자', cat: '페더링', sample: { style: 'feather', arch: 0.025, peak: 0.7, lift: 0.025, head: 0.18, body: 0.172, tail: 0.032, density: 1.15, seed: 16 } },
  { name: '슬림 아치', cat: '페더링', sample: { style: 'feather', arch: 0.085, peak: 0.6, angular: 0.35, lift: 0.01, head: 0.115, body: 0.105, tail: 0.02, weight: 0.9, seed: 17 } },
  { name: '라운드 아치', cat: '페더링', sample: { style: 'feather', arch: 0.1, peak: 0.56, angular: 0, lift: -0.01, head: 0.145, body: 0.135, tail: 0.024, seed: 18 } },
  { name: '생눈썹 결 일자', cat: '페더링', tag: '페더링 · 잔결', sample: { style: 'natural', arch: 0.035, peak: 0.66, lift: 0.02, head: 0.16, body: 0.15, tail: 0.028, seed: 19 } },
  { name: '생눈썹 결 아치', cat: '페더링', tag: '페더링 · 잔결', sample: { style: 'natural', arch: 0.08, peak: 0.62, angular: 0.2, lift: 0.01, head: 0.15, body: 0.14, tail: 0.025, seed: 20 } },

  // 콤보: 앞머리는 결, 몸통·꼬리는 은은한 음영
  { name: '콤보 일자', cat: '콤보', sample: { style: 'combo', arch: 0.03, peak: 0.68, lift: 0.02, head: 0.155, body: 0.15, tail: 0.028, seed: 31 } },
  { name: '콤보 세미 아치', cat: '콤보', sample: { style: 'combo', arch: 0.065, peak: 0.64, angular: 0.15, lift: 0.01, head: 0.15, body: 0.14, tail: 0.025, seed: 32 } },
  { name: '콤보 아치', cat: '콤보', sample: { style: 'combo', arch: 0.1, peak: 0.61, angular: 0.3, lift: 0.005, head: 0.145, body: 0.135, tail: 0.023, seed: 33 } },
  { name: '콤보 도톰 일자', cat: '콤보', sample: { style: 'combo', arch: 0.025, peak: 0.7, lift: 0.025, head: 0.185, body: 0.175, tail: 0.032, seed: 34 } },
  { name: '콤보 각진 아치', cat: '콤보', sample: { style: 'combo', arch: 0.105, peak: 0.63, angular: 0.5, lift: 0.01, head: 0.145, body: 0.13, tail: 0.022, seed: 35 } },
  { name: '콤보 업꼬리', cat: '콤보', sample: { style: 'combo', arch: 0.07, peak: 0.7, angular: 0.35, lift: 0.05, head: 0.145, body: 0.135, tail: 0.024, seed: 36 } },

  // 섀도우: 앞머리는 흐리게, 꼬리로 갈수록 또렷한 음영
  { name: '섀도우 일자', cat: '섀도우', sample: { style: 'shadow', arch: 0.03, peak: 0.68, lift: 0.02, head: 0.15, body: 0.145, tail: 0.027, seed: 51 } },
  { name: '섀도우 세미 아치', cat: '섀도우', sample: { style: 'shadow', arch: 0.065, peak: 0.64, angular: 0.15, lift: 0.01, head: 0.145, body: 0.135, tail: 0.024, seed: 52 } },
  { name: '그라데이션 아치', cat: '섀도우', sample: { style: 'ombre', arch: 0.095, peak: 0.62, angular: 0.3, lift: 0.005, head: 0.145, body: 0.135, tail: 0.023, seed: 53 } },
  { name: '섀도우 하이 아치', cat: '섀도우', sample: { style: 'shadow', arch: 0.12, peak: 0.6, angular: 0.35, lift: 0, head: 0.14, body: 0.125, tail: 0.022, seed: 54 } },
  { name: '소프트 섀도우 도톰', cat: '섀도우', sample: { style: 'ombre', arch: 0.03, peak: 0.7, lift: 0.025, head: 0.18, body: 0.172, tail: 0.032, seed: 55 } },
  { name: '섀도우 슬림 아치', cat: '섀도우', sample: { style: 'shadow', arch: 0.085, peak: 0.6, angular: 0.35, lift: 0.01, head: 0.115, body: 0.105, tail: 0.02, seed: 56 } },

  // 남성: 두껍고 앞머리가 각진 모양
  { name: '남자 일자', cat: '남성', tag: '남성 · 페더링', sample: { style: 'feather', arch: 0.02, peak: 0.7, lift: 0.02, head: 0.205, body: 0.2, tail: 0.042, round: 0.4, density: 1.35, weight: 1.12, seed: 71 } },
  { name: '남자 각진 눈썹', cat: '남성', tag: '남성 · 페더링', sample: { style: 'feather', arch: 0.075, peak: 0.66, angular: 0.85, lift: 0.025, head: 0.195, body: 0.185, tail: 0.038, round: 0.35, density: 1.35, weight: 1.12, seed: 72 } },
  { name: '남자 생눈썹 결', cat: '남성', tag: '남성 · 잔결', sample: { style: 'natural', arch: 0.035, peak: 0.68, lift: 0.02, head: 0.21, body: 0.2, tail: 0.042, round: 0.45, density: 1.25, weight: 1.1, seed: 73 } },
  { name: '남자 상승 눈썹', cat: '남성', tag: '남성 · 페더링', sample: { style: 'feather', arch: 0.05, peak: 0.74, angular: 0.6, lift: 0.06, head: 0.19, body: 0.185, tail: 0.04, round: 0.4, density: 1.3, weight: 1.12, seed: 74 } },
  { name: '남자 콤보 일자', cat: '남성', tag: '남성 · 콤보', sample: { style: 'combo', arch: 0.025, peak: 0.7, lift: 0.02, head: 0.2, body: 0.195, tail: 0.042, round: 0.4, density: 1.2, weight: 1.1, seed: 75 } },
  { name: '남자 섀도우', cat: '남성', tag: '남성 · 섀도우', sample: { style: 'shadow', arch: 0.03, peak: 0.7, lift: 0.02, head: 0.2, body: 0.195, tail: 0.042, round: 0.4, seed: 76 } },
  // { name: '원장 추천 내추럴', cat: '페더링', src: 'brows/natural.png' },
];

/* 코드로 그린 눈썹 — "사진 왼쪽 눈썹" 방향(앞머리 오른쪽, 꼬리 왼쪽)으로 투명 캔버스에 그려요.
 * 모양은 아랫선·윗선 두 곡선으로 정하고, 결은 실제 눈썹이 자라는 방향(앞머리는 위로 서고, 몸통은 아래 결이
 * 위로·위 결이 아래로 모여 꼬리로 흐름)을 따라 한 올씩 끝이 가늘어지는 획으로 그려요. 섀도우는 점묘 질감의 음영.
 */
window.drawSampleBrow = (() => {
  const L = 780, M = 54;                       // 눈썹 길이(px), 여백
  const INK = [76, 61, 54];                   // 기본 색(애쉬 브라운, 브로우원 시술 사진 톤) — 색상 칩으로 바꿔요
  const DEG = Math.PI / 180;
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const smooth = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const lerp = (a, b, k) => a + (b - a) * k;
  const rng = (seed) => {                      // mulberry32: 같은 seed면 같은 결
    let s = (seed * 2654435761) >>> 0 || 1;
    return () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  };
  const noise1 = (rand, n) => {                // 0~1 구간의 부드러운 1차원 잡음(-1~1)
    const v = Array.from({ length: n + 2 }, () => rand() * 2 - 1);
    return (x) => { const f = clamp01(x) * n, i = f | 0, u = f - i, s = u * u * (3 - 2 * u); return v[i] * (1 - s) + v[i + 1] * s; };
  };

  const STYLE = {
    //        결 간격(px) 굵기   진하기  흔들림 휨    밖으로 삐침  바탕 음영
    feather: { gap: 10.5, w: 2.1, a: 0.74, jit: 7, bend: 12, out: 0.03, base: 0.14 },
    natural: { gap: 8.5, w: 1.7, a: 0.66, jit: 12, bend: 18, out: 0.07, base: 0.22 },
    combo: { gap: 12, w: 1.9, a: 0.68, jit: 7, bend: 12, out: 0.02, base: 0 },
    shadow: { gap: 12, w: 1.7, a: 0.52, jit: 8, bend: 12, out: 0.03, base: 0 },
  };

  function geometry(p) {
    const peak = p.peak, ang = p.angular || 0, lift = p.lift || 0;
    const lowArch = p.lowArch == null ? 0.78 : p.lowArch, round = p.round == null ? 0.9 : p.round;
    const bump = (t) => {
      if (t < peak) { const u = t / peak; return (1 - (1 - u) * (1 - u)) * (1 - ang) + u * ang; }
      const u = (t - peak) / (1 - peak);
      return (1 - u * u) * (1 - ang) + (1 - u) * ang;
    };
    const thick = (t) => {
      let w;
      if (t < 0.22) w = lerp(p.head, p.body, smooth(0, 0.22, t));
      else if (t < peak) w = p.body * (1 - 0.08 * (t - 0.22) / (peak - 0.22));
      else w = p.tail + (p.body * 0.92 - p.tail) * Math.pow(1 - (t - peak) / (1 - peak), 0.85);
      return w * Math.pow(clamp01((1 - t) / 0.06), 0.55);   // 꼬리 끝은 뾰족하게 모여요
    };
    const rand = rng((p.seed || 7) * 31 + 5), wl = noise1(rand, 9), wu = noise1(rand, 9);
    const edges = (t) => {
      const lo = lift * t + p.arch * lowArch * bump(t);
      const T = thick(t) + p.arch * (1 - lowArch) * bump(t);
      const rc = 0.07, cap = t < rc ? Math.sqrt(1 - (1 - t / rc) ** 2) : 1, f = 1 - round * (1 - cap);
      const fade = smooth(0, 0.15, t) * smooth(1, 0.85, t);      // 가장자리의 미세한 흔들림(양 끝은 0)
      return [lo + T * (1 - f) * 0.22 + wl(t) * 0.003 * fade, lo + T * (1 - (1 - f) * 0.78) + wu(t) * 0.0045 * fade];
    };
    // 화면 크기: 위아래 끝을 재서 여백을 맞춰요
    let top = -Infinity, bot = Infinity;
    for (let i = 0; i <= 400; i++) { const [lo, up] = edges(i / 400); if (up > top) top = up; if (lo < bot) bot = lo; }
    const W = L + 2 * M, H = Math.ceil((top - bot) * L + 2 * M), Y0 = M + top * L;
    const cols = new Float32Array(W * 2);       // 열마다 아랫선·윗선(정규화 좌표)
    for (let x = 0; x < W; x++) {
      const t = 1 - (x - M) / L;
      const [lo, up] = t >= 0 && t <= 1 ? edges(t) : [1, -1];
      cols[x * 2] = lo; cols[x * 2 + 1] = up;
    }
    return { p, edges, W, H, Y0, cols,
      px: (t) => M + (1 - t) * L, py: (y) => Y0 - y * L,
      thick: (t) => { const [lo, up] = edges(t); return Math.max(0, up - lo); } };
  }

  // 결 방향: 눈썹 가운데 선(앞머리→꼬리)을 기준으로 위쪽(+)/아래쪽(-) 각도
  function hairAngle(G, t, v, upper) {
    const pk = G.p.peak;
    const headW = 1 - smooth(0.04, 0.3, t), tailW = smooth(pk - 0.08, 0.97, t);
    const head = lerp(78, 52, smooth(0, 0.22, t)) - 12 * v;
    const body = upper ? lerp(-10, -27, clamp01((v - 0.52) / 0.48)) : lerp(46, 16, clamp01(v / 0.52));
    const tail = upper ? -9 : 9;
    return lerp(lerp(body, tail, tailW), head, headW) * DEG;
  }

  // 가운데 선의 진행 방향(정규화 좌표, x 오른쪽·y 위쪽; 앞머리→꼬리는 x가 줄어드는 쪽)
  function tangent(G, t) {
    const a = G.edges(Math.max(0, t - 0.004)), b = G.edges(Math.min(1, t + 0.004));
    const dy = ((b[0] + b[1]) - (a[0] + a[1])) / 2, dx = -(Math.min(1, t + 0.004) - Math.max(0, t - 0.004));
    const m = Math.hypot(dx, dy) || 1;
    return [dx / m, dy / m];
  }

  function vAt(G, x, y) {                      // 정규화 좌표 (x=1-t, y) → 아랫선 0 ~ 윗선 1
    const [lo, up] = G.edges(1 - x);
    return up > lo ? (y - lo) / (up - lo) : -1;
  }

  // 결의 뿌리 위치: 서로 너무 붙지 않게 무작위로 뿌려요(포아송 디스크)
  function seeds(G, gap, rand, accept) {
    const { W, H } = G, cs = gap / Math.SQRT2, gw = Math.ceil(W / cs), gh = Math.ceil(H / cs);
    const grid = new Int32Array(gw * gh).fill(-1), pts = [];
    const tries = Math.round((W * H) / (gap * gap) * 14);
    for (let k = 0; k < tries; k++) {
      const x = M + rand() * L, y = rand() * H;
      const t = 1 - (x - M) / L, [lo, up] = [G.cols[(x | 0) * 2], G.cols[(x | 0) * 2 + 1]];
      const yn = (G.Y0 - y) / L, v = (yn - lo) / (up - lo);
      if (!(up > lo) || v < 0.02 || v > 0.98 || t < 0.004 || t > 0.985 || !accept(t, v, rand)) continue;
      const gx = (x / cs) | 0, gy = (y / cs) | 0;
      let ok = true;
      for (let j = Math.max(0, gy - 2); ok && j <= Math.min(gh - 1, gy + 2); j++) {
        for (let i = Math.max(0, gx - 2); i <= Math.min(gw - 1, gx + 2); i++) {
          const q = grid[j * gw + i];
          if (q >= 0 && (pts[q].x - x) ** 2 + (pts[q].y - y) ** 2 < gap * gap) { ok = false; break; }
        }
      }
      if (!ok) continue;
      grid[gy * gw + gx] = pts.length;
      pts.push({ x, y, t, v });
    }
    return pts;
  }

  // 한 올: 뿌리에서 결 방향을 따라 나아가며 점을 모아요(눈썹 밖으로 나가면 멈춤)
  function trace(G, s, st, rand) {
    const upper = s.v > 0.52 && s.t > 0.1;
    const T = G.thick(s.t);
    const len = s.t < 0.12 ? T * lerp(0.35, 0.7, rand()) : Math.min(0.12, Math.max(0.045, T * lerp(0.5, 0.88, rand())));
    const jit = (rand() * 2 - 1) * st.jit * DEG, bend = (rand() * 2 - 1) * st.bend * DEG;
    const ds = 0.0035, n = Math.max(3, Math.round(len / ds));
    let x = 1 - s.t, y = (G.Y0 - s.y) / L;
    const pts = [[G.px(1 - x), G.py(y)]];
    for (let i = 0; i < n; i++) {
      const t = 1 - x;
      if (t < 0 || t > 1) break;
      const v = vAt(G, x, y);
      if (v < -st.out || v > 1 + st.out) break;
      if (t > 0.1 && (upper ? v < 0.18 : v > 0.86)) break;   // 아래 결·위 결은 가운데에서 만나고 반대편 가장자리까지는 안 가요
      const [tx, ty] = tangent(G, t), th = hairAngle(G, t, clamp01(v), upper) + jit + bend * (i / n - 0.5);
      const c = Math.cos(th), sn = Math.sin(th);
      x += (tx * c + ty * sn) * ds; y += (-tx * sn + ty * c) * ds;
      pts.push([G.px(1 - x), G.py(y)]);
    }
    return pts;
  }

  // 끝이 가늘어지는 획(뿌리는 살짝 뭉툭, 끝은 뾰족)
  function hairPath(pts, w) {
    const n = pts.length, left = [], right = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      let nx = -(b[1] - a[1]), ny = b[0] - a[0];
      const m = Math.hypot(nx, ny) || 1; nx /= m; ny /= m;
      const u = i / (n - 1), hw = (w / 2) * (0.45 + 0.55 * smooth(0, 0.16, u)) * Math.pow(1 - u, 0.75);
      left.push([pts[i][0] + nx * hw, pts[i][1] + ny * hw]);
      right.push([pts[i][0] - nx * hw, pts[i][1] - ny * hw]);
    }
    const path = new Path2D();
    path.moveTo(left[0][0], left[0][1]);
    for (let i = 1; i < n; i++) path.lineTo(left[i][0], left[i][1]);
    for (let i = n - 1; i >= 0; i--) path.lineTo(right[i][0], right[i][1]);
    path.closePath();
    return path;
  }

  function drawHairs(g, G, st, rand, p, alphaAt) {
    const density = p.density || 1, weight = p.weight || 1;
    const pts = seeds(G, st.gap / Math.sqrt(density), rand, (t, v, r) => {
      // 앞머리 맨 앞과 윗선 근처는 결이 조금 성글어요
      const keep = (0.72 + 0.28 * smooth(0, 0.12, t)) * (1 - 0.35 * smooth(0.8, 1, v));
      return r() < keep;
    });
    const hairs = pts.map((s) => {
      const k = lerp(0.72, 1.22, rand()), warm = lerp(-6, 8, rand());
      return {
        path: trace(G, s, st, rand),
        w: st.w * weight * lerp(0.75, 1.25, rand()),
        rgb: [INK[0] * k + warm, INK[1] * k + warm * 0.4, INK[2] * k - warm * 0.2].map((c) => Math.max(0, Math.min(255, c | 0))),
        a: st.a * lerp(0.7, 1.08, rand()) * alphaAt(s.t, s.v),
      };
    }).filter((h) => h.path.length > 2);
    // 1) 살짝 번진 색소 2) 또렷한 결
    for (const h of hairs) {
      g.fillStyle = `rgba(${h.rgb},${(h.a * 0.1).toFixed(3)})`;
      g.fill(hairPath(h.path, h.w * 2.4));
    }
    for (const h of hairs) {
      g.fillStyle = `rgba(${h.rgb},${Math.min(1, h.a).toFixed(3)})`;
      g.fill(hairPath(h.path, h.w));
    }
  }

  // 음영(섀도우): 열마다 아랫선·윗선 사이를 채우고, 가장자리는 위가 더 흐리게, 점묘 같은 잔 질감
  function drawPowder(g, G, rand, o) {
    const { W, H, cols, Y0 } = G;
    const im = g.createImageData(W, H), d = im.data;
    const a = new Float32Array(W * H);
    // 값 잡음: 큰 얼룩(16px)은 아주 약하게, 잔 알갱이(5px)는 얼굴 크기로 줄여도 보이게
    const makeNoise = (cell) => {
      const nw = Math.ceil(W / cell) + 2, nh = Math.ceil(H / cell) + 2, f = Float32Array.from({ length: nw * nh }, () => rand() * 2 - 1);
      return (x, y) => {
        const fx = x / cell, fy = y / cell, i = fx | 0, j = fy | 0, u = fx - i, v = fy - j;
        const su = u * u * (3 - 2 * u), sv = v * v * (3 - 2 * v), k = j * nw + i;
        return lerp(lerp(f[k], f[k + 1], su), lerp(f[k + nw], f[k + nw + 1], su), sv);
      };
    };
    const vnoise = makeNoise(16), grain = makeNoise(5);
    for (let x = 0; x < W; x++) {
      const lo = cols[x * 2], up = cols[x * 2 + 1];
      if (!(up > lo - 0.02)) continue;
      const t = 1 - (x - M) / L;
      if (t < -0.01 || t > 1.01) continue;
      // 앞머리 쪽은 가장자리까지 더 흐리게 풀어줘요
      const hs = 1 + 1.3 * (1 - smooth(0, 0.3, t)), fb = o.soft * 0.45 * hs, fu = o.soft * hs;
      const om = o.amount * lerp(o.head, 1, smooth(0, o.reach, t)) * smooth(-0.02, o.front, t);
      const y0 = Math.max(0, Math.floor(Y0 - (up + fu * 2) * L)), y1 = Math.min(H - 1, Math.ceil(Y0 - (lo - fb * 2) * L));
      for (let y = y0; y <= y1; y++) {
        const yn = (Y0 - y) / L, dl = yn - lo, du = up - yn;
        const e = smooth(-fb, fb, dl) * smooth(-fu * 0.6, fu * 1.4, du);
        if (e <= 0.002) continue;
        const v = clamp01((yn - lo) / Math.max(1e-4, up - lo));
        a[y * W + x] = e * om * (1 - o.lowDark * v) * (1 + 0.07 * vnoise(x, y)) * (0.86 + 0.14 * grain(x, y)) * (0.5 + 0.5 * rand());
      }
    }
    for (let i = 0, n = W * H; i < n; i++) {
      if (!a[i]) continue;
      d[i * 4] = INK[0]; d[i * 4 + 1] = INK[1]; d[i * 4 + 2] = INK[2];
      d[i * 4 + 3] = Math.min(255, a[i] * 255);
    }
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    c.getContext('2d').putImageData(im, 0, 0);
    // 점묘 알갱이를 살짝 뭉개서 피부 아래 색소처럼(축소하면 더 부드러워져요)
    g.save();
    g.globalAlpha = 0.5; g.drawImage(c, 0, 0);
    g.globalAlpha = 0.25; g.drawImage(c, 0.7, 0.5); g.drawImage(c, -0.6, -0.5);
    g.restore();
  }

  return function drawSampleBrow(p) {
    const G = geometry(p);
    const c = document.createElement('canvas');
    c.width = G.W; c.height = G.H;
    const g = c.getContext('2d');
    const rand = rng(p.seed || 7);
    const style = p.style || 'feather';

    if (style === 'ombre') {
      drawPowder(g, G, rand, { amount: 1.2, head: 0.12, reach: 0.6, front: 0.22, soft: 0.016, lowDark: 0.25 });
    } else if (style === 'shadow') {
      // 섀도우도 앞머리·윗선엔 옅은 결이 살짝 비쳐요(브로우원 섀도우 시술 사진처럼)
      drawPowder(g, G, rand, { amount: 0.92, head: 0.22, reach: 0.42, front: 0.14, soft: 0.012, lowDark: 0.3 });
      drawHairs(g, G, STYLE.shadow, rand, p, (t, v) => lerp(1, 0.5, smooth(0.2, 0.6, t)) * lerp(0.7, 1, v));
    } else if (style === 'combo') {
      drawPowder(g, G, rand, { amount: 0.78, head: 0, reach: 0.5, front: 0.1, soft: 0.013, lowDark: 0.2 });
      drawHairs(g, G, STYLE.combo, rand, p, (t) => lerp(1, 0.55, smooth(0.25, 0.7, t)) * lerp(0.6, 1, smooth(0, 0.25, t)));
    } else {
      const st = STYLE[style] || STYLE.feather;
      drawPowder(g, G, rand, { amount: st.base, head: 0.4, reach: 0.3, front: 0.1, soft: 0.012, lowDark: 0.1 });
      drawHairs(g, G, st, rand, p, (t) => lerp(0.5, 1, smooth(0, 0.3, t)));
    }
    return c;
  };
})();
