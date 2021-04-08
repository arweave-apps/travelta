import React from 'react';

import classNames from 'classnames';

import './TextField.scss';

type TextFieldProps = {
  placeholder: string;
  id: string;
  value: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
};

const TextField = ({
  placeholder,
  id,
  value = '',
  onChange,
  readonly = false,
}: TextFieldProps): JSX.Element => {
  return (
    <label htmlFor={id} className={`label ${id}`}>
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        className={classNames('input', {
          'input--pointer': readonly,
        })}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
    </label>
  );
};

export default TextField;
