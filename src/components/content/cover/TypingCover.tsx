'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { usePageEntryStore } from '../../../stores/pageEntry';
import TypingText from '../../fragments/text/TypingText';

const coverWrapperClass = twMerge(
  'flex flex-col items-center justify-between w-full h-full max-w-md min-w-sm',
  'bg-gradient-to-b from-teal-300 to-sky-500',
  'opacity-60',
  'overflow-hidden',
  'fixed',
  'z-50'
);

type CoverProps = {
  type: 'intro' | 'content';
};

export default function Cover({ type }: CoverProps) {
  const [ dimmed, setDimmed ] = useState(true);
  const [ display, setDisplay ] = useState<'flex' | 'none'>('flex');
  const { isInitialized } = usePageEntryStore(state => state);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      setDimmed(false);
    }
  }, [ isInitialized ]);

  useEffect(() => {
    if (!dimmed) {
      const timer = setTimeout(() => {
        setDisplay('none');
      }, 500); // 500ms는 transition 시간과 일치해야 합니다.
      return () => clearTimeout(timer);
    } else {
      setDisplay('flex');
    }
  }, [ dimmed ]);

  useEffect(() => {
    if (display === 'flex') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [ display ]);

  return (
    <div className={ coverWrapperClass }
      style={ {
        opacity: dimmed ? 0.6 : 0,
        transition: 'opacity 0.5s ease-in-out',
        display: display
      } }
    >
      <h1 className="text-4xl font-bold mt-20"></h1>
      <div className="px-12">
        <TypingText text="안녕하세요.몇글자가되려나흠하나" />
      </div>
      <div className="text-white text-lg mb-20">
        <span>날짜 및 장소</span>
      </div>
    </div>
  );
}
