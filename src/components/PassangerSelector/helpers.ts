export const passangerItems = [
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

export const cabinClassItems = [
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

export const getCabinClassName = (cabinClass: string): string | undefined => {
  const searchedItem = cabinClassItems.find(
    (item) => item.cabinClass === cabinClass
  );

  if (!searchedItem) {
    return undefined;
  }

  return searchedItem.text;
};
