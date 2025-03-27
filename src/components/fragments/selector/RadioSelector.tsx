'use client';

import { useState } from 'react';

type RadioSelectorProps = {
  id: string;
  label: string;
  options?: { label: string; value: string }[];
  onChange: (value: string) => void;
};

export default function RadioSelector({ id, label, options, onChange }: RadioSelectorProps) {
  const [ selectedValue, setSelectedValue ] = useState('');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div id={ id } className="flex w-full">
      <label className="w-[90px]">{ label }</label>
      <div className="flex flex-row w-full justify-evenly">
        {
          options?.map((option) => (
            <div key={ option.value }
              className="w-1/4 text-center"
              style={ {
                borderBottom: selectedValue === option.value ? '1px solid gray' : 'none',
                fontWeight: selectedValue === option.value ? 'bold' : 'normal'
              } }
            >
              <input type="radio" name="radio" className="hidden" id={ option.value } />
              <label
                htmlFor={ option.value }
                className="w-full cursor-pointer"
                onClick={ handleChange.bind(null, option.value) }
              >
                { option.label }
              </label>
            </div>
          ))
        }
      </div>
    </div>
  );
}
