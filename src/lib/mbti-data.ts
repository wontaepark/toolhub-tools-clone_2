export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  weight: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

export interface MBTIResult {
  type: string;
  name: string;
  description: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  careerSuggestions: string[];
  famousPeople: string[];
}

export const questions: Record<string, Question[]> = {
  classic: [
    {
      id: 1,
      text: "새로운 사람들과 만나는 것이 즐겁다",
      dimension: 'EI',
      weight: 'E'
    },
    {
      id: 2,
      text: "혼자 있는 시간이 필요하다",
      dimension: 'EI',
      weight: 'I'
    },
    {
      id: 3,
      text: "구체적인 사실과 세부사항에 집중한다",
      dimension: 'SN',
      weight: 'S'
    },
    {
      id: 4,
      text: "미래의 가능성과 아이디어를 생각한다",
      dimension: 'SN',
      weight: 'N'
    },
    {
      id: 5,
      text: "논리적이고 객관적으로 판단한다",
      dimension: 'TF',
      weight: 'T'
    },
    {
      id: 6,
      text: "감정과 가치를 중요하게 여긴다",
      dimension: 'TF',
      weight: 'F'
    },
    {
      id: 7,
      text: "계획을 세우고 체계적으로 일한다",
      dimension: 'JP',
      weight: 'J'
    },
    {
      id: 8,
      text: "즉흥적이고 유연하게 대응한다",
      dimension: 'JP',
      weight: 'P'
    },
    {
      id: 9,
      text: "사람들과 함께 있을 때 에너지를 얻는다",
      dimension: 'EI',
      weight: 'E'
    },
    {
      id: 10,
      text: "혼자 있을 때 에너지를 충전한다",
      dimension: 'EI',
      weight: 'I'
    },
    {
      id: 11,
      text: "실용적이고 현실적인 해결책을 선호한다",
      dimension: 'SN',
      weight: 'S'
    },
    {
      id: 12,
      text: "창의적이고 혁신적인 아이디어를 선호한다",
      dimension: 'SN',
      weight: 'N'
    },
    {
      id: 13,
      text: "공정하고 일관된 기준을 적용한다",
      dimension: 'TF',
      weight: 'T'
    },
    {
      id: 14,
      text: "개인의 상황과 감정을 고려한다",
      dimension: 'TF',
      weight: 'F'
    },
    {
      id: 15,
      text: "마감일을 지키는 것이 중요하다",
      dimension: 'JP',
      weight: 'J'
    },
    {
      id: 16,
      text: "자유롭게 일할 수 있는 환경을 선호한다",
      dimension: 'JP',
      weight: 'P'
    }
  ],
  modern: [
    {
      id: 17,
      text: "소셜미디어에서 적극적으로 소통한다",
      dimension: 'EI',
      weight: 'E'
    },
    {
      id: 18,
      text: "개인적인 공간에서 충분히 쉬고 싶다",
      dimension: 'EI',
      weight: 'I'
    },
    {
      id: 19,
      text: "데이터와 통계를 신뢰한다",
      dimension: 'SN',
      weight: 'S'
    },
    {
      id: 20,
      text: "직감과 영감을 따른다",
      dimension: 'SN',
      weight: 'N'
    },
    {
      id: 21,
      text: "효율성과 성과를 우선시한다",
      dimension: 'TF',
      weight: 'T'
    },
    {
      id: 22,
      text: "팀워크와 협력을 중시한다",
      dimension: 'TF',
      weight: 'F'
    },
    {
      id: 23,
      text: "정해진 규칙과 절차를 따른다",
      dimension: 'JP',
      weight: 'J'
    },
    {
      id: 24,
      text: "새로운 방법을 시도하는 것을 좋아한다",
      dimension: 'JP',
      weight: 'P'
    }
  ],
  relationship: [
    {
      id: 25,
      text: "다른 사람의 이야기를 잘 들어주는 편이다",
      dimension: 'EI',
      weight: 'E'
    },
    {
      id: 26,
      text: "깊이 있는 대화를 나누는 것을 좋아한다",
      dimension: 'EI',
      weight: 'I'
    },
    {
      id: 27,
      text: "구체적인 조언을 해주는 편이다",
      dimension: 'SN',
      weight: 'S'
    },
    {
      id: 28,
      text: "새로운 관점을 제시해주는 편이다",
      dimension: 'SN',
      weight: 'N'
    },
    {
      id: 29,
      text: "문제를 해결하는 데 도움을 준다",
      dimension: 'TF',
      weight: 'T'
    },
    {
      id: 30,
      text: "감정적 지지를 해주는 편이다",
      dimension: 'TF',
      weight: 'F'
    },
    {
      id: 31,
      text: "약속을 잘 지키는 편이다",
      dimension: 'JP',
      weight: 'J'
    },
    {
      id: 32,
      text: "즉흥적인 만남을 즐기는 편이다",
      dimension: 'JP',
      weight: 'P'
    }
  ],
  career: [
    {
      id: 33,
      text: "팀 프로젝트에서 활발하게 참여한다",
      dimension: 'EI',
      weight: 'E'
    },
    {
      id: 34,
      text: "독립적으로 일하는 것을 선호한다",
      dimension: 'EI',
      weight: 'I'
    },
    {
      id: 35,
      text: "세부사항을 놓치지 않고 처리한다",
      dimension: 'SN',
      weight: 'S'
    },
    {
      id: 36,
      text: "새로운 아이디어를 제안하는 편이다",
      dimension: 'SN',
      weight: 'N'
    },
    {
      id: 37,
      text: "객관적인 분석을 바탕으로 결정한다",
      dimension: 'TF',
      weight: 'T'
    },
    {
      id: 38,
      text: "동료들의 의견을 고려하여 결정한다",
      dimension: 'TF',
      weight: 'F'
    },
    {
      id: 39,
      text: "계획을 세우고 체계적으로 진행한다",
      dimension: 'JP',
      weight: 'J'
    },
    {
      id: 40,
      text: "상황에 따라 유연하게 대응한다",
      dimension: 'JP',
      weight: 'P'
    }
  ]
};

export const mbtiResults: Record<string, MBTIResult> = {
  'ISTJ': {
    type: 'ISTJ',
    name: '청렴결백한 논리주의자',
    description: '사실에 근거하여 사고하며, 매사에 철저하고 신중한 성격',
    traits: ['신뢰할 수 있음', '책임감이 강함', '실용적', '체계적'],
    strengths: ['신뢰성', '조직력', '실용성', '일관성'],
    weaknesses: ['유연성 부족', '감정 표현 어려움', '변화 싫어함'],
    careerSuggestions: ['회계사', '법무사', '군인', '경찰', '행정직'],
    famousPeople: ['조지 워싱턴', '엘리자베스 2세', '나탈리 포트만']
  },
  'ISFJ': {
    type: 'ISFJ',
    name: '용감한 수호자',
    description: '차분하고 헌신적이며 따뜻한 방어자',
    traits: ['헌신적', '따뜻함', '책임감', '인내심'],
    strengths: ['헌신성', '실용성', '동정심', '신뢰성'],
    weaknesses: ['자신감 부족', '변화 싫어함', '갈등 회피'],
    careerSuggestions: ['간호사', '교사', '상담사', '사서', '행정직'],
    famousPeople: ['케이트 미들턴', '브리트니 스피어스', '빈센트 반 고흐']
  },
  'INFJ': {
    type: 'INFJ',
    name: '통찰력 있는 선지자',
    description: '인내심이 많고 통찰력이 뛰어나며 화합을 추구하는 성격',
    traits: ['이상주의적', '창의적', '공감능력', '통찰력'],
    strengths: ['창의성', '공감능력', '결단력', '이상주의'],
    weaknesses: ['완벽주의', '민감함', '갈등 싫어함'],
    careerSuggestions: ['작가', '상담사', '교사', '심리학자', '예술가'],
    famousPeople: ['마틴 루터 킹', '넬슨 만델라', '레오나르도 다빈치']
  },
  'INTJ': {
    type: 'INTJ',
    name: '전략적인 설계자',
    description: '전략적 사고에 뛰어나며 모든 일에 체계적으로 접근하는 성격',
    traits: ['전략적', '독립적', '분석적', '완벽주의'],
    strengths: ['전략적 사고', '독립성', '분석력', '결단력'],
    weaknesses: ['고집스러움', '감정 표현 어려움', '타인과 거리감'],
    careerSuggestions: ['과학자', '엔지니어', '의사', '변호사', '경영자'],
    famousPeople: ['아인슈타인', '빌 게이츠', '마크 저커버그']
  },
  'ISTP': {
    type: 'ISTP',
    name: '만능 재주꾼',
    description: '논리적이고 실용적인 문제 해결사',
    traits: ['실용적', '논리적', '유연함', '독립적'],
    strengths: ['문제 해결 능력', '실용성', '유연성', '침착함'],
    weaknesses: ['장기 계획 어려움', '감정 표현 어려움', '규칙 싫어함'],
    careerSuggestions: ['기술자', '운동선수', '경찰', '파일럿', '건축가'],
    famousPeople: ['마이클 조던', '클린트 이스트우드', '스티브 잡스']
  },
  'ISFP': {
    type: 'ISFP',
    name: '모험을 즐기는 예술가',
    description: '따뜻한 감성을 지닌 모험가',
    traits: ['예술적', '따뜻함', '현실적', '충성심'],
    strengths: ['예술성', '공감능력', '실용성', '충성심'],
    weaknesses: ['계획성 부족', '갈등 회피', '자신감 부족'],
    careerSuggestions: ['예술가', '디자이너', '사진작가', '간호사', '요리사'],
    famousPeople: ['마이클 잭슨', '브래드 피트', '프리다 칼로']
  },
  'INFP': {
    type: 'INFP',
    name: '열정적인 중재자',
    description: '이상주의적이고 창의적이며 자신만의 가치관을 추구하는 성격',
    traits: ['이상주의적', '창의적', '공감능력', '개방적'],
    strengths: ['창의성', '공감능력', '열정', '개방성'],
    weaknesses: ['비현실적', '민감함', '결정 어려움'],
    careerSuggestions: ['작가', '상담사', '교사', '예술가', '심리학자'],
    famousPeople: ['윌리엄 셰익스피어', 'J.K. 롤링', '존 레논']
  },
  'INTP': {
    type: 'INTP',
    name: '논리적인 사색가',
    description: '지적 도전을 즐기며 논리적 분석에 뛰어난 성격',
    traits: ['논리적', '창의적', '독립적', '분석적'],
    strengths: ['논리적 사고', '창의성', '독립성', '분석력'],
    weaknesses: ['감정 표현 어려움', '실행력 부족', '사교성 부족'],
    careerSuggestions: ['과학자', '프로그래머', '철학자', '연구원', '교수'],
    famousPeople: ['아인슈타인', '아이작 뉴턴', '찰스 다윈']
  },
  'ESTP': {
    type: 'ESTP',
    name: '모험을 즐기는 사업가',
    description: '현실적이고 실용적이며 즉흥적인 성격',
    traits: ['실용적', '즉흥적', '활동적', '현실적'],
    strengths: ['실용성', '적응력', '문제 해결 능력', '활동성'],
    weaknesses: ['장기 계획 어려움', '감정적 민감성', '규칙 싫어함'],
    careerSuggestions: ['사업가', '운동선수', '경찰', '파일럿', '엔터테이너'],
    famousPeople: ['도널드 트럼프', '마돈나', '잭 니콜슨']
  },
  'ESFP': {
    type: 'ESFP',
    name: '자유로운 영혼의 연예인',
    description: '즉흥적이고 열정적이며 사교적인 성격',
    traits: ['열정적', '사교적', '즉흥적', '친근함'],
    strengths: ['사교성', '열정', '적응력', '낙관적'],
    weaknesses: ['계획성 부족', '집중력 부족', '감정적'],
    careerSuggestions: ['엔터테이너', '판매원', '이벤트 플래너', '요리사', '여행 가이드'],
    famousPeople: ['엘비스 프레슬리', '빌 클린턴', '제이미 올리버']
  },
  'ENFP': {
    type: 'ENFP',
    name: '재기발랄한 활동가',
    description: '열정적이고 창의적이며 사교적인 성격',
    traits: ['열정적', '창의적', '사교적', '이상주의적'],
    strengths: ['창의성', '열정', '사교성', '적응력'],
    weaknesses: ['집중력 부족', '감정적', '일상적 업무 싫어함'],
    careerSuggestions: ['기자', '교사', '상담사', '마케터', '예술가'],
    famousPeople: ['로빈 윌리엄스', '윌 스미스', '오프라 윈프리']
  },
  'ENTP': {
    type: 'ENTP',
    name: '논쟁을 즐기는 변론가',
    description: '지적 도전을 즐기며 창의적인 문제 해결사',
    traits: ['창의적', '논리적', '사교적', '도전적'],
    strengths: ['창의성', '논리적 사고', '적응력', '사교성'],
    weaknesses: ['감정적 민감성', '일상적 업무 싫어함', '고집스러움'],
    careerSuggestions: ['기업가', '변호사', '정치인', '마케터', '엔지니어'],
    famousPeople: ['토마스 에디슨', '마크 트웨인', '리처드 브랜슨']
  },
  'ESTJ': {
    type: 'ESTJ',
    name: '엄격한 관리자',
    description: '체계적이고 실용적이며 리더십이 있는 성격',
    traits: ['체계적', '실용적', '책임감', '리더십'],
    strengths: ['조직력', '결단력', '책임감', '실용성'],
    weaknesses: ['유연성 부족', '감정적 민감성', '고집스러움'],
    careerSuggestions: ['경영자', '군인', '경찰', '판사', '행정직'],
    famousPeople: ['조지 부시', '존 D. 록펠러', '미셸 오바마']
  },
  'ESFJ': {
    type: 'ESFJ',
    name: '사교적인 외교관',
    description: '동정심 많고 협력적이며 사교적인 성격',
    traits: ['사교적', '동정심', '협력적', '책임감'],
    strengths: ['사교성', '동정심', '협력성', '신뢰성'],
    weaknesses: ['갈등 회피', '변화 싫어함', '비판에 민감함'],
    careerSuggestions: ['교사', '간호사', '상담사', '인사담당자', '이벤트 플래너'],
    famousPeople: ['테일러 스위프트', '제니퍼 로페즈', '빌 클린턴']
  },
  'ENFJ': {
    type: 'ENFJ',
    name: '정의로운 사회운동가',
    description: '카리스마 있고 동정심 많으며 리더십이 있는 성격',
    traits: ['카리스마', '동정심', '리더십', '이상주의적'],
    strengths: ['리더십', '공감능력', '카리스마', '동정심'],
    weaknesses: ['완벽주의', '갈등 회피', '비판에 민감함'],
    careerSuggestions: ['교사', '상담사', '정치인', '인사담당자', '비영리단체 활동가'],
    famousPeople: ['마틴 루터 킹', '넬슨 만델라', '오프라 윈프리']
  },
  'ENTJ': {
    type: 'ENTJ',
    name: '대담한 통솔자',
    description: '대담하고 상상력이 풍부하며 강한 의지의 소유자',
    traits: ['대담함', '상상력', '강한 의지', '리더십'],
    strengths: ['리더십', '결단력', '전략적 사고', '자신감'],
    weaknesses: ['고집스러움', '감정적 민감성', '타인과 거리감'],
    careerSuggestions: ['경영자', '변호사', '정치인', '엔지니어', '컨설턴트'],
    famousPeople: ['마거릿 대처', '스티브 잡스', '고든 램지']
  }
};

