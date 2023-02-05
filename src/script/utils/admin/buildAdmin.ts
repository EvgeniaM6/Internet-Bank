import { EMethod } from '../../data/types';
import { adminFetch } from '../../fetch/adminFetch';

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
        <td>${rez.safeDatabase[i].username}</td>
        <td>${rez.safeDatabase[i].email}</td>
        <td>${rez.safeDatabase[i].isAdmin}</td>
        <td>${rez.safeDatabase[i].isBlock}</td>`;

        tbody.appendChild(row);
      }
    });
  }
}

export const buildAdmin = new BuildAdmin();
