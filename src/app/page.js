'use client';

import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-16 pb-20">
        <div className="container mx-auto px-4 text-center">
          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                ToolHub
              </span>
              <span className="text-gray-900 dark:text-white">.tools</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
              일상을 더 편리하게 만드는 웹 도구 모음
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              설치나 가입 없이 바로 사용할 수 있는 다양한 온라인 도구들을 제공합니다
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => {
                document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              도구 둘러보기
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
              더 알아보기
            </button>
          </div>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
              누구나 쉽고 빠르게 사용할 수 있는 웹 기반 유틸리티 도구 모음
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
              포모도로 타이머, 번호 추첨기, 유튜브 썸네일 다운로더, 비밀번호 생성기, 단위 변환기, MBTI 테스트 등 일상과 업무에 유용한 13가지 도구를 하나의 웹사이트에서 제공
            </p>
          </div>
        </div>
      </section>

      {/* ToolHub.tools 소개 섹션 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              ToolHub.tools 소개
            </h2>
            <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
              <p>
                ToolHub.tools는 누구나 쉽고 빠르게 사용할 수 있는 웹 기반 유틸리티 도구 모음입니다. 
                포모도로 타이머, 번호 추첨기, 유튜브 썸네일 다운로더, 비밀번호 생성기, 단위 변환기, 
                MBTI 테스트 등 일상과 업무에 유용한 13가지 도구를 하나의 웹사이트에서 제공합니다.
              </p>
              <p>
                설치나 회원가입 없이 브라우저에서 바로 실행 가능한 무료 도구들을 통해 사용자 여러분의 
                생산성과 편의성을 높이는 것이 ToolHub.tools의 궁극적인 목표입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 미션 & 비전 섹션 */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* 미션 */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">미션</h2>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
                  &quot;복잡한 도구는 이제 그만, 간단하고 효과적인 웹 도구로 모든 사람의 일상을 편리하게&quot;
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  현대인들은 다양한 계산, 시간 관리, 변환 작업 등을 위해 여러 애플리케이션을 설치하고 관리해야 하는 번거로움을 겪고 있습니다. 
                  ToolHub.tools는 이러한 불편함을 해결하고, 언제 어디서나 브라우저만으로 필요한 도구를 즉시 사용할 수 있는 환경을 제공합니다.
                </p>
              </div>

              {/* 비전 */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">비전</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  앞으로 더 많은 유용한 도구들을 추가하여 사용자들의 디지털 라이프를 더욱 편리하게 만들어가겠습니다. 
                  인공지능 기반 도구, 고급 시간 관리 도구, 더욱 다양한 변환 도구 등을 통해 웹 기반 유틸리티의 새로운 표준을 제시하고자 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 섹션 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              핵심 가치
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            
            {/* 완전 무료 서비스 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🆓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">완전 무료 서비스</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                모든 도구는 영구적으로 무료로 제공됩니다. 숨겨진 비용이나 프리미엄 플랜은 존재하지 않습니다.
              </p>
            </div>

            {/* 보안과 프라이버시 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">보안과 프라이버시</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                모든 데이터는 사용자의 브라우저에만 저장되며, 외부 서버로 전송되지 않아 완전한 프라이버시를 보장합니다.
              </p>
            </div>

            {/* 접근성과 포용성 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">접근성과 포용성</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                한국어, 영어, 일본어를 지원하며, 모바일과 데스크톱 모든 환경에서 최적화된 반응형 디자인을 제공합니다.
              </p>
            </div>

            {/* 사용자 중심 디자인 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">사용자 중심 디자인</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                복잡한 기능보다는 직관적이고 사용하기 쉬운 인터페이스를 추구하며, 최소한의 클릭으로 원하는 결과를 얻을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 기술적 특징 섹션 */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              기술적 특징
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* 최신 웹 기술 활용 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">최신 웹 기술 활용</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">반응형 웹 디자인</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">모든 기기에서 최적화된 화면 제공</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">PWA</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">앱과 같은 사용 경험</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">빠른 로딩 속도</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">최적화된 코드로 즉시 실행</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">오프라인 지원</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">네트워크 연결 없이도 기본 기능 사용 가능</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* 크로스 플랫폼 호환성 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">크로스 플랫폼 호환성</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">모든 주요 브라우저 지원</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Chrome, Firefox, Safari, Edge</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">모바일 최적화</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">iOS, Android 터치 인터페이스 완벽 지원</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">키보드 단축키</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">데스크톱 사용자를 위한 효율적인 조작법</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 품질 보증과 신뢰성 섹션 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              품질 보증과 신뢰성
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* 정확성 검증 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">정확성 검증</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                모든 계산 도구는 다양한 테스트 케이스를 통해 정확성을 검증받았습니다.
              </p>
            </div>

            {/* 지속적인 업데이트 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">지속적인 업데이트</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                사용자 피드백을 바탕으로 정기적으로 기능을 개선하고 새로운 도구를 추가합니다.
              </p>
            </div>

            {/* 사용자 지원 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">사용자 지원</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                문제 발생 시 빠른 해결을 위한 지원 체계를 구축하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 향후 계획 섹션 */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              향후 계획
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* 단기 계획 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">단기 계획 (3-6개월)</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">새로운 도구 추가</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">환율 변환기, 색상 팔레트 생성기, 텍스트 분석 도구</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">AI 기능 도입</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">인공지능 기반 추천 시스템 및 자동화 기능</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">성능 최적화</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">로딩 속도 개선 및 사용자 경험 향상</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* 중장기 계획 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">중장기 계획 (6개월-2년)</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">API 서비스</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">개발자를 위한 ToolHub API 제공</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">모바일 앱</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">네이티브 모바일 애플리케이션 출시</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">협업 기능</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">팀 단위 도구 공유 및 협업 기능</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">언어 확장</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">중국어, 스페인어, 프랑스어 등 추가 언어 지원</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 문의 및 지원 섹션 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              문의 및 지원
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* 연락 방법 */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">연락 방법</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                문의나 제안이 있으시면 언제든지 연락해주세요. 사용자 피드백을 반영하여 더욱 편리한 서비스로 발전해 나가겠습니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">이메일:</span>
                  <a href="mailto:contact@toolhub.tools" className="text-blue-600 dark:text-blue-400 hover:underline">
                    contact@toolhub.tools
                  </a>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  응답 시간: 영업일 기준 24시간 이내
                </div>
              </div>
            </div>

            {/* 지원 정책 */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">지원 정책</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">무료 기술 지원</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">모든 사용자에게 무료로 기술 지원 제공</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">접근성 지원</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">장애인을 위한 웹 접근성 개선 지속</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">다국어 지원</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">한국어, 영어, 일본어로 고객 지원 제공</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 마무리 CTA 섹션 */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            ToolHub.tools와 함께 더욱 효율적이고 편리한 디지털 라이프를 경험해보세요!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            지금 바로 아래에서 원하는 도구를 선택하여 사용해보세요. 설치나 가입 없이 즉시 시작할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools-section" className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            인기 도구들
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Pomodoro Timer */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">포모도로 타이머</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">집중력 향상</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                25분 집중 + 5분 휴식으로 생산성을 높이세요
              </p>
                              <Link href="/tools/pomodoro" className="block">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                    사용하기
                  </button>
                </Link>
            </div>

            {/* MBTI Test */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">MBTI 테스트</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">성격 분석</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                16가지 성격 유형 중 나의 유형을 찾아보세요
              </p>
                              <Link href="/tools/mbti" className="block">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                    사용하기
                  </button>
                </Link>
            </div>

            {/* Password Generator */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">비밀번호 생성기</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">보안 강화</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                안전하고 복잡한 비밀번호를 자동으로 생성합니다
              </p>
                              <Link href="/tools/password-generator" className="block">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                    사용하기
                  </button>
                </Link>
            </div>

            {/* Unit Converter */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📏</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">단위 변환기</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">편리한 계산</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                길이, 무게, 온도 등 다양한 단위를 변환하세요
              </p>
                              <Link href="/tools/unit-converter" className="block">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                    사용하기
                  </button>
                </Link>
            </div>

            {/* Date Calculator */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">날짜 계산기</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">날짜 계산</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                날짜 간격 계산과 특정 날짜 찾기를 도와드립니다
              </p>
              <Link href="/tools/date-calculator" className="block">
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                  사용하기
                </button>
              </Link>
            </div>

            {/* Number Raffle */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🎲</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">번호 추첨기</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">랜덤 추첨</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                공정하고 재미있는 번호 추첨을 도와드립니다
              </p>
              <Link href="/tools/number-raffle" className="block">
                <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                  사용하기
                </button>
              </Link>
            </div>

            {/* Thumbnail Downloader */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📺</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">썸네일 다운로더</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">이미지 다운로드</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                YouTube 동영상의 고화질 썸네일 이미지를 다운로드하세요
              </p>
              <Link href="/tools/thumbnail-downloader" className="block">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                  사용하기
                </button>
              </Link>
            </div>

            {/* Timer */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">범용 타이머</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">시간 관리</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                원하는 시간을 자유롭게 설정할 수 있는 카운트다운 타이머
              </p>
              <Link href="/tools/timer" className="block">
                <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                  사용하기
                </button>
              </Link>
            </div>

            {/* Teto-Egen Test */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">테토-에겐 테스트</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">성격 유형</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                화제의 테토-에겐 테스트! 나는 테토? 아니면 에겐?
              </p>
              <Link href="/tools/teto-egen" className="block">
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                  사용하기
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">월 활성 사용자</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50,000+</div>
              <div className="text-gray-600 dark:text-gray-400">도구 사용 횟수</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">사용자 만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-12">
          
          {/* 상단 영역 - 도구 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* 왼쪽 컬럼 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">인기 도구</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/tools/pomodoro" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    포모도로 타이머
                  </Link>
                </li>
                <li>
                  <Link href="/tools/thumbnail-downloader" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
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
                  <Link href="/tools/number-raffle" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    번호 추첨기
                  </Link>
                </li>
                <li>
                  <Link href="/tools/mbti" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
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
                  <Link href="/tools/password-generator" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Password Generator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/timer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
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
                  <Link href="/tools/unit-converter" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Unit Converter
                  </Link>
                </li>
                <li>
                  <Link href="/tools/date-calculator" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
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
                  <a href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    개인정보 처리방침
                  </a>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <a href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    이용약관
                  </a>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <a href="/contact" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    문의하기
                  </a>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <a href="/sitemap" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    사이트맵
                  </a>
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
    </div>
  );
}