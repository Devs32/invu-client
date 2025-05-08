'use client';

import { useRef } from 'react';

import { intersectionAnimation, intersectionAnimationOptions } from '@/utils/constants/intersectionAnimation';
import { useIntersectionObserver } from '@/utils/customHook';
import Image from 'next/image';

type TimelineImageProps = {
  imgPath: string;
};

export default function TimelineImage({ imgPath }: TimelineImageProps) {
  const ref = useRef<HTMLElement>(null);

  useIntersectionObserver(ref, intersectionAnimation, intersectionAnimationOptions);

  return (
    <figure ref={ ref } className="relative h-[140px] w-[140px]">
      <Image src={ imgPath } alt="Timeline Image" className="absolute w-full h-full object-cover object-center" fill quality={ 80 } />
    </figure>
  ); 
}
