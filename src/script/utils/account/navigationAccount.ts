import { buildAccount } from './buildAccount';
import { listenAccount } from './listenAccount';
import { EAccountLinks } from '../../data/types';
import { createMain } from '../main/createMain';

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
        return;
      }

      if (item.textContent === EAccountLinks.delete) {
        buildAccount.clarifyAccount();
        listenAccount.clarifyAccount();
        return;
      }

      if (item.textContent === EAccountLinks.currency) {
        buildAccount.currency();
        listenAccount.currency();
        return;
      }

      if (item.textContent === `${EAccountLinks.account} (${config.currentUser})`) {
        createMain.account();
        return;
      }
    });
  });
}
