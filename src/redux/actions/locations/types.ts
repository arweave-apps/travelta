/* eslint-disable camelcase */
export const SET_LOCATIONS = 'SET_LOCATIONS';

interface Subdivision {
  id: string;
  name: string;
  slug: string;
  code: string;
}

interface Country {
  id: string;
  name: string;
  slug: string;
  code: string;
}

interface Region {
  id: string;
  name: string;
  slug: string;
}

interface Continent {
  id: string;
  name: string;
  slug: string;
  code: string;
}

interface Location2 {
  lat: number;
  lon: number;
}

interface Tag {
  tag: string;
  month_to: number;
  month_from: number;
}

interface AlternativeDeparturePoint {
  id: string;
  distance: number;
  duration: number;
}

interface CarRental {
  provider_id: number;
  providers_locations: string[];
}

export interface LocationObject {
  id: string;
  active: boolean;
  name: string;
  slug: string;
  slug_en: string;
  code: string;
  alternative_names: string[];
  rank: number;
  global_rank_dst: number;
  dst_popularity_score: number;
  timezone: string;
  population: number;
  airports: number;
  stations: number;
  hotels: number;
  bus_stations: number;
  subdivision: Subdivision;
  autonomous_territory?: unknown;
  country: Country;
  region: Region;
  continent: Continent;
  location: Location2;
  tags: Tag[];
  alternative_departure_points: AlternativeDeparturePoint[];
  providers: number[];
  car_rentals: CarRental[];
  type: string;
}

export type ActionSetLocationsType = {
  type: typeof SET_LOCATIONS;
  payload: LocationObject[] | null;
};
