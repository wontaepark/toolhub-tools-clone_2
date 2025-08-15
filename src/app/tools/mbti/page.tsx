'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  RotateCcw, 
  Share2, 
  Users, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Lightbulb,
  ChevronLeft,
  Brain,
  Star,
  Heart,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { questions, mbtiResults, type MBTIResult } from '@/lib/mbti-data';

interface TestStyle {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const testStyles: TestStyle[] = [
  {
    id: 'classic',
    name: '클래식 스타일',
    description: '전통적인 MBTI 질문으로 정확한 성격 유형을 측정합니다',
    icon: <Brain className="h-6 w-6" />,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'modern',
    name: '모던 스타일',
    description: '현대적인 상황에 맞춘 실용적인 질문들입니다',
    icon: <Star className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'relationship',
    name: '관계 스타일',
    description: '인간관계와 소통에 초점을 맞춘 질문들입니다',
    icon: <Heart className="h-6 w-6" />,
    color: 'from-pink-500 to-red-600'
  },
  {
    id: 'career',
    name: '직업 스타일',
    description: '직업과 업무 환경에 특화된 질문들입니다',
    icon: <Target className="h-6 w-6" />,
    color: 'from-green-500 to-blue-600'
  }
];

export default function MBTIPage() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });

  const currentQuestions = selectedStyle ? questions[selectedStyle] : [];
  const progress = currentQuestions.length > 0 ? ((currentQuestion + 1) / currentQuestions.length) * 100 : 0;

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  };

  const handleAnswer = (choiceIndex: number) => {
    const question = currentQuestions[currentQuestion];
    if (!question) return;

    const newAnswers = { ...answers, [question.id]: choiceIndex };
    setAnswers(newAnswers);

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    const newScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    currentQuestions.forEach(question => {
      const answer = finalAnswers[question.id];
      if (answer !== undefined) {
        // 1 = 동의 (question weight), 2 = 반대 (opposite weight)
        if (answer === 1) {
          newScores[question.weight]++;
        } else if (answer === 2) {
          // 반대 성향에 점수 추가
          const opposites = {
            'E': 'I', 'I': 'E',
            'S': 'N', 'N': 'S',
            'T': 'F', 'F': 'T',
            'J': 'P', 'P': 'J'
          };
          const oppositeWeight = opposites[question.weight] as keyof typeof newScores;
          newScores[oppositeWeight]++;
        }
      }
    });

    setScores(newScores);

    // MBTI 유형 결정
    const mbtiType = [
      newScores.E > newScores.I ? 'E' : 'I',
      newScores.S > newScores.N ? 'S' : 'N',
      newScores.T > newScores.F ? 'T' : 'F',
      newScores.J > newScores.P ? 'J' : 'P'
    ].join('');

    const mbtiResult = mbtiResults[mbtiType];
    setResult(mbtiResult);
    setShowResult(true);
  };

  const resetTest = () => {
    setSelectedStyle(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  };

  const shareResult = () => {
    if (result) {
      const text = `나의 MBTI 유형은 ${result.type} (${result.name})입니다! ToolHub.tools에서 테스트해보세요.`;
      const url = 'https://toolhub.tools/tools/mbti';
      
      if (navigator.share) {
        navigator.share({
          title: 'MBTI 테스트 결과',
          text: text,
          url: url
        });
      } else {
        navigator.clipboard.writeText(`${text} ${url}`);
        alert('결과가 클립보드에 복사되었습니다!');
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 스타일 선택 화면
  if (!selectedStyle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              홈으로 돌아가기
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              MBTI 성격유형 테스트
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              4가지 스타일로 나만의 성격을 알아보세요! 정확하고 재미있는 MBTI 테스트를 통해 
              당신의 성격 유형을 발견해보세요.
              </p>
            </div>

          {/* 테스트 스타일 선택 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {testStyles.map((style) => (
              <Card
                key={style.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300"
                onClick={() => handleStyleSelect(style.id)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${style.color} text-white`}>
                      {style.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{style.name}</CardTitle>
                      <p className="text-gray-600 text-sm">{style.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* 특징 설명 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">정확한 결과</h3>
              <p className="text-gray-600 text-sm">과학적으로 검증된 MBTI 이론을 바탕으로 정확한 성격 유형을 측정합니다.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">다양한 스타일</h3>
              <p className="text-gray-600 text-sm">4가지 다른 스타일의 질문으로 다양한 관점에서 성격을 분석합니다.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">상세한 분석</h3>
              <p className="text-gray-600 text-sm">성격 유형별 상세한 설명과 특징, 직업 추천까지 제공합니다.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 테스트 진행 화면
  if (!showResult && selectedStyle) {
    const currentQ = currentQuestions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={resetTest} className="text-gray-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                스타일 선택으로
              </Button>
              <div className="text-sm text-gray-500">
                {currentQuestion + 1} / {currentQuestions.length}
              </div>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {testStyles.find(s => s.id === selectedStyle)?.name}
            </h2>
          </div>

          {/* 질문 카드 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                {currentQ?.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  onClick={() => handleAnswer(1)}
                  className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  동의합니다
                </Button>
                <Button
                  onClick={() => handleAnswer(2)}
                  className="w-full h-16 text-lg bg-gray-600 hover:bg-gray-700"
                >
                  반대합니다
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 네비게이션 */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              이전
            </Button>
            <Button
              variant="outline"
              onClick={resetTest}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              다시 시작
            </Button>
          </div>
          </div>
        </div>
    );
  }

  // 결과 화면
  if (showResult && result) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <Button variant="ghost" onClick={resetTest} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              다시 테스트하기
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">테스트 결과</h1>
          </div>

          {/* 결과 카드 */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="mb-4">
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  {result.type}
                </Badge>
              </div>
              <CardTitle className="text-2xl mb-2">{result.name}</CardTitle>
              <p className="text-gray-600">{result.description}</p>
            </CardHeader>
            <CardContent>
              {/* 성향 점수 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">외향성 (E)</div>
                  <div className="text-lg font-bold text-blue-600">{scores.E}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">내향성 (I)</div>
                  <div className="text-lg font-bold text-blue-600">{scores.I}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">감각 (S)</div>
                  <div className="text-lg font-bold text-green-600">{scores.S}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">직관 (N)</div>
                  <div className="text-lg font-bold text-green-600">{scores.N}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">사고 (T)</div>
                  <div className="text-lg font-bold text-purple-600">{scores.T}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">감정 (F)</div>
                  <div className="text-lg font-bold text-purple-600">{scores.F}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">판단 (J)</div>
                  <div className="text-lg font-bold text-orange-600">{scores.J}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">인식 (P)</div>
                  <div className="text-lg font-bold text-orange-600">{scores.P}</div>
                </div>
              </div>

              {/* 특징 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">주요 특징</h3>
                <div className="flex flex-wrap gap-2">
                  {result.traits.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 장단점 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">강점</h3>
                  <ul className="space-y-2">
                    {result.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">개선점</h3>
                  <ul className="space-y-2">
                    {result.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <HelpCircle className="h-4 w-4 text-red-600 mr-2" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 직업 추천 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">추천 직업</h3>
                <div className="flex flex-wrap gap-2">
                  {result.careerSuggestions.map((career, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {career}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 유명인 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">같은 유형의 유명인</h3>
                <div className="flex flex-wrap gap-2">
                  {result.famousPeople.map((person, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {person}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={shareResult} className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  결과 공유하기
                </Button>
                <Button variant="outline" onClick={resetTest} className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  다시 테스트하기
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 추가 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <CardTitle className="text-lg">MBTI란?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Myers-Briggs Type Indicator의 약자로, 개인의 성격 유형을 16가지로 분류하는 성격 유형 검사입니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">전 세계 사용자</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  전 세계적으로 가장 널리 사용되는 성격 유형 검사 중 하나로, 개인과 조직의 성장에 활용됩니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">과학적 근거</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  카를 융의 심리유형론을 바탕으로 개발되었으며, 지속적인 연구와 검증을 통해 신뢰성을 확보했습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
  }

  return null;
}