import { COMMISSION_AMOUNT } from '../../data/constants';
import { createElem } from '../../utilities/createElem';
import { payment } from './payment';

class RenderPaymentDetails {
  main = document.querySelector('main') as HTMLElement;

  renderPayment(operationID: number): void {
    this.main.innerHTML = '';
    const card = createElem('div', '', this.main);

    const payForm = createElem('form', '', card) as HTMLFormElement;
    const sumLabel = createElem('label', '', payForm) as HTMLLabelElement;
    const sumInput = createElem('input', '', payForm) as HTMLInputElement;
    sumInput.id = sumLabel.htmlFor = 'sum';
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
      createElem('div', '', card, `Commission for this operation is ${COMMISSION_AMOUNT}`) as HTMLFormElement;
    }

    const btn = createElem('button', 'unable', payForm, 'pay');

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

export const renderPaymentDetails = new RenderPaymentDetails();
