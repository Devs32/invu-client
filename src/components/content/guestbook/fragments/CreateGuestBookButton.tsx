'use client';

import Modal from '@/components/fragments/modal/Modal';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import GuestBookForm from './GuestBookForm';

type CreateGuestBookButtonProps = {
  inviteCode: string;
};

const buttonClass = twMerge(
  'border border-gray-400',
  'text-gray-400 text-sm',
  'px-5 my-5',
  'rounded-full',
  'flex items-center gap-2',
  'transition-all duration-300',
  'hover:bg-gray-400 hover:text-white'
);

export default function CreateGuestBookButton({ inviteCode }: CreateGuestBookButtonProps) {
  const [ isOpen, setIsOpen ] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button type="button" className={ buttonClass } onClick={ toggleModal }>
        <PencilIcon className="w-4 h-4" /> 작성하기
      </button>
      <Modal isOpen={ isOpen } onClose={ toggleModal } width="w-[300px]" height="h-[400px]">
        <GuestBookForm
          type="create"
          inviteCode={ inviteCode }
          isOpen={ isOpen }
          onClose={ toggleModal }
        />
      </Modal>
    </>
  );
}
