import React, { useEffect, useState } from 'react';

import NextIcon from '../../assets/images/icons/right-arrow.svg';
import PrevIcon from '../../assets/images/icons/left-arrow.svg';
import CalendarMonth from './CalendarMonth';

import getMonthData from '../../helpers/getMonthData';

import './CalendarPicker.scss';

const CalendarPicker = (): JSX.Element => {
  const [currentMonthDates, setCurrentMonthDates] = useState<Array<
    number | undefined
  > | null>([]);

  const [nextMonthDates, setNextMonthDates] = useState<Array<
    number | undefined
  > | null>([]);

  const [currentMonthName, setCurrentMonthName] = useState<string | null>(null);
  const [nextMonthName, setNextMonthName] = useState<string | null>(null);

  const [calendarYear, setCalendarYear] = useState<number>(0);
  const [calendarNextYear, setCalendarNextYear] = useState<number>(0);

  const [calendarMonthIdx, setCalendarMonthIdx] = useState<number>(0);
  const [calendarNextMonthIdx, setCalendarNextMonthIdx] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    const monthIdx = now.getMonth();
    const year = now.getFullYear();

    setCalendarYear(year);
    setCalendarNextYear(year);
    setCalendarMonthIdx(monthIdx);
    setCalendarNextMonthIdx(monthIdx + 1);
  }, []);

  useEffect(() => {
    const currentMonth = getMonthData(calendarYear, calendarMonthIdx);
    const nextMonth = getMonthData(calendarNextYear, calendarNextMonthIdx);

    setCurrentMonthDates(currentMonth.numberDays);
    setCurrentMonthName(currentMonth.monthName);

    setNextMonthDates(nextMonth.numberDays);
    setNextMonthName(nextMonth.monthName);
  }, [calendarMonthIdx, calendarNextMonthIdx, calendarNextYear, calendarYear]);

  const prevMonthHandler = () => {
    if (calendarMonthIdx === 0) {
      setCalendarMonthIdx(11);
      setCalendarYear(calendarYear - 1);
    } else if (calendarNextMonthIdx === 0) {
      setCalendarNextMonthIdx(11);
      setCalendarNextYear(calendarNextYear - 1);
    } else {
      setCalendarMonthIdx(calendarMonthIdx - 1);
      setCalendarNextMonthIdx(calendarNextMonthIdx - 1);
    }
  };

  const nextMonthHandler = () => {
    if (calendarMonthIdx === 11) {
      setCalendarMonthIdx(0);
      setCalendarYear(calendarYear + 1);
    } else if (calendarNextMonthIdx === 11) {
      setCalendarNextMonthIdx(0);
      setCalendarNextYear(calendarNextYear + 1);
    } else {
      setCalendarNextMonthIdx(calendarNextMonthIdx + 1);
      setCalendarMonthIdx(calendarMonthIdx + 1);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar__inner">
        <div className="calendar__header">
          <span className="calendar__title">Выберите дату отправления</span>
          <button type="button" className="calendar__reset">
            Сбросить
          </button>
        </div>

        <div className="calendar__months">
          <CalendarMonth
            monthName={currentMonthName}
            daysOfMonth={currentMonthDates}
            calendarYear={calendarYear}
          />

          <CalendarMonth
            monthName={nextMonthName}
            daysOfMonth={nextMonthDates}
            calendarYear={calendarNextYear}
          />
        </div>

        <button
          type="button"
          className="calendar__btn calendar__btn--prev"
          onClick={() => prevMonthHandler()}
          // disabled={calendarMonthIdx === new Date().getMonth()}
        >
          <PrevIcon />
        </button>
        <button
          type="button"
          className="calendar__btn calendar__btn--next"
          onClick={() => nextMonthHandler()}
          // disabled={calendarNextMonthIdx === new Date().getMonth() + 12}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default CalendarPicker;
