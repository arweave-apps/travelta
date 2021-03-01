import React from 'react';
import { NavLink } from 'react-router-dom';

import './Logo.scss';

type LogoProps = {
  img: JSX.Element;
};

const Logo = ({ img }: LogoProps): JSX.Element => {
  return (
    <NavLink className="logo" exact to="/">
      <div className="logo__img">{img}</div>
      <span className="logo__title">Travelta</span>
    </NavLink>
  );
};

export default Logo;
