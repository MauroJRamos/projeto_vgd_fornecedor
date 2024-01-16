
import { DateTime } from 'luxon';

export const round = (value: number, precision: number) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export const formatLocalDate = (date: string, pattern: string) => {
    //const dt = new Date(date);
   //const dtDateOnly = new Date(dt.toISOString().split('T')[0]);
   // return format(dtDateOnly, pattern);
   const dt = DateTime.fromISO(date);
  return dt.toFormat(pattern);
}

export const formatPrice = (price: number) => {

    const params = {maximumFractionDigits: 2, minimumFractionDigits: 2};
    return new Intl.NumberFormat('pt-BR', params).format(price);
}