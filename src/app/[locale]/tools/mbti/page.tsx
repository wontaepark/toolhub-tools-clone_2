'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Share2, CheckCircle } from 'lucide-react';
import { questions, mbtiResults, type MBTIResult } from '@/lib/mbti-data';

type Answer = 1 | 2 | 3 | 4 | 5; // 1: 전혀 아니다, 5: 매우 그렇다

export default function MBTITest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [testType, setTestType] = useState<'classic' | 'modern' | 'relationship' | 'career'>('classic');
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const currentQuestions = questions[testType];
  const totalQuestions = currentQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // MBTI 결과 계산
  const calculateMBTI = () => {
    const scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    currentQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        // 5점 척도를 점수로 변환 (1=0점, 2=1점, 3=2점, 4=3점, 5=4점)
        const score = answer - 1;
        scores[question.weight] += score;
      }
    });

    // 각 차원에서 우세한 성향 결정
    const mbtiType = 
      (scores.E >= scores.I ? 'E' : 'I') +
      (scores.S >= scores.N ? 'S' : 'N') +
      (scores.T >= scores.F ? 'T' : 'F') +
      (scores.J >= scores.P ? 'J' : 'P');

    return mbtiResults[mbtiType] || mbtiResults['ISFP']; // 기본값
  };

  // 답변 선택
  const selectAnswer = (answer: Answer) => {
    setAnswers({ ...answers, [currentQuestions[currentQuestionIndex].id]: answer });
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      // 테스트 완료
      setTimeout(() => {
        const mbtiResult = calculateMBTI();
        setResult(mbtiResult);
        setIsComplete(true);
      }, 300);
    }
  };

  // 이전 질문으로
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 테스트 다시 시작
  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsComplete(false);
    setResult(null);
    setShowIntro(true);
  };

  // 테스트 시작
  const startTest = () => {
    setShowIntro(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsComplete(false);
    setResult(null);
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>돌아가기</span>
              </Link>
              
              <h1 className="text-xl font-bold text-white">
                MBTI 성격 유형 테스트
              </h1>
              
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        {/* 인트로 화면 */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">MBTI 성격 유형 테스트</h2>
              <p className="text-gray-400 text-lg">
                16가지 성격 유형 중 나의 유형을 정확하게 분석해보세요
              </p>
            </div>

            {/* 테스트 유형 선택 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
              <h3 className="text-lg font-bold mb-4">테스트 유형을 선택하세요</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setTestType('classic')}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    testType === 'classic' 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold mb-2">클래식 테스트</div>
                  <div className="text-sm opacity-80">기본적인 MBTI 질문 (16문항)</div>
                </button>
                
                <button
                  onClick={() => setTestType('modern')}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    testType === 'modern' 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold mb-2">현대적 테스트</div>
                  <div className="text-sm opacity-80">현대 사회에 맞춘 질문 (8문항)</div>
                </button>
                
                <button
                  onClick={() => setTestType('relationship')}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    testType === 'relationship' 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold mb-2">인간관계 테스트</div>
                  <div className="text-sm opacity-80">대인관계 중심 질문 (8문항)</div>
                </button>
                
                <button
                  onClick={() => setTestType('career')}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    testType === 'career' 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold mb-2">직업 적성 테스트</div>
                  <div className="text-sm opacity-80">직업 선택 중심 질문 (8문항)</div>
                </button>
              </div>
            </div>

            <button
              onClick={startTest}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
            >
              테스트 시작하기 →
            </button>

            <div className="mt-8 text-sm text-gray-400">
              <p>• 정확한 결과를 위해 솔직하게 답변해 주세요</p>
              <p>• 테스트는 약 3-5분 소요됩니다</p>
              <p>• 결과는 16가지 성격 유형 중 하나로 분류됩니다</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete && result) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>돌아가기</span>
              </Link>
              
              <h1 className="text-xl font-bold text-white">
                MBTI 테스트 결과
              </h1>
              
              <button
                onClick={restartTest}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>다시 테스트</span>
              </button>
            </div>
          </div>
        </header>

        {/* 결과 화면 */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* 메인 결과 */}
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">{result.type}</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">{result.name}</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {result.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 주요 특성 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  주요 특성
                </h3>
                <div className="space-y-2">
                  {result.traits.map((trait, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-300">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 장점 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  장점
                </h3>
                <div className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 약점 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                  개선점
                </h3>
                <div className="space-y-2">
                  {result.weaknesses.map((weakness, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-300">{weakness}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 추천 직업 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  추천 직업
                </h3>
                <div className="space-y-2">
                  {result.careerSuggestions.map((career, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 유명인 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-8">
              <h3 className="text-lg font-bold mb-4">같은 유형의 유명인</h3>
              <div className="flex flex-wrap gap-2">
                {result.famousPeople.map((person, index) => (
                  <span 
                    key={index}
                    className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-600/30"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={restartTest}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>다시 테스트</span>
              </button>
              
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `나의 MBTI는 ${result.type}`,
                      text: `${result.name} - ${result.description}`,
                      url: window.location.href
                    });
                  }
                }}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>결과 공유</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>돌아가기</span>
            </Link>
            
            <h1 className="text-xl font-bold text-white">
              MBTI 성격 유형 테스트
            </h1>
            
            <button
              onClick={restartTest}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>처음부터</span>
            </button>
          </div>
        </div>
      </header>

      {/* 진행률 바 */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              질문 {currentQuestionIndex + 1} / {totalQuestions}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(progress)}% 완료
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 질문 화면 */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          
          {/* 질문 */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              {currentQuestions[currentQuestionIndex].text}
            </h2>

            {/* 답변 선택지 */}
            <div className="space-y-3">
              {[
                { value: 1, text: '전혀 아니다', color: 'bg-red-600' },
                { value: 2, text: '아니다', color: 'bg-orange-600' },
                { value: 3, text: '보통이다', color: 'bg-gray-600' },
                { value: 4, text: '그렇다', color: 'bg-blue-600' },
                { value: 5, text: '매우 그렇다', color: 'bg-green-600' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => selectAnswer(option.value as Answer)}
                  className={`w-full p-4 rounded-lg border transition-all text-left hover:bg-gray-700 ${
                    answers[currentQuestions[currentQuestionIndex].id] === option.value
                      ? `${option.color} border-gray-500 text-white`
                      : 'bg-gray-700 border-gray-600 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.text}</span>
                    <div className={`w-4 h-4 rounded-full ${option.color} opacity-70`}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex justify-between">
            <button
              onClick={goToPrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentQuestionIndex === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>이전</span>
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-400">
                {answers[currentQuestions[currentQuestionIndex].id] ? '답변 완료' : '답변을 선택해주세요'}
              </div>
            </div>

            <div className="w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}