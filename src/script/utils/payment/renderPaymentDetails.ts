import config from '../../data/config';
import { operationInputData } from '../../data/constants';
import { TElemsForUpdateText, TLang, TServiceDetails } from '../../data/servicesType';
import { EOperation } from '../../data/types';
import { moneyFetch } from '../../fetch/moneyFetch';
import { createElem } from '../../utilities/createElem';
import { validate } from '../validate';
import { modalPayment } from './modalPayment';
import { renderPayment } from './renderPayment';
import en from '../../data/lang/paymDetails/en';
import ru from '../../data/lang/paymDetails/ru';

class RenderPaymentDetails {
  main = document.querySelector('main') as HTMLElement;
  elemsForUpdatingText: TElemsForUpdateText = {};
  currentOperationData: TServiceDetails | null = null;
  canPay = false;
  langs: TLang = {
    en,
    ru,
  };

  renderPayment(operationId: number): void {
    window.scrollTo(0, 0);
    this.currentOperationData = renderPayment.getOparationData(operationId);
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
    createElem(
      'span',
      'operation__category-text',
      operationCategory,
      this.langs[config.lang]['operation__category-text']
    );
    createElem('span', 'operation__category-type', operationCategory, this.currentOperationData.category);

    const payDetails = createElem('div', 'operation__details', operation) as HTMLFormElement;
    const payForm = createElem('form', 'operation__form form-paym', payDetails) as HTMLFormElement;

    const sumBlock = createElem('div', 'operation__form-block form-sum', payForm);
    const sumLabel = createElem('label', 'form-sum__label form-paym__label', sumBlock) as HTMLLabelElement;

    const sumInput = createElem('input', 'form-sum__input form-paym__input', sumBlock) as HTMLInputElement;
    sumInput.id = sumLabel.htmlFor = 'sum';
    sumInput.type = 'number';
    sumInput.required = true;
    sumInput.placeholder = operationInputData.sum.placeholder;
    sumInput.addEventListener('input', () => this.checkInputsValidity(payForm));

    this.elemsForUpdatingText[`input_${sumInput.id}`] = sumInput;
    this.elemsForUpdatingText[`label_${sumInput.id}`] = sumLabel;

    const dataBlock = createElem('div', 'operation__form-block form-data', payForm);
    const dataLabel = createElem('label', 'form-data__label form-paym__label', dataBlock) as HTMLLabelElement;

    const dataInput = createElem('input', 'form-paym__input', dataBlock) as HTMLInputElement;
    dataInput.id = dataLabel.htmlFor = `${operationId}`;
    dataInput.type = 'text';
    dataInput.required = true;

    const inputData = operationInputData[`${operationId}`];
    if (inputData) {
      dataInput.placeholder = inputData.placeholder;
    }
    this.elemsForUpdatingText[`input_${dataInput.id}`] = dataInput;
    this.elemsForUpdatingText[`label_${dataInput.id}`] = dataLabel;

    dataInput.addEventListener('input', () => this.checkInputsValidity(payForm));

    if (!this.getCurrentToken()) {
      createElem(
        'div',
        'operation__commission',
        payDetails,
        this.langs[config.lang].operation__commission
      ) as HTMLFormElement;
    } else {
      const btnPay = createElem(
        'button',
        'form-paym__btn btn-colored unable',
        payDetails,
        this.langs[config.lang]['form-paym__btn']
      );
      this.elemsForUpdatingText.btnPay = btnPay;
      btnPay.addEventListener('click', (e) => this.pay(e, sumInput, operationId));
    }

    const btnPayByCard = createElem(
      'button',
      'form-paym__btn-card btn-colored unable',
      payDetails,
      this.langs[config.lang][`form-paym__btn-card`]
    );
    this.elemsForUpdatingText.btnPayCard = btnPayByCard;
    btnPayByCard.addEventListener('click', (e) => this.payByCard(e, sumInput, operationId));

    this.updatePaymentText();

    // test
    // const btnLang = createElem('button', '', operation, 'en/ru');
    // btnLang.addEventListener('click', () => this.toggleLang());
  }

  pay(e: Event, sumInput: HTMLInputElement, operationId: number): void {
    e.preventDefault();
    if (!this.canPay) return;
    const paymentSum = +(sumInput as HTMLInputElement).value;

    const token = this.getCurrentToken();

    moneyFetch.changeMainMoney(paymentSum, EOperation.REMOVE, token, operationId).then((resp) => {
      console.log('Pay resp=', resp);
      const popupMessage = createElem('div', 'popup popup-message', document.body);

      const message = resp.success ? this.langs[config.lang].modalInfoMessage : '';
      popupMessage.innerHTML = modalPayment.modalInfoMessage(message);

      setTimeout(() => {
        popupMessage.remove();
        renderPayment.renderPaymentsPage();
      }, 3000);
    });
  }

  payByCard(e: Event, sumInput: HTMLInputElement, operationId: number): void {
    e.preventDefault();
    if (!this.canPay) return;
    const paymentSum = +(sumInput as HTMLInputElement).value;
    const isAnonim = !config.currentUser;

    this.renderAnonimPayment(paymentSum, operationId, isAnonim);
  }

  checkInputsValidity(payForm: HTMLFormElement): void {
    this.canPay = Array.from(payForm.elements).every((inputEl) => {
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

    console.log('this.canPay=', this.canPay);

    const buttonPay = this.elemsForUpdatingText.btnPay;
    const buttonPayCard = this.elemsForUpdatingText.btnPayCard;
    if (!buttonPayCard) return;

    if (this.canPay) {
      buttonPayCard.classList.remove('unable');
      if (buttonPay) {
        buttonPay.classList.remove('unable');
      }
    } else {
      if (!buttonPayCard.classList.contains('unable')) {
        buttonPayCard.classList.add('unable');
      }

      if (buttonPay) {
        if (!buttonPay.classList.contains('unable')) {
          buttonPay.classList.add('unable');
        }
      }
    }
  }

  updatePaymentText(): void {
    if (!this.currentOperationData) return;

    Object.keys(this.elemsForUpdatingText).forEach((key) => {
      const keysArr = key.split('_');
      const elem = this.elemsForUpdatingText[key];

      switch (keysArr[0]) {
        case 'title':
          {
            const keyForText = config.lang === 'en' ? 'name' : 'ruName';
            elem.textContent = this.currentOperationData?.[keyForText] || '';
          }
          break;
        case 'input':
          {
            const elemId = elem.id;
            elem.title = operationInputData[elemId].hint[config.lang];
          }
          break;
        case 'label':
          {
            const elemFor = (elem as HTMLLabelElement).htmlFor;
            elem.textContent = operationInputData[elemFor].labelText[config.lang];
          }
          break;
        default:
          break;
      }
    });
  }

  renderAnonimPayment(paymentSum: number, operationId: number, isAnonim: boolean): void {
    modalPayment.renderModalPayment(paymentSum, operationId, isAnonim);
  }

  getCurrentToken(): string {
    const token = sessionStorage.getItem('token') || '';
    console.log('token=', token);
    return token;
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
