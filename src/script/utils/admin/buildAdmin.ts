import { EMethod } from '../../data/types';
import { adminFetch } from '../../fetch/adminFetch';
import { listenAdmin } from './listenAdmin';

class BuildAdmin {
  async showUserList() {
    const token = sessionStorage.getItem('token');

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
      <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Admin</th><th>Blocked</th></tr></thead>
      <tbody class="users__tbody"></tbody>
      </table>`;

      const tbody = <Element>document.querySelector('.users__tbody');

      for (let i = 0; i < rez.safeDatabase.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${i + 1}</td>
        <td class="td-user">${rez.safeDatabase[i].username}</td>
        <td>${rez.safeDatabase[i].email}</td>
        <td>${rez.safeDatabase[i].isAdmin}</td>
        <td>${rez.safeDatabase[i].isBlock}</td>`;

        tbody.appendChild(row);
      }
      listenAdmin.showUserList();
    });
  }

  async showUserData(user: Element) {
    const admin = document.querySelector('.admin-container');
    if (!admin) return;

    const token = sessionStorage.getItem('token');

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
      admin.innerHTML = `<p class="users__info user__info_name">${rez.userConfig.username}</p>
      <p class="users__info"> E-mail: ${rez.userConfig.email}</p>
      <p class="users__info"> Is user admin: ${rez.userConfig.isAdmin ? 'yes' : 'no'}</p>
      <p class="users__info"> Is user blocked: ${rez.userConfig.isBlock ? 'yes' : 'no'}</p>
      <table class="operations__table">
        <thead><tr><th>#</th><th>date</th><th>operationID</th><th>money</th><th>id</th></tr></thead>
        <tbody class="operations__tbody"></tbody>
      </table>
      <div class="edit__button-container">
        <button class="edit__button-cancel user-lock">${rez.userConfig.isBlock ? 'Unlock user' : 'Lock user'}</button>
      </div>`;

      const tbody = <Element>document.querySelector('.operations__tbody');

      for (let i = 0; i < rez.userConfig.lastFive.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${i + 1}</td>
        <td>${rez.userConfig.lastFive[i].date}</td>
        <td>${rez.userConfig.lastFive[i].operationID}</td>
        <td>${rez.userConfig.lastFive[i].money}</td>
        <td>${rez.userConfig.lastFive[i]._id}</td>`;

        tbody.appendChild(row);
      }

      listenAdmin.lockUser();
    });

    
    //listenAdmin.unlockUser();
  }


}

export const buildAdmin = new BuildAdmin();
