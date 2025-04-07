'use client';

import Modal from '@/components/modal/Modal';
import { request } from '@/utils/http';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type CreateEntryButtonProps = {
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

const inputClass = twMerge(
  'flex-1 p-2 border border-gray-300 rounded h-10',
  'focus:outline-none focus:ring-2 focus:ring-blue-500'
);

const textareaClass = twMerge(
  'flex-1 p-2 border border-gray-300 rounded h-32 resize-none',
  'focus:outline-none focus:ring-2 focus:ring-blue-500'
);

const MAX_MESSAGE_LENGTH = 100;

type HandleSubmitProps = {
  inviteCode: string;
  guestName: string;
  password: string;
  message: string;
};

const handleSubmit = async ({ inviteCode, guestName, password, message }: HandleSubmitProps) => {
  const response = await request(`/api/v1/invitation/${ inviteCode }/guestBook`, {
    method: 'POST',
    body: {
      guestName,
      password,
      message,
      invuId: inviteCode
    }
  });

  if (response.ok) {
    alert('작성하기 완료');
  } else {
    alert('작성하기 실패');
  }
};

export default function CreateEntryButton({ inviteCode }: CreateEntryButtonProps) {
  const [ isOpen, setIsOpen ] = useState(false);

  const [ guestName, setGuestName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ message, setMessage ] = useState('');

  const guestNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validate = () => {
    if (!guestName.trim()) {
      guestNameRef.current?.focus();
      return false;
    }
    
    if (!password.trim()) {
      passwordRef.current?.focus();
      return false;
    }

    if (!message.trim()) {
      messageRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleGuestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmitClick = () => {
    if (validate()) {
      handleSubmit({ inviteCode, guestName, password, message });
    }
  };

  return (
    <>
      <button type="button" className={ buttonClass } onClick={ () => setIsOpen(true) }>
        <PencilIcon className="w-4 h-4" /> 작성하기
      </button>
      <Modal isOpen={ isOpen } onClose={ () => setIsOpen(false) } width="w-[300px]" height="h-[400px]">
        <div className="flex flex-col h-full mt-12 mb-5 mx-5 justify-between text-md">
          <div className="flex items-center mb-2">
            <label className="w-16">작성자</label>
            <input ref={ guestNameRef } type="text" value={ guestName } placeholder="작성자" className={ inputClass } onChange={ handleGuestNameChange } />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-16">비밀번호</label>
            <input ref={ passwordRef } type="password" value={ password } placeholder="비밀번호" className={ inputClass } onChange={ handlePasswordChange } />
          </div>
          <div className="flex items-center mb-2 relative">
            <label className="w-16">내용</label>
            <textarea ref={ messageRef } className={ textareaClass } value={ message } maxLength={ MAX_MESSAGE_LENGTH } onChange={ handleMessageChange } />
            <p className="absolute bottom-0 right-2 text-sm text-gray-500 mb-1">{ message.length } / { MAX_MESSAGE_LENGTH }</p>
          </div>
          <button type="button" className="bg-blue-500 text-white p-2 rounded" onClick={ handleSubmitClick }>
            작성하기
          </button>
        </div>
      </Modal>
    </>
  );
}
