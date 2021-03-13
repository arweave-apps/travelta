import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import {
  isActive,
  isFilled,
  isFilledLeftHalfCell,
  isFilledRightHalfCell,
  isPastDay,
} from './helpers';

import './CalendarMonth.scss';

const shortWeekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const monthsNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

type CalendarMonthProps = {
  calendarDate: Date | null;
  monthDates: Array<number | undefined> | null;
  onClickDay: (date: Date | null) => void;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  onMouseEnterDay: (date: Date | null) => void;
  onMouseLeaveMonth: () => void;
};

const CalendarMonth = ({
  calendarDate,
  monthDates,
  onClickDay,
  startDate,
  endDate,
  hoverDate,
  onMouseEnterDay,
  onMouseLeaveMonth,
}: CalendarMonthProps): JSX.Element => {
  const year = calendarDate?.getFullYear() || 0;
  const month = calendarDate?.getMonth() || 0;

  return (
    <div className="month">
      <div className="month__caption">
        {monthsNames[month]}&nbsp;
        {year}
      </div>

      <div className="month__weekdays">
        {shortWeekDays.map((dayName) => {
          return (
            <div className="month__weekday" key={uuidv4()}>
              {dayName}
            </div>
          );
        })}
      </div>

      <div
        className="month__body"
        role="presentation"
        onMouseLeave={onMouseLeaveMonth}
      >
        {monthDates &&
          monthDates.map((monthDay) => {
            const comparisonDate = new Date(year, month, monthDay);

            if (!monthDay) {
              return (
                <div className="month__day" key={uuidv4()}>
                  {' '}
                </div>
              );
            }

            if (isPastDay(comparisonDate)) {
              return (
                <div className="month__day month__day--past" key={uuidv4()}>
                  {monthDay}
                </div>
              );
            }

            return (
              <div
                className={classNames('month__day month__day--clickable', {
                  'month__day--active':
                    isActive(comparisonDate, startDate) ||
                    isActive(comparisonDate, endDate),
                  'month__day--filled-right': isFilledRightHalfCell(
                    comparisonDate,
                    startDate,
                    hoverDate,
                    endDate
                  ),
                  'month__day--filled-left': isFilledLeftHalfCell(
                    comparisonDate,
                    startDate,
                    hoverDate,
                    endDate
                  ),
                  'month__day--filled': isFilled(
                    comparisonDate,
                    startDate,
                    hoverDate,
                    endDate
                  ),
                })}
                role="presentation"
                key={uuidv4()}
                onClick={() => onClickDay(new Date(year, month, monthDay))}
                onMouseEnter={() =>
                  onMouseEnterDay(new Date(year, month, monthDay))
                }
              >
                <div>{monthDay}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CalendarMonth;
