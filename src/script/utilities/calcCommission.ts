import { COMMISSION_EXCHANGE_AMOUNT, FRACTION_LENGTH, PERCENTS_AMOUNT } from '../data/constants';

export function calculateCommissionSum(operationSum: number): number {
  const procentFromSum = +((operationSum * COMMISSION_EXCHANGE_AMOUNT) / PERCENTS_AMOUNT).toFixed(FRACTION_LENGTH);
  return procentFromSum;
}
