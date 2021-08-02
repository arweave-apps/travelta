import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useOutsideClick from '../../hooks/useOutsideClick';

import {
  getActiveForm,
  getActiveSegmentId,
  getDisabledDates,
} from '../../selectors/selectors';

// eslint-disable-next-line max-len
import { setActiveSegmentId } from '../../redux/actions/pageSettings/pageSettings';

import { SegmentType } from '../AviaSearchForm/helpers';

import DatepickerCalendar from './DatepickerCalendar';
import TextField from '../TextField';

import './Datepicker.scss';

type DatepickerPropsType = {
  segmentId: string;
  inputNameReturn: string;
  inputNameDeparture: string;
  returnDate: Date | null;
  departureDate: Date | null;
  segments: SegmentType[];
  errorTextReturn: string;
  errorTextDeparture: string;
  hasErrorReturn: boolean;
  hasErrorDeparture: boolean;
  onBlurDeparture: () => void;
  onBlurReturn: () => void;
  onSetFormikDepartureDate: (date: Date | null) => void;
  onSetFormikReturnDate: (date: Date | null) => void;
};

export type ActiveInputType = 'departure' | 'return' | null;

const Datepicker = ({
  segmentId,
  inputNameReturn,
  inputNameDeparture,
  returnDate,
  departureDate,
  segments,
  errorTextReturn,
  errorTextDeparture,
  hasErrorReturn,
  hasErrorDeparture,
  onBlurDeparture,
  onBlurReturn,
  onSetFormikDepartureDate,
  onSetFormikReturnDate,
}: DatepickerPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const activeForm = useSelector(getActiveForm);
  const activeSegmentId = useSelector(getActiveSegmentId);
  const disabledDates = useSelector(getDisabledDates);

  const [activeInputDate, setActiveInputDate] = useState<ActiveInputType>(null);

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
      setActiveInputDate(null);
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
    setActiveInputDate(inputType);
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
          id={inputNameDeparture}
          name={inputNameDeparture}
          value={departureDate?.toLocaleDateString()}
          readonly
          onBlur={onBlurDeparture}
          inputRef={inputDepartRef}
          errorText={errorTextDeparture}
          hasError={hasErrorDeparture}
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
            id={inputNameReturn}
            name={inputNameReturn}
            value={returnDate?.toLocaleDateString()}
            readonly
            onBlur={onBlurReturn}
            inputRef={inputReturnRef}
            errorText={errorTextReturn}
            hasError={hasErrorReturn}
          />
        </div>
      )}

      {isCalendarOpen && (
        <DatepickerCalendar
          segmentId={segmentId}
          returnDate={returnDate}
          departureDate={departureDate}
          segments={segments}
          activeInputDate={activeInputDate}
          onSetActiveInputDate={setActiveInputDate}
          activeForm={activeForm}
          disabledDates={disabledDates}
          onSetFormikDepartureDate={onSetFormikDepartureDate}
          onSetFormikReturnDate={onSetFormikReturnDate}
        />
      )}
    </div>
  );
};

export default Datepicker;
