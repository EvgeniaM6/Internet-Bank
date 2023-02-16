import { buildAccount } from './buildAccount';
import { listenAccount } from './listenAccount';
import { EAccountLinks } from '../../data/types';
import config from '../../data/config';
import pushState from '../../router/pushState';

export function navigationAccount() {
  const nav = document.querySelectorAll('.account__list-item');

  if (!nav) return;

  nav.forEach((item) => {
    item.addEventListener('click', () => {
      nav.forEach((el) => el.classList.remove('account__list-item_active'));
      item.classList.add('account__list-item_active');

      if (item.textContent === EAccountLinks.edit) {
        buildAccount.editAccount();
        listenAccount.editAccount();
        listenAccount.editPassword();
        pushState.account(item.textContent || '');
        return;
      }

      if (item.textContent === EAccountLinks.delete) {
        buildAccount.clarifyAccount();
        listenAccount.clarifyAccount();
        pushState.account(item.textContent || '');
        return;
      }

      if (item.textContent === EAccountLinks.currency) {
        buildAccount.currency();
        listenAccount.currency();
        pushState.account(item.textContent || '');
        return;
      }

      if (item.textContent === `${EAccountLinks.account} (${config.currentUser})`) {
        buildAccount.main();
        navigationAccount();
        pushState.account();
        return;
      }
    });
  });
}
