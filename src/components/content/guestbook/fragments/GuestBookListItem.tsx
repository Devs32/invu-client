import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

const itemClass = twMerge(
  'flex flex-col gap-2',
  'bg-white',
  'rounded-lg px-6 py-4',
  'relative'
);

const buttonGroupClass = twMerge(
  'absolute top-4 right-3',
  'flex gap-1'
);

const buttonClass = twMerge(
  'text-sm text-gray-400',
  'hover:text-gray-600 transition-colors',
  'p-1'
);

const messageClass = twMerge(
  'break-all'
);

type GuestBookListItemProps = {
  item: any;
  onClick: (id: number, type: 'edit' | 'delete') => void;
};

export default function GuestBookListItem({ item, onClick }: GuestBookListItemProps) {
  return (
    <div className={ itemClass }>
      <div className={ buttonGroupClass }>
        <button 
          className={ buttonClass }
          onClick={ () => onClick(item.id, 'edit') }
        >
          <PencilIcon className="w-3 h-3" />
        </button>
        <button 
          className={ buttonClass }
          onClick={ () => onClick(item.id, 'delete') }
        >
          <XMarkIcon className="w-3 h-3" />
        </button>
      </div>
      <div className="text-sm text-gray-500">from. { item.guestName }</div>
      <div className={ messageClass }>{ item.message }</div>
    </div>
  );
}
