import config from '../../data/config';
import { IOperationRes, IStatistics } from '../../data/types';

class BuildStatistics {
  operations(arr: IStatistics[], res: IOperationRes) {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = '';
    const container = document.createElement('div');
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
      operationMoney.textContent = `${config.lang === 'en' ? 'Sum Money: ' : 'Всего Денег: '}${el.money}`;

      const operationContainer = document.createElement('div');
      operationContainer.classList.add('stat__operation');
      operationContainer.appendChild(operationName);
      operationContainer.appendChild(operationCount);
      operationContainer.appendChild(operationMoney);

      container.appendChild(operationContainer);
    });
    main.appendChild(container);
  }
}

export const buildStatistics = new BuildStatistics();
