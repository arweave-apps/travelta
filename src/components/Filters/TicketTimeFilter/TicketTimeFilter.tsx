import React, { useCallback, useEffect } from 'react';

import { ActiveTicketTimeFilters } from '../../../pages/Search/Search';
import { msToTime } from '../../../utils/dateUtils';

import SliderRange from '../../SliderRange';
import FilterItem from '../FilterItem';
import { OpenFiltersType, TicketTimeValues } from '../Filters';

type TicketTimeFilterProps = {
  route: string;
  ticketTimeValues: TicketTimeValues;
  title: string;
  id: OpenFiltersType;
  isOpen: boolean;
  onToggle: (id: OpenFiltersType) => void;
  onSetActiveFilters: (filters: ActiveTicketTimeFilters) => void;
  minDeparture: number;
  maxDeparture: number;
  minTicketTimeDepartureValue: number;
  maxTicketTimeDepartureValue: number;
  minArrival: number;
  maxArrival: number;
  minTicketTimeArrivalValue: number;
  maxTicketTimeArrivalValue: number;
  onSetTicketTimeValues: (newValues: TicketTimeValues) => void;
};

const STEP = 1800000; // ms in 30 min

type ChangedValues = {
  departureTime: number[];
  arrivalTime: number[];
};

const upadateValues = (
  route: string,
  ticketTimeValues: TicketTimeValues,
  changedValues: ChangedValues
) => {
  return Object.entries(ticketTimeValues).reduce(
    (acc: TicketTimeValues, [currentKey, currentValues]) => {
      if (currentKey === route) {
        acc[currentKey] = changedValues;
      } else {
        acc[currentKey] = currentValues;
      }

      return acc;
    },
    {}
  );
};

const TicketTimeFilter = ({
  route,
  ticketTimeValues,
  title,
  id,
  isOpen,
  onToggle,
  onSetActiveFilters,
  minDeparture,
  maxDeparture,
  minTicketTimeDepartureValue,
  maxTicketTimeDepartureValue,
  minArrival,
  maxArrival,
  minTicketTimeArrivalValue,
  maxTicketTimeArrivalValue,
  onSetTicketTimeValues,
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
        ...ticketTimeValues[route],
        departureTime: [value, ticketTimeValues[route].departureTime[1]],
      };

      const newValues = upadateValues(route, ticketTimeValues, changedValues);

      onSetTicketTimeValues(newValues);
    },
    [
      maxTicketTimeDepartureValue,
      onSetTicketTimeValues,
      route,
      ticketTimeValues,
    ]
  );

  const handleChangeMaxDeaprtureValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!ticketTimeValues) {
        return;
      }

      const value = Math.max(
        +e.target.value,
        minTicketTimeDepartureValue + STEP
      );

      const changedValues = {
        ...ticketTimeValues[route],
        departureTime: [ticketTimeValues[route].departureTime[0], value],
      };

      const newValues = upadateValues(route, ticketTimeValues, changedValues);

      onSetTicketTimeValues(newValues);
    },
    [
      minTicketTimeDepartureValue,
      onSetTicketTimeValues,
      route,
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
        ...ticketTimeValues[route],
        arrivalTime: [value, ticketTimeValues[route].arrivalTime[1]],
      };

      const newValues = upadateValues(route, ticketTimeValues, changedValues);

      onSetTicketTimeValues(newValues);
    },
    [maxTicketTimeArrivalValue, onSetTicketTimeValues, route, ticketTimeValues]
  );

  const handleChangeMaxArrivalValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!ticketTimeValues) {
        return;
      }

      const value = Math.max(+e.target.value, minTicketTimeArrivalValue + STEP);

      const changedValues = {
        ...ticketTimeValues[route],
        arrivalTime: [ticketTimeValues[route].arrivalTime[0], value],
      };

      const newValues = upadateValues(route, ticketTimeValues, changedValues);

      onSetTicketTimeValues(newValues);
    },
    [minTicketTimeArrivalValue, onSetTicketTimeValues, route, ticketTimeValues]
  );

  useEffect(() => {
    onSetActiveFilters(ticketTimeValues);
  }, [onSetActiveFilters, ticketTimeValues]);

  return (
    <FilterItem title={title} isActive={isOpen} onClick={() => onToggle(id)}>
      <SliderRange
        minRange={minDeparture}
        maxRange={maxDeparture}
        minValue={minTicketTimeDepartureValue}
        maxValue={maxTicketTimeDepartureValue}
        onChangeMinValue={handleChangeMinDepartureValue}
        onChangeMaxValue={handleChangeMaxDeaprtureValue}
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
    </FilterItem>
  );
};

export default TicketTimeFilter;
