import config from '../data/config';
import { IMarketStocks } from '../data/types';
import updateStocks from '../utils/stocks/updateStocks';

export function openWebSocket() {
  const socket = new WebSocket(`${config.wss}`);

  socket.onopen = () => {
    const key = localStorage.getItem('token') || 'anonim';
    socket.send(key);
  };

  socket.onmessage = (e) => {
    const data: IMarketStocks[] = JSON.parse(e.data);
    updateStocks(data);
  };

  const login = document.querySelector('.header__login');
  if (!login) return;

  login.addEventListener('click', () => {
    socket.close(1000, 'User left main page');
  });
}
