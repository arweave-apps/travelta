import React from 'react';

import classNames from 'classnames';

import DownArrowIcon from '../../../assets/images/icons/down-arrow.svg';

import Icon from '../../Icon';

import './FilterItem.scss';

type FilterItemProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const FilterItem = ({
  title,
  isActive,
  onClick,
  children,
}: FilterItemProps): JSX.Element => {
  return (
    <div className="accordion__item">
      <div className="accordion__header" role="presentation" onClick={onClick}>
        <Icon
          icon={<DownArrowIcon />}
          className="down-arrow"
          isActive={isActive}
        />

        <h3 className="accordion__title">{title}</h3>
      </div>

      {isActive && (
        <div
          className={classNames('accordion__content', {
            'accordion__content--open': isActive,
          })}
        >
          <div className="accordion__content-wrapper">{children}</div>
        </div>
      )}
    </div>
  );
};

export default FilterItem;
