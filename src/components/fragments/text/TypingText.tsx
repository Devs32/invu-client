'use client';

import { usePageEntryStore } from '@/stores/pageEntry';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
interface TypingTextProps {
  text: string;
  speed?: number; // 타이핑 속도를 조절할 수 있는 옵션
};

function  TypingText({ text, speed = 200 }: TypingTextProps) {
  const [ isTypingFinished, setIsTypingFinished ] = useState(false);
  const { setIsInitialized } = usePageEntryStore(state => state);

  useEffect(() => {
    if (isTypingFinished) {
      setIsInitialized(false);
    }
  }, [ isTypingFinished ]);

  return (
    <TypeAnimation
      style={ {
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white'
      } }
      // 타이핑이 완료된 후 1000ms 후에 타이핑이 완료되었다고 신호 보냄
      sequence={ [ text, 1000, () => setIsTypingFinished(true) ] }
      speed={ { type: 'keyStrokeDelayInMs', value: speed } }
      repeat={ 0 }
    />
  );
}

export default TypingText;
