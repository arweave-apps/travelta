import React from 'react';

import DeleteCrossIcon from '../../assets/images/icons/delete-cross.svg';

import './DeleteButton.scss';

type DeleteButtonProps = {
  onClick: () => void;
};

const DeleteButton = ({ onClick }: DeleteButtonProps): JSX.Element => {
  return (
    <button type="button" className="delete-button" onClick={onClick}>
      <DeleteCrossIcon />
    </button>
  );
};

export default DeleteButton;
