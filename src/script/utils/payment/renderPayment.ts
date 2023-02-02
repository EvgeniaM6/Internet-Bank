import { INDEX_START_SERVICES } from '../../data/constants';
import { IServiceObj, IServices, TElemsForUpdateText, TServiceDetails } from '../../data/servicesType';
import { IMainRes } from '../../data/types';
import { servicesFetch } from '../../fetch/servicesFetch';
import { createElem } from '../../utilities/createElem';
import { renderPaymentDetails } from './renderPaymentDetails';

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

    const mainInfo = createElem('div', 'card__main', card);

    const operationImgBlock = createElem('div', 'card__img', mainInfo);
    const logo = this.operationsResp[operationID].logo;
    if (logo) {
      operationImgBlock.style.backgroundColor = 'transparent';
      operationImgBlock.style.backgroundImage = `url(${logo})`;
    }

    const operationName = createElem('p', 'card__title', mainInfo);
    this.elemsForUpdatingText[`${operationID}_operation-title`] = operationName;

    const operationCategory = createElem('p', 'card__category', mainInfo);
    createElem('span', 'card__category-text', operationCategory);
    createElem('span', 'card__category-type', operationCategory, this.operationsResp[operationID].category);

    const btn = createElem('button', 'card__btn btn-colored', card);

    btn.addEventListener('click', () => this.renderPayment(+operationID));

    container.append(card);
  }

  renderPayment(operationID: number): void {
    renderPaymentDetails.renderPayment(operationID);
  }

  updatePaymentCardsText(): void {
    const currentLang = this.getCurrentLang();
    const keyForText = currentLang === 'en' ? 'name' : 'ruName';

    Object.keys(this.elemsForUpdatingText).forEach((key) => {
      const [operationID, elemType] = key.split('_');

      if (elemType === 'operation-title') {
        const elemForUpdate = this.elemsForUpdatingText[key];
        const textForElem = this.operationsResp[operationID][keyForText];
        elemForUpdate.textContent = textForElem;
      }
    });
  }

  getCurrentLang(): string {
    return 'ru';
  }

  getOparationData(operationID: number): TServiceDetails | null {
    return this.operationsResp[operationID] || null;
  }
}

export const renderPayment = new RenderPayment();
