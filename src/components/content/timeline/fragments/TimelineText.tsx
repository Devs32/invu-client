'use client';

import { useRef } from 'react';

import { intersectionAnimation, intersectionAnimationOptions } from '@/utils/constants/intersectionAnimation';
import { useIntersectionObserver } from '@/utils/customHook';

type TimelineTextProps = {
  date?: string | '';
  text?: string | '';
  alignment?: 'left' | 'right';
};

export default function TimelineText({ date, text, alignment = 'left' }: TimelineTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIntersectionObserver(ref, intersectionAnimation, intersectionAnimationOptions);

  return (
    <div ref={ ref } className={ `h-[120px] w-[80%] py-6 ${ alignment === 'right' ? 'text-right' : 'text-left' }` }>
      <div className="text-sm text-gray-500">{ date }</div>
      <div className="">{ text }</div>
    </div>
  );
}
