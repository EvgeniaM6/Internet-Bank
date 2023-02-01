import { COMMISSION_AMOUNT } from '../../data/constants';
import { EOperation } from '../../data/types';
import { moneyFetch } from '../../fetch/moneyFetch';
import { userFetch } from '../../fetch/userFetch';

class Payment {
  constructor() {
    console.log('Payment');
  }

  makePayment(sum: number, operationID: number): void {
    const token = this.getCurrentToken();
    if (token) {
      moneyFetch.changeMainMoney(sum, EOperation.REMOVE, token, operationID);
      userFetch.isOurUser('evg').then((resp) => {
        console.log('resp evg =', resp);
      });
    } else {
      const commissSum = COMMISSION_AMOUNT;
      moneyFetch.commission(commissSum, operationID);
    }
  }

  getCurrentToken(): string {
    const token = sessionStorage.getItem('token') || '';
    console.log('token=', token);
    return token;
  }
}

export const payment = new Payment();
