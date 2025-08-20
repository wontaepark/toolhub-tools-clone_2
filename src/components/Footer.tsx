import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        
        {/* 상단 영역 - 도구 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* 왼쪽 컬럼 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">인기 도구</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/tools/pomodoro" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  포모도로 타이머
                </Link>
              </li>
              <li>
                <Link 
                  href="/tools/thumbnail-downloader" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  썸네일 다운로더
                </Link>
              </li>
            </ul>
          </div>

          {/* 가운데 왼쪽 컬럼 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">도구</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/tools/number-raffle" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  번호 추첨기
                </Link>
              </li>
              <li>
                <Link 
                  href="/tools/mbti" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  MBTI 테스트
                </Link>
              </li>
            </ul>
          </div>

          {/* 가운데 오른쪽 컬럼 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">유틸리티</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/tools/password-generator" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Password Generator
                </Link>
              </li>
              <li>
                <Link 
                  href="/tools/timer" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  범용 타이머
                </Link>
              </li>
            </ul>
          </div>

          {/* 오른쪽 컬럼 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">계산기</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/tools/unit-converter" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Unit Converter
                </Link>
              </li>
              <li>
                <Link 
                  href="/tools/date-calculator" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  날짜 계산기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 영역 - 저작권 및 링크 */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* 왼쪽 - 저작권 */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Toolhub.tools. 모든 권리 보유.
            </div>

            {/* 오른쪽 - 링크들 */}
            <div className="flex items-center space-x-6">
              
              {/* 텍스트 링크들 */}
              <div className="flex items-center space-x-4 text-sm">
                <Link 
                  href="/privacy" 
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  개인정보 처리방침
                </Link>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <Link 
                  href="/terms" 
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  이용약관
                </Link>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <Link 
                  href="/contact" 
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  문의하기
                </Link>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <Link 
                  href="/sitemap" 
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  사이트맵
                </Link>
              </div>

              {/* 소셜 아이콘들 */}
              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                
                <a
                  href="mailto:contact@toolhub.tools"
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="이메일 문의"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

