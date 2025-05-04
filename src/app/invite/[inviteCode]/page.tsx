import Container from '@/components/content/Container';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { twMerge } from 'tailwind-merge';

// import d from '@/_fonts'

const gowunDodum = localFont({
  src: '../../../../public/fonts/GowunDodum-Regular.woff',
  display: 'swap'
});

const koPubWorld = localFont({
  src: '../../../../public/fonts/KoPubWorld Batang Light.ttf',
  display: 'swap'
});

// 초대 페이지는 모바일환경에서만 볼 수 있다는 가정
const invtePageClass = twMerge(
  'h-full w-full relative',
  'overflow-hidden',
  'max-w-md min-w-sm mx-auto',
  'box-border'
);

type InvitePageProps = {
  params: Promise<{ inviteCode: string }>;
};

export async function generateMetadata({ params }: { params: { inviteCode: string } }): Promise<Metadata> {
  return {
    title: '해니의 생일 초대장'
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const inviteCode = (await params).inviteCode; // 초대 코드

  return (
    <div className={ `${ koPubWorld.className } ${ invtePageClass }` }>
      {/* <h1>초대 코드: <TypingText text={ inviteCode } /></h1> */}
      <Container inviteCode={ inviteCode } />
    </div>
  );
}
