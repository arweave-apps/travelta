import { useEffect, useState } from 'react';
import {
  ConvertedTickets,
  TicketsList,
  TicketsWithSegments,
} from '../../utils/convertTickets';
import trunsfersInTicket from '../../utils/ticketsUtils';
import { ActivePriceFilters } from '../../components/Filters/Filters';

export default function useFilters(
  activeTransfersFilters: number[],
  activePriceFilters: ActivePriceFilters | null,
  activeAirlinesFilters: string[],
  ticketsList: TicketsList,
  tickets: ConvertedTickets
): TicketsList {
  const [visibleTickets, setVisibleTickets] = useState<TicketsList>([]);

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

    const filterByAirlines = (ticket: TicketsWithSegments) => {
      const { airlines } = ticket;

      return airlines.some((airline) =>
        activeAirlinesFilters.includes(airline)
      );
    };

    const newTickets = ticketsList.filter((ticketId) => {
      const ticket = tickets[ticketId];

      return (
        filterByTransfers(ticket) &&
        filterByPrice(ticket) &&
        filterByAirlines(ticket)
      );
    });

    setVisibleTickets(newTickets);
  }, [
    activeAirlinesFilters,
    activePriceFilters,
    activeTransfersFilters,
    tickets,
    ticketsList,
  ]);

  return visibleTickets;
}
