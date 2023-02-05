import { createElem } from '../../utilities/index';
import { renderPayment } from './renderPayment';
import invoiceCard from '../../../assets/img/payment-system/invoice.png';
import americanExpressCard from '../../../assets/img/payment-system/american-express.png';
import visaCard from '../../../assets/img/payment-system/visa.png';
import mastercardCard from '../../../assets/img/payment-system/mastercard.png';
import en from '../../data/lang/modalPaym/en';
import ru from '../../data/lang/modalPaym/ru';
import { TElemsForUpdateText, TLang } from '../../data/servicesType';
import { moneyFetch } from '../../fetch/moneyFetch';
import config from '../../data/config';
import { validate } from '../validate';
import { COMMISSION_AMOUNT } from '../../data/constants';
import { load } from '../load';
import { transition } from '../transition';
import { listenHeader } from '../main/listenHeader';

class ModalPayment {
  value?: string;
  canPay = false;
  btnConfirm: HTMLButtonElement | null = null;
  langs: TLang = {
    en,
    ru,
  };
  emailInputs: TElemsForUpdateText = {};

  renderModalPayment(paymentSum: number, operationId: number, isAnonim: boolean): void {
    const popup = createElem('div', 'popup', document.body);
    popup.addEventListener('click', (e) => this.closePopUp(e));

    popup.innerHTML = this.modalPaymentTemplate();
    this.btnConfirm = popup.querySelector('.btn--col-3');

    const form = popup.querySelector('#payment-form');
    form?.addEventListener('submit', (e) => this.confirmPayment(e, operationId, isAnonim, popup));
    form?.addEventListener('input', (e) => this.checkForm(e));

    const cardDataValidThru = popup.querySelector('#valid-thru') as HTMLInputElement;
    cardDataValidThru?.addEventListener('invalid', (e) => this.showValidity(e.target as HTMLInputElement));

    const popupContent = popup.querySelector('.popup__content');
    const personalDetails = createElem('div', 'form__person-details');
    createElem('h2', 'form__title modal-personal', personalDetails, this.langs[config.lang]['modal-personal']);

    const needEmailCheckboxBlock = createElem('div', 'form__email', personalDetails);
    const needEmailCheckbox = createElem('input', 'form__email-input', needEmailCheckboxBlock) as HTMLInputElement;
    needEmailCheckbox.type = 'checkbox';
    const needEmailCheckboxLabel = createElem(
      'label',
      'form__email-label',
      needEmailCheckboxBlock,
      this.langs[config.lang]['form__email-label']
    ) as HTMLLabelElement;
    needEmailCheckbox.id = needEmailCheckboxLabel.htmlFor = 'need-email';
    this.emailInputs['checkbox-input'] = needEmailCheckbox;

    const emailInput = createElem('input', 'form__item input--payment', personalDetails) as HTMLInputElement;
    emailInput.name = emailInput.type = 'email';
    emailInput.placeholder = 'E-mail';
    emailInput.required = emailInput.disabled = true;
    emailInput.pattern = '.+@\\w+\\.\\w+';
    this.emailInputs['email-input'] = emailInput;
    popupContent?.prepend(personalDetails);

    needEmailCheckbox.addEventListener('input', (e) =>
      this.checkNeedEmailInput(e.target as HTMLInputElement, emailInput)
    );

    if (isAnonim) {
      const commissionBlock = createElem('div', 'commis');
      createElem('span', 'commis__start', commissionBlock, this.langs[config.lang].commis__start);
      createElem('span', 'commis__sum', commissionBlock, `${COMMISSION_AMOUNT}`);
      createElem('span', 'commis__end', commissionBlock, this.langs[config.lang].commis__end);
      popupContent?.prepend(commissionBlock);
    } else {
      emailInput.value = config.currentEmail;
      emailInput.disabled = false;
    }
  }

  closePopUp(e: Event): void {
    const clickedElem = e.target as HTMLElement;
    if (clickedElem.classList.contains('popup')) {
      clickedElem.remove();
    }
  }

  confirmPayment(e: Event, operationId: number, isAnonim: boolean, popup: HTMLElement): void {
    e.preventDefault();
    if (!this.canPay) return;

    const main = document.querySelector('.main-container') as HTMLElement;

    const popupWindow = popup.querySelector('.popup__content') as HTMLElement;
    popupWindow.classList.add('loading');
    popupWindow.style.height = `${popupWindow.offsetHeight}px`;
    load(popupWindow);

    if (isAnonim) {
      moneyFetch.commission(COMMISSION_AMOUNT, operationId).then(async () => {
        const popupMessage = createElem('div', 'popup popup-message', document.body);
        popupMessage.innerHTML = this.modalInfoMessage(this.langs[config.lang].modalInfoMessage);

        popup.remove();
        await listenHeader.updateInfo();

        setTimeout(() => {
          popupMessage.remove();
          transition(main, renderPayment.renderPaymentsPage.bind(renderPayment));
        }, 3000);
      });

      if ((this.emailInputs['checkbox-input'] as HTMLInputElement)?.checked) {
        const anonimEmail = (this.emailInputs['email-input'] as HTMLInputElement)?.value;
        console.log('anonimEmail=', anonimEmail);
      }
    } else {
      const popupMessage = createElem('div', 'popup popup-message', document.body);
      popupMessage.innerHTML = this.modalInfoMessage(this.langs[config.lang].modalInfoMessage);
    }
  }

  checkForm(e: Event): void {
    const currInput = e.target as HTMLInputElement;

    if (currInput.id === 'card-number') {
      this.maskCardNumber.call(currInput);
      this.changeImgPaymentSystem.call(currInput);
    }
    if (currInput.id === 'valid-thru') {
      this.maskCardDataValidThru.call(currInput);
    }

    this.checkInputsValidity(e.currentTarget as HTMLFormElement);
  }

  showValidity(inputEl: HTMLInputElement): void {
    inputEl.setCustomValidity(this.langs[config.lang].cardDataValidity);
  }

  maskCardNumber(): void {
    if (this.value) {
      let val = this.value.replace(/[^0-9]/g, '');
      val = val !== '' ? val.match(/.{1,4}/g)?.join(' ') || '' : '';
      this.value = val;
    }
  }

  maskCardDataValidThru(): void {
    if (this.value) {
      let val = this.value.replace(/[^0-9]/g, '');
      val = val.length >= 2 ? `${val.slice(0, 2)}/${val.slice(2, 4)}` : val;
      this.value = val;
    }
  }

  changeImgPaymentSystem(): void {
    const cardDataImg = document.querySelector('.card-data__card-number img') as HTMLImageElement;
    const firstChar = this.value?.trim().slice(0, 1);
    const newImg = new Image();

    if (firstChar === '3') {
      newImg.src = americanExpressCard;
    } else if (firstChar === '4') {
      newImg.src = visaCard;
    } else if (firstChar === '5') {
      newImg.src = mastercardCard;
    } else {
      newImg.src = invoiceCard;
    }

    newImg.addEventListener('load', () => {
      cardDataImg.src = newImg.src;
    });
  }

  checkInputsValidity(payForm: HTMLFormElement): void {
    this.canPay = Array.from(payForm.elements).every((inputEl) => {
      const inputPattern = (inputEl as HTMLInputElement).pattern;
      if (!inputPattern) return true;

      const isCorrectValue = validate(inputEl as HTMLInputElement, inputPattern);
      return isCorrectValue;
    });

    if (!this.btnConfirm) return;

    if (this.canPay) {
      this.btnConfirm.classList.remove('unable');
    } else {
      if (!this.btnConfirm.classList.contains('unable')) {
        this.btnConfirm.classList.add('unable');
      }
    }
  }

  checkNeedEmailInput(checkboxInput: HTMLInputElement, emailInput: HTMLInputElement): void {
    emailInput.disabled = !checkboxInput.checked;
  }

  modalPaymentTemplate(): string {
    return `
      <div class="popup__content">
        <form id="payment-form" class="form" action="/" method="post">
          <div class="form__card-details">
            <h2 class="form__title modal-credit-card">${this.langs[config.lang]['modal-credit-card']}</h2>
            <div class="form__data card-data">
              <div class="card-data__card-number">
                <img src=${invoiceCard} alt="credit-card" />
                <input
                  id="card-number"
                  name="card-number"
                  class="input--payment"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  required
                  pattern="\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}"
                  maxlength="19"
                  title="${this.langs[config.lang].cardInputTitle}"
                />
              </div>
              <div class="card-data__info">
                <div class="card-data__valid-data">
                  <label for="valid-thru" class="valid">${this.langs[config.lang]['valid']}</label>
                  <input
                    id="valid-thru"
                    class="input--payment"
                    type="text"
                    name="valid-thru"
                    placeholder="10/23"
                    required
                    pattern="[0-1][0-2][\\/]\\d{2}"
                    maxlength="5"
                  />
                </div>
                <div class="card-data__valid-data">
                  <label for="code-cvv" class="code-cvv">${this.langs[config.lang]['code-cvv']}</label>
                  <input
                    id="code-cvv"
                    class="input--payment"
                    type="text"
                    name="code-cvv"
                    placeholder="000"
                    required
                    pattern="\\d{3}"
                    maxlength="3"
                    title="${this.langs[config.lang].cvvInputTitle}"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form__btn">
            <button type="submit" class="btn btn--col-3 btn-colored unable">${
              this.langs[config.lang]['btn--col-3']
            }</button>
          </div>
        </form>
      </div>
  `;
  }

  modalInfoMessage(message: string) {
    return `
      <div class="popup-message__content">
        <div class="popup-message__message-info">${message}</div>
      </div>
    `;
  }
}

export const modalPayment = new ModalPayment();
