import React from 'react';

import SimpleButton from '../SimpleButton';
import TextInput from '../TextInput';
import SwitchButton from '../SwitchButton';

import './SearchForm.scss';

const SearchForm = (): JSX.Element => {
  return (
    <div className="search-form-wrapper">
      <form className="search-form">
        <TextInput placeholder="Откуда" id="origin" />
        <TextInput placeholder="Куда" id="destination" />
        <TextInput placeholder="Отправление" id="depart" />
        <TextInput placeholder="Прибытие" id="return" />

        <SwitchButton />

        <div className="search-form__select">select</div>

        <SimpleButton submit title="Найти" />
      </form>
    </div>
  );
};

export default SearchForm;
