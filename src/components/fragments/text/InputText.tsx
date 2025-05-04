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
};

export default function InputText({ id, type = 'text', label, value, onChange, placeholder = '', ref, min }: InputTextProps) {
  return (
    <div className="flex w-full">
      <label className="w-[90px]" htmlFor={ id }>{ label }</label>
      <input
        className="w-full outline-none border-b border-black px-2 mx-2 bg-transparent"
        placeholder={ placeholder }
        autoComplete="off"
        id={ id }
        type={ type }
        value={ value }
        onChange={ (e) => onChange(e.target.value) }
        ref={ ref }
        min={ min }
      />
    </div>
  );
}
