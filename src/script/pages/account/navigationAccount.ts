import { buildAccount } from './buildAccount';
import { listenAccount } from './listenAccount';
import pushState from '../../router/pushState';

export function navigationAccount() {
  const nav = document.querySelectorAll('.account__list-item');

  if (!nav) return;

  nav.forEach((item) => {
    item.addEventListener('click', () => {
      nav.forEach((el) => el.classList.remove('account__list-item_active'));
      item.classList.add('account__list-item_active');

      if (item.classList.contains('account__list-edit')) {
        buildAccount.editAccount();
        listenAccount.editAccount();
        listenAccount.editPassword();
        pushState.account(item.textContent || '');
        return;
      }

      if (item.classList.contains('account__list-delete')) {
        buildAccount.clarifyAccount();
        listenAccount.clarifyAccount();
        pushState.account(item.textContent || '');
        return;
      }

      if (item.classList.contains('account__list-currency')) {
        buildAccount.currency();
        listenAccount.currency();
        pushState.account(item.textContent || '');
        return;
      }

      if (item.classList.contains('account__list-main')) {
        buildAccount.main();
        navigationAccount();
        pushState.account();
        return;
      }
    });
  });
}
