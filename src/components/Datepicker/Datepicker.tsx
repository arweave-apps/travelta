import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import CalendarPicker from '../CalendarPicker';
import TextInput from '../TextInput';

import { setActiveInputDate } from '../../redux/actions/aviaParams/aviaParams';
import { InitialAviaParamsStateType } from '../../redux/reducers/aviaParams';

import './Datepicker.scss';

type StateType = {
  aviaParams: InitialAviaParamsStateType;
};

const Datepicker = (): JSX.Element => {
  const dispatch = useDispatch();

  const activeInputDate = useSelector(
    (state: StateType) => state.aviaParams.activeInputDate
  );

  const handleClickInputDate = (inputType: string) => {
    dispatch(setActiveInputDate(inputType));
  };

  const departureDate = useSelector(
    (state: StateType) => state.aviaParams.departureDate
  );

  const returnDate = useSelector(
    (state: StateType) => state.aviaParams.returnDate
  );

  return (
    <div className="datepicker">
      <div
        className={classNames('datepicker__depart', {
          'datepicker__depart--active': activeInputDate === 'start',
        })}
        role="presentation"
        onClick={() => handleClickInputDate('start')}
      >
        <TextInput
          placeholder="Когда"
          id="depart"
          value={departureDate?.toLocaleDateString()}
          readonly
        />
      </div>

      <div
        className={classNames('datepicker__return', {
          'datepicker__return--active': activeInputDate === 'end',
        })}
        role="presentation"
        onClick={() => handleClickInputDate('end')}
      >
        <TextInput
          placeholder="Обратно"
          id="return"
          value={returnDate?.toLocaleDateString()}
          readonly
        />
      </div>

      <CalendarPicker />
    </div>
  );
};

export default Datepicker;
