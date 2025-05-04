// components/content/map/TmapLink.tsx
type TmapLinkProps = {
  coordinates: { lat: number; lng: number } | null;
  placeName: string;
  text?: string;  // 표시 텍스트 속성 추가
};

export default function TmapLink({ 
  coordinates, 
  placeName, 
  text = '티맵' 
}: TmapLinkProps) {
  const getTmapUrl = () => {
    if (!coordinates) return '#';
    return `https://apis.openapi.sk.com/tmap/app/routes?appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}&goalname=${placeName}&goalx=${coordinates.lng}&goaly=${coordinates.lat}`;
  };

  return (
    <a
      href={getTmapUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 text-center text-sm text-gray-500"
    >
      {text}
    </a>
  );
}
