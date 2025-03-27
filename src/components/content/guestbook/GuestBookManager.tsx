'use client';

import { ListBulletIcon, PencilIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

type GuestBookManagerProps = {
  inviteCode: string;
};

const buttonClass = twMerge(
  'border border-gray-400',
  'text-gray-400',
  'px-5 my-5',
  'rounded-full',
  'flex items-center gap-2',
  'transition-all duration-300',
  'hover:bg-gray-400 hover:text-white'
);

export default function GuestBookManager({ inviteCode }: GuestBookManagerProps) {
  return (
    <div className="flex gap-10">
      <button type="button" className={ buttonClass }>
        <PencilIcon className="w-4 h-4" /> 작성하기
      </button>
      <button type="button" className={ buttonClass }>
        <ListBulletIcon className="w-4 h-4" /> 전체보기
      </button>
    </div>
  );
}
