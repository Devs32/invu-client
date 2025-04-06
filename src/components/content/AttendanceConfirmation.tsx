'use client';

import { useToastStore } from '@/stores/toast';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { request } from '../../utils/http';
import Modal from '../modal/Modal';
import RadioSelector from '../selector/RadioSelector';
import DateText from '../text/DateText';
import InputText from '../text/InputText';
import TitleText from '../text/TitleText';
import Wrapper from './Wrapper';

const modalWrapperClass = twMerge(
  'my-10',
  'z-50',
  'whitespace-pre-line'
);

type AttendanceConfirmationProps = {
  inviteCode: string;
};

type HandleSubmitProps = {
  inviteCode: string;
  name: string;
  companionCount: string;
  meal: string;
  companionName: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

export default function AttendanceConfirmation({ inviteCode }: AttendanceConfirmationProps) {
  const { addToast } = useToastStore();
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const [ name, setName ] = useState('');
  const [ companionCount, setCompanionCount ] = useState('0');
  const [ companionName, setCompanionName ] = useState('');
  const [ meal, setMeal ] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);

  const data = {
    title: '참석의사 전달하기',
    text: '축하의 마음으로 참석해 주시는\n모든 분들을 귀하게 모실 수 있도록\n참석 의사를 전달 부탁드립니다.',
    date: '2025-05-31'
  };

  const validateInputs = (): boolean => {
    if (!name.trim()) {
      addToast('성함을 입력해 주세요.');
      nameRef.current?.focus();
      return false;
    }
    if (!meal) {
      addToast('식사 여부를 선택해 주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async ({ inviteCode, name, companionCount, companionName, meal, setIsModalOpen }: HandleSubmitProps) => {
    if (!validateInputs()) {
      return;
    }

    const response = await request(`/api/v1/invitation/${ inviteCode }/guests`, {
      method: 'POST',
      body: {
        guestName: name,
        attendCount: companionCount,
        nameNotes: companionName,
        status: meal
      }
    });

    if (response.ok) {
      alert('참석 의사가 전달되었습니다.');
      setIsModalOpen(false);
    } else {
      alert('참석 의사 전달에 실패했습니다.');
    }
  };

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
      <Modal animationType="scale" isOpen={ isModalOpen } onClose={ setIsModalOpen.bind(null, false) }>
        <div className="flex flex-col items-center w-full h-full justify-center">
          <DateText dateString={ data.date } />
          <div className="flex flex-col w-full px-10 py-10 gap-y-5">
            <InputText id="name" type="text" label="성함" value={ name } placeholder="성함을 입력해주세요." onChange={ setName } ref={ nameRef as React.RefObject<HTMLInputElement> } />
            <InputText id="companionCount" type="number" label="동반인원" value={ companionCount } onChange={ setCompanionCount } />
            <InputText id="companionName" type="text" label="동행인" value={ companionName } placeholder="동행인 성함을 입력해 주세요." onChange={ setCompanionName } />
            <RadioSelector id="meal" label="식사여부" options={ [ { label: '예정', value: 'Y' }, { label: '안함', value: 'N' }, { label: '미정', value: 'U' } ] } onChange={ setMeal } />
          </div>
          <button onClick={ handleSubmit.bind(null, { inviteCode, name, companionCount, companionName, meal, setIsModalOpen }) } type="submit" className="border border-[#FCA5A5] text-[#FCA5A5] px-14 py-2 my-5 rounded-md transition-all duration-300 hover:bg-[#FCA5A5] hover:text-white">
            전달하기
          </button>
        </div>
      </Modal>
    </Wrapper>
  );
}
