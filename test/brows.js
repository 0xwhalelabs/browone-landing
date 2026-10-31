/* 눈썹 디자인 목록
 *
 * 지금 들어 있는 디자인은 전부 브로우원 실제 시술 사진(홈페이지 시술 전후 ba-07·ba-08)에서 눈썹만 떼어낸 거예요.
 * 결 하나하나가 실제 시술 그대로이고, 일자·도톰·남성 같은 변형은 같은 눈썹의 모양만 휘거나 두껍게 한 거예요.
 * 다시 만들려면 tools/extract_real.py → tools/make_designs.py (README 참고).
 *
 * 디자인을 더 넣으려면
 *   1) 배경이 투명한 PNG를 brows/ 폴더에 넣고
 *   2) 아래 목록에 { name: '이름', cat: '자연눈썹', tag: '설명', src: 'brows/파일이름.png' } 를 추가하세요.
 *      cat 은 위쪽 분류 탭(자연눈썹 · 콤보 · 섀도우 · 남성)이고, tag 는 이름 아래 작은 글씨예요(없으면 cat).
 *
 * 이미지 방향: 한쪽 눈썹만 있는 이미지는 "사진에서 왼쪽에 보이는 눈썹"(앞머리가 오른쪽, 꼬리가 왼쪽) 기준이에요.
 *   반대로 된 이미지면 flip: true 를 붙여주세요. 양쪽 눈썹이 같이 있는 이미지는 왼쪽 눈썹만 잘라서 써요.
 *   흰 배경 이미지도 배경을 자동으로 빼서 쓰지만, 투명 PNG가 가장 깔끔해요.
 */
window.BROW_DESIGNS = [
  // 자연눈썹: 한 올씩 결만 (ba-07 · ba-08 자연눈썹)
  { name: '자연눈썹 아치', cat: '자연눈썹', tag: '실제 시술 그대로', src: 'brows/nat-arch.png' },
  { name: '자연눈썹 세미 아치', cat: '자연눈썹', tag: '실제 결 · 모양 변형', src: 'brows/nat-semi.png' },
  { name: '자연눈썹 일자', cat: '자연눈썹', tag: '실제 결 · 모양 변형', src: 'brows/nat-straight.png' },
  { name: '자연눈썹 도톰 일자', cat: '자연눈썹', tag: '실제 결 · 모양 변형', src: 'brows/nat-thick.png' },
  { name: '자연눈썹 슬림 아치', cat: '자연눈썹', tag: '실제 결 · 모양 변형', src: 'brows/nat-slim.png' },
  { name: '자연눈썹 라운드', cat: '자연눈썹', tag: '실제 시술 그대로', src: 'brows/nat-round.png' },
  { name: '자연눈썹 소프트 일자', cat: '자연눈썹', tag: '실제 결 · 모양 변형', src: 'brows/nat-soft.png' },
  { name: '자연눈썹 도톰 라운드', cat: '자연눈썹', tag: '실제 결 · 모양 변형', src: 'brows/nat-round-thick.png' },

  // 콤보: 결 + 은은한 음영 (ba-08 콤보눈썹)
  { name: '콤보 아치', cat: '콤보', tag: '실제 시술 그대로', src: 'brows/combo-arch.png' },
  { name: '콤보 세미 아치', cat: '콤보', tag: '실제 결 · 모양 변형', src: 'brows/combo-semi.png' },
  { name: '콤보 일자', cat: '콤보', tag: '실제 결 · 모양 변형', src: 'brows/combo-straight.png' },
  { name: '콤보 도톰 일자', cat: '콤보', tag: '실제 결 · 모양 변형', src: 'brows/combo-thick.png' },
  { name: '콤보 업꼬리', cat: '콤보', tag: '실제 결 · 모양 변형', src: 'brows/combo-up.png' },

  // 섀도우: 결 + 채운 음영 (ba-07 섀도우 눈썹)
  { name: '섀도우 소프트 아치', cat: '섀도우', tag: '실제 시술 그대로', src: 'brows/shadow-soft.png' },
  { name: '섀도우 일자', cat: '섀도우', tag: '실제 결 · 모양 변형', src: 'brows/shadow-straight.png' },
  { name: '섀도우 아치', cat: '섀도우', tag: '실제 결 · 모양 변형', src: 'brows/shadow-arch.png' },
  { name: '섀도우 도톰', cat: '섀도우', tag: '실제 결 · 모양 변형', src: 'brows/shadow-thick.png' },
  { name: '섀도우 슬림', cat: '섀도우', tag: '실제 결 · 모양 변형', src: 'brows/shadow-slim.png' },

  // 남성: 위 디자인을 두껍고 일자로 편 것
  { name: '남자 자연 일자', cat: '남성', tag: '남성 · 실제 결', src: 'brows/men-natural.png' },
  { name: '남자 콤보 일자', cat: '남성', tag: '남성 · 실제 결', src: 'brows/men-combo.png' },
  { name: '남자 섀도우', cat: '남성', tag: '남성 · 실제 결', src: 'brows/men-shadow.png' },
  { name: '남자 상승 눈썹', cat: '남성', tag: '남성 · 실제 결', src: 'brows/men-up.png' },
  { name: '남자 각진 눈썹', cat: '남성', tag: '남성 · 실제 결', src: 'brows/men-angle.png' },
];
