import { COMMISSION_AMOUNT, INDEX_START_SERVICES } from '../../data/constants';
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

  renderPayment(paymentType: string, operationID: number): void {
    this.main.innerHTML = '';
    const cart = createElem('div', '', this.main, paymentType);

    const payForm = createElem('form', '', cart) as HTMLFormElement;
    const sumInput = createElem('input', '', payForm) as HTMLInputElement;
    sumInput.type = 'number';
    sumInput.required = true;
    sumInput.placeholder = '10.00';
    // sumInput.pattern = `/^\\d+(\\.\\d\\d)?$/gi`;
    sumInput.addEventListener('input', () => this.checkInputsValidity(payForm));

    const dataInput = createElem('input', '', payForm) as HTMLInputElement;
    dataInput.type = 'text';
    dataInput.required = true;
    dataInput.addEventListener('input', () => this.checkInputsValidity(payForm));

    if (!payment.getCurrentToken()) {
      createElem('div', '', cart, `Commission for this operation is ${COMMISSION_AMOUNT}`) as HTMLFormElement;
    }

    const btn = createElem('button', '', payForm, 'pay');

    btn.addEventListener('click', (e) => this.pay(e, payForm, operationID));
  }

  pay(e: Event, payForm: HTMLFormElement, operationID: number): void {
    e.preventDefault();
    // const paymentSum = +sumInput.value || 0;
    // payment.makePayment(paymentSum, operationID);
  }

  checkInputsValidity(payForm: HTMLFormElement): void {
    console.log('payForm=', payForm);
    const canPay = Array.from(payForm.elements).every((input) => {
      console.log('input=', (input as HTMLInputElement).value);
      return true;
    });
    // if (canPay) {
    // }
  }
}

export const renderPayment = new RenderPayment();
