import {
  CabinClassTypes,
  PassangersNamesTypes,
} from '../../redux/reducers/aviaParams';

type PassangerItemsTextTypes = 'Взрослые' | 'Дети' | 'Младенцы';
type PassangerItemsSubTextTypes =
  | 'старше 12 лет'
  | 'от 2 до 12'
  | 'до 2 лет, без места';

type PassangerCountType = {
  name: PassangersNamesTypes;
  min: number;
  max: number;
};

type PassangerItemsType = {
  text: PassangerItemsTextTypes;
  subtext: PassangerItemsSubTextTypes;
  count: PassangerCountType;
};

export const passangerItems: PassangerItemsType[] = [
  {
    text: 'Взрослые',
    subtext: 'старше 12 лет',
    count: { name: 'adults', min: 1, max: 9 },
  },
  {
    text: 'Дети',
    subtext: 'от 2 до 12',
    count: { name: 'children', min: 0, max: 9 },
  },
  {
    text: 'Младенцы',
    subtext: 'до 2 лет, без места',
    count: { name: 'infants', min: 0, max: 9 },
  },
];

type CabinIdTypes = 'econom' | 'comfort' | 'business' | 'first-class';
type CabinTextTypes = 'Эконом' | 'Комфорт' | 'Бизнес' | 'Первый класс';

type CabinClassItemType = {
  id: CabinIdTypes;
  text: CabinTextTypes;
  cabinClass: CabinClassTypes;
};

export const cabinClassItems: CabinClassItemType[] = [
  {
    id: 'econom',
    text: 'Эконом',
    cabinClass: 'M',
  },
  {
    id: 'comfort',
    text: 'Комфорт',
    cabinClass: 'W',
  },
  {
    id: 'business',
    text: 'Бизнес',
    cabinClass: 'C',
  },
  {
    id: 'first-class',
    text: 'Первый класс',
    cabinClass: 'F',
  },
];

export const getCabinClassName = (
  cabinClass: CabinClassTypes
): CabinTextTypes | undefined => {
  const searchedItem = cabinClassItems.find(
    (item) => item.cabinClass === cabinClass
  );

  if (!searchedItem) {
    return undefined;
  }

  return searchedItem.text;
};
