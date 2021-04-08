import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useInput from '../../../hooks/useInput';
import { RootStateType } from '../../../redux/reducers';

import SwitchButton from '../../SwitchButton';
import TextInput from '../../TextInput';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaOnewayForm.scss';

const AviaOnewayForm = (): JSX.Element => {
  const history = useHistory();
  const origin = useInput('');
  const destination = useInput('');

  const segment = useSelector(
    (state: RootStateType) => state.aviaParams.segments[0]
  );

  const { id, returnDate, departureDate } = segment;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (history.location.pathname.includes('search')) {
      return;
    }
    history.push(`${history.location.pathname}/search`);
  };

  return (
    <form className="oneway-form" onSubmit={handleFormSubmit}>
      <div className="oneway-form__origin">
        <TextInput
          placeholder="Откуда"
          id={`origin-${id}`}
          value={origin.value}
          onChange={origin.onChange}
        />
        <SwitchButton />
      </div>

      <div className="oneway-form__destination">
        <TextInput
          placeholder="Куда"
          id={`destination=${id}`}
          value={destination.value}
          onChange={destination.onChange}
        />
      </div>

      <div className="oneway-form__datepicker">
        <Datepicker
          segmentId={id}
          returnDate={returnDate}
          departureDate={departureDate}
        />
      </div>

      <div className="oneway-form__select">
        <PassangerSelector />
      </div>

      <div className="oneway-form__search-btn">
        <SimpleButton submit accent title="Найти" />
      </div>
    </form>
  );
};

export default AviaOnewayForm;
