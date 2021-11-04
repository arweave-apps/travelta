import {
  CabinClassTypes,
  PassengersNamesTypes,
} from '../../redux/reducers/aviaParams';

type PassengerItemsTextTypes = 'Взрослые' | 'Дети' | 'Младенцы';
type PassengerItemsSubTextTypes =
  | 'старше 12 лет'
  | 'от 2 до 12'
  | 'до 2 лет, без места';

type PassengerCountType = {
  name: PassengersNamesTypes;
  min: number;
  max: number;
};

type PassengerItemsType = {
  text: PassengerItemsTextTypes;
  subtext: PassengerItemsSubTextTypes;
  count: PassengerCountType;
};

export const passengerItems: PassengerItemsType[] = [
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

type CabinIdTypes = 'economy' | 'comfort' | 'business' | 'first-class';
type CabinTextTypes = 'Эконом' | 'Комфорт' | 'Бизнес' | 'Первый класс';

type CabinClassItemType = {
  id: CabinIdTypes;
  text: CabinTextTypes;
  cabinClass: CabinClassTypes;
};

export const cabinClassItems: CabinClassItemType[] = [
  {
    id: 'economy',
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
