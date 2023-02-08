import { EMethod } from '../../data/types';
import { buildAuth } from '../auth/buildAuth';
import { listenAdmin } from './listenAdmin';

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

      admin.innerHTML = `<table class="users__table">
      <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Blocked</th></tr></thead>
      <tbody class="users__tbody"></tbody>
      </table>
      <div class="edit__button-container">
        <button class="edit__button-create user-create">New user</button>
        <button class="edit__button-cancel user-cancel">Back</button>
      </div>`;

      const tbody = <Element>document.querySelector('.users__tbody');

      for (let i = 0; i < rez.safeDatabase.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${i + 1}</td>
        <td class="td-user">${rez.safeDatabase[i].username}</td>
        <td>${rez.safeDatabase[i].email}</td>
        <td>${rez.safeDatabase[i].isBlock ? '<img src="./assets/icons8-ok.svg" alt="ok" class="blocked">' : '<img src="./assets/icons8-cancel.svg" alt="cancel" class="blocked">'}</td>`;

        tbody.appendChild(row);
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
      admin.innerHTML = `<h2 class="users__info user__info_name">${rez.userConfig.username}</h2>
      <p class="users__info"> E-mail: ${rez.userConfig.email}</p>
      <p class="users__info"> Is user admin: ${rez.userConfig.isAdmin ? 'yes' : 'no'}</p>
      <p class="users__info"> Is user blocked: ${rez.userConfig.isBlock ? 'yes' : 'no'}</p>
      <table class="operations__table">
        <thead><tr><th>#</th><th>date</th><th>operationID</th><th>money</th></tr></thead>
        <tbody class="operations__tbody"></tbody>
      </table>
      <div class="edit__button-container">
        <button class="edit__button-cancel user-lock">${rez.userConfig.isBlock ? 'Unlock user' : 'Lock user'}</button>
      </div>`;

      const tbody = <Element>document.querySelector('.operations__tbody');

      for (let i = 0; i < rez.userConfig.lastFive.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${i + 1}</td>
        <td>${rez.userConfig.lastFive[i].date.slice(0, 10)}</td>
        <td>${rez.userConfig.lastFive[i].operationID}</td>
        <td>${rez.userConfig.lastFive[i].money.fixed(2)}</td>`;

        tbody.appendChild(row);
      }

      const lockButton = document.querySelector('.user-lock');

      if (!lockButton) return;
      if (lockButton.textContent === 'Lock user') {
        listenAdmin.lockUser(true);
      } else listenAdmin.lockUser(false);
    });
  }

  async showBankInfo() {
    const admin = document.querySelector('.admin-container');
    if (!admin) return;

    const token = sessionStorage.getItem('token');

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
      admin.innerHTML = `<p class="users__info user__info_name">${rez.bank.name}</p>
      <p class="users__info"> E-mail: ${rez.bank.money}</p>`;
    });
  }

  newUser() {
    const admin = document.querySelector('.admin-container');
    if (!admin) return;

    admin.innerHTML = `<div class="auth__container"><div>`;

    buildAuth.registration();
  }
}

export const buildAdmin = new BuildAdmin();
