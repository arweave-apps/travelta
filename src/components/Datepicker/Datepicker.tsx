import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikErrors, FormikTouched } from 'formik';

import useOutsideClick from '../../hooks/useOutsideClick';

import {
  getActiveForm,
  getActiveInputDate,
  getActiveSegmentId,
  getDisabledDates,
} from '../../selectors/selectors';

import {
  setActiveInputDate,
  setActiveSegmentId,
} from '../../redux/actions/pageSettings/pageSettings';
import { ActiveInputType } from '../../redux/reducers/pageSettings';

import { InitialValues } from '../AviaSearchForm/helpers';

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

  const activeForm = useSelector(getActiveForm);
  const activeInputDate = useSelector(getActiveInputDate);
  const activeSegmentId = useSelector(getActiveSegmentId);
  const disabledDates = useSelector(getDisabledDates);

  const inputDepartRef = useRef<HTMLInputElement>(null);
  const inputReturnRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (activeInputDate === 'departure' && segmentId === activeSegmentId) {
      inputDepartRef.current?.focus();
      return;
    }

    if (activeInputDate === 'return' && segmentId === activeSegmentId) {
      inputReturnRef.current?.focus();
    }
  }, [activeInputDate, activeSegmentId, segmentId]);

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

  const handleClickInputDate = (inputType: ActiveInputType) => {
    dispatch(setActiveInputDate(inputType));
    dispatch(setActiveSegmentId(segmentId));
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
          onBlur={onBlur}
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
