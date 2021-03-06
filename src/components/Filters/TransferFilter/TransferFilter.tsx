import React, { useEffect } from 'react';

import Checkbox from '../../Checkbox';

import List from '../../List';
import ListItem from '../../List/ListItem';
import FilterItem from '../FilterItem';
import { OpenFiltersType, TransferCheckboxesDataType } from '../Filters';

type ActiveTransferFilters = number[];

type TransferFilterProps = {
  isOpen: boolean;
  onToggle: (id: OpenFiltersType) => void;
  activeFilters: ActiveTransferFilters;
  onSetActiveFilters: (filters: ActiveTransferFilters) => void;
  checkboxes: TransferCheckboxesDataType[];
};

const TransferFilter = ({
  isOpen,
  onToggle,
  activeFilters,
  onSetActiveFilters,
  checkboxes,
}: TransferFilterProps): JSX.Element => {
  const handleClickCheckbox = (checkboxId: string, value = -1) => {
    if (checkboxId === 'all-transfer-checkbox' && value === -1) {
      if (activeFilters.length === checkboxes.length) {
        onSetActiveFilters([]);
      } else {
        onSetActiveFilters(checkboxes.map((checkbox) => checkbox.value));
      }
    } else if (activeFilters.includes(value)) {
      const idx = activeFilters.indexOf(value);

      onSetActiveFilters([
        ...activeFilters.slice(0, idx),
        ...activeFilters.slice(idx + 1),
      ]);
    } else {
      onSetActiveFilters([...activeFilters, value]);
    }
  };

  useEffect(() => {
    onSetActiveFilters(checkboxes.map((checkbox) => checkbox.value));
  }, [checkboxes, onSetActiveFilters]);

  return (
    <FilterItem
      title="Пересадки"
      isActive={isOpen}
      onClick={() => onToggle('transferFilter')}
    >
      <List>
        <ListItem>
          <Checkbox
            id="all-transfer-checkbox"
            label="Все"
            checked={activeFilters.length === checkboxes.length}
            onChange={() => handleClickCheckbox('all-transfer-checkbox')}
          />
        </ListItem>

        {checkboxes.map((checkbox) => {
          const { id, label, value } = checkbox;

          return (
            <ListItem key={id}>
              <Checkbox
                id={id}
                label={label}
                checked={activeFilters.includes(value)}
                onChange={() => handleClickCheckbox(id, value)}
              />
            </ListItem>
          );
        })}
      </List>
    </FilterItem>
  );
};

export default TransferFilter;
