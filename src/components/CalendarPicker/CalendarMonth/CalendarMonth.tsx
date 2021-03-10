import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './CalendarMonth.scss';

const shortWeekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

type CalendarMonthProps = {
  monthName: string | null;
  daysOfMonth: Array<number | undefined> | null;
  calendarYear: number;
};

const CalendarMonth = ({
  monthName,
  daysOfMonth,
  calendarYear,
}: CalendarMonthProps): JSX.Element => {
  return (
    <div className="month">
      <div className="month__caption">
        {monthName}&nbsp;
        {calendarYear}
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

      <div className="month__body">
        {daysOfMonth &&
          daysOfMonth.map((monthDay) => {
            return (
              <div className="month__day" key={uuidv4()}>
                {monthDay}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CalendarMonth;
