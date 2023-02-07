import config from "../../data/config";
import { EPages } from "../../data/types";
import stocksFetch from "../../fetch/stocksFetch";
import { load } from "../load";
import { transition } from "../transition";
import buildStocks from "./buildStocks";
import listenStocks from "./listenStocks";

class CreateStocks{
  async main() {
    const main = document.querySelector('.main-container');
    const token = sessionStorage.getItem('token');
    if (!(main instanceof HTMLElement) || !token) return;

    load(main);
    await stocksFetch.getData(token)
    .then((result) => {
      transition(main, () => {
        buildStocks.main();

        buildStocks.buildUserList(result.userStocks);
        listenStocks.user();

        buildStocks.buildMarketList(result.stocks);
        listenStocks.market();

        config.page = EPages.STOCKS;
      })
    });
  }

  async user() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    await stocksFetch.getData(token)
    .then((result) => {
      buildStocks.buildUserList(result.userStocks);
      listenStocks.user();
    });
  }
}

export default new CreateStocks();
