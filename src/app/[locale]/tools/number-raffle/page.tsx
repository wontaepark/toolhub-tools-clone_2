'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shuffle, Play, RotateCcw, Star, Copy, Check, Settings, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface RaffleResult {
  id: number;
  numbers: number[];
  min: number;
  max: number;
  count: number;
  allowDuplicates: boolean;
  timestamp: Date;
}

export default function NumberRaffle() {
  // 추첨 설정
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  
  // 추첨 상태
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [animatingNumbers, setAnimatingNumbers] = useState<number[]>([]);
  
  // 히스토리 및 기타
  const [raffleHistory, setRaffleHistory] = useState<RaffleResult[]>([]);
  const [favorites, setFavorites] = useState<Array<{min: number, max: number, count: number}>>([]);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // 번호 추첨 실행
  const drawNumbers = async () => {
    if (minNumber >= maxNumber) {
      alert('최소값은 최대값보다 작아야 합니다.');
      return;
    }

    if (!allowDuplicates && count > (maxNumber - minNumber + 1)) {
      alert('중복을 허용하지 않을 때는 추첨 개수가 범위를 초과할 수 없습니다.');
      return;
    }

    setIsDrawing(true);
    setShowResult(false);
    setAnimatingNumbers([]);

    // 애니메이션 효과
    const animationDuration = 2000; // 2초
    const animationInterval = 100; // 0.1초마다 업데이트
    const iterations = animationDuration / animationInterval;

    for (let i = 0; i < iterations; i++) {
      setTimeout(() => {
        const tempNumbers = [];
        for (let j = 0; j < count; j++) {
          tempNumbers.push(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber);
        }
        setAnimatingNumbers(tempNumbers);
      }, i * animationInterval);
    }

    // 최종 결과 생성
    setTimeout(() => {
      const finalNumbers = [];
      const usedNumbers = new Set<number>();

      for (let i = 0; i < count; i++) {
        let number;
        if (allowDuplicates) {
          number = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        } else {
          do {
            number = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
          } while (usedNumbers.has(number));
          usedNumbers.add(number);
        }
        finalNumbers.push(number);
      }

      finalNumbers.sort((a, b) => a - b);
      setDrawnNumbers(finalNumbers);
      setAnimatingNumbers([]);
      setIsDrawing(false);
      setShowResult(true);

      // 히스토리에 추가
      const newResult: RaffleResult = {
        id: Date.now(),
        numbers: finalNumbers,
        min: minNumber,
        max: maxNumber,
        count,
        allowDuplicates,
        timestamp: new Date()
      };
      
      setRaffleHistory(prev => [newResult, ...prev.slice(0, 19)]); // 최대 20개 유지
    }, animationDuration);
  };

  // 설정 초기화
  const resetSettings = () => {
    setMinNumber(1);
    setMaxNumber(100);
    setCount(1);
    setAllowDuplicates(false);
    setShowResult(false);
    setDrawnNumbers([]);
  };

  // 즐겨찾기 토글
  const toggleFavorite = () => {
    const current = { min: minNumber, max: maxNumber, count };
    const exists = favorites.some(fav => 
      fav.min === current.min && fav.max === current.max && fav.count === current.count
    );

    if (exists) {
      setFavorites(favorites.filter(fav => 
        !(fav.min === current.min && fav.max === current.max && fav.count === current.count)
      ));
    } else {
      setFavorites([current, ...favorites.slice(0, 9)]);
    }
  };

  // 결과 복사
  const copyResult = async () => {
    try {
      const resultText = `추첨 결과: ${drawnNumbers.join(', ')}\n범위: ${minNumber}~${maxNumber}\n개수: ${count}개`;
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  // 숫자 표시 컴포넌트
  const NumberBall = ({ number, isAnimating = false }: { number: number, isAnimating?: boolean }) => (
    <div className={`
      w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300
      ${isAnimating 
        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white animate-pulse' 
        : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
      }
    `}>
      {number}
    </div>
  );

  const isFavorite = favorites.some(fav => 
    fav.min === minNumber && fav.max === maxNumber && fav.count === count
  );

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
              번호 추첨기
            </h1>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 메인 설명 */}
      <div className="container mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">번호 추첨기</h2>
          <p className="text-gray-400">공정하고 재미있는 번호 추첨을 위한 도구입니다. 다양한 설정으로 원하는 방식의 추첨을 진행해보세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 왼쪽: 메인 추첨기 */}
          <div className="lg:col-span-2">
            
            {/* 설정 패널 */}
            {showSettings && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
                <h3 className="text-lg font-bold mb-4">추첨 설정</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      최소 번호
                    </label>
                    <input
                      type="number"
                      value={minNumber}
                      onChange={(e) => setMinNumber(Number(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      최대 번호
                    </label>
                    <input
                      type="number"
                      value={maxNumber}
                      onChange={(e) => setMaxNumber(Number(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      추첨 개수
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allowDuplicates}
                        onChange={(e) => setAllowDuplicates(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-300">중복 허용</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 추첨기 메인 */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              
              {/* 현재 설정 표시 */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-4 bg-gray-700 rounded-lg px-6 py-3">
                  <div className="text-sm text-gray-400">범위:</div>
                  <div className="text-lg font-bold text-white">{minNumber} ~ {maxNumber}</div>
                  <div className="text-sm text-gray-400">|</div>
                  <div className="text-sm text-gray-400">개수:</div>
                  <div className="text-lg font-bold text-white">{count}개</div>
                  {allowDuplicates && (
                    <>
                      <div className="text-sm text-gray-400">|</div>
                      <div className="text-xs text-purple-400">중복 허용</div>
                    </>
                  )}
                </div>
              </div>

              {/* 추첨 결과 표시 */}
              <div className="min-h-32 flex items-center justify-center mb-8">
                {isDrawing ? (
                  <div className="flex flex-wrap justify-center gap-4">
                    {animatingNumbers.map((num, index) => (
                      <NumberBall key={index} number={num} isAnimating />
                    ))}
                  </div>
                ) : showResult ? (
                  <div className="text-center">
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                      {drawnNumbers.map((num, index) => (
                        <NumberBall key={index} number={num} />
                      ))}
                    </div>
                    <div className="text-lg font-bold text-green-400">추첨 완료!</div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Shuffle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <div>추첨을 시작하려면 버튼을 클릭하세요</div>
                  </div>
                )}
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={drawNumbers}
                  disabled={isDrawing}
                  className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-medium transition-all ${
                    isDrawing
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105'
                  }`}
                >
                  {isDrawing ? (
                    <>
                      <Shuffle className="h-5 w-5 animate-spin" />
                      <span>추첨 중...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      <span>추첨 시작</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setShowResult(false);
                    setDrawnNumbers([]);
                    setAnimatingNumbers([]);
                  }}
                  className="flex items-center space-x-2 px-6 py-4 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>초기화</span>
                </button>
              </div>

              {/* 결과 액션 */}
              {showResult && (
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={toggleFavorite}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isFavorite
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    <span className="text-sm">{isFavorite ? '즐겨찾기 제거' : '설정 저장'}</span>
                  </button>
                  
                  <button
                    onClick={copyResult}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      copied
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="text-sm">{copied ? '복사됨!' : '결과 복사'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* 추첨 히스토리 */}
            {raffleHistory.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-6">
                <h3 className="text-lg font-bold mb-4">추첨 히스토리</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {raffleHistory.map((raffle) => (
                    <div key={raffle.id} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-wrap gap-2">
                          {raffle.numbers.map((num, index) => (
                            <span key={index} className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                              {num}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            setMinNumber(raffle.min);
                            setMaxNumber(raffle.max);
                            setCount(raffle.count);
                            setAllowDuplicates(raffle.allowDuplicates);
                          }}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          다시 사용
                        </button>
                      </div>
                      <div className="text-xs text-gray-400">
                        {raffle.min}~{raffle.max} 범위, {raffle.count}개 추첨
                        {raffle.allowDuplicates && ' (중복 허용)'}
                        · {raffle.timestamp.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽: 즐겨찾기 및 빠른 설정 */}
          <div className="space-y-6">
            
            {/* 빠른 설정 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">빠른 설정</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setMinNumber(1);
                    setMaxNumber(45);
                    setCount(6);
                    setAllowDuplicates(false);
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">로또 번호</div>
                  <div className="text-xs text-gray-400">1~45, 6개 (중복 없음)</div>
                </button>
                
                <button
                  onClick={() => {
                    setMinNumber(1);
                    setMaxNumber(6);
                    setCount(1);
                    setAllowDuplicates(true);
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">주사위</div>
                  <div className="text-xs text-gray-400">1~6, 1개</div>
                </button>
                
                <button
                  onClick={() => {
                    setMinNumber(1);
                    setMaxNumber(10);
                    setCount(3);
                    setAllowDuplicates(false);
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">순서 정하기</div>
                  <div className="text-xs text-gray-400">1~10, 3개 (중복 없음)</div>
                </button>
                
                <button
                  onClick={() => {
                    setMinNumber(1);
                    setMaxNumber(100);
                    setCount(1);
                    setAllowDuplicates(true);
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">확률 게임</div>
                  <div className="text-xs text-gray-400">1~100, 1개</div>
                </button>
              </div>
            </div>

            {/* 즐겨찾기 */}
            {favorites.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2 fill-current" />
                  즐겨찾기
                </h3>
                <div className="space-y-2">
                  {favorites.map((fav, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setMinNumber(fav.min);
                        setMaxNumber(fav.max);
                        setCount(fav.count);
                      }}
                      className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="text-sm text-white">
                        {fav.min}~{fav.max} 범위
                      </div>
                      <div className="text-xs text-gray-400">
                        {fav.count}개 추첨
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 통계 */}
            {raffleHistory.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4">통계</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">{raffleHistory.length}</div>
                    <div className="text-gray-400 text-sm">총 추첨 횟수</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {raffleHistory.reduce((sum, raffle) => sum + raffle.numbers.length, 0)}
                    </div>
                    <div className="text-gray-400 text-sm">뽑힌 번호 개수</div>
                  </div>
                </div>
              </div>
            )}

            {/* 추첨 가이드 */}
            <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800/30">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Shuffle className="h-5 w-5 text-purple-400 mr-2" />
                추첨 가이드
              </h3>
              <div className="space-y-2 text-sm text-purple-300">
                <div>• 공정한 난수 생성 알고리즘을 사용합니다</div>
                <div>• 중복 허용 시 같은 번호가 여러 번 나올 수 있습니다</div>
                <div>• 최대 20개까지 한 번에 추첨 가능합니다</div>
                <div>• 결과는 자동으로 오름차순 정렬됩니다</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}