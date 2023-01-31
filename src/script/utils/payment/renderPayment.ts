import { INDEX_START_SERVICES } from '../../data/constants';
import { IServiceObj, IServices } from '../../data/servicesType';
import { IMainRes } from '../../data/types';
import { servicesFetch } from '../../fetch/servicesFetch';
import { createElem } from '../../utilities/createElem';
import { payment } from './payment';

class RenderPayment {
  main = document.querySelector('main') as HTMLElement;

  renderPaymentsPage(): void {
    this.main.innerHTML = '';

    servicesFetch.getServicesList().then((response: IMainRes) => {
      const operationsObj = (response as IServices).operations as IServiceObj;

      Object.keys(operationsObj).forEach((operation) => {
        if (+operation < INDEX_START_SERVICES) return;
        this.renderPaymentCart(operationsObj[operation].name, +operation);
      });
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

    btn.addEventListener('click', () => this.pay(sumInput, operationID));
  }

  pay(sumInput: HTMLInputElement, operationID: number): void {
    const paymentSum = +sumInput.value || 0;
    payment.makePayment(paymentSum, operationID);
  }
}

export const renderPayment = new RenderPayment();
