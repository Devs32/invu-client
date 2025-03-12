import { notFound } from 'next/navigation';
import React from 'react';

import { request } from '@/utils/http';

import Main from '../content/Main';
import Intro from './Intro';
import ScrollUpCover from './cover/ScrollUpCover';
import Timeline from './timeline/Timeline';
import DdayCounter from "@/components/content/DdayCounter";

type ContainerProps = {
  inviteCode?: string;
};

const requestInvitationData = async (inviteCode: string | undefined) => {
  if (!inviteCode) return null;

  try {
    const api = `/api/v1/invitation/${ inviteCode }`;
    // 60초 동안 데이터 캐시
    const res = await request(api, { next: { revalidate: 60 } });
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
      return <Main data={ item } />;
    case 'timeline':
      return <Timeline data={ item } />;
    case 'ddaycounter':
      return <DdayCounter data={ item.content } />;
    default:
      return null;
    }
  });
};

export default async function Container({ inviteCode }: ContainerProps) {
  const invitationData = await requestInvitationData(inviteCode);

  await new Promise(resolve => setTimeout(resolve, 500));

  const coverData = {
    coverImage: '/images/vertical-image-01.jpeg',
    coverTitle: 'ㅇㅇㅇ',
    coverDate: '2025. 03. 10 | 오후 10:00',
    coverLocation: '장소'
  };

  return (
    <React.Fragment key={ `${ inviteCode }-${ Math.floor(Math.random() * 10000) }` }>
      <ScrollUpCover data={ coverData } />
      { renderContent(invitationData) }
    </React.Fragment>
  );
}
