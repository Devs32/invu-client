import { twMerge } from 'tailwind-merge';

type CalendarProps = {
  date: string;
  startOfWeek?: 'monday' | 'sunday';
};

const WEEKDAYS = {
  monday: [ '월', '화', '수', '목', '금', '토', '일' ],
  sunday: [ '일', '월', '화', '수', '목', '금', '토' ]
};

function generateCalendarGrid(date: Date, startOfWeek: 'monday' | 'sunday') {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const days = [];

  // 첫 번째 주의 시작 요일 설정
  const firstDayIndex = firstDayOfMonth.getDay();
  const startDay = startOfWeek === 'monday' 
    ? (firstDayIndex === 0 ? 6 : firstDayIndex - 1) 
    : firstDayIndex;
  const totalDays = lastDayOfMonth.getDate();

  // 이전 달의 마지막 며칠을 포함하여 첫 주를 채움
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // 현재 달의 모든 날짜를 추가
  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(year, month, day));
  }

  // 그리드가 완전한 주로 끝나도록 다음 달의 며칠을 추가
  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
}

const gridClass = twMerge(
  'w-7',
  'h-7',
  'flex',
  'items-center',
  'justify-center'
);

export default function Calendar({ date, startOfWeek = 'sunday' }: CalendarProps) {
  const datetime = new Date(date);
  const daysInGrid = generateCalendarGrid(datetime, startOfWeek);
  const weekdays = WEEKDAYS[startOfWeek];

  const targetDate = datetime.getDate();

  return (
    <div>
      <p className="text-2xl font-bold text-center my-5">{ datetime.getMonth() + 1 }월</p>
      <div className="grid grid-cols-7 gap-3 gap-y-1">
        {weekdays.map((weekday, index) => (
          <div key={ index } className={ twMerge(gridClass, weekday === '일' ? 'text-[#FCA5A5]' : '') }>
            { weekday }
          </div>
        ))}
        {daysInGrid.map((day, index) => (
          <div
            key={ index }
            className={ twMerge(gridClass, day?.getDate() === targetDate ? 'text-white bg-[#FCA5A5] rounded-full' : day?.getDay() === 0 ? 'text-[#FCA5A5]' : '') }
          >
            { day ? day.getDate() : '' }
          </div>
        ))}
      </div>
    </div>
  );
}
