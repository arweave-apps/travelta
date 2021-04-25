import classNames from 'classnames';
import React from 'react';
import './TextField.scss';

type TextFieldProps = {
  placeholder: string;
  id: string;
  value: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  hasError?: boolean;
  errorText: string;
  onFocus: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

const TextField = ({
  placeholder,
  id,
  value = '',
  onChange,
  readonly = false,
  inputRef,
  hasError,
  errorText,
  onFocus,
  onBlur,
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
        className={classNames('input', `input--${id}`, {
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
