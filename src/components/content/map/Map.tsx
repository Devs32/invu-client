'use client';

import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { loadKakaoMapScript } from '@/utils/loadKakaoMap';

declare global {
  interface Window {
    kakao: any;
  }
}

const mapWrapperClass = twMerge(
  'flex items-center justify-center',
  'w-full',
  'h-[300px]',
  'bg-gray-200'
);

type MapProps = {
  location: string;
};

export default function Map({ location }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadKakaoMapScript();

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(location, (result: any, status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            const map = new window.kakao.maps.Map(mapRef.current, {
              center: coords,
              level: 3,
            });

            new window.kakao.maps.Marker({
              map,
              position: coords,
            });
          }
        });
      } catch (error) {
        console.error('카카오맵 로딩 실패:', error);
      }
    };

    initializeMap();
  }, [location]);

  return (
      <div ref={mapRef} className={mapWrapperClass}></div>
  );
}
