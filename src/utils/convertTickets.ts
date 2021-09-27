/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import {
  Baglimit,
  BagsPrice,
  CountryFrom,
  CountryTo,
  Route,
  RouteMulti,
  RoutesItem,
  Ticket,
  TicketMulti,
  TicketSearch,
} from '../interfaces/tickets';

function isTicketSearchId(ticket: Ticket): ticket is TicketSearch {
  return Object.prototype.hasOwnProperty.call(ticket as TicketSearch, 'id');
}

const getIdFromMultiRoutes = (routes: RouteMulti[]) =>
  routes.map((currRoute) => currRoute.id).join('|');

export type TicketsList = string[];

type TicketsSearchArrangedById = Record<string, TicketSearch>;
type TicketsMultiArrangedById = Record<string, TicketMulti>;

type TicketsArrangedById = TicketsSearchArrangedById | TicketsMultiArrangedById;

const ticketsArrangedById = (data: Ticket[], isMulti = false) => {
  return data.reduce((acc: TicketsArrangedById, currTicket) => {
    if (isTicketSearchId(currTicket) && !isMulti) {
      acc[currTicket.id] = currTicket;
    } else if (!isTicketSearchId(currTicket) && isMulti) {
      acc[getIdFromMultiRoutes(currTicket.route)] = currTicket;
    }

    return acc;
  }, {});
};

const createFlight = (route: Route): Flight => {
  const {
    cityFrom,
    flyFrom,
    local_departure,
    cityTo,
    flyTo,
    local_arrival,
    flight_no,
    fare_category,
    airline,
    bags_recheck_required,
  } = route;

  return {
    departure: {
      city: cityFrom,
      code: flyFrom,
      date: local_departure,
    },

    arrival: {
      city: cityTo,
      code: flyTo,
      date: local_arrival,
    },

    flightNo: flight_no,
    fareFcategory: fare_category,
    airline,
    bagsRecheck: bags_recheck_required,
  };
};

const getFlights = (route: Route[], currRouteArr: RoutesItem) => {
  let routeStarted = false;
  const [fromCityCode, toCityCode] = currRouteArr;

  return route.reduce((acc: Flight[], currRoute) => {
    if (currRoute.flyFrom === fromCityCode) {
      routeStarted = true;
    }

    if (routeStarted) {
      acc.push(createFlight(currRoute));
    }

    if (currRoute.flyTo === toCityCode) {
      routeStarted = false;
    }

    return acc;
  }, []);
};

const getTransfers = (route: Route[], currRouteArr: RoutesItem) => {
  let transfer = {} as Transfer;
  let routeStarted = false;
  let prevAirportCode = '';
  const [fromCityCode, toCityCode] = currRouteArr;

  return route.reduce((acc: Transfer[], currRoute) => {
    if (currRoute.flyFrom === fromCityCode) {
      routeStarted = true;
    }

    if (currRoute.flyFrom === prevAirportCode && routeStarted) {
      transfer.departure = {
        city: currRoute.cityFrom,
        code: currRoute.flyFrom,
        date: currRoute.local_departure,
        flightNo: currRoute.flight_no,
        airline: currRoute.airline,
      };

      transfer.id += currRoute.id;

      acc.push(transfer);
      transfer = {} as Transfer;
    }

    if (currRoute.flyTo !== toCityCode && routeStarted) {
      prevAirportCode = currRoute.flyTo;

      transfer.arrival = {
        city: currRoute.cityTo,
        code: currRoute.flyTo,
        date: currRoute.local_arrival,
        flightNo: currRoute.flight_no,
        airline: currRoute.airline,
      };

      transfer.id = `${currRoute.id}|`;
    }

    if (currRoute.flyTo === toCityCode) {
      routeStarted = false;
    }

    return acc;
  }, []);
};

const getTicketsWithSegments = (tickets: TicketsSearchArrangedById) => {
  return Object.entries(tickets).reduce(
    (acc: ConvertedTickets, [id, ticket]) => {
      const {
        duration,
        countryFrom,
        countryTo,
        price,
        route,
        routes,
        airlines,
        deep_link,
        bags_price,
        baglimit,
        cityCodeFrom,
        cityCodeTo,
        cityFrom,
        cityTo,
      } = ticket;

      const segments = routes.map((currRouteArr, i) => {
        const flights = getFlights(route, currRouteArr);
        const transfers = getTransfers(route, currRouteArr);

        const flightDuration = i === 0 ? duration.departure : duration.return;
        const departureCityCode = i === 0 ? cityCodeFrom : cityCodeTo;
        const arrivalCityCode = i === 0 ? cityCodeTo : cityCodeFrom;

        const departureCityName = i === 0 ? cityFrom : cityTo;
        const arrivalCityName = i === 0 ? cityTo : cityFrom;

        return {
          id: uuidv4(),
          cityCodes: { departureCityCode, arrivalCityCode },
          cityNames: { departureCityName, arrivalCityName },
          flights,
          transfers,
          duration: flightDuration,
          country: { countryFrom, countryTo },
          bags: { bags_price, baglimit },
        };
      });

      acc[id] = {
        segments,
        airlines,
        price,
        deep_link,
      };

      return acc;
    },
    {}
  );
};

const getMultiTicketsWithSegments = (tickets: TicketsMultiArrangedById) => {
  return Object.entries(tickets).reduce(
    (acc: ConvertedTickets, [id, ticket]) => {
      const { price, route, deep_link } = ticket;
      const airlines: string[][] = [];

      const segments = route.map((currRoute) => {
        const {
          duration,
          countryFrom,
          countryTo,
          // eslint-disable-next-line no-shadow
          route,
          routes,
          airlines: routeAirlines,
          bags_price,
          baglimit,
          cityCodeFrom,
          cityCodeTo,
          cityFrom,
          cityTo,
        } = currRoute;

        airlines.push(routeAirlines);

        const flights = getFlights(route, routes[0]);
        const transfers = getTransfers(route, routes[0]);

        const flightDuration = duration.departure;

        return {
          id: uuidv4(),
          cityCodes: {
            departureCityCode: cityCodeFrom,
            arrivalCityCode: cityCodeTo,
          },
          cityNames: { departureCityName: cityFrom, arrivalCityName: cityTo },
          flights,
          transfers,
          duration: flightDuration,
          country: { countryFrom, countryTo },
          bags: { bags_price, baglimit },
        };
      });

      acc[id] = {
        segments,
        airlines: airlines.flat(),
        price,
        deep_link,
      };

      return acc;
    },
    {}
  );
};

type Country = {
  countryFrom: CountryFrom;
  countryTo: CountryTo;
};

type Bags = {
  bags_price: BagsPrice;
  baglimit: Baglimit;
};

type FlightPoint = {
  city: string;
  code: string;
  date: string;
};

type Flight = {
  departure: FlightPoint;
  arrival: FlightPoint;
  flightNo: number;
  fareFcategory: string;
  airline: string;
  bagsRecheck: boolean;
};

type TransferPoint = {
  city: string;
  code: string;
  date: string;
  flightNo: number;
  airline: string;
};

type Transfer = {
  departure: TransferPoint;
  arrival: TransferPoint;
  id: string;
};

type CityNames = {
  departureCityName: string;
  arrivalCityName: string;
};
type CityCodes = {
  departureCityCode: string;
  arrivalCityCode: string;
};

export type Segment = {
  id: string;
  flights: Flight[];
  transfers: Transfer[];
  duration: number;
  country: Country;
  cityCodes: CityCodes;
  cityNames: CityNames;
  bags: Bags;
};

export type TicketsWithSegments = {
  segments: Segment[];
  price: number;
  airlines: string[];
  deep_link: string;
};

export type ConvertedTickets = Record<string, TicketsWithSegments>;

export type ConvertedData = {
  ticketsList: string[];
  tickets: ConvertedTickets;
};

function isTicketsSearchArrangedById(
  tickets: TicketsArrangedById
): tickets is TicketsSearchArrangedById {
  return Object.prototype.hasOwnProperty.call(
    Object.entries(tickets)[0][1] as TicketsSearchArrangedById,
    'id'
  );
}

export const convertData = (
  data: Ticket[],
  isMulti: boolean
): ConvertedData => {
  if (data.length === 0) {
    return {
      ticketsList: [],
      tickets: {},
    };
  }

  const tickets = ticketsArrangedById(data, isMulti);

  let newTickets = {};

  if (isMulti && !isTicketsSearchArrangedById(tickets)) {
    newTickets = getMultiTicketsWithSegments(tickets);
  } else if (!isMulti && isTicketsSearchArrangedById(tickets)) {
    newTickets = getTicketsWithSegments(tickets);
  }

  const ticketsList = Object.keys(tickets);

  return {
    ticketsList,
    tickets: newTickets,
  };
};
