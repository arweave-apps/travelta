import React from 'react';

import classNames from 'classnames';

import './TextField.scss';

type TextFieldProps = {
  id: string;
  value: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  errorText: string | undefined;
  onFocus?: (e: React.FormEvent<HTMLInputElement>) => void;
  hasError: boolean;
};

const TextField = ({
  id,
  value = '',
  onChange,
  placeholder,
  onBlur,
  readonly = false,
  inputRef,
  onFocus,
  errorText,
  hasError,
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
        name={id}
        type="text"
        placeholder={placeholder}
        className={classNames('input', {
          'input--depart': id.includes('departureDate'),
          'input--return': id.includes('returnDate'),
          'input--pointer': readonly,
          'input--error': hasError,
        })}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readonly}
        ref={inputRef}
      />
    </label>
  );
};

export default TextField;
