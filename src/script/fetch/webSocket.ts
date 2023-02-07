import config from '../data/config';

export function openWebSocket() {
  const socket = new WebSocket(`${config.wss}`);

  socket.onopen = () => {
    console.log('WebSocket open');
    const key = sessionStorage.getItem('token') || 'anonim';
    socket.send(key);
  };

  socket.onmessage = (e) => {
    console.log('Get data from WS');
    //const userCount = document.querySelector('.users-online__count');
    //if (!userCount) return;

    console.log(e.data);
    //userCount.textContent = e.data;
  };

  const login = document.querySelector('.header__login');
  if (!login) return;

  login.addEventListener('click', () => {
    socket.close(1000, 'User left main page');
  });
}
