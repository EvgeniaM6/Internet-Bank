import { IMarketStocks, IUserStocks } from "../../data/types";

class BuildStock{
  main() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = `<div class="stocks__container">
        <div class="stocks__user"></div>
        <div class="stocks__market"></div>
    </div>`;
  }

  buildUserList(userStocks: IUserStocks[]) {
    const userList = document.querySelector('.stocks__user');
    if (!userList) return;

    if (!userStocks.length) {
      userList.innerHTML = `<p>You haven't any stocks</p>`;
      return;
    }

    userList.innerHTML = ``;
    userStocks.forEach((el) => {
      const div = document.createElement('div');
      div.classList.add('stocks__user-item');
      div.innerHTML = `<p class="stocks__user-name">${el.name}</p>
      <p class="stocks__user-count">${el.number}</p>
      <div class="stocks__user-controls">
          <button class="item__minus">-</button>
          <input type="number" name="" id="" class="item__value" max="${el.number}" min="1">
          <button class="item__plus">+</button>
      </div>
      <div class="stocks__user-payment">
          <button class="stocks__user-button" id="${el.name.replaceAll(' ', '_')}">Sell</button>
          <p class="stocks__user-status">Status</p>
      </div>`;

      userList.appendChild(div);
    })
  }

  buildMarketList(marketStocks: IMarketStocks[]) {
    const marketList = document.querySelector('.stocks__market');
    if (!marketList) return;

    marketList.innerHTML = ``;

    marketStocks.forEach((el) => {
      const div = document.createElement('div');
      div.classList.add('stocks__market-item');
      div.innerHTML = `<p class="stocks__market-name">${el.name}</p>
      <p class="stocks__market-count">${el.number}</p>
      <p class="stocks__market-price">${el.money}</p>
      <div class="stocks__market-controls">
          <button class="item__minus">-</button>
          <input type="number" name="" id="" class="item__value" max="${el.number}" min="1">
          <button class="item__plus">+</button>
      </div>
      <div class="stocks__market-payment">
        <button class="stocks__market-button" id="${el.name.replaceAll(' ', '_')}">Buy</button>
        <p class="stocks__market-status">Status<p>
      </div>`;

      marketList.appendChild(div);
    })
  }
}

export default new BuildStock();
