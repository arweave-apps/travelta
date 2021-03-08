import React from 'react';

import './TextInput.scss';

type TextInputProps = {
  placeholder: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
};

const TextInput = ({
  placeholder,
  id,
  value,
  onChange,
  readonly,
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
        readOnly={readonly}
      />
    </label>
  );
};

export default TextInput;
