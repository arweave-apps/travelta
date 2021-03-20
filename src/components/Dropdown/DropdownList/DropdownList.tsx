import React from 'react';

import classNames from 'classnames';

type CurrencyItem = { label: string; name: string };

type DropdownListProps = {
  items: Array<CurrencyItem>;
  onClick: (currency: string) => void;
  currentValue: string;
};

const DropdownList = ({
  items,
  onClick,
  currentValue,
}: DropdownListProps): JSX.Element => {
  return (
    <ul className="dropdown__list">
      {items.map(({ label, name }) => (
        <li
          className={classNames('dropdown__item', {
            'dropdown__item--active': currentValue === label,
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
  );
};

export default DropdownList;
