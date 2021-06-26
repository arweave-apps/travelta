import { CurrencyType } from '../redux/reducers/settings';

const currencySymbolsCharCodes = { RUB: 8381, EUR: 8364, USD: 65284 };

const getCurrencySymbolCharCode = (currency: CurrencyType): string => {
  return String.fromCharCode(currencySymbolsCharCodes[currency]);
};

export default getCurrencySymbolCharCode;
