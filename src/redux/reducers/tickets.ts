import {
  convertData,
  ConvertedTickets,
  TicketsList,
} from '../../utils/convertTickets';
import trunsfersInTicket from '../../utils/ticketsUtils';

import {
  ActionSearchTypes,
  FETCH_TICKETS_ERROR,
  FETCH_TICKETS_REQUESTED,
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
    }
  | Record<string, never>;

const initialState = {
  tickets: {},
  ticketsList: [],
  filtersLimits: {},
  loading: false,
  error: null,
};

export type InitialSearchStateType = {
  tickets: ConvertedTickets;
  ticketsList: TicketsList;
  filtersLimits: FiltersLimits;
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
          const { segments, price } = tickets[currTicketId];
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

            return acc;
          }

          acc.transfersRange.min = Math.min(acc.transfersRange.min, min);
          acc.transfersRange.max = Math.max(acc.transfersRange.max, max);

          acc.priceRange.minPrice = Math.min(acc.priceRange.minPrice, price);
          acc.priceRange.maxPrice = Math.max(acc.priceRange.maxPrice, price);

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

    case FETCH_TICKETS_ERROR:
      return { ...initialState, loading: false, error: action.payload };

    default:
      return state;
  }
};
