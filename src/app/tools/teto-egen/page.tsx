'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, RotateCcw, Heart, Star, Sparkles } from 'lucide-react';
import { questions, results, type Question, type TestResult } from '@/lib/teto-egen-data';

type Answer = 'T' | 'E'; // T: 테토, E: 에겐

export default function TetoEgenTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { weight: Answer, intensity: number }>>({});
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // 테토-에겐 결과 계산
  const calculateResult = () => {
    let tetoScore = 0;
    let egenScore = 0;

    Object.values(answers).forEach(answer => {
      if (answer.weight === 'T') {
        tetoScore += answer.intensity;
      } else {
        egenScore += answer.intensity;
      }
    });

    // 성별과 점수에 따라 결과 결정
    let resultType: keyof typeof results;
    
    if (tetoScore > egenScore) {
      resultType = gender === 'male' ? 'TETO_MALE' : 'TETO_FEMALE';
    } else {
      resultType = gender === 'male' ? 'EGEN_MALE' : 'EGEN_FEMALE';
    }

    return results[resultType];
  };

  // 답변 선택
  const selectAnswer = (optionIndex: number) => {
    const question = questions[currentQuestionIndex];
    const selectedOption = question.options[optionIndex];
    
    setAnswers({ 
      ...answers, 
      [question.id]: { 
        weight: selectedOption.weight, 
        intensity: selectedOption.intensity 
      }
    });
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      // 테스트 완료
      setTimeout(() => {
        const testResult = calculateResult();
        setResult(testResult);
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
                테토-에겐 성격 테스트
              </h1>
              
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        {/* 인트로 화면 */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-pink-400">테토</span>
                <span className="text-gray-400"> vs </span>
                <span className="text-yellow-400">에겐</span>
              </h2>
              <p className="text-gray-400 text-lg">
                화제의 성격 유형 테스트! 나는 테토일까 에겐일까?
              </p>
            </div>

            {/* 성별 선택 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
              <h3 className="text-lg font-bold mb-4">성별을 선택해주세요</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGender('male')}
                  className={`p-4 rounded-lg border transition-all ${
                    gender === 'male' 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-2">👨</div>
                  <div className="font-semibold">남성</div>
                </button>
                
                <button
                  onClick={() => setGender('female')}
                  className={`p-4 rounded-lg border transition-all ${
                    gender === 'female' 
                      ? 'bg-pink-600 border-pink-500 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-2">👩</div>
                  <div className="font-semibold">여성</div>
                </button>
              </div>
            </div>

            {/* 테스트 설명 */}
            <div className="bg-gradient-to-r from-pink-900/20 to-yellow-900/20 rounded-lg p-6 border border-pink-800/30 mb-8">
              <h3 className="text-lg font-bold mb-3">✨ 테토-에겐 테스트란?</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>• <strong className="text-pink-400">테토</strong>: 활발하고 애교 많은 성격</p>
                <p>• <strong className="text-yellow-400">에겐</strong>: 차분하고 쿨한 성격</p>
                <p>• 총 10개의 질문으로 당신의 성격을 분석합니다</p>
                <p>• 연애 스타일과 궁합까지 알려드려요!</p>
              </div>
            </div>

            <button
              onClick={startTest}
              className="bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all transform hover:scale-105"
            >
              테스트 시작하기 ✨
            </button>

            <div className="mt-8 text-sm text-gray-400">
              <p>• 솔직하게 답변할수록 정확한 결과를 얻을 수 있어요</p>
              <p>• 테스트는 약 2-3분 소요됩니다</p>
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
                테토-에겐 테스트 결과
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
              <div className="text-6xl mb-6">{result.emoji}</div>
              <h2 className="text-5xl font-bold mb-4">
                <span className={result.type.includes('TETO') ? 'text-pink-400' : 'text-yellow-400'}>
                  {result.title}
                </span>
              </h2>
              <p className="text-2xl text-gray-400 mb-6">{result.subtitle}</p>
              <div className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {result.description}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 성격 특성 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                  성격 특성
                </h3>
                <div className="space-y-3">
                  {result.personality.map((trait, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        result.type.includes('TETO') ? 'bg-pink-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-gray-300">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 연애 스타일 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  연애 스타일
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {result.loveStyle}
                </p>
              </div>

              {/* 궁합 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  궁합
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">최고 궁합</span>
                    <span className="text-green-400 font-semibold">{result.compatibility.best}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">피해야 할 상대</span>
                    <span className="text-red-400 font-semibold">{result.compatibility.avoid}</span>
                  </div>
                </div>
              </div>

              {/* 비율 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4">전체 비율</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{result.percentage}%</div>
                  <div className="text-gray-400 text-sm">
                    {result.type.includes('TETO') ? '테토' : '에겐'} 성향을 가진 사람들의 비율
                  </div>
                </div>
              </div>
            </div>

            {/* 다른 유형들 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-8">
              <h3 className="text-lg font-bold mb-4">다른 유형들도 궁금하다면?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(results).map(([key, resultType]) => (
                  <div 
                    key={key}
                    className={`p-4 rounded-lg border text-center transition-all ${
                      result.type === key
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-gray-700 border-gray-600 text-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{resultType.emoji}</div>
                    <div className="font-semibold text-sm">{resultType.title}</div>
                    <div className="text-xs opacity-70 mt-1">{resultType.percentage}%</div>
                  </div>
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
                      title: result.shareText,
                      text: `${result.description}`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(result.shareText);
                    alert('결과가 클립보드에 복사되었습니다!');
                  }
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
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
              테토-에겐 성격 테스트
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
              className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
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
              {questions[currentQuestionIndex].text}
            </h2>

            {/* 답변 선택지 */}
            <div className="space-y-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-6 rounded-lg border transition-all text-left hover:bg-gray-700 ${
                    option.weight === 'T'
                      ? 'bg-pink-600/10 border-pink-600/30 hover:border-pink-500/50'
                      : 'bg-yellow-600/10 border-yellow-600/30 hover:border-yellow-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{option.text}</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      option.weight === 'T' ? 'bg-pink-500' : 'bg-yellow-500'
                    }`}>
                      {option.weight}
                    </div>
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
                답변을 선택하면 자동으로 다음 질문으로 넘어갑니다
              </div>
            </div>

            <div className="w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}