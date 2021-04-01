import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import {
  isSelectedDay,
  isFilled,
  isFilledRightHalfCell,
  isFilledLeftHalfCell,
  isPastDay,
  monthsNames,
  shortWeekDays,
} from '../helpers';
import { DisabledDatesType } from '../../../../redux/reducers/pageSettings';

import './DatepickerCalendarMonth.scss';

type DatePickerCalendarMonthProps = {
  calendarDate: Date | null;
  monthDates: Array<number | undefined> | null;
  onClickDay: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  onMouseEnterDay: (date: Date | null) => void;
  onMouseLeaveMonth: () => void;
  activeForm: string;
  disabledDates: DisabledDatesType;
};

const DatePickerCalendarMonth = ({
  calendarDate,
  monthDates,
  onClickDay,
  startDate,
  endDate,
  hoverDate,
  onMouseEnterDay,
  onMouseLeaveMonth,
  activeForm,
  disabledDates,
}: DatePickerCalendarMonthProps): JSX.Element => {
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

            if (isPastDay(comparisonDate, disabledDates)) {
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
                    isSelectedDay(comparisonDate, startDate) ||
                    (activeForm === 'standart' &&
                      isSelectedDay(comparisonDate, endDate)),
                  'month__day--filled-right':
                    activeForm === 'standart' &&
                    isFilledRightHalfCell(
                      comparisonDate,
                      startDate,
                      hoverDate,
                      endDate
                    ),
                  'month__day--filled-left':
                    activeForm === 'standart' &&
                    isFilledLeftHalfCell(
                      comparisonDate,
                      startDate,
                      hoverDate,
                      endDate
                    ),
                  'month__day--filled':
                    activeForm === 'standart' &&
                    isFilled(comparisonDate, startDate, hoverDate, endDate),
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

export default DatePickerCalendarMonth;
