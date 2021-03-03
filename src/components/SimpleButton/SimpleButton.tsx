import React from 'react';

import './SimpleButton.scss';

type SimpleButtonProps = { label: string; submit: boolean };

const SimpleButton = ({ label, submit }: SimpleButtonProps): JSX.Element => {
  return (
    <button type={submit ? 'submit' : 'button'} className="button">
      {label}
    </button>
  );
};

export default SimpleButton;
