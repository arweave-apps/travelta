import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './CalendarMonth.scss';

const shortDaysNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

type CalendarMonthProps = {
  monthName: string | null;
  numberDays: Array<number | undefined> | null;
  calendarYear: number;
};

const CalendarMonth = ({
  monthName,
  numberDays,
  calendarYear,
}: CalendarMonthProps): JSX.Element => {
  return (
    <div className="month">
      <div className="month__caption">
        {monthName}&nbsp;
        {calendarYear}
      </div>

      <div className="month__weekdays">
        {shortDaysNames.map((dayName) => {
          return (
            <div className="month__weekday" key={uuidv4()}>
              {dayName}
            </div>
          );
        })}
      </div>

      <div className="month__body">
        {numberDays &&
          numberDays.map((numberDay) => {
            return (
              <div className="month__day" key={uuidv4()}>
                {numberDay}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CalendarMonth;
