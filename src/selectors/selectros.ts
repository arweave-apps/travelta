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

export const getActiveSegment = (state: RootStateType): null | string =>
  state.pageSettings.activeSegment;

export const getDisabledDates = (state: RootStateType): DisabledDatesType =>
  state.pageSettings.disabledDates;

export const getCurrency = (state: RootStateType): CurrencyType =>
  state.settings.currency;
