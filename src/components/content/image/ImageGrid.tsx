'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { twMerge } from 'tailwind-merge';

import Modal from '@/components/fragments/modal/Modal';
import { intersectionAnimation, intersectionAnimationOptions } from '@/utils/constants/intersectionAnimation';
import { useIntersectionObserver } from '@/utils/customHook';
import Slider from 'react-slick';

import Wrapper from '@/components/content/Wrapper';
import './imageGrid.css';

type ImageGridProps = {
  images: string[];
};

const imageGridWrapperClass = twMerge(
  'grid grid-cols-3 gap-4 p-5'
);

const imageGridItemClass = twMerge(
  'w-full h-auto object-cover',
  'rounded-lg',
  'cursor-pointer'
);

export default function ImageGrid({ images }: ImageGridProps) {
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
      <Wrapper ref={ imageGridRef } className={ imageGridWrapperClass }>
        {
          images.map((src, index) => (
            <div key={ index } className="flex items-center justify-center w-full h-auto">
              <img
                src={ src }
                alt={ `Image ${ index }` }
                className={ imageGridItemClass }
                draggable="false"
                onClick={ handleImageClick.bind(null, index) }
              />
            </div>
          ))
        }
      </Wrapper>

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
            images.map((src, index) => (
              <div key={ index }>
                <img src={ src } alt={ `Image ${ index }` } />
              </div>
            ))
          }
        </Slider>
      </Modal>
    </React.Fragment>
  );
}
