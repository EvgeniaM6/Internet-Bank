// import { TServices } from '../../data/servicesType';
import { IMainRes } from '../../data/types';
import { servicesFetch } from '../../fetch/servicesFetch';
import { createElem } from '../../utilities/createElem';
import { payment } from './payment';

class RenderPayment {
  main = document.querySelector('main') as HTMLElement;

  renderPaymentsPage(): void {
    console.log('renderPaymentsPage!');
    this.main.innerHTML = '';
    servicesFetch.getServicesList().then((response: IMainRes) => {
      console.log('response=', response);
      // Object.keys(response.operations).forEach((operation) => {
      //   this.renderPaymentCart(operation);
      // });
    });
  }

  renderPaymentCart(payment: string, operationID: number): void {
    const cart = createElem('div', '', this.main, payment);
    const btn = createElem('button', '', cart, 'go to payment');

    btn.addEventListener('click', () => this.renderPayment(payment, operationID));
  }

  renderPayment(payment: string, operationID: number): void {
    this.main.innerHTML = '';
    const cart = createElem('div', '', this.main, payment);
    const sumInput = createElem('input', '', cart) as HTMLInputElement;
    sumInput.type = 'number';
    const btn = createElem('button', '', cart, 'pay');

    btn.addEventListener('click', () => this.pay(payment, sumInput, operationID));
  }

  pay(paymentType: string, sumInput: HTMLInputElement, operationID: number): void {
    const paymentSum = +sumInput.value || 0;
    payment.makePayment(paymentType, paymentSum, operationID);
  }
}

export const renderPayment = new RenderPayment();
