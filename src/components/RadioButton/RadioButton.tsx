import React from 'react';

import './RadioButton.scss';

type RadioButtonProps = {
  id: string;
  title: string;
  name: string;
  option: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const RadioButton = ({
  id,
  title,
  name,
  option,
  onChange,
}: RadioButtonProps): JSX.Element => {
  return (
    <div className="radio">
      <input
        id={id}
        name={name}
        type="radio"
        checked={id === option}
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
