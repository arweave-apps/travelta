import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import useOutsideClick from '../../hooks/useOutsideClick';

import {
  setActiveInputDate,
  setActiveSegment,
} from '../../redux/actions/pageSettings/pageSettings';
import { RootStateType } from '../../redux/reducers';
import { SegmentType } from '../../redux/reducers/aviaParams';

import DatepickerCalendar from './DatepickerCalendar';
import TextInput from '../TextInput';

import './Datepicker.scss';

type DatepickerPropsType = {
  segment: SegmentType;
};

const Datepicker = ({ segment }: DatepickerPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const activeForm = useSelector(
    (state: RootStateType) => state.pageSettings.activeForm
  );

  const [isOpen, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    wrapperRef,
    () => {
      setOpen(false);
      dispatch(setActiveInputDate(null));
    },
    isOpen
  );

  const handleClickCalendarOpen = () => {
    if (isOpen) {
      return;
    }

    setOpen(true);
  };

  const activeInputDate = useSelector(
    (state: RootStateType) => state.pageSettings.activeInputDate
  );

  const activeSegment = useSelector(
    (state: RootStateType) => state.pageSettings.activeSegment
  );

  const handleClickInputDate = (inputType: string) => {
    dispatch(setActiveInputDate(inputType));
    dispatch(setActiveSegment(segment.id));
  };

  return (
    <div
      className="datepicker"
      ref={wrapperRef}
      role="presentation"
      onClick={handleClickCalendarOpen}
    >
      <div
        className={classNames('datepicker__depart', {
          'datepicker__depart--active':
            activeInputDate === 'departure' && segment.id === activeSegment,
        })}
        role="presentation"
        onClick={() => handleClickInputDate('departure')}
      >
        <TextInput
          placeholder="Когда"
          id="depart"
          value={segment.departureDate?.toLocaleDateString()}
          readonly
        />
      </div>

      {activeForm === 'standart' && (
        <div
          className={classNames('datepicker__return', {
            'datepicker__return--active':
              activeInputDate === 'return' && segment.id === activeSegment,
          })}
          role="presentation"
          onClick={() => handleClickInputDate('return')}
        >
          <TextInput
            placeholder="Обратно"
            id="return"
            value={segment.returnDate?.toLocaleDateString()}
            readonly
          />
        </div>
      )}

      {isOpen && <DatepickerCalendar segment={segment} />}
    </div>
  );
};

export default Datepicker;
