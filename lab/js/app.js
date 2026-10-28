/* BROW LAB — router, screens, motion, share/save, lucky draw.
   Motion grammar (RECIPE.md): one container that keeps its frame while content swaps (R0011),
   a brow that fills hair by hair (R1150 line + feathering generator), hold-to-open (R1463),
   card deal + flip (R0108), pop with overshoot (R0124). */
(function () {
  const CFG = window.BROW_CONFIG, C = window.BrowChar, K = window.BrowCoupon;
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const app = $('#app');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const utm = (url, campaign) => url + (url.includes('?') ? '&' : '?') + CFG.utm + '&utm_campaign=' + encodeURIComponent(campaign || 'browlab');
  const G = { f: '여자', m: '남자' };
  const SHAPE = { 'straight': '일자', 'soft-arch': '소프트 아치', 'high-arch': '하이 아치', 'angled': '각진 라인', 'round': '라운드', 'up': '업 라인', 'down': '내추럴 다운' };
  const ICON = {
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    left: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'
  };

  // ---------- data ----------
  const TESTS = (window.TESTS || []).map(t => {
    if (t.type === 'mbti' && !Array.isArray(t.results.f)) {
      const keys = Object.keys(t.results);
      const per = g => keys.map(k => { const r = t.results[k], gg = r[g] || {};
        return { id: k, mbti: k, name: r.name, en: r.en, tagline: r.tagline, tags: r.tags, desc: r.desc, match: r.match, clash: r.clash, points: gg.points || [], service: gg.service || {}, char: gg.char || {} }; });
      return Object.assign({}, t, { results: { f: per('f'), m: per('m') } });
    }
    return t;
  });
  const byId = id => TESTS.find(t => t.id === id);
  const resOf = (t, g, rid) => (t.results[g] || []).find(r => r.id === rid);
  const IMG = (t, g, r) => `assets/img/${t.id}/${g}-${String(r.id).toLowerCase()}.jpg`;
  const cover = t => IMG(t, 'f', t.results.f[0]);
  const colorOf = r => C.COLORS[(r.char && r.char.color) || 'rose'] || C.COLORS.rose;

  // ---------- storage ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  const done = () => store.get('browlab.results.v1', {});
  let S = { t: null, g: null, qi: 0, ans: [], fresh: null };

  // ---------- brow line (signature) ----------
  function browLine(opt) {
    const W = opt.W || 340, H = opt.H || 92, L = opt.L || 300;
    const b = C.brow(opt.shape || 'soft-arch', opt.thick || 'thin', [opt.x0 || 18, opt.y0 || 62], 1, L, { w: opt.w || 1.3, seed: opt.seed || 11, dens: opt.dens || 2.2 });
    let vb = `0 0 ${W} ${H}`;
    if (opt.fit) {  // tight viewBox around every hair point, so any brow shape fits its box
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      b.hairs.forEach(h => { for (const m of h.d.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)) { x0 = Math.min(x0, +m[1]); x1 = Math.max(x1, +m[1]); y0 = Math.min(y0, +m[2]); y1 = Math.max(y1, +m[2]); } });
      const p = 4; vb = `${(x0 - p).toFixed(1)} ${(y0 - p).toFixed(1)} ${(x1 - x0 + 2 * p).toFixed(1)} ${(y1 - y0 + 2 * p).toFixed(1)}`;
    }
    let s = `<svg class="${opt.cls || 'brow-line'}" viewBox="${vb}" aria-hidden="true"><path class="bl-base" d="${b.base}" fill="#8a6a66" fill-opacity="${opt.base == null ? .08 : opt.base}"/>`;
    b.hairs.forEach(h => { s += `<path class="bl-hair" d="${h.d}" fill="none" stroke="${opt.color || h.c}" stroke-width="${(h.w).toFixed(2)}" stroke-linecap="round" stroke-opacity="${h.o.toFixed(2)}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${opt.hidden ? 1 : 0}"${opt.hidden ? ' opacity="0"' : ''}/>`; });
    return s + '</svg>';
  }
  function drawHairs(hairs, delay, per, dur) {
    if (reduce) { hairs.forEach(h => { h.setAttribute('stroke-dashoffset', 0); h.setAttribute('opacity', 1); }); return 0; }
    hairs.forEach((h, i) => {
      h.setAttribute('stroke-dashoffset', 0); h.setAttribute('opacity', 1);
      h.animate([{ strokeDashoffset: 1, opacity: 0 }, { opacity: 1, offset: 0.08 }, { strokeDashoffset: 0, opacity: 1 }], { duration: dur || 260, delay: delay + i * (per || 6), easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'backwards' });
    });
    return delay + hairs.length * (per || 6) + (dur || 260);
  }

  // ---------- transitions ----------
  async function swap(html, after) {
    const old = app.firstElementChild;
    // never let an exit animation hold the next screen (background tabs pause the timeline)
    if (old && old.tagName !== 'NOSCRIPT' && !reduce) await Promise.race([old.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-8px)' }], { duration: 160, easing: 'ease-out', fill: 'forwards' }).finished.catch(() => {}), wait(220)]);
    app.innerHTML = html;
    window.scrollTo(0, 0);
    const items = $$('[data-in]', app);
    if (!reduce) items.forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
      { duration: 460, delay: 40 + i * 55, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'backwards' }));
    const first = $('h1, h2, [data-focus]', app); if (first) { first.setAttribute('tabindex', '-1'); first.focus({ preventScroll: true }); }
    if (after) after();
  }
  function toast(msg) {
    $$('.toast').forEach(t => t.remove());
    const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translate(-50%, 8px)'; setTimeout(() => t.remove(), 420); }, 4000);
  }
  const foot = () => `<footer class="foot" data-in>
      <a class="wordmark" href="${utm(CFG.site, 'footer')}" target="_blank" rel="noopener">${esc(CFG.brand)}</a>
      <div>${CFG.info.map(esc).join('<br>')}</div>
      <nav><a href="${utm(CFG.site, 'footer')}" target="_blank" rel="noopener">browone.com 예약</a><a href="${CFG.kakao}" target="_blank" rel="noopener">카카오톡 상담</a><a href="${CFG.insta}" target="_blank" rel="noopener">인스타그램 ${esc(CFG.instaHandle)}</a></nav>
      <div class="ai">테스트 결과는 재미로 보는 성향 테스트예요. 인물 일러스트는 AI로 만든 이미지로, 실제 고객이 아니에요.</div>
    </footer>`;

  // ---------- home ----------
  function testRows(skip) {
    const d = done();
    return TESTS.filter(t => t.id !== skip).map(t => {
      const my = d[t.id];
      return `<a class="row" href="#/t/${t.id}" data-in>
        <div class="thumb"><img src="${cover(t)}" alt="" loading="lazy"></div>
        <div><div class="vol num">Vol.${esc(t.vol)}</div><div class="t">${esc(t.title)}</div><div class="hook">${esc(t.hook)}</div>
          ${my ? `<span class="done">내 결과 · ${esc(my.name)}</span>` : ''}</div>
        <span class="arr">${ICON.right}</span></a>`;
    }).join('');
  }
  function home() {
    swap(`<section class="screen hero">
        <p class="eyebrow" data-in>Brow Lab — 재미로 보는 뷰티 심리테스트</p>
        <h1 class="h1" data-in>얼굴의 인상을 바꾸는<br>단 하나의 선</h1>
        <div data-in>${browLine({ hidden: true, cls: 'brow-line hero-brow' })}</div>
        <p class="lead" data-in>내 성격에 어울리는 눈썹은 어떤 모양일까요? 1분 테스트로 나만의 눈썹 결을 찾아보세요.</p>
        <div class="series-label" data-in><span class="h2" style="font-size:20px">테스트 시리즈</span><span class="small">${TESTS.length}편</span></div>
        <div class="series" id="list">${testRows()}</div>
        <a class="ticket-band" href="#/draw" data-in>
          <div><b>테스트 마지막엔<br>할인권 뽑기가 있어요</b><span>브로우원 시술 할인권 · 방문할 때 사용</span></div>
          <span class="arr" aria-hidden="true">${ICON.right}</span></a>
        ${foot()}
      </section>`, () => {
      const hairs = $$('.hero-brow .bl-hair', app);
      drawHairs(hairs, 380, 3, 300);
      if (location.hash === '#/list') { const l = $('#list'); if (l) window.scrollTo(0, l.getBoundingClientRect().top + scrollY - 80); }
    });
  }

  // ---------- intro ----------
  function intro(id) {
    const t = byId(id); if (!t) return home();
    const nq = g => (t.q[g] || []).length;
    const gbtn = g => `<button class="gbtn" data-g="${g}" aria-pressed="false"><span class="gimg"><img src="${IMG(t, g, t.results[g][0])}" alt=""></span><span class="lat">${g === 'f' ? 'Woman' : 'Man'}</span><span class="k">${G[g]}</span></button>`;
    swap(`<section class="screen">
        <a class="back" href="#/">${ICON.left}테스트 목록</a>
        <div class="intro-art" data-in><img src="${cover(t)}" alt=""></div>
        <p class="eyebrow" style="text-align:center;margin-top:24px" data-in><span class="fun">재미로 보는 테스트</span> Vol.${esc(t.vol)}</p>
        <h1 class="h1" style="text-align:center;font-size:clamp(26px,7.4vw,32px)" data-in>${esc(t.title)}</h1>
        <p class="lead" style="text-align:center" data-in>${esc(t.intro)}</p>
        <div class="meta" data-in><span>질문 ${nq('f')}개</span><span>약 1분</span><span>결과 이미지 저장</span></div>
        <div class="gender" data-in><div class="q">먼저, 성별을 골라주세요</div><div class="opts">${gbtn('f')}${gbtn('m')}</div></div>
        ${t.type === 'mbti' ? `<div class="mbti-pick" data-in><div class="small" style="text-align:center">내 MBTI를 이미 안다면 성별을 고른 뒤 바로 선택하세요</div>
          <div class="mbti-grid">${['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'].map(k => `<button data-mbti="${k}">${k}</button>`).join('')}</div></div>` : ''}
        ${foot()}
      </section>`, () => {
      let picked = null;
      $$('.gbtn', app).forEach(b => b.addEventListener('click', async () => {
        picked = b.dataset.g;
        $$('.gbtn', app).forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
        if (t.type === 'mbti') { toast(`${G[picked]} · 질문으로 알아보거나 MBTI를 바로 골라주세요`); await wait(500); }
        else await wait(260);
        if (t.type === 'mbti') { showMbtiStart(); return; }
        start(t, picked);
      }));
      function showMbtiStart() {
        let go = $('#mbti-go', app);
        if (!go) {
          go = document.createElement('button'); go.id = 'mbti-go'; go.className = 'btn block'; go.style.marginTop = '16px';
          go.textContent = '질문 12개로 알아보기'; $('.gender', app).appendChild(go);
          go.addEventListener('click', () => start(t, picked));
          if (!reduce) go.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'ease-out' });
        }
      }
      $$('[data-mbti]', app).forEach(b => b.addEventListener('click', () => {
        if (!picked) { toast('성별을 먼저 골라주세요'); $('.gender', app).animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 260 }); return; }
        finish(t, picked, b.dataset.mbti, true);
      }));
    });
  }

  // ---------- questions ----------
  function start(t, g) {
    S = { t, g, qi: 0, ans: [], fresh: null };
    location.hash = `#/t/${t.id}/${g}/q`;
  }
  function quiz() {
    const t = S.t, g = S.g; if (!t || !g) return home();
    const qs = t.q[g];
    swap(`<section class="screen">
        <div class="prog" data-in>${browLine({ hidden: true, cls: 'brow-line pbrow', W: 320, H: 84, L: 286, x0: 14, y0: 58, base: 0.04 })}<span class="count num" aria-live="polite"></span></div>
        <div class="qcard" data-in><div class="qbody"></div></div>
        <div class="qnav" data-in><button class="link" id="qback">이전 질문</button><a class="link" href="#/t/${t.id}">처음으로</a></div>
      </section>`, () => {
      const hairs = $$('.pbrow .bl-hair', app), base = $('.pbrow .bl-base', app);
      let shown = 0;
      const progress = n => {
        const want = Math.round(hairs.length * n / qs.length);
        if (want > shown) drawHairs(hairs.slice(shown, want), 0, 4, 280);
        else hairs.slice(want, shown).forEach(h => { h.setAttribute('stroke-dashoffset', 1); h.setAttribute('opacity', 0); });
        shown = want; base.setAttribute('fill-opacity', (0.06 + 0.22 * n / qs.length).toFixed(3));
        $('.count', app).textContent = `${Math.min(n + 1, qs.length)} / ${qs.length}`;
      };
      const body = $('.qbody', app);
      const paint = () => {
        const q = qs[S.qi];
        body.innerHTML = `<div class="qn num">Q.${String(S.qi + 1).padStart(2, '0')}</div><h2 class="qt" data-focus>${esc(q.q)}</h2>
          <div class="answers" role="group" aria-label="선택지">${q.a.map((a, i) => `<button class="ans${S.ans[S.qi] === i ? ' on' : ''}" data-i="${i}"><span class="dot">${ICON.check}</span><span>${esc(a.t)}</span></button>`).join('')}</div>`;
        $('#qback', app).style.visibility = S.qi ? 'visible' : 'hidden';
        $$('.ans', body).forEach(b => b.addEventListener('click', () => pick(+b.dataset.i, b)));
      };
      const move = async (dir, fn) => {
        if (!reduce) await body.animate([{ opacity: 1, filter: 'blur(0)', transform: 'none' }, { opacity: 0, filter: 'blur(4px)', transform: `translateX(${-14 * dir}px)` }], { duration: 170, easing: 'ease-in-out', fill: 'forwards' }).finished;
        fn();
        if (!reduce) body.animate([{ opacity: 0, filter: 'blur(4px)', transform: `translateX(${18 * dir}px)` }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 280, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' });
        const h = $('.qt', body); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      };
      let busy = false;
      const pick = async (i, btn) => {
        if (busy) return; busy = true;
        S.ans[S.qi] = i; $$('.ans', body).forEach(b => b.classList.toggle('on', b === btn));
        progress(S.qi + 1);
        await wait(reduce ? 120 : 360);
        if (S.qi + 1 >= qs.length) { busy = false; return analyse(); }
        await move(1, () => { S.qi++; paint(); });
        busy = false;
      };
      $('#qback', app).addEventListener('click', () => { if (!S.qi || busy) return; move(-1, () => { S.qi--; paint(); progress(S.qi); }); });
      paint(); progress(S.qi);
    });
  }

  function score(t, g, ans) {
    const qs = t.q[g], tot = {};
    ans.forEach((ai, qi) => { const s = (qs[qi].a[ai] || {}).s || {}; for (const k in s) tot[k] = (tot[k] || 0) + s[k]; });
    if (t.type === 'mbti') return ['EI', 'SN', 'TF', 'JP'].map(p => (tot[p[0]] || 0) >= (tot[p[1]] || 0) ? p[0] : p[1]).join('');
    const list = t.results[g]; let best = list[0].id, bv = -1;
    // tie → the result the latest answers pointed to
    list.forEach(r => { const v = (tot[r.id] || 0) + ans.reduce((a, ai, qi) => a + (((qs[qi].a[ai] || {}).s || {})[r.id] ? qi * 0.001 : 0), 0); if (v > bv) { bv = v; best = r.id; } });
    return best;
  }

  async function analyse() {
    const t = S.t, g = S.g;
    await swap(`<section class="screen analyse">
        ${browLine({ hidden: true, cls: 'brow-line abrow', W: 320, H: 90, L: 290, x0: 14, y0: 62, shape: 'soft-arch' })}
        <h2 class="h2" style="font-size:20px">눈썹 결을 한 올씩 그려보는 중이에요</h2>
        <p class="small">답변 ${S.ans.length}개를 분석하고 있어요</p></section>`);
    const total = drawHairs($$('.abrow .bl-hair', app), 0, 2.4, 240);
    await wait(reduce ? 500 : Math.max(1500, total + 200));
    finish(t, g, score(t, g, S.ans), false);
  }

  function finish(t, g, rid, direct) {
    const r = resOf(t, g, rid); if (!r) return home();
    const d = done(); d[t.id] = { g, rid, name: r.name, at: Date.now() }; store.set('browlab.results.v1', d);
    S.fresh = `${t.id}/${g}/${rid}`;
    location.replace(`#/r/${t.id}/${g}/${rid}`);  // back from a result returns to the test cover, not the last question
  }

  // ---------- result ----------
  function result(id, g, rid) {
    const t = byId(id); if (!t || !G[g]) return home();
    const r = resOf(t, g, rid); if (!r) return intro(id);
    const my = done()[id], mine = S.fresh === `${id}/${g}/${rid}` || !!(my && my.g === g && my.rid === rid);
    const col = colorOf(r);
    const m1 = resOf(t, g, r.match), m2 = resOf(t, g, r.clash);
    const mcard = (x, label) => x ? `<a class="m" href="#/r/${t.id}/${g}/${x.id}"><img src="${IMG(t, g, x)}" alt="" loading="lazy"><div><div class="l">${label}</div><div class="n">${esc(x.name)}</div></div><span class="arr">${ICON.right}</span></a>` : '';
    const coupon = K.load();
    swap(`<section class="screen result" style="--type-bg:${col.bg};--type-mid:${col.mid};--type-deep:${col.deep};--type-ink:${col.ink}">
        <div class="r-head">
          ${mine ? '' : '<span class="friend" data-in>친구가 공유한 결과예요</span>'}
          <div class="r-test" data-in><span class="fun">재미로 보는 결과</span> Vol.${esc(t.vol)} · ${esc(t.title)} · ${G[g]}</div>
          <div class="arch" data-in><div class="ph"><img src="${IMG(t, g, r)}" alt="${esc(r.name)} 결과 일러스트"></div>
            <svg class="frame" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true"><path d="M2 123V50A48 48 0 0 1 98 50V123Z" fill="none" stroke="${col.ink}" stroke-width=".4" pathLength="1" stroke-dasharray="1 1"/></svg></div>
          <div class="r-brow" data-in>${browLine({ hidden: true, cls: 'brow-line rbrow', shape: (r.char || {}).brow, thick: (r.char || {}).thick, fit: true, L: 196, x0: 22, y0: 60, w: 1.25, dens: 2, seed: 7 })}
            <span>${G[g]} · ${esc(SHAPE[(r.char || {}).brow] || '소프트 아치')} 결</span></div>
          ${t.type === 'mbti' ? `<div class="num" style="font-size:20px;color:${col.ink};margin-top:16px" data-in>${esc(r.mbti)}</div>` : ''}
          <h1 class="r-name" data-in ${t.type === 'mbti' ? 'style="margin-top:4px"' : ''}>${esc(r.name)}</h1>
          <div class="r-en num" data-in>${esc(r.en)}</div>
          <p class="r-tag" data-in>“${esc(r.tagline)}”</p>
          <div class="chips" data-in>${(r.tags || []).map(x => `<span>${esc(x)}</span>`).join('')}</div>
        </div>
        <div class="r-body" data-in><p>${esc(r.desc)}</p></div>
        <div class="sec" data-in><h3><span class="num">Tip</span>찰떡 포인트</h3>
          <ol class="points">${(r.points || []).map((p, i) => `<li><span class="num">${i + 1}</span><span>${esc(p)}</span></li>`).join('')}</ol></div>
        <div class="sec" data-in><h3><span class="num">Care</span>브로우원 추천 시술</h3>
          <div class="svc"><div class="nm">${esc(r.service && r.service.name)}</div><div class="why">${esc(r.service && r.service.why)}</div>
            <a href="${utm(CFG.menu, t.id)}" target="_blank" rel="noopener">시술 자세히 보기 →</a></div></div>
        <div class="sec" data-in><h3><span class="num">Match</span>눈썹 궁합</h3><div class="match">${mcard(m1, '찰떡 궁합')}${mcard(m2, '반대 매력 궁합')}</div></div>
        <div class="actions" data-in>
          ${mine ? '' : `<a class="btn wide" href="#/t/${t.id}">나도 테스트 하기</a>`}
          <button class="btn${mine ? '' : ' ghost'}" id="share">${ICON.share}공유하기</button>
          <button class="btn ghost" id="save">${ICON.save}이미지 저장</button>
          ${mine ? `<button class="btn soft wide" id="others">다른 테스트 하기</button>` : ''}
        </div>
        ${mine ? `<div class="draw-cta" data-in><div class="k">${coupon ? '받은 할인권이 있어요' : '테스트 완료!<br>브로우원 시술 할인권 뽑기'}</div>
          <div class="s">${coupon ? '방문하실 때 쿠폰 화면을 보여주세요' : '카드 한 장을 골라 열어보세요'}</div>
          <a class="btn" href="#/draw">${coupon ? '내 할인권 보기' : '할인권 뽑으러 가기'}</a></div>` : ''}
        <p class="ai-note" data-in>결과 일러스트는 AI로 만든 이미지예요 · <button class="link" style="font-size:12px" id="retry">다시 하기</button></p>
        <div class="others" id="others-list"><div class="series-label"><span class="h2" style="font-size:20px">다른 테스트도 해볼까요?</span></div><div class="series">${testRows(t.id)}</div></div>
        ${foot()}
      </section>`, () => {
      const ph = $('.arch .ph', app), frame = $('.arch .frame path', app);
      if (!reduce) {
        ph.animate([{ opacity: 0, transform: 'scale(.94)' }, { opacity: 1, transform: 'none' }], { duration: 640, delay: 120, easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)', fill: 'backwards' });
        frame.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1100, delay: 420, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'backwards' });
      }
      frame.setAttribute('stroke-dashoffset', 0);
      drawHairs($$('.rbrow .bl-hair', app), reduce ? 0 : 900, 3, 260);  // the result's own brow, hair by hair
      $('#share', app).addEventListener('click', () => shareResult(t, g, r));
      $('#save', app).addEventListener('click', () => saveResult(t, g, r));
      const o = $('#others', app); if (o) o.addEventListener('click', () => { const l = $('#others-list', app); window.scrollTo({ top: l.getBoundingClientRect().top + scrollY - 70, behavior: reduce ? 'auto' : 'smooth' }); });
      $('#retry', app).addEventListener('click', () => { location.hash = `#/t/${t.id}`; });
    });
  }

  const shareURL = (t, g, r) => location.origin + location.pathname + `#/r/${t.id}/${g}/${r.id}`;
  async function shareResult(t, g, r) {
    const url = shareURL(t, g, r), title = 'BROW LAB · 재미로 보는 브로우원 뷰티 심리테스트';
    const text = `재미로 해봤는데 나는 「${r.name}」 — ${t.title}\n너도 해보고 결과 알려줘!`;
    try {
      if (navigator.canShare) {
        const blob = await window.BrowCard.result(t, g, r);
        const file = new File([blob], `browlab-${t.id}-${r.id}.png`, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title, text: text + '\n' + url }); return; }
      }
      if (navigator.share) { await navigator.share({ title, text, url }); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    copy(url, '링크를 복사했어요. 인스타 스토리·DM에 붙여넣어 주세요');
  }
  async function copy(text, msg) {
    try { await navigator.clipboard.writeText(text); toast(msg || '복사했어요'); }
    catch (e) { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast(msg || '복사했어요'); } catch (_) { toast(text); } ta.remove(); }
  }
  async function saveResult(t, g, r) {
    toast('이미지를 만드는 중이에요');
    const blob = await window.BrowCard.result(t, g, r);
    download(blob, `browlab-${t.id}-${r.id}.png`);
  }
  function download(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    preview(url);
  }
  // in-app browsers (Instagram) ignore downloads → also show the image to long-press
  function preview(url) {
    const d = document.createElement('dialog'); d.className = 'pv';
    d.innerHTML = `<img src="${url}" alt="저장할 이미지"><p class="small">저장이 안 되면 이미지를 길게 눌러 저장해 주세요</p><button class="btn block" value="close">닫기</button>`;
    document.body.appendChild(d);
    d.querySelector('button').addEventListener('click', () => d.close());
    d.addEventListener('close', () => { d.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); });
    d.showModal();
  }

  // ---------- lucky draw ----------
  function draw() {
    const c = K.load();
    if (c) return couponView(c, false);
    if (!Object.keys(done()).length) {
      return swap(`<section class="screen draw"><a class="back" href="#/">${ICON.left}테스트 목록</a>
        <p class="eyebrow" style="margin-top:24px" data-in>Lucky Draw</p><h1 class="h1" data-in>테스트를 하나 끝내면<br>할인권을 뽑을 수 있어요</h1>
        <p class="lead" data-in>1분이면 충분해요. 끝나면 바로 이 화면으로 안내해 드릴게요.</p>
        <div class="series" style="margin-top:32px">${testRows()}</div>${foot()}</section>`);
    }
    const back = `<div class="face back"><svg viewBox="0 0 300 90" aria-hidden="true">${(() => { const b = C.brow('soft-arch', 'thin', [16, 60], 1, 268, { w: 1.6, seed: 5, dens: 1.8 }); return `<path d="${b.base}" fill="#e8b4b8" fill-opacity=".12"/>` + b.hairs.map(h => `<path d="${h.d}" fill="none" stroke="#e8b4b8" stroke-width="${h.w.toFixed(2)}" stroke-linecap="round" stroke-opacity="${h.o.toFixed(2)}"/>`).join(''); })()}</svg><span class="wm">${esc(CFG.brand)}</span></div>`;
    const front = `<div class="face front"><span class="lat">Lucky Draw</span><span class="amt">10,000</span><span class="k">원 할인권 당첨</span></div>`;
    swap(`<section class="screen draw"><a class="back" href="#/">${ICON.left}테스트 목록</a>
        <p class="eyebrow" style="margin-top:16px" data-in>Lucky Draw</p>
        <h1 class="h2" style="font-size:26px;margin-top:8px" data-in>브로우원 시술 할인권 뽑기</h1>
        <div class="deck" id="deck">${[0, 1, 2].map(i => `<button class="dcard" data-i="${i}" aria-label="${i + 1}번 카드 고르기">${back}${front}</button>`).join('')}</div>
        <div class="hold" id="hold" hidden><svg viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="38" fill="none" stroke="#ead9d4" stroke-width="4"/><circle id="ring" cx="42" cy="42" r="38" fill="none" stroke="#4a3238" stroke-width="4" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/></svg>
          <button class="hold-btn" id="holdBtn" aria-label="꾹 눌러서 카드 열기">꾹</button></div>
        <p class="hint" id="hint" aria-live="polite" data-in>마음이 가는 카드 한 장을 골라주세요</p>
        <div id="couponSlot"></div>
      </section>`, () => {
      const cards = $$('.dcard', app), POS = [[-86, 16, -7], [0, 0, 0], [86, 16, 7]];
      cards.forEach((c, i) => {
        const [x, y, rot] = POS[i]; c.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
        if (!reduce) c.animate([{ transform: 'translate(0, 260px) rotate(0deg) scale(.9)', opacity: 0 }, { transform: c.style.transform, opacity: 1 }], { duration: 620, delay: 120 + i * 110, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'backwards' });
      });
      let chosen = null;
      cards.forEach(c => c.addEventListener('click', () => {
        if (chosen) return; chosen = c;
        cards.forEach(o => { if (o !== c) { o.style.opacity = '0'; o.style.transform += ' translateY(40px) scale(.9)'; o.tabIndex = -1; o.setAttribute('aria-hidden', 'true'); } });
        c.style.transform = 'translate(0, 0) rotate(0deg) scale(1.06)';
        $('#hint', app).textContent = '아래 버튼을 꾹 누르고 있으면 카드가 열려요';
        const hold = $('#hold', app); hold.hidden = false;
        if (!reduce) hold.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: 300, easing: 'ease-out', fill: 'backwards' });
        armHold(c);
      }));
    });
  }

  function armHold(card) {
    const btn = $('#holdBtn', app), ring = $('#ring', app), HOLD = reduce ? 500 : 1150;
    let anim = null, shake = null, opened = false;
    const begin = e => {
      if (opened) return; if (e && e.preventDefault) e.preventDefault();
      btn.classList.add('holding');
      const from = parseFloat(getComputedStyle(ring).strokeDashoffset) || 1;
      anim && anim.cancel();
      ring.setAttribute('stroke-dashoffset', from);
      anim = ring.animate([{ strokeDashoffset: from }, { strokeDashoffset: 0 }], { duration: HOLD * from, easing: 'linear', fill: 'forwards' });
      if (!reduce) shake = card.animate([{ transform: 'translate(0,0) scale(1.06) rotate(0)' }, { transform: 'translate(0,-2px) scale(1.08) rotate(-1deg)' }, { transform: 'translate(0,0) scale(1.08) rotate(1deg)' }, { transform: 'translate(0,0) scale(1.06) rotate(0)' }], { duration: 180, iterations: Infinity });
      anim.finished.then(open).catch(() => {});
    };
    const end = () => {
      if (opened || !anim) return;
      btn.classList.remove('holding'); shake && shake.cancel();
      const now = parseFloat(getComputedStyle(ring).strokeDashoffset); anim.cancel();
      ring.setAttribute('stroke-dashoffset', now);
      anim = ring.animate([{ strokeDashoffset: now }, { strokeDashoffset: 1 }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
      anim.finished.then(() => ring.setAttribute('stroke-dashoffset', 1)).catch(() => {});
      anim = null;
    };
    const open = async () => {
      if (opened) return; opened = true; shake && shake.cancel();
      btn.classList.remove('holding'); $('#hold', app).hidden = true;
      const c = K.make(); K.save(c);
      card.classList.add('flip');
      $('#hint', app).textContent = '축하해요! 1만원 할인권에 당첨됐어요';
      await wait(reduce ? 0 : 420);
      burst();
      await wait(reduce ? 0 : 700);
      couponView(c, true);
    };
    btn.addEventListener('pointerdown', begin);
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => btn.addEventListener(ev, end));
    btn.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) begin(e); });
    btn.addEventListener('keyup', e => { if (e.key === 'Enter' || e.key === ' ') end(); });
    btn.addEventListener('contextmenu', e => e.preventDefault());
  }

  const ymd = d => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  function couponHTML(c) {
    const cp = CFG.coupon, exp = K.expiry(c);
    return `<div class="coupon" data-in>
      <div class="c-top"><div class="lat">Lucky Draw · 당첨</div><div class="amt">10,000<small>원</small></div><div class="k">${esc(cp.title)}</div></div>
      <div class="perf"></div>
      <div class="c-body">
        <div class="code"><b>${esc(c.code)}</b><button class="btn soft" style="min-height:40px;padding:0 14px;font-size:14px" id="copyCode">복사</button></div>
        <div class="c-dates"><span>발급 ${ymd(new Date(c.issued))}</span><span>사용기한 ${ymd(exp)}까지</span></div>
        <ul class="terms">${cp.terms.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <div class="c-actions">
          <a class="btn block" href="${utm(CFG.site, 'coupon')}" target="_blank" rel="noopener">browone.com에서 예약하기</a>
          <button class="btn ghost block" id="saveCoupon">${ICON.save}쿠폰 이미지 저장</button>
        </div>
        <div class="c-links"><a class="link" href="${CFG.naver}" target="_blank" rel="noopener">네이버 예약 바로가기</a><a class="link" href="${CFG.kakao}" target="_blank" rel="noopener">카카오톡 문의</a></div>
      </div></div>
      <p class="c-note">${esc(cp.note)}</p>`;
  }
  function bindCoupon(c) {
    $('#copyCode', app).addEventListener('click', () => copy(c.code, '쿠폰 코드를 복사했어요'));
    $('#saveCoupon', app).addEventListener('click', async () => { toast('쿠폰 이미지를 만드는 중이에요'); download(await window.BrowCard.coupon(c), `browone-coupon-${c.code}.png`); });
  }
  function couponView(c, justWon) {
    if (justWon) {
      const slot = $('#couponSlot', app); slot.innerHTML = couponHTML(c) + `<div style="margin-top:32px">${'<a class="btn soft block" href="#/list">다른 테스트 하기</a>'}</div>` + foot();
      if (!reduce) slot.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
      bindCoupon(c);
      setTimeout(() => window.scrollTo({ top: slot.getBoundingClientRect().top + scrollY - 40, behavior: reduce ? 'auto' : 'smooth' }), 300);
      return;
    }
    swap(`<section class="screen draw"><a class="back" href="#/">${ICON.left}테스트 목록</a>
        <p class="eyebrow" style="margin-top:16px" data-in>My Coupon</p>
        <h1 class="h2" style="font-size:26px;margin-top:8px" data-in>받은 할인권이 있어요</h1>
        <p class="small" data-in>할인권은 한 기기에서 한 번만 뽑을 수 있어요.</p>
        ${couponHTML(c)}<div style="margin-top:32px" data-in><a class="btn soft block" href="#/list">다른 테스트 하기</a></div>${foot()}</section>`, () => bindCoupon(c));
  }

  // confetti of brow hairs — bursts once, settles, removed
  function burst() {
    if (reduce) return;
    const cv = document.createElement('canvas'); cv.className = 'burst'; document.body.appendChild(cv);
    const dpr = Math.min(2, devicePixelRatio || 1), W = innerWidth, H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; const x = cv.getContext('2d'); x.scale(dpr, dpr);
    const r = C.rng(Date.now() & 0xffff), cols = ['#4a3238', '#c9868d', '#e8b4b8', '#c9a77a', '#9a6b74'];
    const P = Array.from({ length: 110 }, () => { const a = -Math.PI / 2 + (r() - 0.5) * 2.4, v = 6 + r() * 9;
      return { x: W / 2, y: H * 0.42, vx: Math.cos(a) * v, vy: Math.sin(a) * v, rot: r() * 6.28, vr: (r() - 0.5) * 0.3, len: 8 + r() * 12, hair: r() < 0.6, c: cols[(r() * cols.length) | 0], s: 2 + r() * 3 }; });
    const t0 = performance.now();
    (function f(now) {
      const t = (now - t0) / 1000; x.clearRect(0, 0, W, H);
      P.forEach(p => { p.vy += 0.32; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        x.globalAlpha = Math.max(0, 1 - Math.max(0, t - 1.2) / 0.8); x.save(); x.translate(p.x, p.y); x.rotate(p.rot);
        if (p.hair) { x.strokeStyle = p.c; x.lineWidth = 2.2; x.lineCap = 'round'; x.beginPath(); x.moveTo(-p.len / 2, 0); x.quadraticCurveTo(0, -p.len * 0.22, p.len / 2, 0); x.stroke(); }
        else { x.fillStyle = p.c; x.beginPath(); x.arc(0, 0, p.s, 0, 6.28); x.fill(); }
        x.restore(); });
      if (t < 2) requestAnimationFrame(f); else cv.remove();
    })(t0);
  }

  // ---------- router ----------
  function route() {
    const h = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!h.length || h[0] === 'list') return home();
    if (h[0] === 't' && h[1] && h[3] === 'q') {
      if (!S.t || S.t.id !== h[1] || S.g !== h[2]) { const t = byId(h[1]); if (t && G[h[2]]) S = { t, g: h[2], qi: 0, ans: [], fresh: null }; else return intro(h[1]); }
      return quiz();
    }
    if (h[0] === 't' && h[1]) return intro(h[1]);
    if (h[0] === 'r' && h.length >= 4) return result(h[1], h[2], h[3]);
    if (h[0] === 'draw') return draw();
    home();
  }
  addEventListener('hashchange', route);
  window.BrowApp = { TESTS, byId, resOf, IMG, colorOf, CFG };
  const side = $('#sideBrow');
  if (side && matchMedia('(min-width: 960px)').matches) { side.outerHTML = browLine({ hidden: true, cls: 'brow-line side-brow', seed: 3 }); drawHairs($$('.side-brow .bl-hair'), 600, 3, 320); }
  route();
})();
