import { EOperation } from '../../data/types';
import { moneyFetch } from '../../fetch/moneyFetch';

class Payment {
  constructor() {
    console.log('Payment');
  }

  makePayment(sum: number, operationID: number): void {
    const token = this.getCurrentToken();
    moneyFetch.changeMainMoney(sum, EOperation.REMOVE, token, operationID);
  }

  getCurrentToken(): string {
    return '';
  }
}

export const payment = new Payment();
