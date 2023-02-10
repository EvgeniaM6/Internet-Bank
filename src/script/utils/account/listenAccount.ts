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
  const buttonCancel = document.querySelector('.button-cancel');

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
    const buttonSubmit = document.querySelector('.account__edit_button-submit');
    const note = document.querySelector('.account__notification');

    if (
      !buttonSubmit ||
      !note ||
      !(refreshName instanceof HTMLInputElement) ||
      !(refreshEmail instanceof HTMLInputElement)
    )
      return;

    let valName: boolean;
    let valEmail: boolean;

    const token = localStorage.getItem('token');

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
    const oldPass = document.getElementById('password-oldpass');
    const newPass = document.getElementById('password-newpass');
    const confirmPass = document.getElementById('password-confirmpass');
    const buttonSubmit = document.querySelector('.account__password_button-submit');
    const note = document.querySelector('.account__notification_password');

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

    const token = localStorage.getItem('token');

    const buttonCancel = document.querySelector('.account__password_button-cancel');

    if (!buttonCancel) return;

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
    const buttonSubmit = document.querySelector('.account__remove_button-submit');
    const password = document.getElementById('remove-password');
    const note = document.querySelector('.account__notification');

    const token = localStorage.getItem('token');

    if (!note || !buttonSubmit || !(password instanceof HTMLInputElement)) return;

    cancel();

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
    const buttonSubmit = document.querySelector('.account__clarify_button-submit');
    const buttonCancel = document.querySelector('.account__clarify_button-cancel');

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
    const create = document.querySelector('.account__currency_operations-create');
    const del = document.querySelector('.account__currency_operations-delete');
    const createRadio = document.querySelector('.create-currency');
    const delRadio = document.querySelector('.delete-currency');

    if (!create || !del || !createRadio || !delRadio) return;

    cancel();

    create.addEventListener('click', () => {
      createRadio.classList.add('create-currency-active');
      delRadio.classList.remove('delete-currency-active');
      buildAccount.createCurrency();
      listenAccount.createCurrency();
    });

    del.addEventListener('click', () => {
      createRadio.classList.remove('create-currency-active');
      delRadio.classList.add('delete-currency-active');
      buildAccount.deleteCurrency();
      listenAccount.deleteCurrency();
    });
  }

  createCurrency() {
    const buttonSubmit = document.querySelector('.account__currency_button-submit');
    const currency = document.getElementById('account__currency_create-select');
    const note = document.querySelector('.account__notification');

    if (!note || !buttonSubmit || !(currency instanceof HTMLSelectElement)) return;

    const token = localStorage.getItem('token');

    cancel();

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
    const buttonSubmit = document.querySelector('.account__currency_button-submit');
    const currency = document.getElementById('account__currency_delete-select');
    const note = document.querySelector('.account__notification');

    if (!note || !buttonSubmit || !(currency instanceof HTMLSelectElement)) return;

    const token = localStorage.getItem('token');

    cancel();

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
    cancel();
  }
}

export const listenAccount = new ListenAccount();
