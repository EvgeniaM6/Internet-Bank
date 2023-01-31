import config from '../../data/config';
import { userFetch } from '../../fetch/userFetch';
import { load } from '../load';
import { transition } from '../transition';
import { validate } from '../validate';
import { createAuth } from './createAuth';
import { validateAuth } from './verifyAuth';

class ListenAuth {
  private backToLogin(back: Element, auth: HTMLElement) {
    back.addEventListener('click', () => {
      transition(auth, createAuth.login);
    });
  }

  login() {
    const register = document.querySelector('.login__register');
    const reset = document.querySelector('.login__reset');
    const auth = document.querySelector('.auth__container');
    const login = document.querySelector('.login__button-login');
    const anonim = document.querySelector('.login__button-anonim');
    const username = document.querySelector('.login__username-input');
    const password = document.querySelector('.login__password-input');

    if (
      !reset ||
      !register ||
      !(auth instanceof HTMLElement) ||
      !login ||
      !anonim ||
      !(username instanceof HTMLInputElement) ||
      !(password instanceof HTMLInputElement)
    )
      return;

    username.addEventListener('blur', () => {
      validate(username, config.regex.username);
    });

    password.addEventListener('blur', () => {
      validate(password, config.regex.password);
    });

    reset.addEventListener('click', () => {
      transition(auth, createAuth.reset);
    });

    register.addEventListener('click', () => {
      transition(auth, createAuth.registration);
    });

    login.addEventListener('click', async () => {
      const currUsername = username.value;
      if (!validateAuth.login()) return;
      load(auth);

      await userFetch.login(username.value, password.value).then((result) => {
        if (result.success) {
          transition(auth, createAuth.verify);
          config.currentUser = currUsername;
          return;
        }

        transition(auth, createAuth.login);
        setTimeout(() => {
          const errorLabel = document.querySelector('.login__error');
          const username = document.querySelector('.login__username-input');

          if (!errorLabel || !(username instanceof HTMLInputElement)) return;

          errorLabel.textContent = result.message;
          username.value = currUsername;
        }, 250);
      });
    });

    anonim.addEventListener('click', () => {
      alert('Anonim!');
    });
  }

  reset() {
    const auth = document.querySelector('.auth__container');
    const back = document.querySelector('.reset__button-back');
    const reset = document.querySelector('.reset__button-reset');
    const username = document.querySelector('.reset__username-input');
    const email = document.querySelector('.reset__email-input');

    if (
      !(auth instanceof HTMLElement) ||
      !back ||
      !reset ||
      !(username instanceof HTMLInputElement) ||
      !(email instanceof HTMLInputElement)
    )
      return;

    username.addEventListener('blur', () => {
      validate(username, config.regex.username);
    });

    email.addEventListener('blur', () => {
      validate(email, config.regex.email);
    });

    this.backToLogin(back, auth);

    reset.addEventListener('click', async () => {
      if (!validateAuth.reset()) return;
      load(auth);
      await userFetch.reset(username.value, email.value).then((result) => {
        if (result.success) {
          transition(auth, createAuth.afterReset);
          return;
        }

        transition(auth, createAuth.reset);
        setTimeout(() => {
          const errorLabel = document.querySelector('.reset__error');
          if (!errorLabel) return;

          errorLabel.textContent = result.message;
        }, 250);
      });
    });
  }

  afterReset() {
    const auth = document.querySelector('.auth__container');
    const back = document.querySelector('.after-reset__back');

    if (!(auth instanceof HTMLElement) || !back) return;

    this.backToLogin(back, auth);
  }

  registration() {
    const auth = document.querySelector('.auth__container');
    const back = document.querySelector('.reg__button-back');
    const reg = document.querySelector('.reg__button-reg');
    const username = document.querySelector('.reg__username-input');
    const email = document.querySelector('.reg__email-input');
    const password = document.querySelector('.reg__password-input');
    const repPassword = document.querySelector('.repeat-reg__password-input');

    if (
      !(auth instanceof HTMLElement) ||
      !back ||
      !reg ||
      !(username instanceof HTMLInputElement) ||
      !(password instanceof HTMLInputElement) ||
      !(repPassword instanceof HTMLInputElement) ||
      !(email instanceof HTMLInputElement)
    )
      return;

    username.addEventListener('blur', () => {
      validate(username, config.regex.username);
    });

    password.addEventListener('blur', () => {
      validate(password, config.regex.password);
    });

    repPassword.addEventListener('blur', () => {
      repPassword.classList.remove('invalid');
      if (repPassword.value !== password.value) {
        repPassword.classList.add('invalid');
      }
    });

    email.addEventListener('blur', () => {
      validate(email, config.regex.email);
    });

    this.backToLogin(back, auth);

    reg.addEventListener('click', async () => {
      if (!validateAuth.registrarion()) return;
      load(auth);
      await userFetch.regictration(username.value, password.value, email.value).then((result) => {
        if (result.success) {
          transition(auth, createAuth.afterRegistration);
          setTimeout(() => {
            const code = document.querySelector('.after-reg__code');
            if (!code) return;
            code.textContent = `${result.pinCode}`;
          }, 250);
          return;
        }

        transition(auth, createAuth.registration);
        setTimeout(() => {
          const errorLabel = document.querySelector('.reg__error');
          if (!errorLabel) return;

          errorLabel.textContent = result.message;
        }, 250);
      });
    });
  }

  afterRegistration() {
    const auth = document.querySelector('.auth__container');
    const back = document.querySelector('.after-reg__back');

    if (!(auth instanceof HTMLElement) || !back) return;

    this.backToLogin(back, auth);
  }

  verify() {
    const auth = document.querySelector('.auth__container');
    const back = document.querySelector('.verify__button-back');
    const confirm = document.querySelector('.verify__button-confirm');
    const input = document.querySelector('.verify__code-input');

    if (!(auth instanceof HTMLElement) || !(input instanceof HTMLInputElement) || !back || !confirm) return;

    this.backToLogin(back, auth);

    confirm.addEventListener('click', async () => {
      if (!input.value.length) return;
      load(auth);
      await userFetch.verify(config.currentUser, +input.value).then((result) => {
        if (result.success) {
          transition(auth, createAuth.login);
          return;
        }

        transition(auth, createAuth.verify);
        setTimeout(() => {
          const errorLabel = document.querySelector('.verify__error');
          if (!errorLabel) return;

          errorLabel.textContent = result.message;
        }, 250);
      });
    });
  }
}

export const listenAuth = new ListenAuth();
