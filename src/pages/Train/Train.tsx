import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import SearchPanel from '../../components/SearchPanel';
import SectionInfo from '../../components/SectionInfo';
import TrainSearchForm from '../../components/TrainSearchForm';
import Home from '../Home';
import Search from '../Search';

const Train = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <div>
      <SectionInfo>
        <SearchPanel>
          <TrainSearchForm />
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

export default Train;
