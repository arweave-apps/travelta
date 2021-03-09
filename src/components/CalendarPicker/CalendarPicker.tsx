import React, { useEffect, useState } from 'react';

import NextIcon from '../../assets/images/icons/right-arrow.svg';
import PrevIcon from '../../assets/images/icons/left-arrow.svg';
import CalendarMonth from './CalendarMonth';

import getMonth from '../../helpers/getMonth';

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
    console.log('first');

    const now = new Date();
    const monthIdx = now.getMonth();
    const year = now.getFullYear();

    setCalendarYear(year);
    setCalendarNextYear(year);
    setCalendarMonthIdx(monthIdx);
    setCalendarNextMonthIdx(monthIdx + 1);
  }, []);

  useEffect(() => {
    console.log('update');

    const currentMonth = getMonth(calendarYear, calendarMonthIdx);
    const nextMonth = getMonth(calendarNextYear, calendarNextMonthIdx);

    setCurrentMonthDates(currentMonth.numberDays);
    setCurrentMonthName(currentMonth.monthName);

    setNextMonthDates(nextMonth.numberDays);
    setNextMonthName(nextMonth.monthName);
  }, [calendarMonthIdx, calendarNextMonthIdx, calendarNextYear, calendarYear]);

  const calendarFlipHandler = (value: number) => {
    if (calendarMonthIdx === 11 && value === 1) {
      setCalendarMonthIdx(0);
      setCalendarYear(calendarYear + 1);
    } else if (calendarMonthIdx === 0 && value === -1) {
      setCalendarMonthIdx(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonthIdx(calendarMonthIdx + value);
    }

    if (calendarNextMonthIdx === 11 && value === 1) {
      setCalendarNextMonthIdx(0);
      setCalendarNextYear(calendarNextYear + 1);
    } else if (calendarNextMonthIdx === 0 && value === -1) {
      setCalendarNextMonthIdx(11);
      setCalendarNextYear(calendarNextYear - 1);
    } else {
      setCalendarNextMonthIdx(calendarNextMonthIdx + value);
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
            numberDays={currentMonthDates}
            calendarYear={calendarYear}
          />

          <CalendarMonth
            monthName={nextMonthName}
            numberDays={nextMonthDates}
            calendarYear={calendarNextYear}
          />
        </div>

        <button
          type="button"
          className="calendar__btn calendar__btn--prev"
          onClick={() => calendarFlipHandler(-1)}
          // disabled={monthShift === 0}
        >
          <PrevIcon />
        </button>
        <button
          type="button"
          className="calendar__btn calendar__btn--next"
          onClick={() => calendarFlipHandler(1)}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default CalendarPicker;
