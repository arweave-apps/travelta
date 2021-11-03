import { useEffect, useState } from 'react';
import {
  ConvertedTickets,
  TicketsList,
  TicketsWithSegments,
} from '../../utils/convertTickets';
import { transfersInTicket } from '../../utils/ticketsUtils';
import { ActivePriceFilters } from '../../components/Filters/Filters';
import {
  ActiveAirlinesFilters,
  ActiveTicketDateFilters,
  ActiveTicketTimeFilters,
  ActiveTransfersFilters,
} from './Search';
import { getDateWithoutTime, msFromTime } from '../../utils/dateUtils';
import { SegmentNo } from '../../redux/reducers/tickets';

export default function useFilters(
  activeTransfersFilters: ActiveTransfersFilters,
  activePriceFilters: ActivePriceFilters | null,
  activeAirlinesFilters: ActiveAirlinesFilters,
  activeTicketTimeFilters: ActiveTicketTimeFilters | null,
  ticketsList: TicketsList,
  tickets: ConvertedTickets,
  activeTicketDatesFilters: ActiveTicketDateFilters | null
): TicketsList {
  const [visibleTickets, setVisibleTickets] = useState<TicketsList>([]);

  useEffect(() => {
    const filterByTransfers = (ticket: TicketsWithSegments) => {
      const { segments } = ticket;

      const maxTransfersInTicket = Math.max(...transfersInTicket(segments));
      const minTransfersInTicket = Math.min(...transfersInTicket(segments));

      return (
        activeTransfersFilters.includes(maxTransfersInTicket) ||
        activeTransfersFilters.includes(minTransfersInTicket)
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

        const key = `segment-${i}` as SegmentNo;

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

        const segmentArrivalDateWithoutTime = getDateWithoutTime(
          segmentArrivalDate
        );

        const isIncludeDate =
          !!activeTicketDatesFilters &&
          activeTicketDatesFilters[key].some(
            (timestamp) => timestamp === segmentArrivalDateWithoutTime.getTime()
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
            ticketArrivalTimeMs < arrivalMax &&
            isIncludeDate
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
    activeTicketDatesFilters,
    activeTicketTimeFilters,
    activeTransfersFilters,
    tickets,
    ticketsList,
  ]);

  return visibleTickets;
}
