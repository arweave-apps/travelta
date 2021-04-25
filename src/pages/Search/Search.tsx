import React from 'react';

import Prediction from '../../components/Prediction';
import SearchAction from '../../components/SearchAction';
import Ticket from '../../components/Ticket';

import './Search.scss';

const Search = (): JSX.Element => {
  return (
    <section className="avia-search">
      <div className="container-small">
        <div className="avia-search__inner">
          <div className="filters">filters</div>
          <Prediction />
          <SearchAction />

          <div className="tickets">
            <Ticket />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
