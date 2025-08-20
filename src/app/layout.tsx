import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body 
        className={inter.className} 
        suppressHydrationWarning
        style={{ 
          // 브라우저 확장 프로그램이 추가하는 속성들을 무시하기 위한 스타일
          WebkitTextSizeAdjust: '100%',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}