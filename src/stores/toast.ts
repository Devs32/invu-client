import { create } from 'zustand';

type Toast = {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
};

type ToastState = {
  toasts: Toast[];
};

type ToastActions = {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: number) => void;
};

type ToastStore = ToastState & ToastActions;

const defaultToastState: ToastState = {
  toasts: []
};

export const useToastStore = create<ToastStore>((set) => ({
  ...defaultToastState,
  addToast: (message, type = 'info') => {
    const id = Date.now();
    set(() => ({
      toasts: [ { id, message, type, visible: false } ]
    }));
    
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((toast) =>
          toast.id === id ? { ...toast, visible: true } : toast
        )
      }));
    }, 100);

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((toast) =>
          toast.id === id ? { ...toast, visible: false } : toast
        )
      }));

      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id)
        }));
      }, 300); // transition duration과 동일하게 설정
    }, 3000);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  }
})); 
