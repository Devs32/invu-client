'use client';

import { useToastStore } from '@/stores/toast';
import { ChatBubbleOvalLeftIcon, LinkIcon } from '@heroicons/react/16/solid';
import { twMerge } from 'tailwind-merge';
import Wrapper from './Wrapper';

export default function LinkShare({ inviteCode }: { inviteCode: string }) {
  const { addToast } = useToastStore();

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    addToast('링크가 복사되었습니다.');
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
        <div className="flex flex-col items-center cursor-pointer">
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
