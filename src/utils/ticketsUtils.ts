import { Segment } from './convertTickets';

const trunsfersInTicket = (array: Segment[]): number[] =>
  array.reduce((arr: number[], currItem) => {
    const num = currItem.transfers.length;
    arr.push(num);

    return arr;
  }, []);

export default trunsfersInTicket;
