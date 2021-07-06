import React from 'react';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import './Logo.scss';

type LogoProps = {
  img: JSX.Element;
  isSearchPage: boolean;
};

const Logo = ({ img, isSearchPage }: LogoProps): JSX.Element => {
  return (
    <NavLink className="logo" exact to="/">
      <div className="logo__img">{img}</div>
      <h1
        className={classNames('logo__title', {
          'logo__title--search': isSearchPage,
        })}
      >
        Travelta
      </h1>
    </NavLink>
  );
};

export default Logo;
