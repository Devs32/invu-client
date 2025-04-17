'use client';

import Modal from '@/components/fragments/modal/Modal';
import { request } from '@/utils/http';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import GuestBookForm from './GuestBookForm';
import GuestBookListItem from './GuestBookListItem';

type GuestBookListProps = {
  inviteCode: string;
  limit?: number;
};

type SelectedItem = {
  id: number | null;
  type: 'edit' | 'delete' | null;
  initialValues?: {
    guestName?: string;
    message?: string;
  };
};

const listClass = twMerge(
  'w-full h-full p-4',
  'flex flex-col gap-4',
  'bg-gray-100'
);

export default function GuestBookList({ inviteCode, limit }: GuestBookListProps) {
  const [ isOpen, setIsOpen ] = useState(false);

  const [ listData, setListData ] = useState<any[]>([]);
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

  const getGuestBookItem = (itemId: number | null) => {
    return listData.find((item) => item.id === itemId);
  };

  const onClickItem = (itemId: number | null, type: 'edit' | 'delete' | null) => {
    setSelectedItem({ id: itemId, type, initialValues: getGuestBookItem(itemId) });
    setIsOpen(true);
  };

  const getModalHeight = (type: 'edit' | 'delete' | null) => {
    return type === 'delete' ? 'h-[200px]' : 'h-[400px]';
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
        isOpen={ isOpen } 
        onClose={ () => setIsOpen(false) } 
        width="w-[300px]" 
        height={ getModalHeight(selectedItem.type) }
      >
        <GuestBookForm
          type={ selectedItem.type }
          inviteCode={ inviteCode }
          initialValues={ selectedItem.initialValues }
          isOpen={ isOpen }
          onClose={ () => setIsOpen(false) }
        />
      </Modal>
    </div>
  );
}
