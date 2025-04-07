import { twMerge } from 'tailwind-merge';

import Wrapper from '@/components/content/Wrapper';
import TitleText from '@/components/fragments/text/TitleText';

const mainWrapperClass = twMerge(
  'pt-16',
  'pb-10'
);

type MainProps = {
  data: { title?: string, imgPath?: string, text1?: string, text2?: string, text3?: string }
}

export default function Main({ data }: MainProps) {
  return (
    <Wrapper className={ mainWrapperClass }>
      <TitleText text={ data.title } />
      {
        data.imgPath && (
          <figure className="w-full relative h-[250px] top-0 my-3">
            <img src={ data.imgPath } alt="mainImage" className="object-contain w-full h-full" />
          </figure>
        )
      }
      {
        data && (
          <div className="flex flex-col items-center text-center w-full">
            <div className="my-3 whitespace-pre-line">{ data.text1 }</div>
            <div className="my-3 whitespace-pre-line">{ data.text2 }</div>
            <div className="w-10 h-1 border-b-2 border-red-300 my-1" />
            <div className="my-3 whitespace-pre-line">{ data.text3 }</div>
          </div>
        )
      }
    </Wrapper>
  );
}
