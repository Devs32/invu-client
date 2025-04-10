'use client';
import { useEffect } from 'react';

declare global {
    interface Window {
        naver: any;
    }
}

export default function NaverMap({ location }: { location: string }) {
    useEffect(() => {
        const script = document.createElement('script');
        // env 파일이 안보임. 키 보안 체크해야함
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=nmldwkqssf`;
        script.onload = () => {
            const map = new window.naver.maps.Map('naverMap', {
                center: new window.naver.maps.LatLng(37.5665, 126.9780),
                zoom: 15
            });
        };
        document.head.appendChild(script);
    }, []);

    return <div id="naverMap" className="w-full h-full" />;
}
