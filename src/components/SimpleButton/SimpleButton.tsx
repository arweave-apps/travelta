import React from 'react';

import classNames from 'classnames';

import './SimpleButton.scss';

type ButtonBgType = 'accent' | 'second';

type SimpleButtonProps = {
  bg: ButtonBgType;
  link?: string;
  isSubmit?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const SimpleButton = ({
  isSubmit,
  bg,
  link,
  children,
  disabled,
  onClick,
}: SimpleButtonProps): JSX.Element => {
  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames('button', `button--${bg}`)}
    >
      {children}
    </a>
  ) : (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={classNames('button', `button--${bg}`)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SimpleButton;
