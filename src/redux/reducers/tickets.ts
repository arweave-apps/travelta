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
  SET_AIRLINES,
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
  filtersLimits: {},
  airlinesData: {},
  loading: false,
  error: null,
};

export type AirlinesData = Record<string, Carrier> | Record<string, never>;

export type InitialSearchStateType = {
  tickets: ConvertedTickets;
  ticketsList: TicketsList;
  filtersLimits: FiltersLimits;
  airlinesData: AirlinesData;
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

          if (
            !Object.prototype.hasOwnProperty.call(acc, 'transfersRange') &&
            !Object.prototype.hasOwnProperty.call(acc, 'priceRange')
          ) {
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

    case FETCH_TICKETS_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case SET_AIRLINES: {
      const airlinesById = action.payload.reduce(
        (acc: AirlinesData, currAirline) => {
          const { id } = currAirline;
          acc[id] = currAirline;

          return acc;
        },
        {}
      );

      return {
        ...state,
        airlinesData: airlinesById,
      };
    }

    case FETCH_TICKETS_ERROR:
      return { ...initialState, loading: false, error: action.payload };

    default:
      return state;
  }
};
