import React from 'react';

import Header from '../Header';
import HomeLayout from '../HomeLayout';

import './App.scss';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <HomeLayout />
    </div>
  );
};

export default App;
