window.TESTS = [

  /* =====================================================================
     VOL.01  나에게 찰떡인 눈썹 유형은?
     ===================================================================== */
  {
    id: 'brow',
    vol: '01',
    title: '나에게 찰떡인 눈썹 유형은?',
    hook: '성격 따라 어울리는 눈썹이 달라요',
    intro: '평소 일상 습관만 골라도 내 성격에 꼭 맞는 눈썹 모양이 보여요. 가볍게 시작해 볼까요?',
    color: 'rose',
    q: {
      f: [
        { q: '주말 아침, 눈 뜨자마자 나는?', a: [
          { t: '분위기 좋은 카페 찾아 나갈 준비', s: { softarch: 2, higharch: 1 } },
          { t: '단톡방 확인하고 바로 약속 잡기', s: { straight: 2, round: 1 } },
          { t: '이불 속에서 느긋한 힐링 타임', s: { round: 2, softarch: 1 } },
          { t: '가볍게 산책이나 운동하러 나가요', s: { natural: 2, straight: 1 } }
        ] },
        { q: '처음 만난 사람들이 말하는 내 첫인상은?', a: [
          { t: '차분하고 우아해 보여요', s: { softarch: 2 } },
          { t: '어려 보이고 밝아 보여요', s: { straight: 2, round: 1 } },
          { t: '도도해 보이는데 말해보면 반전', s: { higharch: 2 } },
          { t: '꾸밈없이 편안해 보여요', s: { natural: 2, round: 1 } }
        ] },
        { q: '앞머리에 대한 나의 생각은?', a: [
          { t: '앞머리는 내 정체성이에요', s: { straight: 2, round: 1 } },
          { t: '이마를 시원하게 넘기는 게 좋아요', s: { higharch: 2, softarch: 1 } },
          { t: '옆으로 흘린 시스루가 좋아요', s: { softarch: 2, round: 1 } },
          { t: '자라는 대로 자연스럽게 둬요', s: { natural: 2 } }
        ] },
        { q: '친구들과 사진 찍을 때 나는?', a: [
          { t: '내 얼굴 각도는 내가 잘 알아요', s: { higharch: 2, softarch: 1 } },
          { t: '다양한 포즈로 즐겁게 찍어요', s: { straight: 2 } },
          { t: '웃다가 찍힌 자연스러운 컷이 좋아요', s: { natural: 2, round: 1 } },
          { t: '찍어주는 쪽이 더 편하고 좋아요', s: { round: 2 } }
        ] },
        { q: '쇼핑할 때 나의 스타일은?', a: [
          { t: '기본템도 고급스러운 걸로 골라요', s: { softarch: 2 } },
          { t: '눈에 띄는 트렌드템부터 담아요', s: { higharch: 2, straight: 1 } },
          { t: '귀여운 소품에 자꾸 눈이 가요', s: { straight: 2, round: 1 } },
          { t: '편하고 오래 입는 게 최고예요', s: { natural: 2, round: 1 } }
        ] },
        { q: '평소 메이크업 습관과 가까운 건?', a: [
          { t: '눈썹이랑 립만 하면 준비 끝', s: { natural: 2, straight: 1 } },
          { t: '아이라인 꼬리는 꼭 위로', s: { higharch: 2 } },
          { t: '은은한 음영으로 결만 정돈해요', s: { softarch: 2, natural: 1 } },
          { t: '핑크 블러셔로 생기 한 스푼', s: { round: 2, straight: 1 } }
        ] },
        { q: '친구들이 나를 표현하는 말에 가까운 건?', a: [
          { t: '분위기 있는 사람', s: { softarch: 2 } },
          { t: '늘 어려 보이는 사람', s: { straight: 2 } },
          { t: '멋있고 당당한 사람', s: { higharch: 2, natural: 1 } },
          { t: '함께 있으면 편한 사람', s: { round: 2, natural: 1 } }
        ] }
      ],
      m: [
        { q: '주말에 나는 주로?', a: [
          { t: '헬스장이나 운동장에서 땀 흘려요', s: { angled: 2, deepstraight: 1 } },
          { t: '친구들과 맛집을 찾아다녀요', s: { warm: 2, upward: 1 } },
          { t: '혼자 전시회나 카페에 가요', s: { natural: 2, upward: 1 } },
          { t: '밀린 일을 정리하고 계획을 세워요', s: { deepstraight: 2 } }
        ] },
        { q: '소개팅에서 듣고 싶은 첫인상은?', a: [
          { t: '듬직하고 믿음직스러워 보여요', s: { deepstraight: 2 } },
          { t: '눈빛이 강렬하고 남자다워요', s: { angled: 2 } },
          { t: '웃는 모습이 다정해 보여요', s: { warm: 2 } },
          { t: '편안하고 분위기 있어 보여요', s: { natural: 2, upward: 1 } }
        ] },
        { q: '아침에 면도할 때 나는?', a: [
          { t: '매일 아침 빠짐없이 깔끔하게', s: { deepstraight: 2, upward: 1 } },
          { t: '수염 라인까지 각을 잡아 다듬어요', s: { angled: 2, upward: 1 } },
          { t: '살짝 남긴 수염도 스타일이에요', s: { natural: 2 } },
          { t: '미루다가 나가기 직전에 급하게', s: { warm: 2, natural: 1 } }
        ] },
        { q: '사진 찍을 때 나는?', a: [
          { t: '무표정이 제일 멋있게 나와요', s: { angled: 2, deepstraight: 1 } },
          { t: '자연스럽게 웃는 게 편해요', s: { warm: 2 } },
          { t: '나에게 맞는 각도를 알고 있어요', s: { upward: 2 } },
          { t: '찍히는 것보다 찍어주는 게 좋아요', s: { natural: 2, warm: 1 } }
        ] },
        { q: '친구들 사이에서 내 역할은?', a: [
          { t: '말없이 다 챙기는 든든한 맏형', s: { deepstraight: 2, warm: 1 } },
          { t: '분위기를 띄우는 무드 메이커', s: { upward: 2, warm: 1 } },
          { t: '고민을 들어주는 상담 담당', s: { warm: 2, natural: 1 } },
          { t: '승부욕 넘치는 게임 에이스', s: { angled: 2 } }
        ] },
        { q: '옷을 고를 때 나의 스타일은?', a: [
          { t: '셔츠와 슬랙스 같은 단정한 기본템', s: { deepstraight: 2 } },
          { t: '블랙 위주의 시크한 룩', s: { angled: 2, upward: 1 } },
          { t: '유행하는 핏은 바로 입어봐요', s: { upward: 2 } },
          { t: '편한 니트와 후드티가 좋아요', s: { natural: 2, warm: 1 } }
        ] },
        { q: '평소 그루밍 습관과 가까운 건?', a: [
          { t: '스킨과 로션이면 충분해요', s: { natural: 2, deepstraight: 1 } },
          { t: '눈썹 정리는 꼭 신경 써요', s: { angled: 2, upward: 1 } },
          { t: '헤어 스타일링은 빼놓지 않아요', s: { upward: 2 } },
          { t: '선크림 정도만 챙겨 발라요', s: { warm: 2 } }
        ] }
      ]
    },
    results: {
      f: [
        {
          id: 'softarch',
          name: '우아한 소프트 아치',
          en: 'Soft Arch',
          tagline: '말보다 분위기가 먼저 닿는 사람',
          tags: ['#우아함', '#분위기', '#차분한매력'],
          desc: '말투와 행동에 여유가 배어 있는 사람이에요. 크게 꾸미지 않아도 은은한 분위기가 먼저 전해져요. 부드럽게 흐르는 아치가 그 우아함을 완성해 줘요.',
          points: ['눈썹 산은 눈동자 바깥쪽 위에', '앞머리는 연하게, 꼬리는 또렷하게', '머리색보다 한 톤 밝은 브라운'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영을 함께 넣어 부드러운 아치를 또렷하게 잡아요' },
          match: 'natural',
          clash: 'higharch',
          char: { brow: 'soft-arch', thick: 'mid', eyes: 'smile', mouth: 'small', hair: 'wave', ears: 'none', acc: 'none', prop: 'petal', color: 'rose' }
        },
        {
          id: 'straight',
          name: '맑은 동안 일자',
          en: 'Youthful Straight',
          tagline: '시간이 비켜 가는 맑은 인상',
          tags: ['#동안', '#맑은인상', '#밝은에너지'],
          desc: '밝고 친근해서 처음 만난 사람도 금방 마음을 여는 타입이에요. 웃을 때 번지는 생기가 가장 큰 매력이에요. 일자 눈썹이 맑고 어려 보이는 인상을 살려줘요.',
          points: ['꼬리를 내리지 말고 수평 유지', '앞머리 쪽은 결을 위로 빗기', '길이는 눈꼬리 끝까지만'],
          service: { name: '눈썹 컨설팅 · 정리', why: '얼굴형에 맞춘 일자의 길이와 두께를 1:1로 찾아요' },
          match: 'round',
          clash: 'softarch',
          char: { brow: 'straight', thick: 'mid', eyes: 'round', mouth: 'open', hair: 'bob', ears: 'none', acc: 'clip', prop: 'heart', color: 'peach' }
        },
        {
          id: 'higharch',
          name: '시크한 하이 아치',
          en: 'Chic High Arch',
          tagline: '선 하나로 완성되는 단단한 우아함',
          tags: ['#시크함', '#도시적', '#반전매력'],
          desc: '첫인상은 도도하지만 알고 보면 누구보다 의리 있는 사람이에요. 유행을 먼저 읽고 자신만의 스타일이 분명해요. 각을 살린 하이 아치가 카리스마를 더해줘요.',
          points: ['눈썹 산은 또렷하게 각 살리기', '꼬리는 아이라인과 같은 방향', '애쉬 브라운으로 시크하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '메이크업한 듯 선명한 음영으로 시크한 라인을 완성해요' },
          match: 'round',
          clash: 'straight',
          char: { brow: 'high-arch', thick: 'bold', eyes: 'sharp', mouth: 'smirk', hair: 'bun', ears: 'none', acc: 'none', prop: 'moon', color: 'lilac' }
        },
        {
          id: 'round',
          name: '다정한 라운드',
          en: 'Sweet Round',
          tagline: '곁에 있으면 마음이 편안해지는 사람',
          tags: ['#다정함', '#공감능력', '#포근함'],
          desc: '누구의 이야기든 따뜻하게 들어주는 다정한 사람이에요. 함께 있으면 마음이 놓인다는 말을 자주 들어요. 둥글게 흐르는 눈썹이 포근한 인상을 더해줘요.',
          points: ['산 없이 둥글게 이어지는 라인', '앞머리는 흐리게 그라데이션', '웜 브라운으로 포근하게'],
          service: { name: '페더링 눈썹', why: '여린 결을 한 올씩 그려 순하고 포근한 인상을 살려요' },
          match: 'straight',
          clash: 'natural',
          char: { brow: 'round', thick: 'thin', eyes: 'droopy', mouth: 'smile', hair: 'long', ears: 'none', acc: 'ribbon', prop: 'sparkle', color: 'butter' }
        },
        {
          id: 'natural',
          name: '결 살린 내추럴',
          en: 'Natural Feather',
          tagline: '꾸미지 않아서 더 아름다운 사람',
          tags: ['#내추럴', '#자연스러움', '#나다움'],
          desc: '틀에 얽매이지 않고 자기 속도로 살아가는 사람이에요. 힘을 뺀 스타일이 오히려 더 세련돼 보여요. 결이 살아 있는 눈썹이 자연스러운 매력을 완성해요.',
          points: ['결은 위로 빗어 자연스럽게', '투명 브로우 젤로 결 고정', '빈 곳만 펜슬로 살짝 채우기'],
          service: { name: '눈썹 컨설팅 · 정리', why: '타고난 결은 그대로 두고 모양만 깔끔하게 다듬어요' },
          match: 'softarch',
          clash: 'higharch',
          char: { brow: 'up', thick: 'bold', eyes: 'smile', mouth: 'open', hair: 'long', ears: 'none', acc: 'headband', prop: 'leaf', color: 'sage' }
        }
      ],
      m: [
        {
          id: 'deepstraight',
          name: '짙은 직선 눈썹',
          en: 'Deep Straight',
          tagline: '말하지 않아도 믿음이 가는 사람',
          tags: ['#듬직함', '#신뢰감', '#진중함'],
          desc: '말보다 행동으로 보여주는 묵직한 사람이에요. 처음엔 무뚝뚝해 보여도 알수록 든든해요. 짙고 반듯한 눈썹이 신뢰감 있는 첫인상을 만들어요.',
          points: ['꼬리를 내리지 않고 일자 유지', '앞머리는 각 없이 자연스럽게', '아래쪽 잔털만 정리해 선명하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '빈 곳을 음영으로 채워 짙고 반듯한 라인을 만들어요' },
          match: 'warm',
          clash: 'upward',
          char: { brow: 'straight', thick: 'bold', eyes: 'round', mouth: 'small', hair: 'short', ears: 'none', acc: 'none', prop: 'coffee', color: 'cocoa' }
        },
        {
          id: 'angled',
          name: '각진 카리스마 눈썹',
          en: 'Sharp Angle',
          tagline: '눈빛 하나로 공기가 달라지는 사람',
          tags: ['#카리스마', '#열정', '#존재감'],
          desc: '목표가 생기면 끝까지 밀고 나가는 열정적인 사람이에요. 강렬한 첫인상 뒤에 의외로 섬세한 면이 있어요. 각이 살아 있는 눈썹이 또렷한 존재감을 더해요.',
          points: ['눈썹 산에 각을 살짝 살리기', '꼬리는 짧고 깔끔하게 마무리', '그레이 브라운으로 선명하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영을 함께 넣어 각진 라인을 또렷하게 잡아요' },
          match: 'natural',
          clash: 'warm',
          char: { brow: 'angled', thick: 'bold', eyes: 'sharp', mouth: 'smirk', hair: 'buzz', ears: 'none', acc: 'none', prop: 'star', color: 'sky' }
        },
        {
          id: 'natural',
          name: '자연스러운 결 눈썹',
          en: 'Natural Grain',
          tagline: '힘을 뺐는데 더 멋있는 사람',
          tags: ['#내추럴', '#감성', '#편안함'],
          desc: '정해진 틀보다 자신의 감각을 믿는 자유로운 사람이에요. 편하게 입어도 묘하게 분위기가 있어요. 결이 살아 있는 눈썹이 편안한 매력을 살려줘요.',
          points: ['결 방향대로 브러시로 빗기', '삐져나온 털만 가볍게 정리', '숱이 빈 곳은 결 따라 채우기'],
          service: { name: '페더링 눈썹', why: '결을 한 올씩 더해 손대지 않은 듯 자연스러워요' },
          match: 'upward',
          clash: 'deepstraight',
          char: { brow: 'soft-arch', thick: 'mid', eyes: 'smile', mouth: 'smile', hair: 'perm', ears: 'none', acc: 'glasses', prop: 'leaf', color: 'sage' }
        },
        {
          id: 'warm',
          name: '훈훈한 소프트 라인',
          en: 'Soft Warm Line',
          tagline: '웃는 얼굴이 가장 멋있는 사람',
          tags: ['#훈훈함', '#다정함', '#호감형'],
          desc: '누구에게나 편하게 다가가는 다정한 사람이에요. 함께 있으면 분위기가 부드러워진다는 말을 자주 들어요. 둥글게 흐르는 눈썹이 호감 가는 인상을 완성해요.',
          points: ['산을 만들지 말고 둥글게', '앞머리는 연하게 흐리기', '웜 브라운으로 부드럽게'],
          service: { name: '눈썹 컨설팅 · 정리', why: '얼굴형에 맞춰 부드러운 라인을 1:1로 함께 찾아요' },
          match: 'deepstraight',
          clash: 'angled',
          char: { brow: 'round', thick: 'mid', eyes: 'smile', mouth: 'open', hair: 'short', ears: 'none', acc: 'none', prop: 'heart', color: 'butter' }
        },
        {
          id: 'upward',
          name: '날렵한 업 라인',
          en: 'Rising Line',
          tagline: '감각이 한발 앞서 있는 사람',
          tags: ['#센스', '#트렌드', '#세련됨'],
          desc: '새로운 것을 먼저 시도하는 감각적인 사람이에요. 어디서든 분위기를 환하게 만드는 에너지가 있어요. 꼬리가 살짝 올라간 눈썹이 세련된 인상을 줘요.',
          points: ['꼬리 끝을 살짝 위로 빼기', '눈썹 아래 라인은 깔끔하게', '앞머리는 결을 세워 입체감'],
          service: { name: '눈썹 컨설팅 · 정리', why: '올라간 꼬리 라인을 살려 날렵한 모양으로 다듬어요' },
          match: 'angled',
          clash: 'deepstraight',
          char: { brow: 'up', thick: 'mid', eyes: 'cat', mouth: 'smirk', hair: 'comma', ears: 'none', acc: 'none', prop: 'note', color: 'lilac' }
        }
      ]
    }
  },

  /* =====================================================================
     VOL.02  MBTI로 보는 내 눈썹 성격 도감
     12 questions per gender, 3 per axis: q1-3 E/I, q4-6 S/N, q7-9 T/F, q10-12 J/P
     ===================================================================== */
  {
    id: 'mbti',
    type: 'mbti',
    vol: '02',
    title: 'MBTI로 보는 내 눈썹 성격 도감',
    hook: '내 MBTI가 눈썹이 된다면?',
    intro: '일상 속 선택 몇 가지로 나의 MBTI 눈썹 캐릭터를 찾아드려요. 친구 결과와 궁합도 비교해 보세요.',
    color: 'lilac',
    q: {
      f: [
        { q: '친구가 메이크업 원데이 클래스에 가자고 하면?', a: [
          { t: '새로운 사람들 만날 생각에 설레요', s: { E: 1 } },
          { t: '영상 보며 집에서 따라 해볼래요', s: { I: 1 } }
        ] },
        { q: '샵에서 시술받는 동안 나는?', a: [
          { t: '원장님과 이야기 나누다 보면 끝나요', s: { E: 1 } },
          { t: '눈 감고 조용히 쉬는 시간이 좋아요', s: { I: 1 } }
        ] },
        { q: '기분 전환이 필요한 주말에는?', a: [
          { t: '친구들과 만나 수다로 충전해요', s: { E: 1 } },
          { t: '혼자 산책하며 생각을 정리해요', s: { I: 1 } }
        ] },
        { q: '새 화장품을 고를 때 더 끌리는 건?', a: [
          { t: '성분과 사용감을 꼼꼼히 확인해요', s: { S: 1 } },
          { t: '브랜드 무드와 감성에 끌려요', s: { N: 1 } }
        ] },
        { q: '거울 앞에서 드는 생각은?', a: [
          { t: '오늘 눈썹 좌우가 잘 맞았네', s: { S: 1 } },
          { t: '이 얼굴엔 어떤 분위기가 어울릴까', s: { N: 1 } }
        ] },
        { q: '메이크업 영상을 볼 때 나는?', a: [
          { t: '순서와 제품 이름을 메모해요', s: { S: 1 } },
          { t: '분위기만 보고 내 식대로 응용해요', s: { N: 1 } }
        ] },
        { q: '친구가 새 눈썹 어떠냐고 물어보면?', a: [
          { t: '어울리는 점과 아쉬운 점을 솔직하게', s: { T: 1 } },
          { t: '예쁘다는 마음부터 먼저 전해요', s: { F: 1 } }
        ] },
        { q: '눈썹 샵을 고를 때 더 중요한 건?', a: [
          { t: '디자인 상담이 체계적인 곳', s: { T: 1 } },
          { t: '편안하고 따뜻하게 맞아주는 곳', s: { F: 1 } }
        ] },
        { q: '친구에게 화장품을 선물할 때는?', a: [
          { t: '피부 타입에 맞는 실용적인 것', s: { T: 1 } },
          { t: '받는 순간 기분 좋아질 예쁜 것', s: { F: 1 } }
        ] },
        { q: '샵 예약은 어떻게 하는 편이에요?', a: [
          { t: '날짜와 시간을 미리 정해 예약해요', s: { J: 1 } },
          { t: '마음이 생겼을 때 빈 시간을 찾아요', s: { P: 1 } }
        ] },
        { q: '여행 갈 때 화장품 파우치는?', a: [
          { t: '리스트를 보며 필요한 것만 챙겨요', s: { J: 1 } },
          { t: '출발 직전에 손에 잡히는 대로', s: { P: 1 } }
        ] },
        { q: '중요한 약속 전날 밤에 나는?', a: [
          { t: '옷과 메이크업까지 미리 정해둬요', s: { J: 1 } },
          { t: '당일 아침 기분 따라 골라요', s: { P: 1 } }
        ] }
      ],
      m: [
        { q: '친구가 같이 바버샵에 가자고 하면?', a: [
          { t: '좋아요, 같이 가면 더 즐거워요', s: { E: 1 } },
          { t: '혼자 다니는 게 더 편해요', s: { I: 1 } }
        ] },
        { q: '모임에 처음 보는 사람이 많을 때는?', a: [
          { t: '먼저 말을 건네며 금방 친해져요', s: { E: 1 } },
          { t: '아는 사람 곁에서 천천히 적응해요', s: { I: 1 } }
        ] },
        { q: '주말에 에너지를 채우는 방법은?', a: [
          { t: '친구들과 운동하거나 밖에서 놀아요', s: { E: 1 } },
          { t: '집에서 좋아하는 걸 하며 쉬어요', s: { I: 1 } }
        ] },
        { q: '새 스킨케어를 살 때 나는?', a: [
          { t: '써본 제품을 다시 사는 편이에요', s: { S: 1 } },
          { t: '새로운 콘셉트의 제품에 끌려요', s: { N: 1 } }
        ] },
        { q: '거울 속 내 눈썹을 보면?', a: [
          { t: '삐져나온 털부터 눈에 들어와요', s: { S: 1 } },
          { t: '모양이 바뀌면 인상이 어떨지 상상해요', s: { N: 1 } }
        ] },
        { q: '헤어스타일을 바꿀 때 나는?', a: [
          { t: '늘 하던 스타일에서 조금만 바꿔요', s: { S: 1 } },
          { t: '전혀 다른 분위기에 도전해 봐요', s: { N: 1 } }
        ] },
        { q: '친구가 머리 어떠냐고 물어보면?', a: [
          { t: '옆머리가 조금 떴다고 바로 말해요', s: { T: 1 } },
          { t: '잘 어울린다고 먼저 말해줘요', s: { F: 1 } }
        ] },
        { q: '그루밍 제품을 고를 때 기준은?', a: [
          { t: '기능과 효율을 비교해서 골라요', s: { T: 1 } },
          { t: '믿는 사람이 추천한 걸 써봐요', s: { F: 1 } }
        ] },
        { q: '친구가 소개팅이 아쉬웠다고 하면?', a: [
          { t: '어떤 점이 아쉬웠는지 같이 짚어봐요', s: { T: 1 } },
          { t: '맛있는 걸 먹으며 먼저 위로해요', s: { F: 1 } }
        ] },
        { q: '머리 자를 타이밍은?', a: [
          { t: '주기를 정해두고 미리 예약해요', s: { J: 1 } },
          { t: '거울 보다 길다 싶을 때 가요', s: { P: 1 } }
        ] },
        { q: '여행 짐을 쌀 때 나는?', a: [
          { t: '전날 리스트대로 꼼꼼히 챙겨요', s: { J: 1 } },
          { t: '출발 당일 아침에 빠르게 챙겨요', s: { P: 1 } }
        ] },
        { q: '중요한 약속 전날 밤에 나는?', a: [
          { t: '옷과 헤어스타일까지 미리 정해둬요', s: { J: 1 } },
          { t: '당일 기분에 맞춰 정해요', s: { P: 1 } }
        ] }
      ]
    },
    results: {
      ISTJ: {
        name: '반듯한 정석 일자',
        en: 'Steady Straight',
        tagline: '한결같아서 더 믿음이 가는 사람',
        tags: ['#한결같음', '#성실함', '#신뢰감'],
        desc: '정해진 루틴을 꾸준히 지키는 성실한 사람이에요. 유행보다 나에게 맞는 것을 오래 아끼는 편이에요. 흐트러짐 없는 일자 눈썹처럼 언제나 반듯해요.',
        match: 'ESTP',
        clash: 'ENFP',
        f: {
          points: ['좌우 대칭을 맞추는 게 핵심', '꼬리는 내리지 말고 수평으로', '앞머리는 연하게 시작하기'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영으로 매일 아침 반듯한 눈썹을 만나요' },
          char: { brow: 'straight', thick: 'mid', eyes: 'round', mouth: 'small', hair: 'bun', ears: 'none', acc: 'glasses', prop: 'coffee', color: 'cocoa' }
        },
        m: {
          points: ['일자 라인을 반듯하게 유지', '아래쪽 잔털만 깔끔하게 정리', '그레이 브라운으로 단정하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '음영으로 빈 곳을 채워 단정한 일자 라인을 만들어요' },
          char: { brow: 'straight', thick: 'mid', eyes: 'round', mouth: 'small', hair: 'short', ears: 'none', acc: 'glasses', prop: 'coffee', color: 'cocoa' }
        }
      },
      ISFJ: {
        name: '포근한 라운드',
        en: 'Gentle Round',
        tagline: '말없이 곁을 챙겨주는 다정함',
        tags: ['#배려', '#다정함', '#세심함'],
        desc: '주변 사람들을 조용히 챙기는 따뜻한 사람이에요. 작은 것까지 기억해 주는 세심함이 큰 매력이에요. 둥글고 포근한 눈썹이 다정한 마음을 닮았어요.',
        match: 'ESFP',
        clash: 'ENTP',
        f: {
          points: ['산 없이 둥근 곡선으로', '웜 브라운으로 포근하게', '앞머리는 흐리게 그라데이션'],
          service: { name: '페더링 눈썹', why: '여린 결을 한 올씩 그려 포근한 인상을 살려요' },
          char: { brow: 'round', thick: 'mid', eyes: 'smile', mouth: 'smile', hair: 'long', ears: 'none', acc: 'ribbon', prop: 'heart', color: 'peach' }
        },
        m: {
          points: ['둥근 라인으로 부드러운 인상', '잔털만 정리해 깔끔하게', '내추럴 브라운으로 편안하게'],
          service: { name: '눈썹 컨설팅 · 정리', why: '원래 결은 살리고 부드러운 모양으로 다듬어요' },
          char: { brow: 'round', thick: 'mid', eyes: 'smile', mouth: 'smile', hair: 'perm', ears: 'none', acc: 'none', prop: 'heart', color: 'peach' }
        }
      },
      INFJ: {
        name: '달빛 같은 아치',
        en: 'Moonlit Arch',
        tagline: '조용하지만 깊이가 다른 사람',
        tags: ['#통찰력', '#신비로움', '#깊은눈빛'],
        desc: '말수는 적어도 사람의 마음을 깊이 읽어내는 사람이에요. 진솔한 대화를 좋아하고 나만의 세계가 뚜렷해요. 은은한 아치 눈썹이 신비로운 분위기를 더해요.',
        match: 'ENFP',
        clash: 'ESTP',
        f: {
          points: ['완만한 아치로 은은하게', '꼬리는 가늘고 길게 빼기', '애쉬 브라운으로 차분하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '은은한 음영으로 신비로운 아치 라인을 완성해요' },
          char: { brow: 'soft-arch', thick: 'thin', eyes: 'droopy', mouth: 'small', hair: 'wave', ears: 'none', acc: 'none', prop: 'moon', color: 'lilac' }
        },
        m: {
          points: ['부드러운 아치로 깊은 눈매', '눈썹과 눈 사이는 넉넉하게', '결 방향대로 차분하게 빗기'],
          service: { name: '페더링 눈썹', why: '결을 살린 부드러운 라인이 깊은 눈빛을 살려요' },
          char: { brow: 'soft-arch', thick: 'mid', eyes: 'droopy', mouth: 'small', hair: 'comma', ears: 'none', acc: 'none', prop: 'moon', color: 'lilac' }
        }
      },
      INTJ: {
        name: '정교한 앵글',
        en: 'Precise Angle',
        tagline: '머릿속엔 이미 완성된 설계도',
        tags: ['#전략가', '#완벽주의', '#냉철함'],
        desc: '머릿속에 이미 큰 그림을 그려두는 전략가예요. 효율과 완성도를 함께 챙기는 꼼꼼함이 있어요. 각이 정확한 눈썹처럼 생각도 선명해요.',
        match: 'ENTP',
        clash: 'ESFP',
        f: {
          points: ['눈썹 산의 각도를 정확하게', '꼬리는 짧고 깔끔하게', '앞머리는 각지지 않게 연하게'],
          service: { name: '눈썹 컨설팅 · 정리', why: '얼굴형을 살펴 나에게 맞는 각도를 함께 설계해요' },
          char: { brow: 'angled', thick: 'mid', eyes: 'sharp', mouth: 'smirk', hair: 'bob', ears: 'none', acc: 'glasses', prop: 'star', color: 'sky' }
        },
        m: {
          points: ['산의 각을 살려 선명하게', '아래 라인은 곧게 정리', '다크 그레이로 단단하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영으로 각진 라인을 정확하게 잡아줘요' },
          char: { brow: 'angled', thick: 'mid', eyes: 'sharp', mouth: 'smirk', hair: 'short', ears: 'none', acc: 'glasses', prop: 'star', color: 'sky' }
        }
      },
      ISTP: {
        name: '담백한 미니멀 일자',
        en: 'Clean Minimal',
        tagline: '필요한 것만 남긴 담백함',
        tags: ['#담백함', '#실용주의', '#쿨함'],
        desc: '말보다 손이 먼저 움직이는 실전형이에요. 군더더기 없는 것을 좋아하고 혼자서도 척척 해내요. 깔끔하게 떨어지는 일자 눈썹이 쿨한 매력을 닮았어요.',
        match: 'ESTJ',
        clash: 'ENFJ',
        f: {
          points: ['얇은 일자로 깔끔하게', '펜슬 대신 젤로만 정돈', '음영은 최소한으로'],
          service: { name: '눈썹 컨설팅 · 정리', why: '꼭 필요한 만큼만 다듬어 깔끔한 일자를 살려요' },
          char: { brow: 'straight', thick: 'thin', eyes: 'cat', mouth: 'small', hair: 'long', ears: 'none', acc: 'none', prop: 'leaf', color: 'sage' }
        },
        m: {
          points: ['삐져나온 털만 빠르게 정리', '일자 라인 그대로 유지', '브러시로 결만 빗어주기'],
          service: { name: '눈썹 컨설팅 · 정리', why: '손이 많이 가지 않게 깔끔한 모양을 잡아줘요' },
          char: { brow: 'straight', thick: 'thin', eyes: 'cat', mouth: 'small', hair: 'buzz', ears: 'none', acc: 'none', prop: 'leaf', color: 'sage' }
        }
      },
      ISFP: {
        name: '수채화 같은 결',
        en: 'Watercolor Brow',
        tagline: '나만의 감성으로 그리는 결',
        tags: ['#감성', '#예술가', '#부드러움'],
        desc: '말보다 분위기와 감성으로 자신을 표현하는 예술가예요. 좋아하는 것에는 누구보다 진심이에요. 수채화처럼 부드럽게 번지는 결 눈썹이 잘 어울려요.',
        match: 'ESFJ',
        clash: 'ENTJ',
        f: {
          points: ['앞머리는 수채화처럼 흐리게', '결 방향을 살려 브러시업', '로지 브라운으로 감성 한 스푼'],
          service: { name: '콤보 · 섀도우 눈썹', why: '파우더처럼 번지는 음영으로 감성적인 무드를 살려요' },
          char: { brow: 'down', thick: 'thin', eyes: 'droopy', mouth: 'smile', hair: 'wave', ears: 'none', acc: 'clip', prop: 'petal', color: 'rose' }
        },
        m: {
          points: ['결이 보이게 자연스럽게', '앞머리는 각 없이 부드럽게', '내추럴 브라운으로 편안하게'],
          service: { name: '페더링 눈썹', why: '한 올씩 살린 결로 감성적인 분위기를 더해요' },
          char: { brow: 'down', thick: 'thin', eyes: 'droopy', mouth: 'smile', hair: 'perm', ears: 'none', acc: 'none', prop: 'petal', color: 'rose' }
        }
      },
      INFP: {
        name: '여린 결 소프트 눈썹',
        en: 'Tender Soft Brow',
        tagline: '마음이 고운 낭만주의자',
        tags: ['#낭만', '#공감', '#순수함'],
        desc: '마음속에 나만의 세계를 품은 낭만적인 사람이에요. 공감 능력이 깊어 따뜻한 위로를 잘 건네요. 여리고 부드러운 눈썹이 고운 마음을 닮았어요.',
        match: 'ENFJ',
        clash: 'ESTJ',
        f: {
          points: ['꼬리는 살짝 내려 순하게', '얇고 부드러운 곡선 유지', '라이트 브라운으로 맑게'],
          service: { name: '페더링 눈썹', why: '여린 결로 순하고 맑은 인상을 그대로 살려요' },
          char: { brow: 'down', thick: 'mid', eyes: 'sparkle', mouth: 'small', hair: 'long', ears: 'none', acc: 'none', prop: 'note', color: 'sky' }
        },
        m: {
          points: ['꼬리 쪽을 부드럽게 내리기', '진하지 않게 연한 톤으로', '앞머리는 결만 살짝 세우기'],
          service: { name: '속눈썹펌', why: '자연스럽게 올라간 속눈썹이 순한 눈매를 살려줘요' },
          char: { brow: 'down', thick: 'mid', eyes: 'sparkle', mouth: 'small', hair: 'comma', ears: 'none', acc: 'none', prop: 'note', color: 'sky' }
        }
      },
      INTP: {
        name: '호기심 업 라인',
        en: 'Curious Up Line',
        tagline: '궁금한 건 끝까지 파고드는 사람',
        tags: ['#호기심', '#아이디어', '#논리적'],
        desc: '한 가지에 빠지면 끝까지 파고드는 호기심 많은 사람이에요. 남들이 생각하지 못한 아이디어로 모두를 놀라게 해요. 살짝 올라간 눈썹이 엉뚱한 매력을 살려요.',
        match: 'ENTJ',
        clash: 'ESFJ',
        f: {
          points: ['꼬리를 살짝 올려 생기 있게', '결은 위로 빗어 자연스럽게', '그리는 대신 젤로 간단하게'],
          service: { name: '속눈썹펌', why: '아침마다 컬 걱정 없이 눈매가 또렷해 보여요' },
          char: { brow: 'up', thick: 'mid', eyes: 'round', mouth: 'cat', hair: 'bob', ears: 'none', acc: 'glasses', prop: 'sparkle', color: 'lilac' }
        },
        m: {
          points: ['꼬리 끝을 살짝 올리기', '삐져나온 털만 간단히 정리', '브러시로 결만 위로 세우기'],
          service: { name: '눈썹 컨설팅 · 정리', why: '얼굴형에 맞는 라인을 하나씩 함께 따져보며 찾아요' },
          char: { brow: 'up', thick: 'mid', eyes: 'round', mouth: 'cat', hair: 'perm', ears: 'none', acc: 'glasses', prop: 'sparkle', color: 'lilac' }
        }
      },
      ESTP: {
        name: '시원한 액션 앵글',
        en: 'Bold Action Angle',
        tagline: '생각은 짧게, 실행은 빠르게',
        tags: ['#행동파', '#추진력', '#에너지'],
        desc: '고민하기보다 일단 해보는 시원한 행동파예요. 어디서든 분위기를 이끄는 타고난 승부사예요. 각진 눈썹이 시원시원한 에너지를 그대로 보여줘요.',
        match: 'ISTJ',
        clash: 'INFJ',
        f: {
          points: ['산에 각을 살려 시원하게', '꼬리는 짧고 선명하게', '다크 브라운으로 또렷하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '메이크업한 듯 선명한 음영으로 시원한 인상을 완성' },
          char: { brow: 'angled', thick: 'bold', eyes: 'sharp', mouth: 'open', hair: 'bun', ears: 'none', acc: 'headband', prop: 'star', color: 'butter' }
        },
        m: {
          points: ['각진 산으로 남자답게', '두께는 짙게 유지하기', '아래 라인은 깔끔히 정리'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영을 함께 넣어 시원하고 선명한 각을 살려요' },
          char: { brow: 'angled', thick: 'bold', eyes: 'sharp', mouth: 'open', hair: 'buzz', ears: 'none', acc: 'headband', prop: 'star', color: 'butter' }
        }
      },
      ESFP: {
        name: '빛나는 하이 아치',
        en: 'Spotlight Arch',
        tagline: '머무는 곳마다 빛이 되는 사람',
        tags: ['#긍정에너지', '#사교적', '#화사함'],
        desc: '지금 이 순간을 누구보다 즐길 줄 아는 사람이에요. 머무는 곳마다 분위기가 환해져요. 높게 올라간 아치 눈썹이 화사한 매력을 완성해요.',
        match: 'ISFJ',
        clash: 'INTJ',
        f: {
          points: ['눈썹 산을 높게, 화사하게', '아이 메이크업과 컬러 맞추기', '미인점으로 시선이 머무는 포인트'],
          service: { name: '미인점', why: '작은 점 하나로 시선이 머무는 포인트를 더해요' },
          char: { brow: 'high-arch', thick: 'bold', eyes: 'sparkle', mouth: 'open', hair: 'wave', ears: 'none', acc: 'mole', prop: 'sparkle', color: 'rose' }
        },
        m: {
          points: ['산을 살려 또렷한 인상', '꼬리는 깔끔하게 마무리', '눈썹 젤로 결 세워 생기 있게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영으로 사진에서도 또렷한 눈썹을 만들어요' },
          char: { brow: 'high-arch', thick: 'bold', eyes: 'sparkle', mouth: 'open', hair: 'comma', ears: 'none', acc: 'none', prop: 'sparkle', color: 'rose' }
        }
      },
      ENFP: {
        name: '햇살 웨이브 아치',
        en: 'Sunny Wave Arch',
        tagline: '함께 있으면 환해지는 햇살 같은 사람',
        tags: ['#긍정', '#호기심', '#따뜻함'],
        desc: '어디서든 분위기를 환하게 밝히는 햇살 같은 사람이에요. 호기심이 많아 새로운 시도를 두려워하지 않아요. 부드럽게 물결치는 아치 눈썹이 밝은 에너지를 닮았어요.',
        match: 'INFJ',
        clash: 'ISTJ',
        f: {
          points: ['부드러운 아치로 밝은 인상', '앞머리는 결을 세워 생기 있게', '밀크 브라운으로 화사하게'],
          service: { name: '페더링 눈썹', why: '결을 살린 부드러운 아치가 밝은 표정을 살려요' },
          char: { brow: 'soft-arch', thick: 'mid', eyes: 'smile', mouth: 'open', hair: 'long', ears: 'none', acc: 'clip', prop: 'heart', color: 'butter' }
        },
        m: {
          points: ['결을 살려 생기 있게', '산은 부드럽게 둥글리기', '앞머리 결은 위로 빗어 올리기'],
          service: { name: '눈썹 컨설팅 · 정리', why: '밝은 표정과 어울리는 라인을 1:1로 함께 찾아요' },
          char: { brow: 'soft-arch', thick: 'mid', eyes: 'smile', mouth: 'open', hair: 'perm', ears: 'none', acc: 'none', prop: 'heart', color: 'butter' }
        }
      },
      ENTP: {
        name: '위트 있는 업 브로우',
        en: 'Witty Up Brow',
        tagline: '재치 하나로 판을 바꾸는 사람',
        tags: ['#재치', '#아이디어', '#도전정신'],
        desc: '번뜩이는 아이디어와 재치 있는 말솜씨를 가진 사람이에요. 새로운 시도로 익숙한 판을 바꾸는 걸 즐겨요. 경쾌하게 올라간 눈썹이 위트 있는 매력을 닮았어요.',
        match: 'INTJ',
        clash: 'ISFJ',
        f: {
          points: ['꼬리를 올려 경쾌하게', '앞쪽은 브러시업으로 생기', '눈썹 컬러로 가끔 분위기 전환'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영으로 경쾌한 업 라인을 선명하게 살려요' },
          char: { brow: 'up', thick: 'bold', eyes: 'cat', mouth: 'smirk', hair: 'bob', ears: 'none', acc: 'none', prop: 'note', color: 'peach' }
        },
        m: {
          points: ['꼬리 끝을 위로 살짝 빼기', '숱은 살리고 잔털만 정리', '결을 세워 입체감 있게'],
          service: { name: '눈썹 컨설팅 · 정리', why: '올라간 꼬리 라인을 살려 날렵하게 다듬어요' },
          char: { brow: 'up', thick: 'bold', eyes: 'cat', mouth: 'smirk', hair: 'comma', ears: 'none', acc: 'none', prop: 'note', color: 'peach' }
        }
      },
      ESTJ: {
        name: '단단한 리더 일자',
        en: 'Leader Straight',
        tagline: '계획한 일은 반드시 해내는 사람',
        tags: ['#리더십', '#책임감', '#추진력'],
        desc: '목표를 정하면 계획대로 차근차근 해내는 사람이에요. 책임감이 강해 모두가 믿고 따르는 리더예요. 짙고 곧은 일자 눈썹이 단단한 카리스마를 보여줘요.',
        match: 'ISTP',
        clash: 'INFP',
        f: {
          points: ['짙은 일자로 단단한 인상', '꼬리 끝까지 또렷하게', '다크 브라운으로 신뢰감 있게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영을 함께 넣어 또렷하고 단단한 라인을 완성' },
          char: { brow: 'straight', thick: 'bold', eyes: 'sharp', mouth: 'smile', hair: 'bun', ears: 'none', acc: 'none', prop: 'star', color: 'cocoa' }
        },
        m: {
          points: ['짙은 일자 라인을 그대로', '눈썹 사이 잔털은 깔끔하게', '다크 브라운으로 선명하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '음영으로 빈 곳을 채워 짙고 곧은 라인을 만들어요' },
          char: { brow: 'straight', thick: 'bold', eyes: 'sharp', mouth: 'smile', hair: 'short', ears: 'none', acc: 'none', prop: 'star', color: 'cocoa' }
        }
      },
      ESFJ: {
        name: '따뜻한 하트 라운드',
        en: 'Warm Heart Round',
        tagline: '모두의 하루를 챙기는 다정한 사람',
        tags: ['#다정다감', '#배려', '#분위기메이커'],
        desc: '사람을 좋아하고 모두를 살뜰히 챙기는 다정한 사람이에요. 모임마다 분위기를 따뜻하게 만드는 힘이 있어요. 둥글고 화사한 눈썹이 친근한 매력을 더해요.',
        match: 'ISFP',
        clash: 'INTP',
        f: {
          points: ['둥근 곡선으로 친근하게', '앞머리는 흐리게 그라데이션', '코랄 브라운으로 화사하게'],
          service: { name: '눈썹 컨설팅 · 정리', why: '얼굴형에 맞춘 화사한 라운드 라인을 1:1로 찾아요' },
          char: { brow: 'round', thick: 'bold', eyes: 'smile', mouth: 'open', hair: 'wave', ears: 'none', acc: 'headband', prop: 'heart', color: 'cocoa' }
        },
        m: {
          points: ['둥근 라인으로 호감 가는 인상', '숱은 살리고 잔털만 정리', '웜 브라운으로 따뜻하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '음영으로 빈 곳을 채워 부드럽고 깔끔한 인상을 줘요' },
          char: { brow: 'round', thick: 'bold', eyes: 'smile', mouth: 'open', hair: 'buzz', ears: 'none', acc: 'none', prop: 'heart', color: 'cocoa' }
        }
      },
      ENFJ: {
        name: '다정한 리더 아치',
        en: 'Warm Leader Arch',
        tagline: '모두를 이끄는 따뜻한 카리스마',
        tags: ['#다정한리더', '#공감', '#선한영향력'],
        desc: '사람의 가능성을 먼저 알아보고 응원하는 따뜻한 리더예요. 말 한마디로 모두에게 힘을 주는 재능이 있어요. 부드럽지만 또렷한 아치 눈썹이 그 매력을 닮았어요.',
        match: 'INFP',
        clash: 'ISTP',
        f: {
          points: ['또렷한 아치로 신뢰감 있게', '꼬리는 부드럽게 마무리', '브라운 섀도우로 자연스럽게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '부드러운 결과 또렷한 음영이 따뜻한 카리스마를 완성' },
          char: { brow: 'soft-arch', thick: 'bold', eyes: 'smile', mouth: 'smile', hair: 'bob', ears: 'none', acc: 'none', prop: 'petal', color: 'sage' }
        },
        m: {
          points: ['부드러운 아치로 호감 인상', '눈썹 산은 자연스럽게', '숱이 빈 곳은 결 따라 채우기'],
          service: { name: '페더링 눈썹', why: '자연스러운 결로 다정하고 믿음직한 인상을 만들어요' },
          char: { brow: 'soft-arch', thick: 'bold', eyes: 'smile', mouth: 'smile', hair: 'perm', ears: 'none', acc: 'none', prop: 'petal', color: 'sage' }
        }
      },
      ENTJ: {
        name: '당당한 하이 아치',
        en: 'Commanding Arch',
        tagline: '목표가 보이면 망설임 없는 사람',
        tags: ['#결단력', '#야망', '#당당함'],
        desc: '큰 목표를 세우고 거침없이 나아가는 타고난 리더예요. 판단이 빠르고 결단력이 있어 모두가 의지해요. 높게 솟은 하이 아치가 당당한 분위기를 완성해요.',
        match: 'INTP',
        clash: 'ISFP',
        f: {
          points: ['산은 높고 선명하게', '꼬리는 가늘고 날렵하게', '애쉬 브라운으로 세련되게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '선명한 음영으로 메이크업 없이도 당당한 인상이에요' },
          char: { brow: 'high-arch', thick: 'mid', eyes: 'sharp', mouth: 'smirk', hair: 'bun', ears: 'none', acc: 'none', prop: 'moon', color: 'sky' }
        },
        m: {
          points: ['산을 살려 결단력 있는 인상', '꼬리는 짧고 깔끔하게', '다크 그레이로 단단하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영으로 당당하고 또렷한 라인을 완성해요' },
          char: { brow: 'high-arch', thick: 'mid', eyes: 'sharp', mouth: 'smirk', hair: 'short', ears: 'none', acc: 'glasses', prop: 'moon', color: 'sky' }
        }
      }
    }
  },

  /* =====================================================================
     VOL.03  눈썹으로 알아보는 내 얼굴 동물상
     ===================================================================== */
  {
    id: 'animal',
    vol: '03',
    title: '눈썹으로 알아보는 내 얼굴 동물상',
    hook: '강아지상일까, 고양이상일까?',
    intro: '평소 분위기와 습관으로 알아보는 나의 동물상이에요. 동물상에 어울리는 눈썹 팁도 함께 알려드려요.',
    color: 'peach',
    q: {
      f: [
        { q: '처음 보는 사람이 많은 모임에서 나는?', a: [
          { t: '먼저 웃으면서 말을 건네요', s: { dog: 2, squirrel: 1 } },
          { t: '한발 물러서 분위기부터 살펴요', s: { cat: 2, deer: 1 } },
          { t: '어느새 대화의 중심에 있어요', s: { fox: 2, squirrel: 1 } },
          { t: '옆 사람 이야기에 리액션 담당', s: { rabbit: 2, dog: 1 } }
        ] },
        { q: '거울 속 내 눈매와 가까운 건?', a: [
          { t: '눈꼬리가 살짝 내려간 순한 눈', s: { dog: 2, deer: 1 } },
          { t: '눈꼬리가 올라간 도도한 눈', s: { cat: 2, fox: 1 } },
          { t: '동그랗고 반짝이는 눈', s: { squirrel: 2, rabbit: 1 } },
          { t: '크고 촉촉한 맑은 눈', s: { deer: 2, rabbit: 1 } }
        ] },
        { q: '친구들이 말하는 내 매력 포인트는?', a: [
          { t: '잘 웃고 다정한 것', s: { dog: 2, rabbit: 1 } },
          { t: '말수는 적은데 은근 재밌는 것', s: { cat: 2 } },
          { t: '은은하게 풍기는 분위기', s: { fox: 2, deer: 1 } },
          { t: '지치지 않는 밝은 에너지', s: { squirrel: 2, rabbit: 1 } }
        ] },
        { q: '카페에서 주로 고르는 메뉴는?', a: [
          { t: '달콤한 바닐라 라떼', s: { dog: 2, rabbit: 1 } },
          { t: '깔끔한 아이스 아메리카노', s: { cat: 2, fox: 1 } },
          { t: '향이 좋은 따뜻한 허브티', s: { deer: 2 } },
          { t: '음료보다 디저트 여러 개', s: { squirrel: 2, rabbit: 1 } }
        ] },
        { q: '사진 찍을 때 자주 짓는 표정은?', a: [
          { t: '볼에 살짝 바람 넣고 귀엽게', s: { squirrel: 2, rabbit: 1 } },
          { t: '살짝 미소만, 분위기 있게', s: { deer: 2, cat: 1 } },
          { t: '한쪽 입꼬리를 올린 여유 미소', s: { fox: 2, cat: 1 } },
          { t: '앞니가 보이게 활짝', s: { rabbit: 2, dog: 1 } }
        ] },
        { q: '요즘 끌리는 메이크업 무드는?', a: [
          { t: '맑고 투명한 물광 메이크업', s: { deer: 2, rabbit: 1 } },
          { t: '아이라인을 길게 뺀 고양이 눈매', s: { cat: 2, fox: 1 } },
          { t: '발그레한 코랄 볼터치', s: { rabbit: 2, dog: 1 } },
          { t: '은은한 브라운 음영으로 깊게', s: { fox: 2, deer: 1 } }
        ] },
        { q: '주말 데이트 코스로 끌리는 곳은?', a: [
          { t: '반려견과 함께 가는 공원 산책', s: { dog: 2, squirrel: 1 } },
          { t: '조용한 전시회나 서점', s: { deer: 2, cat: 1 } },
          { t: '야경이 보이는 루프탑', s: { fox: 2, cat: 1 } },
          { t: '놀이공원이나 방탈출 카페', s: { squirrel: 2, rabbit: 1 } }
        ] }
      ],
      m: [
        { q: '처음 보는 사람들과의 자리에서 나는?', a: [
          { t: '먼저 웃으면서 다가가요', s: { dog: 2, dino: 1 } },
          { t: '조용히 있다가 한마디로 웃겨요', s: { cat: 2, fox: 1 } },
          { t: '자연스럽게 분위기를 이끌어요', s: { wolf: 2, bear: 1 } },
          { t: '고기 굽고 챙기는 건 내 담당', s: { bear: 2, dog: 1 } }
        ] },
        { q: '거울 속 내 눈매와 가까운 건?', a: [
          { t: '살짝 처진 선한 눈', s: { dog: 2, bear: 1 } },
          { t: '날렵하게 올라간 눈', s: { cat: 2, fox: 1 } },
          { t: '깊고 날카로운 눈', s: { wolf: 2 } },
          { t: '크고 동그란 눈', s: { fox: 2, dino: 1 } }
        ] },
        { q: '친구들이 말하는 나는?', a: [
          { t: '옆에 있으면 든든한 사람', s: { bear: 2, wolf: 1 } },
          { t: '늘 유쾌하게 웃겨주는 사람', s: { dino: 2, dog: 1 } },
          { t: '무심한 척 다 챙기는 사람', s: { cat: 2, bear: 1 } },
          { t: '눈치 빠르고 센스 있는 사람', s: { fox: 2, cat: 1 } }
        ] },
        { q: '운동할 때 나는?', a: [
          { t: '팀 스포츠로 다 같이 땀 흘려요', s: { dog: 2, dino: 1 } },
          { t: '헬스장에서 묵묵히 운동해요', s: { bear: 2, wolf: 1 } },
          { t: '혼자 달리며 생각을 정리해요', s: { cat: 2, fox: 1 } },
          { t: '복싱이나 클라이밍으로 승부욕 발산', s: { wolf: 2, dino: 1 } }
        ] },
        { q: '사진 찍을 때 내 표정은?', a: [
          { t: '눈웃음 가득 활짝', s: { dog: 2, bear: 1 } },
          { t: '무표정이 제일 멋있어요', s: { wolf: 2, cat: 1 } },
          { t: '입을 크게 벌리고 장난스럽게', s: { dino: 2 } },
          { t: '살짝 미소에 브이 하나', s: { fox: 2, cat: 1 } }
        ] },
        { q: '평소 스타일과 가까운 건?', a: [
          { t: '편한 맨투맨에 운동화', s: { bear: 2, dog: 1 } },
          { t: '깔끔한 올블랙 룩', s: { cat: 2, wolf: 1 } },
          { t: '그래픽 티에 볼캡, 스트릿 룩', s: { dino: 2, fox: 1 } },
          { t: '유행하는 아이템 하나는 꼭', s: { fox: 2, dino: 1 } }
        ] },
        { q: '연인에게 듣고 싶은 말은?', a: [
          { t: '너랑 있으면 마음이 편해', s: { dog: 2, bear: 1 } },
          { t: '그 눈빛에 반했어', s: { wolf: 2, cat: 1 } },
          { t: '같이 있으면 하루가 즐거워', s: { dino: 2, dog: 1 } },
          { t: '생각보다 다정해서 설레', s: { fox: 2, bear: 1 } }
        ] }
      ]
    },
    results: {
      f: [
        {
          id: 'dog',
          name: '다정한 강아지상',
          en: 'Puppy Face',
          tagline: '마주 보면 마음이 풀리는 사람',
          tags: ['#다정함', '#순한눈매', '#호감형'],
          desc: '잘 웃고 반응이 따뜻해서 누구나 금방 편해지는 사람이에요. 살짝 처진 눈매와 순한 눈썹이 다정한 분위기를 만들어요. 한번 맺은 인연은 오래 아끼는 편이에요.',
          points: ['꼬리는 살짝 내려 순하게', '산 없이 부드러운 곡선으로', '밝은 브라운으로 포근하게'],
          service: { name: '페더링 눈썹', why: '여린 결로 순한 눈썹을 자연스럽게 살려줘요' },
          match: 'squirrel',
          clash: 'cat',
          char: { brow: 'down', thick: 'mid', eyes: 'droopy', mouth: 'smile', hair: 'long', ears: 'dog', acc: 'none', prop: 'heart', color: 'butter' }
        },
        {
          id: 'cat',
          name: '도도한 고양이상',
          en: 'Kitty Face',
          tagline: '무심한 듯 섬세한 반전 매력',
          tags: ['#도도함', '#세련됨', '#반전매력'],
          desc: '처음엔 도도해 보여도 알고 보면 정이 많은 사람이에요. 올라간 눈꼬리와 또렷한 눈썹이 세련된 분위기를 줘요. 가까운 사람에게만 보여주는 다정함이 매력이에요.',
          points: ['꼬리를 살짝 올려 날렵하게', '눈썹 산은 또렷하게', '아이라인 꼬리와 방향 맞추기'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영으로 올라간 꼬리 라인을 선명하게 잡아요' },
          match: 'deer',
          clash: 'dog',
          char: { brow: 'up', thick: 'mid', eyes: 'cat', mouth: 'cat', hair: 'bob', ears: 'cat', acc: 'none', prop: 'moon', color: 'lilac' }
        },
        {
          id: 'fox',
          name: '매혹적인 여우상',
          en: 'Fox Face',
          tagline: '눈빛 하나로 시선을 머물게 하는 사람',
          tags: ['#매혹', '#센스', '#분위기미인'],
          desc: '말 한마디, 눈짓 하나에도 분위기가 묻어나는 사람이에요. 센스가 좋아 어디서든 자연스럽게 시선을 모아요. 길게 뻗은 아치 눈썹이 매혹적인 눈매를 완성해요.',
          points: ['꼬리를 길게 빼서 우아하게', '눈썹 산은 높게, 선은 가늘게', '작은 점 하나로 포인트 더하기'],
          service: { name: '미인점', why: '눈가나 입가의 작은 점 하나로 매력 포인트를 더해요' },
          match: 'rabbit',
          clash: 'squirrel',
          char: { brow: 'high-arch', thick: 'thin', eyes: 'sharp', mouth: 'smirk', hair: 'wave', ears: 'fox', acc: 'mole', prop: 'star', color: 'peach' }
        },
        {
          id: 'rabbit',
          name: '사랑스러운 토끼상',
          en: 'Bunny Face',
          tagline: '동그란 눈에 담긴 사랑스러움',
          tags: ['#사랑스러움', '#맑은눈', '#동안'],
          desc: '맑고 동그란 눈빛에 리액션까지 사랑스러운 사람이에요. 조용한 듯해도 친한 사람 앞에선 밝은 에너지가 넘쳐요. 둥근 눈썹이 사랑스러운 인상을 더해줘요.',
          points: ['둥근 곡선으로 부드럽게', '길이는 짧게, 두께는 얇게', '로지 브라운으로 생기 있게'],
          service: { name: '속눈썹펌', why: '말려 올라간 속눈썹이 동그란 눈매를 또렷하게 살려요' },
          match: 'dog',
          clash: 'fox',
          char: { brow: 'round', thick: 'thin', eyes: 'round', mouth: 'small', hair: 'bun', ears: 'rabbit', acc: 'ribbon', prop: 'petal', color: 'rose' }
        },
        {
          id: 'deer',
          name: '청순한 사슴상',
          en: 'Deer Face',
          tagline: '맑은 눈망울이 그리는 청순함',
          tags: ['#청순함', '#맑은눈망울', '#차분함'],
          desc: '크고 맑은 눈망울과 차분한 분위기가 매력인 사람이에요. 말투도 행동도 조곤조곤해서 곁에 있으면 편안해요. 부드러운 아치 눈썹이 청순한 무드를 살려줘요.',
          points: ['완만한 아치로 부드럽게', '앞머리는 연하게 흐리기', '눈썹과 눈 사이를 넉넉하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '은은한 음영으로 맑고 부드러운 눈썹을 완성해요' },
          match: 'cat',
          clash: 'squirrel',
          char: { brow: 'soft-arch', thick: 'mid', eyes: 'sparkle', mouth: 'small', hair: 'long', ears: 'deer', acc: 'headband', prop: 'leaf', color: 'sage' }
        },
        {
          id: 'squirrel',
          name: '생기 있는 다람쥐상',
          en: 'Squirrel Face',
          tagline: '반짝이는 눈빛의 작은 에너자이저',
          tags: ['#생기', '#밝은에너지', '#귀여움'],
          desc: '늘 부지런히 움직이는 에너지와 통통 튀는 매력을 가진 사람이에요. 동그란 볼과 반짝이는 눈이 생기를 더해요. 도톰한 일자 눈썹이 밝은 인상을 완성해요.',
          points: ['짧고 도톰한 일자 라인', '앞머리는 결을 위로 세우기', '밀크 브라운으로 발랄하게'],
          service: { name: '눈썹 컨설팅 · 정리', why: '얼굴형에 맞춰 생기 있는 길이와 두께를 함께 찾아요' },
          match: 'rabbit',
          clash: 'cat',
          char: { brow: 'straight', thick: 'mid', eyes: 'round', mouth: 'open', hair: 'bob', ears: 'squirrel', acc: 'clip', prop: 'note', color: 'cocoa' }
        }
      ],
      m: [
        {
          id: 'dog',
          name: '훈훈한 강아지상',
          en: 'Puppy Face',
          tagline: '웃는 순간 경계가 풀리는 사람',
          tags: ['#훈훈함', '#선한인상', '#다정함'],
          desc: '잘 웃고 리액션이 따뜻해 어디서든 사랑받는 사람이에요. 살짝 처진 눈매가 선하고 다정한 인상을 줘요. 한번 마음을 주면 끝까지 챙기는 의리가 있어요.',
          points: ['꼬리는 살짝 내려 순하게', '숱은 살리고 잔털만 정리', '내추럴 브라운으로 부드럽게'],
          service: { name: '페더링 눈썹', why: '결을 한 올씩 더해 선한 인상을 자연스럽게 살려요' },
          match: 'bear',
          clash: 'wolf',
          char: { brow: 'down', thick: 'mid', eyes: 'droopy', mouth: 'smile', hair: 'perm', ears: 'dog', acc: 'none', prop: 'heart', color: 'butter' }
        },
        {
          id: 'cat',
          name: '시크한 고양이상',
          en: 'Kitty Face',
          tagline: '무심한 척, 사실은 다 챙기는 사람',
          tags: ['#시크함', '#섬세함', '#도회적'],
          desc: '말수는 적지만 필요한 순간엔 누구보다 섬세한 사람이에요. 날렵한 눈매와 깔끔한 눈썹이 도회적인 분위기를 만들어요. 은근히 챙겨주는 다정함이 반전 매력이에요.',
          points: ['눈썹 산은 높게, 선은 깔끔하게', '꼬리 끝은 얇고 날렵하게', '아래 라인 잔털은 깔끔히'],
          service: { name: '눈썹 컨설팅 · 정리', why: '날렵한 라인을 살려 깔끔하게 다듬어줘요' },
          match: 'wolf',
          clash: 'dino',
          char: { brow: 'high-arch', thick: 'thin', eyes: 'cat', mouth: 'small', hair: 'short', ears: 'cat', acc: 'none', prop: 'sparkle', color: 'lilac' }
        },
        {
          id: 'wolf',
          name: '깊은 눈빛 늑대상',
          en: 'Wolf Face',
          tagline: '깊은 눈빛에 담긴 카리스마',
          tags: ['#카리스마', '#깊은눈빛', '#리더십'],
          desc: '강렬한 눈빛과 묵직한 존재감으로 시선을 끄는 사람이에요. 리더십이 있어 자연스럽게 사람들을 이끌어요. 각지고 짙은 눈썹이 남자다운 인상을 완성해요.',
          points: ['눈썹 산에 각을 또렷하게', '두께는 짙게, 꼬리는 깔끔히', '다크 브라운으로 선명하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영을 함께 넣어 짙고 각진 라인을 완성해요' },
          match: 'cat',
          clash: 'dog',
          char: { brow: 'angled', thick: 'bold', eyes: 'sharp', mouth: 'smirk', hair: 'comma', ears: 'wolf', acc: 'none', prop: 'moon', color: 'sky' }
        },
        {
          id: 'bear',
          name: '듬직한 곰상',
          en: 'Bear Face',
          tagline: '곁에 있으면 든든한 포근함',
          tags: ['#듬직함', '#포근함', '#믿음직'],
          desc: '넓은 품만큼 마음도 넉넉한 듬직한 사람이에요. 무뚝뚝해 보여도 알고 보면 누구보다 포근해요. 짙고 반듯한 눈썹이 믿음직한 인상을 더해줘요.',
          points: ['짙은 일자 라인을 그대로', '앞머리는 결 따라 자연스럽게', '삐져나온 잔털만 깔끔히'],
          service: { name: '콤보 · 섀도우 눈썹', why: '음영으로 빈 곳을 채워 짙고 반듯한 눈썹을 완성해요' },
          match: 'dog',
          clash: 'fox',
          char: { brow: 'straight', thick: 'bold', eyes: 'smile', mouth: 'smile', hair: 'buzz', ears: 'bear', acc: 'none', prop: 'coffee', color: 'cocoa' }
        },
        {
          id: 'dino',
          name: '유쾌한 공룡상',
          en: 'Dino Face',
          tagline: '시원한 이목구비, 유쾌한 에너지',
          tags: ['#유쾌함', '#시원한인상', '#분위기메이커'],
          desc: '시원한 이목구비와 유쾌한 에너지가 매력인 사람이에요. 어디서든 자연스럽게 분위기를 밝게 만들어요. 살짝 올라간 눈썹이 생기 있는 인상을 살려줘요.',
          points: ['꼬리를 살짝 올려 생기 있게', '숱 많은 앞쪽은 결만 정돈', '눈썹 아래 라인은 깔끔하게'],
          service: { name: '눈썹 컨설팅 · 정리', why: '얼굴형에 맞춰 시원한 이목구비에 어울리는 라인을 찾아요' },
          match: 'dog',
          clash: 'cat',
          char: { brow: 'up', thick: 'mid', eyes: 'round', mouth: 'open', hair: 'short', ears: 'dino', acc: 'none', prop: 'star', color: 'peach' }
        },
        {
          id: 'fox',
          name: '반전 매력 사막여우상',
          en: 'Fennec Face',
          tagline: '부드러운 눈매, 날렵한 센스',
          tags: ['#반전매력', '#센스', '#큰눈매'],
          desc: '동그란 눈은 부드러운데 눈썹 라인은 날렵한 반전 매력의 사람이에요. 센스 있고 눈치가 빨라 어디서든 사랑받아요. 완만한 아치 눈썹이 매력을 더해줘요.',
          points: ['완만한 아치로 부드럽게', '꼬리 끝은 가늘고 날렵하게', '속눈썹 컬로 눈매 살리기'],
          service: { name: '속눈썹펌', why: '자연스럽게 올라간 속눈썹이 큰 눈매를 살려줘요' },
          match: 'cat',
          clash: 'bear',
          char: { brow: 'soft-arch', thick: 'thin', eyes: 'sparkle', mouth: 'smirk', hair: 'comma', ears: 'fox', acc: 'glasses', prop: 'note', color: 'rose' }
        }
      ]
    }
  },

  /* =====================================================================
     VOL.04  아침 준비로 보는 뷰티 루틴 캐릭터
     ===================================================================== */
  {
    id: 'routine',
    vol: '04',
    title: '아침 준비로 보는 뷰티 루틴 캐릭터',
    hook: '알람 끄고 거울 앞, 나는 어떤 타입?',
    intro: '아침 준비 습관으로 알아보는 나의 뷰티 루틴 캐릭터예요. 내일 아침이 가벼워지는 팁도 받아 가세요.',
    color: 'sage',
    q: {
      f: [
        { q: '알람이 울리면 나는?', a: [
          { t: '한 번에 일어나 바로 세수하러 가요', s: { minimal: 2, skincare: 1 } },
          { t: '알람을 미루고 조금만 더', s: { mood: 2, minimal: 1 } },
          { t: '일찍 일어나 메이크업 시간 확보', s: { fullglam: 2 } },
          { t: '눈 뜨자마자 피부 컨디션부터 체크', s: { skincare: 2 } }
        ] },
        { q: '세안 후 가장 먼저 손이 가는 건?', a: [
          { t: '올인원 크림 하나로 끝', s: { minimal: 2 } },
          { t: '토너, 세럼, 크림 순서대로 차근차근', s: { skincare: 2, fullglam: 1 } },
          { t: '메이크업이 잘 먹게 프라이머부터', s: { fullglam: 2 } },
          { t: '그날 피부 컨디션 보고 골라요', s: { mood: 2, skincare: 1 } }
        ] },
        { q: '눈썹은 어떻게 하고 나가요?', a: [
          { t: '그리는 시간이 제일 아까워요', s: { minimal: 2, mood: 1 } },
          { t: '펜슬, 파우더, 젤까지 풀코스', s: { fullglam: 2 } },
          { t: '눈썹보다 피부 결이 더 신경 쓰여요', s: { skincare: 2 } },
          { t: '옷에 따라 진하게, 연하게 매번 달라요', s: { mood: 2 } }
        ] },
        { q: '내 파우치 속 모습과 가까운 건?', a: [
          { t: '립밤 하나면 충분해요', s: { minimal: 2 } },
          { t: '가득 차서 지퍼가 겨우 잠겨요', s: { fullglam: 2, mood: 1 } },
          { t: '미스트와 수분크림은 꼭 챙겨요', s: { skincare: 2 } },
          { t: '그날 가방 따라 매번 달라요', s: { mood: 2, minimal: 1 } }
        ] },
        { q: '약속에 늦을 것 같을 때 생략하는 건?', a: [
          { t: '준비가 빨라서 늦을 일이 없어요', s: { minimal: 2 } },
          { t: '메이크업은 절대 포기 못 해요', s: { fullglam: 2 } },
          { t: '메이크업은 빼도 선크림은 꼭', s: { skincare: 2, minimal: 1 } },
          { t: '그날 기분 따라 달라요', s: { mood: 2 } }
        ] },
        { q: '주말 아침 나의 모습은?', a: [
          { t: '민낯에 모자 하나 쓰고 외출', s: { minimal: 2, mood: 1 } },
          { t: '집에 있어도 메이크업하면 기분 좋아요', s: { fullglam: 2 } },
          { t: '시트 마스크 붙이고 홈케어 데이', s: { skincare: 2 } },
          { t: '새로 산 컬러 메이크업을 실험해요', s: { mood: 2, fullglam: 1 } }
        ] }
      ],
      m: [
        { q: '알람이 울리면 나는?', a: [
          { t: '바로 일어나 샤워하고 끝', s: { allinone: 2 } },
          { t: '요즘 배운 아침 루틴을 따라 해요', s: { rookie: 2 } },
          { t: '조금 일찍 일어나 머리 손질 시간 확보', s: { detail: 2 } },
          { t: '아슬아슬하게 일어나 모자부터 찾아요', s: { natural: 2, allinone: 1 } }
        ] },
        { q: '세안 후 바르는 건?', a: [
          { t: '올인원 하나면 끝이에요', s: { allinone: 2 } },
          { t: '토너와 로션, 요즘 하나씩 늘리는 중', s: { rookie: 2 } },
          { t: '피부 타입에 맞춰 단계별로 발라요', s: { detail: 2 } },
          { t: '물 세안이면 충분해요', s: { natural: 2 } }
        ] },
        { q: '눈썹 관리는 어떻게 해요?', a: [
          { t: '눈썹 관리를 따로 해본 적은 없어요', s: { natural: 2, allinone: 1 } },
          { t: '삐져나온 털만 가끔 잘라요', s: { allinone: 2, rookie: 1 } },
          { t: '정리해 보고 싶은데 방법을 몰라요', s: { rookie: 2 } },
          { t: '모양을 잡고 빈 곳은 펜슬로 채워요', s: { detail: 2 } }
        ] },
        { q: '머리 스타일링은?', a: [
          { t: '말리기만 하면 끝', s: { allinone: 2, natural: 1 } },
          { t: '왁스 바르는 법을 연습 중이에요', s: { rookie: 2 } },
          { t: '드라이에 왁스, 스프레이까지', s: { detail: 2 } },
          { t: '자연 건조가 가장 편해요', s: { natural: 2 } }
        ] },
        { q: '친구가 피부 좋다고 칭찬하면?', a: [
          { t: '타고난 것 같아요', s: { natural: 2 } },
          { t: '정말요? 요즘 관리를 시작했거든요', s: { rookie: 2 } },
          { t: '내 루틴을 차근차근 알려줘요', s: { detail: 2 } },
          { t: '선크림 하나 바른 게 전부인데', s: { allinone: 2 } }
        ] },
        { q: '거울 앞에서 보내는 아침 시간은?', a: [
          { t: '세수할 때 잠깐 보는 게 전부', s: { natural: 2, allinone: 1 } },
          { t: '짧게, 필요한 것만 빠르게', s: { allinone: 2 } },
          { t: '이것저것 해보느라 생각보다 길어요', s: { rookie: 2, detail: 1 } },
          { t: '넉넉히, 디테일까지 완벽하게', s: { detail: 2 } }
        ] }
      ]
    },
    results: {
      f: [
        {
          id: 'minimal',
          name: '초스피드 미니멀리스트',
          en: 'Speedy Minimalist',
          tagline: '준비는 가볍게, 인상은 깔끔하게',
          tags: ['#미니멀', '#효율', '#실속파'],
          desc: '아침 시간은 짧게, 결과는 깔끔하게 챙기는 실속파예요. 꼭 필요한 것만 남기는 감각이 있어서 꾸민 듯 안 꾸민 듯 자연스러워요.',
          points: ['눈썹은 결만 빗어도 정돈 완료', '립앤치크 하나로 생기 더하기', '투명 브로우 젤로 결 고정'],
          service: { name: '페더링 눈썹', why: '그리지 않아도 결이 살아 있어 아침 준비가 가벼워져요' },
          match: 'skincare',
          clash: 'fullglam',
          char: { brow: 'straight', thick: 'mid', eyes: 'round', mouth: 'smile', hair: 'bun', ears: 'none', acc: 'clip', prop: 'coffee', color: 'sky' }
        },
        {
          id: 'fullglam',
          name: '풀메이크업 장인',
          en: 'Full Glam Master',
          tagline: '메이크업은 나를 표현하는 작품',
          tags: ['#메이크업장인', '#섬세함', '#디테일'],
          desc: '메이크업하는 시간 자체를 즐기는 진정한 장인이에요. 새로운 제품과 기법을 연구하는 게 즐거움이에요. 완성된 얼굴을 마주하면 하루가 설레요.',
          points: ['눈썹 산과 꼬리 위치 먼저 잡기', '파우더로 앞머리 그라데이션', '하이라이터로 눈썹뼈 강조'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영이 바탕이 되어 어떤 메이크업과도 잘 어울려요' },
          match: 'mood',
          clash: 'minimal',
          char: { brow: 'high-arch', thick: 'bold', eyes: 'sparkle', mouth: 'smirk', hair: 'wave', ears: 'none', acc: 'none', prop: 'sparkle', color: 'rose' }
        },
        {
          id: 'skincare',
          name: '스킨케어 연구원',
          en: 'Skincare Scientist',
          tagline: '화려함보다 맑은 피부 결이 먼저',
          tags: ['#스킨케어', '#꾸준함', '#꼼꼼함'],
          desc: '화장품 성분표를 읽는 시간이 즐거운 꼼꼼한 연구파예요. 화려한 메이크업보다 맑은 민낯을 더 좋아해요. 꾸준히 쌓아온 루틴이 나만의 자신감이에요.',
          points: ['눈썹은 연한 컬러로 은은하게', '스킨케어 후 눈썹 결 정돈', '민낯엔 눈썹만 정돈해도 충분'],
          service: { name: '콤보 · 섀도우 눈썹', why: '민낯에도 은은하게 정돈된 눈썹이 있어 든든해요' },
          match: 'minimal',
          clash: 'mood',
          char: { brow: 'soft-arch', thick: 'thin', eyes: 'smile', mouth: 'small', hair: 'long', ears: 'none', acc: 'glasses', prop: 'leaf', color: 'sage' }
        },
        {
          id: 'mood',
          name: '그날그날 기분파',
          en: 'Mood Switcher',
          tagline: '오늘의 메이크업은 오늘의 기분대로',
          tags: ['#기분파', '#변신', '#자유로움'],
          desc: '그날의 기분과 옷에 따라 메이크업도 달라지는 변신의 귀재예요. 정해진 틀보다 새로운 시도를 즐겨요. 매일 다른 내 모습을 만나는 게 즐거워요.',
          points: ['기본 라인만 잡아두면 변신 자유', '눈썹 컬러로 분위기 바꾸기', '펜슬과 파우더 번갈아 쓰기'],
          service: { name: '눈썹 컨설팅 · 정리', why: '어떤 메이크업에도 어울리는 나만의 기본 라인을 찾아요' },
          match: 'fullglam',
          clash: 'skincare',
          char: { brow: 'round', thick: 'mid', eyes: 'cat', mouth: 'open', hair: 'bob', ears: 'none', acc: 'ribbon', prop: 'note', color: 'lilac' }
        }
      ],
      m: [
        {
          id: 'allinone',
          name: '올인원 하나면 끝',
          en: 'All-in-One Guy',
          tagline: '단순하게, 그래서 더 깔끔하게',
          tags: ['#심플', '#효율', '#올인원'],
          desc: '아침 준비는 빠르고 간단하게 끝내는 실속파예요. 복잡한 단계는 번거로워도 깔끔한 인상은 놓치지 않아요.',
          points: ['삐져나온 털만 정리해도 인상 변신', '눈썹 브러시로 결 한 번 빗기', '선크림 하나는 꼭 챙기기'],
          service: { name: '눈썹 컨설팅 · 정리', why: '모양만 깔끔히 잡아두면 아침에 따로 손댈 게 없어요' },
          match: 'natural',
          clash: 'detail',
          char: { brow: 'straight', thick: 'mid', eyes: 'round', mouth: 'small', hair: 'buzz', ears: 'none', acc: 'none', prop: 'coffee', color: 'sky' }
        },
        {
          id: 'rookie',
          name: '그루밍 입문자',
          en: 'Grooming Rookie',
          tagline: '나를 가꾸는 즐거움을 알아가는 중',
          tags: ['#그루밍입문', '#성장중', '#열정'],
          desc: '이제 막 나를 가꾸는 즐거움에 눈뜬 성장형이에요. 영상을 보며 하나씩 따라 해보는 열정이 있어요. 작은 변화에도 달라진 인상을 금방 느껴요.',
          points: ['눈썹 정리부터 시작해 보기', '눈썹 브러시 하나 장만하기', '거울 보며 좌우 균형 체크'],
          service: { name: '눈썹 컨설팅 · 정리', why: '1:1 맞춤 상담으로 내 얼굴형에 맞는 눈썹부터 찾아요' },
          match: 'detail',
          clash: 'natural',
          char: { brow: 'soft-arch', thick: 'thin', eyes: 'sparkle', mouth: 'open', hair: 'comma', ears: 'none', acc: 'none', prop: 'sparkle', color: 'butter' }
        },
        {
          id: 'detail',
          name: '디테일 장인',
          en: 'Detail Master',
          tagline: '머리부터 눈썹까지 빈틈없이',
          tags: ['#디테일', '#완벽주의', '#자기관리'],
          desc: '작은 차이가 인상을 바꾼다는 걸 아는 디테일 장인이에요. 헤어와 피부, 눈썹까지 하나도 대충 넘기지 않아요. 꼼꼼한 관리가 자신감의 바탕이에요.',
          points: ['눈썹 산 위치를 일정하게', '그레이 브라운으로 빈 곳 채우기', '아래 라인 잔털은 깔끔하게'],
          service: { name: '콤보 · 섀도우 눈썹', why: '결과 음영을 함께 넣어 매일 그린 듯 정돈된 눈썹이에요' },
          match: 'rookie',
          clash: 'allinone',
          char: { brow: 'angled', thick: 'bold', eyes: 'sharp', mouth: 'smirk', hair: 'short', ears: 'none', acc: 'glasses', prop: 'star', color: 'cocoa' }
        },
        {
          id: 'natural',
          name: '자연인 그대로',
          en: 'Born Natural',
          tagline: '꾸미지 않아도 나다운 사람',
          tags: ['#자연스러움', '#편안함', '#마이웨이'],
          desc: '꾸미는 것보다 편안함을 먼저 챙기는 자유로운 사람이에요. 자연스러운 모습이 가장 나답다고 생각해요. 손대지 않은 듯한 깔끔함이 잘 어울려요.',
          points: ['결 방향대로 손으로 쓸어주기', '숱이 빈 곳만 자연스럽게 채우기', '세안 후 수분크림은 챙기기'],
          service: { name: '페더링 눈썹', why: '티 나지 않게 결만 더해 원래 내 눈썹처럼 자연스러워요' },
          match: 'allinone',
          clash: 'rookie',
          char: { brow: 'up', thick: 'bold', eyes: 'smile', mouth: 'smile', hair: 'perm', ears: 'none', acc: 'none', prop: 'leaf', color: 'sage' }
        }
      ]
    }
  }
];
