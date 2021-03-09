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
  const [nextMonthName, setNexttMonthName] = useState<string | null>(null);

  const [monthShift, setMonthShift] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    const monthIdx = now.getMonth();
    const year = now.getFullYear();

    const currentMonth = getMonth(year, monthIdx + monthShift);
    const nextMonth = getMonth(year, monthIdx + 1 + monthShift);

    setCurrentMonthDates(currentMonth.numberDays);
    setCurrentMonthName(currentMonth.monthName);
    setNextMonthDates(nextMonth.numberDays);
    setNexttMonthName(nextMonth.monthName);
  }, [monthShift]);

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
          />

          <CalendarMonth
            monthName={nextMonthName}
            numberDays={nextMonthDates}
          />
        </div>

        <button
          type="button"
          className="calendar__btn calendar__btn--prev"
          onClick={() => setMonthShift(monthShift - 1)}
        >
          <PrevIcon />
        </button>
        <button
          type="button"
          className="calendar__btn calendar__btn--next"
          onClick={() => setMonthShift(monthShift + 1)}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default CalendarPicker;
