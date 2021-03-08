import React from 'react';

import './TextInput.scss';

type TextInputProps = {
  placeholder: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  placeholder,
  id,
  value,
  onChange,
}: TextInputProps): JSX.Element => {
  return (
    <label htmlFor={id} className={`label ${id}`}>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="input"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default TextInput;
