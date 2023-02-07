import { IMarketStocks } from "../../data/types";

export default function(data: IMarketStocks[]) {
  const market = document.querySelector('.stocks__market');
  if (!(market instanceof HTMLElement)) return;

  data.forEach((stock) => {
    const item = market.querySelector(`.${stock.name.replaceAll(' ', '_')}`);
    if (!item) return;

    const price = item.querySelector('.stocks__market-price');
    const count = item.querySelector('.stocks__market-count');

    if (!price || !count) return;

    price.textContent = `$${stock.money.toFixed(3)}`;
    count.textContent = stock.number.toString();
  })
}
