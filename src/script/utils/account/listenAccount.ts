import { validate } from '../validate';
import config from '../../data/config';
import { buildAuth } from '../auth/buildAuth';
import { createAuth } from '../auth/createAuth';
import { buildAccount } from './buildAccount';
import { buildMain } from '../main/buildMain';
import { navigationAccount } from './navigationAccount';
import { userFetch } from '../../fetch/userFetch';
import { EMethod } from '../../data/types';
import { moneyFetch } from '../../fetch/moneyFetch';

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
    const refreshPass = document.getElementById('edit-password');
    const buttonSubmit = document.querySelector('.account__edit_button-submit');
    const note = document.querySelector('.account__notification');
    const token = localStorage.getItem('token');
    if (
      !token ||
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

      userFetch.checkPassword(refreshPass, token).then((rez) => {
        if (rez.success) {
          userFetch.user(EMethod.PUT, token, name, email, refreshPass.value).then((rez) => {
            if (rez.success) {
              config.regex.username = name;
              note.innerHTML =
                'Note: Your login and e-mail have changed successfully! To return to account page press "Back"';
            }
          });
        } else note.innerHTML = 'Note: Incorrect password';
      });
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

    cancel();

    buttonSubmit.addEventListener('click', async () => {
      const oldPassword = oldPass.value;
      const newPassword = newPass.value;
      const confirmPassword = confirmPass.value;
      if (!oldPassword || !newPassword || !confirmPassword || !token) return;

      userFetch.checkPassword(oldPass, token).then((rez) => {
        if (rez.success) {
          if (newPassword !== confirmPassword) {
            note.innerHTML = 'Note: You have different passwords';
            return;
          }

          userFetch.changePassword(token, newPassword, oldPassword).then((rez) => {
            if (rez.success) {
              note.innerHTML = 'Note: Your password has changed successfully! To return to account page press "Back"';
            }
          });
        } else note.innerHTML = 'Note: Incorrect password';
      });
    });
  }

  deleteAccount() {
    const buttonSubmit = document.querySelector('.account__remove_button-submit');
    const password = document.getElementById('remove-password');
    const note = document.querySelector('.account__notification');

    const token = localStorage.getItem('token');

    if (!token || !note || !buttonSubmit || !(password instanceof HTMLInputElement)) return;

    cancel();

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
        } else note.innerHTML = 'Note: Incorrect password';
      });
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
    if (!token) return;

    cancel();

    buttonSubmit.addEventListener('click', async () => {
      note.textContent = 'Connect to the server...';
      const data = await moneyFetch.moneyAccount(EMethod.POST, config.currentUser, currency.value, token);

      if (!data.success) {
        note.innerHTML = `You already have a ${currency.value} account`;
      } else {
        note.innerHTML = 'Success';
        buildAccount.updateCurrency();
      }
      setTimeout(() => (note.textContent = 'Ready to create/delete'), 3000);
    });
  }

  deleteCurrency() {
    const buttonSubmit = document.querySelector('.account__currency_button-submit');
    const currency = document.getElementById('account__currency_delete-select');
    const note = document.querySelector('.account__notification');

    if (!note || !buttonSubmit || !(currency instanceof HTMLSelectElement)) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    cancel();

    buttonSubmit.addEventListener('click', async () => {
      note.textContent = 'Connect to the server...';
      const data = await moneyFetch.moneyAccount(EMethod.DELETE, config.currentUser, currency.value, token);

      if (!data.success) {
        note.innerHTML = `You don't have a ${currency.value} account`;
      } else {
        note.innerHTML = 'Success';
        buildAccount.updateCurrency();
      }
      setTimeout(() => (note.textContent = 'Ready to create/delete'), 3000);
    });
  }

  showLastOperations() {
    cancel();
  }
}

export const listenAccount = new ListenAccount();
