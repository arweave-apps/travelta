import React, { useCallback, useEffect, useState } from 'react';

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

  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [hoverDate, setHoverDate] = useState<number | null>(null);
  const [choiceType, setChoiceType] = useState<string>('start');
  console.table({
    choiceType,
    startDate,
    endDate,
    hoverDate,
  });

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

  const handleClickDay = useCallback(
    (monthDay: number) => {
      if (choiceType === 'start') {
        if ((hoverDate && endDate && hoverDate < endDate) || !startDate) {
          setStartDate(monthDay);
          setChoiceType('end');
        } else if (hoverDate && endDate && hoverDate > endDate) {
          const tempEnd = endDate;
          setStartDate(tempEnd);
          setEndDate(hoverDate);
        }
      }

      if (choiceType === 'end') {
        if (hoverDate && startDate && hoverDate > startDate) {
          setEndDate(monthDay);
          setChoiceType('start');
        } else if (hoverDate && startDate && hoverDate < startDate) {
          const tempStart = startDate;
          setStartDate(hoverDate);
          setEndDate(tempStart);
        }
      }
    },
    [choiceType, endDate, hoverDate, startDate]
  );

  const handleMouseOverMonth = useCallback((monthDay: number) => {
    setHoverDate(monthDay);
  }, []);

  const handleMouseOutMonth = useCallback(() => {
    setHoverDate(null);
  }, []);

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
            onSelect={handleClickDay}
            onMouseOver={handleMouseOverMonth}
            onMouseOut={handleMouseOutMonth}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
          />

          {/* <CalendarMonth
            monthName={nextMonthName}
            daysOfMonth={nextMonthData}
            calendarYear={dateOfNextMonth.getFullYear()}
            onSelect={handleClickDay}
          /> */}
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
