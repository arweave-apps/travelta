import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import useOutsideClick from '../../hooks/useOutsideClick';

import { getActiveForm, getDisabledDates } from '../../selectors/selectors';

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
  onResetFormikDate: (segmentId: string) => void;
};

export type ActiveInputType = 'departure' | 'return' | null;
export type ActiveSegmentIdType = string | null;

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
  onResetFormikDate,
}: DatepickerPropsType): JSX.Element => {
  const activeForm = useSelector(getActiveForm);
  const disabledDates = useSelector(getDisabledDates);

  const [activeInputDate, setActiveInputDate] = useState<ActiveInputType>(null);
  const [activeSegmentId, setActiveSegmentId] = useState<ActiveSegmentIdType>(
    null
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

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
    setActiveSegmentId(segmentId);
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
          errorText={errorTextDeparture}
          hasError={hasErrorDeparture}
          isActive={
            activeInputDate === 'departure' && segmentId === activeSegmentId
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
            id={inputNameReturn}
            name={inputNameReturn}
            value={returnDate?.toLocaleDateString()}
            readonly
            onBlur={onBlurReturn}
            errorText={errorTextReturn}
            hasError={hasErrorReturn}
            isActive={
              activeInputDate === 'return' && segmentId === activeSegmentId
            }
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
          onResetFormikDate={onResetFormikDate}
        />
      )}
    </div>
  );
};

export default Datepicker;
