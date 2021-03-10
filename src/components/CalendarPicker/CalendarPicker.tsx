import React, { useEffect, useState } from 'react';

import NextIcon from '../../assets/images/icons/right-arrow.svg';
import PrevIcon from '../../assets/images/icons/left-arrow.svg';
import CalendarMonth from './CalendarMonth';

import getMonth from '../../utils/getMonth';

import './CalendarPicker.scss';

const CalendarPicker = (): JSX.Element => {
  const [prevMonthData, setPrevMonthData] = useState<Array<
    number | undefined
  > | null>([]);

  const [nextMonthData, setNextMonthData] = useState<Array<
    number | undefined
  > | null>([]);

  const [prevMonthName, setPrevMonthName] = useState<string | null>(null);
  const [nextMonthName, setNextMonthName] = useState<string | null>(null);

  const [dateOfPrevMonth, setDateOfPrevMonth] = useState<Date>(new Date());
  const [dateOfNextMonth, setDateOfNextMonth] = useState<Date>(new Date());

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    setDateOfPrevMonth(new Date(year, month));
    setDateOfNextMonth(new Date(year, month + 1));
  }, []);

  useEffect(() => {
    const prevMonth = getMonth(
      dateOfPrevMonth.getFullYear(),
      dateOfPrevMonth.getMonth()
    );
    const nextMonth = getMonth(
      dateOfNextMonth.getFullYear(),
      dateOfNextMonth.getMonth()
    );

    setPrevMonthData(prevMonth.monthData);
    setPrevMonthName(prevMonth.monthName);

    setNextMonthData(nextMonth.monthData);
    setNextMonthName(nextMonth.monthName);
  }, [dateOfPrevMonth, dateOfNextMonth]);

  const handleClickPrevMonth = () => {
    const prevDate = new Date(
      dateOfPrevMonth.getFullYear(),
      dateOfPrevMonth.getMonth() - 1
    );
    const nextMonthDate = new Date(
      dateOfNextMonth.getFullYear(),
      dateOfNextMonth.getMonth() - 1
    );

    setDateOfPrevMonth(prevDate);
    setDateOfNextMonth(nextMonthDate);
  };

  const handleClickNextMonth = () => {
    const prevDate = new Date(
      dateOfPrevMonth.getFullYear(),
      dateOfPrevMonth.getMonth() + 1
    );
    const nextMonthDate = new Date(
      dateOfNextMonth.getFullYear(),
      dateOfNextMonth.getMonth() + 1
    );

    setDateOfPrevMonth(prevDate);
    setDateOfNextMonth(nextMonthDate);
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
            monthName={prevMonthName}
            daysOfMonth={prevMonthData}
            calendarYear={dateOfPrevMonth.getFullYear()}
          />

          <CalendarMonth
            monthName={nextMonthName}
            daysOfMonth={nextMonthData}
            calendarYear={dateOfNextMonth.getFullYear()}
          />
        </div>

        <button
          type="button"
          className="calendar__btn calendar__btn--prev"
          onClick={() => handleClickPrevMonth()}
          disabled={dateOfPrevMonth.getMonth() === new Date().getMonth()}
        >
          <PrevIcon />
        </button>
        <button
          type="button"
          className="calendar__btn calendar__btn--next"
          onClick={() => handleClickNextMonth()}
          disabled={dateOfNextMonth.getMonth() === new Date().getMonth()}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default CalendarPicker;
