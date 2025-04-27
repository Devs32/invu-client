import Wrapper from '@/components/content/Wrapper';
import TitleText from '@/components/fragments/text/TitleText';
import GuestBookList from './fragments/GuestBookList';
import GuestBookManager from './fragments/GuestBookManager';

type GuestBookProps = {
  inviteCode: string;
};

export default function GuestBook({ inviteCode }: GuestBookProps) {
  return (
    <Wrapper>
      <TitleText text="방명록" />
      <GuestBookList inviteCode={ inviteCode } limit={ 3 } isEmit={ true } />
      <GuestBookManager inviteCode={ inviteCode } />
    </Wrapper>
  );
}
