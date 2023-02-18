import { validate } from '../validate';
import config from '../../data/config';
import { buildAuth } from '../auth/buildAuth';
import { createAuth } from '../auth/createAuth';
import { buildAccount } from './buildAccount';
import { userFetch } from '../../fetch/userFetch';
import { EMethod } from '../../data/types';
import { moneyFetch } from '../../fetch/moneyFetch';
import { TLang } from '../../data/servicesType';
import en from '../../data/lang/account/en';
import ru from '../../data/lang/account/ru';

const langs: TLang = {
  en,
  ru,
};

class ListenAccount {
  editAccount() {
    const accountName = document.querySelector('.account__link_name');
    const refreshName = document.getElementById('edit-user');
    const refreshEmail = document.getElementById('edit-email');
    const refreshPass = document.getElementById('edit-password');
    const buttonSubmit = document.querySelector('.account__edit_button-submit');
    const note = document.querySelector('.account__notification');
    const token = localStorage.getItem('token');
    if (
      !token ||
      !accountName ||
      !buttonSubmit ||
      !note ||
      !(refreshName instanceof HTMLInputElement) ||
      !(refreshEmail instanceof HTMLInputElement) ||
      !(refreshPass instanceof HTMLInputElement)
    )
      return;

    let valName: boolean;
    let valEmail: boolean;

    buttonSubmit.addEventListener('click', async () => {
      valName = validate(refreshName, config.regex.username);
      valEmail = validate(refreshEmail, config.regex.email);
      const name = refreshName.value;
      const email = refreshEmail.value;

      if (!valEmail || !valName || !token) return;

      const currLangObj = langs[config.lang];

      note.textContent = currLangObj['connect-server'];
      userFetch.user(EMethod.PUT, token, name, email, refreshPass.value).then((rez) => {
        if (rez.success) {
          config.regex.username = name;
          note.innerHTML = currLangObj['note-login-success'];
          accountName.innerHTML = name;
        } else note.innerHTML = currLangObj['note-incorr-passw'];
      });
      setTimeout(() => (note.textContent = currLangObj['ready_to_edit']), 4000);
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

    const currLangObj = langs[config.lang];

    buttonSubmit.addEventListener('click', async () => {
      const oldPassword = oldPass.value;
      const newPassword = newPass.value;
      const confirmPassword = confirmPass.value;
      if (!oldPassword || !newPassword || !confirmPassword || !token) return;

      if (newPassword !== confirmPassword) {
        note.innerHTML = currLangObj['note-diff-passw'];
        return;
      }
      note.textContent = currLangObj['connect-server'];

      userFetch.changePassword(token, newPassword, oldPassword).then((rez) => {
        if (rez.success) {
          note.innerHTML = currLangObj['note-passw-success'];
        } else note.innerHTML = currLangObj['note-incorr-passw'];
      });
      setTimeout(() => (note.textContent = currLangObj['ready_to_edit']), 4000);
    });
  }

  deleteAccount() {
    const buttonSubmit = document.querySelector('.account__remove_button-submit');
    const password = document.getElementById('remove-password');
    const note = document.querySelector('.account__notification');

    const token = localStorage.getItem('token');

    if (!token || !note || !buttonSubmit || !(password instanceof HTMLInputElement)) return;

    const currLangObj = langs[config.lang];

    buttonSubmit.addEventListener('click', async () => {
      const passwordValue: string = password.value;

      userFetch.checkPassword(password, token).then((rez) => {
        if (rez.success) {
          userFetch.user(EMethod.DELETE, token, undefined, undefined, passwordValue).then((rez) => {
            if (rez.success) {
              buildAuth.main();
              createAuth.login();
            }
          });
        } else note.innerHTML = currLangObj['note-incorr-passw'];
      });
    });
  }

  clarifyAccount() {
    const buttonSubmit = document.querySelector('.account__clarify_button-submit');
    if (!buttonSubmit) return;

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
    if (!token) return;

    const currLangObj = langs[config.lang];

    buttonSubmit.addEventListener('click', async () => {
      note.textContent = currLangObj['connect-server'];
      const data = await moneyFetch.moneyAccount(EMethod.POST, config.currentUser, currency.value, token);

      if (!data.success) {
        note.innerHTML = `${currLangObj['already-have-start']} ${currency.value} ${currLangObj['already-have-end']}`;
      } else {
        note.innerHTML = currLangObj['success'];
        buildAccount.updateCurrency();
      }
      setTimeout(() => (note.textContent = currLangObj['ready_to']), 3000);
    });
  }

  deleteCurrency() {
    const buttonSubmit = document.querySelector('.account__currency_button-submit');
    const currency = document.getElementById('account__currency_delete-select');
    const note = document.querySelector('.account__notification');

    if (!note || !buttonSubmit || !(currency instanceof HTMLSelectElement)) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const currLangObj = langs[config.lang];

    buttonSubmit.addEventListener('click', async () => {
      note.textContent = currLangObj['connect-server'];
      const data = await moneyFetch.moneyAccount(EMethod.DELETE, config.currentUser, currency.value, token);

      if (!data.success) {
        note.innerHTML = `${currLangObj['dont-have-start']} ${currency.value} ${currLangObj['dont-have-end']}`;
      } else {
        note.innerHTML = currLangObj['success'];
        buildAccount.updateCurrency();
      }
      setTimeout(() => (note.textContent = currLangObj['ready_to']), 3000);
    });
  }
}

export const listenAccount = new ListenAccount();
