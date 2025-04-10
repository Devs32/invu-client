'use client';
import { useEffect } from 'react';

declare global {
    interface Window {
        Tmapv2: any;
    }
}

export default function Tmap({ location }: { location: string }) {
    useEffect(() => {
        const script = document.createElement('script');
        // env 파일이 안보임. 키 보안 체크해야함
        script.src = `https://apis.openapi.sk.com/tmap/js?version=1&appKey=CnztcxUQcF7Ed5nfa9rSu8AaFxZ5RlRD13Maqpz6`;
        script.onload = () => {
            const map = new window.Tmapv2.Map('tmap', {
                center: new window.Tmapv2.LatLng(37.5665, 126.9780),
                width: '100%',
                height: '100%',
                zoom: 15
            });
        };
        document.head.appendChild(script);
    }, []);

    return <div id="tmap" className="w-full h-full" />;
}
