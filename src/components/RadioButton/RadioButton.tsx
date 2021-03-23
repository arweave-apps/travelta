import React from 'react';

import './RadioButton.scss';

type RadioButtonProps = {
  id: string;
  title: string;
  name: string;
  checked: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const RadioButton = ({
  id,
  title,
  name,
  checked,
  onChange,
}: RadioButtonProps): JSX.Element => {
  return (
    <div className="radio">
      <input
        id={id}
        name={name}
        type="radio"
        checked={checked}
        className="radio__input"
        onChange={onChange}
      />
      <label htmlFor={id} className="radio__label">
        {title}
      </label>
    </div>
  );
};

export default RadioButton;
