import { buildAccount } from './buildAccount';
import { listenAccount } from './listenAccount';

export function navigationAccount() {
  const nav = document.querySelectorAll('.account__list-item');

  if (!nav) return;

  nav.forEach((item) => {
    item.addEventListener('click', () => {
      console.log('click');
      if (item.textContent === 'Edit account') {
        buildAccount.editAccount();
        listenAccount.editAccount();
        return;
      }
    });
  });
}
