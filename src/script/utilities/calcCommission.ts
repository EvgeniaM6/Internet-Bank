import { COMMISSION_AMOUNT, COMMISSION_PERCENT, FRACTION_LENGTH, PERCENTS_AMOUNT } from '../data/constants';

export function calculateCommissionSum(operationSum: number): number {
  const procentFromSum = +((operationSum * COMMISSION_PERCENT) / PERCENTS_AMOUNT).toFixed(FRACTION_LENGTH);
  return procentFromSum < COMMISSION_AMOUNT ? COMMISSION_AMOUNT : procentFromSum;
}
