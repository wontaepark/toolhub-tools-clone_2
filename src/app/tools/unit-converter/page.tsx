'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpDown, Star, Clock, Ruler, Weight, Thermometer, Droplets, Square, Zap } from 'lucide-react';

// 단위 변환 데이터
const unitCategories = {
  length: {
    name: '길이',
    icon: Ruler,
    color: 'blue',
    units: {
      mm: { name: '밀리미터', symbol: 'mm', factor: 1 },
      cm: { name: '센티미터', symbol: 'cm', factor: 10 },
      m: { name: '미터', symbol: 'm', factor: 1000 },
      km: { name: '킬로미터', symbol: 'km', factor: 1000000 },
      inch: { name: '인치', symbol: 'in', factor: 25.4 },
      ft: { name: '피트', symbol: 'ft', factor: 304.8 },
      yard: { name: '야드', symbol: 'yd', factor: 914.4 },
      mile: { name: '마일', symbol: 'mi', factor: 1609344 }
    }
  },
  weight: {
    name: '무게',
    icon: Weight,
    color: 'green',
    units: {
      mg: { name: '밀리그램', symbol: 'mg', factor: 1 },
      g: { name: '그램', symbol: 'g', factor: 1000 },
      kg: { name: '킬로그램', symbol: 'kg', factor: 1000000 },
      ton: { name: '톤', symbol: 't', factor: 1000000000 },
      oz: { name: '온스', symbol: 'oz', factor: 28349.5 },
      lb: { name: '파운드', symbol: 'lb', factor: 453592 },
      stone: { name: '스톤', symbol: 'st', factor: 6350293 }
    }
  },
  temperature: {
    name: '온도',
    icon: Thermometer,
    color: 'red',
    units: {
      celsius: { name: '섭씨', symbol: '°C', factor: 1 },
      fahrenheit: { name: '화씨', symbol: '°F', factor: 1 },
      kelvin: { name: '켈빈', symbol: 'K', factor: 1 }
    }
  },
  volume: {
    name: '부피',
    icon: Droplets,
    color: 'cyan',
    units: {
      ml: { name: '밀리리터', symbol: 'ml', factor: 1 },
      l: { name: '리터', symbol: 'l', factor: 1000 },
      cup: { name: '컵', symbol: 'cup', factor: 236.588 },
      pint: { name: '파인트', symbol: 'pt', factor: 473.176 },
      quart: { name: '쿼트', symbol: 'qt', factor: 946.353 },
      gallon: { name: '갤런', symbol: 'gal', factor: 3785.41 }
    }
  },
  area: {
    name: '면적',
    icon: Square,
    color: 'purple',
    units: {
      mm2: { name: '제곱밀리미터', symbol: 'mm²', factor: 1 },
      cm2: { name: '제곱센티미터', symbol: 'cm²', factor: 100 },
      m2: { name: '제곱미터', symbol: 'm²', factor: 1000000 },
      km2: { name: '제곱킬로미터', symbol: 'km²', factor: 1000000000000 },
      inch2: { name: '제곱인치', symbol: 'in²', factor: 645.16 },
      ft2: { name: '제곱피트', symbol: 'ft²', factor: 92903 },
      acre: { name: '에이커', symbol: 'acre', factor: 4046856422.4 }
    }
  },
  speed: {
    name: '속도',
    icon: Zap,
    color: 'yellow',
    units: {
      mps: { name: '미터/초', symbol: 'm/s', factor: 1 },
      kph: { name: '킬로미터/시', symbol: 'km/h', factor: 0.277778 },
      mph: { name: '마일/시', symbol: 'mph', factor: 0.44704 },
      knot: { name: '노트', symbol: 'kt', factor: 0.514444 },
      fps: { name: '피트/초', symbol: 'ft/s', factor: 0.3048 }
    }
  }
};

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof unitCategories>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('cm');
  const [inputValue, setInputValue] = useState('1');
  const [outputValue, setOutputValue] = useState('');
  const [favorites, setFavorites] = useState<Array<{category: string, from: string, to: string}>>([]);
  const [recentConversions, setRecentConversions] = useState<Array<{
    id: number;
    category: string;
    from: string;
    to: string;
    input: string;
    output: string;
    timestamp: Date;
  }>>([]);

  const currentCategory = unitCategories[selectedCategory];
  const currentUnits = currentCategory.units;

  // 온도 변환 (특별 처리)
  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    
    // 먼저 섭씨로 변환
    let celsius = value;
    if (from === 'fahrenheit') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    }
    
    // 섭씨에서 목표 단위로 변환
    if (to === 'fahrenheit') {
      return celsius * 9/5 + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    }
    
    return celsius;
  };

  // 일반 단위 변환
  const convertUnit = (value: number, from: string, to: string): number => {
    if (selectedCategory === 'temperature') {
      return convertTemperature(value, from, to);
    }
    
    const fromFactor = currentUnits[from as keyof typeof currentUnits]?.factor || 1;
    const toFactor = currentUnits[to as keyof typeof currentUnits]?.factor || 1;
    
    return (value * fromFactor) / toFactor;
  };

  // 변환 실행
  const performConversion = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setOutputValue('');
      return;
    }

    const result = convertUnit(numValue, fromUnit, toUnit);
    const formattedResult = result.toLocaleString('ko-KR', { 
      maximumFractionDigits: 10,
      minimumFractionDigits: 0
    });
    
    setOutputValue(formattedResult);

    // 최근 변환에 추가
    const conversion = {
      id: Date.now(),
      category: selectedCategory,
      from: fromUnit,
      to: toUnit,
      input: inputValue,
      output: formattedResult,
      timestamp: new Date()
    };
    
    setRecentConversions(prev => [conversion, ...prev.slice(0, 9)]);
  };

  // 단위 교체
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(outputValue || '1');
  };

  // 즐겨찾기 추가/제거
  const toggleFavorite = () => {
    const favoriteKey = `${selectedCategory}-${fromUnit}-${toUnit}`;
    const exists = favorites.some(fav => 
      fav.category === selectedCategory && fav.from === fromUnit && fav.to === toUnit
    );

    if (exists) {
      setFavorites(favorites.filter(fav => 
        !(fav.category === selectedCategory && fav.from === fromUnit && fav.to === toUnit)
      ));
    } else {
      setFavorites([...favorites, { category: selectedCategory, from: fromUnit, to: toUnit }]);
    }
  };

  // 카테고리 변경 시 기본 단위 설정
  useEffect(() => {
    const units = Object.keys(currentUnits);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setInputValue('1');
  }, [selectedCategory]);

  // 입력값 변경 시 자동 변환
  useEffect(() => {
    performConversion();
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  const isFavorite = favorites.some(fav => 
    fav.category === selectedCategory && fav.from === fromUnit && fav.to === toUnit
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
              단위 변환기
            </h1>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* 메인 설명 */}
      <div className="container mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">단위 변환기</h2>
          <p className="text-gray-400">길이, 무게, 온도, 부피, 면적, 속도 등 다양한 단위를 쉽고 정확하게 변환할 수 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 왼쪽: 메인 변환기 */}
          <div className="lg:col-span-2">
            
            {/* 카테고리 선택 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-lg font-bold mb-4">변환 유형</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(unitCategories).map(([key, category]) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key as keyof typeof unitCategories)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                        selectedCategory === key
                          ? `bg-${category.color}-600 border-${category.color}-500 text-white`
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 변환기 메인 */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              
              {/* From 입력 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  변환할 값
                </label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="숫자를 입력하세요"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-xl font-mono"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white min-w-32"
                  >
                    {Object.entries(currentUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 교체 버튼 */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={swapUnits}
                  className="flex items-center justify-center w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full text-white transition-colors"
                >
                  <ArrowUpDown className="h-5 w-5" />
                </button>
              </div>

              {/* To 출력 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  변환 결과
                </label>
                <div className="flex space-x-3">
                  <div className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-xl font-mono">
                    {outputValue || '0'}
                  </div>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white min-w-32"
                  >
                    {Object.entries(currentUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 즐겨찾기 버튼 */}
              <div className="flex justify-center">
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isFavorite
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  <span className="text-sm">{isFavorite ? '즐겨찾기 제거' : '즐겨찾기 추가'}</span>
                </button>
              </div>
            </div>

            {/* 최근 변환 */}
            {recentConversions.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-6">
                <h3 className="text-lg font-bold mb-4">최근 변환</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recentConversions.map((conversion) => (
                    <div key={conversion.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="text-sm text-gray-300">
                          {conversion.input} {currentUnits[conversion.from as keyof typeof currentUnits]?.symbol} 
                          → {conversion.output} {currentUnits[conversion.to as keyof typeof currentUnits]?.symbol}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {unitCategories[conversion.category as keyof typeof unitCategories]?.name} · 
                          {conversion.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory(conversion.category as keyof typeof unitCategories);
                          setFromUnit(conversion.from);
                          setToUnit(conversion.to);
                          setInputValue(conversion.input);
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
                        setSelectedCategory(fav.category as keyof typeof unitCategories);
                        setFromUnit(fav.from);
                        setToUnit(fav.to);
                      }}
                      className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="text-sm text-white">
                        {unitCategories[fav.category as keyof typeof unitCategories]?.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {fav.from} → {fav.to}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 빠른 변환 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">빠른 변환</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSelectedCategory('length');
                    setFromUnit('m');
                    setToUnit('ft');
                    setInputValue('1');
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">미터 → 피트</div>
                  <div className="text-xs text-gray-400">길이 변환</div>
                </button>
                
                <button
                  onClick={() => {
                    setSelectedCategory('weight');
                    setFromUnit('kg');
                    setToUnit('lb');
                    setInputValue('1');
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">킬로그램 → 파운드</div>
                  <div className="text-xs text-gray-400">무게 변환</div>
                </button>
                
                <button
                  onClick={() => {
                    setSelectedCategory('temperature');
                    setFromUnit('celsius');
                    setToUnit('fahrenheit');
                    setInputValue('0');
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">섭씨 → 화씨</div>
                  <div className="text-xs text-gray-400">온도 변환</div>
                </button>
              </div>
            </div>

            {/* 변환 공식 */}
            <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/30">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <currentCategory.icon className="h-5 w-5 text-blue-400 mr-2" />
                {currentCategory.name} 변환
              </h3>
              <div className="text-sm text-blue-300">
                {selectedCategory === 'temperature' ? (
                  <div className="space-y-1">
                    <div>섭씨 → 화씨: (°C × 9/5) + 32</div>
                    <div>화씨 → 섭씨: (°F - 32) × 5/9</div>
                    <div>섭씨 → 켈빈: °C + 273.15</div>
                  </div>
                ) : (
                  <div>
                    {currentUnits[fromUnit as keyof typeof currentUnits]?.name} →{' '}
                    {currentUnits[toUnit as keyof typeof currentUnits]?.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}