import React from 'react';

import SwitchIcon from '../../assets/images/icons/arrows.svg';

import './SwitchButton.scss';

type SwitchButtonProps = {
  onClick: () => void;
};

const SwitchButton = ({ onClick }: SwitchButtonProps): JSX.Element => {
  return (
    <button type="button" className="switch-btn" onClick={onClick}>
      <SwitchIcon />
    </button>
  );
};

export default SwitchButton;
