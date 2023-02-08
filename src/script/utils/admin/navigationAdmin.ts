import { EAdminLinks } from '../../data/types';
import { buildAdmin } from './buildAdmin';
import { listenAdmin } from './listenAdmin';

export function navigationAdmin() {
  const nav = document.querySelectorAll('.admin__list-item');

  if (!nav) return;

  nav.forEach((item) => {
    item.addEventListener('click', () => {
      nav.forEach((el) => el.classList.remove('admin__list-item_active'));
      item.classList.add('admin__list-item_active');

      if (item.textContent === 'User list') {
        buildAdmin.showUserList();
        //listenAdmin.showUserList();
        return;
      }

      if (item.textContent === `${EAdminLinks.bankInfo}`) {
        buildAdmin.showBankInfo();
        //listenAdmin.showUserList();
        return;
      }
    });
  });
}
