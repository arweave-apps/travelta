import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setAfterDisabledDates,
  setBeforeDisabledDates,
} from '../../../redux/actions/pageSettings/pageSettings';
import {
  DisabledDatesType,
  FormsType,
} from '../../../redux/reducers/pageSettings';

import NextIcon from '../../../assets/images/icons/right-arrow.svg';
import PrevIcon from '../../../assets/images/icons/left-arrow.svg';
import DatepickerCalendarMonth from './DatepickerCalendarMonth';
import SlideButton from '../../SlideButton';
import { ActiveInputType } from '../Datepicker';

import { getMonthDates } from './helpers';
import { SegmentType } from '../../AviaSearchForm/helpers';

import './DatepickerCalendar.scss';

type DatepickerCalendarPropsType = {
  segmentId: string;
  returnDate: Date | null;
  departureDate: Date | null;
  segments: SegmentType[];
  activeInputDate: string | null;
  onSetActiveInputDate: (activeInput: ActiveInputType) => void;
  activeForm: FormsType;
  disabledDates: DisabledDatesType;
  onSetFormikDepartureDate: (date: Date | null) => void;
  onSetFormikReturnDate: (date: Date | null) => void;
};

const DatepickerCalendar = ({
  segmentId,
  departureDate,
  returnDate,
  segments,
  activeInputDate,
  onSetActiveInputDate,
  activeForm,
  disabledDates,
  onSetFormikDepartureDate,
  onSetFormikReturnDate,
}: DatepickerCalendarPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const [prevMonthData, setPrevMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [nextMonthData, setNextMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [prevMonthDate, setPrevMonthDate] = useState<Date | null>(null);
  const [nextMonthDate, setNextMonthDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    if (segments.length === 1) {
      if (segments[0].departureDate !== null) {
        const startDate = new Date(segments[0].departureDate);
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();

        setPrevMonthDate(new Date(startYear, startMonth));
        setNextMonthDate(new Date(startYear, startMonth + 1));
      } else {
        setPrevMonthDate(new Date(year, month));
        setNextMonthDate(new Date(year, month + 1));
      }
    }

    if (segments.length > 1) {
      const activeSegmentIndex = segments.findIndex(
        (segment) => segmentId === segment.id
      );

      const prevSegmentIndex = activeSegmentIndex - 1;

      if (prevSegmentIndex === -1) {
        dispatch(setBeforeDisabledDates(new Date(year, month, day)));

        setPrevMonthDate(new Date(year, month));
        setNextMonthDate(new Date(year, month + 1));
      } else {
        const prevSegment = segments[prevSegmentIndex];
        const prevDepartureDate = prevSegment.departureDate;

        if (!prevDepartureDate) {
          dispatch(setBeforeDisabledDates(new Date(year, month, day)));

          setPrevMonthDate(new Date(year, month));
          setNextMonthDate(new Date(year, month + 1));
        } else {
          const startDate = new Date(prevDepartureDate);
          const startYear = startDate.getFullYear();
          const startMonth = startDate.getMonth();

          setPrevMonthDate(new Date(startYear, startMonth));
          setNextMonthDate(new Date(startYear, startMonth + 1));

          dispatch(setBeforeDisabledDates(prevDepartureDate));
        }
      }
    } else {
      dispatch(setBeforeDisabledDates(new Date(year, month, day)));
    }

    dispatch(setAfterDisabledDates(new Date(year + 1, month + 1, day)));
  }, [activeForm, dispatch, segmentId, segments]);

  useEffect(() => {
    if (nextMonthDate && prevMonthDate) {
      const prevMonth = getMonthDates(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth()
      );

      const nextMonth = getMonthDates(
        nextMonthDate.getFullYear(),
        nextMonthDate.getMonth()
      );

      setPrevMonthData(prevMonth);
      setNextMonthData(nextMonth);
    }
  }, [prevMonthDate, nextMonthDate]);

  const handleClickSlideBtn = (value: number) => {
    if (nextMonthDate && prevMonthDate) {
      const prevDate = new Date(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth() + value
      );

      const nextDate = new Date(
        nextMonthDate.getFullYear(),
        nextMonthDate.getMonth() + value
      );

      setPrevMonthDate(prevDate);
      setNextMonthDate(nextDate);
    }
  };

  const handleClickDay = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, date: Date) => {
      e.stopPropagation(); // otherwise click outside will work

      if (segments.length > 1) {
        const activeSegmentIndex = segments.findIndex(
          (segment) => segmentId === segment.id
        );

        const nextSegmentIndex = activeSegmentIndex + 1;
        const nextSegment = segments[nextSegmentIndex];

        if (nextSegment) {
          const nextDepartureDate = nextSegment.departureDate;

          if (nextDepartureDate && date > nextDepartureDate) {
            onSetFormikDepartureDate(null);
          }
        }
      }

      if (activeForm !== 'roundtrip' && activeInputDate === 'departure') {
        onSetFormikDepartureDate(date);
        return;
      }

      if (!hoverDate) {
        return;
      }

      if (departureDate && hoverDate < departureDate) {
        onSetActiveInputDate('return');
        onSetFormikDepartureDate(date);
        return;
      }

      if (returnDate && hoverDate > returnDate) {
        onSetActiveInputDate('departure');
        onSetFormikReturnDate(date);
        return;
      }

      if (activeInputDate === 'departure') {
        onSetActiveInputDate('return');
        onSetFormikDepartureDate(date);
        return;
      }

      if (activeInputDate === 'return') {
        onSetActiveInputDate('departure');
        onSetFormikReturnDate(date);
      }
    },
    [
      segments,
      activeForm,
      activeInputDate,
      hoverDate,
      departureDate,
      returnDate,
      segmentId,
      onSetFormikDepartureDate,
      onSetActiveInputDate,
      onSetFormikReturnDate,
    ]
  );

  const handleMouseEnterDay = useCallback((date: Date | null) => {
    setHoverDate(date);
  }, []);

  const handleMouseLeaveMonth = useCallback(() => {
    setHoverDate(null);
  }, []);

  const isDisabledBtn = (date: Date | null): boolean =>
    date ? date.getMonth() === disabledDates.before?.getMonth() : false;

  return (
    <div className="calendar">
      <div className="calendar__inner">
        {activeForm === 'roundtrip' && (
          <div className="calendar__header">
            <span className="calendar__title">
              Выберите дату
              {activeInputDate === 'departure'
                ? ' отправления'
                : ' возвращения'}
            </span>
          </div>
        )}

        <div className="calendar__months">
          <DatepickerCalendarMonth
            calendarDate={prevMonthDate}
            monthDates={prevMonthData}
            onClickDay={handleClickDay}
            onMouseEnterDay={handleMouseEnterDay}
            onMouseLeaveMonth={handleMouseLeaveMonth}
            startDate={departureDate}
            endDate={returnDate}
            hoverDate={hoverDate}
            activeForm={activeForm}
            disabledDates={disabledDates}
          />

          {activeForm === 'roundtrip' && (
            <DatepickerCalendarMonth
              calendarDate={nextMonthDate}
              monthDates={nextMonthData}
              onClickDay={handleClickDay}
              onMouseEnterDay={handleMouseEnterDay}
              onMouseLeaveMonth={handleMouseLeaveMonth}
              startDate={departureDate}
              endDate={returnDate}
              hoverDate={hoverDate}
              activeForm={activeForm}
              disabledDates={disabledDates}
            />
          )}
        </div>

        <SlideButton
          icon={<PrevIcon />}
          onClick={() => handleClickSlideBtn(-1)}
          disabled={isDisabledBtn(prevMonthDate)}
          direction="prev"
        />
        <SlideButton
          icon={<NextIcon />}
          onClick={() => handleClickSlideBtn(1)}
          disabled={isDisabledBtn(nextMonthDate)}
          direction="next"
        />
      </div>
    </div>
  );
};

export default DatepickerCalendar;
