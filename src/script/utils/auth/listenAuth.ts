import { transition } from '../transition';
import { createAuth } from './createAuth';

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

    if (!reset || !register || !(auth instanceof HTMLElement) || !login || !anonim) return;

    reset.addEventListener('click', () => {
      transition(auth, createAuth.reset);
    });

    register.addEventListener('click', () => {
      transition(auth, createAuth.registration);
    });

    login.addEventListener('click', () => {
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

    if (!(auth instanceof HTMLElement) || !back || !reset) return;

    this.backToLogin(back, auth);

    reset.addEventListener('click', () => {
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

    if (!(auth instanceof HTMLElement) || !back || !reg) return;

    this.backToLogin(back, auth);

    reg.addEventListener('click', () => {
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
