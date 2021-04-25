import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import InfoWrapper from '../../components/InfoWrapper';

import TourSearchForm from '../../components/TourSearchForm';
import Home from '../Home';
import Search from '../Search';

const Tour = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <>
      <InfoWrapper>
        <TourSearchForm />
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

export default Tour;
