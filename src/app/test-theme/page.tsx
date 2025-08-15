'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

export default function TestThemePage() {
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

  // SSR 방지
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              로딩 중...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            테마 시스템 테스트
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            다크 모드와 라이트 모드가 제대로 작동하는지 확인해보세요
          </p>
        </div>

        {/* 현재 테마 상태 */}
        <Card className="mb-8 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">현재 테마 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">현재 테마</div>
                <Badge variant="secondary" className="text-lg">
                  {theme === 'light' && <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'dark' && <Moon className="h-4 w-4 mr-2" />}
                  {theme === 'light' ? '라이트' : '다크'}
                </Badge>
              </div>
              <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">CSS 변수</div>
                <div className="text-sm font-mono text-gray-900 dark:text-white">
                  data-theme="{isDark ? 'dark' : 'light'}"
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 테마 변경 버튼 */}
        <Card className="mb-8 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">테마 변경</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={() => updateTheme('light')}
                variant={theme === 'light' ? 'default' : 'outline'}
                className="h-16"
              >
                <Sun className="h-5 w-5 mr-2" />
                라이트 모드
              </Button>
              <Button 
                onClick={() => updateTheme('dark')}
                variant={theme === 'dark' ? 'default' : 'outline'}
                className="h-16"
              >
                <Moon className="h-5 w-5 mr-2" />
                다크 모드
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 색상 테스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">배경색 테스트</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-gray-900 dark:text-white font-semibold">Primary Background</div>
                <div className="text-gray-600 dark:text-gray-400">bg-white dark:bg-gray-800</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-gray-900 dark:text-white font-semibold">Secondary Background</div>
                <div className="text-gray-600 dark:text-gray-400">bg-gray-50 dark:bg-gray-900</div>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-gray-900 dark:text-white font-semibold">Tertiary Background</div>
                <div className="text-gray-600 dark:text-gray-400">bg-gray-100 dark:bg-gray-700</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">텍스트 색상 테스트</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-gray-900 dark:text-white font-semibold">Primary Text</div>
                <div className="text-gray-600 dark:text-gray-400">text-gray-900 dark:text-white</div>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400 font-semibold">Secondary Text</div>
                <div className="text-gray-500 dark:text-gray-500">text-gray-600 dark:text-gray-400</div>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-gray-500 dark:text-gray-500 font-semibold">Tertiary Text</div>
                <div className="text-gray-400 dark:text-gray-500">text-gray-500 dark:text-gray-500</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 그라데이션 테스트 */}
        <Card className="mt-8 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">그라데이션 테스트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Purple to Pink</span>
              </div>
              <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Blue to Cyan</span>
              </div>
              <div className="h-32 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Green to Blue</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
