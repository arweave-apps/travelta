import { convertData, ConvertedTickets } from '../../utils/convertTickets';
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

const initialState = {
  tickets: {},
  ticketsList: [],
  transfersRange: {},
  loading: false,
  error: null,
};

export type InitialSearchStateType = {
  tickets: ConvertedTickets;
  ticketsList: string[] | never[];
  transfersRange: TransfersRange;
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

      const transfersRange = ticketsList.reduce(
        (acc: TransfersRange, currTicketId) => {
          const { segments } = tickets[currTicketId];
          const transfers = trunsfersInTicket(segments);

          const min = Math.min(...transfers);
          const max = Math.max(...transfers);

          if (
            !Object.prototype.hasOwnProperty.call(acc, 'min') &&
            !Object.prototype.hasOwnProperty.call(acc, 'max')
          ) {
            acc.min = min;
            acc.max = max;

            return acc;
          }

          acc.min = acc.min > min ? min : acc.min;
          acc.max = acc.max < max ? max : acc.max;

          return acc;
        },
        {}
      );

      return {
        ...state,
        loading: false,
        transfersRange,
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
      return {
        tickets: {},
        ticketsList: [],
        transfersRange: {},
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
