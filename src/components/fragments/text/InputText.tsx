'use client';

import { useState } from 'react';

type InputTextProps = {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function InputText({ id, type = 'text', label, value, onChange, placeholder = '' }: InputTextProps) {
  const [ inputValue, setInputValue ] = useState(value);

  return (
    <div className="flex w-full">
      <label className="w-[90px]" htmlFor={ id }>{ label }</label>
      <input
        className="w-full outline-none border-b border-black px-2 mx-2"
        placeholder={ placeholder }
        autoComplete="off"
        id={ id }
        type={ type }
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) }
        onBlur={ () => onChange(inputValue) }
      />
    </div>
  );
}
