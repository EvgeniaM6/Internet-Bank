import config from '../../data/config';
import {
  ID_CURRENCY_COMMON_EXCHANGE,
  ID_REFILL_SERVICE,
  ID_REMOVE_SERVICE,
  ID_TRANSFER_SERVICE,
  INDEX_START_BANK_SERVICES,
  INDEX_START_SERVICES,
  OPERATION_INPUT_DATA,
} from '../../data/constants/constants';
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
import { FOREIGN_CURRENCY, MAIN_CURRENCY } from '../../data/constants/currency';

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
    if (config.theme === 'dark') {
      createElem('div', 'back__text page-dark', backBtn, this.langs[config.lang].back__text);
    } else {
      createElem('div', 'back__text', backBtn, this.langs[config.lang].back__text);
    }
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
    const payDetails = createElem('div', 'operation__details');
    const payForm = createElem('form', 'operation__form form-paym', payDetails) as HTMLFormElement;
    payForm.name = `${operationId}`;

    this.renderInput('sum', payForm);
    this.renderInput(`${operationId}`, payForm);

    const currLang = this.langs[config.lang];

    if (!this.getCurrentToken()) {
      const isCommissExchange = operationId === INDEX_START_BANK_SERVICES;
      const commissionClassName = isCommissExchange ? 'operation__commission-exch' : 'operation__commission';
      const comissionText = currLang[commissionClassName];

      createElem('div', commissionClassName, payDetails, comissionText);
    } else if (operationId !== INDEX_START_BANK_SERVICES && operationId !== ID_REFILL_SERVICE) {
      const btnPay = createElem('button', 'form-paym__btn btn-colored unable', payDetails, currLang['form-paym__btn']);
      this.elemsForUpdatingText.btnPay = btnPay;
      btnPay.onclick = (e) => this.pay(e, payForm, operationId);
    }

    if (
      operationId !== ID_CURRENCY_COMMON_EXCHANGE &&
      operationId !== ID_REMOVE_SERVICE &&
      operationId !== ID_TRANSFER_SERVICE
    ) {
      const btnText = currLang[`form-paym__btn-card`];
      const btnPayByCard = createElem('button', 'form-paym__btn-card btn-colored unable', payDetails, btnText);
      this.elemsForUpdatingText.btnPayCard = btnPayByCard;
      btnPayByCard.onclick = (e) => this.payByCard(e, payForm, operationId);
    }

    operationContainer.append(payDetails);
  }

  pay(e: Event, payForm: HTMLFormElement, operationId: number): void {
    e.preventDefault();
    if (!this.canPay) return;
    const formElemsArr = Array.from(payForm.elements);
    const sumInput = formElemsArr.find((elem) => elem.id.split('_')[0] === 'sum');
    const operationSum = +(sumInput as HTMLInputElement).value;
    const paymentDetails: TPaymentDetails = { operationSum, operationId };

    this.saveSelectElemsToDetails(paymentDetails, formElemsArr);

    const userNameInput = formElemsArr.find((elem) => (elem as HTMLInputElement).name === 'user');
    if (userNameInput) {
      paymentDetails.userTo = (userNameInput as HTMLInputElement).value;
    }
    this.renderAnonimPayment(paymentDetails, false, true);
  }

  payByCard(e: Event, payForm: HTMLFormElement, operationId: number): void {
    e.preventDefault();
    if (!this.canPay) return;
    const formElemsArr = Array.from(payForm.elements);
    const sumInput = formElemsArr.find((elem) => elem.id.split('_')[0] === 'sum');
    const operationSum = +(sumInput as HTMLInputElement).value;
    const isAnonim = !this.getCurrentToken();
    const paymentDetails: TPaymentDetails = { operationSum, operationId };

    this.saveSelectElemsToDetails(paymentDetails, formElemsArr);
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
      } else if ((+inputId[0] === 1 || +inputId[0] === 2) && inputEl instanceof HTMLSelectElement) {
        return !!(inputEl as HTMLSelectElement).selectedIndex;
      } else {
        if (+inputId[0] === 1 && (inputEl as HTMLInputElement).name === 'card') {
          modalPayment.maskCardNumber.call(inputEl);
        }

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

    const btnsArr = [];
    const buttonPayCard = this.elemsForUpdatingText.btnPayCard;
    if (buttonPayCard) {
      btnsArr.push(buttonPayCard);
    }
    const buttonPay = this.elemsForUpdatingText.btnPay;
    if (buttonPay) {
      btnsArr.push(buttonPay);
    }

    btnsArr.forEach((btnElem) => {
      if (this.canPay) {
        btnElem.classList.remove('unable');
      } else {
        if (btnElem.classList.contains('unable')) return;
        btnElem.classList.add('unable');
      }
    });
  }

  updatePaymentText(): void {
    if (!this.currentOperationData) return;

    Object.keys(this.elemsForUpdatingText).forEach((key) => {
      const [elemType, operationId, inputIdx] = key.split('_');
      const elem = this.elemsForUpdatingText[key];

      switch (elemType) {
        case 'title':
          {
            const keyForText = config.lang === 'en' ? 'name' : 'ruName';
            elem.textContent = this.currentOperationData?.[keyForText] || '';
          }
          break;
        case 'input':
          {
            if (+operationId >= INDEX_START_SERVICES) {
              elem.title = OPERATION_INPUT_DATA[operationId][+inputIdx].hint[config.lang];
            }
          }
          break;
        case 'label':
          {
            elem.textContent = OPERATION_INPUT_DATA[operationId][+inputIdx].labelText[config.lang];
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
    const main = document.querySelector('.main') as HTMLElement;
    transition(main, renderPayment.renderPaymentsPage.bind(renderPayment));
  }

  renderInput(inputType: string, formElem: HTMLFormElement): void {
    const inputsData = OPERATION_INPUT_DATA[inputType];

    inputsData.forEach((inputData, i) => {
      const dataBlock = createElem('div', 'operation__form-block form-data');
      const dataLabel = createElem('label', 'form-data__label form-paym__label', dataBlock) as HTMLLabelElement;
      if (inputType === 'sum' && formElem.name !== '2') {
        createElem('div', 'operation__currency', dataBlock) as HTMLLabelElement;
      }

      const tagElemName = inputData.inputType === 'select' ? 'select' : 'input';
      const dataInput = createElem(tagElemName, 'form-paym__input', dataBlock);
      const inputId = `${inputType}_${i}`;
      dataInput.id = dataLabel.htmlFor = inputId;

      if (inputData.inputType === 'select') {
        (dataInput as HTMLSelectElement).name = `${i}`;
        this.renderOptions(inputData, dataInput as HTMLSelectElement);
      } else {
        const inpType = inputData.inputType;
        (dataInput as HTMLInputElement).type = inpType;
        (dataInput as HTMLInputElement).required = true;
        (dataInput as HTMLInputElement).placeholder = inputData.placeholder;
        (dataInput as HTMLInputElement).name = inputData.name;
        const pattern = inputData.regex;
        if (pattern) {
          (dataInput as HTMLInputElement).pattern = pattern;
        }
        const maxLeng = inputData.maxLeng;
        if (maxLeng) {
          (dataInput as HTMLInputElement).maxLength = maxLeng;
        }
      }

      this.elemsForUpdatingText[`input_${inputId}`] = dataInput;
      this.elemsForUpdatingText[`label_${inputId}`] = dataLabel;

      dataInput.addEventListener('input', () => this.checkInputsValidity(formElem));

      formElem.append(dataBlock);
    });
  }

  renderOptions(inputData: TInputData, selectElem: HTMLSelectElement): void {
    const isAnonimExchange = inputData.name === 'currency';

    const optionDefaultText = inputData.optionDefalt;
    if (optionDefaultText) {
      this.renderOption(optionDefaultText[config.lang], selectElem, isAnonimExchange, true);
    }

    if (isAnonimExchange) {
      FOREIGN_CURRENCY.forEach((currency) => {
        this.renderOption(currency, selectElem, isAnonimExchange);
      });
    } else {
      this.renderOption(MAIN_CURRENCY, selectElem, isAnonimExchange);

      userFetch.user(EMethod.GET, this.getCurrentToken()).then((resp) => {
        resp.userConfig?.accounts.forEach((userCurrencyAcc) => {
          this.renderOption(userCurrencyAcc.currency, selectElem, isAnonimExchange);
        });
      });
    }
  }

  renderOption(currency: string, selectElem: HTMLSelectElement, isAnonimExchange: boolean, isDefault?: boolean): void {
    let clasName: string;
    if (isDefault) {
      clasName = isAnonimExchange ? `option-default-anonim` : `option-default-${selectElem.id}`;
    } else {
      clasName = isAnonimExchange ? `option-anonim_${currency}` : `option_${currency}`;
    }

    const optionText = this.langs[config.lang][clasName];
    const option = createElem('option', `form-paym__option ${clasName}`, selectElem, optionText) as HTMLOptionElement;
    if (isDefault) {
      option.disabled = true;
    } else {
      option.value = currency;
    }
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

  saveSelectElemsToDetails(paymentDetails: TPaymentDetails, formElemsArr: Element[]): void {
    const formSelectElemsArr = formElemsArr.filter((elem) => elem instanceof HTMLSelectElement);
    if (formSelectElemsArr.length) {
      const selectValuesArr = formSelectElemsArr.map((elem) => (elem as HTMLSelectElement).value);
      if (formSelectElemsArr.length === 2) {
        paymentDetails.currFrom = selectValuesArr[0];
        paymentDetails.currTo = selectValuesArr[1];
      } else {
        paymentDetails.currTo = selectValuesArr[0];
      }
    }
  }
}

export const renderPaymentDetails = new RenderPaymentDetails();
