import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useOutsideClick from '../../hooks/useOutsideClick';

import {
  setActiveInputDate,
  setActiveSegment,
} from '../../redux/actions/pageSettings/pageSettings';
import { RootStateType } from '../../redux/reducers';
import {
  ErrorMessagesType,
  ErrorsType,
} from '../AviaSearchForm/AviaSearchForm';

import DatepickerCalendar from './DatepickerCalendar';
import TextField from '../TextField';

import './Datepicker.scss';

type DatepickerPropsType = {
  segmentId: string;
  returnDate: Date | null;
  departureDate: Date | null;
  errors: ErrorsType;
  errorMessages: ErrorMessagesType;
  onFocus: () => void;
  onBlur: () => void;
};

const Datepicker = ({
  segmentId,
  returnDate,
  departureDate,
  errors,
  errorMessages,
  onFocus,
  onBlur,
}: DatepickerPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const inputDepartRef = useRef<HTMLInputElement>(null);
  const inputReturnRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const activeForm = useSelector(
    (state: RootStateType) => state.pageSettings.activeForm
  );

  const activeInputDate = useSelector(
    (state: RootStateType) => state.pageSettings.activeInputDate
  );

  const activeSegment = useSelector(
    (state: RootStateType) => state.pageSettings.activeSegment
  );

  const disabledDates = useSelector(
    (state: RootStateType) => state.pageSettings.disabledDates
  );

  useEffect(() => {
    if (activeInputDate === 'departure' && segmentId === activeSegment) {
      inputDepartRef.current?.focus();
      return;
    }

    if (activeInputDate === 'return' && segmentId === activeSegment) {
      inputReturnRef.current?.focus();
    }
  }, [activeInputDate, activeSegment, segmentId]);

  useOutsideClick(
    wrapperRef,
    () => {
      setIsCalendarOpen(false);
      dispatch(setActiveInputDate(null));
    },
    isCalendarOpen
  );

  const handleClickCalendarOpen = () => {
    if (isCalendarOpen) {
      return;
    }

    setIsCalendarOpen(true);
  };

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
        className="datepicker__depart"
        role="presentation"
        onClick={() => handleClickInputDate('departure')}
      >
        <TextField
          placeholder="Когда"
          id="depart"
          value={departureDate?.toLocaleDateString()}
          readonly
          onFocus={onFocus}
          onBlur={onBlur}
          inputRef={inputDepartRef}
          hasError={errors[segmentId]?.includes('departureDate')}
          errorText={
            errors[segmentId]?.includes('departureDate')
              ? errorMessages.departureDate
              : ''
          }
        />
      </div>

      {activeForm === 'roundtrip' && (
        <div
          className="datepicker__return"
          role="presentation"
          onClick={() => handleClickInputDate('return')}
        >
          <TextField
            placeholder="Обратно"
            id="return"
            value={returnDate?.toLocaleDateString()}
            readonly
            onFocus={onFocus}
            onBlur={onBlur}
            inputRef={inputReturnRef}
            hasError={errors[segmentId]?.includes('returnDate')}
            errorText={
              errors[segmentId]?.includes('returnDate')
                ? errorMessages.returnDate
                : ''
            }
          />
        </div>
      )}

      {isCalendarOpen && (
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
