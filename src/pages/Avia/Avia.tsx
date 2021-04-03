import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import AviaSearchForm from '../../components/AviaSearchForm';
import DirectionFilter from '../../components/DirectionFilter';
import SearchPanel from '../../components/SearchPanel';
import SectionInfo from '../../components/SectionInfo';
import Home from '../Home';
import Search from '../Search';

import './Avia.scss';

const Avia = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <div>
      <SectionInfo>
        <SearchPanel>
          <DirectionFilter />
          <AviaSearchForm />
        </SearchPanel>
      </SectionInfo>
      <Switch>
        <Route path={`${match.path}`} exact>
          <Home />
        </Route>
        <Route path={`${match.path}/:search`}>
          <Search />
        </Route>
      </Switch>
    </div>
  );
};

export default Avia;
