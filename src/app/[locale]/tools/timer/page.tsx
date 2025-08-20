'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, Square, RotateCcw, Plus, Minus, Volume2, VolumeX, Clock, Star } from 'lucide-react';

interface TimerPreset {
  id: number;
  name: string;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerHistory {
  id: number;
  duration: string;
  completedAt: Date;
  wasCompleted: boolean;
}

export default function Timer() {
  // 타이머 상태
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // 설정
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  
  // 프리셋 및 히스토리
  const [presets, setPresets] = useState<TimerPreset[]>([
    { id: 1, name: '5분 타이머', hours: 0, minutes: 5, seconds: 0 },
    { id: 2, name: '10분 타이머', hours: 0, minutes: 10, seconds: 0 },
    { id: 3, name: '15분 타이머', hours: 0, minutes: 15, seconds: 0 },
    { id: 4, name: '30분 타이머', hours: 0, minutes: 30, seconds: 0 },
    { id: 5, name: '1시간 타이머', hours: 1, minutes: 0, seconds: 0 }
  ]);
  const [timerHistory, setTimerHistory] = useState<TimerHistory[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 총 초 계산
  const calculateTotalSeconds = (h: number, m: number, s: number) => {
    return h * 3600 + m * 60 + s;
  };

  // 시간 포맷팅
  const formatTime = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return {
      hours: h,
      minutes: m,
      seconds: s,
      display: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    };
  };

  // 타이머 로직
  useEffect(() => {
    if (isActive && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            playAlarm();
            addToHistory(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, remainingSeconds]);

  // 알람 소리
  const playAlarm = () => {
    if (typeof window !== 'undefined' && Notification.permission === 'granted') {
      new Notification('타이머 완료!', {
        body: '설정한 시간이 완료되었습니다.',
        icon: '/favicon.ico'
      });
    }

    if (soundEnabled) {
      try {
        if (typeof window !== 'undefined') {
          const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
          
          // 3번 반복하는 알림음
          for (let i = 0; i < 3; i++) {
            setTimeout(() => {
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.value = 880;
              oscillator.type = 'sine';
              
              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.5);
            }, i * 600);
          }
        }
      } catch (error) {
        console.log('오디오 재생 실패:', error);
      }
    }
  };

  // 타이머 시작/정지
  const toggleTimer = () => {
    if (!isActive && remainingSeconds === 0) {
      // 새로 시작
      const total = calculateTotalSeconds(hours, minutes, seconds);
      if (total === 0) {
        alert('시간을 설정해주세요.');
        return;
      }
      setTotalSeconds(total);
      setRemainingSeconds(total);
      setIsCompleted(false);
    }
    setIsActive(!isActive);
  };

  // 타이머 정지
  const stopTimer = () => {
    setIsActive(false);
    if (remainingSeconds > 0 && remainingSeconds < totalSeconds) {
      addToHistory(false);
    }
    setRemainingSeconds(0);
    setTotalSeconds(0);
    setIsCompleted(false);
  };

  // 타이머 리셋
  const resetTimer = () => {
    setIsActive(false);
    setRemainingSeconds(0);
    setTotalSeconds(0);
    setIsCompleted(false);
  };

  // 시간 조정
  const adjustTime = (type: 'hours' | 'minutes' | 'seconds', operation: 'add' | 'subtract') => {
    if (isActive) return;

    const adjustment = operation === 'add' ? 1 : -1;
    
    switch (type) {
      case 'hours':
        setHours(Math.max(0, Math.min(23, hours + adjustment)));
        break;
      case 'minutes':
        setMinutes(Math.max(0, Math.min(59, minutes + adjustment)));
        break;
      case 'seconds':
        setSeconds(Math.max(0, Math.min(59, seconds + adjustment)));
        break;
    }
  };

  // 프리셋 적용
  const applyPreset = (preset: TimerPreset) => {
    if (isActive) return;
    
    setHours(preset.hours);
    setMinutes(preset.minutes);
    setSeconds(preset.seconds);
    setSelectedPreset(preset.id);
  };

  // 히스토리에 추가
  const addToHistory = (completed: boolean) => {
    const duration = formatTime(totalSeconds).display;
    const newHistory: TimerHistory = {
      id: Date.now(),
      duration,
      completedAt: new Date(),
      wasCompleted: completed
    };
    
    setTimerHistory(prev => [newHistory, ...prev.slice(0, 19)]);
  };

  // 알림 권한 요청
  useEffect(() => {
    if (typeof window !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const progress = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
  const currentTime = formatTime(remainingSeconds);

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
              범용 타이머
            </h1>
            
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                soundEnabled ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 메인 설명 */}
      <div className="container mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">범용 타이머</h2>
          <p className="text-gray-400">원하는 시간을 자유롭게 설정할 수 있는 카운트다운 타이머입니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 왼쪽: 메인 타이머 */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              
              {/* 타이머 표시 */}
              <div className="text-center mb-8">
                {isCompleted && (
                  <div className="mb-4">
                    <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium">
                      타이머 완료!
                    </div>
                  </div>
                )}
                
                <div className="text-6xl md:text-8xl font-bold font-mono text-white mb-4">
                  {remainingSeconds > 0 ? currentTime.display : formatTime(calculateTotalSeconds(hours, minutes, seconds)).display}
                </div>
                
                {totalSeconds > 0 && (
                  <div className="text-gray-400 text-lg">
                    {isActive ? '남은 시간' : isCompleted ? '완료된 시간' : '설정된 시간'}
                  </div>
                )}
              </div>

              {/* 진행률 바 */}
              {totalSeconds > 0 && (
                <div className="mb-8">
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-cyan-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>0%</span>
                    <span>{Math.round(progress)}% 완료</span>
                    <span>100%</span>
                  </div>
                </div>
              )}

              {/* 시간 설정 */}
              {!isActive && remainingSeconds === 0 && (
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {/* 시간 */}
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-400 mb-3">시간</label>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => adjustTime('hours', 'add')}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4 mx-auto" />
                      </button>
                      <div className="text-3xl font-bold font-mono bg-gray-700 rounded-lg py-3">
                        {hours.toString().padStart(2, '0')}
                      </div>
                      <button
                        onClick={() => adjustTime('hours', 'subtract')}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Minus className="h-4 w-4 mx-auto" />
                      </button>
                    </div>
                  </div>

                  {/* 분 */}
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-400 mb-3">분</label>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => adjustTime('minutes', 'add')}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4 mx-auto" />
                      </button>
                      <div className="text-3xl font-bold font-mono bg-gray-700 rounded-lg py-3">
                        {minutes.toString().padStart(2, '0')}
                      </div>
                      <button
                        onClick={() => adjustTime('minutes', 'subtract')}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Minus className="h-4 w-4 mx-auto" />
                      </button>
                    </div>
                  </div>

                  {/* 초 */}
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-400 mb-3">초</label>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => adjustTime('seconds', 'add')}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4 mx-auto" />
                      </button>
                      <div className="text-3xl font-bold font-mono bg-gray-700 rounded-lg py-3">
                        {seconds.toString().padStart(2, '0')}
                      </div>
                      <button
                        onClick={() => adjustTime('seconds', 'subtract')}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Minus className="h-4 w-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 컨트롤 버튼 */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={toggleTimer}
                  className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-medium transition-all transform hover:scale-105 ${
                    isActive
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  }`}
                >
                  {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  <span>{isActive ? '일시정지' : '시작'}</span>
                </button>
                
                <button
                  onClick={stopTimer}
                  disabled={!isActive && remainingSeconds === 0}
                  className={`flex items-center space-x-2 px-6 py-4 rounded-lg font-medium transition-colors ${
                    (!isActive && remainingSeconds === 0)
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  <Square className="h-4 w-4" />
                  <span>정지</span>
                </button>
                
                <button
                  onClick={resetTimer}
                  className="flex items-center space-x-2 px-6 py-4 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>리셋</span>
                </button>
              </div>
            </div>

            {/* 타이머 히스토리 */}
            {timerHistory.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-6">
                <h3 className="text-lg font-bold mb-4">타이머 히스토리</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {timerHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          item.wasCompleted ? 'bg-green-500' : 'bg-orange-500'
                        }`}></div>
                        <div>
                          <div className="text-sm text-white font-mono">{item.duration}</div>
                          <div className="text-xs text-gray-400">
                            {item.wasCompleted ? '완료' : '중단'} · {item.completedAt.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const [h, m, s] = item.duration.split(':').map(Number);
                          setHours(h);
                          setMinutes(m);
                          setSeconds(s);
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

          {/* 오른쪽: 프리셋 및 기능 */}
          <div className="space-y-6">
            
            {/* 빠른 프리셋 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">빠른 설정</h3>
              <div className="space-y-2">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    disabled={isActive}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPreset === preset.id
                        ? 'bg-cyan-600 text-white'
                        : isActive
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    <div className="text-sm text-white">{preset.name}</div>
                    <div className="text-xs text-gray-400">
                      {formatTime(calculateTotalSeconds(preset.hours, preset.minutes, preset.seconds)).display}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 통계 */}
            {timerHistory.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4">통계</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold">{timerHistory.length}</div>
                    <div className="text-gray-400 text-sm">총 타이머 사용</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{timerHistory.filter(h => h.wasCompleted).length}</div>
                    <div className="text-gray-400 text-sm">완료된 타이머</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {timerHistory.filter(h => h.wasCompleted).length > 0 
                        ? Math.round((timerHistory.filter(h => h.wasCompleted).length / timerHistory.length) * 100)
                        : 0}%
                    </div>
                    <div className="text-gray-400 text-sm">완료율</div>
                  </div>
                </div>
              </div>
            )}

            {/* 사용 가이드 */}
            <div className="bg-cyan-900/20 rounded-lg p-6 border border-cyan-800/30">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Clock className="h-5 w-5 text-cyan-400 mr-2" />
                사용 가이드
              </h3>
              <div className="space-y-2 text-sm text-cyan-300">
                <div>• +/- 버튼으로 시간을 설정하세요</div>
                <div>• 빠른 설정에서 자주 사용하는 시간 선택</div>
                <div>• 타이머 완료 시 알림과 소리로 알려드립니다</div>
                <div>• 브라우저를 닫아도 백그라운드에서 작동합니다</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}