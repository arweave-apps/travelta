import { useEffect, useState } from 'react';
import {
  ConvertedTickets,
  TicketsWithSegments,
} from '../../utils/convertTickets';
import trunsfersInTicket from '../../utils/ticketsUtils';
import { ActivePriceFilters } from './Filters';

export default function useFilters(
  activeTransfersFilters: number[],
  activePriceFilters: ActivePriceFilters | null,
  ticketsList: string[],
  tickets: ConvertedTickets
): string[] {
  const [visibleTickets, setVisibleTickets] = useState<string[]>([]);

  useEffect(() => {
    const filterByTransfers = (ticket: TicketsWithSegments) => {
      const { segments } = ticket;

      const maxTrunsfersInTicket = Math.max(...trunsfersInTicket(segments));
      const minTrunsfersInTicket = Math.min(...trunsfersInTicket(segments));

      return (
        activeTransfersFilters.includes(maxTrunsfersInTicket) ||
        activeTransfersFilters.includes(minTrunsfersInTicket)
      );
    };

    const filterByPrice = (ticket: TicketsWithSegments) => {
      const { price } = ticket;

      return (
        activePriceFilters &&
        price <= activePriceFilters?.maxPrice &&
        price >= activePriceFilters?.minPrice
      );
    };

    const newTickets = ticketsList.filter((ticketId) => {
      const ticket = tickets[ticketId];

      return filterByTransfers(ticket) && filterByPrice(ticket);
    });

    setVisibleTickets(newTickets);
  }, [activePriceFilters, activeTransfersFilters, tickets, ticketsList]);

  return visibleTickets;
}
