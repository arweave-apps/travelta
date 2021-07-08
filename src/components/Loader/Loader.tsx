import React from 'react';
import './Loader.scss';

const Loader = (): JSX.Element => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="loader__airplane" />
        <div className="loader__circles">
          <div className="loader__circle" />
          <div className="loader__circle" />
          <div className="loader__circle" />
          <div className="loader__circle" />
          <div className="loader__circle" />
          <div className="loader__circle" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
