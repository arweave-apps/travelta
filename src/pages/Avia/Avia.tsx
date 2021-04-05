import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import AviaSearchForm from '../../components/AviaSearchForm';
import DirectionFilter from '../../components/DirectionFilter';
import InfoWrapper from '../../components/InfoWrapper';

import Home from '../Home';
import Search from '../Search';

import './Avia.scss';

const Avia = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <>
      <InfoWrapper>
        <DirectionFilter />
        <AviaSearchForm />
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

export default Avia;
