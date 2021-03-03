import React from 'react';

import SimpleButton from '../SimpleButton';
import SwitchIcon from '../../assets/images/icons/arrows.svg';

import './SearchForm.scss';

const SearchForm = (): JSX.Element => {
  return (
    <div className="search-form-wrapper">
      <form className="search-form">
        <label htmlFor="origin" className="search-form__label relative">
          <input
            id="origin"
            type="text"
            placeholder="Откуда"
            className="search-form__input search-form__input--origin"
          />
          <button type="button" className="switch-btn">
            <SwitchIcon />
          </button>
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
            type="text"
            placeholder="Отправление"
            className="search-form__input search-form__input--depart"
          />
        </label>

        <label htmlFor="return" className="search-form__label ">
          <input
            id="return"
            type="text"
            placeholder="Прибытие"
            className="search-form__input search-form__input--return"
          />
        </label>

        <div className="search-form__select">select</div>

        <SimpleButton submit title="Найти" />
      </form>
    </div>
  );
};

export default SearchForm;
