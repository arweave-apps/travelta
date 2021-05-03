import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setDepartureDate,
  setReturnDate,
} from '../../../redux/actions/aviaParams/aviaParams';
import {
  setActiveInputDate,
  setAfterDisabledDates,
  setBeforeDisabledDates,
} from '../../../redux/actions/pageSettings/pageSettings';
import {
  DisabledDatesType,
  FormsType,
} from '../../../redux/reducers/pageSettings';

import { getSegments } from '../../../selectors/selectros';

import NextIcon from '../../../assets/images/icons/right-arrow.svg';
import PrevIcon from '../../../assets/images/icons/left-arrow.svg';
import DatepickerCalendarMonth from './DatepickerCalendarMonth';
import SlideButton from '../../SlideButton';

import { getMonthDates } from './helpers';

import './DatepickerCalendar.scss';

type DatepickerCalendarPropsType = {
  segmentId: string;
  returnDate: Date | null;
  departureDate: Date | null;
  activeInputDate: string | null;
  activeForm: FormsType;
  disabledDates: DisabledDatesType;
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

const DatepickerCalendar = ({
  segmentId,
  departureDate,
  returnDate,
  activeInputDate,
  activeForm,
  disabledDates,
  onSetFormikDepartureDate,
  onSetFormikReturnDate,
  onSetFormikTouchedDepartureDate,
  onSetFormikTouchedReturnDate,
}: DatepickerCalendarPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const segments = useSelector(getSegments);

  const [prevMonthData, setPrevMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [nextMonthData, setNextMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [prevMonthDate, setPrevMonthDate] = useState<Date | null>(null);
  const [nextMonthDate, setNextMonthDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    setPrevMonthDate(new Date(year, month));
    setNextMonthDate(new Date(year, month + 1));

    if (segments.length > 1) {
      const prevSegment = segments[segments.length - 2];
      const prevDepartureDate = prevSegment.departureDate;
      dispatch(setBeforeDisabledDates(prevDepartureDate));
    } else {
      dispatch(setBeforeDisabledDates(new Date(year, month, day)));
    }

    dispatch(setAfterDisabledDates(new Date(year + 1, month + 1, day)));
  }, [activeForm, dispatch, segments]);

  useEffect(() => {
    if (nextMonthDate && prevMonthDate) {
      const prevMonth = getMonthDates(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth()
      );

      const nextMonth = getMonthDates(
        nextMonthDate.getFullYear(),
        nextMonthDate.getMonth()
      );

      setPrevMonthData(prevMonth);
      setNextMonthData(nextMonth);
    }
  }, [prevMonthDate, nextMonthDate]);

  const handleClickSlideBtn = (value: number) => {
    if (nextMonthDate && prevMonthDate) {
      const prevDate = new Date(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth() + value
      );

      const nextDate = new Date(
        nextMonthDate.getFullYear(),
        nextMonthDate.getMonth() + value
      );

      setPrevMonthDate(prevDate);
      setNextMonthDate(nextDate);
    }
  };

  const handleClickDay = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, date: Date) => {
      e.stopPropagation(); // otherwise click outside will work

      if (activeForm !== 'roundtrip' && activeInputDate === 'departure') {
        dispatch(setDepartureDate(date, segmentId));
        onSetFormikDepartureDate(
          `departureDate-${segmentId}`,
          date.toLocaleDateString()
        );
        onSetFormikTouchedDepartureDate(
          `departureDate-${segmentId}`,
          true,
          false
        );
        return;
      }

      if (!hoverDate) {
        return;
      }

      if (departureDate && hoverDate < departureDate) {
        dispatch(setDepartureDate(date, segmentId));
        dispatch(setActiveInputDate('return'));
        onSetFormikReturnDate(
          `returnDate-${segmentId}`,
          date.toLocaleDateString()
        );
        onSetFormikTouchedReturnDate(`returnDate-${segmentId}`, true, false);
        return;
      }

      if (returnDate && hoverDate > returnDate) {
        dispatch(setReturnDate(date, segmentId));
        dispatch(setActiveInputDate('departure'));
        onSetFormikDepartureDate(
          `departureDate-${segmentId}`,
          date.toLocaleDateString()
        );
        onSetFormikTouchedDepartureDate(
          `departureDate-${segmentId}`,
          true,
          false
        );
        return;
      }

      if (activeInputDate === 'departure') {
        dispatch(setDepartureDate(date, segmentId));
        dispatch(setActiveInputDate('return'));
        onSetFormikReturnDate(
          `returnDate-${segmentId}`,
          date.toLocaleDateString()
        );
        onSetFormikTouchedReturnDate(`returnDate-${segmentId}`, true, false);
        return;
      }

      if (activeInputDate === 'return') {
        dispatch(setReturnDate(date, segmentId));
        dispatch(setActiveInputDate('departure'));
        onSetFormikDepartureDate(
          `departureDate-${segmentId}`,
          date.toLocaleDateString()
        );
        onSetFormikTouchedDepartureDate(
          `departureDate-${segmentId}`,
          true,
          false
        );
      }
    },
    [
      activeForm,
      activeInputDate,
      hoverDate,
      departureDate,
      returnDate,
      dispatch,
      segmentId,
      onSetFormikDepartureDate,
      onSetFormikTouchedDepartureDate,
      onSetFormikReturnDate,
      onSetFormikTouchedReturnDate,
    ]
  );

  const handleMouseEnterDay = useCallback((date: Date | null) => {
    setHoverDate(date);
  }, []);

  const handleMouseLeaveMonth = useCallback(() => {
    setHoverDate(null);
  }, []);

  const isDisabledBtn = (date: Date | null): boolean =>
    date ? date.getMonth() === disabledDates.before?.getMonth() : false;

  const handleClickNoReturnButton = () => {
    dispatch(setReturnDate(null, segmentId));
  };

  return (
    <div className="calendar">
      <div className="calendar__inner">
        {activeForm === 'roundtrip' && (
          <div className="calendar__header">
            <span className="calendar__title">
              Выберите дату
              {activeInputDate === 'departure'
                ? ' отправления'
                : ' возвращения'}
            </span>
            <button
              type="button"
              className="calendar__no-return-btn"
              disabled={!returnDate}
              onClick={handleClickNoReturnButton}
            >
              Без обратного билета
            </button>
          </div>
        )}

        <div className="calendar__months">
          <DatepickerCalendarMonth
            calendarDate={prevMonthDate}
            monthDates={prevMonthData}
            onClickDay={handleClickDay}
            onMouseEnterDay={handleMouseEnterDay}
            onMouseLeaveMonth={handleMouseLeaveMonth}
            startDate={departureDate}
            endDate={returnDate}
            hoverDate={hoverDate}
            activeForm={activeForm}
            disabledDates={disabledDates}
          />

          {activeForm === 'roundtrip' && (
            <DatepickerCalendarMonth
              calendarDate={nextMonthDate}
              monthDates={nextMonthData}
              onClickDay={handleClickDay}
              onMouseEnterDay={handleMouseEnterDay}
              onMouseLeaveMonth={handleMouseLeaveMonth}
              startDate={departureDate}
              endDate={returnDate}
              hoverDate={hoverDate}
              activeForm={activeForm}
              disabledDates={disabledDates}
            />
          )}
        </div>

        <SlideButton
          icon={<PrevIcon />}
          onClick={() => handleClickSlideBtn(-1)}
          disabled={isDisabledBtn(prevMonthDate)}
          direction="prev"
        />
        <SlideButton
          icon={<NextIcon />}
          onClick={() => handleClickSlideBtn(1)}
          disabled={isDisabledBtn(nextMonthDate)}
          direction="next"
        />
      </div>
    </div>
  );
};

export default DatepickerCalendar;
