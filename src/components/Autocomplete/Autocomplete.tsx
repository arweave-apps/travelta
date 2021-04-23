import React from 'react';
import { Cities } from '../../redux/reducers/locations';

import {
  ErrorMessagesType,
  ErrorsType,
} from '../AviaSearchForm/AviaSearchForm';

import Dropdown from '../Dropdown';
import DropdownItem from '../Dropdown/DropdownItem/DropdownItem';
import TextBlock from '../TextBlock';
import TextField from '../TextField';

type AutocompleteProps = {
  segmentId: string;
  fieldValue: string;
  errors: ErrorsType;
  errorMessages: ErrorMessagesType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onClickItem: (
    name: string,
    segmentId: string,
    code: string,
    fieldType: string
  ) => void;
  isOpen: boolean;
  locations: Cities[] | null;
  placeholder: string;
  fieldName: string;
};

const Autocomplete = ({
  segmentId,
  fieldValue,
  errors,
  errorMessages,
  onChange,
  onFocus,
  onBlur,
  onClickItem,
  isOpen,
  locations,
  placeholder,
  fieldName,
}: AutocompleteProps): JSX.Element => {
  return (
    <>
      <TextField
        placeholder={placeholder}
        id={`${fieldName}-${segmentId}`}
        value={fieldValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        hasError={errors[segmentId]?.includes(fieldName)}
        errorText={
          errors[segmentId]?.includes(fieldName) ? errorMessages[fieldName] : ''
        }
      />
      {isOpen && (
        <Dropdown>
          {locations &&
            locations.map((row) => {
              const { name, code, country } = row;

              return (
                <DropdownItem
                  key={`${name}-${code}`}
                  hasHover
                  hasMargin
                  onClick={() => onClickItem(name, segmentId, code, fieldName)}
                >
                  <TextBlock text={`${name}, ${country}`} />
                </DropdownItem>
              );
            })}
        </Dropdown>
      )}
    </>
  );
};

export default Autocomplete;
