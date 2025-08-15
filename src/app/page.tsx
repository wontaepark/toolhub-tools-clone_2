import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Clock, 
  Brain, 
  Key, 
  Calculator,
  Calendar,
  Youtube,
  Shuffle,
  ArrowRight,
  Users,
  Star,
  Zap,
  Code,
  Smartphone,
  CheckCircle,
  RefreshCw,
  Headphones,
  BarChart3,
  Bot,
  Smartphone as Mobile,
  Share2,
  Languages,
  Mail,
  ChevronDown,
  Target,
  Eye,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ToolHub.tools - 무료 웹 도구 모음',
  description: '포모도로 타이머, MBTI 테스트, 비밀번호 생성기 등 일상과 업무에 필요한 다양한 도구들을 무료로 제공합니다.',
  keywords: '웹 도구, 포모도로 타이머, MBTI 테스트, 무료 유틸리티, 온라인 도구, toolhub',
  openGraph: {
    title: 'ToolHub.tools - 무료 웹 도구 모음',
    description: '포모도로 타이머, MBTI 테스트, 비밀번호 생성기 등 일상과 업무에 필요한 다양한 도구들을 무료로 제공합니다.',
    url: 'https://toolhub.tools',
  },
  alternates: {
    canonical: 'https://toolhub.tools',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white mb-8">
            지금 바로 인기 도구 사용하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            ToolHub.tools
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            일상을 더 편리하게 만드는 도구 모음
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            포모도로 타이머부터 MBTI 테스트까지, 생산성과 재미를 동시에 잡는 무료 웹 도구 모음입니다. 
            설치나 가입 없이 즉시 사용할 수 있는 편리한 도구들을 제공합니다.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">이미 사용하고 있어요</div>
            </div>
            <div className="flex flex-col items-center">
              <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">50,000+</div>
              <div className="text-gray-600 dark:text-gray-400">월 평균 도구 사용 횟수</div>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-yellow-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">98%</div>
              <div className="text-gray-600 dark:text-gray-400">사용자 만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <Zap className="h-5 w-5 text-yellow-600" />
              <span>빠른 접근</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <Star className="h-5 w-5 text-yellow-600" />
              <span>무료 사용</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <Smartphone className="h-5 w-5 text-yellow-600" />
              <span>모든 기기</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid - 9 Tools */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              사용 가능한 도구들
            </h2>
            <p className="text-xl text-gray-600">
              일상과 업무에 필요한 다양한 도구들을 무료로 이용해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. 포모도로 타이머 */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-300 transition-all group shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <Badge className="bg-green-100 text-green-700 border-green-200">사용 가능</Badge>
                </div>
                <CardTitle className="text-gray-900 group-hover:text-orange-600 transition-colors">
                  포모도로 타이머
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  25분 집중 + 5분 휴식의 포모도로 기법으로 생산성을 극대화하세요
                </p>
                <Link href="/tools/pomodoro">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    사용하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 2. 범용 타이머 */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300 transition-all group shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <Badge className="bg-green-100 text-green-700 border-green-200">사용 가능</Badge>
                </div>
                <CardTitle className="text-gray-900 group-hover:text-blue-600 transition-colors">
                  범용 타이머
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  원하는 시간을 자유롭게 설정할 수 있는 카운트다운 타이머
                </p>
                <Link href="/tools/timer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    사용하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 3. 번호 추첨기 */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300 transition-all group shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Shuffle className="h-8 w-8 text-purple-600" />
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">새로운</Badge>
                </div>
                <CardTitle className="text-gray-900 group-hover:text-purple-600 transition-colors">
                  번호 추첨기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  공정하고 재미있는 번호 추첨을 위한 도구입니다
                </p>
                <Link href="/tools/number-raffle">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    사용하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 4. 썸네일 다운로더 */}
            <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:border-red-300 transition-all group shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Youtube className="h-8 w-8 text-red-600" />
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">새로운</Badge>
                </div>
                <CardTitle className="text-gray-900 group-hover:text-red-600 transition-colors">
                  썸네일 다운로더
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  YouTube 동영상의 고화질 썸네일 이미지를 다운로드하세요
                </p>
                <Link href="/tools/thumbnail-downloader">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    사용하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 5. 비밀번호 생성기 */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 hover:border-orange-300 transition-all group shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Key className="h-8 w-8 text-orange-600" />
                  <Badge className="bg-green-100 text-green-700 border-green-200">사용 가능</Badge>
                </div>
                <CardTitle className="text-gray-900 group-hover:text-orange-600 transition-colors">
                  비밀번호 생성기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  안전하고 강력한 비밀번호를 자동으로 생성합니다
                </p>
                <Link href="/tools/password-generator">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    사용하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 6. 단위 변환기 */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300 transition-all group shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Calculator className="h-8 w-8 text-blue-600" />
                  <Badge className="bg-green-100 text-green-700 border-green-200">사용 가능</Badge>
                </div>
                <CardTitle className="text-gray-900 group-hover:text-blue-600 transition-colors">
                  단위 변환기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  길이, 무게, 온도, 부피 등 다양한 단위를 변환하세요
                </p>
                <Link href="/tools/unit-converter">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    사용하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 7. 날짜 계산기 */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300 transition-all group shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <Badge className="bg-green-100 text-green-700 border-green-200">사용 가능</Badge>
                </div>
                <CardTitle className="text-gray-900 group-hover:text-green-600 transition-colors">
                  날짜 계산기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  날짜 간격 계산, 특정 날짜 찾기 등 날짜 관련 계산
                </p>
                <Link href="/tools/date-calculator">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    사용하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 8. MBTI 성격유형 테스트 */}
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:border-purple-300 transition-all group shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Brain className="h-8 w-8 text-purple-600" />
                  <Badge className="bg-green-100 text-green-700 border-green-200">사용 가능</Badge>
                </div>
                <CardTitle className="text-gray-900 group-hover:text-purple-600 transition-colors">
                  MBTI 성격유형 테스트
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  16가지 성격유형 중 나는 어떤 타입일까요? 정확한 테스트로 알아보세요
                </p>
                <Link href="/tools/mbti">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    사용하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 9. 테토-에겐 성격유형 테스트 */}
            <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:border-red-300 transition-all group shadow-sm hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                  <Star className="h-8 w-8 text-red-600" />
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">새로운</Badge>
                    </div>
                <CardTitle className="text-gray-900 group-hover:text-red-600 transition-colors">
                  테토-에겐 성격유형 테스트
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                <p className="text-gray-600 mb-4">
                  화제의 테토-에겐 테스트! 나는 테토? 아니면 에겐?
                    </p>
                <Link href="/tools/teto-egen">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        사용하기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ToolHub.tools 소개
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              ToolHub.tools는 일상과 업무에서 필요한 다양한 도구들을 한 곳에 모아 제공하는 무료 웹 서비스입니다. 
              사용자 친화적인 인터페이스와 정확한 기능으로 여러분의 디지털 라이프를 더욱 편리하게 만들어드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-gray-900">미션</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  누구나 쉽게 접근할 수 있는 무료 도구를 제공하여 일상의 불편함을 해소하고, 
                  더 나은 디지털 경험을 만들어가는 것입니다.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-gray-900">비전</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  가장 신뢰받는 온라인 도구 플랫폼이 되어, 전 세계 사용자들이 
                  언제 어디서나 필요한 도구를 쉽게 찾고 사용할 수 있도록 하는 것입니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              품질 보증과 신뢰성
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">정확성 검증</h3>
              <p className="text-gray-600">
                모든 계산 도구는 다양한 테스트 케이스를 통해 정확성을 검증했습니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">지속적인 업데이트</h3>
              <p className="text-gray-600">
                사용자 피드백을 바탕으로 정기적으로 기능을 개선하고 새로운 도구를 추가합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">사용자 지원</h3>
              <p className="text-gray-600">
                빠른 문제 해결을 위한 지원 시스템을 구축했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              향후 계획
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Short-term Plan */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <CardTitle className="text-gray-900">단기 계획 (3-6개월)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <Plus className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>새로운 도구 추가: 환율 변환기, 색상 팔레트 생성기, 텍스트 분석 도구</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>AI 기능 도입: 인공지능 기반 추천 시스템 및 자동화 기능</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>성능 최적화: 로딩 속도 개선 및 사용자 경험 향상</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Long-term Plan */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <CardTitle className="text-gray-900">중장기 계획 (6개월-2년)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <Code className="h-5 w-5 text-purple-600 mt-0.5" />
                    <span>API 서비스: 개발자를 위한 ToolHub API 제공</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Mobile className="h-5 w-5 text-purple-600 mt-0.5" />
                    <span>모바일 앱: 네이티브 모바일 애플리케이션 출시</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Share2 className="h-5 w-5 text-purple-600 mt-0.5" />
                    <span>협업 기능: 팀 단위 도구 공유 및 협업 기능</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Languages className="h-5 w-5 text-purple-600 mt-0.5" />
                    <span>언어 확장: 중국어, 스페인어, 프랑스어 등 추가 언어 지원</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              문의 및 지원
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">연락 방법</h3>
              <p className="text-gray-600 mb-4">
                문의사항이나 제안사항이 있으시면 언제든 연락주세요. 
                사용자 피드백을 반영하여 더욱 편리한 서비스로 발전시켜 나가겠습니다.
              </p>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-blue-600">contact@toolhub.tools</span>
              </div>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                문의하기
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                응답 시간: 영업일 기준 24시간 이내
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">지원 정책</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>무료 기술 지원: 모든 사용자에게 무료로 기술 지원 제공</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>접근성 지원: 장애인을 위한 웹 접근성 개선 지속</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>다국어 지원: 한국어, 영어, 일본어로 고객 지원 제공</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            ToolHub.tools와 함께 더욱 효율적이고 편리한 디지털 라이프를 경험해보세요!
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            지금 바로 아래에서 원하는 도구를 선택하여 사용해보세요. 
            설치나 가입 없이 즉시 시작할 수 있습니다.
          </p>
          <ChevronDown className="h-8 w-8 text-gray-600 mx-auto animate-bounce" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🛠️ ToolHub.tools
              </div>
              <p className="text-gray-400">
                일상에 필요한 모든 도구를 한 곳에서
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">인기 도구</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tools/pomodoro" className="hover:text-white transition-colors">포모도로 타이머</Link></li>
                <li><Link href="/tools/mbti" className="hover:text-white transition-colors">MBTI 테스트</Link></li>
                <li><Link href="/tools/password-generator" className="hover:text-white transition-colors">비밀번호 생성기</Link></li>
                <li><Link href="/tools/unit-converter" className="hover:text-white transition-colors">단위 변환기</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">정보</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">문의하기</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
                <li><Link href="/sitemap" className="hover:text-white transition-colors">사이트맵</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">테마</h3>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <span className="text-gray-400 text-sm">다크/라이트 모드</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ToolHub.tools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}