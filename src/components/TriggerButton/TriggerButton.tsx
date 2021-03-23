import React from 'react';

import './TriggerButton.scss';

type TriggerButtonProps = { onClick: () => void };

const TriggerButton = ({ onClick }: TriggerButtonProps): JSX.Element => {
  return <button type="button" className="trigger" onClick={onClick} />;
};

export default TriggerButton;
