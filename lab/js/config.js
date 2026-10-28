/* BROW LAB settings — everything the salon may want to change lives here. */
window.BROW_CONFIG = {
  brand: 'BROW ONE',                       // text wordmark placeholder until the logo file arrives
  site: 'https://browone.com/',
  menu: 'https://browone.com/#menu-section',
  naver: 'https://map.naver.com/p/entry/place/2080201732?placePath=/ticket',
  kakao: 'https://open.kakao.com/o/sjIElSWh',
  insta: 'https://www.instagram.com/browone_/',
  instaHandle: '@browone_',
  info: ['분당 미금역 · 돌마로 67 지하1층 B121', '월–토 10:00–20:00 · 일·공휴일 휴무 · 100% 예약제'],
  utm: 'utm_source=browlab&utm_medium=beauty_test',
  // Coupon (operator 2026-10-28: real coupon checked at the salon, everyone wins 10,000 won;
  // terms below confirmed by the operator the same day: 30 days, one per person, no stacking).
  coupon: {
    amount: 10000,
    title: '브로우원 시술 1만원 할인권',
    validDays: 30,
    epoch: Date.UTC(2026, 0, 1),           // day 0 of the issue-date counter inside the code
    salt: 'browone·lab·2026',
    terms: [
      '예약 후 방문 시 이 쿠폰 화면이나 저장한 이미지를 보여주세요',
      '1인 1회 사용 · 다른 할인과 중복 사용 불가',
      '발급일로부터 30일 안에 사용해 주세요'
    ]
  }
};
