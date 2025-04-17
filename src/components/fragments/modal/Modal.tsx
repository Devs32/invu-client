'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { JSX, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  animationType?: undefined | 'fade' | 'slide' | 'scale';
  onClose: () => void;
  width?: string;
  height?: string;
};

const modalOverlayClass = twMerge(
  'fixed inset-0 bg-[rgba(0,0,0,0.75)]',
  'z-40 invisible',
  'transition-opacity duration-300 ease'
);

const modalWrapperClass = twMerge(
  'fixed inset-0 flex flex-col justify-center items-center m-auto',
  'max-w-md',
  'opacity-100',
  'bg-gray-100',
  'z-50 invisible'
);

const modalHeaderClass = twMerge(
  'flex justify-between items-center',
  'absolute top-0 left-0',
  'z-50',
  'w-full h-16',
  'p-4'
);

const modalBodyClass = twMerge(
  'flex flex-col',
  'w-full h-full',
  'pt-4'
);

const getAnimationType = (type: undefined | 'fade' | 'slide' | 'scale', isOpen: boolean) => {
  let animationClass = '';
  let transitionClass = '';

  if (type === 'slide') {
    animationClass = isOpen ? 'translate-y-[0%]' : 'translate-y-[-100%]';
    transitionClass = 'transition-transform duration-300 ease';
  }

  if (type === 'scale') {
    animationClass = isOpen ? 'scale-100' : 'scale-95';
    transitionClass = 'transition-transform duration-300 ease';
  }

  const opacityClass = type ? (isOpen ? 'opacity-100' : 'opacity-0') : '';

  return `${ animationClass } ${ opacityClass } ${ transitionClass }`;
};

export default function Modal({ title, children, isOpen, animationType = undefined, onClose, width = 'w-full', height = 'h-full' }: ModalProps): JSX.Element {
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [ isOpen ]);

  const animationTypeClass = getAnimationType(animationType, isOpen);

  return (
    <div ref={ modalOverlayRef } className={ twMerge(modalOverlayClass, isOpen && 'visible') } onClick={ e => e.target === modalOverlayRef.current && onClose() } >
      <div className={ twMerge(modalWrapperClass, animationTypeClass, isOpen && 'visible', width, height, (width !== 'w-full' || height !== 'h-full') ? 'rounded-lg' : '') }>
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
    </div>
  );
}

