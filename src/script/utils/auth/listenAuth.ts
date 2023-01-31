import config from '../../data/config';
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

    login.addEventListener('click', () => {
      if (!validateAuth.login()) return;
      transition(auth, createAuth.verify);
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

    reset.addEventListener('click', () => {
      if (!validateAuth.reset()) return;
      transition(auth, createAuth.afterReset);
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

    if (
      !(auth instanceof HTMLElement) ||
      !back ||
      !reg ||
      !(username instanceof HTMLInputElement) ||
      !(password instanceof HTMLInputElement) ||
      !(email instanceof HTMLInputElement)
    )
      return;

    username.addEventListener('blur', () => {
      validate(username, config.regex.username);
    });

    password.addEventListener('blur', () => {
      validate(password, config.regex.password);
    });

    email.addEventListener('blur', () => {
      validate(email, config.regex.email);
    });

    this.backToLogin(back, auth);

    reg.addEventListener('click', () => {
      if (!validateAuth.registrarion()) return;
      transition(auth, createAuth.afterRegistration);
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

    if (!(auth instanceof HTMLElement) || !back) return;

    this.backToLogin(back, auth);
  }
}

export const listenAuth = new ListenAuth();
