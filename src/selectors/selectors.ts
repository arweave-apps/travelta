import {
  CabinClassTypes,
  FormSegments,
  PassengersType,
} from '../redux/reducers/aviaParams';
import { RootStateType } from '../redux/reducers';
import { Cities } from '../redux/reducers/locations';
import { DisabledDatesType, FormsType } from '../redux/reducers/pageSettings';
import { CurrencyType } from '../redux/reducers/settings';
import { ConvertedTickets, TicketsList } from '../utils/convertTickets';
import {
  Carriers,
  FiltersLimits,
  PredictionWithId,
  PriceSortTypes,
} from '../redux/reducers/tickets';

export const getPassengers = (state: RootStateType): PassengersType =>
  state.aviaParams.passengers;

export const getSelectedCabins = (state: RootStateType): CabinClassTypes =>
  state.aviaParams.selectedCabins;

export const getLocations = (state: RootStateType): Cities[] | null =>
  state.locations.locations;

export const getActiveForm = (state: RootStateType): FormsType =>
  state.pageSettings.activeForm;

export const getDisabledDates = (state: RootStateType): DisabledDatesType =>
  state.pageSettings.disabledDates;

export const getCurrency = (state: RootStateType): CurrencyType =>
  state.settings.currency;

export const getTickets = (state: RootStateType): ConvertedTickets =>
  state.tickets.tickets;

export const getPredictions = (state: RootStateType): PredictionWithId[] =>
  state.tickets.predictions;

export const getTicketsList = (state: RootStateType): TicketsList =>
  state.tickets.ticketsList;

export const getFiltersLimits = (state: RootStateType): FiltersLimits =>
  state.tickets.filtersLimits;

export const getTicketsLoading = (state: RootStateType): boolean =>
  state.tickets.loading;

export const getCarriers = (state: RootStateType): Carriers =>
  state.tickets.carriers;

export const getSortTicketBy = (state: RootStateType): PriceSortTypes =>
  state.tickets.sortByPrice;

export const getFormSegments = (state: RootStateType): FormSegments =>
  state.aviaParams.formSegments;
