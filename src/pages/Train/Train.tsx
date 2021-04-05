import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import InfoWrapper from '../../components/InfoWrapper';

import TrainSearchForm from '../../components/TrainSearchForm';
import Home from '../Home';
import Search from '../Search';

const Train = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <>
      <InfoWrapper>
        <TrainSearchForm />
      </InfoWrapper>
      <Switch>
        <Route path={`${match.path}`} exact>
          <Home />
        </Route>
        <Route path={`${match.path}/:search`}>
          <Search />
        </Route>
      </Switch>
    </>
  );
};

export default Train;
