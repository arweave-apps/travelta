import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getTrunsfersNum } from '../../selectors/selectors';

import getNounDeclension from '../../utils/getNounDeclension';
import { ConvertedTickets } from '../../utils/convertTickets';
import { FilterList, isContentArray } from './helpers';

import Checkbox from '../Checkbox';
import List from '../List';
import ListItem from '../List/ListItem';
import FilterItem from './FilterItem';

import './Filters.scss';
import trunsfersInTicket from '../../utils/ticketsUtils';

type FiltersProps = {
  ticketsList: string[];
  tickets: ConvertedTickets;
  onSetVisibleTicketList: (ticketList: string[]) => void;
};

const Filters = ({
  ticketsList,
  tickets,
  onSetVisibleTicketList,
}: FiltersProps): JSX.Element => {
  const { min, max } = useSelector(getTrunsfersNum);

  const [filtersList, setFiltersList] = useState<FilterList[]>([]);

  const [activeTransfersFilters, setActiveTransfersFilters] = useState<
    number[]
  >([]);

  useEffect(() => {
    if (
      isContentArray(filtersList[0]?.content) &&
      activeTransfersFilters.length === filtersList[0].content.length
    ) {
      onSetVisibleTicketList(ticketsList);
    } else {
      const filteredTicketList = ticketsList.filter((ticketId) => {
        const { segments } = tickets[ticketId];
        const maxTrunsfersInTicket = Math.max(...trunsfersInTicket(segments));

        return activeTransfersFilters.includes(maxTrunsfersInTicket);
      });

      onSetVisibleTicketList(filteredTicketList);
    }
  }, [
    activeTransfersFilters,
    activeTransfersFilters.length,
    filtersList,
    onSetVisibleTicketList,
    tickets,
    ticketsList,
  ]);

  useEffect(() => {
    const checkboxesData = [];

    for (let num = min; num <= max; num++) {
      const label =
        num === 0
          ? 'без пересадок'
          : `${num} ${getNounDeclension(num, [
              'пересадка',
              'пересадки',
              'пересадок',
            ])}`;

      const checkboxData = {
        contentId: `${num}-transfer-checkbox`,
        label,
      };

      checkboxesData.push(checkboxData);
    }

    setActiveTransfersFilters(
      checkboxesData.map((checkbox) => parseInt(checkbox.contentId, 10))
    );

    setFiltersList([
      {
        id: 'filters-transfersNum',
        active: false,
        title: 'Пересадки',
        content: checkboxesData,
      },
      {
        id: 'filters-price',
        active: false,
        title: 'Цена билета',
        content: <span>asdads</span>,
      },
      {
        id: 'filters-airlines',
        active: false,
        title: 'Авиакомпании',
        content: <span>asdadsa</span>,
      },
    ]);
  }, [max, min]);

  const handleClickFilterItem = (id: string) => {
    const newFiltersList = filtersList.map((list) => {
      return list.id === id ? { ...list, active: !list.active } : list;
    });

    setFiltersList(newFiltersList);
  };

  const handleClickCheckbox = (checkboxId: string) => {
    if (
      checkboxId === 'all-transfer-checkbox' &&
      isContentArray(filtersList[0].content)
    ) {
      if (activeTransfersFilters.length === filtersList[0].content.length) {
        setActiveTransfersFilters([]);
      } else {
        const newActiveTransfersFilters = filtersList[0].content.map(
          (checkbox) => {
            return parseInt(checkbox.contentId, 10);
          }
        );

        setActiveTransfersFilters(newActiveTransfersFilters);
      }
    } else if (activeTransfersFilters.includes(parseInt(checkboxId, 10))) {
      const idx = activeTransfersFilters.indexOf(parseInt(checkboxId, 10));
      setActiveTransfersFilters([
        ...activeTransfersFilters.slice(0, idx),
        ...activeTransfersFilters.slice(idx + 1),
      ]);
    } else {
      setActiveTransfersFilters([
        ...activeTransfersFilters,
        parseInt(checkboxId, 10),
      ]);
    }
  };

  return (
    <div className="filters">
      <div className="filters__header">
        <h3 className="filters__title">Фильтры</h3>

        <button type="button" className="filters__button-clear-all">
          очистить всё
        </button>
      </div>

      {filtersList.map((item) => {
        const { id, active, title, content } = item;

        if (isContentArray(content)) {
          if (content.length > 0) {
            return (
              <FilterItem
                key={id}
                title={title}
                isActive={active}
                onClick={() => handleClickFilterItem(id)}
              >
                <List>
                  <ListItem>
                    <Checkbox
                      id="all-transfer-checkbox"
                      label="Все"
                      checked={
                        isContentArray(filtersList[0].content) &&
                        activeTransfersFilters.length ===
                          filtersList[0].content.length
                      }
                      onChange={() =>
                        handleClickCheckbox('all-transfer-checkbox')
                      }
                    />
                  </ListItem>

                  {content.map((checkbox) => {
                    const { contentId, label } = checkbox;

                    return (
                      <ListItem key={contentId}>
                        <Checkbox
                          id={contentId}
                          label={label}
                          checked={activeTransfersFilters.includes(
                            parseInt(contentId, 10)
                          )}
                          onChange={() => handleClickCheckbox(contentId)}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </FilterItem>
            );
          }

          return null;
        }

        return (
          <FilterItem
            key={id}
            title={title}
            isActive={active}
            onClick={() => handleClickFilterItem(id)}
          >
            {content}
          </FilterItem>
        );
      })}
    </div>
  );
};

export default Filters;
