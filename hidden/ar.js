/* 브로우원 AR 눈썹 거울 (시제품)
 * 카메라 영상 → MediaPipe 얼굴 랜드마크(기기 안에서만) → 눈썹 자리를 피부색으로 덮고
 * 브로우원 실제 시술 눈썹 PNG를 multiply로 얹고, 입술에 틴트를 입혀서 거울처럼 좌우 반전해 보여줘요.
 * 눈썹 PNG 방향 규칙은 brow-preview와 같아요: "사진에서 왼쪽에 보이는 눈썹"(앞머리가 오른쪽).
 */
import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs';

const MP_WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
const BROW_BASE = '../preview/';
// 카메라에 찍힌 그대로(반전 전) 기준. 0 = 화면 왼쪽(본인 오른쪽 눈썹), 1 = 화면 오른쪽. 각 줄은 꼬리 → 앞머리.
const BROWS = [
  { up: [70, 63, 105, 66, 107], lo: [46, 53, 52, 65, 55] },
  { up: [300, 293, 334, 296, 336], lo: [276, 283, 282, 295, 285] },
];
const LIP_OUT = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146];
const LIP_IN = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95];
const COLORS = [
  { id: 'orig', name: '원본' }, { id: '#7b5643', name: '내추럴 브라운' }, { id: '#55392c', name: '다크 브라운' },
  { id: '#70645c', name: '애쉬 브라운' }, { id: '#3a3331', name: '소프트 블랙' },
];
const LIPS = [
  { id: 'none', name: '안 바름' }, { id: '#e0796b', name: '코랄' }, { id: '#d76c80', name: '로즈' },
  { id: '#b83a4e', name: '체리' }, { id: '#c48d80', name: '누드' }, { id: '#a65569', name: '말린 장미' },
];
const CATS = ['전체', '자연눈썹', '콤보', '섀도우', '남성'];
const SIZE_K = 1.16;          // 랜드마크 눈썹 길이는 실제보다 조금 짧아요

const $ = (id) => document.getElementById(id);
const S = { designs: [], di: 0, cat: '전체', color: 'orig', opacity: 0.85, erase: 0.55, lift: 0, size: 1,
            lip: 'none', lipAmt: 0.6, compare: false, fit: [null, null], lastFace: 0, running: false };
const cv = $('view'), ctx = cv.getContext('2d');
const smp = document.createElement('canvas'), sctx = smp.getContext('2d', { willReadFrequently: true });   // 피부색 읽기용 작은 사본
const M = { ox: 0, oy: 0, dw: 1, dh: 1 };
const video = $('cam');
let landmarker = null, stream = null, lastVideoTime = -1, face = null, rafId = 0;

/* ───────── 디자인 준비 (brow-preview와 같은 방식) ───────── */
function makeCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function readCtx(c) { return c.getContext('2d', { willReadFrequently: true }); }
function loadImage(src) { return new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = no; im.src = src; }); }
function measure(W, H, wfn) {
  let n = 0, sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
  for (let y = 0, i = 0; y < H; y++) for (let x = 0; x < W; x++, i++) {
    const k = wfn(x, y, i); if (!k) continue;
    n += k; sx += k * x; sy += k * y; sxx += k * x * x; syy += k * y * y; sxy += k * x * y;
  }
  if (n < 20) return null;
  const mx = sx / n, my = sy / n;
  const a = 0.5 * Math.atan2(2 * (sxy / n - mx * my), (sxx / n - mx * mx) - (syy / n - my * my));
  const ux = Math.cos(a), uy = Math.sin(a);
  let u0 = Infinity, u1 = -Infinity, v0 = Infinity, v1 = -Infinity;
  for (let y = 0, i = 0; y < H; y++) for (let x = 0; x < W; x++, i++) {
    if (!wfn(x, y, i)) continue;
    const dx = x - mx, dy = y - my, u = dx * ux + dy * uy, v = -dx * uy + dy * ux;
    if (u < u0) u0 = u; if (u > u1) u1 = u; if (v < v0) v0 = v; if (v > v1) v1 = v;
  }
  const cu = (u0 + u1) / 2, cv2 = (v0 + v1) / 2;
  return { cx: mx + cu * ux - cv2 * uy, cy: my + cu * uy + cv2 * ux, a, len: u1 - u0 + 1, thick: v1 - v0 + 1 };
}
function prepDesign(src, meta) {
  const sw = src.naturalWidth, sh = src.naturalHeight, k = Math.min(1, 900 / Math.max(sw, sh));
  const w = Math.max(1, Math.round(sw * k)), h = Math.max(1, Math.round(sh * k));
  const c = makeCanvas(w, h), g = readCtx(c);
  g.drawImage(src, 0, 0, w, h);
  const d = g.getImageData(0, 0, w, h).data;
  const frame = measure(w, h, (x, y, i) => { const al = d[i * 4 + 3]; return al > 24 ? al / 255 : 0; });
  if (!frame) return null;
  const design = { name: meta.name, cat: meta.cat, tag: meta.tag || meta.cat, canvas: c, frame, flip: !!meta.flip, tints: {} };
  design.thumb = makeThumb(design);
  return design;
}
const mips = new WeakMap();
function drawScaled(g, src, k) {
  let lv = mips.get(src); if (!lv) mips.set(src, (lv = [src]));
  let i = 0;
  while (k * 2 ** (i + 1) <= 1 && lv[i].width >= 32) {
    i++;
    if (!lv[i]) { const p = lv[i - 1], c = makeCanvas(Math.round(p.width / 2), Math.round(p.height / 2)), cg = c.getContext('2d'); cg.imageSmoothingQuality = 'high'; cg.drawImage(p, 0, 0, c.width, c.height); lv[i] = c; }
  }
  g.drawImage(lv[i], 0, 0, src.width, src.height);
}
function makeThumb(d) {
  const W = 224, H = 84, c = makeCanvas(W, H), g = c.getContext('2d');
  g.fillStyle = '#f5e6de'; g.fillRect(0, 0, W, H);
  const T = d.frame, k = (W * 0.38) / T.len;
  g.globalCompositeOperation = 'multiply'; g.imageSmoothingQuality = 'high';
  for (let i = 0; i < 2; i++) {
    const mirror = (i === 1) !== d.flip;
    g.save(); g.translate(W / 2 + (i ? 1 : -1) * W * 0.235, H / 2); g.scale(mirror ? -k : k, k); g.rotate(-T.a); g.translate(-T.cx, -T.cy);
    drawScaled(g, d.canvas, k); g.restore();
  }
  return c;
}
function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function tinted(d) {
  if (S.color === 'orig') return d.canvas;
  if (d.tints[S.color]) return d.tints[S.color];
  const { width: w, height: h } = d.canvas, s = readCtx(d.canvas).getImageData(0, 0, w, h).data;
  let lw = 0, ls = 0;
  for (let i = 0; i < s.length; i += 4) { const a = s[i + 3]; if (a < 24) continue; lw += a; ls += a * (0.299 * s[i] + 0.587 * s[i + 1] + 0.114 * s[i + 2]); }
  const Lm = Math.max(8, ls / Math.max(1, lw)), [tr, tg, tb] = hexRgb(S.color);
  const out = new ImageData(w, h), o = out.data;
  for (let i = 0; i < s.length; i += 4) {
    const a = s[i + 3]; if (!a) continue;
    const k = Math.min(1.8, (0.299 * s[i] + 0.587 * s[i + 1] + 0.114 * s[i + 2]) / Lm);
    o[i] = tr * k; o[i + 1] = tg * k; o[i + 2] = tb * k; o[i + 3] = a;
  }
  const c = makeCanvas(w, h); c.getContext('2d').putImageData(out, 0, 0);
  return (d.tints[S.color] = c);
}
async function loadDesigns() {
  const items = window.BROW_DESIGNS || [];
  const done = await Promise.all(items.map(async (m) => {
    try { return prepDesign(await loadImage(BROW_BASE + m.src), m); } catch { return null; }
  }));
  S.designs = done.filter(Boolean);
  renderDesigns();
}

/* ───────── 화면 구성 ───────── */
function renderCats() {
  $('cats').replaceChildren(...CATS.map((c) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip' + (c === S.cat ? ' on' : ''); b.textContent = c;
    b.onclick = () => { S.cat = c; renderCats(); renderDesigns(); };
    return b;
  }));
}
function renderDesigns() {
  const list = S.designs.map((d, i) => [d, i]).filter(([d]) => S.cat === '전체' || d.cat === S.cat);
  $('designs').replaceChildren(...list.map(([d, i]) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'dcard' + (i === S.di ? ' on' : '');
    const label = document.createElement('span'); label.textContent = d.name;
    b.append(d.thumb, label);
    b.onclick = () => { S.di = i; renderDesigns(); };
    return b;
  }));
  const d = S.designs[S.di];
  $('dname').textContent = d ? d.name : '—'; $('dtag').textContent = d ? d.tag : '';
}
function renderColors() {
  $('colors').replaceChildren(...COLORS.map((c) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip' + (c.id === S.color ? ' on' : '');
    const sw = document.createElement('i'); sw.style.background = c.id === 'orig' ? 'linear-gradient(135deg, #a08b80 0 50%, #4a3c36 50% 100%)' : c.id;
    b.append(sw, document.createTextNode(c.name));
    b.onclick = () => { S.color = c.id; renderColors(); };
    return b;
  }));
}
function renderLips() {
  $('lips').replaceChildren(...LIPS.map((c) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'sw' + (c.id === S.lip ? ' on' : '');
    const sw = document.createElement('i'); sw.style.background = c.id === 'none' ? 'linear-gradient(135deg, #f3dcd6 0 50%, #fff 50% 100%)' : c.id;
    b.append(sw, document.createTextNode(c.name));
    b.onclick = () => { S.lip = c.id; renderLips(); };
    return b;
  }));
}
for (const id of ['opacity', 'erase', 'lift', 'size', 'lipAmt']) $(id).addEventListener('input', (e) => { S[id] = +e.target.value; });
document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x === t));
  $('pane-brow').hidden = t.dataset.tab !== 'brow'; $('pane-lip').hidden = t.dataset.tab !== 'lip';
  if (t.dataset.tab === 'lip' && S.lip === 'none') { S.lip = LIPS[2].id; renderLips(); }
}));
const cmp = $('compare');
const setCompare = (on) => { S.compare = on; cmp.classList.toggle('on', on); };
cmp.addEventListener('pointerdown', (e) => { e.preventDefault(); setCompare(true); });
for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) cmp.addEventListener(ev, () => setCompare(false));

/* ───────── 카메라·인식 ───────── */
async function makeLandmarker() {
  const files = await FilesetResolver.forVisionTasks(MP_WASM);
  const opts = (delegate) => ({ baseOptions: { modelAssetPath: MODEL, delegate }, runningMode: 'VIDEO', numFaces: 1, outputFaceBlendshapes: false });
  try { return await FaceLandmarker.createFromOptions(files, opts('GPU')); }
  catch { return await FaceLandmarker.createFromOptions(files, opts('CPU')); }
}
async function start() {
  const msg = $('startMsg'); msg.hidden = true;
  $('go').disabled = true; $('go').textContent = '준비 중…';
  try {
    if (!navigator.mediaDevices?.getUserMedia) throw Object.assign(new Error('nocam'), { name: 'NoCam' });
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    video.srcObject = stream; await video.play();
    $('start').hidden = true; $('mirror').hidden = false; document.body.classList.add('live');
    $('status').textContent = '얼굴 인식 준비 중…';
    if (!landmarker) landmarker = await makeLandmarker();
    if (!S.designs.length) await loadDesigns();
    S.running = true; loop();
    window.gtag?.('event', 'ar_camera');
  } catch (e) {
    stopCam();
    msg.hidden = false;
    msg.textContent = e.name === 'NotAllowedError' ? '카메라 권한이 막혀 있어요. 주소창 옆 설정에서 카메라를 허용한 뒤 다시 눌러 주세요.'
      : e.name === 'NotFoundError' || e.name === 'NoCam' ? '이 기기에서 쓸 수 있는 카메라를 찾지 못했어요. 사진으로 해보기를 이용해 주세요.'
      : '카메라를 켜지 못했어요. 잠시 뒤 다시 눌러 주세요.';
  } finally { $('go').disabled = false; $('go').textContent = '카메라 켜기'; }
}
function stopCam() {
  S.running = false; cancelAnimationFrame(rafId);
  if (stream) stream.getTracks().forEach((t) => t.stop());
  stream = null; video.srcObject = null;
  $('mirror').hidden = true; $('start').hidden = false; document.body.classList.remove('live');
}
$('go').addEventListener('click', start);
$('stop').addEventListener('click', stopCam);

/* ───────── 그리기 ───────── */
function resize() {
  const r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
  if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
}
const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
function fitBrow(P, def, side) {
  const up = def.up.map(P), lo = def.lo.map(P);
  const tail = mid(up[0], lo[0]), head = mid(up[4], lo[4]);
  const L = side === 0 ? tail : head, R = side === 0 ? head : tail;
  const a = Math.atan2(R.y - L.y, R.x - L.x), len = Math.hypot(R.x - L.x, R.y - L.y);
  let cx = 0, cy = 0; for (const p of up.concat(lo)) { cx += p.x; cy += p.y; } cx /= 10; cy /= 10;
  let th = 0; for (let i = 1; i < 4; i++) th += Math.hypot(up[i].x - lo[i].x, up[i].y - lo[i].y); th /= 3;
  return { cx, cy, a, len, th, up, lo };
}
function smooth(prev, cur) {
  if (!prev) return cur;
  const move = Math.hypot(cur.cx - prev.cx, cur.cy - prev.cy) / Math.max(1, cur.len);
  const k = Math.min(0.9, 0.35 + move * 6);           // 빨리 움직이면 바로 따라가고, 가만히 있으면 떨림을 눌러요
  const L = (p, c) => p + (c - p) * k;
  let da = cur.a - prev.a; if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI;
  return { ...cur, cx: L(prev.cx, cur.cx), cy: L(prev.cy, cur.cy), a: prev.a + da * k, len: L(prev.len, cur.len), th: L(prev.th, cur.th) };
}
// 블러 채우기: 그림자 기법(모든 브라우저). 거울 변환 안에서 그리므로 x 방향 이동 부호가 반대예요.
const FAR = 12000;
function blurFill(pathFn, color, blur, alpha, rule = 'nonzero') {
  ctx.save();
  ctx.globalAlpha = alpha; ctx.shadowColor = color; ctx.shadowBlur = blur; ctx.shadowOffsetX = FAR; ctx.shadowOffsetY = 0;
  ctx.translate(FAR, 0); ctx.beginPath(); pathFn(); ctx.fillStyle = '#000'; ctx.fill(rule);
  ctx.restore();
}
function sampleSkin(x, y, W, r) {       // x,y는 반전 전 화면 좌표 → 작은 사본(반전 전 영상)에서 읽어요
  const k = smp.width / M.dw, sx = (x - M.ox) * k, sy = (y - M.oy) * k, rr = Math.max(1, r * k);
  const n = Math.max(2, Math.round(rr * 2));
  try {
    const d = sctx.getImageData(Math.max(0, Math.round(sx - rr)), Math.max(0, Math.round(sy - rr)), n, n).data;
    let R = 0, G = 0, B = 0, c = 0;
    for (let i = 0; i < d.length; i += 4) { R += d[i]; G += d[i + 1]; B += d[i + 2]; c++; }
    return `rgb(${(R / c) | 0},${(G / c) | 0},${(B / c) | 0})`;
  } catch { return 'rgb(220,190,175)'; }
}
function drawBrows(W) {
  const d = S.designs[S.di];
  const fits = S.fit;
  // 1) 원래 눈썹을 이마 피부색으로 덮기
  if (S.erase > 0.01) {
    for (const F of fits) {
      const ax = { x: Math.cos(F.a), y: Math.sin(F.a) }, n = { x: Math.sin(F.a), y: -Math.cos(F.a) };
      const skin = sampleSkin(F.cx + n.x * (F.th * 1.9 + F.len * 0.06), F.cy + n.y * (F.th * 1.9 + F.len * 0.06), W, Math.max(3, F.th * 0.45));
      const pts = F.up.concat([...F.lo].reverse()).map((p) => {
        const dx = p.x - F.cx, dy = p.y - F.cy, u = dx * ax.x + dy * ax.y, v = dx * n.x + dy * n.y;
        return { x: F.cx + ax.x * u * 1.14 + n.x * v * 1.7, y: F.cy + ax.y * u * 1.14 + n.y * v * 1.7 };
      });
      blurFill(() => { ctx.moveTo(pts[0].x, pts[0].y); for (const p of pts.slice(1)) ctx.lineTo(p.x, p.y); ctx.closePath(); }, skin, F.th * 0.9, S.erase);
    }
  }
  if (!d) return;
  // 2) 디자인 얹기
  const tex = tinted(d), T = d.frame;
  ctx.save();
  ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = S.opacity; ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  fits.forEach((F, i) => {
    const k = (F.len * SIZE_K * S.size) / T.len, mirror = (i === 1) !== d.flip;
    const n = { x: Math.sin(F.a), y: -Math.cos(F.a) }, lift = S.lift * F.len;
    ctx.save();
    ctx.translate(F.cx + n.x * lift, F.cy + n.y * lift); ctx.rotate(F.a); ctx.scale(mirror ? -k : k, k);
    ctx.rotate(-T.a); ctx.translate(-T.cx, -T.cy);
    drawScaled(ctx, tex, k); ctx.restore();
  });
  ctx.restore();
}
function drawLips(P) {
  if (S.lip === 'none') return;
  const out = LIP_OUT.map(P), inn = LIP_IN.map(P);
  const h = Math.hypot(P(0).x - P(17).x, P(0).y - P(17).y) || 20;
  const path = () => {
    ctx.moveTo(out[0].x, out[0].y); for (const p of out.slice(1)) ctx.lineTo(p.x, p.y); ctx.closePath();
    ctx.moveTo(inn[0].x, inn[0].y); for (const p of inn.slice(1).reverse()) ctx.lineTo(p.x, p.y); ctx.closePath();
  };
  ctx.save();
  ctx.globalCompositeOperation = 'multiply'; blurFill(path, S.lip, h * 0.06, 0.55 * S.lipAmt, 'evenodd');
  ctx.globalCompositeOperation = 'soft-light'; blurFill(path, S.lip, h * 0.06, 0.65 * S.lipAmt, 'evenodd');
  ctx.restore();
}
function loop() {
  if (!S.running) return;
  rafId = requestAnimationFrame(loop);
  if (video.readyState < 2) return;
  resize();
  const W = cv.width, H = cv.height, vw = video.videoWidth, vh = video.videoHeight;
  if (!vw || !vh) return;
  const s = Math.max(W / vw, H / vh), dw = vw * s, dh = vh * s, ox = (W - dw) / 2, oy = (H - dh) / 2;
  Object.assign(M, { ox, oy, dw, dh });
  const sw = 240, sh = Math.round(240 * vh / vw);
  if (smp.width !== sw || smp.height !== sh) { smp.width = sw; smp.height = sh; }
  sctx.drawImage(video, 0, 0, sw, sh);
  if (landmarker && video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    try { const r = landmarker.detectForVideo(video, performance.now()); face = r.faceLandmarks && r.faceLandmarks[0] || null; } catch { face = null; }
    if (face) S.lastFace = performance.now();
  }
  ctx.setTransform(-1, 0, 0, 1, W, 0);                       // 거울처럼 좌우 반전
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  ctx.drawImage(video, ox, oy, dw, dh);
  const fresh = face && performance.now() - S.lastFace < 400;
  if (fresh) {
    const P = (i) => ({ x: ox + face[i].x * dw, y: oy + face[i].y * dh });
    S.fit = BROWS.map((def, i) => smooth(S.fit[i], fitBrow(P, def, i)));
    if (!S.compare) { drawLips(P); drawBrows(W); }
  } else S.fit = [null, null];
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  $('hint').hidden = !!fresh || !landmarker;
  $('status').textContent = !landmarker ? '얼굴 인식 준비 중…' : S.compare ? '원래 얼굴' : fresh ? (S.designs[S.di]?.name || '') + (S.lip !== 'none' ? ' · ' + LIPS.find((l) => l.id === S.lip).name + ' 립' : '') : '얼굴 찾는 중…';
}

/* ───────── 사진 찍기 ───────── */
$('shot').addEventListener('click', () => {
  if (!S.running) return;
  const W = cv.width, H = cv.height, c = makeCanvas(W, H), g = c.getContext('2d');
  g.drawImage(cv, 0, 0);
  const fs = Math.max(14, Math.round(W * 0.03));
  g.fillStyle = 'rgba(255,253,251,.88)'; g.font = `500 ${fs}px 'Cormorant Garamond', serif`; g.textAlign = 'center';
  g.fillText('B R O W   O N E', W / 2, H - fs * 1.9);
  g.font = `${Math.round(fs * 0.62)}px 'Pretendard Variable', sans-serif`;
  g.fillText('AR 눈썹 미리보기 · ' + (S.designs[S.di]?.name || ''), W / 2, H - fs * 0.9);
  const url = c.toDataURL('image/jpeg', 0.92);
  $('shotImg').src = url; $('save').href = url; $('modal').hidden = false;
  window.gtag?.('event', 'ar_shot', { design: S.designs[S.di]?.name || '', lip: S.lip });
});
$('close').addEventListener('click', () => { $('modal').hidden = true; });

renderCats(); renderColors(); renderLips();
window.__ar = S;   // 시험용
