export const loadKakaoMapScript = () => {
    return new Promise<void>((resolve, reject) => {
        if (typeof window === 'undefined') return;

        const existingScript = document.getElementById('kakao-map-script');
        if (existingScript) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.id = 'kakao-map-script';
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=728537f86168978028abe62c120e8b77&autoload=false&libraries=services`;
        script.async = true;
        script.onload = () => {
            window.kakao.maps.load(() => {
                resolve();
            });
        };

        script.onerror = (err) => {
            console.error('카카오맵 로딩 실패:', err);
            reject(err);
        };

        document.head.appendChild(script);
    });
};
