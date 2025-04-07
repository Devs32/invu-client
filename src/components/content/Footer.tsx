import { twMerge } from 'tailwind-merge';
import LinkShare from './LinkShare';

export default function Footer({ inviteCode }: { inviteCode: string }) {
  return (
    <footer className={ twMerge(
      'w-full py-6',
      'text-center text-xs bg-gray-200'
    ) }>
      <LinkShare inviteCode={ inviteCode } />
      <p>Powered by Devs32 ⓒ All Rights Reserved.</p>
    </footer>
  );
}
