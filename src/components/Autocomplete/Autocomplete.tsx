import React from 'react';

import { Cities } from '../../redux/reducers/locations';

import Dropdown from '../Dropdown';
import DropdownItem from '../Dropdown/DropdownItem/DropdownItem';
import TextBlock from '../TextBlock';
import TextField from '../TextField';

type AutocompleteProps = {
  segmentId: string;
  fieldValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
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
  onSetFormikValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  errorText: string | undefined;
  hasError: boolean;
};

const Autocomplete = ({
  segmentId,
  fieldValue,
  onChange,
  onFocus,
  onBlur,
  onClickItem,
  isOpen,
  locations,
  placeholder,
  fieldName,
  onSetFormikValue,
  errorText,
  hasError,
}: AutocompleteProps): JSX.Element => {
  return (
    <>
      <TextField
        id={`${fieldName}-${segmentId}`}
        value={fieldValue}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        errorText={errorText}
        hasError={hasError}
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
                  onClick={() => {
                    onClickItem(name, segmentId, code, fieldName);
                    onSetFormikValue(`${fieldName}-${segmentId}`, name);
                  }}
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
