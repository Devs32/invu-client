'use client';

import Modal from '@/components/fragments/modal/Modal';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import GuestBookList from './GuestBookList';

type ListEntriesButtonProps = {
    inviteCode: string;
};

const buttonClass = twMerge(
  'border border-gray-400',
  'text-gray-400 text-sm',
  'px-5 py-1 my-5',
  'rounded-full',
  'flex items-center gap-2',
  'transition-all duration-300',
  'hover:bg-gray-400 hover:text-white'
);

export default function ListEntriesButton({ inviteCode }: ListEntriesButtonProps) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ refreshKey, setRefreshKey ] = useState(0);

  const handleOpenModal = () => {
    setRefreshKey(prev => prev + 1); // 모달 열릴 때마다 refreshKey 증가
    setIsOpen(true);
  };

  return (
    <>
      <button type="button" className={ buttonClass } onClick={ handleOpenModal }>
        <ListBulletIcon className="w-4 h-4" /> 전체보기
      </button>
      <Modal isOpen={ isOpen } onClose={ () => setIsOpen(false) }>
        <div className="w-full h-full pt-5 overflow-y-auto">
          <GuestBookList key={ refreshKey } inviteCode={ inviteCode } />
        </div>
      </Modal>
    </>
  );
}
