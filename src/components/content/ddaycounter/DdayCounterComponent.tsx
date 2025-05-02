'use client';

import { calcTimeLeft, padNumber } from '@/utils/date';
import React, { useEffect, useState } from 'react';

interface DdayCounterProps {
    targetDate: Date;
    title?: string;
    subtitle?: string;
    bottomMessage?: string;
    showTimeDisplay?: boolean;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const replaceTemplateVariables = (text: string, timeLeft: TimeLeft) => {
  if (!text) return null;

  // 모든 템플릿 변수를 찾아서 치환
  const templateRegex = /\{\$(days|hours|minutes|seconds)\}/g;

  const parts = text.split(templateRegex);

  return parts.map((part, index) => {
    switch(part) {
    case 'days':
      return <span key={ index } className="text-[#FCA5A5] font-bold">{timeLeft.days}</span>;
    case 'hours':
      return <span key={ index } className="text-[#FCA5A5] font-bold">{padNumber(timeLeft.hours)}</span>;
    case 'minutes':
      return <span key={ index } className="text-[#FCA5A5] font-bold">{padNumber(timeLeft.minutes)}</span>;
    case 'seconds':
      return <span key={ index } className="text-[#FCA5A5] font-bold">{padNumber(timeLeft.seconds)}</span>;
    default:
      return part;
    }
  });
};

export default function DdayCounterComponent({
  targetDate,
  title,
  subtitle,
  bottomMessage,
  showTimeDisplay
}: DdayCounterProps) {
  const [ timeLeft, setTimeLeft ] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [ targetDate ]);

  return (
    <section className="w-full max-w-md mx-auto text-center">
      {
        title && (
          <h2 className="text-orange-400 text-lg font-medium mb-4">
            { title }
          </h2>
        )
      }

      {
        showTimeDisplay && (
          <div className="flex justify-center items-center gap-1 mb-6">
            {
              [
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HOUR' },
                { value: timeLeft.minutes, label: 'MIN' },
                { value: timeLeft.seconds, label: 'SEC' }
              ].map((item, index, arr) => (
                <React.Fragment key={ item.label }>
                  <div className="p-2 bg-gray-50 rounded-md shadow-sm w-12">
                    <span className="block text-lg font-semibold text-gray-700">{ padNumber(item.value) }</span>
                    <span className="block text-xs text-gray-500 mt-1">{item.label}</span>
                  </div>
                  {
                    index < arr.length - 1 && (
                      <span className="text-gray-400 text-xl font-semibold">:</span>
                    )
                  }
                </React.Fragment>
              ))
            }
          </div>
        )
      }

      {
        subtitle && (
          <p className="text-gray-600 text-sm">
            { replaceTemplateVariables(subtitle, timeLeft) }
          </p>
        )
      }

      {
        bottomMessage && (
          <p className="text-gray-700 text-xs mt-4">
            {
              bottomMessage.split(/(\d+)/).map((part, index) =>
                /\d+/.test(part) ? (
                  <span key={ index } className="text-[#FCA5A5] font-bold">{ part }</span>
                ) : (
                  part
                )
              )
            }
          </p>
        )
      }
    </section>
  );
};
