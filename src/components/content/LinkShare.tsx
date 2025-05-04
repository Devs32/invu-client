// src/components/content/LinkShare.tsx
'use client';

import { useToastStore } from '@/stores/toast';
import { ChatBubbleOvalLeftIcon, LinkIcon } from '@heroicons/react/16/solid';
import { twMerge } from 'tailwind-merge';
import Wrapper from './Wrapper';
import { useEffect } from 'react';
import { initKakao, shareKakao } from '@/utils/kakao/kakaoShare';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function LinkShare({ inviteCode }: { inviteCode: string }) {
  const { addToast } = useToastStore();

  useEffect(() => {
    // Kakao SDK 초기화
    initKakao().catch(error => {
      console.error('카카오 SDK 초기화 실패:', error);
    });
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    addToast('링크가 복사되었습니다.');
  };

  const handleShareKakao = () => {
    shareKakao({
      title: '초대장 도착했습니다',
      description: '해니의 생일에 초대합니다',
      imageUrl: 'YOUR_IMAGE_URL', // 공유할 이미지 URL
      buttonTitle: '초대장 보기'
    }).catch(error => {
      console.error('카카오 공유하기 실패:', error);
      addToast('카카오 공유하기에 실패했습니다.');
    });
  };

  return (
    <Wrapper>
      <div className={ twMerge(
        'flex justify-center items-center gap-10',
        'w-full h-10 py-10 mb-5'
      ) }>
        {/* 링크 복사 */}
        <div className="flex flex-col items-center cursor-pointer" onClick={ copyLink }>
          <div className="flex items-center rounded-full bg-white p-5 mb-2 shadow-md">
            <LinkIcon className={ twMerge(
              'w-5 h-5',
              'text-gray-500 font-bold'
            ) } />
          </div>
          <span className="text-sm">링크 복사</span>
        </div>
        {/* 카카오톡 공유 */}
        <div
          id="kakaotalk-sharing-btn"
          className="flex flex-col items-center cursor-pointer"
          onClick={ handleShareKakao }
        >
          <div className="flex items-center rounded-full bg-white p-5 mb-2 shadow-md">
            <ChatBubbleOvalLeftIcon className={ twMerge(
              'w-5 h-5',
              'text-gray-500 font-bold'
            ) } />
          </div>
          <span className="text-sm">카카오톡 공유</span>
        </div>
      </div>
    </Wrapper>
  );
}
