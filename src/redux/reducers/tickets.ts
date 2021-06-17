import { convertData, ConvertedTickets } from '../../utils/convertTickets';

import {
  ActionSearchTypes,
  FETCH_TICKETS_ERROR,
  FETCH_TICKETS_REQUESTED,
  SET_TICKETS,
} from '../actions/tickets/types';

const initialState = {
  tickets: {},
  ticketsList: [],
  loading: false,
  error: null,
};

export type InitialSearchStateType = {
  tickets: ConvertedTickets;
  ticketsList: string[] | never[];
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

      return {
        ...state,
        loading: false,
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
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
