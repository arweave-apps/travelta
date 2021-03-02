import React from 'react';
import DirectionFilter from '../DirectionFilter';
import SearchForm from '../SearchForm';

import './SearchPanel.scss';

const SearchPanel = (): JSX.Element => {
  return (
    <div className="search-panel">
      <DirectionFilter />
      <SearchForm />
    </div>
  );
};

export default SearchPanel;
