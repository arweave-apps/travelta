import React from 'react';
import DirectionFilter from '../DirectionFilter';
import AviaSearchForm from '../AviaSearchForm';

import './SearchPanel.scss';

const SearchPanel = (): JSX.Element => {
  return (
    <div className="search-panel">
      <DirectionFilter />
      <AviaSearchForm />
    </div>
  );
};

export default SearchPanel;
