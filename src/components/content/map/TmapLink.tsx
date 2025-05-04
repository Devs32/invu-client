// components/content/map/TmapLink.tsx
import { useState, useEffect } from 'react';

type TmapLinkProps = {
  location: string;
  coordinates: { lat: number; lng: number } | null;
  text?: string;
};

export default function TmapLink({ 
  location, 
  coordinates, 
  text = '티맵으로 길찾기' 
}: TmapLinkProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // 모바일 환경인지 확인하는 함수
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getTmapUrl = () => {
    if (!coordinates) return '#';
    // 티맵 URL 스키마: tmap://route?goalname={위치명}&goalx={경도}&goaly={위도}
    // goalx는 경도(longitude), goaly는 위도(latitude)임에 유의
    return `tmap://route?goalname=${encodeURIComponent(location)}&goalx=${coordinates.lng}&goaly=${coordinates.lat}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 모바일이 아닌 경우 경고 표시
    if (!isMobile) {
      e.preventDefault();
      setShowWarning(true);
      
      // 3초 후 경고 메시지 자동으로 닫기
      setTimeout(() => {
        setShowWarning(false);
      }, 3000);
    }
  };

  return (
    <div className="relative">
      <a
        href={getTmapUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center text-sm text-gray-500"
        onClick={handleClick}
      >
        {text}
      </a>
      
      {/* 경고 메시지 */}
      {showWarning && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-yellow-100 text-yellow-800 text-xs rounded shadow-md z-10">
          티맵은 모바일 환경에서만 이용할 수 있습니다.
        </div>
      )}
    </div>
  );
}
