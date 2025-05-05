
'use client';

import { RefObject } from 'react';

type InputTextProps = {
    id: string;
    type: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    ref?: RefObject<HTMLInputElement>;
    min?: number;
    max?: number;
    required?: boolean;
    errorMessage?: string;
};

export default function InputText({ id, type = 'text', label, value, onChange, placeholder = '', ref, min, max, required = false, errorMessage }: InputTextProps) {
  // 숫자 입력 필드에 대한 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // type이 number일 경우 유효성 검사 수행
    if (type === 'number') {
      // 빈 문자열이거나 숫자만 포함된 문자열인 경우 허용
      if (newValue === '' || /^[0-9]*$/.test(newValue)) {
        // 최소값 검사
        if (min !== undefined && newValue !== '' && parseInt(newValue) < min) {
          onChange(min.toString());
          return;
        }

        // 최대값 검사
        if (max !== undefined && newValue !== '' && parseInt(newValue) > max) {
          onChange(max.toString());
          return;
        }

        onChange(newValue);
      }
    } else {
      // 숫자 타입이 아닌 경우 그대로 처리
      onChange(newValue);
    }
  };

  return (
    <div className="flex w-full">
      <label className="w-[90px]" htmlFor={ id }>
        { label }
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className="w-full outline-none border-b border-black px-2 mx-2 bg-transparent"
        placeholder={ placeholder }
        autoComplete="off"
        id={ id }
        type={ type === 'number' ? 'text' : type } // number 타입을 text로 변경하여 직접 제어
        inputMode={ type === 'number' ? 'numeric' : undefined } // 모바일에서 숫자 키패드 표시
        pattern={ type === 'number' ? '[0-9]*' : undefined } // HTML5 유효성 검사 패턴
        value={ value }
        onChange={ handleChange }
        ref={ ref }
        min={ min }
        max={ max }
        required={ required }
      />
    </div>
  );
}
