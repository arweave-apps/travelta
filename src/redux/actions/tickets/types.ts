import { Ticket } from '../../../interfaces/tickets';
import { Prediction } from '../../reducers/tickets';

export const SET_TICKETS = 'SET_TICKETS';
export const SET_MULTI_TICKETS = 'SET_MULTI_TICKETS';
export const FETCH_TICKETS_REQUESTED = 'FETCH_TICKETS_REQUESTED';
export const FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR';

export const SET_AIRLINES = 'SET_AIRLINES';

export const SET_PREDICTIONS = 'SET_PREDICTIONS';

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

export type ActionAirlinesType = {
  type: typeof SET_AIRLINES;
  payload: Carrier[];
};

export type ActionSearchTypes =
  | ActionSetTicketsType
  | ActionTicketsRequestedType
  | ActionTicketsErrorsType
  | ActionAirlinesType
  | ActionSetPredictionsType;
