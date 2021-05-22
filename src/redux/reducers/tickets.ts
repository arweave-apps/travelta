import {
  ActionSearchTypes,
  SET_TICKETS,
  Ticket,
} from '../actions/tickets/types';

const initialState = {
  tickets: [],
};

export type InitialSearchStateType = {
  tickets: Ticket[] | [];
};

export const ticketsReducer = (
  state: InitialSearchStateType = initialState,
  action: ActionSearchTypes
): InitialSearchStateType => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case SET_TICKETS:
      return { ...state, tickets: action.payload };

    default:
      return state;
  }
};
