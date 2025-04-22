'use client';

import { useToastStore } from '@/stores/toast';
import { request } from '@/utils/http';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const inputClass = twMerge(
  'flex-1 p-2 border border-gray-300 rounded h-10 w-full',
  'focus:outline-none focus:ring-2 focus:ring-blue-500'
);

const textareaClass = twMerge(
  'flex-1 p-2 border border-gray-300 rounded h-32 resize-none',
  'focus:outline-none focus:ring-2 focus:ring-blue-500'
);

const MAX_MESSAGE_LENGTH = 100;

interface GuestBookFormProps {
  type: 'create' | 'edit' | 'delete' | null;
  inviteCode: string;
  initialValues?: {
    id?: number;
    guestName?: string;
    message?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function GuestBookForm({ type, inviteCode, initialValues, isOpen, onClose }: GuestBookFormProps) {
  const { addToast } = useToastStore();

  const [ guestName, setGuestName ] = useState(initialValues?.guestName || '');
  const [ password, setPassword ] = useState('');
  const [ message, setMessage ] = useState(initialValues?.message || '');

  const guestNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validate = () => {
    if (type === 'delete') {
      if (!password.trim()) {
        passwordRef.current?.focus();
        return false;
      }
      return true;
    }

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

  const handleSubmitForm = async (values: { guestName: string; password: string; message: string }) => {
    try {
      let apiUrl = '';
      switch (type) {
      case 'create':
        apiUrl = `/api/v1/invitation/${ inviteCode }/guestBooks`;
        break;
      case 'edit':
        apiUrl = `/api/v1/invitation/${ inviteCode }/guestBooks/${ initialValues?.id }`;
        break;
      case 'delete':
        apiUrl = `/api/v1/invitation/${ inviteCode }/guestBooks/delete/${ initialValues?.id }`;
        break;
      }

      const response = await request(apiUrl, {
        method: 'POST',
        body: {
          ...values,
          invuId: inviteCode
        }
      });

      if (response.ok) {
        addToast(`${ type === 'create' ? '작성' : type === 'edit' ? '수정' : '삭제' }하기 완료`);
      } else {
        addToast(`${ type === 'create' ? '작성' : type === 'edit' ? '수정' : '삭제' }하기 실패`);
      }
    } catch (error) {
      console.warn(error);
      addToast(`${ type === 'create' ? '작성' : type === 'edit' ? '수정' : '삭제' }하기 실패`);
    } finally {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      handleSubmitForm({ guestName, password, message });
    }
  };

  const resetForm = () => {
    setTimeout(() => {
      setGuestName(type === 'create' ? '' : initialValues?.guestName || '');
      setPassword('');
      setMessage(type === 'create' ? '' : initialValues?.message || '');
    }, 1000);
  };

  useEffect(() => {
    if (initialValues) {
      setGuestName(initialValues.guestName || '');
      setMessage(initialValues.message || '');
    }
  }, [ initialValues ]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [ isOpen, type ]);

  return (
    <div className="flex flex-col h-full mt-12 mb-5 mx-5 justify-between text-md">
      {
        type === 'delete'
          ? (
            <div className="flex items-center mb-2">
              <label className="w-16">비밀번호</label>
              <input
                ref={ passwordRef }
                type="password"
                value={ password }
                placeholder="비밀번호"
                className={ inputClass }
                onChange={ (e) => setPassword(e.target.value) }
              />
            </div>
          )
          : (
            <>
              <div className="flex items-center mb-2">
                <label className="w-16">작성자</label>
                <input
                  ref={ guestNameRef }
                  type="text"
                  value={ guestName }
                  placeholder="작성자"
                  className={ inputClass }
                  onChange={ (e) => setGuestName(e.target.value) }
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="w-16">비밀번호</label>
                <input
                  ref={ passwordRef }
                  type="password"
                  value={ password }
                  placeholder="비밀번호"
                  className={ inputClass }
                  onChange={ (e) => setPassword(e.target.value) }
                />
              </div>
              <div className="flex items-center mb-2 relative">
                <label className="w-16">내용</label>
                <textarea
                  ref={ messageRef }
                  className={ textareaClass }
                  value={ message }
                  maxLength={ MAX_MESSAGE_LENGTH }
                  onChange={ (e) => setMessage(e.target.value) }
                />
                <p className="absolute bottom-0 right-2 text-sm text-gray-500 mb-1">
                  { message.length } / {MAX_MESSAGE_LENGTH}
                </p>
              </div>
            </>
          )
      }
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded"
        onClick={ handleSubmit }
      >
        { type === 'create' ? '작성하기' : type === 'edit' ? '수정하기' : '삭제하기' }
      </button>
    </div>
  );
}
