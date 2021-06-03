/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  searchMultiTicketsConfig,
  searchTicketsConfig,
} from '../../../api/apiConfig';
import { Ticket } from '../../../interfaces/tickets';
import { RootStateType } from '../../reducers';
import {
  CabinClassTypes,
  PassangersType,
  SegmentType,
} from '../../reducers/aviaParams';
import { FormsType } from '../../reducers/pageSettings';
import { CurrencyType } from '../../reducers/settings';
import {
  ActionSearchTypes,
  SET_TICKETS,
  FETCH_TICKETS_REQUESTED,
  FETCH_TICKETS_ERROR,
} from './types';

type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown,
  Action<ActionSearchTypes['type']>
>;

type PointType = {
  to: string;
  flyFrom: string;
  directFlights: number;
  dateFrom: string | undefined;
  dateTo: string | undefined;
};

export const ticketsRequested = (): ActionSearchTypes => ({
  type: FETCH_TICKETS_REQUESTED,
});

export const ticketsError = (error: Error): ActionSearchTypes => ({
  type: FETCH_TICKETS_ERROR,
  payload: error,
});

export const setTickets = (
  tickets: Ticket[] | [],
  isMulti: boolean
): ActionSearchTypes => ({
  type: SET_TICKETS,
  payload: { tickets, isMulti },
});

export const fetchTickets = (
  segments: SegmentType[],
  passengers: PassangersType,
  selectedCabins: CabinClassTypes,
  currency: CurrencyType,
  activeForm: FormsType
): ThunkType => async (dispatch) => {
  try {
    const locale = 'ru';
    const { adults, infants, children } = passengers;
    dispatch(ticketsRequested());

    if (activeForm === 'multiCity') {
      const { url, apikey } = searchMultiTicketsConfig;

      const requests = segments.reduce((acc, segment) => {
        const { originCode, destinationCode, departureDate } = segment;

        const point = {
          to: destinationCode,
          flyFrom: originCode,
          directFlights: 0,
          dateFrom: departureDate?.toLocaleDateString('en-GB'),
          dateTo: departureDate?.toLocaleDateString('en-GB'),
        };
        acc.push(point);

        return acc;
      }, [] as PointType[]);

      const headers = { apikey };

      const response = await axios.post(
        `${url}?curr=${currency}&locale=${locale}`,
        { requests },
        { headers }
      );

      dispatch(setTickets(response.data, true));
    } else {
      const { url, apikey } = searchTicketsConfig;

      const {
        originCode,
        destinationCode,
        departureDate,
        returnDate,
      } = segments[0];

      const response = await axios.get(
        `${url}?fly_from=${originCode}&fly_to=${destinationCode}&date_from=${departureDate?.toLocaleDateString(
          'en-GB'
        )}&date_to=${departureDate?.toLocaleDateString(
          'en-GB'
        )}&return_from=${returnDate?.toLocaleDateString(
          'en-GB'
        )}&return_to=${returnDate?.toLocaleDateString(
          'en-GB'
        )}&adults=${adults}&infants=${infants}&children=${children}&curr=${currency}&locale=${locale}`,
        {
          headers: { apikey },
        }
      );

      dispatch(setTickets(response.data.data, false));
    }
  } catch (error) {
    dispatch(ticketsError(error));
  }
};
