'use client';

import Modal from '@/components/modal/Modal';
import { request } from '@/utils/http';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import GuestBookListItem from './GuestBookListItem';

type GuestBookListProps = {
  inviteCode: string;
  limit?: number;
};

type SelectedItem = {
  id: number | null;
  type: 'edit' | 'delete' | null;
};

const listClass = twMerge(
  'w-full h-full p-4',
  'flex flex-col gap-4',
  'bg-gray-100'
);

export default function GuestBookList({ inviteCode, limit }: GuestBookListProps) {
  const [ listData, setListData ] = useState<any[]>([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedItem, setSelectedItem ] = useState<SelectedItem>({ id: null, type: null });
  
  const requestGuestBookListData = async (inviteCode: string) => {
    try {
      const api = `/api/v1/invitation/${ inviteCode }/guestBooks`;
      const res = await request(api);
      const data = await res.json();

      const limitData = limit ? data.data.slice(0, limit) : data.data;

      setListData(limitData);
    } catch (error) {
      console.warn(error);
      return [];
    }
  };
  const onClickItem = (itemId: number | null, type: 'edit' | 'delete' | null) => {
    setSelectedItem({ id: itemId, type });
    setIsModalOpen(true);
  };

  useEffect(() => {
    requestGuestBookListData(inviteCode);
  }, [ ]);

  return (
    <div className={ listClass }>
      {
        listData?.map((item: any, index: number) => (
          <GuestBookListItem key={ item.id } item={ item } onClick={ onClickItem } />
        ))
      }
      <Modal
        isOpen={ isModalOpen }
        onClose={ () => setIsModalOpen(false) }
      >
        <div>
          <h2>Modal</h2>
        </div>
      </Modal>
    </div>
  );
}
