import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import HotelSearchForm from '../../components/HotelSearchForm';
import SearchPanel from '../../components/SearchPanel';
import SectionInfo from '../../components/SectionInfo';
import Home from '../Home';
import Search from '../Search';

const Hotel = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <div>
      <SectionInfo>
        <SearchPanel>
          <HotelSearchForm />
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

export default Hotel;
