import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import useOutsideClick from '../../hooks/useOutsideClick';

import { InitialPageSettingsStateType } from '../../redux/reducers/pageSettings';
import { setActiveInputDate } from '../../redux/actions/aviaParams/aviaParams';
import { InitialAviaParamsStateType } from '../../redux/reducers/aviaParams';

import CalendarPicker from '../CalendarPicker';
import TextInput from '../TextInput';

import './Datepicker.scss';

type StateType = {
  aviaParams: InitialAviaParamsStateType;
  pageSettings: InitialPageSettingsStateType;
};

const Datepicker = (): JSX.Element => {
  const dispatch = useDispatch();

  const activeForm = useSelector(
    (state: StateType) => state.pageSettings.activeForm
  );

  const [isOpen, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    wrapperRef,
    () => {
      setOpen(false);
      dispatch(setActiveInputDate(null));
    },
    isOpen
  );

  const handleClickCalendarOpen = () => {
    if (isOpen) {
      return;
    }

    setOpen(true);
  };

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
    <div
      className="datepicker"
      ref={wrapperRef}
      role="presentation"
      onClick={handleClickCalendarOpen}
    >
      <div
        className={classNames('datepicker__depart', {
          'datepicker__depart--active': activeInputDate === 'departure',
        })}
        role="presentation"
        onClick={() => handleClickInputDate('departure')}
      >
        <TextInput
          placeholder="Когда"
          id="depart"
          value={departureDate?.toLocaleDateString()}
          readonly
        />
      </div>

      {activeForm === 'standart' && (
        <div
          className={classNames('datepicker__return', {
            'datepicker__return--active': activeInputDate === 'return',
          })}
          role="presentation"
          onClick={() => handleClickInputDate('return')}
        >
          <TextInput
            placeholder="Обратно"
            id="return"
            value={returnDate?.toLocaleDateString()}
            readonly
          />
        </div>
      )}

      {isOpen && <CalendarPicker />}
    </div>
  );
};

export default Datepicker;
