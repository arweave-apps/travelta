import React from 'react';

import LogoImg from '../../assets/images/logo.svg';
import CurrencySelector from './CurrencySelector';
import HeaderNav from './HeaderNav';

import './Header.scss';
import Logo from './Logo';
import NavToggle from '../NavToggle';

const paths = [
  { url: '/avia', name: 'Авиа билеты' },
  { url: '/train', name: 'Ж/д билеты' },
  { url: '/auto', name: 'Прокат авто' },
  { url: '/hotels', name: 'Отели' },
  { url: '/tour', name: 'Туры' },
];

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
