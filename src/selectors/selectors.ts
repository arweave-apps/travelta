import {
  CabinClassTypes,
  PassangersType,
  SegmentType,
} from '../redux/reducers/aviaParams';
import { RootStateType } from '../redux/reducers';
import { Cities } from '../redux/reducers/locations';
import {
  ActiveInputType,
  DisabledDatesType,
  FormsType,
} from '../redux/reducers/pageSettings';
import { CurrencyType } from '../redux/reducers/settings';
import { ConvertedTickets, TicketsList } from '../utils/convertTickets';
import { PriceRange, TransfersRange } from '../redux/reducers/tickets';

export const getSegments = (state: RootStateType): SegmentType[] =>
  state.aviaParams.segments;

export const getPassangers = (state: RootStateType): PassangersType =>
  state.aviaParams.passangers;

export const getSelectedCabins = (state: RootStateType): CabinClassTypes =>
  state.aviaParams.selectedCabins;

export const getLocations = (state: RootStateType): Cities[] | null =>
  state.locations.locations;

export const getActiveForm = (state: RootStateType): FormsType =>
  state.pageSettings.activeForm;

export const getActiveInputDate = (state: RootStateType): ActiveInputType =>
  state.pageSettings.activeInputDate;

export const getActiveSegmentId = (state: RootStateType): null | string =>
  state.pageSettings.activeSegmentId;

export const getDisabledDates = (state: RootStateType): DisabledDatesType =>
  state.pageSettings.disabledDates;

export const getCurrency = (state: RootStateType): CurrencyType =>
  state.settings.currency;

export const getTickets = (state: RootStateType): ConvertedTickets =>
  state.tickets.tickets;

export const getTicketsList = (state: RootStateType): TicketsList =>
  state.tickets.ticketsList;

export const getTrunsfersNum = (state: RootStateType): TransfersRange =>
  state.tickets.transfersRange;

export const getTicketsLoading = (state: RootStateType): boolean =>
  state.tickets.loading;

export const getTicketsPriceRange = (state: RootStateType): PriceRange =>
  state.tickets.priceRange;
