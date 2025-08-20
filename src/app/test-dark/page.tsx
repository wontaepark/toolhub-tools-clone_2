'use client';

import { useState, useEffect } from 'react';

export default function TestDarkMode() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    const root = document.documentElement;
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">다크 모드 테스트</h1>
        <p className="text-lg mb-6">현재 테마: {theme}</p>
        
        <button
          onClick={toggleTheme}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {theme === 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'}
        </button>
        
        <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <p>이 박스는 라이트 모드에서는 회색, 다크 모드에서는 진한 회색으로 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
}


