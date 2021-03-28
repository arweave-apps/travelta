import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import useOutsideClick from '../../hooks/useOutsideClick';

import { setActiveInputDate } from '../../redux/actions/pageSettings/pageSettings';
import { RootStateType } from '../../redux/reducers';

import CalendarPicker from '../CalendarPicker';
import TextInput from '../TextInput';

import './Datepicker.scss';

const Datepicker = (): JSX.Element => {
  const dispatch = useDispatch();

  const activeForm = useSelector(
    (state: RootStateType) => state.pageSettings.activeForm
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
    (state: RootStateType) => state.pageSettings.activeInputDate
  );

  const handleClickInputDate = (inputType: string) => {
    dispatch(setActiveInputDate(inputType));
  };

  const departureDate = useSelector(
    (state: RootStateType) => state.aviaParams.departureDate
  );

  const returnDate = useSelector(
    (state: RootStateType) => state.aviaParams.returnDate
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
