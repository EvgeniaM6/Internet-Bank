import config from "../../data/config";
import { IOperationList, IStatistics } from "../../data/types";

class BuildStatistics{
  operations(arr: IStatistics[], operations: IOperationList) {
    const main = document.querySelector('.main-container');
    if (!main) return;
  
    const container = document.createElement('div');
    arr.forEach((el) => {
      const operation = operations[el.operationID];
    
      const operationName = document.createElement('p');
      operationName.textContent = config.lang === 'en' ? operation.name : operation.ruName;
      
      const operationCount = document.createElement('p');
      operationCount.textContent = el.count.toString();
    
      const operationMoney = document.createElement('p');
      operationMoney.textContent = el.money.toString();
  
      const operationContainer = document.createElement('div');
      operationContainer.classList.add('stat__operation');
      operationContainer.appendChild(operationName);
      operationContainer.appendChild(operationCount);
      operationContainer.appendChild(operationMoney);
  
      container.appendChild(operationContainer);
    })
    main.appendChild(container);
  }
}

export const buildStatistics = new BuildStatistics();