import React from 'react';

import classNames from 'classnames';

import './Dropdown.scss';

type CurrencyItem = { label: string; name: string };

type DropdownProps = {
  items: Array<CurrencyItem>;
  onClick: (currency: string) => void;
  currentCurrency: string;
};

const Dropdown = ({
  items,
  onClick,
  currentCurrency,
}: DropdownProps): JSX.Element => {
  return (
    <div className="dropdown">
      <ul className="dropdown__lists">
        {items.map(({ label, name }) => (
          <li
            className={classNames('dropdown__list', {
              'dropdown__list--active': currentCurrency === label,
            })}
            key={label}
            role="menuitem"
            onClick={() => onClick(label)}
            onKeyDown={() => onClick(label)}
          >
            <span>{label}</span>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
