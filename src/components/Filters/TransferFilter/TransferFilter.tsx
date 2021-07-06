import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getTrunsfersNum } from '../../../selectors/selectors';
import getNounDeclension from '../../../utils/getNounDeclension';
import Checkbox from '../../Checkbox';

import List from '../../List';
import ListItem from '../../List/ListItem';
import FilterItem from '../FilterItem';

type CheckboxsDataType = {
  id: string;
  label: string;
  value: number;
};
type ActiveTransferFilters = number[];

type TransferFilterProps = {
  isOpen: boolean;
  onToggle: (id: string) => void;
  activeFilters: ActiveTransferFilters;
  onSetActiveFilters: (filters: ActiveTransferFilters) => void;
};

const TransferFilter = ({
  isOpen,
  onToggle,
  activeFilters,
  onSetActiveFilters,
}: TransferFilterProps): JSX.Element => {
  const { min, max } = useSelector(getTrunsfersNum);

  const [checkboxes, setCheckboxes] = useState<CheckboxsDataType[]>([]);

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
        id: `${num}-transfer-checkbox`,
        label,
        value: num,
      };

      checkboxesData.push(checkboxData);
    }

    setCheckboxes(checkboxesData);

    onSetActiveFilters(checkboxesData.map((checkbox) => checkbox.value));
  }, [max, min, onSetActiveFilters]);

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
