'use client';

import CreateEntryButton from './CreateEntryButton';
import ListEntriesButton from './ListEntriesButton';

type GuestBookManagerProps = {
  inviteCode: string;
};
export default function GuestBookManager({ inviteCode }: GuestBookManagerProps) {
  return (
    <div className="flex gap-10">
      <CreateEntryButton inviteCode={ inviteCode } />
      <ListEntriesButton inviteCode={ inviteCode } />
    </div>
  );
}
