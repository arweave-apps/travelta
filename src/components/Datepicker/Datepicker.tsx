import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikErrors, FormikTouched } from 'formik';

import useOutsideClick from '../../hooks/useOutsideClick';

import {
  setActiveInputDate,
  setActiveSegment,
} from '../../redux/actions/pageSettings/pageSettings';
import { RootStateType } from '../../redux/reducers';

import { InitialValues } from '../AviaSearchForm/AviaSearchForm';

import DatepickerCalendar from './DatepickerCalendar';
import TextField from '../TextField';

import './Datepicker.scss';

type DatepickerPropsType = {
  segmentId: string;
  returnDate: Date | null;
  departureDate: Date | null;
  errors: FormikErrors<InitialValues>;
  touched: FormikTouched<InitialValues>;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
  onSetFormikDepartureDate: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  onSetFormikReturnDate: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  onSetFormikTouchedDepartureDate: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  onSetFormikTouchedReturnDate: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
};

const Datepicker = ({
  segmentId,
  returnDate,
  departureDate,
  errors,
  touched,
  onBlur,
  onSetFormikDepartureDate,
  onSetFormikReturnDate,
  onSetFormikTouchedDepartureDate,
  onSetFormikTouchedReturnDate,
}: DatepickerPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const inputDepartRef = useRef<HTMLInputElement>(null);
  console.log('~ inputDepartRef', inputDepartRef);
  const inputReturnRef = useRef<HTMLInputElement>(null);
  console.log('~ inputReturnRef', inputReturnRef);
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
    console.log({ activeInputDate });

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
          id={`departureDate-${segmentId}`}
          value={departureDate?.toLocaleDateString()}
          readonly
          inputRef={inputDepartRef}
          errorText={errors[`departureDate-${segmentId}`]}
          hasError={
            !!touched[`departureDate-${segmentId}`] &&
            !!errors[`departureDate-${segmentId}`]
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
            id={`returnDate-${segmentId}`}
            value={returnDate?.toLocaleDateString()}
            readonly
            onBlur={onBlur}
            inputRef={inputReturnRef}
            errorText={errors[`returnDate-${segmentId}`]}
            hasError={
              !!touched[`returnDate-${segmentId}`] &&
              !!errors[`departureDate-${segmentId}`]
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
          onSetFormikDepartureDate={onSetFormikDepartureDate}
          onSetFormikReturnDate={onSetFormikReturnDate}
          onSetFormikTouchedDepartureDate={onSetFormikTouchedDepartureDate}
          onSetFormikTouchedReturnDate={onSetFormikTouchedReturnDate}
        />
      )}
    </div>
  );
};

export default Datepicker;
