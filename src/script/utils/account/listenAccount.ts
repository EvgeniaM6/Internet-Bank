import { validate } from '../validate';
import config from '../../data/config';
import { buildAuth } from '../auth/buildAuth';
import { createAuth } from '../auth/createAuth';
import { buildAccount } from './buildAccount';
import { buildMain } from '../main/buildMain';
import { navigationAccount } from './navigationAccount';

class ListenAccount {
  editAccount() {
    const refreshName = document.getElementById('edit-user');
    const refreshEmail = document.getElementById('edit-email');
    const buttonSubmit = document.querySelector('.edit__button-submit');
    const buttonCancel = document.querySelector('.edit__button-cancel');
    const note = document.querySelector('.edit__notification');

    if (
      !buttonSubmit ||
      !buttonCancel ||
      !note ||
      !(refreshName instanceof HTMLInputElement) ||
      !(refreshEmail instanceof HTMLInputElement)
    )
      return;

    let valName: boolean;
    let valEmail: boolean;

    refreshName.addEventListener('blur', () => {
      valName = validate(refreshName, config.regex.username);
    });

    refreshEmail.addEventListener('blur', () => {
      valEmail = validate(refreshEmail, config.regex.email);
    });

    const token = sessionStorage.getItem('token');

    buttonCancel.addEventListener('click', () => {
      buildMain.account();
      navigationAccount();
      return;
    });

    buttonSubmit.addEventListener('click', async () => {
      const name = refreshName.value;
      const email = refreshEmail.value;
      config.regex.username = name;

      if (!valEmail || !valName || !token) return;

      (
        await fetch(`http://127.0.0.1:3000/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: name,
            password: config.password,
            email: email,
          }),
        })
      ).json();

      note.innerHTML = 'Note: Your login and e-mail changed successfully! To return to account page press "Back"';
    });
  }

  editPassword() {
    const oldPass = document.getElementById('edit-oldpass');
    const newPass = document.getElementById('edit-newpass');
    const confirmPass = document.getElementById('edit-confirmpass');
    const buttonSubmit = document.querySelector('.edit__button-submit');
    const buttonCancel = document.querySelector('.edit__button-cancel');

    if (
      !buttonSubmit ||
      !buttonCancel ||
      !(oldPass instanceof HTMLInputElement) ||
      !(newPass instanceof HTMLInputElement) ||
      !(confirmPass instanceof HTMLInputElement)
    )
      return;

    let valName: boolean;
    let valEmail: boolean;

    oldPass.addEventListener('blur', () => {
      valName = validate(oldPass, config.regex.password);
    });

    newPass.addEventListener('blur', () => {
      valEmail = validate(newPass, config.regex.password);
    });

    confirmPass.addEventListener('blur', () => {
      valEmail = validate(confirmPass, config.regex.password);
    });

    const token = sessionStorage.getItem('token');

    buttonCancel.addEventListener('click', () => {
      buildMain.account();
      navigationAccount();
      return;
    });

    buttonSubmit.addEventListener('click', async () => {
      const oldPassword = oldPass.value;
      const newPassword = newPass.value;
      const confirmPassword = confirmPass.value;
      if (!oldPassword || !newPassword || !confirmPassword || !token) return;

      if (oldPassword !== config.password) {
        alert('неверный пароль');
        return;
      }

      if (newPassword !== confirmPassword) {
        alert('пароли не совпадают');
        return;
      }

      (
        await fetch(`http://127.0.0.1:3000/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: config.currentUser,
            password: newPassword,
          }),
        })
      ).json();
    });
  }

  deleteAccount() {
    const buttonSubmit = document.querySelector('.remove__button-submit');
    const buttonCancel = document.querySelector('.remove__button-cancel');
    const password = document.getElementById('edit-remove');

    const token = sessionStorage.getItem('token');

    if (!buttonSubmit || !buttonCancel || !(password instanceof HTMLInputElement)) return;

    buttonSubmit.addEventListener('click', async () => {
      const passwordValue: string = password.value;
      if (passwordValue !== config.password) {
        alert('неверный пароль');
      }

      (
        await fetch(`http://127.0.0.1:3000/user`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: passwordValue,
          }),
        })
      ).json();

      buildAuth.main();
      createAuth.login();
    });
  }

  clarifyAccount() {
    const buttonSubmit = document.querySelector('.clarify__button-submit');
    const buttonCancel = document.querySelector('.clarify__button-cancel');

    if (!buttonSubmit || !buttonCancel) return;

    buttonSubmit.addEventListener('click', () => {
      buildAccount.deleteAccount();
      listenAccount.deleteAccount();
    });
  }

  currency() {
    const create = document.querySelector('.operations-create');
    const del = document.querySelector('.operations-delete');
    const createRadio = document.querySelector('.createC');
    const delRadio = document.querySelector('.deleteC');

    if (!create || !del || !createRadio || !delRadio) return;

    create.addEventListener('click', () => {
      createRadio.classList.add('createC-active');
      delRadio.classList.remove('deleteC-active');
      buildAccount.createCurrency();
      listenAccount.createCurrency();
    });

    del.addEventListener('click', () => {
      createRadio.classList.remove('createC-active');
      delRadio.classList.add('deleteC-active');
      buildAccount.deleteCurrency();
      listenAccount.deleteCurrency();
    });
  }

  createCurrency() {
    const buttonSubmit = document.querySelector('.createcurrency-submit');
    const buttonCancel = document.querySelector('.createcurrency-cancel');
    const currency = document.getElementById('edit-createcurrency');

    if (!buttonSubmit || !buttonCancel || !(currency instanceof HTMLSelectElement)) return;

    const token = sessionStorage.getItem('token');

    buttonSubmit.addEventListener('click', async () => {
      (
        await fetch(`http://127.0.0.1:3000/money/account`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: config.currentUser,
            currency: currency.value,
          }),
        })
      ).json();
    });
  }

  deleteCurrency() {
    const buttonSubmit = document.querySelector('.deletecurrency-submit');
    const buttonCancel = document.querySelector('.deletecurrency-cancel');
    const currency = document.getElementById('edit-deletecurrency');

    if (!buttonSubmit || !buttonCancel || !(currency instanceof HTMLSelectElement)) return;

    const token = sessionStorage.getItem('token');

    buttonSubmit.addEventListener('click', async () => {
      (
        await fetch(`http://127.0.0.1:3000/money/account`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: config.currentUser,
            currency: currency.value,
          }),
        })
      ).json();
    });
  }
}

export const listenAccount = new ListenAccount();
