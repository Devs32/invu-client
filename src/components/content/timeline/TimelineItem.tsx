import React from 'react';
import { twMerge } from 'tailwind-merge';

import TimelineConnector from './fragments/TimelineConnector';
import TimelineImage from './fragments/TimelineImage';
import TimelineText from './fragments/TimelineText';

const timelineImageWrapperClass = twMerge(
  'w-full grid grid-cols-3 p-5'
);

type TimelineItemProps = {
  data?: {
    imgPath?: string;
    date?: string;
    text?: string;
  }[];
  reverse?: boolean;
};

export default function TimelineItem({ data, reverse }: TimelineItemProps) {
  return (
    <div
      className={ timelineImageWrapperClass }
      style={ {
        gridTemplateColumns: '1fr 1px 1fr',
        gridAutoRows: '160px',
        alignItems: 'center',
        justifyItems: 'center'
      } }
    >
      {data?.map((item, index) => (
        <React.Fragment key={ index }>
          {(reverse ? index % 2 !== 0 : index % 2 === 0) ? (
            <>
              <TimelineImage imgPath={ item.imgPath || '' } />
              <TimelineConnector dotColor="#FCA5A5" />
              <TimelineText date={ item.date } text={ item.text } />
            </>
          ) : (
            <>
              <TimelineText date={ item.date } text={ item.text } alignment="right"/>
              <TimelineConnector dotColor="#FCA5A5" />
              <TimelineImage imgPath={ item.imgPath || '' } />
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
