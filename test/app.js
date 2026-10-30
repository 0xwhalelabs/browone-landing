/* 브로우원 눈썹 미리보기
 * 사진·붓 마스크·합성은 모두 브라우저 안에서만 처리돼요(서버 전송 없음).
 * 흐름: 사진 올리기 → 붓으로 눈썹 칠하기 → 마스크에서 양쪽 눈썹의 위치·각도·길이를 재고
 *       기존 눈썹 자리를 주변 피부색으로 메운 뒤, 고른 디자인을 같은 자리에 맞춰 multiply로 얹어요.
 */
(() => {
  'use strict';

  const MAX_SIDE = 1800;             // 올린 사진의 긴 변을 이 크기로 줄여서 써요
  const MASK_COLOR = '#ff4f7b';
  const COLORS = [
    { id: 'orig', name: '원본' },
    { id: '#7b5643', name: '내추럴\n브라운' },
    { id: '#55392c', name: '다크\n브라운' },
    { id: '#70645c', name: '애쉬\n브라운' },
    { id: '#3a3331', name: '소프트\n블랙' },
  ];
  const SHAPE_DEFAULTS = { size: 1, thick: 1, angle: 0, height: 0, gap: 0 };
  const ADMIN = new URLSearchParams(location.search).has('admin');

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const makeCanvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const readCtx = (c) => c.getContext('2d', { willReadFrequently: true });
  const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  // 버튼 문구가 화면에 그려질 틈을 줘요(창이 가려져 rAF가 멈춰도 100ms 뒤엔 진행)
  const nextFrame = () => new Promise((r) => { requestAnimationFrame(() => setTimeout(r, 0)); setTimeout(r, 100); });

  const S = {
    step: 1,
    photo: null, W: 0, H: 0,
    mask: null, mctx: null,
    strokes: [], cur: null,
    view: { s: 1, x: 0, y: 0 }, autoFit: true, fitRect: null,
    tool: 'brush', brush: 20,
    fit: null, e: null, up: null, Lavg: 0,
    clean: null, comp: null, cctx: null,
    designs: [], di: 0, cat: '전체', color: 'orig',
    opts: { opacity: 0.85, erase: 0.9, ...SHAPE_DEFAULTS },
    nudge: [{ x: 0, y: 0 }, { x: 0, y: 0 }],
    showOrig: false,
  };

  const el = {
    app: $('.app'), intro: $('#intro'), work: $('#work'), stage: $('#stage'), view: $('#view'),
    pane2: $('#pane2'), pane3: $('#pane3'), toast: $('#toast'), hold: $('#holdOrig'),
    designs: $('#designs'), filters: $('#filters'), colors: $('#colors'),
  };
  const vctx = el.view.getContext('2d');

  let toastTimer = 0;
  function toast(msg, ms = 3400) {
    el.toast.textContent = msg;
    el.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.toast.hidden = true; }, ms);
  }

  function loadImage(src) {
    return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  }

  /* ───────── 사진 올리기 ───────── */

  async function loadPhoto(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    let img;
    try { img = await loadImage(url); } catch { toast('이 사진은 열 수 없어요. JPG나 PNG 사진으로 올려주세요.'); return; }
    finally { setTimeout(() => URL.revokeObjectURL(url), 0); }
    const k = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const W = Math.round(img.naturalWidth * k), H = Math.round(img.naturalHeight * k);
    const photo = makeCanvas(W, H);
    const g = photo.getContext('2d');
    g.imageSmoothingQuality = 'high';
    g.drawImage(img, 0, 0, W, H);
    Object.assign(S, { photo, W, H, strokes: [], cur: null, fit: null, clean: null });
    S.mask = makeCanvas(W, H); S.mctx = readCtx(S.mask);
    S.comp = makeCanvas(W, H); S.cctx = S.comp.getContext('2d');
    setStep(2);
    fitTo(null);
  }

  function setStep(n) {
    S.step = n;
    el.app.dataset.step = n;
    el.intro.hidden = n !== 1;
    el.work.hidden = n === 1;
    el.pane2.hidden = n !== 2;
    el.pane3.hidden = n !== 3;
    el.hold.hidden = n !== 3;
    S.showOrig = false;
    updateCursor();
    if (n > 1) resizeView();
    draw();
  }

  /* ───────── 화면(확대·이동) ───────── */

  let dpr = 1;
  function resizeView() {
    const r = el.stage.getBoundingClientRect();
    if (!r.width || !r.height) return;
    dpr = Math.min(window.devicePixelRatio || 1, 3);
    el.view.width = Math.round(r.width * dpr);
    el.view.height = Math.round(r.height * dpr);
    if (S.autoFit) fitTo(S.fitRect); else draw();
  }
  new ResizeObserver(resizeView).observe(el.stage);

  const stageSize = () => ({ w: el.view.width / dpr, h: el.view.height / dpr });

  function fitTo(rect) {
    S.fitRect = rect; S.autoFit = true;
    if (!S.photo) return;
    const r = rect || { x: 0, y: 0, w: S.W, h: S.H };
    const { w, h } = stageSize();
    if (!w || !h) return;
    const pad = 14, s = Math.min((w - pad * 2) / r.w, (h - pad * 2) / r.h);
    S.view = { s, x: w / 2 - (r.x + r.w / 2) * s, y: h / 2 - (r.y + r.h / 2) * s };
    draw();
  }

  function clampScale(s) {
    const { w, h } = stageSize(), f = Math.min(w / S.W, h / S.H);
    return Math.min(Math.max(s, f * 0.6), f * 14);
  }

  function zoomAt(px, py, k) {
    const v = S.view, s = clampScale(v.s * k);
    const ix = (px - v.x) / v.s, iy = (py - v.y) / v.s;
    S.view = { s, x: px - ix * s, y: py - iy * s };
    S.autoFit = false;
    draw();
  }

  let raf = 0, hover = null;
  function draw() { if (!raf) raf = requestAnimationFrame(paint); }

  function paint() {
    raf = 0;
    const c = vctx, v = S.view;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, el.view.width, el.view.height);
    if (!S.photo || S.step === 1) return;
    c.setTransform(dpr * v.s, 0, 0, dpr * v.s, dpr * v.x, dpr * v.y);
    c.imageSmoothingEnabled = true;
    c.imageSmoothingQuality = 'high';
    if (S.step === 2) {
      c.drawImage(S.photo, 0, 0);
      c.globalAlpha = 0.5;
      c.drawImage(S.mask, 0, 0);
      c.globalAlpha = 1;
      if (hover && S.tool !== 'move' && !spaceDown) {
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.beginPath();
        c.arc(hover.x, hover.y, S.brush / 2, 0, Math.PI * 2);
        c.lineWidth = 3; c.strokeStyle = 'rgba(0,0,0,.3)'; c.stroke();
        c.lineWidth = 1.5; c.strokeStyle = '#fff'; c.stroke();
      }
    } else {
      c.drawImage(S.showOrig ? S.photo : S.comp, 0, 0);
    }
  }

  /* ───────── 포인터: 붓·이동·두 손가락 확대·눈썹 끌기 ───────── */

  const pointers = new Map();
  let gesture = null, drag = null, spaceDown = false;
  const localPt = (e) => { const r = el.view.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const toImg = (p) => ({ x: (p.x - S.view.x) / S.view.s, y: (p.y - S.view.y) / S.view.s });

  el.view.addEventListener('pointerdown', (e) => {
    if (!S.photo || e.button === 2) return;
    e.preventDefault();
    try { el.view.setPointerCapture(e.pointerId); } catch { /* 캡처 못 해도 그리기는 계속 */ }
    const p = localPt(e);
    pointers.set(e.pointerId, p);
    if (pointers.size === 2) {
      // 두 번째 손가락이 닿으면 그리던 획은 취소하고 확대/이동으로 바꿔요
      if (S.cur) { S.strokes.pop(); S.cur = null; redrawMask(); }
      drag = null;
      gesture = startGesture();
      return;
    }
    if (pointers.size > 2) return;
    const q = toImg(p);
    const panning = S.tool === 'move' || spaceDown || e.button === 1;
    if (S.step === 2 && !panning) { beginStroke(q); return; }
    const hit = S.step === 3 && !panning ? hitBrow(q) : -1;
    drag = hit >= 0
      ? { kind: 'brow', i: hit, q0: q, n0: { ...S.nudge[hit] } }
      : { kind: 'pan', p0: p, v0: { ...S.view } };
    updateCursor('grabbing');
  });

  el.view.addEventListener('pointermove', (e) => {
    const p = localPt(e);
    if (e.pointerType === 'mouse') hover = p;
    if (!pointers.has(e.pointerId)) {
      if (S.step === 2) draw();
      else if (S.step === 3) updateCursor(hitBrow(toImg(p)) >= 0 ? 'grab' : '');
      return;
    }
    pointers.set(e.pointerId, p);
    if (gesture) { moveGesture(); return; }
    if (S.cur) {
      let evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
      if (!evs.length) evs = [e];
      for (const ev of evs) extendStroke(toImg(localPt(ev)));
      draw();
      return;
    }
    if (!drag) return;
    if (drag.kind === 'pan') {
      S.view = { s: drag.v0.s, x: drag.v0.x + p.x - drag.p0.x, y: drag.v0.y + p.y - drag.p0.y };
      S.autoFit = false;
      draw();
    } else {
      const q = toImg(p);
      S.nudge[drag.i] = { x: drag.n0.x + q.x - drag.q0.x, y: drag.n0.y + q.y - drag.q0.y };
      scheduleCompose();
    }
  });

  function endPointer(e) {
    if (!pointers.delete(e.pointerId)) return;
    if (gesture) { if (pointers.size < 2) gesture = null; return; }
    if (S.cur) endStroke();
    drag = null;
    updateCursor();
  }
  el.view.addEventListener('pointerup', endPointer);
  el.view.addEventListener('pointercancel', endPointer);
  el.view.addEventListener('pointerleave', () => { hover = null; draw(); });

  el.view.addEventListener('wheel', (e) => {
    if (!S.photo) return;
    e.preventDefault();
    const p = localPt(e);
    zoomAt(p.x, p.y, Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0015)));
  }, { passive: false });

  function startGesture() {
    const [a, b] = [...pointers.values()];
    return { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, m: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, v: { ...S.view } };
  }
  function moveGesture() {
    const [a, b] = [...pointers.values()];
    const g = gesture, d = Math.hypot(a.x - b.x, a.y - b.y), m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const s = clampScale(g.v.s * d / g.d);
    const ix = (g.m.x - g.v.x) / g.v.s, iy = (g.m.y - g.v.y) / g.v.s;   // 처음 두 손가락 사이에 있던 점이 계속 손가락 사이에 오도록
    S.view = { s, x: m.x - ix * s, y: m.y - iy * s };
    S.autoFit = false;
    draw();
  }

  addEventListener('keydown', (e) => {
    if (S.step === 1) return;
    if (e.code === 'Space' && e.target === document.body) { if (!e.repeat) { spaceDown = true; updateCursor(); } e.preventDefault(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && S.step === 2) { undo(); e.preventDefault(); }
  });
  addEventListener('keyup', (e) => { if (e.code === 'Space') { spaceDown = false; updateCursor(); draw(); } });

  function updateCursor(kind) {
    let c = '';
    if (S.step === 2) c = S.tool === 'move' || spaceDown ? 'grab' : 'none';
    else if (S.step === 3) c = kind || '';
    if (kind === 'grabbing') c = 'grabbing';
    el.view.style.cursor = c;
  }

  /* ───────── 붓 획 ───────── */

  function beginStroke(q) {
    S.cur = { mode: S.tool === 'eraser' ? 'erase' : 'paint', size: S.brush / S.view.s, pts: [q] };
    S.strokes.push(S.cur);
    dot(S.cur, q);
    draw();
  }
  function extendStroke(q) {
    const pts = S.cur.pts, last = pts[pts.length - 1];
    if (Math.hypot(q.x - last.x, q.y - last.y) < 0.5) return;
    pts.push(q);
    seg(S.cur, last, q);
  }
  function endStroke() { S.cur = null; }

  function penFor(st) {
    const c = S.mctx;
    c.globalCompositeOperation = st.mode === 'erase' ? 'destination-out' : 'source-over';
    c.strokeStyle = c.fillStyle = MASK_COLOR;
    c.lineWidth = st.size;
    c.lineCap = c.lineJoin = 'round';
    return c;
  }
  function dot(st, q) { const c = penFor(st); c.beginPath(); c.arc(q.x, q.y, st.size / 2, 0, Math.PI * 2); c.fill(); }
  function seg(st, a, b) { const c = penFor(st); c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); }

  function redrawMask() {
    S.mctx.globalCompositeOperation = 'source-over';
    S.mctx.clearRect(0, 0, S.W, S.H);
    for (const st of S.strokes) {
      dot(st, st.pts[0]);
      for (let i = 1; i < st.pts.length; i++) seg(st, st.pts[i - 1], st.pts[i]);
    }
    S.mctx.globalCompositeOperation = 'source-over';
  }
  function undo() { if (!S.strokes.length) return; S.strokes.pop(); redrawMask(); draw(); }

  /* ───────── 마스크 분석: 양쪽 눈썹의 위치·각도·길이 ───────── */

  // 가중치 함수 wfn(x, y, i)가 0이 아닌 픽셀들로 주축(PCA) 방향과 그 방향의 길이·두께·중심을 재요
  function measure(W, H, wfn) {
    let n = 0, sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
    for (let y = 0, i = 0; y < H; y++) for (let x = 0; x < W; x++, i++) {
      const k = wfn(x, y, i);
      if (!k) continue;
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
    const cu = (u0 + u1) / 2, cv = (v0 + v1) / 2;
    return { cx: mx + cu * ux - cv * uy, cy: my + cu * uy + cv * ux, a, len: u1 - u0 + 1, thick: v1 - v0 + 1 };
  }

  function analyze() {
    const { W, H } = S;
    const data = S.mctx.getImageData(0, 0, W, H).data;

    // 작게 줄인 격자에서 덩어리(연결 요소)를 찾아요
    const f = Math.max(1, Math.ceil(Math.max(W, H) / 500));
    const w = Math.ceil(W / f), h = Math.ceil(H / f);
    const small = new Uint8Array(w * h);
    for (let y = 0; y < H; y++) {
      const row = ((y / f) | 0) * w;
      for (let x = 0; x < W; x++) if (data[(y * W + x) * 4 + 3] > 127) small[row + ((x / f) | 0)] = 1;
    }
    const lab = new Int32Array(w * h), stack = new Int32Array(w * h), comps = [];
    for (let i = 0; i < w * h; i++) {
      if (!small[i] || lab[i]) continue;
      const id = comps.length + 1;
      let sp = 0, n = 0, sx = 0, sy = 0, minx = w, maxx = 0;
      stack[sp++] = i; lab[i] = id;
      while (sp) {
        const j = stack[--sp], x = j % w, y = (j / w) | 0;
        n++; sx += x; sy += y; if (x < minx) minx = x; if (x > maxx) maxx = x;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const k = ny * w + nx;
          if (small[k] && !lab[k]) { lab[k] = id; stack[sp++] = k; }
        }
      }
      comps.push({ id, n, cx: sx / n, cy: sy / n, span: maxx - minx });
    }
    if (!comps.length) return { error: '눈썹 위를 붓으로 칠해주세요.' };
    const total = comps.reduce((s, c) => s + c.n, 0);
    const big = comps.filter((c) => c.n >= total * 0.04).sort((a, b) => b.n - a.n);
    if (big.length < 2) return { error: '양쪽 눈썹을 따로 칠해주세요. 한쪽만 칠했거나 미간에서 이어져 있으면 지우개로 떼어주세요.' };

    let [A, B] = big;
    if (A.cx > B.cx) [A, B] = [B, A];
    if (Math.abs(B.cy - A.cy) > Math.abs(B.cx - A.cx)) return { error: '눈썹 두 개가 좌우로 나란히 칠해졌는지 확인해주세요.' };

    // 큰 덩어리는 가까운 쪽 눈썹에 합치고, 자잘한 붓 자국은 무시해요
    const side = new Int8Array(comps.length + 1).fill(-1);
    for (const c of big) {
      const da = (c.cx - A.cx) ** 2 + (c.cy - A.cy) ** 2, db = (c.cx - B.cx) ** 2 + (c.cy - B.cy) ** 2;
      side[c.id] = da <= db ? 0 : 1;
    }
    const sideAt = (x, y) => side[lab[((y / f) | 0) * w + ((x / f) | 0)]];
    const fit = [0, 1].map((s) => measure(W, H, (x, y, i) => (data[i * 4 + 3] > 127 && sideAt(x, y) === s ? 1 : 0)));
    if (!fit[0] || !fit[1]) return { error: '눈썹이 너무 작게 칠해졌어요. 확대해서 다시 칠해주세요.' };

    // 둥근 붓은 눈썹 끝보다 반지름만큼 더 나가요 → 평균 붓 반지름만큼 길이를 줄여요
    let rs = 0, rl = 0;
    for (const st of S.strokes) if (st.mode === 'paint') { rs += (st.size / 2) * st.pts.length; rl += st.pts.length; }
    const rAvg = rl ? rs / rl : 0;
    for (const F of fit) F.len = Math.max(F.len * 0.6, F.len - rAvg);
    return { fit };
  }

  /* ───────── 기존 눈썹 지우기(피부색으로 메우기) ───────── */

  // 상자 흐림 3번 ≈ 가우시안
  function blur(a, w, h, r) {
    if (r < 1) return;
    const tmp = new Float32Array(Math.max(w, h));
    for (let pass = 0; pass < 3; pass++) {
      for (let y = 0; y < h; y++) boxLine(a, y * w, 1, w, r, tmp);
      for (let x = 0; x < w; x++) boxLine(a, x, w, h, r, tmp);
    }
  }
  function boxLine(a, off, step, n, r, tmp) {
    for (let i = 0; i < n; i++) tmp[i] = a[off + i * step];
    let acc = 0;
    for (let i = -r; i <= r; i++) acc += tmp[Math.min(n - 1, Math.max(0, i))];
    const inv = 1 / (2 * r + 1);
    for (let i = 0; i < n; i++) {
      a[off + i * step] = acc * inv;
      acc += tmp[Math.min(n - 1, i + r + 1)] - tmp[Math.max(0, i - r)];
    }
  }

  // 모르는 픽셀(wt=0)을 아는 픽셀로부터 피라미드식으로 부드럽게 채워요(push-pull)
  function pushPull(rgb, wt0, w, h) {
    const levels = [{ c: rgb, wt: Float32Array.from(wt0), w, h }];
    while (levels.length < 16) {
      const L = levels[levels.length - 1];
      if (L.w === 1 && L.h === 1) break;
      const w2 = Math.ceil(L.w / 2), h2 = Math.ceil(L.h / 2);
      const c2 = new Float32Array(w2 * h2 * 3), t2 = new Float32Array(w2 * h2);
      for (let y = 0; y < h2; y++) for (let x = 0; x < w2; x++) {
        let s = 0, r = 0, g = 0, b = 0;
        for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
          const xx = 2 * x + dx, yy = 2 * y + dy;
          if (xx >= L.w || yy >= L.h) continue;
          const j = yy * L.w + xx, t = L.wt[j];
          s += t; r += t * L.c[j * 3]; g += t * L.c[j * 3 + 1]; b += t * L.c[j * 3 + 2];
        }
        const k = y * w2 + x;
        if (s > 0) { c2[k * 3] = r / s; c2[k * 3 + 1] = g / s; c2[k * 3 + 2] = b / s; }
        t2[k] = Math.min(1, s);
      }
      levels.push({ c: c2, wt: t2, w: w2, h: h2 });
    }
    for (let li = levels.length - 2; li >= 0; li--) {
      const L = levels[li], U = levels[li + 1];
      for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
        const k = y * L.w + x, t = L.wt[k];
        if (t >= 1) continue;
        const fx = Math.min(Math.max((x + 0.5) / 2 - 0.5, 0), U.w - 1), fy = Math.min(Math.max((y + 0.5) / 2 - 0.5, 0), U.h - 1);
        const x0 = fx | 0, y0 = fy | 0, x1 = Math.min(x0 + 1, U.w - 1), y1 = Math.min(y0 + 1, U.h - 1), ax = fx - x0, ay = fy - y0;
        for (let ch = 0; ch < 3; ch++) {
          const v = (U.c[(y0 * U.w + x0) * 3 + ch] * (1 - ax) + U.c[(y0 * U.w + x1) * 3 + ch] * ax) * (1 - ay)
                  + (U.c[(y1 * U.w + x0) * 3 + ch] * (1 - ax) + U.c[(y1 * U.w + x1) * 3 + ch] * ax) * ay;
          L.c[k * 3 + ch] = t * L.c[k * 3 + ch] + (1 - t) * v;
        }
        L.wt[k] = 1;
      }
    }
    return levels[0].c;
  }

  function buildClean() {
    const { W, H } = S;
    const md = S.mctx.getImageData(0, 0, W, H).data;
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0, i = 3; y < H; y++) for (let x = 0; x < W; x++, i += 4) {
      if (!md[i]) continue;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
    const r = Math.max(2, Math.round(S.Lavg * 0.035));   // 마스크를 살짝 넓히고 가장자리를 부드럽게 할 반경
    const m = r * 6;
    x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(W - 1, x1 + m); y1 = Math.min(H - 1, y1 + m);
    const w = x1 - x0 + 1, h = y1 - y0 + 1, n = w * h;

    const a = new Float32Array(n);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) a[y * w + x] = md[((y + y0) * W + x + x0) * 4 + 3] / 255;
    blur(a, w, h, r);
    for (let i = 0; i < n; i++) a[i] = Math.min(1, a[i] * 2.2);

    const pd = S.photo.getContext('2d').getImageData(x0, y0, w, h).data;
    const rgb = new Float32Array(n * 3), known = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      rgb[i * 3] = pd[i * 4]; rgb[i * 3 + 1] = pd[i * 4 + 1]; rgb[i * 3 + 2] = pd[i * 4 + 2];
      known[i] = a[i] < 0.04 ? 1 : 0;
    }

    // 메울 재료는 눈썹 바로 주변의 "피부"만 써요: 머리카락·눈매 선처럼 튀는 색은 빼요
    const near = new Float32Array(a);
    blur(near, w, h, r * 3);
    const ring = [];
    for (let i = 0; i < n; i++) if (known[i] && near[i] > 0.01) ring.push(i);
    const median = (arr) => { const s = Float32Array.from(arr).sort(); return s.length ? s[s.length >> 1] : 0; };
    const step = Math.max(1, Math.floor(ring.length / 20000)), sample = ring.filter((_, k) => k % step === 0);
    const skin = [0, 1, 2].map((c) => median(sample.map((i) => pd[i * 4 + c])));
    const dist = (i) => Math.hypot(pd[i * 4] - skin[0], pd[i * 4 + 1] - skin[1], pd[i * 4 + 2] - skin[2]);
    const tol = Math.max(18, median(sample.map(dist)) * 3);
    const wt = new Float32Array(n);
    for (let i = 0; i < n; i++) wt[i] = known[i] && dist(i) <= tol ? 1 : 0;
    const fill = pushPull(rgb, wt, w, h);

    // 메운 자리를 한 번 더 고르게
    const ch = new Float32Array(n);
    for (let c = 0; c < 3; c++) {
      for (let i = 0; i < n; i++) ch[i] = fill[i * 3 + c];
      blur(ch, w, h, Math.max(1, r >> 1));
      for (let i = 0; i < n; i++) if (!known[i]) fill[i * 3 + c] = ch[i];
    }

    // 피부 결: 주변 피부의 잔결 세기만큼 메운 자리에 잡티를 살짝 넣어요
    const lum = (i) => 0.299 * pd[i * 4] + 0.587 * pd[i * 4 + 1] + 0.114 * pd[i * 4 + 2];
    let sum = 0, cnt = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w - 1; x++) {
      const i = y * w + x;
      if (!wt[i] || !wt[i + 1]) continue;
      sum += Math.min(10, Math.abs(lum(i) - lum(i + 1))); cnt++;
    }
    const grain = cnt ? (sum / cnt) / 1.13 : 1.5;

    const out = new ImageData(w, h), o = out.data;
    for (let i = 0; i < n; i++) {
      if (a[i] < 0.004) continue;
      if (known[i]) {
        o[i * 4] = pd[i * 4]; o[i * 4 + 1] = pd[i * 4 + 1]; o[i * 4 + 2] = pd[i * 4 + 2];
      } else {
        const nz = (Math.random() + Math.random() + Math.random() - 1.5) * 2 * grain;
        o[i * 4] = fill[i * 3] + nz; o[i * 4 + 1] = fill[i * 3 + 1] + nz; o[i * 4 + 2] = fill[i * 3 + 2] + nz;
      }
      o[i * 4 + 3] = a[i] * 255;
    }
    S.clean = makeCanvas(W, H);
    S.clean.getContext('2d').putImageData(out, x0, y0);
  }

  /* ───────── 디자인 준비 ───────── */

  // 흰 배경 이미지(JPG 등)도 쓸 수 있게 배경색과의 차이를 알파로 바꿔요
  function removeBackground(im) {
    const { width: w, height: h, data: d } = im;
    const bg = [0, 0, 0]; let cnt = 0;
    for (const [cx, cy] of [[0, 0], [w - 6, 0], [0, h - 6], [w - 6, h - 6]]) {
      for (let y = cy; y < cy + 6; y++) for (let x = cx; x < cx + 6; x++) {
        const i = (y * w + x) * 4; bg[0] += d[i]; bg[1] += d[i + 1]; bg[2] += d[i + 2]; cnt++;
      }
    }
    bg[0] /= cnt; bg[1] /= cnt; bg[2] /= cnt;
    for (let i = 0; i < d.length; i += 4) {
      const dist = Math.hypot(d[i] - bg[0], d[i + 1] - bg[1], d[i + 2] - bg[2]);
      const al = Math.min(1, Math.max(0, (dist - 14) / 110));
      if (al > 0) for (let c = 0; c < 3; c++) d[i + c] = bg[c] + (d[i + c] - bg[c]) / al;
      d[i + 3] = al * 255;
    }
  }

  // 양쪽 눈썹이 한 이미지에 있으면 왼쪽 눈썹이 차지한 열 범위를 돌려줘요
  function leftBrowColumns(d, w, h) {
    const col = new Float32Array(w);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) col[x] += d[(y * w + x) * 4 + 3];
    let total = 0, max = 0;
    for (const v of col) { total += v; if (v > max) max = v; }
    const thr = max * 0.03, gapMin = Math.max(3, Math.round(w * 0.025));
    const runs = [];
    let start = -1, last = -1;
    for (let x = 0; x < w; x++) {
      if (col[x] <= thr) continue;
      if (start < 0 || x - last > gapMin) { if (start >= 0) runs.push([start, last]); start = x; }
      last = x;
    }
    if (start >= 0) runs.push([start, last]);
    const major = runs.filter(([a, b]) => { let s = 0; for (let x = a; x <= b; x++) s += col[x]; return s > total * 0.2; });
    return major.length >= 2 ? major[0] : [0, w - 1];
  }

  function prepDesign(src, meta) {
    const sw = src.naturalWidth || src.width, sh = src.naturalHeight || src.height;
    const k = Math.min(1, 900 / Math.max(sw, sh));
    const w = Math.max(1, Math.round(sw * k)), h = Math.max(1, Math.round(sh * k));
    const c = makeCanvas(w, h), g = readCtx(c);
    g.drawImage(src, 0, 0, w, h);
    const im = g.getImageData(0, 0, w, h), d = im.data;
    let opaque = 0;
    for (let i = 3; i < d.length; i += 4) if (d[i] > 250) opaque++;
    if (opaque > (d.length / 4) * 0.98) removeBackground(im);

    const [cx0, cx1] = leftBrowColumns(d, w, h);
    let bx0 = w, by0 = h, bx1 = -1, by1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (x < cx0 || x > cx1) { d[i + 3] = 0; continue; }
      if (d[i + 3] <= 8) continue;
      if (x < bx0) bx0 = x; if (x > bx1) bx1 = x; if (y < by0) by0 = y; if (y > by1) by1 = y;
    }
    if (bx1 < 0) return null;
    const pad = 6;
    bx0 = Math.max(0, bx0 - pad); by0 = Math.max(0, by0 - pad); bx1 = Math.min(w - 1, bx1 + pad); by1 = Math.min(h - 1, by1 + pad);
    const cw = bx1 - bx0 + 1, ch = by1 - by0 + 1;
    const out = makeCanvas(cw, ch), og = readCtx(out);
    og.putImageData(im, -bx0, -by0, bx0, by0, cw, ch);

    const od = og.getImageData(0, 0, cw, ch).data;
    const frame = measure(cw, ch, (x, y, i) => { const al = od[i * 4 + 3]; return al > 24 ? al / 255 : 0; });
    if (!frame) return null;
    const design = { name: meta.name || '디자인', cat: meta.cat || '', tag: meta.tag || meta.cat || '', canvas: out, frame, flip: !!meta.flip, tints: {} };
    design.thumb = makeThumb(design);
    return design;
  }

  // 디자인을 많이 줄여 그리면(특히 사파리) 가는 결이 깨져요 → 반씩 미리 줄여둔 단계에서 2배 이내로만 줄여 그려요
  const mips = new WeakMap();
  function drawScaled(g, src, k) {
    let lv = mips.get(src);
    if (!lv) mips.set(src, (lv = [src]));
    let i = 0;
    while (k * 2 ** (i + 1) <= 1 && lv[i].width >= 32) {
      i++;
      if (!lv[i]) {
        const p = lv[i - 1], c = makeCanvas(Math.round(p.width / 2), Math.round(p.height / 2)), cg = c.getContext('2d');
        cg.imageSmoothingQuality = 'high';
        cg.drawImage(p, 0, 0, c.width, c.height);
        lv[i] = c;
      }
    }
    g.drawImage(lv[i], 0, 0, src.width, src.height);
  }

  function makeThumb(d) {
    const W = 320, H = 120, c = makeCanvas(W, H), g = c.getContext('2d');
    g.fillStyle = '#f5e6de';
    g.fillRect(0, 0, W, H);
    const T = d.frame, k = (W * 0.38) / T.len;
    g.globalCompositeOperation = 'multiply';
    g.imageSmoothingQuality = 'high';
    for (let i = 0; i < 2; i++) {
      const mirror = (i === 1) !== d.flip;
      g.save();
      g.translate(W / 2 + (i ? 1 : -1) * W * 0.235, H / 2);
      g.scale(mirror ? -k : k, k);
      g.rotate(-T.a);
      g.translate(-T.cx, -T.cy);
      drawScaled(g, d.canvas, k);
      g.restore();
    }
    c.className = 'thumb';
    return c;
  }

  // 색 바꾸기: 디자인의 명암 비율은 살리고 전체 색만 고른 색으로
  function tinted(d) {
    if (S.color === 'orig') return d.canvas;
    if (d.tints[S.color]) return d.tints[S.color];
    const { width: w, height: h } = d.canvas;
    const s = readCtx(d.canvas).getImageData(0, 0, w, h).data;
    let lw = 0, ls = 0;
    for (let i = 0; i < s.length; i += 4) {
      const a = s[i + 3]; if (a < 24) continue;
      lw += a; ls += a * (0.299 * s[i] + 0.587 * s[i + 1] + 0.114 * s[i + 2]);
    }
    const Lm = Math.max(8, ls / Math.max(1, lw));
    const [tr, tg, tb] = hexRgb(S.color);
    const out = new ImageData(w, h), o = out.data;
    for (let i = 0; i < s.length; i += 4) {
      const a = s[i + 3]; if (!a) continue;
      const k = Math.min(1.8, (0.299 * s[i] + 0.587 * s[i + 1] + 0.114 * s[i + 2]) / Lm);
      o[i] = tr * k; o[i + 1] = tg * k; o[i + 2] = tb * k; o[i + 3] = a;
    }
    const c = makeCanvas(w, h);
    c.getContext('2d').putImageData(out, 0, 0);
    return (d.tints[S.color] = c);
  }

  /* ───────── 합성 ───────── */

  function browXform(i) {
    const F = S.fit[i], d = S.designs[S.di], T = d.frame, o = S.opts;
    const k = (F.len / T.len) * o.size;
    const mirror = (i === 1) !== d.flip;           // 디자인은 "사진 왼쪽 눈썹" 기준이라 오른쪽은 좌우 반전
    const side = i ? 1 : -1;
    const lift = o.height * S.Lavg, spread = side * o.gap * S.Lavg;
    return {
      tx: F.cx + S.up.x * lift + S.e.x * spread + S.nudge[i].x,
      ty: F.cy + S.up.y * lift + S.e.y * spread + S.nudge[i].y,
      ang: F.a - side * o.angle * Math.PI / 180,   // +각도 = 양쪽 꼬리가 올라가요
      sx: mirror ? -k : k, sy: k * o.thick, T,
    };
  }

  function compose() {
    if (!S.fit) return;
    const c = S.cctx, o = S.opts, d = S.designs[S.di];
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalCompositeOperation = 'source-over';
    c.globalAlpha = 1;
    c.drawImage(S.photo, 0, 0);
    if (o.erase > 0 && S.clean) { c.globalAlpha = o.erase; c.drawImage(S.clean, 0, 0); }
    if (d) {
      const tex = tinted(d);
      c.globalCompositeOperation = 'multiply';
      c.globalAlpha = o.opacity;
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = 'high';
      for (let i = 0; i < 2; i++) {
        const X = browXform(i);
        c.save();
        c.translate(X.tx, X.ty); c.rotate(X.ang); c.scale(X.sx, X.sy);
        c.rotate(-X.T.a); c.translate(-X.T.cx, -X.T.cy);
        drawScaled(c, tex, Math.min(Math.abs(X.sx), Math.abs(X.sy)));
        c.restore();
      }
    }
    c.globalCompositeOperation = 'source-over';
    c.globalAlpha = 1;
  }

  let composeRaf = 0;
  function scheduleCompose() {
    if (composeRaf) return;
    composeRaf = requestAnimationFrame(() => { composeRaf = 0; compose(); paint(); });
  }

  function hitBrow(q) {
    if (!S.fit || !S.designs[S.di]) return -1;
    for (let i = 0; i < 2; i++) {
      const X = browXform(i), T = X.T;
      const dx = q.x - X.tx, dy = q.y - X.ty, c = Math.cos(-X.ang), s = Math.sin(-X.ang);
      const u = (dx * c - dy * s) / X.sx, v = (dx * s + dy * c) / X.sy;   // 디자인 주축 기준 좌표
      if (Math.abs(u) <= T.len * 0.55 && Math.abs(v) <= T.thick * 0.5 + T.len * 0.08) return i;
    }
    return -1;
  }

  function browsRect() {
    const [A, B] = S.fit;
    const x0 = Math.min(A.cx - A.len / 2, B.cx - B.len / 2), x1 = Math.max(A.cx + A.len / 2, B.cx + B.len / 2);
    const w = (x1 - x0) * 1.45, h = w * 0.95;
    const cx = (x0 + x1) / 2, cy = (A.cy + B.cy) / 2 + h * 0.28;
    return { x: cx - w / 2, y: cy - h / 2, w, h };
  }

  /* ───────── 단계 이동·저장 ───────── */

  async function goStep3() {
    if (!S.strokes.some((s) => s.mode === 'paint')) { toast('눈썹 위를 붓으로 칠해주세요.'); return; }
    const btn = $('#toStep3');
    btn.disabled = true; btn.textContent = '맞추는 중…';
    await nextFrame();
    try {
      const r = analyze();
      if (r.error) { toast(r.error, 4600); return; }
      const [A, B] = r.fit;
      const em = Math.hypot(B.cx - A.cx, B.cy - A.cy);
      S.fit = r.fit;
      S.e = { x: (B.cx - A.cx) / em, y: (B.cy - A.cy) / em };
      S.up = { x: S.e.y, y: -S.e.x };
      S.Lavg = (A.len + B.len) / 2;
      S.nudge = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
      buildClean();
      setStep(3);
      compose();
      fitTo(browsRect());
    } finally {
      btn.disabled = false; btn.textContent = '다음';
    }
  }

  async function save() {
    const c = makeCanvas(S.W, S.H), g = c.getContext('2d');
    g.drawImage(S.comp, 0, 0);
    const fs = Math.max(12, Math.round(Math.min(S.W, S.H) * 0.03));
    g.font = `500 ${fs}px "Cormorant Garamond", "Noto Serif KR", serif`;
    g.textAlign = 'right'; g.textBaseline = 'bottom';
    g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = fs * 0.4;
    g.fillStyle = 'rgba(255,255,255,.9)';
    g.fillText('BROW ONE  눈썹 미리보기', S.W - fs, S.H - fs * 0.7);
    const blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.92));
    const file = new File([blob], 'browone-preview.jpg', { type: 'image/jpeg' });
    if (matchMedia('(pointer: coarse)').matches && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: '브로우원 눈썹 미리보기' }); return; }
      catch (err) { if (err.name === 'AbortError') return; }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = file.name;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }

  /* ───────── 디자인 목록·색상 UI ───────── */

  const inCat = (d) => S.cat === '전체' || d.cat === S.cat;

  function renderFilters() {
    const cats = ['전체', ...new Set(S.designs.map((d) => d.cat).filter(Boolean))];
    el.filters.hidden = cats.length < 3;   // 분류가 하나뿐이면 탭은 숨겨요
    el.filters.replaceChildren(...cats.map((c) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter' + (c === S.cat ? ' on' : '');
      b.textContent = c;
      b.addEventListener('click', () => {
        S.cat = c;
        // 고른 디자인이 이 분류에 없으면 분류의 첫 디자인을 바로 얹어요
        if (!S.designs[S.di] || !inCat(S.designs[S.di])) { const j = S.designs.findIndex(inCat); if (j >= 0) { S.di = j; scheduleCompose(); } }
        renderFilters(); renderDesigns();
        el.designs.scrollLeft = 0;
      });
      return b;
    }));
  }

  function renderDesigns() {
    el.designs.replaceChildren(...S.designs.map((d, i) => [d, i]).filter(([d]) => inCat(d)).map(([d, i]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'design' + (i === S.di ? ' on' : '');
      const name = document.createElement('span');
      name.className = 'dname';
      name.textContent = d.name;
      if (d.tag) { const t = document.createElement('small'); t.textContent = d.tag; name.append(t); }
      b.append(d.thumb, name);
      b.addEventListener('click', () => { S.di = i; renderDesigns(); scheduleCompose(); });
      return b;
    }));
  }

  function renderColors() {
    el.colors.replaceChildren(...COLORS.map((c) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (c.id === S.color ? ' on' : '');
      const sw = document.createElement('i');
      sw.style.background = c.id === 'orig' ? 'linear-gradient(135deg, #a08b80 0 50%, #4a3c36 50% 100%)' : c.id;
      const label = document.createElement('span');
      label.textContent = c.name;
      label.style.whiteSpace = 'pre-line';
      b.append(sw, label);
      b.addEventListener('click', () => { S.color = c.id; renderColors(); scheduleCompose(); });
      return b;
    }));
  }

  async function loadDesigns() {
    const items = window.BROW_DESIGNS || [];
    for (let n = 0; n < items.length; n++) {
      const item = items[n];
      try {
        const src = item.sample ? window.drawSampleBrow(item.sample) : await loadImage(item.src);
        const d = prepDesign(src, item);
        if (d) S.designs.push(d);
      } catch (err) {
        console.warn('디자인을 불러오지 못했어요:', item.name, err);
      }
      // 디자인 하나 그릴 때마다 화면에 숨 쉴 틈을 줘요(첫 화면이 버벅이지 않게)
      if (n % 4 === 3) { renderFilters(); renderDesigns(); }
      await new Promise((r) => setTimeout(r, 0));
    }
    renderFilters(); renderDesigns();
  }

  /* ───────── 이벤트 연결 ───────── */

  $('#file').addEventListener('change', (e) => { loadPhoto(e.target.files[0]); e.target.value = ''; });

  $$('[data-tool]').forEach((b) => b.addEventListener('click', () => {
    S.tool = b.dataset.tool;
    $$('[data-tool]').forEach((x) => x.classList.toggle('on', x === b));
    updateCursor();
  }));
  $('#brush').addEventListener('input', (e) => { S.brush = +e.target.value; draw(); });
  $('#undo').addEventListener('click', undo);
  $('#clear').addEventListener('click', () => { S.strokes = []; redrawMask(); draw(); });
  $('#restart').addEventListener('click', () => { S.photo = null; setStep(1); });
  $('#toStep3').addEventListener('click', goStep3);
  $('#back2').addEventListener('click', () => { setStep(2); });
  $('#save').addEventListener('click', save);

  $$('[data-zoom]').forEach((b) => b.addEventListener('click', () => {
    const { w, h } = stageSize();
    if (b.dataset.zoom === 'in') zoomAt(w / 2, h / 2, 1.4);
    else if (b.dataset.zoom === 'out') zoomAt(w / 2, h / 2, 1 / 1.4);
    else if (S.step === 3 && !(S.autoFit && S.fitRect)) fitTo(browsRect());
    else fitTo(null);
  }));

  $$('[data-opt]').forEach((inp) => inp.addEventListener('input', () => {
    S.opts[inp.dataset.opt] = +inp.value;
    scheduleCompose();
  }));
  $('#resetShape').addEventListener('click', () => {
    Object.assign(S.opts, SHAPE_DEFAULTS);
    for (const k of Object.keys(SHAPE_DEFAULTS)) $(`[data-opt="${k}"]`).value = SHAPE_DEFAULTS[k];
    S.nudge = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
    scheduleCompose();
  });

  const showOrig = (on) => { if (S.showOrig !== on) { S.showOrig = on; draw(); } };
  el.hold.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    try { el.hold.setPointerCapture(e.pointerId); } catch { /* 없어도 동작 */ }
    showOrig(true);
  });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) el.hold.addEventListener(ev, () => showOrig(false));
  el.hold.addEventListener('contextmenu', (e) => e.preventDefault());

  // 관리자 모드(?admin): 실제 디자인 PNG를 바로 올려서 시험해볼 수 있어요
  $$('.admin-only').forEach((n) => { n.hidden = !ADMIN; });
  if (ADMIN) Object.assign(window, { __brow: S, __compose: compose });   // 콘솔에서 상태 확인·다시 합성용
  $('#addDesign').addEventListener('change', async (e) => {
    for (const f of e.target.files) {
      const url = URL.createObjectURL(f);
      try {
        const d = prepDesign(await loadImage(url), { name: f.name.replace(/\.[^.]+$/, ''), tag: '추가한 이미지' });
        if (d) { S.designs.push(d); S.di = S.designs.length - 1; } else toast(`${f.name}에서 눈썹을 찾지 못했어요.`);
      } catch { toast(`${f.name}을(를) 열 수 없어요.`); }
      URL.revokeObjectURL(url);
    }
    e.target.value = '';
    S.cat = '전체';
    renderFilters(); renderDesigns();
    scheduleCompose();
  });
  $('#flipDesign').addEventListener('click', () => {
    const d = S.designs[S.di]; if (!d) return;
    d.flip = !d.flip;
    d.thumb = makeThumb(d);
    renderDesigns();
    scheduleCompose();
  });

  renderColors();
  loadDesigns();
})();
