'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // 실제 적용될 테마 계산
  const getActualTheme = (): 'light' | 'dark' => {
    return theme;
  };

  const isDark = getActualTheme() === 'dark';

  // 테마 변경 함수
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.warn('localStorage 저장 실패:', error);
    }
  };

  // 테마 토글 함수
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  // DOM에 테마 적용
  useEffect(() => {
    const root = document.documentElement;
    const actualTheme = getActualTheme();
    
    root.setAttribute('data-theme', actualTheme);
    root.classList.toggle('dark', actualTheme === 'dark');
  }, [theme]);

  // 초기화
  useEffect(() => {
    setMounted(true);
    
    try {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        setTheme(savedTheme);
      } else {
        // 기본값은 라이트 모드
        setTheme('light');
      }
    } catch (error) {
      console.warn('localStorage 접근 실패:', error);
      setTheme('light');
    }
  }, []);

  const getIcon = () => {
    return theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
  };

  const getTooltip = () => {
    return theme === 'light' ? '다크 모드로 변경' : '라이트 모드로 변경';
  };

  // SSR 방지
  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-8 h-8 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">테마 변경</span>
      </Button>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="w-8 h-8 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      title={getTooltip()}
    >
      {getIcon()}
      <span className="sr-only">테마 변경</span>
    </Button>
  );
}