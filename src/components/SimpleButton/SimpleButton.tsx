import React from 'react';

import classNames from 'classnames';

import './SimpleButton.scss';

type SimpleButtonProps = {
  title: string;
  submit?: boolean;
  accent?: boolean;
  second?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const SimpleButton = ({
  title,
  submit,
  accent,
  second,
  disabled,
  onClick,
}: SimpleButtonProps): JSX.Element => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={classNames('button', {
        'button--accent': accent,
        'button--second': second,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default SimpleButton;
