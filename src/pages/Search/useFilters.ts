import { useEffect, useState } from 'react';
import {
  ConvertedTickets,
  TicketsList,
  TicketsWithSegments,
} from '../../utils/convertTickets';
import trunsfersInTicket from '../../utils/ticketsUtils';
import { ActivePriceFilters } from '../../components/Filters/Filters';
import { ActiveTicketTimeFilters } from './Search';
import { msFromTime } from '../../utils/dateUtils';

export default function useFilters(
  activeTransfersFilters: number[],
  activePriceFilters: ActivePriceFilters | null,
  activeAirlinesFilters: string[],
  activeTicketTimeFilters: ActiveTicketTimeFilters | null,
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

    const filterByTime = (ticket: TicketsWithSegments) => {
      const { segments } = ticket;

      if (!activeTicketTimeFilters) {
        return true;
      }

      const segmentResults = [];

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];

        const departureCode = segment.cityCodes.departureCityCode;
        const arrivalCode = segment.cityCodes.arrivalCityCode;

        const key = `${departureCode}-${arrivalCode}`;

        const departureMin = activeTicketTimeFilters[key].departureTime[0];
        const departureMax = activeTicketTimeFilters[key].departureTime[1];
        const arrivalMin = activeTicketTimeFilters[key].arrivalTime[0];
        const arrivalMax = activeTicketTimeFilters[key].arrivalTime[1];

        const segmentDepartureDate = new Date(
          segment.flights[0].departure.date
        );
        const segmentArrivalDate = new Date(
          segment.flights[segment.flights.length - 1].arrival.date
        );

        const ticketDepartureTimeMs = msFromTime(
          segmentDepartureDate.getHours(),
          segmentDepartureDate.getMinutes()
        );
        const ticketArrivalTimeMs = msFromTime(
          segmentArrivalDate.getHours(),
          segmentArrivalDate.getMinutes()
        );

        segmentResults.push(
          departureMin < ticketDepartureTimeMs &&
            ticketDepartureTimeMs < departureMax &&
            arrivalMin < ticketArrivalTimeMs &&
            ticketArrivalTimeMs < arrivalMax
        );
      }

      return segmentResults.every((value) => value);
    };

    const newTickets = ticketsList.filter((ticketId) => {
      const ticket = tickets[ticketId];

      return (
        filterByTransfers(ticket) &&
        filterByPrice(ticket) &&
        filterByAirlines(ticket) &&
        filterByTime(ticket)
      );
    });

    setVisibleTickets(newTickets);
  }, [
    activeAirlinesFilters,
    activePriceFilters,
    activeTicketTimeFilters,
    activeTransfersFilters,
    tickets,
    ticketsList,
  ]);

  return visibleTickets;
}
