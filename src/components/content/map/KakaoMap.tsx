'use client';
import { useEffect } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

export default function KakaoMap({ location }: { location: string }) {
    useEffect(() => {
        const script = document.createElement('script');
        // env 파일이 안보임. 키 보안 체크해야함
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=728537f86168978028abe62c120e8b77&autoload=false`;
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('kakaoMap');
                const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    level: 3
                };
                new window.kakao.maps.Map(container, options);
            });
        };
        document.head.appendChild(script);
    }, []);

    return <div id="kakaoMap" className="w-full h-full" />;
}
