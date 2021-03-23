import React from 'react';

import './Dropdown.scss';

type DropdownProps = { children: React.ReactNode };

const Dropdown = ({ children }: DropdownProps): JSX.Element => {
  return (
    <div className="dropdown">
      <ul className="dropdown__list">{children}</ul>
    </div>
  );
};

export default Dropdown;
