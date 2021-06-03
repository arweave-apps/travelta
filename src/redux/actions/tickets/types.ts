import { Ticket } from '../../../interfaces/tickets';

export const SET_TICKETS = 'SET_TICKETS';
export const FETCH_TICKETS_REQUESTED = 'FETCH_TICKETS_REQUESTED';
export const FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR';

export type ActionSetTicketsType = {
  type: typeof SET_TICKETS;
  payload: { tickets: Ticket[] | []; isMulti: boolean };
};

export type ActionTicketsRequestedType = {
  type: typeof FETCH_TICKETS_REQUESTED;
};

export type ActionTicketsErrorsType = {
  type: typeof FETCH_TICKETS_ERROR;
  payload: Error;
};

export type ActionSearchTypes =
  | ActionSetTicketsType
  | ActionTicketsRequestedType
  | ActionTicketsErrorsType;
