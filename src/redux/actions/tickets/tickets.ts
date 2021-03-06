import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  carriersConfig,
  searchMultiTicketsConfig,
  searchTicketsConfig,
} from '../../../api/apiConfig';
import { Ticket } from '../../../interfaces/tickets';
import { RootStateType } from '../../reducers';
import {
  CabinClassTypes,
  PassengersType,
  FormSegments,
} from '../../reducers/aviaParams';
import { FormsType } from '../../reducers/pageSettings';
import { CurrencyType } from '../../reducers/settings';
import { PriceSortTypes } from '../../reducers/tickets';
import {
  ActionSearchTypes,
  SET_TICKETS,
  FETCH_TICKETS_REQUESTED,
  FETCH_TICKETS_ERROR,
  SET_CARRIERS,
  Carrier,
  SORT_TICKETS_BY_PRICE,
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

export const sortTicketsByPrice = (
  sortBy: PriceSortTypes
): ActionSearchTypes => ({
  type: SORT_TICKETS_BY_PRICE,
  payload: sortBy,
});

export const ticketsRequested = (): ActionSearchTypes => ({
  type: FETCH_TICKETS_REQUESTED,
});

export const ticketsError = (error: Error): ActionSearchTypes => ({
  type: FETCH_TICKETS_ERROR,
  payload: error,
});

export const setTickets = (
  tickets: Ticket[],
  isMulti: boolean
): ActionSearchTypes => ({
  type: SET_TICKETS,
  payload: { tickets, isMulti },
});

export const setCarriers = (carriers: Carrier[]): ActionSearchTypes => ({
  type: SET_CARRIERS,
  payload: carriers,
});

export const fetchAirlines = (): ThunkType => async (dispatch) => {
  const { url } = carriersConfig;

  try {
    const response = await axios(url);

    dispatch(setCarriers(response.data));
  } catch (error) {
    dispatch(ticketsError(error));
  }
};

export const fetchTickets = (
  segments: FormSegments,
  passengers: PassengersType,
  selectedCabins: CabinClassTypes,
  currency: CurrencyType,
  activeForm: FormsType
): ThunkType => async (dispatch) => {
  try {
    const locale = 'ru';
    const { adults, infants, children } = passengers;
    const isMulti = activeForm === 'multiCity';
    dispatch(ticketsRequested());

    /*
    If the request comes from a multi-form and the number of segments
    is equal to one, then the data from the server does not correspond
    to the expected ones.

    To exclude this, make a request as from the standard form.
    And treat the result as a single search result

    Moreover, if a multi search is sent as a single search,
    it is necessary to pass the inverted isMulti value to
    the conversion function, since in this case it must be false.
    */

    if (isMulti && segments.length > 1) {
      const { url, apikey } = searchMultiTicketsConfig;

      const requests = segments.reduce((acc, segment) => {
        const { originCode, destinationCode, departureDate } = segment;

        const point = {
          to: destinationCode,
          flyFrom: originCode,
          directFlights: 0,
          dateFrom: departureDate?.toLocaleDateString('en-GB'),
          dateTo: departureDate?.toLocaleDateString('en-GB'),
          selected_cabins: selectedCabins,
          adults,
          infants,
          children,
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

      const { data } = response;

      dispatch(setTickets(data, isMulti));
    } else {
      const { url, apikey } = searchTicketsConfig;

      const {
        originCode,
        destinationCode,
        departureDate,
        returnDate,
      } = segments[0];

      if (!departureDate) {
        return;
      }

      let requestUrl = `${url}?fly_from=${originCode}&fly_to=${destinationCode}&date_from=${departureDate.toLocaleDateString(
        'en-GB'
      )}&date_to=${departureDate.toLocaleDateString(
        'en-GB'
      )}&adults=${adults}&infants=${infants}&children=${children}&curr=${currency}&locale=${locale}&selected_cabins=${selectedCabins}`;

      if (returnDate) {
        requestUrl += `&return_from=${returnDate?.toLocaleDateString(
          'en-GB'
        )}&return_to=${returnDate?.toLocaleDateString('en-GB')}`;
      }

      const response = await axios.get(requestUrl, {
        headers: { apikey },
      });

      const { data } = response;

      if (segments.length === 1 && isMulti) {
        dispatch(setTickets(data.data, !isMulti));
      } else {
        dispatch(setTickets(data.data, isMulti));
      }
    }
  } catch (error) {
    dispatch(ticketsError(error));
  }
};
