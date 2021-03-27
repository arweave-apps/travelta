import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SectionInfo from '../SectionInfo';
import SearchPanel from '../SearchPanel';
import DirectionFilter from '../DirectionFilter';
import AviaSearchForm from '../AviaSearchForm';
import TrainSearchForm from '../TrainSearchForm';
import AutoSearchForm from '../AutoSearchForm';
import HotelSearchForm from '../HotelSearchForm';
import TourSearchForm from '../TourSearchForm';
import Home from '../Home';

type GetRouteProps = {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
};

const GetRoute = ({ path, exact, children }: GetRouteProps): JSX.Element => {
  return (
    <Route path={path} exact={exact}>
      <SectionInfo>
        <SearchPanel>{children}</SearchPanel>
      </SectionInfo>
    </Route>
  );
};

const routes = (
  <Switch>
    <GetRoute path="/" exact>
      <DirectionFilter />
      <AviaSearchForm />
    </GetRoute>
    <GetRoute path="/avia">
      <DirectionFilter />
      <AviaSearchForm />
    </GetRoute>
    <GetRoute path="/train">
      <TrainSearchForm />
    </GetRoute>
    <GetRoute path="/auto">
      <AutoSearchForm />
    </GetRoute>
    <GetRoute path="/hotels">
      <HotelSearchForm />
    </GetRoute>
    <GetRoute path="/tour">
      <TourSearchForm />
    </GetRoute>
  </Switch>
);

const HomeLayout = (): JSX.Element => {
  return (
    <>
      {routes}
      <Home />
    </>
  );
};

export default HomeLayout;
