import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import useOutsideClick from '../../hooks/useOutsideClick';

import {
  setActiveInputDate,
  setActiveSegment,
} from '../../redux/actions/pageSettings/pageSettings';
import { RootStateType } from '../../redux/reducers';

import DatepickerCalendar from './DatepickerCalendar';
import TextField from '../TextField';

import './Datepicker.scss';

type DatepickerPropsType = {
  segmentId: string;
  returnDate: Date | null;
  departureDate: Date | null;
};

const Datepicker = ({
  segmentId,
  returnDate,
  departureDate,
}: DatepickerPropsType): JSX.Element => {
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

  const activeSegment = useSelector(
    (state: RootStateType) => state.pageSettings.activeSegment
  );

  const disabledDates = useSelector(
    (state: RootStateType) => state.pageSettings.disabledDates
  );

  const handleClickInputDate = (inputType: string) => {
    dispatch(setActiveInputDate(inputType));
    dispatch(setActiveSegment(segmentId));
  };

  return (
    <div
      className="datepicker"
      ref={wrapperRef}
      role="presentation"
      onClick={handleClickCalendarOpen}
    >
      <div
        className={classNames('datepicker__depart', {
          'datepicker__depart--active':
            activeInputDate === 'departure' && segmentId === activeSegment,
        })}
        role="presentation"
        onClick={() => handleClickInputDate('departure')}
      >
        <TextField
          placeholder="Когда"
          id="depart"
          value={departureDate?.toLocaleDateString()}
          readonly
        />
      </div>

      {activeForm === 'roundtrip' && (
        <div
          className={classNames('datepicker__return', {
            'datepicker__return--active':
              activeInputDate === 'return' && segmentId === activeSegment,
          })}
          role="presentation"
          onClick={() => handleClickInputDate('return')}
        >
          <TextField
            placeholder="Обратно"
            id="return"
            value={returnDate?.toLocaleDateString()}
            readonly
          />
        </div>
      )}

      {isOpen && (
        <DatepickerCalendar
          segmentId={segmentId}
          returnDate={returnDate}
          departureDate={departureDate}
          activeInputDate={activeInputDate}
          activeForm={activeForm}
          disabledDates={disabledDates}
        />
      )}
    </div>
  );
};

export default Datepicker;
