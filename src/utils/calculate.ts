import type { CurrencyType } from '@/lib/types';

export const convertCurrencyPrice = (
  price: number,
  currency: CurrencyType,
  exchangeRate: { [key in CurrencyType]: number }
): number => {
  if (currency === 'USD') {
    return price;
  }

  return Math.round(price * exchangeRate[currency]);
};

export const formatCurrencyPrice = (price: number, currency: CurrencyType): string => {
  if (currency === 'USD') {
    return `$ ${price.toLocaleString('en-US')}`;
  }

  return `${price.toLocaleString('ko-KR')} 원`;
};
