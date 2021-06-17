/* eslint-disable camelcase */
export interface CountryFrom {
  code: string;
  name: string;
}

export interface CountryTo {
  code: string;
  name: string;
}

interface Duration {
  departure: number;
  return: number;
  total: number;
}

interface Conversion {
  [key: string]: number;
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

interface Availability {
  seats?: number;
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
  last_seen: string;
  refresh_timestamp: string;
  equipment?: unknown;
  vehicle_type: string;
  local_arrival: string;
  utc_arrival: string;
  local_departure: string;
  utc_departure: string;
}

export type Routes = [string, string];

export interface TicketSearch {
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
  routes: Routes[];
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
  transfers: unknown[];
  local_arrival: string;
  utc_arrival: string;
  local_departure: string;
  utc_departure: string;
}

export interface RouteMulti {
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
  nightsInDest?: unknown;
  quality: number;
  distance: number;
  duration: Duration;
  conversion: Conversion;
  bags_price: BagsPrice;
  baglimit: Baglimit;
  availability: Availability;
  routes: Routes[];
  airlines: string[];
  route: Route[];
  facilitated_booking_available: boolean;
  pnr_count: number;
  has_airport_change: boolean;
  technical_stops: number;
  virtual_interlining: boolean;
  transfers: unknown[];
  local_arrival: string;
  utc_arrival: string;
  local_departure: string;
  utc_departure: string;
}

export interface TicketMulti {
  quality: number;
  duration: number;
  price: number;
  route: RouteMulti[];
  pnr_count: number;
  booking_token: string;
  deep_link: string;
  tracking_pixel?: unknown;
  multicity_version: string;
}

export type Ticket = TicketMulti | TicketSearch;
