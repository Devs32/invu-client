// components/content/map/KakaoMapLink.tsx
type KakaoMapLinkProps = {
  location: string;
  coordinates: { lat: number; lng: number } | null;
  text?: string;  // 표시 텍스트 속성 추가
};

export default function KakaoMapLink({
  location,
  coordinates,
  text = '카카오 맵'
}: KakaoMapLinkProps) {
  const getKakaoMapUrl = () => {
    if (!coordinates) return '#';

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      typeof navigator !== 'undefined' ? navigator.userAgent : ''
    );

    if (isMobile) {
      // 모바일 URL 스키마 (카카오맵 앱 직접 호출)
      return `kakaomap://route?ep=${ coordinates.lat },${ coordinates.lng }&ename=${ encodeURIComponent(location) }`;
    } else {
      // 데스크탑 URL (웹 버전으로 연결)
      return `https://map.kakao.com/link/to/${ encodeURIComponent(location) },${ coordinates.lat },${ coordinates.lng }`;
    }
  };

  // 클릭 이벤트 핸들러 추가
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = getKakaoMapUrl();

    // URL이 kakaomap:// 스키마로 시작하는 경우, 폴백 처리
    if (url.startsWith('kakaomap://')) {
      // 타임아웃을 설정하여 앱이 열리지 않을 경우 웹 버전으로 리다이렉트
      const openApp = () => {
        window.location.href = url;
      };

      const openWeb = () => {
        window.location.href = `https://map.kakao.com/link/to/${ encodeURIComponent(location) },${ coordinates?.lat },${ coordinates?.lng }`;
      };

      // 앱 실행 시도
      const timeout = setTimeout(openWeb, 1000);

      try {
        openApp();
        clearTimeout(timeout);
      } catch (error) {
        console.warn('카카오맵 앱 실행 실패:', error);
        openWeb();
      }

      e.preventDefault();
    }
  };

  return (
    <a
      href={ getKakaoMapUrl() }
      onClick={ handleClick }
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 text-center text-sm text-gray-500"
    >
      {text}
    </a>
  );
}
