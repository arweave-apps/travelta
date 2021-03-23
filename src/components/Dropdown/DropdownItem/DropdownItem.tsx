import React from 'react';

import classNames from 'classnames';

import './DropdownItem.scss';

type DropdownItemProps = {
  children: React.ReactNode;
  isActive?: boolean | undefined;
  hasHover?: boolean | undefined;
  hasMargin?: boolean | undefined;
  onClickItem?: () => void;
};

const DropdownItem = ({
  children,
  isActive,
  hasHover,
  hasMargin,
  onClickItem,
}: DropdownItemProps): JSX.Element => {
  return (
    <li
      className={classNames('dropdown__item', {
        'dropdown__item--active': isActive,
        'dropdown__item--hover': hasHover,
        'mb-8': hasMargin,
      })}
      role="presentation"
      onClick={onClickItem}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
