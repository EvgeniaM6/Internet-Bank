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
  selectedCategoryFilter = 'all';
  operationsContainer = createElem('div', 'operations');

  renderPaymentsPage(): void {
    this.main.innerHTML = '';
    const paymentPage = createElem('div', 'main__payment-page', this.main);
    const filtersContainer = createElem('div', 'filters', paymentPage);

    paymentPage.append(this.operationsContainer);

    servicesFetch.getServicesList().then((response: IMainRes) => {
      const operationsObj = (response as IServices).operations as IServiceObj;
      this.elemsForUpdatingText = {};

      Object.keys(operationsObj).forEach((operationId) => {
        if (+operationId < INDEX_START_SERVICES) return;
        this.operationsResp[operationId] = operationsObj[operationId];
      });

      this.updatePaymentCards();
      this.renderFilters(filtersContainer);
      this.updatePaymentCardsText();
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
    createElem('span', 'card__category-text', operationCategory);
    createElem('span', 'card__category-type', operationCategory, this.operationsResp[operationId].category);

    const btn = createElem('button', 'card__btn btn-colored', card);

    btn.addEventListener('click', () => this.renderPayment(+operationId));

    container.append(card);
  }

  renderPayment(operationId: number): void {
    renderPaymentDetails.renderPayment(operationId);
  }

  updatePaymentCardsText(): void {
    const currentLang = this.getCurrentLang();
    const keyForText = currentLang === 'en' ? 'name' : 'ruName';

    Object.keys(this.elemsForUpdatingText).forEach((key) => {
      const [operationId, elemType] = key.split('_');

      if (elemType === 'operation-title') {
        const elemForUpdate = this.elemsForUpdatingText[key];
        const textForElem = this.operationsResp[operationId][keyForText];
        elemForUpdate.textContent = textForElem;
      }
    });
  }

  getCurrentLang(): string {
    return 'ru';
  }

  getOparationData(operationId: number): TServiceDetails | null {
    return this.operationsResp[operationId] || null;
  }

  renderFilters(container: HTMLElement): void {
    const filterType = 'category';

    const filterElem = createElem('div', 'filter');
    const filterForm = createElem('form', 'filter__form', filterElem) as HTMLFormElement;
    filterForm.name = filterType;

    createElem('div', 'filter__title', filterForm);
    const filterList = createElem('div', 'filter__list', filterForm);

    const filterAllItemElem = createElem('div', 'filter__item', filterList);

    const inputAllOperationsElem = createElem('input', 'filter__input', filterAllItemElem) as HTMLInputElement;
    inputAllOperationsElem.id = 'all';
    inputAllOperationsElem.name = filterType;
    inputAllOperationsElem.type = 'radio';
    inputAllOperationsElem.checked = this.selectedCategoryFilter === 'all';
    this.elemsForUpdatingText[`category_all`] = inputAllOperationsElem;

    const label = createElem('label', 'filter__label', filterAllItemElem, 'All') as HTMLLabelElement;
    label.htmlFor = 'all';

    const operationsNumElem = createElem('span', 'filter__numbers', filterAllItemElem);
    createElem('span', null, operationsNumElem, `(${this.countFilterValues()})`);

    const filterValues = this.getFiltersList();
    filterValues.forEach((filterValue) => {
      const filterItemElem = this.createFilterItemElem(filterType, filterValue);
      filterList.append(filterItemElem);
    });
    filterForm.addEventListener('change', (e) => this.filterOperations(e));

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

    const inputElem = createElem('input', 'filter__input', filterItemElem) as HTMLInputElement;
    inputElem.id = filterValue.toLowerCase();
    inputElem.name = filterType.toLowerCase();
    inputElem.type = 'radio';
    inputElem.checked = this.selectedCategoryFilter === filterValue.toLowerCase();
    this.elemsForUpdatingText[`radio_${key}`] = inputElem;

    const label = createElem('label', 'filter__label', filterItemElem, filterValue) as HTMLLabelElement;
    label.htmlFor = filterValue.toLowerCase();

    const operationsNumElem = createElem('span', 'filter__numbers', filterItemElem);
    createElem('span', null, operationsNumElem, `(${this.countFilterValues(filterValue)})`);
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

  filterOperations(event: Event): void {
    event.stopPropagation();
    const filterValue = (event.target as HTMLInputElement).id;
    this.selectedCategoryFilter = filterValue;

    this.updatePaymentCards();
  }

  updatePaymentCards(): void {
    this.operationsContainer.innerHTML = '';

    const filteredOperationsIdArr = Object.keys(this.operationsResp).filter((operationId) => {
      return this.selectedCategoryFilter === 'all'
        ? true
        : this.operationsResp[operationId].category.toLowerCase() === this.selectedCategoryFilter.toLowerCase();
    });

    filteredOperationsIdArr.forEach((operationId) => {
      this.renderPaymentCard(operationId, this.operationsContainer);
    });
  }
}

export const renderPayment = new RenderPayment();
