import { buildAuth } from '../auth/buildAuth';
import { createAuth } from '../auth/createAuth';
import { transition } from '../transition';
import { createMain } from './createMain';

class ListenHeader {
  private removeActiveClass() {
    const nav = document.querySelectorAll('.header__nav-item');
    nav.forEach((el) => el.classList.remove('header__nav_active'));
  }

  main() {
    const logo = document.querySelector('.header__logo');
    const nav = document.querySelectorAll('.header__nav-item');
    const main = document.querySelector('.main');
    const login = document.querySelector('.header__login');
    const page = document.querySelector('.page');

    if (!logo || !login || !(main instanceof HTMLElement) || !(page instanceof HTMLElement)) return;

    logo.addEventListener('click', () => {
      this.removeActiveClass();
      transition(main, createMain.about);
    });

    login.addEventListener('click', () => {
      sessionStorage.removeItem('token');
      transition(page, () => {
        buildAuth.main();
        createAuth.login();
        main.style.marginLeft = '0';
      });
    });

    nav.forEach((el) => {
      el.addEventListener('click', () => {
        this.removeActiveClass();
        el.classList.add('header__nav_active');
        // Перкелючение на нужную секцию
        alert(el.textContent);
      });
    });
  }

  log() {
    this.main();
    // дополнительные слушатели
  }

  anonim() {
    this.main();
  }
}

export const listenHeader = new ListenHeader();