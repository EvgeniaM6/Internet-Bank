import { COMMISSION_AMOUNT } from '../../data/constants';
import { EOperation } from '../../data/types';
import { moneyFetch } from '../../fetch/moneyFetch';
import { userFetch } from '../../fetch/userFetch';

class Payment {
  constructor() {
    console.log('Payment');
    sessionStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDdmNWE4NTMzMzJlYTI3YmZhMzQ4MyIsImlhdCI6MTY3NTA5Nzc0NH0.3WDMi60yspkcXcKABMM-waYSwzqhl-SEq1FZsE4chRI'
    );
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
    return sessionStorage.getItem('token') || '';
  }
}

export const payment = new Payment();
