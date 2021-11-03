import { Segment } from './convertTickets';

export const transfersInTicket = (array: Segment[]): number[] =>
  array.reduce((arr: number[], currItem) => {
    const num = currItem.transfers.length;
    arr.push(num);

    return arr;
  }, []);

type SegmentsArrivalDatesType = string[];

export const getArrivalDatesBySegments = (
  array: Segment[]
): SegmentsArrivalDatesType =>
  array.reduce((acc: SegmentsArrivalDatesType, currItem) => {
    const arrivalDate =
      currItem.flights[currItem.flights.length - 1].arrival.date;

    acc.push(arrivalDate);

    return acc;
  }, []);
