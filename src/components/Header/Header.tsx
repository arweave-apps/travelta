import React from 'react';

import LogoImg from '../../assets/images/logo.svg';

import CurrencySelector from '../CurrencySelector';
import HeaderNav from './HeaderNav';
import Logo from './Logo';
import NavToggle from '../NavToggle';

import paths from '../Routes/paths';

import './Header.scss';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="container-big">
        <div className="header__inner">
          <Logo img={<LogoImg />} />
          <HeaderNav items={paths} />
          <CurrencySelector />
          <NavToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
