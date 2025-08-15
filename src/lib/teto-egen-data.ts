export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    weight: 'T' | 'E'; // T for 테토, E for 에겐
    intensity: number; // 1-3 강도
  }[];
}

export interface TestResult {
  type: 'TETO_MALE' | 'TETO_FEMALE' | 'EGEN_MALE' | 'EGEN_FEMALE';
  title: string;
  subtitle: string;
  description: string;
  personality: string[];
  loveStyle: string;
  compatibility: {
    best: string;
    avoid: string;
  };
  percentage: number;
  emoji: string;
  shareText: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "새로운 사람을 만날 때 나는?",
    options: [
      { text: "적극적으로 대화를 이끌어간다", weight: 'T', intensity: 3 },
      { text: "상대방이 먼저 말을 걸어주기를 기다린다", weight: 'E', intensity: 2 }
    ]
  },
  {
    id: 2,
    text: "친구들과 놀 때 나는?",
    options: [
      { text: "분위기를 띄우는 역할을 맡는다", weight: 'T', intensity: 3 },
      { text: "조용히 즐기며 다른 사람들을 관찰한다", weight: 'E', intensity: 2 }
    ]
  },
  {
    id: 3,
    text: "스트레스를 받았을 때 나는?",
    options: [
      { text: "친구들에게 털어놓고 위로받는다", weight: 'T', intensity: 2 },
      { text: "혼자만의 시간을 가지며 정리한다", weight: 'E', intensity: 3 }
    ]
  },
  {
    id: 4,
    text: "연애할 때 나는?",
    options: [
      { text: "적극적으로 애정을 표현한다", weight: 'T', intensity: 3 },
      { text: "조용히 깊이 있는 사랑을 나눈다", weight: 'E', intensity: 2 }
    ]
  },
  {
    id: 5,
    text: "소셜미디어에서 나는?",
    options: [
      { text: "자주 업데이트하고 적극적으로 소통한다", weight: 'T', intensity: 2 },
      { text: "가끔씩만 올리고 조용히 지켜본다", weight: 'E', intensity: 3 }
    ]
  },
  {
    id: 6,
    text: "결정을 내릴 때 나는?",
    options: [
      { text: "직감과 감정에 따라 빠르게 결정한다", weight: 'T', intensity: 2 },
      { text: "신중하게 생각하고 분석한 후 결정한다", weight: 'E', intensity: 3 }
    ]
  },
  {
    id: 7,
    text: "연예인을 좋아할 때 나는?",
    options: [
      { text: "팬카페 활동과 굿즈 수집을 한다", weight: 'T', intensity: 2 },
      { text: "조용히 응원하며 작품을 감상한다", weight: 'E', intensity: 2 }
    ]
  },
  {
    id: 8,
    text: "친구의 생일파티에서 나는?",
    options: [
      { text: "분위기 메이커 역할을 자처한다", weight: 'T', intensity: 3 },
      { text: "조용히 축하해주고 즐긴다", weight: 'E', intensity: 2 }
    ]
  },
  {
    id: 9,
    text: "이별 후 나는?",
    options: [
      { text: "감정을 표현하며 주변에 의지한다", weight: 'T', intensity: 2 },
      { text: "혼자서 조용히 극복한다", weight: 'E', intensity: 3 }
    ]
  },
  {
    id: 10,
    text: "새로운 취미를 시작할 때 나는?",
    options: [
      { text: "친구들과 함께 시작하고 싶다", weight: 'T', intensity: 2 },
      { text: "혼자서 차근차근 배우고 싶다", weight: 'E', intensity: 2 }
    ]
  }
];

export const results: Record<string, TestResult> = {
  TETO_MALE: {
    type: 'TETO_MALE',
    title: '테토남',
    subtitle: '조용한 매력의 소유자',
    description: '차분하고 신중한 성격으로 깊이 있는 대화를 좋아하는 당신. 겉으로는 조용해 보이지만 속에는 따뜻한 마음을 품고 있어요. 진짜 친해지면 의외로 재미있고 다정한 면을 보여주는 반전 매력의 소유자입니다.',
    personality: ['내향적', '신중함', '깊이 있음', '진정성', '안정감'],
    loveStyle: '천천히 마음을 열지만 한번 사랑하면 진심으로 대해주는 스타일. 화려한 이벤트보다는 소소하지만 의미 있는 시간을 함께 보내는 것을 좋아해요.',
    compatibility: {
      best: '에겐녀',
      avoid: '테토녀'
    },
    percentage: 25,
    emoji: '🌟',
    shareText: '나는 테토남! 조용한 매력의 소유자예요 💫'
  },
  TETO_FEMALE: {
    type: 'TETO_FEMALE',
    title: '테토녀',
    subtitle: '애교 많고 표현력 풍부한 사랑둥이',
    description: '애교가 많고 감정 표현이 자유로운 당신. 사랑을 할 때 적극적으로 애정을 표현하고, 연인과의 시간을 소중히 여겨요. 때로는 과도한 애정 표현으로 상대방을 당황시키기도 하지만, 진심 어린 마음이 전해져 더욱 사랑받는 타입입니다.',
    personality: ['애교가 많음', '감정 표현이 자유로움', '다정함', '친화력 좋음', '로맨틱함'],
    loveStyle: '적극적으로 애정을 표현하고 연인과의 모든 순간을 특별하게 만들어주는 스타일. 때로는 과도한 애정 표현으로 상대방을 당황시키기도 해요.',
    compatibility: {
      best: '에겐남',
      avoid: '테토남'
    },
    percentage: 30,
    emoji: '💖',
    shareText: '나는 테토녀! 애교 많고 표현력 풍부한 사랑둥이예요 💕'
  },
  EGEN_MALE: {
    type: 'EGEN_MALE',
    title: '에겐남',
    subtitle: '차분하고 신중한 깊이 있는 남성',
    description: '차분하고 신중한 성격으로 깊이 있는 사고를 하는 당신. 감정 표현에 서툴 수 있지만, 한번 마음을 열면 진심 어린 사랑을 나누는 타입입니다. 안정감 있고 믿음직한 연인으로서 상대방에게 큰 안정감을 제공해요.',
    personality: ['차분함', '신중함', '깊이 있는 사고', '안정감', '믿음직함'],
    loveStyle: '천천히 마음을 열고 깊이 있는 사랑을 나누는 스타일. 화려한 표현보다는 진심 어린 행동으로 사랑을 표현해요.',
    compatibility: {
      best: '테토녀',
      avoid: '에겐녀'
    },
    percentage: 20,
    emoji: '🌙',
    shareText: '나는 에겐남! 차분하고 신중한 깊이 있는 남성이에요 🌙'
  },
  EGEN_FEMALE: {
    type: 'EGEN_FEMALE',
    title: '에겐녀',
    subtitle: '독립적이고 쿨한 매력의 여성',
    description: '독립적이고 쿨한 매력을 가진 당신. 감정 표현에 서툴 수 있지만, 한번 마음을 열면 진심 어린 사랑을 나누는 타입입니다. 개성 있고 현실적인 연인으로서 상대방에게 새로운 시각을 제공해요.',
    personality: ['독립적', '쿨한 매력', '현실적', '개성 있음', '자신감'],
    loveStyle: '독립적이면서도 진심 어린 사랑을 나누는 스타일. 과도한 애정 표현보다는 진정성 있는 행동으로 사랑을 표현해요.',
    compatibility: {
      best: '테토남',
      avoid: '에겐남'
    },
    percentage: 25,
    emoji: '✨',
    shareText: '나는 에겐녀! 독립적이고 쿨한 매력의 여성이에요 ✨'
  }
};
