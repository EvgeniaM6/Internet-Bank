import { validate } from '../validate';
import config from '../../data/config';
import { userFetch } from '../../fetch/userFetch';
import { EMethod } from '../../data/types';

class ListenAccount {
  editAccount() {
    const refreshName = document.getElementById('edit-user');
    const refreshEmail = document.getElementById('edit-email');
    const buttonSubmit = document.querySelector('.edit__button-submit');
    const buttonCancel = document.querySelector('.edit__button-cancel');

    if (
      !buttonSubmit ||
      !buttonCancel ||
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

    buttonSubmit.addEventListener('click', async () => {
      const name = refreshName.value;
      const email = refreshEmail.value;
      console.log(email);
      console.log(token);
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

      //userFetch.user(EMethod.PUT, token, name, email);
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

      //userFetch.user(EMethod.PUT, token, name, email);
    });
  }
}

export const listenAccount = new ListenAccount();
