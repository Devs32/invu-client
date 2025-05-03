declare global {
    interface Window {
        Kakao: any;
    }
}

/**
 * 카카오 SDK 스크립트 로드 및 초기화
 */
export const loadKakaoSDK = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') return;

    // 이미 로드된 경우
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
      resolve();
      return;
    }

    // 이미 스크립트가 추가된 경우
    const existingScript = document.getElementById('kakao-sdk');
    if (existingScript) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
      resolve();
      return;
    }

    // 스크립트 생성 및 추가
    const script = document.createElement('script');
    script.id = 'kakao-sdk';
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.integrity = 'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
      resolve();
    };

    script.onerror = (err) => {
      console.error('카카오 SDK 로딩 실패:', err);
      reject(err);
    };

    document.head.appendChild(script);
  });
};
