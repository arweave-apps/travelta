import React from 'react';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import './HeaderNav.scss';

type PathItem = { url: string; name: string };
type HeaderNavProps = { items: Array<PathItem>; isSearchPage: boolean };

const HeaderNav = ({ items, isSearchPage }: HeaderNavProps): JSX.Element => {
  return (
    <nav className="nav">
      <ul className="nav__lists">
        {items.map((item) => (
          <li className="nav__list" key={item.url}>
            <NavLink
              exact
              className={classNames('nav__link', {
                'nav__link--search': isSearchPage,
              })}
              activeClassName="nav__link--active"
              to={item.url}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;
