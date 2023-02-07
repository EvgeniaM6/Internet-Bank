import { buildAccount } from './buildAccount';
import { listenAccount } from './listenAccount';

export function navigationAccount() {
  const nav = document.querySelectorAll('.account__list-item');

  if (!nav) return;

  nav.forEach((item) => {
    item.addEventListener('click', () => {
      nav.forEach((el) => el.classList.remove('account__list-item_active'));
      item.classList.add('account__list-item_active');

      if (item.textContent === 'Edit account') {
        buildAccount.editAccount();
        listenAccount.editAccount();
        return;
      }

      if (item.textContent === 'Edit password') {
        buildAccount.editPassword();
        listenAccount.editPassword();
        return;
      }

      if (item.textContent === 'Delete account') {
        buildAccount.clarifyAccount();
        listenAccount.clarifyAccount();
        return;
      }

      if (item.textContent === 'Currency') {
        buildAccount.currency();
        listenAccount.currency();
        return;
      }

      if (item.textContent === 'Last operations') {
        buildAccount.showLastOperations();
        return;
      }
    });
  });
}
