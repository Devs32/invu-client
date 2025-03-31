import Wrapper from '@/components/content/Wrapper';
import TitleText from '@/components/text/TitleText';
import GuestBookManager from './fragments/GuestBookManager';

type GuestBookProps = {
  inviteCode: string;
};

export default function GuestBook({ inviteCode }: GuestBookProps) {
  return (
    <Wrapper>
      <TitleText text="방명록" />
      <GuestBookManager inviteCode={ inviteCode } />
    </Wrapper>
  );
}
