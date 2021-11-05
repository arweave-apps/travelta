import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useFilters from './useFilters';

import ErrorCard from '../../components/ErrorCard';
import Filters from '../../components/Filters';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import SearchAction from '../../components/SearchAction';
import Ticket from '../../components/Ticket';
import SimpleButton from '../../components/SimpleButton';

import {
  getCurrency,
  getTickets,
  getTicketsList,
  getTicketsLoading,
} from '../../selectors/selectors';

import './Search.scss';
import { DateTimestamp } from '../../redux/reducers/tickets';

export type ActivePriceFilters = Record<'minPrice' | 'maxPrice', number>;

export type ActiveTicketTimeFilters = {
  [key: string]: {
    departureTime: number[];
    arrivalTime: number[];
  };
};

export type ActiveTransfersFilters = number[];
export type ActiveAirlinesFilters = string[];

export type ActiveTicketDateFilters = {
  [key: string]: DateTimestamp[];
};

const numberOfTicketsLoaded = 10;

const Search = (): JSX.Element => {
  const currency = useSelector(getCurrency);
  const ticketsList = useSelector(getTicketsList);
  const tickets = useSelector(getTickets);
  const isTicketsLoading = useSelector(getTicketsLoading);

  const [visibleTicketsCount, setVisibleTicketsCount] = useState<number>(1);

  const [
    activeTransfersFilters,
    setActiveTransfersFilters,
  ] = useState<ActiveTransfersFilters>([]);

  const [
    activePriceFilters,
    setActivePriceFilters,
  ] = useState<ActivePriceFilters | null>(null);

  const [
    activeAirlinesFilters,
    setActiveAirlinesFilters,
  ] = useState<ActiveAirlinesFilters>([]);

  const [
    activeTicketTimeFilters,
    setActiveTicketTimeFilter,
  ] = useState<ActiveTicketTimeFilters | null>(null);

  const [
    activeTicketDatesFilters,
    setActiveTicketDatesFilters,
  ] = useState<ActiveTicketDateFilters | null>(null);

  const visibleTickets = useFilters(
    activeTransfersFilters,
    activePriceFilters,
    activeAirlinesFilters,
    activeTicketTimeFilters,
    ticketsList,
    tickets,
    activeTicketDatesFilters
  );

  if (isTicketsLoading) {
    return (
      <Layout className="avia-search" containerSize="small" tag="section">
        <Loader />
      </Layout>
    );
  }

  if (ticketsList.length === 0) {
    return (
      <Layout className="avia-search" containerSize="small" tag="section">
        <ErrorCard
          title="Ничего не найдено"
          recommendation="Попробуйте изменить параметры поиска"
        />
      </Layout>
    );
  }

  const handleCLickVisibleTicketsCount = () => {
    setVisibleTicketsCount(visibleTicketsCount + 1);
  };

  const ticketsPerPage = numberOfTicketsLoaded * visibleTicketsCount;
  const isButtonDisabled = visibleTickets.length <= ticketsPerPage;

  return (
    <Layout className="avia-search" containerSize="small" tag="section">
      <div className="avia-search__inner">
        <Filters
          activeTransfersFilters={activeTransfersFilters}
          activeAirlinesFilters={activeAirlinesFilters}
          activeTicketDatesFilters={activeTicketDatesFilters}
          onActiveTransfersFilters={setActiveTransfersFilters}
          onActivePriceFilters={setActivePriceFilters}
          onActiveAirlinesFilters={setActiveAirlinesFilters}
          onActiveTicketTimeFilter={setActiveTicketTimeFilter}
          onActiveTicketDatesFilters={setActiveTicketDatesFilters}
          currency={currency}
        />

        <div className="avia-search__content">
          <SearchAction totalTickets={visibleTickets.length} />

          <div className="tickets">
            {visibleTickets.length > 0 ? (
              visibleTickets.slice(0, ticketsPerPage).map((ticketId) => {
                return (
                  <Ticket
                    key={ticketId}
                    ticket={tickets[ticketId]}
                    currency={currency}
                  />
                );
              })
            ) : (
              <ErrorCard
                title="Установлены слишком жесткие фильтры"
                recommendation="Измените фильтры"
              />
            )}

            {visibleTickets.length > 0 && (
              <div className="tickets__btn">
                <SimpleButton
                  bg="accent"
                  onClick={handleCLickVisibleTicketsCount}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled
                    ? 'Показаны все доступные билеты'
                    : `Показать еще ${numberOfTicketsLoaded} билетов`}
                </SimpleButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
