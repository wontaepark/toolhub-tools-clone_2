'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Copy, Check, Youtube, Image, Star, ExternalLink, AlertCircle } from 'lucide-react';

interface ThumbnailInfo {
  id: string;
  title: string;
  channel: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    standard: string;
    maxres: string;
  };
  url: string;
  timestamp: Date;
}

interface DownloadHistory {
  id: number;
  videoId: string;
  title: string;
  quality: string;
  timestamp: Date;
}

export default function ThumbnailDownloader() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnailInfo, setThumbnailInfo] = useState<ThumbnailInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // YouTube URL에서 비디오 ID 추출
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };

  // 썸네일 정보 가져오기
  const fetchThumbnailInfo = async () => {
    if (!youtubeUrl.trim()) {
      setError('YouTube URL을 입력해주세요.');
      return;
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      setError('올바른 YouTube URL을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // YouTube 썸네일 URL 생성 (공개 API 없이도 가능)
      const thumbnails = {
        default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      };

      // 썸네일 정보 설정
      setThumbnailInfo({
        id: videoId,
        title: `YouTube 비디오 (${videoId})`,
        channel: '채널 정보',
        thumbnails,
        url: youtubeUrl,
        timestamp: new Date()
      });

    } catch (err) {
      setError('썸네일을 가져오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 썸네일 다운로드
  const downloadThumbnail = async (quality: keyof ThumbnailInfo['thumbnails'], filename: string) => {
    if (!thumbnailInfo) return;

    try {
      const response = await fetch(thumbnailInfo.thumbnails[quality]);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}_${quality}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // 히스토리에 추가
      const newDownload: DownloadHistory = {
        id: Date.now(),
        videoId: thumbnailInfo.id,
        title: thumbnailInfo.title,
        quality,
        timestamp: new Date()
      };
      
      setDownloadHistory(prev => [newDownload, ...prev.slice(0, 19)]);

    } catch (err) {
      console.error('다운로드 실패:', err);
      alert('다운로드에 실패했습니다.');
    }
  };

  // URL 복사
  const copyUrl = async (url: string, quality: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(quality);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  // 즐겨찾기 토글
  const toggleFavorite = () => {
    if (!thumbnailInfo) return;

    const exists = favorites.includes(thumbnailInfo.id);
    if (exists) {
      setFavorites(favorites.filter(id => id !== thumbnailInfo.id));
    } else {
      setFavorites([thumbnailInfo.id, ...favorites.slice(0, 9)]);
    }
  };

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchThumbnailInfo();
    }
  };

  const isFavorite = thumbnailInfo && favorites.includes(thumbnailInfo.id);

  // 썸네일 품질 정보
  const qualityInfo = {
    default: { name: '기본', size: '120×90', description: '가장 작은 크기' },
    medium: { name: '중간', size: '320×180', description: '일반적인 크기' },
    high: { name: '고화질', size: '480×360', description: '고화질 썸네일' },
    standard: { name: '표준', size: '640×480', description: '표준 해상도' },
    maxres: { name: '최고화질', size: '1280×720', description: '최고 해상도' }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>돌아가기</span>
            </Link>
            
            <h1 className="text-xl font-bold text-white">
              YouTube 썸네일 다운로더
            </h1>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* 메인 설명 */}
      <div className="container mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">YouTube 썸네일 다운로더</h2>
          <p className="text-gray-400">YouTube 동영상의 고화질 썸네일 이미지를 다양한 해상도로 다운로드할 수 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 왼쪽: 메인 다운로더 */}
          <div className="lg:col-span-2">
            
            {/* URL 입력 */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-6">
              <h3 className="text-lg font-bold mb-6 text-center">YouTube URL 입력</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    YouTube 동영상 URL
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                    />
                    <button
                      onClick={fetchThumbnailInfo}
                      disabled={isLoading}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        isLoading
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      {isLoading ? '로딩...' : '가져오기'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-red-300 text-sm">{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 썸네일 미리보기 및 다운로드 */}
            {thumbnailInfo && (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                
                {/* 비디오 정보 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Youtube className="h-6 w-6 text-red-500" />
                    <div>
                      <div className="font-semibold text-white">{thumbnailInfo.title}</div>
                      <div className="text-sm text-gray-400">비디오 ID: {thumbnailInfo.id}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={toggleFavorite}
                      className={`p-2 rounded-lg transition-colors ${
                        isFavorite
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    
                    <a
                      href={thumbnailInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-300" />
                    </a>
                  </div>
                </div>

                {/* 썸네일 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(qualityInfo).map(([quality, info]) => (
                    <div key={quality} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                      
                      {/* 썸네일 이미지 */}
                      <div className="relative mb-4">
                        <img
                          src={thumbnailInfo.thumbnails[quality as keyof typeof thumbnailInfo.thumbnails]}
                          alt={`${info.name} 썸네일`}
                          className="w-full rounded-lg border border-gray-600"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {info.size}
                        </div>
                      </div>

                      {/* 품질 정보 */}
                      <div className="mb-4">
                        <div className="font-semibold text-white mb-1">{info.name}</div>
                        <div className="text-sm text-gray-400">{info.description}</div>
                        <div className="text-xs text-gray-500 mt-1">해상도: {info.size}</div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => downloadThumbnail(
                            quality as keyof ThumbnailInfo['thumbnails'], 
                            `youtube_${thumbnailInfo.id}`
                          )}
                          className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span>다운로드</span>
                        </button>
                        
                        <button
                          onClick={() => copyUrl(
                            thumbnailInfo.thumbnails[quality as keyof typeof thumbnailInfo.thumbnails], 
                            quality
                          )}
                          className={`p-2 rounded-lg transition-colors ${
                            copied === quality
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                          }`}
                        >
                          {copied === quality ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 다운로드 히스토리 */}
            {downloadHistory.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-6">
                <h3 className="text-lg font-bold mb-4">다운로드 히스토리</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {downloadHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Image className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="text-sm text-white truncate max-w-xs">{item.title}</div>
                          <div className="text-xs text-gray-400">
                            {item.quality} 품질 · {item.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setYoutubeUrl(`https://www.youtube.com/watch?v=${item.videoId}`);
                          fetchThumbnailInfo();
                        }}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        다시 다운로드
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽: 즐겨찾기 및 정보 */}
          <div className="space-y-6">
            
            {/* 즐겨찾기 */}
            {favorites.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2 fill-current" />
                  즐겨찾기
                </h3>
                <div className="space-y-2">
                  {favorites.map((videoId, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Youtube className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-white font-mono">{videoId}</span>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => {
                            setYoutubeUrl(`https://www.youtube.com/watch?v=${videoId}`);
                            fetchThumbnailInfo();
                          }}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => setFavorites(favorites.filter(id => id !== videoId))}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 빠른 예시 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">빠른 테스트</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                    setTimeout(fetchThumbnailInfo, 100);
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">예시 동영상 1</div>
                  <div className="text-xs text-gray-400">인기 뮤직비디오</div>
                </button>
                
                <button
                  onClick={() => {
                    setYoutubeUrl('https://youtu.be/jNQXAC9IVRw');
                    setTimeout(fetchThumbnailInfo, 100);
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm text-white">예시 동영상 2</div>
                  <div className="text-xs text-gray-400">짧은 URL 형식</div>
                </button>
              </div>
            </div>

            {/* 지원 형식 */}
            <div className="bg-red-900/20 rounded-lg p-6 border border-red-800/30">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Youtube className="h-5 w-5 text-red-400 mr-2" />
                지원 형식
              </h3>
              <div className="space-y-2 text-sm text-red-300">
                <div>• youtube.com/watch?v=VIDEO_ID</div>
                <div>• youtu.be/VIDEO_ID</div>
                <div>• youtube.com/embed/VIDEO_ID</div>
                <div>• 모든 해상도 (120×90 ~ 1280×720)</div>
              </div>
            </div>

            {/* 사용 가이드 */}
            <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/30">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Image className="h-5 w-5 text-blue-400 mr-2" />
                사용 가이드
              </h3>
              <div className="space-y-2 text-sm text-blue-300">
                <div>1. YouTube 동영상 URL을 복사해서 붙여넣기</div>
                <div>2. "가져오기" 버튼 클릭 또는 Enter 키</div>
                <div>3. 원하는 해상도의 썸네일 선택</div>
                <div>4. "다운로드" 버튼으로 이미지 저장</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}