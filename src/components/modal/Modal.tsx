'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { JSX, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  animationType?: undefined | 'fade' | 'slide';
  onClose: () => void;
};

const modalWrapperClass = twMerge(
  'fixed inset-0 flex flex-col justify-center items-center m-auto',
  'max-w-md min-w-sm',
  'bg-white',
  'z-50 invisible',
  'transition-all duration-300 ease'
);

const modalHeaderClass = twMerge(
  'flex justify-between items-center',
  'w-full h-16',
  'p-4'
);

const modalBodyClass = twMerge(
  'flex flex-col justify-center',
  'w-full h-full object-cover',
  'rounded-lg',
  'cursor-pointer'
);

const getAnimationType = (type: undefined | 'fade' | 'slide', isOpen: boolean) => {
  if (type === 'slide') {
    return isOpen ? 'translate-y-[0%]' : 'translate-y-[-100%]';
  }

  return '';
};

export default function Modal({ title, children, isOpen, animationType = undefined, onClose }: ModalProps): JSX.Element {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [ isOpen ]);

  const animationTypeClass = getAnimationType(animationType, isOpen);

  return (
    <div className={ twMerge(modalWrapperClass, isOpen && 'visible', animationTypeClass) }>
      <div className={ modalHeaderClass }>
        <h2 className="text-2xl font-bold">{ title }</h2>
        <button onClick={ onClose }>
          <XMarkIcon className="size-8 text-gray-500" />
        </button>
      </div>

      <div className={ modalBodyClass }>
        { children }
      </div>
    </div>
  );
}

