import {
  convertData,
  ConvertedTickets,
  TicketsList,
  CityNames,
  CityCodes,
} from '../../utils/convertTickets';
import { getDateWithoutTime } from '../../utils/dateUtils';
import {
  getArrivalDatesBySegments,
  transfersInTicket,
} from '../../utils/ticketsUtils';

import {
  ActionSearchTypes,
  Carrier,
  FETCH_TICKETS_ERROR,
  FETCH_TICKETS_REQUESTED,
  SET_CARRIERS,
  SET_TICKETS,
  SORT_TICKETS_BY_PRICE,
} from '../actions/tickets/types';

export type TransfersRange =
  | Record<'min' | 'max', number>
  | Record<string, never>;

export type PriceRange =
  | Record<'minPrice' | 'maxPrice', number>
  | Record<string, never>;

export type SegmentNo =
  | 'segment-0'
  | 'segment-1'
  | 'segment-2'
  | 'segment-3'
  | 'segment-4'
  | 'segment-5';

export type DateTimestamp = number;
export type ArrivalDatesType = Record<SegmentNo, DateTimestamp[]>;

export type TicketSegmentsSummaryInfo = {
  segmentNo: SegmentNo;
  cityNames: CityNames;
  cityCodes: CityCodes;
};

export type FiltersLimits =
  | {
      transfersRange: TransfersRange;
      priceRange: PriceRange;
      airlines: string[];
      arrivalDates: ArrivalDatesType | null;
      ticketSegmentsInfo: TicketSegmentsSummaryInfo[];
    }
  | Record<string, never>;

const initialState: InitialSearchStateType = {
  tickets: {},
  ticketsList: [],
  filtersLimits: {},
  carriers: {},
  sortByPrice: 'lowPrice',
  loading: false,
  error: null,
};

export type PriceSortTypes = 'lowPrice' | 'heighPrice' | null;
export type Carriers = Record<string, Carrier> | Record<string, never>;

export type InitialSearchStateType = {
  tickets: ConvertedTickets;
  ticketsList: TicketsList;
  filtersLimits: FiltersLimits;
  sortByPrice: PriceSortTypes;
  carriers: Carriers;
  loading: boolean;
  error: null | Error;
};

const getSortedTicketsByPrice = (
  state: InitialSearchStateType,
  sortBy: PriceSortTypes
) => {
  const modifier = sortBy === 'lowPrice' ? 1 : -1;

  return [...state.ticketsList].sort((a, b) => {
    const ticketA = state.tickets[a];
    const ticketB = state.tickets[b];

    return modifier * (ticketA.price - ticketB.price);
  });
};

export const ticketsReducer = (
  state: InitialSearchStateType = initialState,
  action: ActionSearchTypes
): InitialSearchStateType => {
  switch (action.type) {
    case SET_TICKETS: {
      const { tickets: ticketsData, isMulti } = action.payload;
      const { tickets, ticketsList } = convertData(ticketsData, isMulti);

      const filtersLimits = ticketsList.reduce((acc, currTicketId) => {
        const { segments, price, airlines } = tickets[currTicketId];

        const transfers = transfersInTicket(segments);

        const min = Math.min(...transfers);
        const max = Math.max(...transfers);

        if (Object.keys(acc).length === 0) {
          acc.transfersRange = {
            min: 0,
            max: 0,
          };
          acc.priceRange = {
            minPrice: 0,
            maxPrice: 0,
          };
          acc.airlines = [];
          acc.arrivalDates = null;
          acc.ticketSegmentsInfo = [];
        }

        if (acc.ticketSegmentsInfo.length === 0) {
          acc.ticketSegmentsInfo = segments.map(
            ({ cityNames, cityCodes }, i) => {
              return {
                segmentNo: `segment-${i}` as SegmentNo,
                cityNames,
                cityCodes,
              };
            }
          );
        }

        const arrivalDatesBySegments = getArrivalDatesBySegments(segments);

        arrivalDatesBySegments.forEach((isoDate, i) => {
          const key = `segment-${i}` as SegmentNo;

          if (!acc.arrivalDates) {
            acc.arrivalDates = {} as ArrivalDatesType;
          }

          if (!Object.prototype.hasOwnProperty.call(acc.arrivalDates, key)) {
            acc.arrivalDates[key] = [];
          }

          const dateWithoutTime = getDateWithoutTime(
            new Date(isoDate)
          ).getTime();

          if (acc.arrivalDates) {
            acc.arrivalDates[key] = Array.from(
              new Set(acc.arrivalDates[key].concat(dateWithoutTime))
            );
          }
        });

        acc.transfersRange.min = Math.min(acc.transfersRange.min, min);
        acc.transfersRange.max = Math.max(acc.transfersRange.max, max);

        if (acc.priceRange.minPrice === 0) {
          acc.priceRange.minPrice = price;
        } else {
          acc.priceRange.minPrice = Math.min(acc.priceRange.minPrice, price);
        }
        acc.priceRange.maxPrice = Math.max(acc.priceRange.maxPrice, price);

        acc.airlines = Array.from(new Set(acc.airlines.concat(airlines)));

        return acc;
      }, {} as FiltersLimits);

      return {
        ...state,
        loading: false,
        filtersLimits,
        tickets,
        ticketsList,
      };
    }

    case FETCH_TICKETS_REQUESTED:
      return {
        ...state,
        loading: true,
        tickets: {},
        ticketsList: [],
        filtersLimits: {},
        error: null,
      };

    case SET_CARRIERS: {
      const carriersById = action.payload.reduce(
        (acc: Carriers, currAirline) => {
          const { id } = currAirline;
          acc[id] = currAirline;

          return acc;
        },
        {}
      );

      return {
        ...state,
        carriers: carriersById,
      };
    }

    case FETCH_TICKETS_ERROR: {
      return {
        ...state,
        tickets: {},
        ticketsList: [],
        filtersLimits: {},
        sortByPrice: 'lowPrice',
        loading: false,
        error: action.payload,
      };
    }

    case SORT_TICKETS_BY_PRICE: {
      return {
        ...state,
        ticketsList: getSortedTicketsByPrice(state, action.payload),
        sortByPrice: action.payload,
      };
    }

    default:
      return state;
  }
};
