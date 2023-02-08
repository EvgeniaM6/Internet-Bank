import config from '../../data/config';
import { INDEX_START_SERVICES, operationInputData } from '../../data/constants/constants';
import { TElemsForUpdateText, TInputData, TLang, TPaymentDetails, TServiceDetails } from '../../data/servicesType';
import { createElem } from '../../utilities/createElem';
import { validate } from '../validate';
import { modalPayment } from './modalPayment';
import { renderPayment } from './renderPayment';
import en from '../../data/lang/payment/en';
import ru from '../../data/lang/payment/ru';
import { transition } from '../transition';
import { userFetch } from '../../fetch/userFetch';
import { EMethod } from '../../data/types';

class RenderPaymentDetails {
  main = document.querySelector('.main-container') as HTMLElement;
  elemsForUpdatingText: TElemsForUpdateText = {};
  currentOperationData: TServiceDetails | null = null;
  canPay = false;
  langs: TLang = {
    en,
    ru,
  };

  renderPayment(operationId: number): void {
    this.currentOperationData = renderPayment.getOparationData(operationId);
    if (!this.currentOperationData) return;

    this.main.innerHTML = '';
    this.main.className = 'container main-container';
    window.scrollTo(0, 0);
    const operation = createElem('div', 'operation', this.main);

    const backBtnBlock = createElem('div', 'operation__back back', operation);
    const backBtn = createElem('button', 'back__btn', backBtnBlock);
    createElem('div', 'back__arrow', backBtn);
    createElem('div', 'back__text', backBtn, this.langs[config.lang].back__text);
    backBtn.addEventListener('click', () => this.backToAllServices());

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

    this.renderCommonService(operationId, operation);

    this.updatePaymentText();
  }

  renderCommonService(operationId: number, operationContainer: HTMLElement): void {
    const payDetails = createElem('div', 'operation__details') as HTMLFormElement;
    const payForm = createElem('form', 'operation__form form-paym', payDetails) as HTMLFormElement;
    payForm.name = `service`;

    this.renderInput('sum', payForm);
    this.renderInput(`${operationId}`, payForm);

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
      btnPay.addEventListener('click', (e) => this.pay(e, payForm, operationId));
    }

    if (operationId !== 2) {
      const btnPayByCard = createElem(
        'button',
        'form-paym__btn-card btn-colored unable',
        payDetails,
        this.langs[config.lang][`form-paym__btn-card`]
      );
      this.elemsForUpdatingText.btnPayCard = btnPayByCard;
      btnPayByCard.addEventListener('click', (e) => this.payByCard(e, payForm, operationId));
    }

    operationContainer.append(payDetails);
  }

  pay(e: Event, payForm: HTMLFormElement, operationId: number): void {
    e.preventDefault();
    if (!this.canPay) return;
    const sumInput = Array.from(payForm.elements).find((elem) => elem.id.split('_')[0] === 'sum');
    const operationSum = +(sumInput as HTMLInputElement).value;
    const paymentDetails: TPaymentDetails = { operationSum, operationId };

    this.renderAnonimPayment(paymentDetails, false, true);
  }

  payByCard(e: Event, payForm: HTMLFormElement, operationId: number): void {
    e.preventDefault();
    if (!this.canPay) return;
    const sumInput = Array.from(payForm.elements).find((elem) => elem.id.split('_')[0] === 'sum');
    const operationSum = +(sumInput as HTMLInputElement).value;
    const isAnonim = !this.getCurrentToken();
    const paymentDetails: TPaymentDetails = { operationSum, operationId };

    this.renderAnonimPayment(paymentDetails, isAnonim);
  }

  checkInputsValidity(payForm: HTMLFormElement): void {
    const formElemsArr = Array.from(payForm.elements);

    this.canPay = formElemsArr.every((inputEl) => {
      const inputId = inputEl.id.split('_');
      if (!inputId.length) return true;
      if (inputId[0] === 'sum' && +(inputEl as HTMLInputElement).value <= 0) {
        if (!inputEl.classList.contains('invalid')) {
          inputEl.classList.add('invalid');
        }
        return false;
      } else if (+inputId[0] === 2) {
        return !!(inputEl as HTMLSelectElement).selectedIndex;
      } else {
        const inputPattern = (inputEl as HTMLInputElement).pattern;
        if (!inputPattern) return true;

        const isCorrectValue = validate(inputEl as HTMLInputElement, inputPattern);
        return isCorrectValue;
      }
    });

    const selectElemsArr = formElemsArr.filter((inputEl) => {
      return inputEl instanceof HTMLSelectElement;
    });
    if (selectElemsArr.length > 1) {
      this.checkOptions(selectElemsArr as HTMLSelectElement[]);
    }

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
            if (+keysArr[1] >= 14) {
              elem.title = operationInputData[keysArr[1]][+keysArr[2]].hint[config.lang];
            }
          }
          break;
        case 'label':
          {
            elem.textContent = operationInputData[keysArr[1]][+keysArr[2]].labelText[config.lang];
          }
          break;
        default:
          break;
      }
    });
  }

  renderAnonimPayment(paymentDetails: TPaymentDetails, isAnonim: boolean, isNotCard?: boolean): void {
    modalPayment.renderModalPayment(paymentDetails, isAnonim, !!isNotCard);
  }

  getCurrentToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  backToAllServices(): void {
    transition(this.main, renderPayment.renderPaymentsPage.bind(renderPayment));
  }

  renderInput(inputType: string, formElem: HTMLFormElement): void {
    const inputsData = operationInputData[inputType];
    console.log('inputsData=', inputsData);

    inputsData.forEach((inputData, i) => {
      const dataBlock = createElem('div', 'operation__form-block form-data');
      const dataLabel = createElem('label', 'form-data__label form-paym__label', dataBlock) as HTMLLabelElement;
      if (inputType === 'sum') {
        createElem('div', 'operation__currency', dataBlock) as HTMLLabelElement;
      }

      const tagElemName = inputData.inputType === 'select' ? 'select' : 'input';
      const dataInput = createElem(tagElemName, 'form-paym__input', dataBlock);
      const inputId = `${inputType}_${i}`;
      dataInput.id = dataLabel.htmlFor = inputId;
      console.log('dataInput=', dataInput);

      if (inputData.inputType === 'select') {
        console.log('select!');
        (dataInput as HTMLSelectElement).name = `${i}`;
        this.renderOptions(inputData, dataInput as HTMLSelectElement);
        console.log('initial dataInput val=', (dataInput as HTMLSelectElement).value);
      } else {
        (dataInput as HTMLInputElement).type = inputData.inputType;
        (dataInput as HTMLInputElement).required = true;
        (dataInput as HTMLInputElement).placeholder = inputData.placeholder;
        console.log('initial dataInput val=', (dataInput as HTMLInputElement).value);
      }

      this.elemsForUpdatingText[`input_${inputId}`] = dataInput;
      this.elemsForUpdatingText[`label_${inputId}`] = dataLabel;

      dataInput.addEventListener('input', () => this.checkInputsValidity(formElem));

      formElem.append(dataBlock);
    });
  }

  renderOptions(inputData: TInputData, selectElem: HTMLSelectElement): void {
    const optionDefaultText = inputData.optionDefalt;
    if (optionDefaultText) {
      const optionDefaultElem = createElem(
        'option',
        'form-paym__option',
        selectElem,
        optionDefaultText[config.lang]
      ) as HTMLOptionElement;
      optionDefaultElem.disabled = true;
    }

    userFetch.user(EMethod.GET, this.getCurrentToken()).then((resp) => {
      resp.userConfig?.accounts.forEach((userCurrencyAcc) => {
        const optionText = `My acc in ${userCurrencyAcc.currency}`;
        const option = createElem('option', 'form-paym__option', selectElem, optionText) as HTMLOptionElement;
        option.value = userCurrencyAcc;
      });
    });
  }

  checkOptions(selectElemsArr: HTMLSelectElement[]): void {
    selectElemsArr.forEach((selectEl) => {
      const selectedOption = (selectEl as HTMLSelectElement).value;
      const idxSelectEl = +(selectEl as HTMLSelectElement).name;
      const otherSelectElemsArr = selectElemsArr.filter((selectElem) => {
        return +(selectElem as HTMLSelectElement).name !== idxSelectEl;
      });

      otherSelectElemsArr.forEach((otherSelectElem) => {
        const optionsArr = Array.from((otherSelectElem as HTMLSelectElement).options);
        optionsArr.forEach((optionElem, i) => {
          if (!i) return;
          optionElem.disabled = optionElem.value === selectedOption;
        });
      });
    });
  }
}

export const renderPaymentDetails = new RenderPaymentDetails();
