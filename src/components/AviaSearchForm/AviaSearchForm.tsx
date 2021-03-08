import React from 'react';

import SwitchButton from '../SwitchButton';
import TextInput from '../TextInput';
import PassangerSelect from '../PassangerSelect';
import SimpleButton from '../SimpleButton';
import CalendarPicker from '../CalendarPicker';

import useInput from '../../hooks/useInput';

import './AviaSearchForm.scss';

const AviaSearchForm = (): JSX.Element => {
  const origin = useInput('');
  const destination = useInput('');

  return (
    <>
      <form className="search-form">
        <div className="search-form__origin">
          <TextInput
            placeholder="Откуда"
            id="origin"
            value={origin.value}
            onChange={origin.onChange}
          />
          <SwitchButton />
        </div>

        <div className="search-form__destination">
          <TextInput
            placeholder="Куда"
            id="destination"
            value={destination.value}
            onChange={destination.onChange}
          />
        </div>

        <div className="search-form__depart">
          <TextInput placeholder="Когда" id="depart" readonly />
        </div>

        <div className="search-form__return">
          <TextInput placeholder="Обратно" id="return" readonly />
        </div>

        <div className="search-form__select">
          <PassangerSelect />
        </div>

        <div className="search-form__button">
          <SimpleButton submit title="Найти" />
        </div>
      </form>

      <CalendarPicker />
    </>
  );
};

export default AviaSearchForm;
