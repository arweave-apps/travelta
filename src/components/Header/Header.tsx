import React from 'react';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames';

import LogoImg from '../../assets/images/logo.svg';

import CurrencySelector from '../CurrencySelector';
import HeaderNav from './HeaderNav';
import Logo from './Logo';
import NavToggle from '../NavToggle';
import Layout from '../Layout';

import paths from '../Routes/paths';

import './Header.scss';

const Header = (): JSX.Element => {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes('search');

  return (
    <Layout
      className={classNames('header', {
        'header--search': isSearchPage,
      })}
      containerSize="big"
      tag="header"
    >
      <div className="header__inner">
        <Logo img={<LogoImg />} isSearchPage={isSearchPage} />
        <HeaderNav items={paths} isSearchPage={isSearchPage} />
        <CurrencySelector isSearchPage={isSearchPage} />
        <NavToggle />
      </div>
    </Layout>
  );
};

export default Header;
