'use client';

import CreateGuestBookButton from './CreateGuestBookButton';
import ListEntriesButton from './ListEntriesButton';

type GuestBookManagerProps = {
  inviteCode: string;
};
export default function GuestBookManager({ inviteCode }: GuestBookManagerProps) {
  return (
    <div className="flex gap-10">
      <CreateGuestBookButton inviteCode={ inviteCode } />
      <ListEntriesButton inviteCode={ inviteCode } />
    </div>
  );
}
