'use client';

import Modal from '@/components/modal/Modal';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ListEntriesButtonProps = {
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

export default function ListEntriesButton({ inviteCode }: ListEntriesButtonProps) {
  const [ isOpen, setIsOpen ] = useState(false);
  return (
    <>
      <button type="button" className={ buttonClass } onClick={ () => setIsOpen(true) }>
        <ListBulletIcon className="w-4 h-4" /> 전체보기
      </button>
      <Modal isOpen={ isOpen } onClose={ () => setIsOpen(false) }>
        <div>
          <h2>방명록 목록</h2>
        </div>
      </Modal>
    </>
  );
}
