import React from 'react';

import classNames from 'classnames';

import './SlideButton.scss';

type SlideButtonType = {
  icon: JSX.Element;
  onClick: () => void;
  disabled: boolean;
  direction: string;
};

const SlideButton = ({
  icon,
  onClick,
  disabled,
  direction,
}: SlideButtonType): JSX.Element => {
  return (
    <button
      type="button"
      className={classNames('slide-btn', {
        'slide-btn--prev': direction === 'prev',
        'slide-btn--next': direction === 'next',
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default SlideButton;
