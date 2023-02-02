import { EOperation } from '../../data/types';
import { moneyFetch } from '../../fetch/moneyFetch';

class Payment {
  constructor() {
    console.log('Payment');
  }

  makePayment(sum: number, operationID: number): void {
    const token = this.getCurrentToken();
    // if (token) {
    moneyFetch.changeMainMoney(sum, EOperation.REMOVE, token, operationID).then((resp) => {
      console.log('resp=', resp);
    });
    // } else {
    //   const commissSum = calculateCommissionSum(sum);
    //   console.log('commissSum=', commissSum);
    //   moneyFetch.commission(commissSum, operationID);
    // }
  }

  getCurrentToken(): string {
    const token = sessionStorage.getItem('token') || '';
    console.log('token=', token);
    return token;
  }
}

export const payment = new Payment();
