'use client';

import { useToastStore } from '@/stores/toast';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { request } from '../../utils/http';
import Modal from '../fragments/modal/Modal';
import RadioSelector from '../fragments/selector/RadioSelector';
import DateText from '../fragments/text/DateText';
import InputText from '../fragments/text/InputText';
import TitleText from '../fragments/text/TitleText';
import Wrapper from './Wrapper';

const modalWrapperClass = twMerge(
  'my-10',
  'z-50',
  'whitespace-pre-line'
);

type AttendanceConfirmationProps = {
  inviteCode: string;
  data?: {
    title: string;
    text: string;
    date: string;
  };
};

type HandleSubmitProps = {
  inviteCode: string;
  name: string;
  companionCount: string;
  childCount: string;
  meal: string;
  companionName: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

const dummayData = {
  title: '참석의사 전달하기',
  text: '축하의 마음으로 참석해 주시는\n모든 분들을 귀하게 모실 수 있도록\n참석 의사를 전달 부탁드립니다.',
  date: '2025-05-31'
};

export default function AttendanceConfirmation({ inviteCode, data = dummayData }: AttendanceConfirmationProps) {
  const { addToast } = useToastStore();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false); // 제출 중 상태 추가

  const [ name, setName ] = useState('');
  const [ companionCount, setCompanionCount ] = useState('0');
  const [ companionName, setCompanionName ] = useState('');
  const [ childCount, setChildCount ] = useState('0');
  const [ meal, setMeal ] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);

  const validateInputs = (): boolean => {
    if (!name.trim()) {
      addToast('성함을 입력해 주세요.');
      nameRef.current?.focus();
      return false;
    }
    // if (!meal) {
    //   addToast('식사 여부를 선택해 주세요.');
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async ({ inviteCode, name, companionCount, companionName, childCount, meal, setIsModalOpen }: HandleSubmitProps) => {
    if (!validateInputs() || isSubmitting) {
      return;
    }

    setIsSubmitting(true); // 제출 시작

    try {
      const response = await request(`/api/v1/invitation/${ inviteCode }/guests`, {
        method: 'POST',
        body: {
          guestName: name,
          attendNumber: companionCount,
          nameNotes: companionName,
          status: meal,
          childNumber: childCount
        }
      });

      if (response.ok) {
        addToast('참석 의사가 전달되었습니다.');
        setIsModalOpen(false);
      } else {
        addToast('참석 의사 전달에 실패했습니다.');
      }
    } catch (error) {
      addToast('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false); // 작업 완료 후 상태 초기화
    }
  };

  const resetInputs = () => {
    setName('');
    setCompanionCount('0');
    setCompanionName('');
    setChildCount('0');
    setMeal('');
  };

  useEffect(() => {
    if (!isModalOpen) {
      resetInputs();
    }
  }, [ isModalOpen ]);

  return (
    <Wrapper className={ modalWrapperClass }>
      <TitleText className="text-lg" text={ data.title } />
      <div className="my-5 whitespace-pre-line text-center">
        { data.text }
      </div>
      <button
        className="border border-[#FCA5A5] text-[#FCA5A5] px-14 py-2 my-5 rounded-md transition-all duration-300 hover:bg-[#FCA5A5] hover:text-white"
        onClick={ setIsModalOpen.bind(null, true) }
      >
          참석 의사 전달하기
      </button>
      <Modal animationType="scale" isOpen={ isModalOpen } onClose={ () => setIsModalOpen(false) }>
        <div className="flex flex-col items-center w-full h-full justify-center">
          <DateText dateString={ data.date } />
          <div className="flex flex-col w-full px-10 py-10 gap-y-5">
            <InputText id="name" type="text" label="성함" value={ name } placeholder="성함을 입력해주세요." onChange={ setName } ref={ nameRef as React.RefObject<HTMLInputElement> } />
            <InputText id="companionCount" type="number" label="동반인원" value={ companionCount } min={ 0 } onChange={ setCompanionCount } />
            <InputText id="childCount" type="number" label="아동인원" value={ childCount } min={ 0 } onChange={ setChildCount } />
            {/*<InputText id="companionName" type="text" label="동행인" value={ companionName } placeholder="동행인 성함을 입력해 주세요." onChange={ setCompanionName } />*/}
            {/*<RadioSelector id="meal" label="식사여부" options={ [ { label: '예정', value: 'YES' }, { label: '안함', value: 'NO' }, { label: '미정', value: 'UNDECIDED' } ] } onChange={ setMeal } />*/}
          </div>
          <button
            onClick={ () => handleSubmit({ inviteCode, name, companionCount, companionName, childCount, meal, setIsModalOpen }) }
            type="submit"
            disabled={ isSubmitting }
            className={ twMerge(
              'border border-[#FCA5A5] text-[#FCA5A5] px-14 py-2 my-5 rounded-md transition-all duration-300',
              !isSubmitting && 'hover:bg-[#FCA5A5] hover:text-white',
              isSubmitting && 'opacity-50 cursor-not-allowed'
            ) }
          >
            { isSubmitting ? '처리 중...' : '전달하기' }
          </button>
        </div>
      </Modal>
    </Wrapper>
  );
}
