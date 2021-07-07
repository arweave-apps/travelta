import React from 'react';

import './Checkbox.scss';

type CheckboxProps = {
  id: string;
  label: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent) => void;
};

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
}: CheckboxProps): JSX.Element => {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        name={id}
        id={id}
        checked={checked}
        onChange={onChange}
      />

      <label htmlFor={id} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
