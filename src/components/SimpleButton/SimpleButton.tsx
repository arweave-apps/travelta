import React from 'react';

import classNames from 'classnames';

import './SimpleButton.scss';

type SimpleButtonProps = {
  title: string;
  submit?: boolean;
  accent?: boolean;
  second?: boolean;
};

const SimpleButton = ({
  title,
  submit,
  accent,
  second,
}: SimpleButtonProps): JSX.Element => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={classNames('button', {
        'button--accent': accent,
        'button--second': second,
      })}
    >
      {title}
    </button>
  );
};

export default SimpleButton;
