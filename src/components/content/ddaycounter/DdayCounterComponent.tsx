'use client';

import React, { useState, useEffect } from 'react';

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

const DdayCounterComponent: React.FC<DdayCounterProps> = ({
  targetDate,
  title,
  subtitle,
  bottomMessage,
  showTimeDisplay
}) => {
  const [ timeLeft, setTimeLeft ] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [ targetDate ]);

  const padNumber = (num: number) => String(num).padStart(2, '0');
  const replaceTemplateVariables = (text?: string) => {
    if (!text) return null;

    // 모든 템플릿 변수를 찾아서 치환
    const templateRegex = /\{\$(days|hours|minutes|seconds)\}/g;

    const parts = text.split(templateRegex);

    return parts.map((part, index) => {
      switch(part) {
      case 'days':
        return <span key={ index } className="text-orange-400 font-medium">{timeLeft.days}</span>;
      case 'hours':
        return <span key={ index } className="text-orange-400 font-medium">{padNumber(timeLeft.hours)}</span>;
      case 'minutes':
        return <span key={ index } className="text-orange-400 font-medium">{padNumber(timeLeft.minutes)}</span>;
      case 'seconds':
        return <span key={ index } className="text-orange-400 font-medium">{padNumber(timeLeft.seconds)}</span>;
      default:
        return part;
      }
    });
  };

  return (
    <section className="w-full max-w-md mx-auto text-center">
      {title && <h2 className="text-orange-400 text-lg font-medium mb-4">{title}</h2>}

      {showTimeDisplay &&(
        <div className="flex justify-center items-center gap-1 mb-6">
          {[
            { value: timeLeft.days, label: 'DAYS' },
            { value: timeLeft.hours, label: 'HOUR' },
            { value: timeLeft.minutes, label: 'MIN' },
            { value: timeLeft.seconds, label: 'SEC' }
          ].map((item, index, arr) => (
            <React.Fragment key={ item.label }>
              <div className="p-2 bg-gray-50 rounded-md shadow-sm w-12">
                <span className="block text-lg font-semibold text-gray-700">{padNumber(item.value)}</span>
                <span className="block text-xs text-gray-500 mt-1">{item.label}</span>
              </div>
              {index < arr.length - 1 && <span className="text-gray-400 text-xl font-semibold">:</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      {subtitle && (
        <p className="text-gray-600 text-sm">
          {replaceTemplateVariables(subtitle)}
        </p>
      )}

      {bottomMessage && (
        <p className="text-gray-700 text-xs mt-4">
          {bottomMessage.split(/(\d+)/).map((part, index) =>
            /\d+/.test(part) ? (
              <span key={ index } className="text-red-400 font-medium">{part}</span>
            ) : (
              part
            )
          )}
        </p>
      )}
    </section>
  );
};

export default DdayCounterComponent;
