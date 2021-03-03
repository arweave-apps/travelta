import React from 'react';

import './TextInput.scss';

type TextInputProps = { placeholder: string; id: string };

const TextInput = ({ placeholder, id }: TextInputProps): JSX.Element => {
  return (
    <label htmlFor={id} className="label">
      <input id={id} type="text" placeholder={placeholder} className="input" />
    </label>
  );
};

export default TextInput;
