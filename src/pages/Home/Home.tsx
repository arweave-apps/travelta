import React from 'react';

import DubaiImg from '../../assets/images/destinations/dubai.jpg';
import GreeceImg from '../../assets/images/destinations/greece.jpg';
import ItalyImg from '../../assets/images/destinations/italy.jpg';
import JapanImg from '../../assets/images/destinations/japan.jpg';
import MaldivesImg from '../../assets/images/destinations/maldives.jpg';
import ThailandImg from '../../assets/images/destinations/thailand.jpg';
import AwardIcon from '../../assets/images/icons/award.svg';
import WorldwideIcon from '../../assets/images/icons/location.svg';
import PriceIcon from '../../assets/images/icons/price-tag.svg';

import Icon from '../../components/Icon';
import Layout from '../../components/Layout';

import './Home.scss';

const Home = (): JSX.Element => {
  return (
    <>
      <Layout containerSize="big" tag="section" className="site-info">
        <div className="site-info__inner">
          <div className="site-info__item">
            <Icon icon={<PriceIcon />} className="site-info__icon" />

            <h3 className="site-info__title">Competitive Pricing</h3>

            <p className="site-info__content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Adipiscing morbi laoreet amet,posuere et, eget vivamus ac.
            </p>
          </div>

          <div className="site-info__item">
            <Icon icon={<AwardIcon />} className="site-info__icon" />

            <h3 className="site-info__title">Award Winning Service</h3>

            <p className="site-info__content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Adipiscing morbi laoreet amet,posuere et, eget vivamus ac.
            </p>
          </div>

          <div className="site-info__item">
            <Icon icon={<WorldwideIcon />} className="site-info__icon" />

            <h3 className="site-info__title">Worldwide Coverag</h3>

            <p className="site-info__content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Adipiscing morbi laoreet amet,posuere et, eget vivamus ac.
            </p>
          </div>
        </div>
      </Layout>

      <Layout containerSize="big" tag="section" className="destinations">
        <div className="destinations__inner">
          <h2 className="destinations__title">Top Destinations</h2>

          <div className="destinations__items">
            <div className="destinations__item destinations__item--a">
              <img
                src={GreeceImg}
                alt="destination"
                className="destinations__image"
              />

              <div className="destinations__details">
                <span className="destinations__label">Greece</span>
                <span className="destinations__info">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </span>
              </div>
            </div>

            <div className="destinations__item destinations__item--b">
              <img
                src={ItalyImg}
                alt="destination"
                className="destinations__image"
              />

              <div className="destinations__details">
                <span className="destinations__label">Italy</span>
                <span className="destinations__info">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </span>
              </div>
            </div>

            <div className="destinations__item destinations__item--c">
              <img
                src={JapanImg}
                alt="destination"
                className="destinations__image"
              />

              <div className="destinations__details">
                <span className="destinations__label">Japan</span>
                <span className="destinations__info">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </span>
              </div>
            </div>

            <div className="destinations__item destinations__item--d">
              <img
                src={DubaiImg}
                alt="destination"
                className="destinations__image"
              />

              <div className="destinations__details">
                <span className="destinations__label">Dubai</span>
                <span className="destinations__info">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </span>
              </div>
            </div>

            <div className="destinations__item destinations__item--e">
              <img
                src={MaldivesImg}
                alt="destination"
                className="destinations__image"
              />

              <div className="destinations__details">
                <span className="destinations__label">Maldives</span>
                <span className="destinations__info">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </span>
              </div>
            </div>

            <div className="destinations__item destinations__item--f">
              <img
                src={ThailandImg}
                alt="destination"
                className="destinations__image"
              />

              <div className="destinations__details">
                <span className="destinations__label">Thailand</span>
                <span className="destinations__info">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
