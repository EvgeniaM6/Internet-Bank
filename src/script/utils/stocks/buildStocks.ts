import config from '../../data/config';
import { IMarketStocks, IUserStocks } from '../../data/types';

class BuildStock {
  main() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = `<div class="stocks__container">
        <div class="stocks__user"></div>
        <div class="stocks__market"></div>
    </div>`;
  }

  buildUserList(userStocks: IUserStocks[], marketStocks: IMarketStocks[]) {
    const userList = document.querySelector('.stocks__user');
    if (!userList) return;

    if (!userStocks.length) {
      userList.innerHTML = `<h3 class="stocks__user-h">${config.lang === 'en' ? 'User Stocks' : 'Ваши Акции'}</h3>
      <p class="stocks__user-empty">${config.lang === 'en' ? 'You haven\'t any stocks' : 'У вас нет акций'}</p>`;
      return;
    }

    userList.innerHTML = `<h3 class="stocks__user-h">${config.lang === 'en' ? 'User Stocks' : 'Ваши Акции'}</h3>
    <p class="stocks__user-header">
        <span class="stocks__user-header-name">${config.lang === 'en' ? 'Name' : 'Название'}</span>
        <span class="stocks__user-header-count">${config.lang === 'en' ? 'Count' : 'Кол-во'}</span>
        <span class="stocks__user-header-profit">${config.lang === 'en' ? 'Profit' : 'Прибыль'}</span>
    </p>`;

    userStocks.forEach((el) => {
      const stock = marketStocks.find((stock) => el.name === stock.name);
      if (!stock) return;

      const profit = stock.money - el.price;
      const div = document.createElement('div');
      div.classList.add('stocks__user-item', `${el.name.replaceAll(' ', '_')}`);
      div.id = `${el.name.replaceAll(' ', '_')}`;
      div.innerHTML = `<p class="stocks__user-name">${el.name}</p>
      <p class="stocks__user-count">${el.number}</p>
      <p class="stock__user-profit" id="${el.price.toFixed(3)}" style="color:${
        profit > 0 ? 'green' : 'red'
      }">$${profit.toFixed(3)}</p>
      <div class="stocks__user-controls">
          <button class="item__minus">-</button>
          <input type="number" name="" id="" class="item__value" max="${el.number}" min="1" value="1">
          <button class="item__plus">+</button>
      </div>
      <div class="stocks__user-payment">
          <button class="stocks__user-button stocks__button">${config.lang === 'en' ? 'Sell' : 'Продать'}</button>
          <p class="stocks__user-status">${config.lang === 'en' ? 'Ready to deal' : 'Открыто'}</p>
      </div>`;

      userList.appendChild(div);
    });
  }

  buildMarketList(marketStocks: IMarketStocks[]) {
    const marketList = document.querySelector('.stocks__market');
    if (!marketList) return;

    marketList.innerHTML = `<h3 class="stocks__market-h">${config.lang === 'en' ? 'Stocks Market' : 'Биржа'}</h3>
    <p class="stocks__market-header">
        <span class="stocks__market-header-name">${config.lang === 'en' ? 'Name' : 'Название'}</span>
        <span class="stocks__market-header-count">${config.lang === 'en' ? 'Count' : 'Кол-во'}</span>
        <span class="stocks__market-header-price">${config.lang === 'en' ? 'Price' : 'Цена'}</span>
    </p>`;

    marketStocks.forEach((el) => {
      const div = document.createElement('div');
      div.classList.add('stocks__market-item', `${el.name.replaceAll(' ', '_')}`);
      div.id = `${el.name.replaceAll(' ', '_')}`;
      div.innerHTML = `<p class="stocks__market-name">${el.name}</p>
      <p class="stocks__market-count">${el.number}</p>
      <p class="stocks__market-price">$${el.money.toFixed(3)}</p>
      <div class="stocks__market-controls">
          <button class="item__minus">-</button>
          <input type="number" name="" id="" class="item__value" max="${el.number}" min="1" value="1">
          <button class="item__plus">+</button>
      </div>
      <div class="stocks__market-payment">
        <button class="stocks__market-button stocks__button">${config.lang === 'en' ? 'Buy' : 'Купить'}</button>
        <p class="stocks__market-status">${config.lang === 'en' ? 'Ready to deal' : 'Открыто'}<p>
      </div>`;

      marketList.appendChild(div);
    });
  }
}

export default new BuildStock();
