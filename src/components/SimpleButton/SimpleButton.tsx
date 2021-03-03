import React from 'react';

import './SimpleButton.scss';

type SimpleButtonProps = { title: string; submit: boolean };

const SimpleButton = ({ title, submit }: SimpleButtonProps): JSX.Element => {
  return (
    <button type={submit ? 'submit' : 'button'} className="button">
      {title}
    </button>
  );
};

export default SimpleButton;
