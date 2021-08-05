import { Ticket } from '../../../interfaces/tickets';
import { Prediction, PriceSortTypes } from '../../reducers/tickets';

export const SET_TICKETS = 'SET_TICKETS';
export const SET_MULTI_TICKETS = 'SET_MULTI_TICKETS';
export const FETCH_TICKETS_REQUESTED = 'FETCH_TICKETS_REQUESTED';
export const FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR';

export const SET_CARRIERS = 'SET_CARRIERS';

export const SET_PREDICTIONS = 'SET_PREDICTIONS';
export const SORT_TICKETS_BY_PRICE = 'SORT_TICKETS_BY_PRICE';

export type ActionSortTicketsByPrice = {
  type: typeof SORT_TICKETS_BY_PRICE;
  payload: PriceSortTypes;
};

export type ActionSetTicketsType = {
  type: typeof SET_TICKETS;
  payload: { tickets: Ticket[] | []; isMulti: boolean };
};

export type ActionSetPredictionsType = {
  type: typeof SET_PREDICTIONS;
  payload: Prediction[];
};

export type ActionTicketsRequestedType = {
  type: typeof FETCH_TICKETS_REQUESTED;
};

export type ActionTicketsErrorsType = {
  type: typeof FETCH_TICKETS_ERROR;
  payload: Error;
};

export type Carrier = {
  id: string;
  lcc: null | number;
  name: string;
  type: string;
};

export type ActionCarriersType = {
  type: typeof SET_CARRIERS;
  payload: Carrier[];
};

export type ActionSearchTypes =
  | ActionSetTicketsType
  | ActionTicketsRequestedType
  | ActionTicketsErrorsType
  | ActionCarriersType
  | ActionSetPredictionsType
  | ActionSortTicketsByPrice;
