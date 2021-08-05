import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DownArrowicon from '../../assets/images/icons/down-arrow.svg';
import { sortTicketsByPrice } from '../../redux/actions/tickets/tickets';
import { PriceSortTypes } from '../../redux/reducers/tickets';
import { getSortTicketBy } from '../../selectors/selectors';
import Dropdown from '../Dropdown';
import DropdownItem from '../Dropdown/DropdownItem/DropdownItem';
import Icon from '../Icon';
import TextBlock from '../TextBlock';
import TriggerButton from '../TriggerButton';

import './SearchAction.scss';

type SortListsDataType = {
  id: PriceSortTypes;
  text: string;
};

const sortListsData: SortListsDataType[] = [
  { id: 'lowPrice', text: 'дешевые' },
  { id: 'heighPrice', text: 'дорогие' },
];

type SearchActionsProps = {
  totalTickets: number;
};

const SearchAction = ({ totalTickets }: SearchActionsProps): JSX.Element => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState<boolean>(false);

  const sortedBy = useSelector(getSortTicketBy);

  const toggleDropdownMenu = () => {
    setOpen(!isOpen);
  };

  const handleSelectSort = (id: PriceSortTypes) => {
    dispatch(sortTicketsByPrice(id));
  };

  const selectedItemText = sortListsData.find((item) => item.id === sortedBy)
    ?.text;

  return (
    <div className="action">
      <div className="action__total-tickets">Результатов {totalTickets}</div>

      <div className="action__sort">
        <TriggerButton onClick={toggleDropdownMenu}>
          <span className="action__label">Сортировка сначала</span>
          <span className="action__selector">{selectedItemText}</span>

          <Icon
            icon={<DownArrowicon />}
            className="down-arrow"
            isActive={isOpen}
            isDark
          />
        </TriggerButton>

        {isOpen && (
          <Dropdown>
            {sortListsData.map(({ id, text }) => {
              return (
                <DropdownItem
                  key={id}
                  isActive={sortedBy === id}
                  hasHover
                  onClick={() => handleSelectSort(id)}
                >
                  <TextBlock text={text} />
                </DropdownItem>
              );
            })}
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default SearchAction;
