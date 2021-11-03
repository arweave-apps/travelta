import React, { SetStateAction, useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { CurrencyType } from '../../redux/reducers/settings';

import TransferFilter from './TransferFilter';
import PriceFilter from './PriceFilter';
import AirlineFilter from './AirlineFilter';
import Panel from '../Panel';

import './Filters.scss';
import {
  getActiveForm,
  getFiltersLimits,
  getFormSegments,
} from '../../selectors/selectors';
import getNounDeclension from '../../utils/getNounDeclension';
import TicketTimeFilter from './TicketTimeFilter';
import {
  ActiveAirlinesFilters,
  ActiveTicketDateFilters,
  ActiveTicketTimeFilters,
  ActiveTransfersFilters,
} from '../../pages/Search/Search';
import { getFormattedStringDate } from '../../utils/dateUtils';
import { ArrivalDatesType, DateTimestamp } from '../../redux/reducers/tickets';
import { KeysArray } from '../../interfaces/types';

type FiltersProps = {
  activeTransfersFilters: ActiveTransfersFilters;
  activeAirlinesFilters: ActiveAirlinesFilters;
  activeTicketDatesFilters: ActiveTicketDateFilters | null;
  onActiveTransfersFilters: React.Dispatch<
    SetStateAction<ActiveTransfersFilters>
  >;
  onActivePriceFilters: React.Dispatch<
    SetStateAction<ActivePriceFilters | null>
  >;
  onActiveAirlinesFilters: React.Dispatch<
    SetStateAction<ActiveAirlinesFilters>
  >;
  onActiveTicketTimeFilter: React.Dispatch<
    SetStateAction<ActiveTicketTimeFilters | null>
  >;
  onActiveTicketDatesFilters: React.Dispatch<
    SetStateAction<ActiveTicketDateFilters | null>
  >;
  currency: CurrencyType;
};

export type TransferCheckboxesDataType = {
  id: string;
  label: string;
  value: number;
};

export type DateCheckboxesType = {
  id: string;
  label: string;
  value: DateTimestamp;
};

type DateCheckboxesDataType = Record<string, DateCheckboxesType[]>;

export type ActivePriceFilters = Record<'minPrice' | 'maxPrice', number>;

export type OpenFiltersType =
  | 'transferFilter'
  | 'priceFilter'
  | 'airlineFilter'
  | string;

type TicketTimeValue = {
  departureTime: number[];
  arrivalTime: number[];
};

export type TicketTimeValues = Record<string, TicketTimeValue>;

const TICKET_TIME_MIN = 0; // start ms
const TICKET_TIME_MAX = 86400000; // ms in 24 hours

const getInitialTimeFiltersValues = (arrivalDates: ArrivalDatesType) => {
  const res = {} as TicketTimeValues;

  const keys = Object.keys(arrivalDates) as KeysArray<ArrivalDatesType>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    res[key] = {
      departureTime: [TICKET_TIME_MIN, TICKET_TIME_MAX],
      arrivalTime: [TICKET_TIME_MIN, TICKET_TIME_MAX],
    };
  }

  return res;
};

const Filters = ({
  activeTransfersFilters,
  activeAirlinesFilters,
  activeTicketDatesFilters,
  onActiveTransfersFilters,
  onActivePriceFilters,
  onActiveAirlinesFilters,
  onActiveTicketTimeFilter,
  onActiveTicketDatesFilters,
  currency,
}: FiltersProps): JSX.Element => {
  const [openFiltersList, setOpenFiltersList] = useState<OpenFiltersType[]>([]);
  const {
    transfersRange,
    priceRange,
    airlines,
    arrivalDates,
    ticketSegmentsInfo,
  } = useSelector(getFiltersLimits);
  const formSegments = useSelector(getFormSegments);
  const activeForm = useSelector(getActiveForm);

  const [minCurrentPriceValue, setMinCurrentPriceValue] = useState<number>(
    priceRange.minPrice
  );

  const [maxCurrentPriceValue, setMaxCurrentPriceValue] = useState<number>(
    priceRange.maxPrice
  );

  const [
    ticketTimeValues,
    setTicketTimeValues,
  ] = useState<TicketTimeValues | null>(null);

  const [transferCheckboxes, setTransferCheckboxes] = useState<
    TransferCheckboxesDataType[]
  >([]);

  const [
    dateCheckboxes,
    setDateCheckboxes,
  ] = useState<DateCheckboxesDataType | null>(null);

  useEffect(() => {
    const checkboxesData = [];

    for (let num = transfersRange.min; num <= transfersRange.max; num++) {
      const label =
        num === 0
          ? 'без пересадок'
          : `${num} ${getNounDeclension(num, [
              'пересадка',
              'пересадки',
              'пересадок',
            ])}`;

      const checkboxData = {
        id: `${num}-transfer-checkbox`,
        label,
        value: num,
      };

      checkboxesData.push(checkboxData);
    }

    setTransferCheckboxes(checkboxesData);
  }, [transfersRange.max, transfersRange.min]);

  useEffect(() => {
    if (!arrivalDates) {
      return;
    }

    const initialTicketTimeValues = getInitialTimeFiltersValues(arrivalDates);
    setTicketTimeValues(initialTicketTimeValues);
  }, [arrivalDates, formSegments]);

  useEffect(() => {
    if (!arrivalDates) {
      return;
    }

    const checkboxesData = {} as DateCheckboxesDataType;

    const keys = Object.keys(arrivalDates) as KeysArray<ArrivalDatesType>;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const checkboxData = arrivalDates[key].map((timestamp, k) => {
        return {
          id: `${key}/${k}-date-checkbox`,
          label: getFormattedStringDate(new Date(timestamp)),
          value: timestamp,
        };
      });

      checkboxesData[key] = checkboxData.sort((a, b) => a.value - b.value);
    }

    setDateCheckboxes(checkboxesData);
  }, [arrivalDates]);

  const handleToggleActiveFilterItem = useCallback(
    (id: OpenFiltersType) => {
      const idx = openFiltersList.indexOf(id);

      if (idx === -1) {
        setOpenFiltersList([...openFiltersList, id]);
      } else {
        setOpenFiltersList([
          ...openFiltersList.slice(0, idx),
          ...openFiltersList.slice(idx + 1),
        ]);
      }
    },
    [openFiltersList]
  );

  const handleClearAllFilters = () => {
    onActiveTransfersFilters(
      transferCheckboxes.map((checkbox) => checkbox.value)
    );
    onActivePriceFilters({
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
    });
    setMinCurrentPriceValue(priceRange.minPrice);
    setMaxCurrentPriceValue(priceRange.maxPrice);
    onActiveAirlinesFilters([...airlines]);

    if (arrivalDates) {
      const initialTicketTimeValues = getInitialTimeFiltersValues(arrivalDates);
      setTicketTimeValues(initialTicketTimeValues);
    }

    if (dateCheckboxes) {
      const chxKeys = Object.keys(
        dateCheckboxes
      ) as KeysArray<DateCheckboxesDataType>;

      const activeCheckboxes = chxKeys.reduce((acc, key) => {
        const checkboxes = dateCheckboxes[key];

        acc[key] = checkboxes.map(({ value }) => value);

        return acc;
      }, {} as ActiveTicketDateFilters);

      onActiveTicketDatesFilters(activeCheckboxes);
    }
  };

  return (
    <Panel className="filters">
      <div className="filters__header">
        <h3 className="filters__title">Фильтры</h3>

        <button
          type="button"
          className="filters__button-clear-all"
          onClick={handleClearAllFilters}
        >
          очистить всё
        </button>
      </div>

      <TransferFilter
        isOpen={openFiltersList.includes('transferFilter')}
        onToggle={handleToggleActiveFilterItem}
        activeFilters={activeTransfersFilters}
        onSetActiveFilters={onActiveTransfersFilters}
        checkboxes={transferCheckboxes}
      />

      <PriceFilter
        isOpen={openFiltersList.includes('priceFilter')}
        onToggle={handleToggleActiveFilterItem}
        onSetActiveFilters={onActivePriceFilters}
        currency={currency}
        min={priceRange.minPrice}
        max={priceRange.maxPrice}
        minCurrentPriceValue={minCurrentPriceValue}
        maxCurrentPriceValue={maxCurrentPriceValue}
        onMinCurrentPriceValue={setMinCurrentPriceValue}
        onMaxCurrentPriceValue={setMaxCurrentPriceValue}
      />

      <AirlineFilter
        isOpen={openFiltersList.includes('airlineFilter')}
        onToggle={handleToggleActiveFilterItem}
        activeFilters={activeAirlinesFilters}
        onSetActiveFilters={onActiveAirlinesFilters}
        airlines={airlines}
      />

      {ticketTimeValues &&
        ticketSegmentsInfo.length > 0 &&
        ticketSegmentsInfo.map(({ segmentNo, cityCodes, cityNames }, i) => {
          const preTitle = i === 0 ? 'Вылет в' : 'Обратно в';

          const title =
            activeForm === 'roundtrip' || activeForm === 'oneWay'
              ? `${preTitle} ${cityNames.arrivalCityName}`
              : `${cityCodes.departureCityCode}-${cityCodes.arrivalCityCode}`;

          const checkboxes = dateCheckboxes && dateCheckboxes[segmentNo];

          return (
            <TicketTimeFilter
              key={`ticketTime-${segmentNo}`}
              segmentNo={segmentNo}
              ticketTimeValues={ticketTimeValues}
              title={title}
              isOpen={openFiltersList.includes(`ticketTime-${segmentNo}`)}
              timeFilterId={`ticketTime-${segmentNo}`}
              onToggle={handleToggleActiveFilterItem}
              onSetActiveTimeFilters={onActiveTicketTimeFilter}
              minDeparture={TICKET_TIME_MIN}
              maxDeparture={TICKET_TIME_MAX}
              minTicketTimeDepartureValue={
                ticketTimeValues[segmentNo].departureTime[0]
              }
              maxTicketTimeDepartureValue={
                ticketTimeValues[segmentNo].departureTime[1]
              }
              minArrival={TICKET_TIME_MIN}
              maxArrival={TICKET_TIME_MAX}
              minTicketTimeArrivalValue={
                ticketTimeValues[segmentNo].arrivalTime[0]
              }
              maxTicketTimeArrivalValue={
                ticketTimeValues[segmentNo].arrivalTime[1]
              }
              onSetTicketTimeValues={setTicketTimeValues}
              checkboxes={checkboxes}
              activeDateFilters={activeTicketDatesFilters}
              onSetActiveTicketDatesFilters={onActiveTicketDatesFilters}
            />
          );
        })}
    </Panel>
  );
};

export default Filters;
