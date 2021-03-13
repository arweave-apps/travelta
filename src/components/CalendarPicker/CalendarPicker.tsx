import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InitialAviaParamsStateType } from '../../redux/reducers/aviaParams';

import NextIcon from '../../assets/images/icons/right-arrow.svg';
import PrevIcon from '../../assets/images/icons/left-arrow.svg';
import CalendarMonth from './CalendarMonth';

import getMonthDates from '../../utils/getMonthDate';

import './CalendarPicker.scss';
import { setActiveInputDate } from '../../redux/actions/aviaParams/aviaParams';

type StateType = {
  aviaParams: InitialAviaParamsStateType;
};

const CalendarPicker = (): JSX.Element => {
  const dispatch = useDispatch();
  const activeInputDate = useSelector(
    (state: StateType) => state.aviaParams.activeInputDate
  );

  const [prevMonthData, setPrevMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [nextMonthData, setNextMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [prevMonthDate, setDateOfPrevMonth] = useState<Date | null>(null);
  const [nextMonthDate, setDateOfNextMonth] = useState<Date | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
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
      if (activeInputDate === 'start') {
        if ((hoverDate && endDate && hoverDate < endDate) || !startDate) {
          setStartDate(date);
          dispatch(setActiveInputDate('end'));
        } else if (hoverDate && endDate && hoverDate > endDate) {
          const tempEnd = endDate;
          setStartDate(tempEnd);
          setEndDate(hoverDate);
        }
      }

      if (activeInputDate === 'end') {
        if (hoverDate && startDate && hoverDate > startDate) {
          setEndDate(date);
          dispatch(setActiveInputDate('start'));
        } else if (hoverDate && startDate && hoverDate < startDate) {
          const tempStart = startDate;
          setStartDate(hoverDate);
          setEndDate(tempStart);
        }
      }
    },
    [activeInputDate, dispatch, endDate, hoverDate, startDate]
  );

  const handleMouseEnterDay = useCallback((date: Date | null) => {
    setHoverDate(date);
  }, []);

  const handleMouseLeaveMonth = useCallback(() => {
    setHoverDate(null);
  }, []);

  const isDisabledPrevBtn = (): boolean =>
    prevMonthDate ? prevMonthDate.getMonth() === new Date().getMonth() : false;

  const isDisabledNextBtn = (): boolean =>
    nextMonthDate ? nextMonthDate.getMonth() === new Date().getMonth() : false;

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
            disabled={!endDate}
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
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
          />

          <CalendarMonth
            calendarDate={nextMonthDate}
            monthDates={nextMonthData}
            onClickDay={handleClickDay}
            onMouseEnterDay={handleMouseEnterDay}
            onMouseLeaveMonth={handleMouseLeaveMonth}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
          />
        </div>

        <button
          type="button"
          className="calendar__btn calendar__btn--prev"
          onClick={() => handleClickBtn(-1)}
          disabled={isDisabledPrevBtn()}
        >
          <PrevIcon />
        </button>
        <button
          type="button"
          className="calendar__btn calendar__btn--next"
          onClick={() => handleClickBtn(1)}
          disabled={isDisabledNextBtn()}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default CalendarPicker;
