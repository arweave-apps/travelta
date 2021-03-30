import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setDepartureDate,
  setReturnDate,
} from '../../../redux/actions/aviaParams/aviaParams';
import { setActiveInputDate } from '../../../redux/actions/pageSettings/pageSettings';
import { RootStateType } from '../../../redux/reducers';
import { SegmentType } from '../../../redux/reducers/aviaParams';

import NextIcon from '../../../assets/images/icons/right-arrow.svg';
import PrevIcon from '../../../assets/images/icons/left-arrow.svg';
import CalendarMonth from './DatepickerCalendarMonth';
import SlideButton from '../../SlideButton';

import getMonthDates from '../../../utils/getMonthDate';

import './DatepickerCalendar.scss';

type DatepickerCalendarPropsType = {
  segment: SegmentType;
};

const DatepickerCalendar = ({
  segment,
}: DatepickerCalendarPropsType): JSX.Element => {
  const dispatch = useDispatch();
  const { id: segmentId, departureDate, returnDate } = segment;

  const activeInputDate = useSelector(
    (state: RootStateType) => state.pageSettings.activeInputDate
  );

  const [prevMonthData, setPrevMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [nextMonthData, setNextMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [prevMonthDate, setDateOfPrevMonth] = useState<Date | null>(null);
  const [nextMonthDate, setDateOfNextMonth] = useState<Date | null>(null);

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    setDateOfPrevMonth(new Date(year, month));
    setDateOfNextMonth(new Date(year, month + 1));
  }, []);

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

  const handleClickBtn = (value: number) => {
    if (nextMonthDate && prevMonthDate) {
      const prevDate = new Date(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth() + value
      );
      const nextDate = new Date(
        nextMonthDate.getFullYear(),
        nextMonthDate.getMonth() + value
      );

      setDateOfPrevMonth(prevDate);
      setDateOfNextMonth(nextDate);
    }
  };

  const handleClickDay = useCallback(
    (date: Date | null) => {
      if (activeInputDate === 'departure') {
        if (hoverDate && returnDate && hoverDate < returnDate) {
          dispatch(setDepartureDate(date, segmentId));
          dispatch(setActiveInputDate('return'));
        } else if (hoverDate && returnDate && hoverDate > returnDate) {
          const tempEnd = returnDate;
          dispatch(setDepartureDate(tempEnd, segmentId));
          dispatch(setReturnDate(hoverDate, segmentId));
        } else if (hoverDate && (departureDate || !departureDate)) {
          dispatch(setDepartureDate(hoverDate, segmentId));
          dispatch(setActiveInputDate('return'));
        }
      }

      if (activeInputDate === 'return') {
        if (hoverDate && departureDate && hoverDate > departureDate) {
          dispatch(setReturnDate(date, segmentId));
          dispatch(setActiveInputDate('departure'));
        } else if (hoverDate && departureDate && hoverDate < departureDate) {
          const tempStart = departureDate;
          dispatch(setDepartureDate(hoverDate, segmentId));
          dispatch(setReturnDate(tempStart, segmentId));
        } else if (hoverDate && !departureDate) {
          dispatch(setReturnDate(hoverDate, segmentId));
          dispatch(setActiveInputDate('departure'));
        }
      }
    },
    [activeInputDate, hoverDate, returnDate, departureDate, dispatch, segmentId]
  );

  const handleMouseEnterDay = useCallback((date: Date | null) => {
    setHoverDate(date);
  }, []);

  const handleMouseLeaveMonth = useCallback(() => {
    setHoverDate(null);
  }, []);

  const isDisabledBtn = (date: Date | null): boolean =>
    date ? date.getMonth() === new Date().getMonth() : false;

  const handleClickNoReturnButton = () => {
    dispatch(setReturnDate(null, segmentId));
  };

  return (
    <div className="calendar">
      <div className="calendar__inner">
        <div className="calendar__header">
          <span className="calendar__title">
            Выберите дату
            {activeInputDate === 'departure' ? ' отправления' : ' возвращения'}
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

        <div className="calendar__months">
          <CalendarMonth
            calendarDate={prevMonthDate}
            monthDates={prevMonthData}
            onClickDay={handleClickDay}
            onMouseEnterDay={handleMouseEnterDay}
            onMouseLeaveMonth={handleMouseLeaveMonth}
            startDate={departureDate}
            endDate={returnDate}
            hoverDate={hoverDate}
          />

          <CalendarMonth
            calendarDate={nextMonthDate}
            monthDates={nextMonthData}
            onClickDay={handleClickDay}
            onMouseEnterDay={handleMouseEnterDay}
            onMouseLeaveMonth={handleMouseLeaveMonth}
            startDate={departureDate}
            endDate={returnDate}
            hoverDate={hoverDate}
          />
        </div>

        <SlideButton
          icon={<PrevIcon />}
          onClick={() => handleClickBtn(-1)}
          disabled={isDisabledBtn(prevMonthDate)}
          direction="prev"
        />

        <SlideButton
          icon={<NextIcon />}
          onClick={() => handleClickBtn(1)}
          disabled={isDisabledBtn(nextMonthDate)}
          direction="next"
        />
      </div>
    </div>
  );
};

export default DatepickerCalendar;
