import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import paths from './paths';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/avia" />
      </Route>

      {paths.map(({ url, component }) => {
        return <Route key={url} path={url} component={component} />;
      })}
    </Switch>
  );
};

export default Routes;
