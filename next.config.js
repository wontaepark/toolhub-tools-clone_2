/** @type {import('next').NextConfig} */
const nextConfig = {
  // 개발 환경에서는 export를 비활성화하여 middleware 사용 가능
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // hydration mismatch 방지를 위한 설정
  reactStrictMode: false,
  // 개발 환경에서 hydration 경고 숨기기
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  async generateBuildId() {
    return 'toolhub-build-' + Date.now();
  }
};

module.exports = nextConfig;