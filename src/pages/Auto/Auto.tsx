import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import AutoSearchForm from '../../components/AutoSearchForm';
import InfoWrapper from '../../components/InfoWrapper';
import Home from '../Home';
import Search from '../Search';

const Auto = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <>
      <InfoWrapper>
        <AutoSearchForm />
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

export default Auto;
