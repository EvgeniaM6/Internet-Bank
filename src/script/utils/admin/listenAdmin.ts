import config from '../../data/config';
import { buildAdmin } from './buildAdmin';

class ListenAdmin {
  showUserList() {
    const users = document.querySelectorAll('.td-user');
    const create = document.querySelector('.user-create');

    if (!users || !create) return;

    users.forEach((user) => {
      user.addEventListener('click', async () => {
        buildAdmin.showUserData(user);
      });
    });

    create.addEventListener('click', buildAdmin.newUser);
  }

  lockUser(locked: boolean) {
    const lock = document.querySelector('.user-lock');
    const name = document.querySelector('.user__info_name');

    if (!lock || !name) return;

    const token = localStorage.getItem('token');

    lock.addEventListener('click', async () => {
      (
        await fetch(`http://127.0.0.1:3000/admin/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: name.innerHTML,
            isBlock: locked,
          }),
        })
      ).json();

      buildAdmin.showUserData(name);
    });
  }
}

export const listenAdmin = new ListenAdmin();
