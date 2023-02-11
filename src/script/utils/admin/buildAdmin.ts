import { buildAuth } from '../auth/buildAuth';
import { listenAdmin } from './listenAdmin';
import config from '../../data/config';

class BuildAdmin {
  async showUserList() {
    const token = localStorage.getItem('token');

    const data = (
      await fetch(`http://127.0.0.1:3000/admin/database`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();

    data.then((rez) => {
      const admin = document.querySelector('.admin-container');
      if (!admin) return;

      admin.innerHTML = `<div class="admin__users">
        <h2 class="admin__title">List of users</h2>
        <table class="admin__users_table">
        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Blocked</th></tr></thead>
        <tbody class="admin__users_tbody"></tbody>
        </table>
        <div class="admin__users_buttons">
          <button class="edit__button-create user-create">New user</button>
          <button class="edit__button-cancel user-cancel">Back</button>
        </div>
      </div>`;

      const tbody = <Element>document.querySelector('.admin__users_tbody');

      for (let i = 0; i < rez.safeDatabase.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${i + 1}</td>
        <td class="admin__users_user">${rez.safeDatabase[i].username}</td>
        <td>${rez.safeDatabase[i].email}</td>
        <td>${
          rez.safeDatabase[i].isBlock
            ? '<img src="./assets/icons8-ok.svg" alt="ok" class="blocked">'
            : '<img src="./assets/icons8-cancel.svg" alt="cancel" class="blocked">'
        }</td>`;

        tbody.appendChild(row);
      }

      const td = document.querySelectorAll('td');
      const th = document.querySelectorAll('th');

      if (config.theme === 'dark') {
        td.forEach((el) => el.classList.add('table-dark'));
        th.forEach((el) => el.classList.add('table-dark'));
      }
      listenAdmin.showUserList();
    });
  }

  async showUserData(user: Element) {
    const admin = document.querySelector('.admin-container');
    if (!admin) return;

    const token = localStorage.getItem('token');

    const data = (
      await fetch(`http://127.0.0.1:3000/admin/user?username=${user.textContent}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();

    data.then((rez) => {
      admin.innerHTML = `<div class="admin__user">
      <h2 class="admin__title admimn__user_name">${rez.userConfig.username}</h2>
      <p class="admin__user_info"> E-mail: ${rez.userConfig.email}</p>
      <p class="admin__user_info"> Is user admin: ${rez.userConfig.isAdmin ? 'yes' : 'no'}</p>
      <p class="admin__user_info"> Is user blocked: ${rez.userConfig.isBlock ? 'yes' : 'no'}</p>
      <h3 class="admin__user_operations-title">Last operations</h3>
      <table class="admin__user_operations">
        <thead><tr><th>#</th><th>date</th><th>operationID</th><th>money</th></tr></thead>
        <tbody class="admin__user_tbody"></tbody>
      </table>
      <div class="admin__user_buttons">
        <button class="admin__user_button-lock user-lock">${
          rez.userConfig.isBlock ? 'Unlock user' : 'Lock user'
        }</button>
        <button class="admin__user_button-remove">Remove user</button>
        <button class="admin__user_button-back">To list of users</button>
      </div>
      <div class="account-container"></div>
      </div>`;

      const tbody = <Element>document.querySelector('.admin__user_tbody');

      for (let i = 0; i < rez.userConfig.lastFive.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${i + 1}</td>
        <td>${rez.userConfig.lastFive[i].date.slice(0, 10)}</td>
        <td>${rez.userConfig.lastFive[i].operationID}</td>
        <td>${rez.userConfig.lastFive[i].money.toFixed(2)}</td>`;

        tbody.appendChild(row);
      }

      const td = document.querySelectorAll('td');
      const th = document.querySelectorAll('th');

      if (config.theme === 'dark') {
        td.forEach((el) => el.classList.add('table-dark'));
        th.forEach((el) => el.classList.add('table-dark'));
      }

      listenAdmin.showUserData();
    });
  }

  async showBankInfo() {
    const account = document.querySelector('.admin__information_account');
    const money = document.querySelector('.admin__information_money');
    if (!account || !money) return;

    const token = localStorage.getItem('token');

    const data = (
      await fetch(`http://127.0.0.1:3000/admin/bank`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();

    data.then((rez) => {
      account.innerHTML = rez.bank.name;
      money.innerHTML = `${(+rez.bank.money).toFixed(2)}`;
    });
  }

  newUser() {
    const admin = document.querySelector('.admin-container');
    if (!admin) return;

    admin.innerHTML = `<div class="auth__container"><div>`;

    buildAuth.registration();
  }

  deleteAccount() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<p class="admin__remove_question">To remove user enter your password:</p>
      <div class="admin__remove">
        <input type="password" name="remove" id="rem-password" class="admin__remove-input">
      </div>
      <div class="admin__buttons">
        <button class="button-submit admin__remove_button-submit">Remove</button>
        <button class="button-cancel admin__remove_button-cancel">Cancel</button>
      </div>
      <p class="admin__notification"></p>`;
  }
}

export const buildAdmin = new BuildAdmin();
