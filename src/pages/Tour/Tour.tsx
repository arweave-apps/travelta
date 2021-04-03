import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import SearchPanel from '../../components/SearchPanel';
import SectionInfo from '../../components/SectionInfo';
import TourSearchForm from '../../components/TourSearchForm';
import Home from '../Home';
import Search from '../Search';

const Tour = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <div>
      <SectionInfo>
        <SearchPanel>
          <TourSearchForm />
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

export default Tour;
