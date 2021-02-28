import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__lists">
          <li className="nav__list">
            <NavLink
              exact
              className="nav__link"
              activeClassName="nav__link--active"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav__list">
            <NavLink
              exact
              className="nav__link"
              activeClassName="nav__link--active"
              to="/users"
            >
              Users
            </NavLink>
          </li>
          <li className="nav__list">
            <NavLink
              exact
              className="nav__link"
              activeClassName="nav__link--active"
              to="/about"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
