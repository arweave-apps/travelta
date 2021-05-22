/* eslint-disable camelcase */
export const SET_TICKETS = 'SET_TICKETS';

export interface CountryFrom {
  code: string;
  name: string;
}

export interface CountryTo {
  code: string;
  name: string;
}

export interface Duration {
  departure: number;
  return: number;
  total: number;
}

export interface Conversion {
  EUR: number;
}

export interface BagsPrice {
  1: number;
}

export interface Baglimit {
  hand_height: number;
  hand_length: number;
  hand_weight: number;
  hand_width: number;
  hold_dimensions_sum: number;
  hold_height: number;
  hold_length: number;
  hold_weight: number;
  hold_width: number;
}

export interface Availability {
  seats: number;
}

export interface Route {
  id: string;
  combination_id: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityCodeFrom: string;
  cityTo: string;
  cityCodeTo: string;
  airline: string;
  flight_no: number;
  operating_carrier: string;
  operating_flight_no: string;
  fare_basis: string;
  fare_category: string;
  fare_classes: string;
  fare_family: string;
  return: number;
  bags_recheck_required: boolean;
  guarantee: boolean;
  last_seen: Date;
  refresh_timestamp: Date;
  equipment?: any;
  vehicle_type: string;
  local_arrival: Date;
  utc_arrival: Date;
  local_departure: Date;
  utc_departure: Date;
}

export interface Ticket {
  id: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityCodeFrom: string;
  cityTo: string;
  cityCodeTo: string;
  countryFrom: CountryFrom;
  countryTo: CountryTo;
  type_flights: string[];
  nightsInDest: number;
  quality: number;
  distance: number;
  duration: Duration;
  price: number;
  conversion: Conversion;
  bags_price: BagsPrice;
  baglimit: Baglimit;
  availability: Availability;
  routes: string[][];
  airlines: string[];
  route: Route[];
  booking_token: string;
  deep_link: string;
  tracking_pixel: string;
  facilitated_booking_available: boolean;
  pnr_count: number;
  has_airport_change: boolean;
  technical_stops: number;
  virtual_interlining: boolean;
  transfers: any[];
  local_arrival: Date;
  utc_arrival: Date;
  local_departure: Date;
  utc_departure: Date;
}

export type ActionSetTicketsType = {
  type: typeof SET_TICKETS;
  payload: Ticket[] | [];
};

export type ActionSearchTypes = ActionSetTicketsType;
