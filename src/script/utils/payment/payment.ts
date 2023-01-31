import { EOperation } from '../../data/types';
import { moneyFetch } from '../../fetch/moneyFetch';

class Payment {
  constructor() {
    console.log('Payment');
  }

  makePayment(payType: string, sum: number, operationID: number): void {
    console.log('makePayment!', payType, sum, operationID);
    const token = this.getCurrentToken();
    moneyFetch.changeMainMoney(sum, EOperation.REMOVE, token, operationID);
  }

  getCurrentToken(): string {
    return '';
  }
}

export const payment = new Payment();
