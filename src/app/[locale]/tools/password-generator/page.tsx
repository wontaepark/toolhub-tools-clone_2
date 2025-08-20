'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, RefreshCw, Eye, EyeOff, Check, Shield, Info } from 'lucide-react';

interface PasswordHistory {
  id: number;
  password: string;
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  length: number;
  timestamp: Date;
}

export default function PasswordGenerator() {
  // 비밀번호 설정
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  
  // 생성된 비밀번호
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistory[]>([]);

  // 문자 세트
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const similarChars = 'il1Lo0O';
  const ambiguousChars = '{}[]()/\\\'"`~,;.<>';

  // 비밀번호 강도 계산
  const calculateStrength = (pwd: string): 'weak' | 'medium' | 'strong' | 'very-strong' => {
    let score = 0;
    
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;
    if (pwd.length >= 20) score += 1;

    if (score <= 3) return 'weak';
    if (score <= 5) return 'medium';
    if (score <= 7) return 'strong';
    return 'very-strong';
  };

  // 비밀번호 생성
  const generatePassword = () => {
    let charset = '';
    
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    
    if (excludeSimilar) {
      similarChars.split('').forEach(char => {
        charset = charset.replace(new RegExp(char, 'g'), '');
      });
    }
    
    if (excludeAmbiguous) {
      ambiguousChars.split('').forEach(char => {
        charset = charset.replace(new RegExp('\\' + char, 'g'), '');
      });
    }

    if (charset === '') {
      alert('최소 하나의 문자 유형을 선택해야 합니다.');
      return;
    }

    let newPassword = '';
    
    // 선택된 각 유형에서 최소 하나씩 포함
    const requiredChars = [];
    if (includeUppercase) requiredChars.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    if (includeLowercase) requiredChars.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    if (includeNumbers) requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    if (includeSymbols) requiredChars.push(symbols[Math.floor(Math.random() * symbols.length)]);

    // 나머지 길이만큼 랜덤 문자 추가
    for (let i = requiredChars.length; i < length; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }

    // 필수 문자들을 랜덤 위치에 삽입
    requiredChars.forEach(char => {
      const randomIndex = Math.floor(Math.random() * (newPassword.length + 1));
      newPassword = newPassword.slice(0, randomIndex) + char + newPassword.slice(randomIndex);
    });

    // 길이 조정
    newPassword = newPassword.slice(0, length);

    setPassword(newPassword);
    setCopied(false);

    // 히스토리에 추가
    const newEntry: PasswordHistory = {
      id: Date.now(),
      password: newPassword,
      strength: calculateStrength(newPassword),
      length: newPassword.length,
      timestamp: new Date()
    };
    
    setPasswordHistory(prev => [newEntry, ...prev.slice(0, 9)]); // 최대 10개 유지
  };

  // 복사 기능
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  // 강도 색상 및 텍스트
  const getStrengthInfo = (strength: string) => {
    switch (strength) {
      case 'weak':
        return { color: 'text-red-500', bg: 'bg-red-500', text: '약함', width: '25%' };
      case 'medium':
        return { color: 'text-orange-500', bg: 'bg-orange-500', text: '보통', width: '50%' };
      case 'strong':
        return { color: 'text-blue-500', bg: 'bg-blue-500', text: '강함', width: '75%' };
      case 'very-strong':
        return { color: 'text-green-500', bg: 'bg-green-500', text: '매우 강함', width: '100%' };
      default:
        return { color: 'text-gray-500', bg: 'bg-gray-500', text: '알 수 없음', width: '0%' };
    }
  };

  // 초기 비밀번호 생성
  useEffect(() => {
    generatePassword();
  }, []);

  const currentStrength = calculateStrength(password);
  const strengthInfo = getStrengthInfo(currentStrength);

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
              비밀번호 생성기
            </h1>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* 메인 설명 */}
      <div className="container mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">비밀번호 생성기</h2>
          <p className="text-gray-400">안전하고 복잡한 비밀번호를 자동으로 생성합니다. 다양한 옵션을 설정하여 원하는 형태의 비밀번호를 만들어보세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 왼쪽: 비밀번호 생성 */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              
              {/* 생성된 비밀번호 */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  생성된 비밀번호
                </label>
                <div className="relative">
                  <div className={`bg-gray-700 border border-gray-600 rounded-lg px-4 py-4 font-mono text-lg break-all ${
                    showPassword ? 'text-white' : 'text-transparent'
                  }`}>
                    {password || '비밀번호를 생성하세요'}
                    {!showPassword && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-400">••••••••••••••••</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    
                    <button
                      onClick={copyToClipboard}
                      className={`p-2 transition-colors ${
                        copied ? 'text-green-500' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* 비밀번호 강도 */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-400">비밀번호 강도</span>
                  <span className={`text-sm font-medium ${strengthInfo.color}`}>
                    {strengthInfo.text}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className={`${strengthInfo.bg} h-3 rounded-full transition-all duration-500`}
                    style={{ width: strengthInfo.width }}
                  ></div>
                </div>
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex space-x-4">
                <button
                  onClick={generatePassword}
                  className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>새 비밀번호 생성</span>
                </button>
                
                <button
                  onClick={copyToClipboard}
                  disabled={!password}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    copied
                      ? 'bg-green-600 text-white'
                      : password
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? '복사됨!' : '복사'}</span>
                </button>
              </div>
            </div>

            {/* 비밀번호 히스토리 */}
            {passwordHistory.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-6">
                <h3 className="text-lg font-bold mb-4">최근 생성된 비밀번호</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {passwordHistory.map((item) => {
                    const historyStrengthInfo = getStrengthInfo(item.strength);
                    return (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <div className="font-mono text-sm text-gray-300 break-all">
                            {showPassword ? item.password : '••••••••••••••••'}
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                            <span>길이: {item.length}</span>
                            <span className={historyStrengthInfo.color}>
                              강도: {historyStrengthInfo.text}
                            </span>
                            <span>{item.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.password);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽: 설정 옵션 */}
          <div className="space-y-6">
            
            {/* 길이 설정 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">비밀번호 길이</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">길이</span>
                    <span className="text-white font-medium">{length}자</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="128"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4</span>
                    <span>128</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 문자 유형 설정 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">포함할 문자</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">대문자 (A-Z)</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">소문자 (a-z)</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">숫자 (0-9)</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">특수문자 (!@#$%^&*)</span>
                </label>
              </div>
            </div>

            {/* 고급 옵션 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">고급 옵션</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={excludeSimilar}
                    onChange={(e) => setExcludeSimilar(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">유사한 문자 제외 (i, l, 1, L, o, 0, O)</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={excludeAmbiguous}
                    onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">모호한 문자 제외 (&#123; &#125; [ ] ( ) / \ &apos; &quot; ` ~)</span>
                </label>
              </div>
            </div>

            {/* 보안 팁 */}
            <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/30">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Shield className="h-5 w-5 text-blue-400 mr-2" />
                보안 팁
              </h3>
              <div className="space-y-2 text-sm text-blue-300">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>최소 12자 이상의 길이를 권장합니다</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>대소문자, 숫자, 특수문자를 모두 포함하세요</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>개인정보와 관련된 단어는 피하세요</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>정기적으로 비밀번호를 변경하세요</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}