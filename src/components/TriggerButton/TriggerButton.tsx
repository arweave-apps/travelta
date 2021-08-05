import React from 'react';

import './TriggerButton.scss';

type TriggerButtonProps = { onClick: () => void; children?: React.ReactNode };

const TriggerButton = ({
  onClick,
  children,
}: TriggerButtonProps): JSX.Element => {
  return (
    <button type="button" className="trigger" onClick={onClick}>
      {children}
    </button>
  );
};

export default TriggerButton;
