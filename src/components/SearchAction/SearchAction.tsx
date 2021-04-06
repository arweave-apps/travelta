import React from 'react';

import DownArrowicon from '../../assets/images/icons/down-arrow.svg';

import './SearchAction.scss';

const SearchAction = (): JSX.Element => {
  return (
    <div className="action">
      <div className="action__total-tickets">Результатов 10</div>
      <div className="action__sort">
        <span className="action__label">Сортировать по</span>
        <span className="action__selector">сначала дешевые</span>
        <DownArrowicon className="action__arrow" />
      </div>
    </div>
  );
};

export default SearchAction;
