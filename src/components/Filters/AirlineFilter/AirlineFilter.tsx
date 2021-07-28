import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getCarriers } from '../../../selectors/selectors';

import List from '../../List';
import ListItem from '../../List/ListItem';
import FilterItem from '../FilterItem';
import Checkbox from '../../Checkbox';
import { OpenFiltersType } from '../Filters';

type ActiveAirlinesFilters = string[];

type AirlineFilterProps = {
  isOpen: boolean;
  onToggle: (id: OpenFiltersType) => void;
  activeFilters: ActiveAirlinesFilters;
  onSetActiveFilters: (filters: ActiveAirlinesFilters) => void;
  airlines: string[];
};

const AirlineFilter = ({
  isOpen,
  onToggle,
  activeFilters,
  onSetActiveFilters,
  airlines,
}: AirlineFilterProps): JSX.Element => {
  const carriers = useSelector(getCarriers);

  const handleClickCheckbox = (airlineId: string) => {
    if (airlineId === 'all-airlines-checkbox') {
      if (activeFilters.length === airlines.length) {
        onSetActiveFilters([]);
      } else {
        onSetActiveFilters(airlines.map((airline) => airline));
      }
    } else if (activeFilters.includes(airlineId)) {
      const idx = activeFilters.indexOf(airlineId);

      onSetActiveFilters([
        ...activeFilters.slice(0, idx),
        ...activeFilters.slice(idx + 1),
      ]);
    } else {
      onSetActiveFilters([...activeFilters, airlineId]);
    }
  };

  useEffect(() => {
    onSetActiveFilters([...airlines]);
  }, [airlines, onSetActiveFilters]);

  return (
    <FilterItem
      title="Авиакомпании"
      isActive={isOpen}
      onClick={() => onToggle('airlineFilter')}
    >
      <List>
        <ListItem>
          <Checkbox
            id="all-airlines-checkbox"
            label="Все"
            checked={activeFilters.length === airlines.length}
            onChange={() => handleClickCheckbox('all-airlines-checkbox')}
          />
        </ListItem>

        {airlines.map((airline) => {
          const { id, name } = carriers[airline];

          return (
            <ListItem key={airline}>
              <Checkbox
                id={airline}
                label={`${name}, ${id}`}
                checked={activeFilters.includes(airline)}
                onChange={() => handleClickCheckbox(airline)}
              />
            </ListItem>
          );
        })}
      </List>
    </FilterItem>
  );
};

export default AirlineFilter;
