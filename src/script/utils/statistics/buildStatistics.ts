import config from '../../data/config';
import { IOperationRes, IStatistics } from '../../data/types';

class BuildStatistics {
  operations(arr: IStatistics[], res: IOperationRes) {
    const main = document.querySelector('.main-container');
    const isEnglish = config.lang === 'en';
    if (!main) return;

    main.innerHTML = '';
    main.className = 'main-container container';

    const container = document.createElement('div');
    container.classList.add('stat');

    const totalCount = document.createElement('p');
    // totalCount.classList.add('');
    totalCount.innerHTML = `
    <span class="stat__total-oper">${isEnglish ? 'Total operations: ' : 'Всего операций: '}</span>
    <span>${arr.reduce((acc, el) => acc + el.count, 0)}</span>`;

    const totalMoney = document.createElement('p');
    // totalMoney.classList.add('');
    totalMoney.innerHTML = `
    <span class="stat__total-money">${isEnglish ? 'Total money: ' : 'Всего денег: '}</span>
    <span>$${arr.reduce((acc, el) => acc + el.money, 0).toFixed(2)}</span>`;

    const total = document.createElement('div');
    total.appendChild(totalCount);
    total.appendChild(totalMoney);

    arr.forEach((el) => {
      const operations = res.operations;
      if (!operations) return;

      const operation = operations[el.operationID];

      const operationName = document.createElement('p');
      operationName.classList.add('stat__operation-p', 'stat__operation-name');
      operationName.textContent = isEnglish ? operation.name : operation.ruName;
      operationName.setAttribute('runame', operation.ruName);
      operationName.setAttribute('enname', operation.name);

      const operationCount = document.createElement('p');
      operationCount.classList.add('stat__operation-p');
      operationCount.innerHTML = `<span class="stat__operation-count">${isEnglish ? 'Count: ' : 'Всего: '}</span>
      <span>${el.count}</span>`;

      const operationMoney = document.createElement('p');
      operationMoney.classList.add('stat__operation-p', 'stat__operation-money');
      operationMoney.innerHTML = `<span class="stat__operation-money-t">${
        isEnglish ? 'Sum Money: ' : 'Всего Денег: '
      }</span>
      <span>$${el.money.toFixed(2)}</span>`;

      const operationContainer = document.createElement('div');
      operationContainer.classList.add('stat__operation');
      operationContainer.appendChild(operationName);
      operationContainer.appendChild(operationCount);
      operationContainer.appendChild(operationMoney);

      container.appendChild(operationContainer);
    });
    main.appendChild(total);
    main.appendChild(container);
  }
}

export const buildStatistics = new BuildStatistics();
