import React from 'react';

import useInput from '../../hooks/useInput';

import SwitchButton from '../SwitchButton';
import TextInput from '../TextInput';
import PassangerSelect from '../PassangerSelect';
import SimpleButton from '../SimpleButton';
import Datepicker from '../Datepicker';

import './AviaSearchForm.scss';

const AviaSearchForm = (): JSX.Element => {
  const origin = useInput('');
  const destination = useInput('');

  return (
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

      <Datepicker />

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
