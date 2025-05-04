// src/utils/kakao/kakaoShare.ts
import { loadKakaoSDK } from './loadKakaoSDK';

declare global {
    interface Window {
        Kakao: any;
    }
}

/**
 * 카카오톡 웹뷰 환경인지 확인하는 함수
 */
export const isKakaoWebview = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /KAKAOTALK/i.test(navigator.userAgent);
};

/**
 * URL을 클립보드에 복사하는 함수
 */
export const copyUrlToClipboard = async (): Promise<boolean> => {
  const url = window.location.href;

  try {
    // navigator.clipboard API 사용 시도
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    } else {
      // 대체 복사 방법
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    return true;
  } catch (error) {
    console.error('URL 복사 실패:', error);
    return false;
  }
};

/**
 * 카카오 SDK 초기화
 */
export const initKakao = async (): Promise<void> => {
  await loadKakaoSDK();
};

/**
 * 카카오톡 공유하기 기능
 */
export const shareKakao = async (options: {
    title: string;
    description: string;
    imageUrl: string;
    buttonTitle: string;
}): Promise<void> => {
  const { title, description, imageUrl, buttonTitle } = options;

  try {
    // 카카오톡 웹뷰 환경인지 확인
    if (isKakaoWebview()) {
      // 카카오톡 웹뷰에서는 URL 복사 기능 사용
      const copied = await copyUrlToClipboard();
      if (!copied) {
        throw new Error('URL 복사에 실패했습니다.');
      }
      // 성공 메시지는 호출측에서 처리
      return;
    }

    // 일반 환경에서는 카카오 SDK 사용
    await loadKakaoSDK();

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href
        }
      },
      buttons: [
        {
          title: buttonTitle,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href
          }
        }
      ]
    });
  } catch (error) {
    console.error('카카오 공유하기 실패:', error);
    // 실패 시 오류를 상위로 전파하여 호출측에서 처리
    throw error;
  }
};

/**
 * 환경에 따른 공유 버튼 텍스트 제공
 */
export const getShareButtonText = (): string => {
  if (isKakaoWebview()) {
    return '링크 복사';
  }
  return '카카오톡 공유';
};
