import React from 'react';

import classNames from 'classnames';

import './TextField.scss';

type TextFieldProps = {
  id: string;
  name: string;
  value: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  errorText: unknown;
  onFocus?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  hasError: boolean;
  isActive?: boolean;
};

const TextField = ({
  id,
  name,
  value = '',
  onChange,
  placeholder,
  onBlur,
  readonly = false,
  onFocus,
  onKeyDown,
  errorText,
  hasError,
  isActive = false,
}: TextFieldProps): JSX.Element => {
  return (
    <label
      htmlFor={id}
      className={classNames('label', {
        'label--error': hasError,
      })}
      data-error-message={errorText}
    >
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        className={classNames('input', {
          'input--depart': id.includes('departureDate'),
          'input--return': id.includes('returnDate'),
          'input--pointer': readonly,
          'input--active': isActive,
          'input--error': hasError,
        })}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        readOnly={readonly}
      />
    </label>
  );
};

export default TextField;
