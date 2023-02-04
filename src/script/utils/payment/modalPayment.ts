import { calculateCommissionSum, createElem } from '../../utilities/index';
import { renderPayment } from './renderPayment';
import invoiceCard from '../../../assets/img/payment-system/invoice.png';
import americanExpressCard from '../../../assets/img/payment-system/american-express.png';
import visaCard from '../../../assets/img/payment-system/visa.png';
import mastercardCard from '../../../assets/img/payment-system/mastercard.png';
import en from '../../data/lang/modalPaym/en';
import ru from '../../data/lang/modalPaym/ru';
import { TLang } from '../../data/servicesType';
import { moneyFetch } from '../../fetch/moneyFetch';
import config from '../../data/config';
import { validate } from '../validate';

class ModalPayment {
  value?: string;
  commissionSum = 0;
  canPay = false;
  btnConfirm: HTMLButtonElement | null = null;
  langs: TLang = {
    en,
    ru,
  };

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

    if (isAnonim) {
      this.commissionSum = calculateCommissionSum(paymentSum);

      const popupContent = popup.querySelector('.popup__content');
      const commissionBlock = createElem('div', 'commis');
      createElem('span', 'commis__start', commissionBlock, this.langs[config.lang].commis__start);
      createElem('span', 'commis__sum', commissionBlock, `${this.commissionSum}`);
      createElem('span', 'commis__end', commissionBlock, this.langs[config.lang].commis__end);
      popupContent?.prepend(commissionBlock);

      const personalDetails = createElem('div', 'form__person-details');
      createElem('h2', 'form__title modal-personal', personalDetails, this.langs[config.lang]['modal-personal']);
      const emailInput = createElem('input', 'form__item input--payment', personalDetails) as HTMLInputElement;
      emailInput.name = emailInput.type = 'email';
      emailInput.placeholder = 'E-mail';
      emailInput.required = true;
      emailInput.pattern = '.+@\\w+\\.\\w+';
      popupContent?.prepend(personalDetails);
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

    const popupMessage = createElem('div', 'popup popup-message', document.body);
    popupMessage.innerHTML = this.modalInfoMessage(this.langs[config.lang].modalInfoMessage);

    if (isAnonim) {
      moneyFetch.commission(this.commissionSum, operationId);
    }

    setTimeout(() => {
      popupMessage.remove();
      popup.remove();
      renderPayment.renderPaymentsPage();
    }, 3000);
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
