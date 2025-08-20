'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // 테마 변경 함수
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    
    // HTML 클래스 업데이트
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
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

  // 초기화
  useEffect(() => {
    setMounted(true);
    
    try {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        updateTheme(savedTheme);
      } else {
        // 시스템 테마 감지
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        updateTheme(systemTheme);
      }
    } catch (error) {
      console.warn('localStorage 접근 실패:', error);
      updateTheme('light');
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
        className="w-10 h-10 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
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
      className="w-10 h-10 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      title={getTooltip()}
    >
      {getIcon()}
      <span className="sr-only">테마 변경</span>
    </Button>
  );
}