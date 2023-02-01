import { COMMISSION_AMOUNT, INDEX_START_SERVICES } from '../../data/constants';
import { IServiceObj, IServices, TElemsForUpdateText } from '../../data/servicesType';
import { IMainRes } from '../../data/types';
import { servicesFetch } from '../../fetch/servicesFetch';
import { createElem } from '../../utilities/createElem';
import { payment } from './payment';

class RenderPayment {
  main = document.querySelector('main') as HTMLElement;
  operationsResp: IServiceObj = {};
  elemsForUpdatingText: TElemsForUpdateText = {};

  renderPaymentsPage(): void {
    this.main.innerHTML = '';
    const operationsContainer = createElem('div', 'operations', this.main);

    servicesFetch.getServicesList().then((response: IMainRes) => {
      const operationsObj = (response as IServices).operations as IServiceObj;
      this.elemsForUpdatingText = {};

      Object.keys(operationsObj).forEach((operationID) => {
        if (+operationID < INDEX_START_SERVICES) return;
        this.operationsResp[operationID] = operationsObj[operationID];

        this.renderPaymentCard(operationID, operationsContainer);
      });

      this.updatePaymentCardsText();
    });
  }

  renderPaymentCard(operationID: string, container: HTMLElement): void {
    const card = createElem('div', 'operations__card card');

    const operationImgBlock = createElem('div', 'card__img', card);
    const operationImg = createElem('img', null, operationImgBlock) as HTMLImageElement;
    const logo = this.operationsResp[operationID].logo;
    if (logo) {
      operationImg.src = logo;
    }

    const operationName = createElem('p', 'card__title', card);
    this.elemsForUpdatingText[`${operationID}_operation-title`] = operationName;

    const btn = createElem('button', 'card__btn', card, 'go to payment');

    btn.addEventListener('click', () => this.renderPayment(+operationID));

    container.append(card);
  }

  renderPayment(operationID: number): void {
    this.main.innerHTML = '';
    const card = createElem('div', '', this.main);

    const payForm = createElem('form', '', card) as HTMLFormElement;
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

  updatePaymentCardsText(): void {
    console.log('updatePaymentCardsText!');
    const currentLang = this.getCurrentLang();
    const keyForText = currentLang === 'en' ? 'name' : 'ruName';

    Object.keys(this.elemsForUpdatingText).forEach((key) => {
      console.log('key=', key);
      const [operationID, elemType] = key.split('_');
      if (elemType === 'operation-title') {
        console.log('operationID=', operationID);
        console.log('elemType=', elemType);
        const elemForUpdate = this.elemsForUpdatingText[key];
        console.log('elemForUpdate=', elemForUpdate);
        console.log('this.operationsResp[operationID]=', this.operationsResp[operationID]);
        const textForElem = this.operationsResp[operationID][keyForText];
        console.log('textForElem=', textForElem);
        elemForUpdate.textContent = textForElem;
      }
    });
  }

  getCurrentLang(): string {
    return 'en';
  }
}

export const renderPayment = new RenderPayment();
