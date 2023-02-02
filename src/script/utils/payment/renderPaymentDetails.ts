import config from '../../data/config';
import { operationInputData } from '../../data/constants';
import { TElemsForUpdateText, TServiceDetails } from '../../data/servicesType';
import { createElem } from '../../utilities/createElem';
import { validate } from '../validate';
import { modalPayment } from './modalPayment';
import { payment } from './payment';
import { renderPayment } from './renderPayment';

class RenderPaymentDetails {
  main = document.querySelector('main') as HTMLElement;
  elemsForUpdatingText: TElemsForUpdateText = {};
  currentOperationData: TServiceDetails | null = null;
  canPay = false;
  currLang = 'en';

  renderPayment(operationID: number): void {
    this.currentOperationData = renderPayment.getOparationData(operationID);
    if (!this.currentOperationData) return;

    this.main.innerHTML = '';
    const operation = createElem('div', 'operation', this.main);

    const operationInfo = createElem('div', 'operation__info', operation);

    const operationImgBlock = createElem('div', 'operation__img', operationInfo);
    const logo = this.currentOperationData.logo;
    if (logo) {
      operationImgBlock.style.backgroundColor = 'transparent';
      operationImgBlock.style.backgroundImage = `url(${logo})`;
    }

    const operationMain = createElem('div', 'operation__main', operationInfo);
    const operationName = createElem('p', 'operation__title', operationMain);
    this.elemsForUpdatingText.title = operationName;

    const operationCategory = createElem('p', 'operation__category', operationMain);
    createElem('span', 'operation__category-text', operationCategory);
    createElem('span', 'operation__category-type', operationCategory, this.currentOperationData.category);

    const payDetails = createElem('form', 'operation__details', operation) as HTMLFormElement;
    const payForm = createElem('form', 'operation__form form', payDetails) as HTMLFormElement;

    const sumBlock = createElem('div', 'operation__form-block form-sum', payForm);
    const sumLabel = createElem('label', 'form-sum__label form__label', sumBlock) as HTMLLabelElement;

    const sumInput = createElem('input', 'form-sum__input form__input', sumBlock) as HTMLInputElement;
    sumInput.id = sumLabel.htmlFor = 'sum';
    sumInput.type = 'number';
    sumInput.required = true;
    sumInput.placeholder = operationInputData.sum.placeholder;
    sumInput.addEventListener('input', () => this.checkInputsValidity(payForm));

    this.elemsForUpdatingText[`input_${sumInput.id}`] = sumInput;
    this.elemsForUpdatingText[`label_${sumInput.id}`] = sumLabel;

    const dataBlock = createElem('div', 'operation__form-block form-data', payForm);
    const dataLabel = createElem('label', 'form-data__label form__label', dataBlock) as HTMLLabelElement;

    const dataInput = createElem('input', 'form__input', dataBlock) as HTMLInputElement;
    dataInput.id = dataLabel.htmlFor = `${operationID}`;
    dataInput.type = 'text';
    dataInput.required = true;

    const inputData = operationInputData[`${operationID}`];
    if (inputData) {
      dataInput.placeholder = inputData.placeholder;
    }
    this.elemsForUpdatingText[`input_${dataInput.id}`] = dataInput;
    this.elemsForUpdatingText[`label_${dataInput.id}`] = dataLabel;

    dataInput.addEventListener('input', () => this.checkInputsValidity(payForm));

    if (!payment.getCurrentToken()) {
      createElem('div', 'operation__commission', payDetails) as HTMLFormElement;
    }

    const btn = createElem('button', 'form__btn btn-colored unable', payDetails);
    this.elemsForUpdatingText.btnPay = btn;

    btn.addEventListener('click', (e) => this.pay(e, sumInput, operationID));

    this.updatePaymentText();

    // test
    // const btnLang = createElem('button', '', operation, 'en/ru');
    // btnLang.addEventListener('click', () => this.toggleLang());
  }

  pay(e: Event, sumInput: HTMLInputElement, operationID: number): void {
    e.preventDefault();
    if (!this.canPay) return;
    const paymentSum = +(sumInput as HTMLInputElement).value;

    if (!config.currentUser) {
      this.renderAnonimPayment(paymentSum);
    } else {
      payment.makePayment(paymentSum, operationID);
      console.log('pay!');
    }
  }

  checkInputsValidity(payForm: HTMLFormElement): void {
    const canPay = Array.from(payForm.elements).every((inputEl) => {
      const inputId = inputEl.id;
      if (!inputId) return true;
      if (inputId === 'sum' && +(inputEl as HTMLInputElement).value <= 0) {
        if (!inputEl.classList.contains('invalid')) {
          inputEl.classList.add('invalid');
        }
        return false;
      }
      const regExpForValidate = operationInputData[`${inputId}`];
      if (!regExpForValidate) return true;
      const isCorrectValue = validate(inputEl as HTMLInputElement, regExpForValidate.regex);
      return isCorrectValue;
    });

    console.log('canPay=', canPay);

    const buttonPay = this.elemsForUpdatingText.btnPay;
    if (!buttonPay) return;
    if (canPay) {
      this.canPay = true;
      buttonPay.classList.remove('unable');
    } else {
      if (!buttonPay.classList.contains('unable')) {
        this.canPay = false;
        buttonPay.classList.add('unable');
      }
    }
  }

  updatePaymentText(): void {
    if (!this.currentOperationData) return;

    const currentLang = this.getCurrentLang();

    Object.keys(this.elemsForUpdatingText).forEach((key) => {
      const keysArr = key.split('_');
      const elem = this.elemsForUpdatingText[key];

      switch (keysArr[0]) {
        case 'title':
          {
            const keyForText = currentLang === 'en' ? 'name' : 'ruName';
            elem.textContent = this.currentOperationData?.[keyForText] || '';
          }
          break;
        case 'input':
          {
            const elemId = elem.id;
            elem.title = operationInputData[elemId].hint[currentLang];
          }
          break;
        case 'label':
          {
            const elemFor = (elem as HTMLLabelElement).htmlFor;
            elem.textContent = operationInputData[elemFor].labelText[currentLang];
          }
          break;
        default:
          break;
      }
    });
  }

  getCurrentLang(): string {
    return this.currLang;
  }

  renderAnonimPayment(paymentSum: number): void {
    modalPayment.drawModalPayment(paymentSum);
  }

  // toggleLang(): void {
  //   if (this.currLang === 'en') {
  //     this.currLang = 'ru';
  //   } else {
  //     this.currLang = 'en';
  //   }

  //   this.updatePaymentText();
  // }
}

export const renderPaymentDetails = new RenderPaymentDetails();
