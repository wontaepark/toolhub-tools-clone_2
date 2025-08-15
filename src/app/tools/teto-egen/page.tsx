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
  Heart, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Lightbulb,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { questions, results, type Question, type TestResult } from '@/lib/teto-egen-data';

export default function TetoEgenPage() {
  const [step, setStep] = useState<'gender' | 'test' | 'result'>('gender');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<TestResult | null>(null);

  const progress = step === 'test' ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const handleGenderSelect = (selectedGender: 'male' | 'female') => {
    setGender(selectedGender);
    setStep('test');
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    let tetoScore = 0;
    let egenScore = 0;

    questions.forEach((question, index) => {
      const answerIndex = finalAnswers[index];
      if (answerIndex !== undefined) {
        const selectedOption = question.options[answerIndex];
        if (selectedOption.weight === 'T') {
          tetoScore += selectedOption.intensity;
        } else {
          egenScore += selectedOption.intensity;
        }
      }
    });

    let resultType: string;
    if (tetoScore > egenScore) {
      resultType = gender === 'male' ? 'TETO_MALE' : 'TETO_FEMALE';
    } else {
      resultType = gender === 'male' ? 'EGEN_MALE' : 'EGEN_FEMALE';
    }

    setResult(results[resultType]);
    setStep('result');
  };

  const resetTest = () => {
    setStep('gender');
    setGender(null);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const shareResult = () => {
    if (result) {
      const text = `${result.shareText} ToolHub.tools에서 테스트해보세요!`;
      const url = 'https://toolhub.tools/tools/teto-egen';
      
      if (navigator.share) {
        navigator.share({
          title: '테토-애겐 테스트 결과',
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

  // 성별 선택 화면
  if (step === 'gender') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              홈으로 돌아가기
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
              테토-애겐 성격유형 테스트
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              화제의 테토-애겐 테스트! 당신은 테토형인가요, 애겐형인가요? 
              성별을 선택하고 테스트를 시작해보세요.
            </p>
          </div>

          {/* 성별 선택 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-red-300 text-center"
              onClick={() => handleGenderSelect('male')}
            >
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                    👨
                  </div>
                </div>
                <CardTitle className="text-2xl">남성</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">남성용 테토-애겐 테스트를 시작합니다</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-pink-300 text-center"
              onClick={() => handleGenderSelect('female')}
            >
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl">
                    👩
                  </div>
                </div>
                <CardTitle className="text-2xl">여성</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">여성용 테토-애겐 테스트를 시작합니다</p>
              </CardContent>
            </Card>
          </div>

          {/* 특징 설명 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">테토형</h3>
              <p className="text-gray-600 text-sm">애교 많고 표현력 풍부한 사랑둥이 타입</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">애겐형</h3>
              <p className="text-gray-600 text-sm">차분하고 신중한 깊이 있는 타입</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="font-semibold mb-2">궁합 분석</h3>
              <p className="text-gray-600 text-sm">테토형과 애겐형의 완벽한 궁합 분석</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 테스트 진행 화면
  if (step === 'test') {
    const currentQ = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={resetTest} className="text-gray-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                성별 선택으로
              </Button>
              <div className="text-sm text-gray-500">
                {currentQuestion + 1} / {questions.length}
              </div>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              테토-애겐 성격유형 테스트
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
                {currentQ?.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full h-16 text-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                  >
                    {option.text}
                  </Button>
                ))}
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
  if (step === 'result' && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 py-8 px-4">
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
                <div className="text-6xl mb-4">{result.emoji}</div>
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white">
                  {result.title}
                </Badge>
              </div>
              <CardTitle className="text-2xl mb-2">{result.subtitle}</CardTitle>
              <p className="text-gray-600">{result.description}</p>
            </CardHeader>
            <CardContent>
              {/* 성향 점수 */}
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-1">이 유형의 분포</div>
                <div className="text-2xl font-bold text-red-600">{result.percentage}%</div>
              </div>

              {/* 성격 특성 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">성격 특성</h3>
                <div className="flex flex-wrap gap-2">
                  {result.personality.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 연애 스타일 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">연애 스타일</h3>
                <p className="text-gray-600">{result.loveStyle}</p>
              </div>

              {/* 궁합 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">최고 궁합</h3>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-green-600" />
                    <span className="text-lg font-medium">{result.compatibility.best}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">피해야 할 궁합</h3>
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-red-600" />
                    <span className="text-lg font-medium">{result.compatibility.avoid}</span>
                  </div>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={shareResult} className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
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
                  <CardTitle className="text-lg">테토-애겐이란?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  최근 소셜미디어에서 화제가 되고 있는 성격유형 테스트로, 테토형과 애겐형으로 나누어 분석합니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">궁합 분석</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  테토형과 애겐형의 특성을 바탕으로 한 정확한 궁합 분석을 제공합니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">성격 분석</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  각 유형별 상세한 성격 특성과 연애 스타일을 분석하여 제공합니다.
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