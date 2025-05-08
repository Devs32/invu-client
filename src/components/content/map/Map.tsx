// components/content/map/Map.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { loadKakaoMapScript } from '@/utils/kakao/loadKakaoMap';
import MapLinkContainer from './MapLinkContainer';

declare global {
  interface Window {
    kakao: any;
  }
}

const mapWrapperClass = twMerge(
  'flex items-center justify-center',
  'w-full',
  'h-[250px]',
  'bg-gray-200'
);

type MapProps = {
  location: string;
  naverText?: string;  // 네이버 지도 텍스트 속성 추가
  kakaoText?: string;  // 카카오 맵 텍스트 속성 추가
  tmapText?: string;   // 티맵 텍스트 속성 추가
};

export default function Map({
  location,
  naverText,
  kakaoText,
  tmapText
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [ coordinates, setCoordinates ] = useState<{lat: number, lng: number} | null>(null);
  const [ placeName, setPlaceName ] = useState<string>('');

  useEffect(() => {
    const initializeMap = async () => {
      try {
        // 카카오맵 스크립트 로드
        await loadKakaoMapScript();

        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소를 좌표로 변환
        geocoder.addressSearch(location, (result: any, status: string) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 좌표 저장
            setCoordinates({
              lat: result[0].y,
              lng: result[0].x
            });

            // 맵 객체 생성
            const map = new window.kakao.maps.Map(mapRef.current, {
              center: coords,
              level: 4
            });

            // 마커 추가
            new window.kakao.maps.Marker({
              map,
              position: coords
            });

            // 좌표로 장소 정보 검색
            const places = new window.kakao.maps.services.Places();

            // 좌표 기반 장소 검색 
            places.categorySearch(
              'FD6', // 카테고리 코드 (음식점 카테고리)
              (placesResult: any, placesStatus: string) => {
                if (placesStatus === window.kakao.maps.services.Status.OK && placesResult.length > 0) {
                  // 가장 가까운 장소 찾기
                  const nearestPlace = placesResult.reduce((nearest: any, current: any) => {
                    const nearestDistance = window.kakao.maps.geometry.distance(
                      coords,
                      new window.kakao.maps.LatLng(nearest.y, nearest.x)
                    );
                    const currentDistance = window.kakao.maps.geometry.distance(
                      coords,
                      new window.kakao.maps.LatLng(current.y, current.x)
                    );
                    return currentDistance < nearestDistance ? current : nearest;
                  }, placesResult[0]);

                  // 50m 이내의 장소라면 이름 저장
                  const distance = window.kakao.maps.geometry.distance(
                    coords,
                    new window.kakao.maps.LatLng(nearestPlace.y, nearestPlace.x)
                  );

                  if (distance < 50) {
                    setPlaceName(nearestPlace.place_name);
                  }
                }
              },
              {
                location: coords,
                radius: 50 // 50m 반경 내 검색
              }
            );

            // 키워드로 장소 검색 시도 (직접적인 장소명 검색)
            const keywordSearchCallback = (keywordResults: any, keywordStatus: string) => {
              if (keywordStatus === window.kakao.maps.services.Status.OK && keywordResults.length > 0) {
                // 첫 번째 결과 사용
                setPlaceName(keywordResults[0].place_name);
              }
            };

            // 주소에서 가능한 키워드 추출 (예: 동명, 건물명 등)
            const addressParts = location.split(' ');
            if (addressParts.length > 0) {
              // 마지막 부분(예: 건물명, 아파트명 등)을 키워드로 사용
              const possibleKeyword = addressParts[addressParts.length - 1];
              if (possibleKeyword && possibleKeyword.length > 2) {
                places.keywordSearch(possibleKeyword, keywordSearchCallback, {
                  location: coords,
                  radius: 100
                });
              }
            }
          } else {
            console.error('주소 검색 실패:', status);
          }
        });
      } catch (error) {
        console.error('카카오맵 로딩 실패:', error);
      }
    };

    initializeMap();
  }, [ location ]);

  return (
    <div className="w-full">
      <div ref={ mapRef } className={ mapWrapperClass }></div>

      {/* 텍스트 속성을 전달하는 컨테이너 컴포넌트 */}
      <MapLinkContainer
        location={ location }
        coordinates={ coordinates }
        placeName={ placeName }
        naverText={ naverText }
        kakaoText={ kakaoText }
        tmapText={ tmapText }
      />
    </div>
  );
}
