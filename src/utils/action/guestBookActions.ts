import { request } from '@/utils/http';

interface GuestBookData {
  guestName: string;
  password: string;
  message: string;
  invuId: string;
}

export const guestBookActions = {
  // 방명록 목록 조회
  getGuestBooks: async (inviteCode: string) => {
    const response = await request(`/api/v1/invitation/${ inviteCode }/guestBooks`);
    const data = await response.json();
    return data.data;
  },

  // 방명록 작성
  createGuestBook: async (inviteCode: string, data: Omit<GuestBookData, 'invuId'>) => {
    return await request(`/api/v1/invitation/${ inviteCode }/guestBooks`, {
      method: 'POST',
      body: {
        ...data,
        invuId: inviteCode
      }
    });
  },

  // 방명록 수정
  updateGuestBook: async (inviteCode: string, guestBookId: number | undefined, data: Omit<GuestBookData, 'invuId'>) => {
    return await request(`/api/v1/invitation/${ inviteCode }/guestBooks/${ guestBookId }`, {
      method: 'POST',
      body: {
        ...data,
        invuId: inviteCode
      }
    });
  },

  // 방명록 삭제
  deleteGuestBook: async (inviteCode: string, guestBookId: number | undefined, password: string) => {
    return await request(`/api/v1/invitation/${ inviteCode }/guestBooks/delete/${ guestBookId }`, {
      method: 'POST',
      body: { password }
    });
  }
};
