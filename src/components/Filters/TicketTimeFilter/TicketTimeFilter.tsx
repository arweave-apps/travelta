import React, { SetStateAction, useCallback, useEffect } from 'react';
import { EntriesArray } from '../../../interfaces/types';

import {
  ActiveTicketDateFilters,
  ActiveTicketTimeFilters,
} from '../../../pages/Search/Search';
import { DateTimestamp, SegmentNo } from '../../../redux/reducers/tickets';
import { msToTime } from '../../../utils/dateUtils';
import Checkbox from '../../Checkbox';
import List from '../../List';
import ListItem from '../../List/ListItem';

import SliderRange from '../../SliderRange';
import FilterItem from '../FilterItem';
import {
  OpenFiltersType,
  TicketTimeValues,
  DateCheckboxesType,
} from '../Filters';

import './TicketTimeFilter.scss';

type TicketTimeFilterProps = {
  segmentNo: SegmentNo;
  ticketTimeValues: TicketTimeValues;
  title: string;
  timeFilterId: OpenFiltersType;
  isOpen: boolean;
  onToggle: (id: OpenFiltersType) => void;
  onSetActiveTimeFilters: (filters: ActiveTicketTimeFilters) => void;
  minDeparture: number;
  maxDeparture: number;
  minTicketTimeDepartureValue: number;
  maxTicketTimeDepartureValue: number;
  minArrival: number;
  maxArrival: number;
  minTicketTimeArrivalValue: number;
  maxTicketTimeArrivalValue: number;
  onSetTicketTimeValues: (newValues: TicketTimeValues) => void;
  checkboxes: DateCheckboxesType[] | null;
  activeDateFilters: ActiveTicketDateFilters | null;
  onSetActiveTicketDatesFilters: React.Dispatch<
    SetStateAction<ActiveTicketDateFilters | null>
  >;
};

const STEP = 1800000; // ms in 30 min

type ChangedValues = {
  departureTime: number[];
  arrivalTime: number[];
};

const updateValues = (
  formSegmentId: SegmentNo,
  ticketTimeValues: TicketTimeValues,
  changedValues: ChangedValues
) => {
  const arr = Object.entries(
    ticketTimeValues
  ) as EntriesArray<TicketTimeValues>;

  return arr.reduce((acc, [currentKey, currentValues]) => {
    if (currentKey === formSegmentId) {
      acc[currentKey] = changedValues;
    } else {
      acc[currentKey] = currentValues;
    }

    return acc;
  }, {} as TicketTimeValues);
};

const TicketTimeFilter = ({
  segmentNo,
  ticketTimeValues,
  title,
  timeFilterId,
  isOpen,
  onToggle,
  onSetActiveTimeFilters,
  minDeparture,
  maxDeparture,
  minTicketTimeDepartureValue,
  maxTicketTimeDepartureValue,
  minArrival,
  maxArrival,
  minTicketTimeArrivalValue,
  maxTicketTimeArrivalValue,
  onSetTicketTimeValues,
  checkboxes,
  activeDateFilters,
  onSetActiveTicketDatesFilters,
}: TicketTimeFilterProps): JSX.Element => {
  const handleChangeMinDepartureValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!ticketTimeValues) {
        return;
      }

      const value = Math.min(
        +e.target.value,
        maxTicketTimeDepartureValue - STEP
      );

      const changedValues = {
        ...ticketTimeValues[segmentNo],
        departureTime: [value, ticketTimeValues[segmentNo].departureTime[1]],
      };

      const newValues = updateValues(
        segmentNo,
        ticketTimeValues,
        changedValues
      );

      onSetTicketTimeValues(newValues);
    },
    [
      maxTicketTimeDepartureValue,
      onSetTicketTimeValues,
      segmentNo,
      ticketTimeValues,
    ]
  );

  const handleChangeMaxDepartureValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!ticketTimeValues) {
        return;
      }

      const value = Math.max(
        +e.target.value,
        minTicketTimeDepartureValue + STEP
      );

      const changedValues = {
        ...ticketTimeValues[segmentNo],
        departureTime: [ticketTimeValues[segmentNo].departureTime[0], value],
      };

      const newValues = updateValues(
        segmentNo,
        ticketTimeValues,
        changedValues
      );

      onSetTicketTimeValues(newValues);
    },
    [
      minTicketTimeDepartureValue,
      onSetTicketTimeValues,
      segmentNo,
      ticketTimeValues,
    ]
  );

  const handleChangeMinArrivalValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!ticketTimeValues) {
        return;
      }

      const value = Math.min(+e.target.value, maxTicketTimeArrivalValue - STEP);

      const changedValues = {
        ...ticketTimeValues[segmentNo],
        arrivalTime: [value, ticketTimeValues[segmentNo].arrivalTime[1]],
      };

      const newValues = updateValues(
        segmentNo,
        ticketTimeValues,
        changedValues
      );

      onSetTicketTimeValues(newValues);
    },
    [
      maxTicketTimeArrivalValue,
      onSetTicketTimeValues,
      segmentNo,
      ticketTimeValues,
    ]
  );

  const handleChangeMaxArrivalValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!ticketTimeValues) {
        return;
      }

      const value = Math.max(+e.target.value, minTicketTimeArrivalValue + STEP);

      const changedValues = {
        ...ticketTimeValues[segmentNo],
        arrivalTime: [ticketTimeValues[segmentNo].arrivalTime[0], value],
      };

      const newValues = updateValues(
        segmentNo,
        ticketTimeValues,
        changedValues
      );

      onSetTicketTimeValues(newValues);
    },
    [
      minTicketTimeArrivalValue,
      onSetTicketTimeValues,
      segmentNo,
      ticketTimeValues,
    ]
  );

  useEffect(() => {
    onSetActiveTimeFilters(ticketTimeValues);
  }, [onSetActiveTimeFilters, ticketTimeValues]);

  useEffect(() => {
    if (checkboxes) {
      onSetActiveTicketDatesFilters((prevState) => {
        return {
          ...prevState,
          [segmentNo]: checkboxes.map(({ value }) => value),
        };
      });
    }
  }, [checkboxes, segmentNo, onSetActiveTicketDatesFilters]);

  const handleClickCheckbox = (value: DateTimestamp) => {
    if (activeDateFilters) {
      if (activeDateFilters[segmentNo].includes(value)) {
        const idx = activeDateFilters[segmentNo].indexOf(value);

        const newActiveDateFilters = {
          ...activeDateFilters,
          [segmentNo]: [
            ...activeDateFilters[segmentNo].slice(0, idx),
            ...activeDateFilters[segmentNo].slice(idx + 1),
          ],
        };

        onSetActiveTicketDatesFilters(newActiveDateFilters);
      } else {
        const newActiveDateFilters = {
          ...activeDateFilters,
          [segmentNo]: [...activeDateFilters[segmentNo], value],
        };

        onSetActiveTicketDatesFilters(newActiveDateFilters);
      }
    }
  };

  return (
    <FilterItem
      title={title}
      isActive={isOpen}
      onClick={() => onToggle(timeFilterId)}
    >
      <SliderRange
        minRange={minDeparture}
        maxRange={maxDeparture}
        minValue={minTicketTimeDepartureValue}
        maxValue={maxTicketTimeDepartureValue}
        onChangeMinValue={handleChangeMinDepartureValue}
        onChangeMaxValue={handleChangeMaxDepartureValue}
        leftValue="Отправление"
        rightValue={`${msToTime(minTicketTimeDepartureValue)}-${msToTime(
          maxTicketTimeDepartureValue
        )}`}
        step={STEP}
      />
      <SliderRange
        minRange={minArrival}
        maxRange={maxArrival}
        minValue={minTicketTimeArrivalValue}
        maxValue={maxTicketTimeArrivalValue}
        onChangeMinValue={handleChangeMinArrivalValue}
        onChangeMaxValue={handleChangeMaxArrivalValue}
        leftValue="Прибытие"
        rightValue={`${msToTime(minTicketTimeArrivalValue)}-${msToTime(
          maxTicketTimeArrivalValue
        )}`}
        step={STEP}
      />

      <div className="filter-subheader">
        <h3 className="accordion__title">Дата прибытия</h3>
      </div>

      <List>
        {checkboxes &&
          checkboxes.map((checkbox) => {
            const { id, label, value } = checkbox;

            return (
              <ListItem key={id}>
                <Checkbox
                  id={id}
                  label={label}
                  checked={
                    !!activeDateFilters &&
                    activeDateFilters[segmentNo].includes(value)
                  }
                  onChange={() => handleClickCheckbox(value)}
                />
              </ListItem>
            );
          })}
      </List>
    </FilterItem>
  );
};

export default TicketTimeFilter;
