import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 지원하는 로케일 목록
  locales: ['ko', 'en'],
  
  // 기본 로케일
  defaultLocale: 'ko'
});

export const config = {
  // 국제화가 적용될 경로 패턴
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
