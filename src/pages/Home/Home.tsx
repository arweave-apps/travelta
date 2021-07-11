import React from 'react';

import PriceIcon from '../../assets/images/icons/price-tag.svg';
import WorldwideIcon from '../../assets/images/icons/location.svg';
import AwardIcon from '../../assets/images/icons/award.svg';

import Icon from '../../components/Icon';

import Layout from '../../components/Layout';

import './Home.scss';

const Home = (): JSX.Element => {
  return (
    <Layout containerSize="big" tag="section" className="site-info">
      <div className="site-info__inner">
        <div className="site-info__item">
          <Icon icon={<PriceIcon />} className="site-info__icon" />

          <h3 className="site-info__title">Competitive Pricing</h3>

          <p className="site-info__content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing
            morbi laoreet amet,posuere et, eget vivamus ac.
          </p>
        </div>

        <div className="site-info__item">
          <Icon icon={<AwardIcon />} className="site-info__icon" />

          <h3 className="site-info__title">Award Winning Service</h3>

          <p className="site-info__content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing
            morbi laoreet amet,posuere et, eget vivamus ac.
          </p>
        </div>

        <div className="site-info__item">
          <Icon icon={<WorldwideIcon />} className="site-info__icon" />

          <h3 className="site-info__title">Worldwide Coverag</h3>

          <p className="site-info__content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing
            morbi laoreet amet,posuere et, eget vivamus ac.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
