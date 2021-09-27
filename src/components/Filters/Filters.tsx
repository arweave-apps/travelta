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
import { ActiveTicketTimeFilters } from '../../pages/Search/Search';
import { FormSegments } from '../../redux/reducers/aviaParams';
import { FormsType } from '../../redux/reducers/pageSettings';

type FiltersProps = {
  activeTransfersFilters: number[];
  activeAirlinesFilters: string[];
  onActiveTransfersFilters: React.Dispatch<SetStateAction<number[]>>;
  onActivePriceFilters: React.Dispatch<
    SetStateAction<ActivePriceFilters | null>
  >;
  onActiveAirlinesFilters: React.Dispatch<SetStateAction<string[]>>;
  onActiveTicketTimeFilter: React.Dispatch<
    SetStateAction<ActiveTicketTimeFilters | null>
  >;
  currency: CurrencyType;
};

export type TransferCheckboxsDataType = {
  id: string;
  label: string;
  value: number;
};

export type ActivePriceFilters = Record<'minPrice' | 'maxPrice', number>;

export type OpenFiltersType =
  | 'transferFilter'
  | 'priceFilter'
  | 'airlineFilter'
  | string;

export type TicketTimeValues = {
  [key: string]: {
    departureTime: number[];
    arrivalTime: number[];
  };
};

const TICKET_TIME_MIN = 0; // start ms
const TICKET_TIME_MAX = 86400000; // ms in 24 hours

const getInitialTimeFiltersValues = (
  formSegments: FormSegments,
  activeForm: FormsType
) => {
  const res: TicketTimeValues = {};

  for (let i = 0; i < formSegments.length; i++) {
    const segment = formSegments[i];

    res[`${segment.originCode}-${segment.destinationCode}`] = {
      departureTime: [TICKET_TIME_MIN, TICKET_TIME_MAX],
      arrivalTime: [TICKET_TIME_MIN, TICKET_TIME_MAX],
    };

    if (activeForm === 'roundtrip') {
      res[`${segment.destinationCode}-${segment.originCode}`] = {
        departureTime: [TICKET_TIME_MIN, TICKET_TIME_MAX],
        arrivalTime: [TICKET_TIME_MIN, TICKET_TIME_MAX],
      };
    }
  }

  return res;
};

const Filters = ({
  activeTransfersFilters,
  activeAirlinesFilters,
  onActiveTransfersFilters,
  onActivePriceFilters,
  onActiveAirlinesFilters,
  onActiveTicketTimeFilter,
  currency,
}: FiltersProps): JSX.Element => {
  const [openFiltersList, setOpenFiltersList] = useState<OpenFiltersType[]>([]);
  const { transfersRange, priceRange, airlines } = useSelector(
    getFiltersLimits
  );
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
    TransferCheckboxsDataType[]
  >([]);

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
    const initialTicketTimeValues = getInitialTimeFiltersValues(
      formSegments,
      activeForm
    );
    setTicketTimeValues(initialTicketTimeValues);
  }, [activeForm, formSegments]);

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

    const initialTicketTimeValues = getInitialTimeFiltersValues(
      formSegments,
      activeForm
    );
    setTicketTimeValues(initialTicketTimeValues);
    setTicketTimeValues(initialTicketTimeValues);
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
        formSegments.length > 0 &&
        formSegments.map((formSegment) => {
          const routeKey = `${formSegment.originCode}-${formSegment.destinationCode}`;
          const returnRouteKey = `${formSegment.destinationCode}-${formSegment.originCode}`;

          return (
            <React.Fragment key={`ticketTime-${formSegment.id}`}>
              <TicketTimeFilter
                route={routeKey}
                ticketTimeValues={ticketTimeValues}
                title={`Время ${routeKey}`}
                isOpen={openFiltersList.includes(
                  `ticketTime-${formSegment.id}`
                )}
                id={`ticketTime-${formSegment.id}`}
                onToggle={handleToggleActiveFilterItem}
                onSetActiveFilters={onActiveTicketTimeFilter}
                minDeparture={TICKET_TIME_MIN}
                maxDeparture={TICKET_TIME_MAX}
                minTicketTimeDepartureValue={
                  ticketTimeValues[routeKey].departureTime[0]
                }
                maxTicketTimeDepartureValue={
                  ticketTimeValues[routeKey].departureTime[1]
                }
                minArrival={TICKET_TIME_MIN}
                maxArrival={TICKET_TIME_MAX}
                minTicketTimeArrivalValue={
                  ticketTimeValues[routeKey].arrivalTime[0]
                }
                maxTicketTimeArrivalValue={
                  ticketTimeValues[routeKey].arrivalTime[1]
                }
                onSetTicketTimeValues={setTicketTimeValues}
              />

              {activeForm === 'roundtrip' && (
                <TicketTimeFilter
                  route={returnRouteKey}
                  ticketTimeValues={ticketTimeValues}
                  title={`Время ${returnRouteKey}`}
                  isOpen={openFiltersList.includes(
                    `ticketTime-${formSegment.id}-${activeForm}`
                  )}
                  id={`ticketTime-${formSegment.id}-${activeForm}`}
                  onToggle={handleToggleActiveFilterItem}
                  onSetActiveFilters={onActiveTicketTimeFilter}
                  minDeparture={TICKET_TIME_MIN}
                  maxDeparture={TICKET_TIME_MAX}
                  minTicketTimeDepartureValue={
                    ticketTimeValues[returnRouteKey].departureTime[0]
                  }
                  maxTicketTimeDepartureValue={
                    ticketTimeValues[returnRouteKey].departureTime[1]
                  }
                  minArrival={TICKET_TIME_MIN}
                  maxArrival={TICKET_TIME_MAX}
                  minTicketTimeArrivalValue={
                    ticketTimeValues[returnRouteKey].arrivalTime[0]
                  }
                  maxTicketTimeArrivalValue={
                    ticketTimeValues[returnRouteKey].arrivalTime[1]
                  }
                  onSetTicketTimeValues={setTicketTimeValues}
                />
              )}
            </React.Fragment>
          );
        })}
    </Panel>
  );
};

export default Filters;
