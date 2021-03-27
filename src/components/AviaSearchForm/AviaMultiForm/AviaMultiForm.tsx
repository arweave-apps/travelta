import React from 'react';

import useInput from '../../../hooks/useInput';

import TextInput from '../../TextInput';
import PassangerSelect from '../../PassangerSelect';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaMultiForm.scss';

const AviaMultiForm = (): JSX.Element => {
  const origin = useInput('');
  const destination = useInput('');

  return (
    <form className="multicity-form">
      <div className="multicity-form__segment">
        <div className="multicity-form__origin">
          <TextInput
            placeholder="Откуда"
            id="origin"
            value={origin.value}
            onChange={origin.onChange}
          />
        </div>

        <div className="multicity-form__destination">
          <TextInput
            placeholder="Куда"
            id="destination"
            value={destination.value}
            onChange={destination.onChange}
          />
        </div>

        <div className="multicity-form__datepicker">
          <Datepicker />
        </div>
      </div>

      <div className="multicity-form__segment">
        <div className="multicity-form__origin">
          <TextInput
            placeholder="Откуда"
            id="origin"
            value={origin.value}
            onChange={origin.onChange}
          />
        </div>

        <div className="multicity-form__destination">
          <TextInput
            placeholder="Куда"
            id="destination"
            value={destination.value}
            onChange={destination.onChange}
          />
        </div>

        <div className="multicity-form__datepicker">
          <Datepicker />
        </div>
      </div>

      <div className="multicity-form__action">
        <div className="multicity-form__select">
          <PassangerSelect />
        </div>

        <div className="multicity-form__add-btn">
          <SimpleButton second title="+ добавить перелёт" />
        </div>

        <div className="multicity-form__search-btn">
          <SimpleButton submit accent title="Найти" />
        </div>
      </div>
    </form>
  );
};

export default AviaMultiForm;
