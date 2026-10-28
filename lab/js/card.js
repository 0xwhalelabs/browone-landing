/* Story-size (1080×1920) PNG cards drawn on canvas: result card and coupon card.
   Instagram story safe area: key content between y≈250 and y≈1670. */
(function () {
  const W = 1080, H = 1920;
  const KR = '"Noto Serif KR"', LAT = '"Cormorant Garamond"', UI = '"Pretendard Variable", Pretendard, sans-serif';
  const INK = '#2e2226', COCOA = '#4a3238', MAUVE = '#8a5c66', CREAM = '#fdf8f4', LINE = '#ead9d4';

  async function fonts(texts) {
    const all = texts.join('');
    const specs = [`700 80px ${KR}`, `500 40px ${KR}`, `italic 500 48px ${LAT}`, `600 48px ${LAT}`, `500 32px ${UI}`, `700 32px ${UI}`];
    try { await Promise.all(specs.map(s => document.fonts.load(s, all))); await document.fonts.ready; } catch (e) { /* fall back to system fonts */ }
  }
  const img = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });

  function wrap(x, text, maxW) {
    const out = []; let line = '';
    for (const word of String(text).split(/(\s+)/)) {
      const test = line + word;
      if (x.measureText(test.trim()).width > maxW && line.trim()) { out.push(line.trim()); line = word.trimStart(); }
      else line = test;
    }
    if (line.trim()) out.push(line.trim());
    // break very long single words by character
    return out.flatMap(l => { if (x.measureText(l).width <= maxW) return [l]; const r = []; let s = ''; for (const ch of l) { if (x.measureText(s + ch).width > maxW) { r.push(s); s = ch; } else s += ch; } if (s) r.push(s); return r; });
  }
  function spaced(x, text, cx, y, track) {
    const chars = [...text], w = chars.reduce((a, ch) => a + x.measureText(ch).width, 0) + track * (chars.length - 1);
    let px = cx - w / 2; x.textAlign = 'left';
    chars.forEach(ch => { x.fillText(ch, px, y); px += x.measureText(ch).width + track; });
    x.textAlign = 'center';
  }
  function archPath(x, l, t, w, h) {
    const r = w / 2; x.beginPath(); x.moveTo(l, t + h); x.lineTo(l, t + r); x.arc(l + r, t + r, r, Math.PI, 0); x.lineTo(l + w, t + h); x.closePath();
  }
  function rr(x, l, t, w, h, r) { x.beginPath(); x.roundRect ? x.roundRect(l, t, w, h, r) : x.rect(l, t, w, h); }
  function brow(x, cx, cy, L, color, alpha, shape, thick) {
    const b = window.BrowChar.brow(shape || 'soft-arch', thick || 'thin', [cx - L / 2, cy], 1, L, { w: L / 170, seed: 7, dens: 2 });
    x.save(); x.globalAlpha = alpha * 0.1; x.fillStyle = color; x.fill(new Path2D(b.base)); x.restore();
    x.save(); x.strokeStyle = color; x.lineCap = 'round';
    b.hairs.forEach(h => { x.globalAlpha = alpha * h.o; x.lineWidth = h.w; x.stroke(new Path2D(h.d)); }); x.restore();
  }
  const toBlob = cv => new Promise(res => cv.toBlob(res, 'image/png'));

  async function result(t, g, r) {
    const A = window.BrowApp, CFG = window.BROW_CONFIG, col = A.colorOf(r);
    await fonts([r.name, r.en, r.tagline, r.desc, (r.tags || []).join(''), t.title, 'BROW LAB ONE browone.com/lab 재미로 보는 여자남자뷰티심리테스트 Vol.0123456789 · 일러스트는 AI로 만든 이미지예요 브로우원', CFG.instaHandle, r.mbti || '']);
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d');
    // ground: soft pastel gradient (type colour → cream) with a quiet glow behind the portrait — no rays
    const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, col.bg); gr.addColorStop(0.38, col.bg); gr.addColorStop(0.68, CREAM); gr.addColorStop(1, CREAM);
    x.fillStyle = gr; x.fillRect(0, 0, W, H);
    const glow = x.createRadialGradient(W / 2, 690, 40, W / 2, 690, 620); glow.addColorStop(0, col.mid); glow.addColorStop(1, 'rgba(253,248,244,0)');
    x.save(); x.globalAlpha = 0.55; x.fillStyle = glow; x.fillRect(0, 0, W, H); x.restore();
    x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    // header
    x.fillStyle = MAUVE; x.font = `italic 500 44px ${LAT}`; x.fillText('Brow Lab', W / 2, 262);
    x.font = `500 30px ${KR}`; x.fillText(`재미로 보는 · Vol.${t.vol} · ${t.title} · ${g === 'f' ? '여자' : '남자'}`, W / 2, 316);
    // arch portrait
    const aw = 520, ah = 650, al = (W - aw) / 2, at = 368;
    try {
      const im = await img(A.IMG(t, g, r));
      x.save(); archPath(x, al, at, aw, ah); x.clip();
      const s = Math.max(aw / im.width, ah / im.height), iw = im.width * s, ih = im.height * s;
      x.drawImage(im, al + (aw - iw) / 2, at + (ah - ih) / 2, iw, ih); x.restore();
    } catch (e) { x.fillStyle = col.mid; archPath(x, al, at, aw, ah); x.fill(); }
    x.strokeStyle = col.ink; x.lineWidth = 2; archPath(x, al - 18, at - 18, aw + 36, ah + 36); x.stroke();
    // the result's own brow (signature), then the name block
    const c = r.char || {};
    brow(x, W / 2, 1112, 220, COCOA, 1, c.brow, c.thick);
    let y = 1162;
    if (r.mbti) { x.fillStyle = col.ink; x.font = `600 44px ${LAT}`; spaced(x, r.mbti, W / 2, y + 40, 8); y += 56; }
    x.fillStyle = INK; x.font = `700 72px ${KR}`;
    const nameLines = wrap(x, r.name, 920).slice(0, 2);
    nameLines.forEach(l => { y += 82; x.fillText(l, W / 2, y); });
    x.fillStyle = col.ink; x.font = `italic 500 44px ${LAT}`; y += 58; x.fillText(r.en || '', W / 2, y);
    x.fillStyle = COCOA; x.font = `500 34px ${KR}`; y += 20;
    wrap(x, `“${r.tagline}”`, 860).slice(0, 2).forEach(l => { y += 52; x.fillText(l, W / 2, y); });
    // chips
    y += 74; x.font = `700 28px ${UI}`;
    const tags = (r.tags || []).slice(0, 3), pads = 28, gap = 14, widths = tags.map(s => x.measureText(s).width + pads * 2);
    let cx = W / 2 - (widths.reduce((a, b) => a + b, 0) + gap * (tags.length - 1)) / 2;
    tags.forEach((s, i) => { x.fillStyle = '#fffdfb'; rr(x, cx, y - 40, widths[i], 58, 29); x.fill(); x.strokeStyle = col.mid; x.lineWidth = 2; x.stroke();
      x.fillStyle = col.ink; x.fillText(s, cx + widths[i] / 2, y - 1); cx += widths[i] + gap; });
    y += 30;
    // description: as many lines as fit above the footer rule (story UI covers below ~1670)
    x.fillStyle = MAUVE; x.font = `500 29px ${UI}`;
    const lines = wrap(x, r.desc, 860), room = Math.max(1, Math.floor((1668 - y) / 44));
    if (lines.length > room) {  // never cut a sentence silently
      lines.length = room; let l = lines[room - 1];
      while (l && x.measureText(l + '…').width > 860) l = l.slice(0, -1);
      lines[room - 1] = l.replace(/[\s,.]+$/, '') + '…';
    }
    lines.forEach(l => { y += 44; x.fillText(l, W / 2, y); });
    // footer
    x.strokeStyle = LINE; x.lineWidth = 2; x.beginPath(); x.moveTo(140, 1700); x.lineTo(W - 140, 1700); x.stroke();
    x.fillStyle = COCOA; x.font = `600 40px ${LAT}`; spaced(x, CFG.brand, W / 2, 1768, 14);
    x.fillStyle = MAUVE; x.font = `500 27px ${UI}`; x.fillText(`재미로 보는 브로우원 뷰티 심리테스트 · browone.com/lab · ${CFG.instaHandle}`, W / 2, 1818);
    x.font = `500 20px ${UI}`; x.globalAlpha = 0.75; x.fillText('일러스트는 AI로 만든 이미지예요', W / 2, 1858); x.globalAlpha = 1;
    return toBlob(cv);
  }

  async function coupon(c) {
    const CFG = window.BROW_CONFIG, cp = CFG.coupon, exp = window.BrowCoupon.expiry(c);
    const ymd = d => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    await fonts([cp.title, cp.terms.join('') + cp.note, '10,000 0123456789 Brow Lab Lucky Draw', '원 할인권 당첨 발급 사용기한 까지 방문하실 때 이 이미지를 보여주세요', c.code, CFG.brand]);
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d');
    x.fillStyle = COCOA; x.fillRect(0, 0, W, H);
    brow(x, W / 2, 300, 520, '#e8b4b8', 0.9);
    x.textAlign = 'center';
    x.fillStyle = '#e8b4b8'; x.font = `italic 500 46px ${LAT}`; x.fillText('Brow Lab', W / 2, 400);
    // ticket
    const tl = 100, tt = 450, tw = W - 200, th = 1110, cut = tt + 480;
    x.fillStyle = '#fffdfb'; rr(x, tl, tt, tw, th, 36); x.fill();
    x.fillStyle = '#f6e3e1'; x.save(); rr(x, tl, tt, tw, th, 36); x.clip(); x.fillRect(tl, tt, tw, cut - tt); x.restore();
    x.fillStyle = COCOA; [tl, tl + tw].forEach(px => { x.beginPath(); x.arc(px, cut, 30, 0, Math.PI * 2); x.fill(); });
    x.strokeStyle = LINE; x.lineWidth = 3; x.setLineDash([14, 12]); x.beginPath(); x.moveTo(tl + 50, cut); x.lineTo(tl + tw - 50, cut); x.stroke(); x.setLineDash([]);
    x.fillStyle = MAUVE; x.font = `italic 500 44px ${LAT}`; x.fillText('Lucky Draw', W / 2, tt + 100);
    // lining numerals: canvas can't switch Cormorant's old-style figures, so the amount uses the Korean serif
    x.fillStyle = INK; x.font = `700 170px ${KR}`; const w1 = x.measureText('10,000').width;
    x.font = `700 64px ${KR}`; const w2 = x.measureText('원').width, sx = W / 2 - (w1 + 16 + w2) / 2;
    x.textAlign = 'left'; x.font = `700 170px ${KR}`; x.fillText('10,000', sx, tt + 300);
    x.font = `700 64px ${KR}`; x.fillText('원', sx + w1 + 16, tt + 296); x.textAlign = 'center';
    x.fillStyle = COCOA; x.font = `700 46px ${KR}`; x.fillText(cp.title, W / 2, tt + 400);
    // code
    x.fillStyle = CREAM; rr(x, tl + 60, cut + 60, tw - 120, 130, 22); x.fill(); x.strokeStyle = LINE; x.lineWidth = 2; x.stroke();
    x.fillStyle = MAUVE; x.font = `500 26px ${UI}`; x.fillText('쿠폰 코드', W / 2, cut + 100);
    x.fillStyle = INK; x.font = `700 58px ${UI}`; spaced(x, c.code, W / 2, cut + 166, 6);
    x.fillStyle = COCOA; x.font = `500 32px ${UI}`;
    x.fillText(`발급 ${ymd(new Date(c.issued))}  ·  사용기한 ${ymd(exp)}까지`, W / 2, cut + 260);
    x.fillStyle = MAUVE; x.font = `500 28px ${UI}`; let y = cut + 340;
    cp.terms.forEach(s => { wrap(x, '· ' + s, tw - 160).forEach(l => { x.fillText(l, W / 2, y); y += 44; }); });
    x.font = `500 24px ${UI}`; x.fillText(cp.note, W / 2, y + 6);
    x.fillStyle = INK; x.font = `700 34px ${KR}`; x.fillText('방문하실 때 이 이미지를 보여주세요', W / 2, tt + th - 64);
    // brand
    x.fillStyle = CREAM; x.font = `600 46px ${LAT}`; spaced(x, CFG.brand, W / 2, 1700, 16);
    x.fillStyle = '#e8b4b8'; x.font = `500 28px ${UI}`; x.fillText(`browone.com · ${CFG.info[0]}`, W / 2, 1756);
    return toBlob(cv);
  }

  window.BrowCard = { result, coupon };
})();
