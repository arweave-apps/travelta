/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import classNames from 'classnames';

import DubaiImg from '../../assets/images/destinations/dubai.jpg';
import GreeceImg from '../../assets/images/destinations/greece.jpg';
import ItalyImg from '../../assets/images/destinations/italy.jpg';
import JapanImg from '../../assets/images/destinations/japan.jpg';
import MaldivesImg from '../../assets/images/destinations/maldives.jpg';
import ThailandImg from '../../assets/images/destinations/thailand.jpg';

import AwardIcon from '../../assets/images/icons/award.svg';
import WorldwideIcon from '../../assets/images/icons/location.svg';
import PriceIcon from '../../assets/images/icons/price-tag.svg';

import Air1 from '../../assets/images/offers/air-1.jpg';
import Air2 from '../../assets/images/offers/air-2.jpg';
import Air3 from '../../assets/images/offers/air-3.jpg';

import PlaceParisImg from '../../assets/images/best-flights/paris.jpg';
import PlaceLondonImg from '../../assets/images/best-flights/london.jpg';
import PlaceAmsterdamImg from '../../assets/images/best-flights/amsterdam.jpg';
import PlaceRomeImg from '../../assets/images/best-flights/rome.jpg';
import PlaceBerlinImg from '../../assets/images/best-flights/berlin.jpg';
import PlaceTokioImg from '../../assets/images/best-flights/tokio.jpg';
import PlaceDubaiImg from '../../assets/images/best-flights/dubai2.jpg';
import PlaceGoaImg from '../../assets/images/best-flights/goa.jpg';
// eslint-disable-next-line max-len
import PlaceSaintPetersburgImg from '../../assets/images/best-flights/saint-petersburg.jpg';
import PlaceTorontoImg from '../../assets/images/best-flights/toronto.jpg';
import PlaceNewYorkImg from '../../assets/images/best-flights/new-york.jpg';
import PlaceGizaImg from '../../assets/images/best-flights/giza.jpg';

import ArticleImg1 from '../../assets/images/articles/article-1.jpg';
import ArticleImg2 from '../../assets/images/articles/article-2.jpg';
import ArticleImg3 from '../../assets/images/articles/article-3.jpg';

import Icon from '../../components/Icon';
import Layout from '../../components/Layout';

import './Home.scss';

const bestFlightCountriesBadges = [
  'Africa',
  'United Arab Emirates',
  'Canada',
  'Russian Fedaration',
  'United Kingdom',
  'Unated States',
  'Germany',
  'Europe',
  'Asia',
  'India',
  'North America',
  'Oceania',
  'Niderlands',
];

const bestFlightsPlaces = [
  {
    id: 'place-1',
    image: PlaceParisImg,
    location: {
      country: 'France',
      city: 'Paris',
    },
    route: {
      from: 'SVX',
      to: 'LFPG',
    },
    startprice: '25 654 ₽',
  },
  {
    id: 'place-2',
    image: PlaceLondonImg,
    location: {
      country: 'UK',
      city: 'London',
    },
    route: {
      from: 'SVX',
      to: 'EOLL',
    },
    startprice: '20 675 ₽',
  },
  {
    id: 'place-3',
    image: PlaceAmsterdamImg,
    location: {
      country: 'Niderlands',
      city: 'Amsterdam',
    },
    route: {
      from: 'SVX',
      to: 'EHAA',
    },
    startprice: '27 021 ₽',
  },
  {
    id: 'place-4',
    image: PlaceRomeImg,
    location: {
      country: 'Germany',
      city: 'Berlin',
    },
    route: {
      from: 'SVX',
      to: 'BER',
    },
    startprice: '15 032 ₽',
  },
  {
    id: 'place-5',
    image: PlaceBerlinImg,
    location: {
      country: 'Japan',
      city: 'Tokio',
    },
    route: {
      from: 'SVX',
      to: 'JST',
    },
    startprice: '50 467 ₽',
  },
  {
    id: 'place-6',
    image: PlaceTokioImg,
    location: {
      country: 'France',
      city: 'Paris',
    },
    route: {
      from: 'SVX',
      to: 'LFPG',
    },
    startprice: '25 654 ₽',
  },
  {
    id: 'place-7',
    image: PlaceDubaiImg,
    location: {
      country: 'UAE',
      city: 'Dubai',
    },
    route: {
      from: 'SVX',
      to: 'DXB',
    },
    startprice: '79 467 ₽',
  },
  {
    id: 'place-8',
    image: PlaceGoaImg,
    location: {
      country: 'India',
      city: 'Goa',
    },
    route: {
      from: 'SVX',
      to: 'GOA',
    },
    startprice: '98 685 ₽',
  },
  {
    id: 'place-9',
    image: PlaceSaintPetersburgImg,
    location: {
      country: 'Russia',
      city: 'Saint-Petersburg',
    },
    route: {
      from: 'SVX',
      to: 'LED',
    },
    startprice: '7 918 ₽',
  },
  {
    id: 'place-10',
    image: PlaceTorontoImg,
    location: {
      country: 'Canada',
      city: 'Toronto',
    },
    route: {
      from: 'SVX',
      to: 'YZZ',
    },
    startprice: '122 984 ₽',
  },
  {
    id: 'place-11',
    image: PlaceNewYorkImg,
    location: {
      country: 'USA',
      city: 'New York',
    },
    route: {
      from: 'SVX',
      to: 'EWR',
    },
    startprice: '147 398 ₽',
  },
  {
    id: 'place-12',
    image: PlaceGizaImg,
    location: {
      country: 'Egypt',
      city: 'Giza',
    },
    route: {
      from: 'SVX',
      to: 'SPX',
    },
    startprice: '78 557 ₽',
  },
];

const articles = [
  {
    id: 'article-1',
    image: ArticleImg1,
    title: 'The best waves in the world for surf lovers',
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus tristique amet sed vitae. Egestas luctus accumsan, suscipit blandit tortor nec ullamcorper. Morbi quis sed blandit tristique. Lectus in amet in nam eu.',
    link: '',
    date: new Date(),
  },
  {
    id: 'article-2',
    image: ArticleImg2,
    title: 'Amazing Places for Your Photo Collections',
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus tristique amet sed vitae. Egestas luctus accumsan, suscipit blandit tortor nec ullamcorper. Morbi quis sed blandit tristique. Lectus in amet in nam eu.2',
    link: '',
    date: new Date(),
  },
  {
    id: 'article-3',
    image: ArticleImg3,
    title: 'List of countries that are open for travel',
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus tristique amet sed vitae. Egestas luctus accumsan, suscipit blandit tortor nec ullamcorper. Morbi quis sed blandit tristique. Lectus in amet in nam eu.3',
    link: '',
    date: new Date(),
  },
];

const Home = (): JSX.Element => {
  return (
    <>
      <Layout containerSize="small" tag="section" className="site-info">
        <div className="section-inner">
          <div className="site-info__items">
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
        </div>
      </Layout>

      <Layout
        containerSize="small"
        tag="section"
        className="destinations bg-home"
      >
        <div className="section-inner">
          <h2 className="section-title">Top Destinations</h2>

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

      <Layout containerSize="small" tag="section" className="offers">
        <div className="section-inner">
          <h2 className="section-title">Offers</h2>

          <div className="offers__items">
            <div className="offers__item">
              <img src={Air1} alt="offers-air" className="offers__image" />

              <div className="offers__content">
                <span className="offers__title">
                  Flight from Yekaterinburg to Sochi
                </span>

                <a href="" className="offers__link">
                  See all
                </a>
              </div>
            </div>

            <div className="offers__item">
              <img src={Air2} alt="offers-air" className="offers__image" />

              <div className="offers__content">
                <span className="offers__title">
                  Flight from Yekaterinburg to Dubai
                </span>

                <a href="" className="offers__link">
                  See all
                </a>
              </div>
            </div>

            <div className="offers__item">
              <img src={Air3} alt="offers-air" className="offers__image" />

              <div className="offers__content">
                <span className="offers__title">
                  Flight from Yekaterinburg to Moscow
                </span>

                <a href="" className="offers__link">
                  See all
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <Layout
        containerSize="small"
        tag="section"
        className="best-flights bg-home"
      >
        <div className="section-inner">
          <h2 className="section-title">
            Best Flight Deals of the Day{' '}
            <span className="best-flights__selector">Yekaterinburg</span>
          </h2>

          <div className="best-flights__badges">
            {bestFlightCountriesBadges.map((country) => {
              return (
                <button
                  key={country}
                  type="button"
                  className="best-flights__badge"
                >
                  {country}
                </button>
              );
            })}
          </div>

          <div className="best-flights__items">
            {bestFlightsPlaces.map(
              ({ id, image, location, route, startprice }) => {
                return (
                  <div className="best-flights__item" key={id}>
                    <img
                      src={image}
                      alt="country"
                      className="best-flights__image"
                    />

                    <div className="best-flights__content">
                      <h3 className="best-flights__title">
                        {location.country}, {location.city}
                      </h3>

                      <div className="best-flights__action">
                        <span className="best-flights__route">
                          {route.from} - {route.to}
                        </span>

                        <a href="" className="best-flights__price-link">
                          от {startprice}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Layout>

      <Layout containerSize="small" tag="section" className="members">
        <div className="section-inner members__content">
          <div className="members__right">
            <h2 className="members__title">Members Exclusive</h2>
            <p className="members__info">
              Sign up to keep up to date with our latest updates and get the
              best deals for your travels up to stay{' '}
            </p>
          </div>

          <form action="" className="members__form">
            <label htmlFor="members-form" className="members__label">
              <input
                id="members-form"
                type="email"
                className="members__input"
                placeholder="Enter Email"
              />
            </label>

            <button type="submit" className="members__button">
              Subscribe
            </button>
          </form>
        </div>
      </Layout>

      <Layout containerSize="small" tag="section" className="articles bg-home">
        <div className="section-inner">
          <h2 className="section-title">Tips & Articles</h2>

          <div className="articles__items">
            {articles.map(({ id, image, title, preview, link, date }, i) => {
              return (
                <div
                  key={id}
                  className={classNames(
                    'articles__item',
                    `articles__item--${id}`,
                    { 'articles__item--horizontal': i !== 0 }
                  )}
                >
                  <img src={image} alt="article" className="articles__image" />

                  <div className="articles__content">
                    <h3 className="articles__title">{title}</h3>
                    <p className="articles__text">{preview}</p>

                    <div className="articles__action">
                      <time
                        dateTime={date.toISOString()}
                        className="articles__date"
                      >
                        {date.toLocaleDateString()}
                      </time>

                      <a href={link} className="articles__link">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>

      <Layout containerSize="small" tag="footer" className="footer">
        <div className="footer__items">
          <span className="footer__author">
            Created by{' '}
            <a
              className="footer__link"
              href="https://github.com/websega/travelta"
              target="_blank"
              rel="noreferrer"
            >
              Sergey Vakhramov
            </a>
          </span>

          <span className="footer__declaimer">
            This is a tutorial project. It can contain errors. No guarantee of a
            deal.{' '}
            <b className="footer__warning">
              You should not buy tickets using this site.
            </b>{' '}
            If you need to buy a ticket, use other search sites that work on an
            ongoing basis
          </span>
        </div>
      </Layout>
    </>
  );
};

export default Home;
