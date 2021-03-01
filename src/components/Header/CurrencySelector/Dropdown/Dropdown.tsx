import React from 'react';

import './Dropdown.scss';

type CurrencyItem = { label: string; name: string };
type DropdownProps = {
  items: Array<CurrencyItem>;
};

const Dropdown = ({ items }: DropdownProps): JSX.Element => {
  return (
    <div className="dropdown">
      <ul className="dropdown__lists">
        {items.map((item) => (
          <li className="dropdown__list" key={item.label}>
            <span>{item.label}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
