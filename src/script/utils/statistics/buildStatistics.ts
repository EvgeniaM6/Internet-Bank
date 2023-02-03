import config from '../../data/config';
import { IOperationRes, IStatistics } from '../../data/types';

class BuildStatistics {
  operations(arr: IStatistics[], res: IOperationRes) {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = '';
    main.className = 'main-container container';

    const container = document.createElement('div');
    container.classList.add('stat');

    const totalCount = document.createElement('p');
    totalCount.textContent = `
    ${config.lang === 'en' ? 'Total operations: ' : 'Всего операций: '}
    ${arr.reduce((acc, el) => acc + el.count, 0)}`;

    const totalMoney = document.createElement('p');
    totalMoney.textContent = `
    ${config.lang === 'en' ? 'Total money: ' : 'Всего денег: '}
    $${arr.reduce((acc, el) => acc + el.money, 0).toFixed(2)}`;

    const total = document.createElement('div');
    total.appendChild(totalCount);
    total.appendChild(totalMoney);

    arr.forEach((el) => {
      const operations = res.operations;
      if (!operations) return;

      const operation = operations[el.operationID];

      const operationName = document.createElement('p');
      operationName.classList.add('stat__operation-p');
      operationName.textContent = config.lang === 'en' ? operation.name : operation.ruName;

      const operationCount = document.createElement('p');
      operationCount.classList.add('stat__operation-p');
      operationCount.textContent = `${config.lang === 'en' ? 'Count: ' : 'Всего: '}${el.count}`;

      const operationMoney = document.createElement('p');
      operationMoney.classList.add('stat__operation-p');
      operationMoney.textContent = `${config.lang === 'en' ? 'Sum Money: ' : 'Всего Денег: '}$${el.money.toFixed(2)}`;

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
