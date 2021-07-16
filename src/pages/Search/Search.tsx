import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useFilters from './useFilters';

import ErrorCard from '../../components/ErrorCard';
import Filters from '../../components/Filters';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import Prediction from '../../components/Prediction';
import SearchAction from '../../components/SearchAction';
import Ticket from '../../components/Ticket';

import {
  getCurrency,
  getTickets,
  getTicketsList,
  getTicketsLoading,
} from '../../selectors/selectors';

import './Search.scss';

export type ActivePriceFilters = Record<'minPrice' | 'maxPrice', number>;

const Search = (): JSX.Element => {
  const currency = useSelector(getCurrency);
  const ticketsList = useSelector(getTicketsList);
  const tickets = useSelector(getTickets);
  const isTicketsLoading = useSelector(getTicketsLoading);

  const [activeTransfersFilters, setActiveTransfersFilters] = useState<
    number[]
  >([]);

  const [
    activePriceFilters,
    setActivePriceFilters,
  ] = useState<ActivePriceFilters | null>(null);

  const [activeAirlinesFilters, setActiveAirlinesFilters] = useState<string[]>(
    []
  );

  const visibleTickets = useFilters(
    activeTransfersFilters,
    activePriceFilters,
    activeAirlinesFilters,
    ticketsList,
    tickets
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

  return (
    <Layout className="avia-search" containerSize="small" tag="section">
      <div className="avia-search__inner">
        <Filters
          activeTransfersFilters={activeTransfersFilters}
          activeAirlinesFilters={activeAirlinesFilters}
          onActiveTransfersFilters={setActiveTransfersFilters}
          onActivePriceFilters={setActivePriceFilters}
          onActiveAirlinesFilters={setActiveAirlinesFilters}
          currency={currency}
        />
        <Prediction />
        <SearchAction totalTickets={visibleTickets.length} />

        <div className="tickets">
          {visibleTickets.length > 0 ? (
            visibleTickets.map((ticketId) => {
              return (
                <Ticket
                  key={ticketId}
                  ticket={tickets[ticketId]}
                  currency={currency}
                />
              );
            })
          ) : (
            <div>Выберите хотябы один фильтр</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
