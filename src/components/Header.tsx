import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import {
  Home,
  Map,
  MessageCircle,
  Github,
  Search,
  ChevronDown,
  Wrench
} from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-lg">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <span>ToolHub.tools</span>
            </Link>
          </div>

          {/* Right: Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Home */}
            <Link href="/" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <Home className="h-4 w-4" />
              <span>홈</span>
            </Link>

            {/* Sitemap */}
            <Link href="/sitemap" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              사이트맵
            </Link>

            {/* Contact */}
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              문의하기
            </Link>

            {/* GitHub */}
            <Link href="https://github.com" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>

            {/* Search */}
            <button className="flex items-center justify-center w-8 h-8 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Search className="h-4 w-4" />
            </button>

            {/* Language Selector */}
            <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">
              <span className="text-sm font-medium">KR 한국어</span>
              <ChevronDown className="h-3 w-3" />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="flex items-center justify-center w-8 h-8 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}