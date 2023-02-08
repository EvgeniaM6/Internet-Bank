import { validate } from '../validate';
import config from '../../data/config';
import { buildAuth } from '../auth/buildAuth';
import { createAuth } from '../auth/createAuth';
import { buildAccount } from './buildAccount';
import { buildMain } from '../main/buildMain';
import { navigationAccount } from './navigationAccount';
import { userFetch } from '../../fetch/userFetch';
import { EMethod } from '../../data/types';

function cancel() {
  const buttonCancel = document.querySelector('.edit__button-cancel');

  if (!buttonCancel) return;

  buttonCancel.addEventListener('click', () => {
    buildMain.account();
    navigationAccount();
    return;
  });
}

class ListenAccount {
  editAccount() {
    const refreshName = document.getElementById('edit-user');
    const refreshEmail = document.getElementById('edit-email');
    const buttonSubmit = document.querySelector('.edit__button-submit');
    const note = document.querySelector('.edit__notification');

    if (
      !buttonSubmit ||
      !note ||
      !(refreshName instanceof HTMLInputElement) ||
      !(refreshEmail instanceof HTMLInputElement)
    )
      return;

    let valName: boolean;
    let valEmail: boolean;

    const token = sessionStorage.getItem('token');

    cancel();

    buttonSubmit.addEventListener('click', async () => {
      valName = validate(refreshName, config.regex.username);
      valEmail = validate(refreshEmail, config.regex.email);
      const name = refreshName.value;
      const email = refreshEmail.value;
      config.regex.username = name;

      if (!valEmail || !valName || !token) return;

      userFetch.user(EMethod.PUT, token, name, email, config.password);

      note.innerHTML = 'Note: Your login and e-mail have changed successfully! To return to account page press "Back"';
    });
  }

  editPassword() {
    const oldPass = document.getElementById('edit-oldpass');
    const newPass = document.getElementById('edit-newpass');
    const confirmPass = document.getElementById('edit-confirmpass');
    const buttonSubmit = document.querySelector('.edit__button-submit');
    const note = document.querySelector('.edit__notification');

    if (
      !note ||
      !buttonSubmit ||
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

    cancel();

    buttonSubmit.addEventListener('click', async () => {
      const oldPassword = oldPass.value;
      const newPassword = newPass.value;
      const confirmPassword = confirmPass.value;
      if (!oldPassword || !newPassword || !confirmPassword || !token) return;

      if (oldPassword !== config.password) {
        note.innerHTML = 'Note: Incorrect password';
        return;
      }

      if (newPassword !== confirmPassword) {
        note.innerHTML = 'Note: You have different passwords';
        return;
      }

      userFetch.changePassword(token, newPassword, oldPassword);

      note.innerHTML = 'Note: Your password has changed successfully! To return to account page press "Back"';
    });
  }

  deleteAccount() {
    const buttonSubmit = document.querySelector('.remove__button-submit');
    const buttonCancel = document.querySelector('.remove__button-cancel');
    const password = document.getElementById('edit-remove');
    const note = document.querySelector('.edit__notification');

    const token = sessionStorage.getItem('token');

    if (!note || !buttonSubmit || !buttonCancel || !(password instanceof HTMLInputElement)) return;

    buttonCancel.addEventListener('click', () => {
      buildMain.account();
      navigationAccount();
      return;
    });

    buttonSubmit.addEventListener('click', async () => {
      const passwordValue: string = password.value;

      if (passwordValue !== config.password) {
        note.innerHTML = 'Note: Incorrect password';
        return;
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

    buttonCancel.addEventListener('click', () => {
      buildMain.account();
      navigationAccount();
      return;
    });

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
    const buttonCancel = document.querySelector('.currency-cancel');

    if (!create || !del || !createRadio || !delRadio || !buttonCancel) return;

    buttonCancel.addEventListener('click', () => {
      buildMain.account();
      navigationAccount();
      return;
    });

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
    const note = document.querySelector('.edit__notification');

    if (!note || !buttonSubmit || !buttonCancel || !(currency instanceof HTMLSelectElement)) return;

    const token = sessionStorage.getItem('token');

    buttonCancel.addEventListener('click', () => {
      buildMain.account();
      navigationAccount();
      return;
    });

    buttonSubmit.addEventListener('click', async () => {
      const data = (
        await fetch(`http://127.0.0.1:3000/securemoney/account`, {
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
      ).status;

      if (data === 400) {
        note.innerHTML = 'Note: You already have such a foreign currency account';
        return;
      }
      note.innerHTML = 'Note: Foreign currency account was created successfully';
    });
  }

  deleteCurrency() {
    const buttonSubmit = document.querySelector('.deletecurrency-submit');
    const buttonCancel = document.querySelector('.deletecurrency-cancel');
    const currency = document.getElementById('edit-deletecurrency');
    const note = document.querySelector('.edit__notification');

    if (!note || !buttonSubmit || !buttonCancel || !(currency instanceof HTMLSelectElement)) return;

    const token = sessionStorage.getItem('token');

    buttonCancel.addEventListener('click', () => {
      buildMain.account();
      navigationAccount();
      return;
    });

    buttonSubmit.addEventListener('click', async () => {
      const data = (
        await fetch(`http://127.0.0.1:3000/securemoney/account`, {
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
      ).status;

      if (data === 400) {
        note.innerHTML = "Note: You don't have such a foreign currency account";
        return;
      }
      note.innerHTML = 'Note: Foreign currency account was deleted successfully';
    });
  }

  showLastOperations() {
    const buttonCancel = document.querySelector('.lastfive-cancel');

    if (!buttonCancel) return;

    buttonCancel.addEventListener('click', () => {
      buildMain.account();
      navigationAccount();
      return;
    });
  }
}

export const listenAccount = new ListenAccount();
