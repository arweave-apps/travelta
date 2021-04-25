import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import HotelSearchForm from '../../components/HotelSearchForm';
import InfoWrapper from '../../components/InfoWrapper';
import Home from '../Home';
import Search from '../Search';

const Hotel = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <>
      <InfoWrapper>
        <HotelSearchForm />
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

export default Hotel;
