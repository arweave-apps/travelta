import React from 'react';

import './Home.scss';

const Home = (): JSX.Element => {
  return (
    <section className="info">
      <div className="container-big">
        <div className="info__inner">
          <h2 className="info__title">Исследуй новые места</h2>
          <h3 className="info__subtitle">
            Найди отличный отель, тур, машину или авиабилеты
          </h3>

          <div className="search-panel">
            <div className="direction">
              <label htmlFor="roundtrip" className="direction__label">
                <input
                  id="roundtrip"
                  type="radio"
                  checked
                  className="direction__input"
                />
                <span>Туда-обратно</span>
              </label>

              <label htmlFor="oneWay" className="direction__label">
                <input id="oneWay" type="radio" className="direction__input" />
                <span>В одну сторону</span>
              </label>

              <label htmlFor="multiCity" className="direction__label">
                <input
                  id="multiCity"
                  type="radio"
                  className="direction__input"
                />
                <span>Сложный маршрут</span>
              </label>
            </div>

            <form className="search-form">
              <label htmlFor="origin" className="search-form__label">
                <input
                  id="origin"
                  type="text"
                  placeholder="Откуда"
                  className="search-form__input search-form__input--origin"
                />
              </label>

              <label htmlFor="destination" className="search-form__label ">
                <input
                  id="destination"
                  type="text"
                  placeholder="Куда"
                  className="search-form__input search-form__input--destination"
                />
              </label>

              <label htmlFor="depart" className="search-form__label ">
                <input
                  id="depart"
                  type="date"
                  placeholder="Отправление"
                  className="search-form__input search-form__input--depart"
                />
              </label>

              <label htmlFor="return" className="search-form__label ">
                <input
                  id="return"
                  type="date"
                  placeholder="Прибытие"
                  className="search-form__input search-form__input--return"
                />
              </label>

              <div className="search-form__select">select</div>

              <button type="submit" className="search-form__button">
                Найти
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    // <section>Ваша реклама здесь =)</section>
  );
};

export default Home;
