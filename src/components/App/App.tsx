import React from 'react';

import Header from '../Header';
import Routes from '../Routes';

import './App.scss';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <Routes />
    </div>
  );
};

export default App;
