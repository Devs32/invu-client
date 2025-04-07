import TitleText from '@/components/fragments/text/TitleText';
import Wrapper from '../Wrapper';
import Calendar from './Calendar';

type CalendarWrapperProps = {
  data: {
    title: string;
    date: string;
  };
};

export default function CalendarWrapper({ data }: CalendarWrapperProps) {
  return (
    <Wrapper>
      <TitleText text={ data.title } />
      <Calendar date={ data.date } />
    </Wrapper>
  );
}
