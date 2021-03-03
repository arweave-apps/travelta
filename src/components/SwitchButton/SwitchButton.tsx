import React from 'react';

import SwitchIcon from '../../assets/images/icons/arrows.svg';

import './SwitchButton.scss';

const SwitchButton = (): JSX.Element => {
  return (
    <button type="button" className="switch-btn">
      <SwitchIcon />
    </button>
  );
};

export default SwitchButton;
