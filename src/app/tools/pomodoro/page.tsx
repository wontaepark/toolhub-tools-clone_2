'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, RotateCcw, Settings, Plus, Square, Trash2, Check, Volume2, VolumeX } from 'lucide-react';

export default function PomodoroTimer() {
  // 타이머 상태
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [totalCycles, setTotalCycles] = useState(4);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  
  // 설정
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoStartBreaks, setAutoStartBreaks] = useState(true);
  
  // 작업 목록
  const [tasks, setTasks] = useState<Array<{id: number, text: string, completed: boolean}>>([]);
  const [newTask, setNewTask] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 진행률 계산
  const totalSessionTime = isBreak
    ? (cycle % 4 === 0 ? longBreakTime : breakTime) * 60
    : workTime * 60;
  const currentTime = minutes * 60 + seconds;
  const progress = ((totalSessionTime - currentTime) / totalSessionTime) * 100;

  // 타이머 로직
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          completeSession();
        }
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
  }, [isActive, minutes, seconds]);

  // 세션 완료 처리
  const completeSession = () => {
    setIsActive(false);
    playAlarm();
    
    if (isBreak) {
      // 휴식 완료 -> 다음 작업 세션
      setIsBreak(false);
      setMinutes(workTime);
      setSeconds(0);
      if (cycle < totalCycles) {
        setCycle(cycle + 1);
      } else {
        // 사이클 완료
        setCompletedCycles(completedCycles + 1);
        setCycle(1);
      }
      if (autoStartBreaks) {
        setTimeout(() => setIsActive(true), 1000);
      }
    } else {
      // 작업 완료 -> 휴식 세션
      setCompletedPomodoros(completedPomodoros + 1);
      setIsBreak(true);
      if (cycle % 4 === 0) {
        setMinutes(longBreakTime);
      } else {
        setMinutes(breakTime);
      }
      setSeconds(0);
      if (autoStartBreaks) {
        setTimeout(() => setIsActive(true), 1000);
      }
    }
    
    // 로컬 스토리지에 통계 저장
    saveToLocalStorage();
  };

  // 알람 소리
  const playAlarm = () => {
    if (typeof window !== 'undefined' && Notification.permission === 'granted') {
      new Notification(
        isBreak ? '휴식 시간 끝!' : '집중 시간 끝!',
        {
          body: isBreak ? '다시 집중할 시간입니다!' : '잠시 휴식하세요!',
          icon: '/favicon.ico'
        }
      );
    }
    
    if (soundEnabled) {
      try {
        if (typeof window !== 'undefined') {
          const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
          
          // 더 좋은 알림음 생성
          for (let i = 0; i < 3; i++) {
            setTimeout(() => {
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.value = isBreak ? 440 : 880; // 다른 주파수
              oscillator.type = 'sine';
              
              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.3);
            }, i * 400);
          }
        }
      } catch (error) {
        console.log('오디오 재생 실패:', error);
      }
    }
  };

  // 타이머 시작/정지
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // 타이머 리셋
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(workTime);
    setSeconds(0);
    setCycle(1);
  };

  // 작업 관리 함수들
  const addTask = () => {
    if (newTask.trim()) {
      const task = { id: Date.now(), text: newTask.trim(), completed: false };
      setTasks([...tasks, task]);
      setNewTask('');
      saveToLocalStorage();
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (currentTaskId === id) {
      setCurrentTaskId(null);
    }
    saveToLocalStorage();
  };

  const toggleTaskComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    saveToLocalStorage();
  };

  const selectCurrentTask = (id: number) => {
    setCurrentTaskId(id);
    saveToLocalStorage();
  };

  // 설정 업데이트
  const updateSettings = (newWorkTime: number, newBreakTime: number, newLongBreakTime: number) => {
    setWorkTime(newWorkTime);
    setBreakTime(newBreakTime);
    setLongBreakTime(newLongBreakTime);
    
    // 현재 세션이 비활성화 상태일 때만 시간 업데이트
    if (!isActive) {
      if (isBreak) {
        const breakDuration = cycle % 4 === 0 ? newLongBreakTime : newBreakTime;
        setMinutes(breakDuration);
      } else {
        setMinutes(newWorkTime);
      }
      setSeconds(0);
    }
    saveToLocalStorage();
  };

  // 로컬 스토리지 저장
  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const data = {
        completedPomodoros,
        completedCycles,
        tasks,
        currentTaskId,
        workTime,
        breakTime,
        longBreakTime,
        soundEnabled,
        autoStartBreaks,
        date: new Date().toDateString()
      };
      localStorage.setItem('pomodoroData', JSON.stringify(data));
    }
  };

  // 로컬 스토리지 로드
  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pomodoroData');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          const today = new Date().toDateString();
          
          if (data.date === today) {
            // 오늘 데이터면 통계 복원
            setCompletedPomodoros(data.completedPomodoros || 0);
            setCompletedCycles(data.completedCycles || 0);
          }
          
          // 설정과 작업 목록은 항상 복원
          setTasks(data.tasks || []);
          setCurrentTaskId(data.currentTaskId || null);
          setWorkTime(data.workTime || 25);
          setBreakTime(data.breakTime || 5);
          setLongBreakTime(data.longBreakTime || 15);
          setSoundEnabled(data.soundEnabled !== undefined ? data.soundEnabled : true);
          setAutoStartBreaks(data.autoStartBreaks !== undefined ? data.autoStartBreaks : true);
          
          // 타이머 시간도 설정값으로 초기화
          if (!isActive && !isBreak) {
            setMinutes(data.workTime || 25);
          }
        } catch (error) {
          console.log('데이터 로드 실패:', error);
        }
      }
    }
  };

  // 초기 로드
  useEffect(() => {
    loadFromLocalStorage();
    if (typeof window !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

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
              포모도로 타이머
            </h1>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* 메인 설명 */}
      <div className="container mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">포모도로 타이머</h2>
          <p className="text-gray-400">집중력 향상을 위한 포모도로 기법 타이머입니다. 작업 목표 관리와 세션 추적 기능을 제공합니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 왼쪽: 메인 타이머 */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              
              {/* 상태 표시 */}
              <div className="text-center mb-6">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                  isBreak ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {isBreak ? '휴식 시간' : '작업 시간'}
                </div>
                <div className="text-gray-400 text-sm">
                  사이클 {cycle}
                </div>
              </div>

              {/* 원형 프로그레스 바 */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  {/* 배경 원 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  {/* 진행률 원 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke={isBreak ? "#10b981" : "#ef4444"}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-in-out"
                  />
                </svg>

                {/* 중앙 시간 표시 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white font-mono">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={toggleTimer}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isActive ? '일시정지' : '시작'}</span>
                </button>
                
                <button
                  onClick={resetTimer}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>건너뛰기</span>
                </button>
                
                <button
                  onClick={resetTimer}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white transition-colors border border-gray-600"
                >
                  <Square className="h-4 w-4" />
                  <span>초기화</span>
                </button>
              </div>

              {/* 현재 작업 */}
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-2">현재 작업:</div>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  value={currentTaskId || ''}
                  onChange={(e) => e.target.value ? selectCurrentTask(Number(e.target.value)) : setCurrentTaskId(null)}
                >
                  <option value="">작업을 선택하세요...</option>
                  {tasks.filter(task => !task.completed).map(task => (
                    <option key={task.id} value={task.id}>{task.text}</option>
                  ))}
                </select>
                <div className="flex items-center justify-center mt-2">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isBreak ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-gray-400">{isBreak ? '휴식 시간' : '작업 시간'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 통계 및 작업 목록 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 오늘 통계 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">오늘</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold">{completedPomodoros}</div>
                  <div className="text-gray-400 text-sm">완료된 포모도로</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{cycle}/4</div>
                  <div className="text-gray-400 text-sm">현재 세션</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{completedCycles}</div>
                  <div className="text-gray-400 text-sm">사이클</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">일일 목표 (8개)</div>
                  <div className="text-sm">{completedPomodoros}/8</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                      style={{width: `${Math.min((completedPomodoros / 8) * 100, 100)}%`}}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    성장 진행률 {Math.round((completedPomodoros / 8) * 100)}%
                  </div>
                </div>
              </div>
            </div>

            {/* 설정 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">설정</h3>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              {showSettings ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        작업 시간 (분)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={workTime}
                        onChange={(e) => setWorkTime(Number(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        짧은 휴식 (분)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={breakTime}
                        onChange={(e) => setBreakTime(Number(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        긴 휴식 (분)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={longBreakTime}
                        onChange={(e) => setLongBreakTime(Number(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          soundEnabled ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                        }`}
                      >
                        {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                        <span className="text-sm">알림음</span>
                      </button>
                      
                      <button
                        onClick={() => setAutoStartBreaks(!autoStartBreaks)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          autoStartBreaks ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                        }`}
                      >
                        자동 시작
                      </button>
                    </div>
                    
                    <button
                      onClick={() => updateSettings(workTime, breakTime, longBreakTime)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                    >
                      설정 저장
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">타이머 설정을 조정할 수 있습니다.</div>
              )}
            </div>

            {/* 작업 목록 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">작업 목록</h3>
                <span className="text-gray-400 text-sm">({tasks.length}개 작업)</span>
              </div>
              
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="새 작업을 입력하세요..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button
                  onClick={addTask}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {tasks.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {tasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                        task.completed 
                          ? 'bg-gray-700/50 border-gray-600 opacity-60' 
                          : currentTaskId === task.id
                            ? 'bg-blue-600/20 border-blue-500'
                            : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                      }`}
                    >
                      <button
                        onClick={() => toggleTaskComplete(task.id)}
                        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          task.completed 
                            ? 'bg-green-600 border-green-600' 
                            : 'border-gray-400 hover:border-green-500'
                        }`}
                      >
                        {task.completed && <Check className="h-3 w-3 text-white" />}
                      </button>
                      
                      <div 
                        className={`flex-1 cursor-pointer ${
                          task.completed ? 'line-through text-gray-500' : 'text-white'
                        }`}
                        onClick={() => !task.completed && selectCurrentTask(task.id)}
                      >
                        {task.text}
                      </div>
                      
                      {currentTaskId === task.id && (
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  작업을 추가하여 포모도로를 시작해 보세요.
                </div>
              )}
              
              {tasks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>완료: {tasks.filter(t => t.completed).length}개</span>
                    <span>진행중: {tasks.filter(t => !t.completed).length}개</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
