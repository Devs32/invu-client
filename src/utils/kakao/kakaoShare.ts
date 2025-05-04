import { loadKakaoSDK } from './loadKakaoSDK';

declare global {
    interface Window {
        Kakao: any;
    }
}

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
  }
};
