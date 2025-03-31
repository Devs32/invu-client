'use client';

import { PencilIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

type CreateEntryButtonProps = {
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

export default function CreateEntryButton({ inviteCode }: CreateEntryButtonProps) {
  return (
    <button type="button" className={ buttonClass }>
      <PencilIcon className="w-4 h-4" /> 작성하기
    </button>
  );
}
