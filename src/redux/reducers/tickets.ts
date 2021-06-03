/* eslint-disable camelcase */
import { Ticket, Route, RouteMulti } from '../../interfaces/tickets';
import {
  ActionSearchTypes,
  FETCH_TICKETS_ERROR,
  FETCH_TICKETS_REQUESTED,
  SET_TICKETS,
} from '../actions/tickets/types';

const initialState = {
  tickets: [],
  loading: false,
  error: null,
};

export type InitialSearchStateType = {
  tickets: ConvertedTicket[] | [];
  loading: boolean;
  error: null | Error;
};

type ConvertedTicket = {
  price: number;
  link: string;
  route: Route[];
};

const convertTickets = (arr: Ticket[], isMulti: boolean) =>
  arr.reduce((acc: ConvertedTicket[], { price, deep_link, route }) => {
    let newRoute: Route[] = [];

    if (isMulti && isMultiRoute(route)) {
      newRoute = route.map((currRoute) => {
        return currRoute.route[0];
      });
    } else if (!isMultiRoute(route)) {
      newRoute = route;
    }

    const convertedTicket = {
      price,
      link: deep_link,
      route: newRoute,
    };

    acc.push(convertedTicket);
    return acc;
  }, []);

function isMultiRoute(route: RouteMulti[] | Route[]): route is RouteMulti[] {
  return Array.isArray((route as RouteMulti[])[0]?.route);
}

export const ticketsReducer = (
  state: InitialSearchStateType = initialState,
  action: ActionSearchTypes
): InitialSearchStateType => {
  switch (action.type) {
    case SET_TICKETS: {
      const { tickets, isMulti } = action.payload;

      return {
        ...state,
        loading: false,
        tickets: convertTickets(tickets, isMulti),
      };
    }
    case FETCH_TICKETS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TICKETS_ERROR:
      return {
        tickets: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
