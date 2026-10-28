/* Coupon codes: BW-XXXX-XXXX = 2 chars issue day + 4 random + 2 check (base32, no 0/1/I/O).
   No server: the salon checks the code and issue date with verify.html; one per device here,
   one per person at the salon. */
(function () {
  const A = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const C = () => window.BROW_CONFIG.coupon;
  const KEY = 'browlab.coupon.v1';
  function h(str) { let x = 2166136261; for (let i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
  const check = body => { const v = h(C().salt + body) % 1024; return A[v >> 5] + A[v & 31]; };
  // issue day counted in Korean time (UTC+9) so the code, the coupon screen and verify.html agree
  const KST = 9 * 3600000, dayOf = ms => Math.floor((ms + KST - C().epoch) / 86400000);

  function make(now) {
    now = now || Date.now();
    const d = Math.max(0, Math.min(1023, dayOf(now)));
    const rnd = new Uint32Array(4); (window.crypto || window.msCrypto).getRandomValues(rnd);
    const body = A[d >> 5] + A[d & 31] + Array.from(rnd, n => A[n % 32]).join('');
    const raw = body + check(body);
    return { code: 'BW-' + raw.slice(0, 4) + '-' + raw.slice(4), issued: now };
  }

  /* → { ok, reason, issued: Date, expires: Date, expired } */
  function verify(input) {
    const raw = String(input || '').toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/^BW/, '');
    if (raw.length !== 8 || [...raw].some(ch => A.indexOf(ch) < 0)) return { ok: false, reason: '형식이 맞지 않아요 (BW-XXXX-XXXX)' };
    const body = raw.slice(0, 6);
    if (check(body) !== raw.slice(6)) return { ok: false, reason: '브로우원 쿠폰 코드가 아니에요' };
    const d = A.indexOf(body[0]) * 32 + A.indexOf(body[1]);
    const issued = new Date(C().epoch + d * 86400000);
    const expires = new Date(issued.getTime() + C().validDays * 86400000);
    return { ok: true, issued, expires, expired: Date.now() > expires.getTime() + 86400000 };
  }

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* private mode: coupon still shown */ } }
  function expiry(c) { const v = verify(c.code); return v.ok ? v.expires : new Date(c.issued + C().validDays * 86400000); }

  window.BrowCoupon = { make, verify, load, save, expiry };
})();
