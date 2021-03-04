import React from 'react';

import SwitchButton from '../SwitchButton';
import TextInput from '../TextInput';
import PassangerSelect from '../PassangerSelect';
import SimpleButton from '../SimpleButton';

import './AviaSearchForm.scss';

const AviaSearchForm = (): JSX.Element => {
  return (
    <form className="search-form">
      <div className="search-form__origin">
        <TextInput placeholder="Откуда" id="origin" />
        <SwitchButton />
      </div>

      <div className="search-form__destination">
        <TextInput placeholder="Куда" id="destination" />
      </div>

      <div className="search-form__depart">
        <TextInput placeholder="Когда" id="depart" />
      </div>

      <div className="search-form__return">
        <TextInput placeholder="Обратно" id="return" />
      </div>

      <div className="search-form__select">
        <PassangerSelect />
      </div>

      <div className="search-form__button">
        <SimpleButton submit title="Найти" />
      </div>
    </form>
  );
};

export default AviaSearchForm;
