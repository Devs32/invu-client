'use client';

import { usePageEntryStore } from '@/stores/pageEntry';
import { twMerge } from 'tailwind-merge';

const coverWrapperClass = twMerge(
  'flex flex-col items-center w-full h-[110vh] max-w-md min-w-sm',
  'bg-gray-50',
  'z-50',
  'fixed top-0',
  'transition duration-300',
  'ease',
  'whitespace-pre-line'
);

type CoverData = {
    coverImage: string;
    coverTitle: string;
    coverDate: string;
    coverLocation: string;
};

export default function ScrollUpCover({ data }: { data: CoverData }) {
  const { isInitialized } = usePageEntryStore(state => state);

  return (
    <div
      className={ coverWrapperClass }
      style={ {
        transform: isInitialized ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isInitialized ? 1 : 0
      } }
    >
      <figure className="min-w-[80%] max-w-[80%] relative h-[60%] my-3 mt-20">
        <img
          src={ data.coverImage }
          alt="coverImage"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="text-gray-500 mb-20 px-5">
        <p className="text-center text-lg text-[#FCA5A5]">{data.coverTitle}</p>
        <p className="text-center text-lg">{data.coverDate}</p>
        <p className="text-center text-lg">{data.coverLocation}</p>
      </div>
    </div>
  );
}
