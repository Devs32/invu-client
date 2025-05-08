// components/content/map/MapLinkContainer.tsx
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
      <div className="flex-1 text-center">
        <NaverMapLink
          location={ location }
          text={ naverText }
        />
      </div>
      <span className="text-gray-300 px-1">|</span>
      <div className="flex-1 text-center">
        <KakaoMapLink
          location={ location }
          coordinates={ coordinates }
          text={ kakaoText }
        />
      </div>
      <span className="text-gray-300 px-1">|</span>
      <div className="flex-1 text-center">
        <TmapLink
          coordinates={ coordinates }
          location={ location }
          text={ tmapText }
        />
      </div>
    </div>
  );
}
