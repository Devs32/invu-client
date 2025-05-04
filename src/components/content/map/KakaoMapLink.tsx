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
    return `https://map.kakao.com/link/to/${encodeURIComponent(location)},${coordinates.lat},${coordinates.lng}`;
  };

  return (
    <a
      href={getKakaoMapUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 text-center text-sm text-gray-500"
    >
      {text}
    </a>
  );
}
