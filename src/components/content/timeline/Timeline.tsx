'use client';

import { twMerge } from 'tailwind-merge';

import Wrapper from '@/components/content/Wrapper';
import TimelineItem from '@/components/content/timeline/TimelineItem';
import TitleText from '@/components/fragments/text/TitleText';

const timelineWrapperClass = twMerge(
  'py-6'
);

type TimelineProps = {
  data: {
    title?: string;
    content?: {
      imgPath?: string;
      text?: string;
    }[]
  }
};

export default function Timeline({ data }: TimelineProps) {
  return (
    <Wrapper className={ timelineWrapperClass }>
      <TitleText text={ data.title } />
      <TimelineItem data={ data.content } />
    </Wrapper>
  );
}
