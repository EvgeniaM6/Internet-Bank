import config from '../../data/config';
import {
  ID_COMMISSION_SERVICE,
  ID_CURRENCY_REFILL_SERVICE,
  ID_CURRENCY_SELL_SERVICE,
  ID_STOCKS_BUY_SERVICE,
  ID_STOCKS_SELL_SERVICE,
  INDEX_START_BANK_SERVICES,
  INDEX_START_SERVICES,
} from '../../data/constants/constants';
import { IServiceObj, IServices, TElemsForUpdateText, TLang, TServiceDetails } from '../../data/servicesType';
import { IMainRes } from '../../data/types';
import { createElem } from '../../utilities/createElem';
import { renderPaymentDetails } from './renderPaymentDetails';
import en from '../../data/lang/payment/en';
import ru from '../../data/lang/payment/ru';
import { transition } from '../transition';
import { userFetch } from '../../fetch/userFetch';
import { load } from '../load';

class RenderPayment {
  main = document.querySelector('.main-container') as HTMLElement;
  operationsResp: IServiceObj = {};
  elemsForUpdatingText: TElemsForUpdateText = {};
  selectedCategoryFilter = 'all';
  operationsContainer = createElem('div', 'operations');
  langs: TLang = {
    en,
    ru,
  };

  renderPaymentsPage(): void {
    load(this.main);

    userFetch.services().then((response: IMainRes) => {
      this.main.innerHTML = '';
      this.main.className = 'container main-container';
      window.scrollTo(0, 0);
      const paymentPage = createElem('div', 'main__payment-page', this.main);
      const filtersContainer = createElem('div', 'filters', paymentPage);

      paymentPage.append(this.operationsContainer);

      const operationsObj = (response as IServices).operations as IServiceObj;
      this.elemsForUpdatingText = {};

      Object.keys(operationsObj).forEach((operationId) => {
        const isAnonim =
          !this.getCurrentToken() && +operationId > INDEX_START_BANK_SERVICES && +operationId < INDEX_START_SERVICES;
        const isCurrencyDuplucateService =
          +operationId === ID_CURRENCY_REFILL_SERVICE || +operationId === ID_CURRENCY_SELL_SERVICE;
        const isCommissionService = +operationId === ID_COMMISSION_SERVICE;
        const isStockService = +operationId === ID_STOCKS_BUY_SERVICE || +operationId === ID_STOCKS_SELL_SERVICE;
        if (isAnonim || isCurrencyDuplucateService || isCommissionService || isStockService) return;

        this.operationsResp[operationId] = operationsObj[operationId];
      });

      this.updatePaymentCards();
      this.renderFilters(filtersContainer);
    });
  }

  renderPaymentCard(operationId: string, container: HTMLElement): void {
    const card = createElem('div', 'operations__card card');

    const mainInfo = createElem('div', 'card__main', card);

    const operationImgBlock = createElem('div', 'card__img', mainInfo);
    const logo = this.operationsResp[operationId].logo;
    if (logo) {
      operationImgBlock.style.backgroundColor = 'transparent';
      operationImgBlock.style.backgroundImage = `url(${logo})`;
    }

    const operationName = createElem('p', 'card__title', mainInfo);
    this.elemsForUpdatingText[`${operationId}_operation-title`] = operationName;

    const operationCategory = createElem('p', 'card__category', mainInfo);
    createElem('span', 'card__category-text', operationCategory, this.langs[config.lang]['card__category-text']);
    createElem('span', 'card__category-type', operationCategory, this.operationsResp[operationId].category);

    const btn = createElem('button', 'card__btn btn-colored', card, this.langs[config.lang].card__btn);

    btn.addEventListener('click', () => this.renderPayment(+operationId));

    container.append(card);
  }

  renderPayment(operationId: number): void {
    const main = document.querySelector('.main') as HTMLElement;
    transition(main, renderPaymentDetails.renderPayment.bind(renderPaymentDetails, operationId));
  }

  updatePaymentCardsText(): void {
    const keyForText = config.lang === 'en' ? 'name' : 'ruName';

    Object.keys(this.elemsForUpdatingText).forEach((key) => {
      const [operationId, elemType] = key.split('_');

      if (elemType === 'operation-title') {
        const elemForUpdate = this.elemsForUpdatingText[key];
        const textForElem = this.operationsResp[operationId][keyForText];
        elemForUpdate.textContent = textForElem;
      }
    });
  }

  getOparationData(operationId: number): TServiceDetails | null {
    return this.operationsResp[operationId] || null;
  }

  renderFilters(container: HTMLElement): void {
    const filterType = 'category';

    const filterElem = createElem('div', 'filter');
    const filterForm = createElem('form', 'filter__form', filterElem) as HTMLFormElement;

    createElem('div', 'filter__title', filterForm, this.langs[config.lang].filter__title);
    const filterList = createElem('div', 'filter__list', filterForm);

    const filterAllItemElem = createElem('div', 'filter__item', filterList);

    const inputAllOperationsElem = createElem('input', 'filter__input', filterAllItemElem) as HTMLInputElement;
    inputAllOperationsElem.id = inputAllOperationsElem.value = 'all';
    inputAllOperationsElem.name = filterType;
    inputAllOperationsElem.type = 'radio';
    inputAllOperationsElem.checked = this.selectedCategoryFilter === 'all';
    this.elemsForUpdatingText[`category_all`] = inputAllOperationsElem;

    const label = createElem('label', 'filter__label', filterAllItemElem) as HTMLLabelElement;
    label.htmlFor = 'all';

    createElem('span', 'filter__label-title', label, 'All');
    createElem('span', 'filter__label-numbers', label, `(${this.countFilterValues()})`);

    const filterValues = this.getFiltersList();
    filterValues.forEach((filterValue) => {
      const filterItemElem = this.createFilterItemElem(filterType, filterValue);
      filterList.append(filterItemElem);
    });

    filterForm.addEventListener('change', () => this.filterOperations(filterForm));

    container.append(filterElem);
  }

  getFiltersList(): Array<string> {
    const values: Array<string> = [];

    Object.keys(this.operationsResp).forEach((operationId) => {
      const operationCategory = this.operationsResp[operationId].category;
      const hasValue = values.some((value) => value.toLowerCase() === operationCategory.toLowerCase());
      if (!hasValue) {
        values.push(operationCategory);
      }
    });

    return values;
  }

  createFilterItemElem(filterType: string, filterValue: string): HTMLElement {
    const filterItemElem = createElem('div', 'filter__item');
    const key = `${filterType.toLowerCase()}_${filterValue.toLowerCase().replace(/ /g, '*')}`;
    filterValue = `${filterValue}`;

    const inputElem = createElem('input', 'filter__input', filterItemElem) as HTMLInputElement;
    inputElem.name = filterType.toLowerCase();
    inputElem.type = 'radio';
    inputElem.checked = this.selectedCategoryFilter.toLowerCase() === filterValue.toLowerCase();
    this.elemsForUpdatingText[`radio_${key}`] = inputElem;

    const label = createElem('label', 'filter__label', filterItemElem) as HTMLLabelElement;
    inputElem.id = inputElem.value = label.htmlFor = `${filterValue.toLowerCase()}`;

    createElem('span', 'filter__label-title', label, filterValue);
    createElem('span', 'filter__label-numbers', label, `(${this.countFilterValues(filterValue)})`);
    return filterItemElem;
  }

  countFilterValues(filterValue?: string): number {
    let valuesAmount;
    const operationIdArr = Object.keys(this.operationsResp);

    if (filterValue) {
      valuesAmount = operationIdArr.reduce((acc, operationId) => {
        if (this.operationsResp[operationId].category.toLowerCase() === filterValue.toLowerCase()) {
          acc += 1;
        }
        return acc;
      }, 0);
    } else {
      valuesAmount = operationIdArr.length;
    }

    return valuesAmount;
  }

  filterOperations(filterForm: HTMLFormElement): void {
    const filterValue = filterForm.category.value;
    this.selectedCategoryFilter = filterValue;

    transition(this.operationsContainer, this.updatePaymentCards.bind(this));
  }

  updatePaymentCards(): void {
    this.operationsContainer.innerHTML = '';

    const filteredOperationsIdArr = Object.keys(this.operationsResp).filter((operationId) => {
      const categInResp = this.operationsResp[operationId].category.toLowerCase();

      return this.selectedCategoryFilter === 'all' ? true : categInResp === this.selectedCategoryFilter.toLowerCase();
    });

    filteredOperationsIdArr.forEach((operationId) => {
      this.renderPaymentCard(operationId, this.operationsContainer);
    });

    this.updatePaymentCardsText();
  }

  getCurrentToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }
}

export const renderPayment = new RenderPayment();
