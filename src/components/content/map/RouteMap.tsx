'use client';

import { useState } from 'react';

import TitleText from '@/components/fragments/text/TitleText';
import { twMerge } from 'tailwind-merge';
import Wrapper from '../Wrapper';
import KakaoMap from './KakaoMap';
import NaverMap from './NaverMap';
import Tmap from './Tmap';

const tabs = ['카카오', '네이버', 'Tmap'];

const routeMapWrapperClass = twMerge('flex flex-col items-center gap-6');
const routeMapDescriptionWrapperClass = twMerge(
    'flex flex-col gap-4 text-left w-full p-10'
);

type RouteMapProps = {
  data: {
    title: string;
    content: {
      mapTitle: string;
      location: string;
      routeDescription: {
        title: string;
        description: string;
      }[];
    };
  };
};

export default function RouteMap({ data }: RouteMapProps) {
  const [activeTab, setActiveTab] = useState('카카오');

  const renderMap = () => {
    switch (activeTab) {
      case '카카오':
        return <KakaoMap location={data.content.location} />;
      case '네이버':
        return <NaverMap location={data.content.location} />;
      case 'Tmap':
        return <Tmap location={data.content.location} />;
      default:
        return null;
    }
  };

  return (
      <Wrapper className={routeMapWrapperClass}>
        <TitleText text={data.title} />
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
              <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={twMerge(
                      'px-4 py-2 border rounded-full text-sm',
                      activeTab === tab ? 'bg-black text-white' : 'bg-gray-100'
                  )}
              >
                {tab}
              </button>
          ))}
        </div>

        <div className="w-full h-[300px] rounded-md overflow-hidden shadow">{renderMap()}</div>

        <div className={routeMapDescriptionWrapperClass}>
          <div>
            <div>주소</div>
            <div>{data.content.location}</div>
          </div>
          {data.content.routeDescription.map((routeDescription) => (
              <div key={routeDescription.title}>
                <h3>{routeDescription.title}</h3>
                <p>{routeDescription.description}</p>
              </div>
          ))}
        </div>
      </Wrapper>
  );
}
