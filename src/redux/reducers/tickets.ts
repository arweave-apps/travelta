import { v4 as uuidv4 } from 'uuid';

import {
  convertData,
  ConvertedTickets,
  TicketsList,
} from '../../utils/convertTickets';
import trunsfersInTicket from '../../utils/ticketsUtils';

import {
  ActionSearchTypes,
  Carrier,
  FETCH_TICKETS_ERROR,
  FETCH_TICKETS_REQUESTED,
  SET_CARRIERS,
  SET_PREDICTIONS,
  SET_TICKETS,
} from '../actions/tickets/types';

export type TransfersRange =
  | Record<'min' | 'max', number>
  | Record<string, never>;

export type PriceRange =
  | Record<'minPrice' | 'maxPrice', number>
  | Record<string, never>;

export type FiltersLimits =
  | {
      transfersRange: TransfersRange;
      priceRange: PriceRange;
      airlines: string[];
    }
  | Record<string, never>;

const initialState = {
  tickets: {},
  ticketsList: [],
  predictions: [],
  filtersLimits: {},
  carriers: {},
  loading: false,
  error: null,
};

export type Carriers = Record<string, Carrier> | Record<string, never>;

export type PredictionWithId = {
  id: string;
  date: string;
  price: number;
};

export type Prediction = {
  date: string;
  price: number;
};

export type InitialSearchStateType = {
  tickets: ConvertedTickets;
  ticketsList: TicketsList;
  predictions: PredictionWithId[];
  filtersLimits: FiltersLimits;
  carriers: Carriers;
  loading: boolean;
  error: null | Error;
};

export const ticketsReducer = (
  state: InitialSearchStateType = initialState,
  action: ActionSearchTypes
): InitialSearchStateType => {
  switch (action.type) {
    case SET_TICKETS: {
      const { tickets: ticketsData, isMulti } = action.payload;
      const { tickets, ticketsList } = convertData(ticketsData, isMulti);

      const filtersLimits = ticketsList.reduce(
        (acc: FiltersLimits, currTicketId) => {
          const { segments, price, airlines } = tickets[currTicketId];
          const transfers = trunsfersInTicket(segments);

          const min = Math.min(...transfers);
          const max = Math.max(...transfers);

          if (Object.keys(acc).length === 0) {
            acc.transfersRange = {
              min,
              max,
            };
            acc.priceRange = {
              minPrice: price,
              maxPrice: price,
            };
            acc.airlines = airlines;

            return acc;
          }

          acc.transfersRange.min = Math.min(acc.transfersRange.min, min);
          acc.transfersRange.max = Math.max(acc.transfersRange.max, max);

          acc.priceRange.minPrice = Math.min(acc.priceRange.minPrice, price);
          acc.priceRange.maxPrice = Math.max(acc.priceRange.maxPrice, price);

          acc.airlines = Array.from(new Set(acc.airlines.concat(airlines)));

          return acc;
        },
        {}
      );

      return {
        ...state,
        loading: false,
        filtersLimits,
        tickets,
        ticketsList,
      };
    }

    case SET_PREDICTIONS: {
      const predictionsWithId = action.payload.map((prediction) => {
        return {
          ...prediction,
          id: uuidv4(),
        };
      });

      return {
        ...state,
        predictions: predictionsWithId,
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

    case FETCH_TICKETS_ERROR:
      return { ...initialState, loading: false, error: action.payload };

    default:
      return state;
  }
};
