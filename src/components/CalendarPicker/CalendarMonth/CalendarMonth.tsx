import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import './CalendarMonth.scss';

const shortWeekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

type CalendarMonthProps = {
  date: Date;
  monthName: string | null;
  daysOfMonth: Array<number | undefined> | null;
  // calendarYear: number;
  onSelect: (monthDay: number) => void;
  startDate: number | null;
  endDate: number | null;
  hoverDate: number | null;
  onMouseOver: (monthDay: number) => void;
  onMouseOut: () => void;
};

const CalendarMonth = ({
  date,
  monthName,
  daysOfMonth,
  // calendarYear,
  onSelect,
  startDate,
  endDate,
  hoverDate,
  onMouseOver,
  onMouseOut,
}: CalendarMonthProps): JSX.Element => {
  return (
    <div className="month">
      <div className="month__caption">
        {monthName}&nbsp;
        {date.getFullYear()}
      </div>

      <div className="month__weekdays">
        {shortWeekDayNames.map((dayName) => {
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
        onMouseOut={onMouseOut}
        onBlur={onMouseOut}
      >
        {daysOfMonth &&
          daysOfMonth.map((monthDay) => {
            if (!monthDay) {
              return (
                <div className="month__day" key={uuidv4()}>
                  {' '}
                </div>
              );
            }

            if (
              monthDay < new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear()
            ) {
              return (
                <div className="month__day month__day--past" key={uuidv4()}>
                  {monthDay}
                </div>
              );
            }

            const isActive = monthDay === startDate || monthDay === endDate;

            const isPainted =
              (hoverDate &&
                startDate &&
                monthDay < startDate &&
                monthDay >= hoverDate) ||
              (hoverDate &&
                startDate &&
                monthDay > startDate &&
                monthDay <= hoverDate) ||
              (startDate &&
                endDate &&
                monthDay < endDate &&
                monthDay > startDate);

            const isRightPainted =
              (startDate &&
                hoverDate &&
                startDate &&
                hoverDate > startDate &&
                monthDay < hoverDate &&
                startDate === monthDay) ||
              (startDate && endDate && startDate === monthDay);

            const isLeftPainted =
              (startDate &&
                hoverDate &&
                startDate &&
                hoverDate < startDate &&
                monthDay > hoverDate &&
                startDate === monthDay) ||
              (startDate && endDate && endDate === monthDay);

            return (
              <div
                className={classNames('month__day month__day--clickable', {
                  'month__day--active': isActive,
                  'month__day--bg-right': isRightPainted,
                  'month__day--bg-left': isLeftPainted,
                  'month__day--painted': isPainted,
                })}
                role="presentation"
                key={uuidv4()}
                onClick={() => onSelect(monthDay)}
                onMouseOver={() => onMouseOver(monthDay)}
                onFocus={() => onSelect(monthDay)}
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
