import { create } from 'zustand';

type PageEntryState = {
  entryTime: Date | null; // 사용자가 페이지에 진입한 시간을 저장
  isInitialized: boolean; // 페이지 초기화 여부를 나타냄
};

type PageEntryActions = {
  setEntryTime: (time: Date) => void; // entryTime을 설정하는 함수
  setIsInitialized: (isInitialized: boolean) => void; // isInitialized를 설정하는 함수
};

type PageEntryStore = PageEntryState & PageEntryActions;

const defaultPageEntryState: PageEntryState = {
  entryTime: null, // 초기 상태에서 entryTime은 null
  isInitialized: true // 초기 상태에서 페이지는 초기화되지 않음
};

export const usePageEntryStore = create<PageEntryStore>((set) => ({
  ...defaultPageEntryState,
  setEntryTime: (time) => set({ entryTime: time }),
  setIsInitialized: (isInitialized) => set({ isInitialized })
}));
