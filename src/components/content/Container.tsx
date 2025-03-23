import { notFound } from 'next/navigation';
import React from 'react';

import { request } from '@/utils/http';

import DdayCounter from '@/components/content/DdayCounter';
import Main from '../content/Main';
import AttendanceConfirmation from './AttendanceConfirmation';
import Intro from './Intro';
import ScrollWrapper from './ScrollWrapper';
import ScrollUpCover from './cover/ScrollUpCover';
import ImageGrid from './image/ImageGrid';
import Timeline from './timeline/Timeline';

type ContainerProps = {
  inviteCode?: string;
};

const requestInvitationData = async (inviteCode: string) => {
  if (!inviteCode) return notFound();

  try {
    const api = `/api/v1/invitation/${ inviteCode }`;
    // 60초 동안 데이터 캐시
    const res = await request(api);
    const data = await res.json();
    const jsonData = JSON.parse(data.data.invuJson);

    return jsonData;
  } catch (error) {
    console.warn(error);
    return notFound();
  }
};

const renderContent = (data: any[]): React.ReactNode => {
  return data?.map((item: any) => {
    switch (item.type) {
    case 'intro':
      return <Intro />;
    case 'main':
      return <Main data={ item.content } />;
    case 'timeline':
      return <Timeline data={ item } />;
    case 'ddaycounter':
      return <DdayCounter data={ item.content } />;
    default:
      return null;
    }
  });
};

export default async function Container({ inviteCode = '' }: ContainerProps) {
  const invitationData = await requestInvitationData(inviteCode);

  await new Promise(resolve => setTimeout(resolve, 500));

  const coverData = invitationData.find((item: any) => item.type === 'cover') || {
    page: 0,
    type: 'cover',
    content: {
      coverImage: '/images/vertical-image-01.jpeg',
      coverTitle: 'ㅇㅇㅇ',
      coverDate: '2025. 03. 10 | 오후 10:00',
      coverLocation: '장소'
    }
  };

  const imageGridData = [
    '/images/vertical-image-01.jpeg',
    '/images/horizontal-image-01.jpg',
    '/images/vertical-image-01.jpeg',
    '/images/vertical-image-01.jpeg',
    '/images/vertical-image-01.jpeg',
    '/images/vertical-image-01.jpeg'
  ];

  return (
    <React.Fragment key={ `${ inviteCode }-${ Math.floor(Math.random() * 10000) }` }>
      <ScrollUpCover data={ coverData.content } />
      <ScrollWrapper>
        { renderContent(invitationData) }
        <ImageGrid images={ imageGridData } />
        <AttendanceConfirmation inviteCode={ inviteCode } />
      </ScrollWrapper>
    </React.Fragment>
  );
}
