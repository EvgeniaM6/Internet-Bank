import { EOperation } from "../../data/types";
import stocksFetch from "../../fetch/stocksFetch";
import { listenHeader } from "../main/listenHeader";
import createStocks from "./createStocks";

class ListenStocks{
  market() {
    const marketList = document.querySelectorAll('.stocks__market-item');

    marketList.forEach((stock) => {
      const counter = stock.querySelector('.stocks__market-count');
      const button = stock.querySelector('.stocks__market-button');
      const minus = stock.querySelector('.item__minus');
      const plus = stock.querySelector('.item__plus');
      const input = stock.querySelector('.item__value');

      if (!counter || !button || !minus || !plus || !(input instanceof HTMLInputElement)) return;

      minus.addEventListener('click', () => {
        if (input.value === input.min) return;
        input.value = `${Number(input.value) - 1}`;
      })

      plus.addEventListener('click', () => {
        if (input.value === input.max) return;
        input.value = `${Number(input.value) + 1}`;
      })

      button.addEventListener('click', async() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        const stockName = stock.id.replaceAll('_', ' ');
        const value = Number(input.value);

        const status = stock.querySelector('.stocks__market-status');
        if (!status) return;

        status.textContent = 'Deal...';

        const result = await stocksFetch.buyOrSell(token, EOperation.ADD, stockName, value);
        status.textContent = result.message;
        setTimeout(() => {
          status.textContent = 'Ready to deal';
        }, 3000);

        if (result.success) {
          await createStocks.user();
          await listenHeader.updateInfo();
        }
      })
    })
  }

  user() {
    const userList = document.querySelectorAll('.stocks__user-item');

    userList.forEach((stock) => {
      const counter = stock.querySelector('.stocks__user-count');
      const button = stock.querySelector('.stocks__user-button');
      const minus = stock.querySelector('.item__minus');
      const plus = stock.querySelector('.item__plus');
      const input = stock.querySelector('.item__value');

      if (!counter || !button || !minus || !plus || !(input instanceof HTMLInputElement)) return;

      minus.addEventListener('click', () => {
        if (input.value === input.min) return;
        input.value = `${Number(input.value) - 1}`;
      })

      plus.addEventListener('click', () => {
        if (input.value === input.max) return;
        input.value = `${Number(input.value) + 1}`;
      })

      button.addEventListener('click', async() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        const stockName = stock.id.replaceAll('_', ' ');
        const value = Number(input.value);

        const status = stock.querySelector('.stocks__user-status');
        if (!status) return;

        status.textContent = 'Deal...';

        const result = await stocksFetch.buyOrSell(token, EOperation.REMOVE, stockName, value);
        status.textContent = result.message;
        setTimeout(() => {
          status.textContent = 'Ready to deal';
        }, 3000);

        if (result.success) {
          await createStocks.user();
          await listenHeader.updateInfo();
        }
      })
    })
  }
}

export default new ListenStocks();