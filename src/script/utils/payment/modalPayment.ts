import { calculateCommissionSum, createElem } from '../../utilities/index';
import { renderPayment } from './renderPayment';
import invoiceCard from '../../../assets/img/payment-system/invoice.png';
import americanExpressCard from '../../../assets/img/payment-system/american-express.png';
import visaCard from '../../../assets/img/payment-system/visa.png';
import mastercardCard from '../../../assets/img/payment-system/mastercard.png';

class ModalPayment {
  value?: string;
  commissionSum = 0;

  drawModalPayment(paymentSum: number): void {
    this.commissionSum = calculateCommissionSum(paymentSum);

    const popup = createElem('div', 'popup', document.body);
    popup.innerHTML = this.modalPaymentTemplate();

    //close modal-window on click on dark area
    popup.addEventListener('click', (e) => {
      const clickedElem = e.target as HTMLElement;
      if (clickedElem.classList.contains('popup')) {
        popup.remove();
      }
    });

    const form = document.querySelector('#payment-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const popupMessage = createElem('div', 'popup popup-message', document.body);
      popupMessage.innerHTML = this.modalInfoMessage('Your order has been confirmed!');

      setTimeout(() => {
        popupMessage.remove();
        popup.remove();
        renderPayment.renderPaymentsPage();
      }, 3000);
    });

    //input validation
    form?.addEventListener('input', (e) => {
      const currInput = e.target as HTMLInputElement;

      if (currInput.id === 'card-number') {
        this.maskCardNumber.call(currInput);
        this.changeImgPaymentSystem.call(currInput);
      }
      if (currInput.id === 'valid-thru') {
        this.maskCardDataValidThru.call(currInput);
      }
    });

    //customize message for invalid value
    const cardDataValidThru = document.querySelector('#valid-thru') as HTMLInputElement;
    cardDataValidThru.addEventListener('invalid', (e) => {
      const currInput = e.target as HTMLInputElement;
      currInput.setCustomValidity('Month cannot be more than 12');
    });
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

  //change img of payment system depending on first-char
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

  modalPaymentTemplate(): string {
    return `
      <div class="popup__content">
        <div class="commis">
          <span class="commis__start"></span>
          <span class="commis__sum">${this.commissionSum}</span>
          <span class="commis__end"></span>
        </div>
        <form id="payment-form" class="form" action="/" method="post">
          <div class="form__person-details">
            <h2 class="form__title">Personal details</h2>
            <input
              class="form__item input--payment"
              name="email"
              type="email"
              placeholder="E-mail"
              required
              pattern=".+@\\w+\\.\\w+"
            />
          </div>
          <div class="form__card-details">
            <h2 class="form__title">Credit card details</h2>
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
                  title="enter 16 digits"
                />
              </div>
              <div class="card-data__info">
                <div class="card-data__valid-data">
                  <label for="valid-thru">valid</label>
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
                  <label for="code-cvv">cvv</label>
                  <input
                    id="code-cvv"
                    class="input--payment"
                    type="text"
                    name="code-cvv"
                    placeholder="000"
                    required
                    pattern="\\d{3}"
                    maxlength="3"
                    title="enter 3 digits"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form__btn">
            <button type="submit" class="btn btn--col-3">Confirm</button>
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
