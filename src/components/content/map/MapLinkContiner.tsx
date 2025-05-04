// components/content/map/MapLinkContiner.tsx
import NaverMapLink from './NaverMapLink';
import KakaoMapLink from './KakaoMapLink';
import TmapLink from './TmapLink';

type MapLinkContainerProps = {
  location: string;
  coordinates: { lat: number; lng: number } | null;
  placeName: string;
  naverText?: string;
  kakaoText?: string;
  tmapText?: string;
};

export default function MapLinkContainer({
  location,
  coordinates,
  placeName,
  naverText,
  kakaoText,
  tmapText
}: MapLinkContainerProps) {
  return (
    <div className="w-full bg-[#f4f4f4] flex items-center justify-between py-2">
      <NaverMapLink 
        location={ location } 
        text={ naverText } 
      />
      <span className="text-gray-300 px-1">|</span>
      <KakaoMapLink 
        location={ location } 
        coordinates={ coordinates } 
        text={ kakaoText } 
      />
      <span className="text-gray-300 px-1">|</span>
      <TmapLink 
        coordinates={ coordinates }
        location={ location } 
        text={ tmapText } 
      />
    </div>
  );
}
