import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAirlines } from '../../redux/actions/tickets/tickets';

import Header from '../Header';
import Routes from '../Routes';

import './App.scss';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAirlines());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Routes />
    </div>
  );
};

export default App;
