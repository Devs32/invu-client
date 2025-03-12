import DdayCounterComponent from '@/components/content/ddaycounter/DdayCounterComponent';

type DdayCounterProps = {
    data: {
        targetDate?: string; // "yyyy-mm-dd HH:mm" 형식
        title?: string;
        subtitle?: string;
        bottomMessage?: string;
        showTimeDisplay?: boolean;
    }
}

export default function DdayCounter({ data }: DdayCounterProps) {
  const parseTargetDate = (dateString?: string) => {
    if (!dateString) {
      return new Date(); // 기본값으로 현재 시간 반환
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!dateRegex.test(dateString)) {
      console.error('날짜 형식이 올바르지 않습니다. "yyyy-mm-dd HH:mm" 형식을 사용하세요.');
      return new Date();
    }

    const [ datePart, timePart ] = dateString.split(' ');
    const [ year, month, day ] = datePart.split('-').map(Number);
    const [ hour, minute ] = timePart.split(':').map(Number);
    const targetDate = new Date(year, month - 1, day, hour, minute);

    if (isNaN(targetDate.getTime())) {
      console.error('유효하지 않은 날짜입니다.');
      return new Date();
    }

    return targetDate;
  };

  const targetDate = parseTargetDate(data.targetDate);

  return (
    <div className="py-12 px-4">
      <DdayCounterComponent
        targetDate={ targetDate }
        title={ data.title }
        subtitle={ data.subtitle }
        bottomMessage={ data.bottomMessage }
        showTimeDisplay = { data.showTimeDisplay }
      />
    </div>
  );

}
