'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Plus, Minus, Star, RotateCcw, Copy, Check } from 'lucide-react';

interface DateCalculation {
  id: number;
  type: 'difference' | 'add' | 'subtract';
  startDate: string;
  endDate?: string;
  amount?: number;
  unit?: string;
  result: string;
  timestamp: Date;
}

export default function DateCalculator() {
  // 계산 모드
  const [mode, setMode] = useState<'difference' | 'add' | 'subtract'>('difference');
  
  // 날짜 간격 계산
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // 날짜 더하기/빼기
  const [baseDate, setBaseDate] = useState('');
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState('days');
  
  // 결과 및 기타
  const [result, setResult] = useState('');
  const [detailedResult, setDetailedResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<DateCalculation[]>([]);
  const [recentCalculations, setRecentCalculations] = useState<DateCalculation[]>([]);

  // 오늘 날짜로 초기화
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
    setBaseDate(today);
  }, []);

  // 날짜 간격 계산
  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;
    
    const weeks = Math.floor(days / 7);
    const weekDays = days % 7;

    setResult(`${days}일`);
    setDetailedResult(
      `${days}일 (${years}년 ${months}개월 ${remainingDays}일)\n` +
      `${weeks}주 ${weekDays}일\n` +
      `${hours}시간 ${minutes}분\n` +
      `${days.toLocaleString()}일`
    );

    // 히스토리에 추가
    addToHistory({
      type: 'difference',
      startDate,
      endDate,
      result: `${days}일`,
    });
  };

  // 날짜 더하기/빼기
  const calculateAddSubtract = () => {
    if (!baseDate || !amount) return;

    const base = new Date(baseDate);
    let resultDate = new Date(base);

    switch (unit) {
      case 'days':
        resultDate.setDate(base.getDate() + (mode === 'add' ? amount : -amount));
        break;
      case 'weeks':
        resultDate.setDate(base.getDate() + (mode === 'add' ? amount * 7 : -amount * 7));
        break;
      case 'months':
        resultDate.setMonth(base.getMonth() + (mode === 'add' ? amount : -amount));
        break;
      case 'years':
        resultDate.setFullYear(base.getFullYear() + (mode === 'add' ? amount : -amount));
        break;
    }

    const resultDateStr = resultDate.toISOString().split('T')[0];
    const dayOfWeek = resultDate.toLocaleDateString('ko-KR', { weekday: 'long' });
    
    setResult(resultDateStr);
    setDetailedResult(
      `${resultDate.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })} (${dayOfWeek})`
    );

    // 히스토리에 추가
    addToHistory({
      type: mode,
      startDate: baseDate,
      amount,
      unit,
      result: resultDateStr,
    });
  };

  // 히스토리에 추가
  const addToHistory = (calculation: Omit<DateCalculation, 'id' | 'timestamp'>) => {
    const newCalculation: DateCalculation = {
      ...calculation,
      id: Date.now(),
      timestamp: new Date()
    };
    
    setRecentCalculations(prev => [newCalculation, ...prev.slice(0, 9)]);
  };

  // 즐겨찾기 토글
  const toggleFavorite = () => {
    const current = {
      id: Date.now(),
      type: mode,
      startDate: mode === 'difference' ? startDate : baseDate,
      endDate: mode === 'difference' ? endDate : undefined,
      amount: mode !== 'difference' ? amount : undefined,
      unit: mode !== 'difference' ? unit : undefined,
      result,
      timestamp: new Date()
    };

    const exists = favorites.some(fav => 
      fav.type === current.type &&
      fav.startDate === current.startDate &&
      fav.endDate === current.endDate &&
      fav.amount === current.amount &&
      fav.unit === current.unit
    );

    if (exists) {
      setFavorites(favorites.filter(fav => 
        !(fav.type === current.type &&
          fav.startDate === current.startDate &&
          fav.endDate === current.endDate &&
          fav.amount === current.amount &&
          fav.unit === current.unit)
      ));
    } else {
      setFavorites([current, ...favorites.slice(0, 9)]);
    }
  };

  // 복사 기능
  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(detailedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  // 계산 실행
  useEffect(() => {
    if (mode === 'difference') {
      calculateDifference();
    } else {
      calculateAddSubtract();
    }
  }, [mode, startDate, endDate, baseDate, amount, unit]);

  const isFavorite = favorites.some(fav => 
    fav.type === mode &&
    fav.startDate === (mode === 'difference' ? startDate : baseDate) &&
    (mode === 'difference' ? fav.endDate === endDate : fav.amount === amount && fav.unit === unit)
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
              날짜 계산기
            </h1>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* 메인 설명 */}
      <div className="container mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">날짜 계산기</h2>
          <p className="text-gray-400">날짜 간격 계산, 특정 날짜 찾기 등 다양한 날짜 관련 계산을 도와드립니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 왼쪽: 메인 계산기 */}
          <div className="lg:col-span-2">
            
            {/* 모드 선택 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-lg font-bold mb-4">계산 유형</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setMode('difference')}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    mode === 'difference'
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">날짜 간격</span>
                </button>
                
                <button
                  onClick={() => setMode('add')}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    mode === 'add'
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm font-medium">날짜 더하기</span>
                </button>
                
                <button
                  onClick={() => setMode('subtract')}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    mode === 'subtract'
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Minus className="h-4 w-4" />
                  <span className="text-sm font-medium">날짜 빼기</span>
                </button>
              </div>
            </div>

            {/* 계산기 메인 */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              
              {mode === 'difference' ? (
                // 날짜 간격 계산
                <div>
                  <h3 className="text-lg font-bold mb-6 text-center">두 날짜 사이의 간격 계산</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-3">
                        시작 날짜
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-3">
                        종료 날짜
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // 날짜 더하기/빼기
                <div>
                  <h3 className="text-lg font-bold mb-6 text-center">
                    날짜에 시간 {mode === 'add' ? '더하기' : '빼기'}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-3">
                        기준 날짜
                      </label>
                      <input
                        type="date"
                        value={baseDate}
                        onChange={(e) => setBaseDate(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3">
                          {mode === 'add' ? '더할' : '뺄'} 값
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3">
                          단위
                        </label>
                        <select
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                        >
                          <option value="days">일</option>
                          <option value="weeks">주</option>
                          <option value="months">개월</option>
                          <option value="years">년</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 결과 표시 */}
              {result && (
                <div className="mt-8 p-6 bg-gray-700 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold">계산 결과</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={toggleFavorite}
                        className={`p-2 rounded-lg transition-colors ${
                          isFavorite
                            ? 'bg-yellow-600 text-white'
                            : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                        }`}
                      >
                        <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={copyResult}
                        className={`p-2 rounded-lg transition-colors ${
                          copied
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                        }`}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-blue-400 mb-2">{result}</div>
                  <div className="text-sm text-gray-300 whitespace-pre-line">{detailedResult}</div>
                </div>
              )}
            </div>

            {/* 최근 계산 */}
            {recentCalculations.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-6">
                <h3 className="text-lg font-bold mb-4">최근 계산</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recentCalculations.map((calc) => (
                    <div key={calc.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="text-sm text-gray-300">
                          {calc.type === 'difference' 
                            ? `${calc.startDate} ~ ${calc.endDate}`
                            : `${calc.startDate} ${calc.type === 'add' ? '+' : '-'} ${calc.amount}${calc.unit === 'days' ? '일' : calc.unit === 'weeks' ? '주' : calc.unit === 'months' ? '개월' : '년'}`
                          }
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          결과: {calc.result} · {calc.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setMode(calc.type);
                          if (calc.type === 'difference') {
                            setStartDate(calc.startDate);
                            setEndDate(calc.endDate || '');
                          } else {
                            setBaseDate(calc.startDate);
                            setAmount(calc.amount || 1);
                            setUnit(calc.unit || 'days');
                          }
                        }}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        다시 사용
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽: 즐겨찾기 및 정보 */}
          <div className="space-y-6">
            
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
                        setMode(fav.type);
                        if (fav.type === 'difference') {
                          setStartDate(fav.startDate);
                          setEndDate(fav.endDate || '');
                        } else {
                          setBaseDate(fav.startDate);
                          setAmount(fav.amount || 1);
                          setUnit(fav.unit || 'days');
                        }
                      }}
                      className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="text-sm text-white">
                        {fav.type === 'difference' ? '날짜 간격' : fav.type === 'add' ? '날짜 더하기' : '날짜 빼기'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {fav.type === 'difference' 
                          ? `${fav.startDate} ~ ${fav.endDate}`
                          : `${fav.amount}${fav.unit === 'days' ? '일' : fav.unit === 'weeks' ? '주' : fav.unit === 'months' ? '개월' : '년'}`
                        }
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 빠른 계산 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">빠른 계산</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    const nextWeek = new Date();
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    setMode('difference');
                    setStartDate(today);
                    setEndDate(nextWeek.toISOString().split('T')[0]);
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">오늘부터 일주일 후</div>
                  <div className="text-xs text-gray-400">날짜 간격 계산</div>
                </button>
                
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    setMode('add');
                    setBaseDate(today);
                    setAmount(30);
                    setUnit('days');
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">30일 후 날짜</div>
                  <div className="text-xs text-gray-400">날짜 더하기</div>
                </button>
                
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    const newYear = new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split('T')[0];
                    setMode('difference');
                    setStartDate(today);
                    setEndDate(newYear);
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">새해까지 D-Day</div>
                  <div className="text-xs text-gray-400">D-Day 계산</div>
                </button>
              </div>
            </div>

            {/* 유용한 정보 */}
            <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/30">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Clock className="h-5 w-5 text-blue-400 mr-2" />
                날짜 계산 팁
              </h3>
              <div className="space-y-2 text-sm text-blue-300">
                <div>• 윤년을 고려한 정확한 계산을 제공합니다</div>
                <div>• 주말과 공휴일도 포함하여 계산됩니다</div>
                <div>• 과거와 미래 날짜 모두 계산 가능합니다</div>
                <div>• 결과를 클립보드로 복사할 수 있습니다</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}