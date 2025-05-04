import { notFound } from 'next/navigation';
import React from 'react';

import { request } from '@/utils/http';

import DdayCounter from '@/components/content/DdayCounter';
import Main from '../content/Main';
import AttendanceConfirmation from './AttendanceConfirmation';
import Footer from './Footer';
import Intro from './Intro';
import ScrollWrapper from './ScrollWrapper';
import CalendarWrapper from './calendar/CalendarWrapper';
import ScrollUpCover from './cover/ScrollUpCover';
import GuestBook from './guestbook/GuestBook';
import ImageGrid from './image/ImageGrid';
import RouteMap from './map/RouteMap';
import Timeline from './timeline/Timeline';

type ContainerProps = {
  inviteCode?: string;
  initialData?: any;
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

const renderContent = (data: any[], inviteCode: string): React.ReactNode => {
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
    case 'imageGrid':
      return <ImageGrid data={ item.content } />;
    case 'calendar':
      return <CalendarWrapper data={ item.content } />;
    case 'attendance':
      return <AttendanceConfirmation inviteCode={ inviteCode } data={ item.content } />;
    case 'map':
      return <RouteMap data={ item.content } />;
    default:
      return null;
    }
  });
};

export default async function Container({ inviteCode = '' }: ContainerProps) {
  const invitationData = await requestInvitationData(inviteCode);

  // await new Promise(resolve => setTimeout(resolve, 500));

  const coverData = invitationData.find((item: any) => item.type === 'cover');

  return (
    <React.Fragment key={ `${ inviteCode }-${ Math.floor(Math.random() * 10000) }` }>
      <ScrollUpCover data={ coverData.content } />
      <ScrollWrapper>
        { renderContent(invitationData, inviteCode) }
        <GuestBook inviteCode={ inviteCode } />
        <Footer inviteCode={ inviteCode } />
      </ScrollWrapper>
    </React.Fragment>
  );
}
