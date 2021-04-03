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
import { DisabledDatesType } from '../../../redux/reducers/pageSettings';

import NextIcon from '../../../assets/images/icons/right-arrow.svg';
import PrevIcon from '../../../assets/images/icons/left-arrow.svg';
import DatepickerCalendarMonth from './DatepickerCalendarMonth';
import SlideButton from '../../SlideButton';

import { getMonthDates } from './helpers';

import './DatepickerCalendar.scss';
import { RootStateType } from '../../../redux/reducers';

type DatepickerCalendarPropsType = {
  segmentId: string;
  returnDate: Date | null;
  departureDate: Date | null;
  activeInputDate: string | null;
  activeForm: string;
  disabledDates: DisabledDatesType;
};

const DatepickerCalendar = ({
  segmentId,
  departureDate,
  returnDate,
  activeInputDate,
  activeForm,
  disabledDates,
}: DatepickerCalendarPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const [prevMonthData, setPrevMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [nextMonthData, setNextMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [prevMonthDate, setPrevMonthDate] = useState<Date | null>(null);
  const [nextMonthDate, setNextMonthDate] = useState<Date | null>(null);

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const segments = useSelector(
    (state: RootStateType) => state.aviaParams.segments
  );

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    if (segments.length > 1) {
      const prevSegment = segments[segments.length - 2];
      const prevDepartureDate = prevSegment.departureDate;
      dispatch(setBeforeDisabledDates(prevDepartureDate));
    } else {
      dispatch(setBeforeDisabledDates(new Date(year, month, day)));
    }

    dispatch(setAfterDisabledDates(new Date(year + 1, month + 1, day)));

    setPrevMonthDate(new Date(year, month));
    setNextMonthDate(new Date(year, month + 1));
  }, [dispatch, segments]);

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
    (date: Date) => {
      if (activeForm === 'multiCity' && activeInputDate === 'departure') {
        dispatch(setDepartureDate(date, segmentId));
        return;
      }

      if (!hoverDate) {
        return;
      }

      if (departureDate && hoverDate < departureDate) {
        dispatch(setDepartureDate(date, segmentId));
        dispatch(setActiveInputDate('return'));
        return;
      }

      if (returnDate && hoverDate > returnDate) {
        dispatch(setReturnDate(date, segmentId));
        dispatch(setActiveInputDate('departure'));
        return;
      }

      if (activeInputDate === 'departure') {
        dispatch(setDepartureDate(date, segmentId));
        dispatch(setActiveInputDate('return'));
        return;
      }

      if (activeInputDate === 'return') {
        dispatch(setReturnDate(date, segmentId));
        dispatch(setActiveInputDate('departure'));
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
        {activeForm === 'standart' && (
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

          {activeForm === 'standart' && (
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
