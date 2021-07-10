import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

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

import { TicketsList } from '../../utils/convertTickets';

import './Search.scss';

const Search = (): JSX.Element => {
  const currency = useSelector(getCurrency);
  const ticketsList = useSelector(getTicketsList);
  const tickets = useSelector(getTickets);
  const isTicketsLoading = useSelector(getTicketsLoading);

  const [visibleTicketList, setVisibleTicketList] = useState<string[]>([]);

  const handleSetTickets = useCallback((ticketList: TicketsList) => {
    setVisibleTicketList(ticketList);
  }, []);

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
          ticketsList={ticketsList}
          tickets={tickets}
          onSetVisibleTicketList={handleSetTickets}
          currency={currency}
        />
        <Prediction />
        <SearchAction totalTickets={visibleTicketList.length} />

        <div className="tickets">
          {visibleTicketList.length > 0 ? (
            visibleTicketList.map((ticketId) => {
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
