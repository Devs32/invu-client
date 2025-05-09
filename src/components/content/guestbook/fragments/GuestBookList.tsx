'use client';

import Modal from '@/components/fragments/modal/Modal';
import { guestBookActions } from '@/utils/action/guestBookActions';
import { guestBookEmitter } from '@/utils/eventEmitter';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import GuestBookForm from './GuestBookForm';
import GuestBookListItem from './GuestBookListItem';

type GuestBookListProps = {
  inviteCode: string;
  limit?: number;
  isEmit?: boolean;
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

const emptyMessageClass = twMerge(
  'w-full p-6 rounded-lg',
  'flex flex-col items-center justify-center',
  'bg-white shadow-sm',
  'text-center'
);

export default function GuestBookList({ inviteCode, limit, isEmit = false }: GuestBookListProps) {
  const [ isOpen, setIsOpen ] = useState(false);

  const [ listData, setListData ] = useState<any[]>([]);
  const [ selectedItem, setSelectedItem ] = useState<SelectedItem>({ id: null, type: null });

  const requestGuestBookListData = async (inviteCode: string) => {
    try {
      const res = await guestBookActions.getGuestBooks(inviteCode);
      const limitData = limit ? res.slice(0, limit) : res;

      setListData(limitData);
    } catch (error) {
      console.warn(error);
      return [];
    }
  };

  const refreshListData = async () => {
    await requestGuestBookListData(inviteCode);
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

    if (isEmit) {
      guestBookEmitter.on('refreshListData', refreshListData);
    }

    return () => {
      if (isEmit) {
        guestBookEmitter.off('refreshListData', refreshListData);
      }
    };
  }, []);

  return (
    <div className={ listClass }>
      {listData.length === 0 ? (
      // 방명록이 없을 경우 표시할 메시지
        <div className={ emptyMessageClass }>
          <p className="text-gray-600 mb-2">아직 작성된 방명록이 없습니다.</p>
          <p className="text-gray-800 font-medium mb-4">첫 번째 방명록을 남겨보세요! 💌</p>
        </div>
      ) : (
      // 방명록이 있을 경우 목록 표시
        listData.map((item: any, index: number) => (
          <GuestBookListItem key={ item.id } item={ item } onClick={ onClickItem } />
        ))
      )}
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
          onSuccess={ refreshListData }
        />
      </Modal>
    </div>
  );
}
