'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { twMerge } from 'tailwind-merge';

import { intersectionAnimation, intersectionAnimationOptions } from '@/utils/constants/intersectionAnimation';
import { useIntersectionObserver } from '@/utils/customHook';
import Slider from 'react-slick';

import Wrapper from '@/components/content/Wrapper';
import Modal from '@/components/fragments/modal/Modal';
import TitleText from '@/components/fragments/text/TitleText';
import Image from 'next/image';
import './imageGrid.css';

type ImageGridProps = {
  data: {
    images?: string[];
    title?: string;
  };
};

const imageGridWrapperClass = twMerge(
  'grid grid-cols-3 gap-4 p-5 w-full relative'
);

const imageGridItemClass = twMerge(
  'w-full h-auto object-cover',
  'rounded-lg',
  'cursor-pointer'
);

export default function ImageGrid({ data }: ImageGridProps) {
  const [ selectedImageIndex, setSelectedImageIndex ] = useState<number | null>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);
  useIntersectionObserver(imageGridRef, intersectionAnimation, intersectionAnimationOptions);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  useEffect(() => {
    if (selectedImageIndex !== null && sliderRef.current) {
      sliderRef.current.slickGoTo(selectedImageIndex, true);
    }
  }, [ selectedImageIndex ]);

  return (
    <React.Fragment>
      <div className="flex flex-col items-center w-full">
        <TitleText text={ data.title } />
        <Wrapper ref={ imageGridRef } className={ imageGridWrapperClass }>
          {
            data.images?.map((src, index) => (
              <div key={ index } className="relative flex items-center justify-center w-full h-full aspect-[3/4]">
                <Image
                  src={ src }
                  alt={ `Image ${ index }` }
                  className={ imageGridItemClass }
                  draggable="false"
                  fill
                  quality={ 80 }
                  onClick={ handleImageClick.bind(null, index) }
                />
              </div>
            ))
          }
        </Wrapper>
      </div>

      <Modal isOpen={ selectedImageIndex !== null } onClose={ handleCloseModal }>
        <Slider
          className="image-grid-slider"
          ref={ sliderRef }
          dots={ true }
          infinite={ true }
          speed={ 500 }
          slidesToShow={ 1 }
          slidesToScroll={ 1 }
        >
          {
            data.images?.map((src, index) => (
              <div key={ index } className="relative aspect-[10/16] w-full">
                <Image
                  src={ src }
                  alt={ `Image ${ index }` }
                  className="object-cover"
                  fill
                  quality={ 80 }
                />
              </div>
            ))
          }
        </Slider>
      </Modal>
    </React.Fragment>
  );
}
