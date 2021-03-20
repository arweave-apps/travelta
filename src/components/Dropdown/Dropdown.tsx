import React from 'react';

import './Dropdown.scss';

type DropdownProps = { children: React.ReactNode };

const Dropdown = ({ children }: DropdownProps): JSX.Element => {
  return <div className="dropdown">{children}</div>;
};

export default Dropdown;
