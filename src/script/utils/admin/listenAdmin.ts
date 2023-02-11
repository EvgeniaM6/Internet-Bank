import config from '../../data/config';
import { EMethod } from '../../data/types';
import { adminFetch } from '../../fetch/adminFetch';
import { userFetch } from '../../fetch/userFetch';
import { buildAdmin } from './buildAdmin';

class ListenAdmin {
  showBankInfo() {
    const button = document.querySelector('.admin__information_button');

    if (!button) return;

    button.addEventListener('click', buildAdmin.showUserList);
  }

  showUserList() {
    const users = document.querySelectorAll('.admin__users_user');
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
    const name = document.querySelector('.admimn__user_name');
    console.log(lock);
    console.log(name);
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

  deleteAccount() {
    const account = document.querySelector('.account-container');
    const username = document.querySelector('.admimn__user_name');
    const token = localStorage.getItem('token');
    const submit = document.querySelector('.admin__remove_button-submit');
    const cancel = document.querySelector('.admin__remove_button-cancel');
    const password = document.getElementById('rem-password');
    const note = document.querySelector('.admin__notification');

    if (!(password instanceof HTMLInputElement) || !account || !username || !token || !submit || !cancel || !note)
      return;

    cancel.addEventListener('click', () => (account.innerHTML = ''));

    submit.addEventListener('click', () => {
      userFetch.checkPassword(password, token).then((rez) => {
        if (rez.success) {
          adminFetch.user(EMethod.DELETE, token, username.innerHTML).then((rez) => {
            if (rez.success) {
              buildAdmin.showUserList();
              this.showUserList();
            }
          });
        } else note.innerHTML = 'Note: Incorrect password';
      });
    });
  }

  showUserData() {
    const del = document.querySelector('.admin__user_button-remove');
    const back = document.querySelector('.admin__user_button-back');
    const lockButton = document.querySelector('.user-lock');
    if (!del || !back || !lockButton) return;

    del.addEventListener('click', () => {
      buildAdmin.deleteAccount();
      listenAdmin.deleteAccount();
    });

    back.addEventListener('click', () => {
      buildAdmin.showUserList();
      this.showUserList();
    })


    if (lockButton.textContent === 'Lock user') {
      this.lockUser(true);
    } else this.lockUser(false);
  }
}

export const listenAdmin = new ListenAdmin();
