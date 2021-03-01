import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Home from '../Home';

import './App.scss';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route exact path="/avia">
          <Users />
        </Route> */}
        {/* <Route exact path="/train">
          <About />
        </Route>
        <Route exact path="/auto">
          <About />
        </Route>
        <Route exact path="/hotels">
          <About />
        </Route>
        <Route exact path="/tour">
          <About />
        </Route> */}
      </Switch>
    </div>
  );
};

export default App;
