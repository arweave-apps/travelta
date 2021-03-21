import React from 'react';

import './CounterButton.scss';

type CounterButtonProps = {
  icon: JSX.Element;
  onClick: () => void;
  disabled: boolean;
};

const CounterButton = ({
  icon,
  onClick,
  disabled,
}: CounterButtonProps): JSX.Element => (
  <button
    className="counter__btn"
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {icon}
  </button>
);
export default CounterButton;
