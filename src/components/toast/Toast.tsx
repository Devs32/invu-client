'use client';

import { useToastStore } from '@/stores/toast';
import { twMerge } from 'tailwind-merge';

const toastWrapperClass = twMerge(
  'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3',
  'bg-transparent'
);

const toastClass = twMerge(
  'rounded-full px-6 py-3 bg-gray-900/50 text-white',
  'shadow-lg cursor-pointer',
  'transition-all duration-300',
  'translate-y-full opacity-0',
  'data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100',
  'hover:opacity-100'
);

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className={ toastWrapperClass }>
      {
        toasts.map((toast) => (
          <div
            key={ toast.id }
            className={ toastClass }
            data-visible={ toast.visible }
            onClick={ () => removeToast(toast.id) }
          >
            { toast.message }
          </div>
        ))
      }
    </div>
  );
} 
