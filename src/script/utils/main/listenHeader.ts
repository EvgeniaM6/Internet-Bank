import config from '../../data/config';
import { EMethod, EPages } from '../../data/types';
import { userFetch } from '../../fetch/userFetch';
import { navigationAccount } from '../account/navigationAccount';
import { buildAuth } from '../auth/buildAuth';
import { createAuth } from '../auth/createAuth';
import { renderPayment } from '../payment/renderPayment';
import { createStatistics } from '../statistics/createStatistics';
import { transition } from '../transition';
import { buildMain } from './buildMain';
import { createMain } from './createMain';

class ListenHeader {
  async updateInfo() {
    const money = document.querySelector('.header__money');
    const token = sessionStorage.getItem('token');
    if (!token || !money) return;
    const result = await userFetch.user(EMethod.GET, token);
    if (!result.userConfig?.email || !result.userConfig.username || !result.userConfig.money) return;
    config.currentEmail = result.userConfig.email;
    config.currentUser = result.userConfig.username;

    const currMoney = result.userConfig.money;
    sessionStorage.setItem('money', `${currMoney}`);
    money.textContent = `$${Number(currMoney).toFixed(2)}`;
  }

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
    const burger = document.querySelector('.header__burger');
    const closeBurger = document.querySelector('.header__burger-close');

    if (!burger || !closeBurger || !logo || !login || !(main instanceof HTMLElement) || !(page instanceof HTMLElement))
      return;

    burger.addEventListener('click', () => {
      const nav = document.querySelector('.header__nav');
      if (!nav) return;

      nav.classList.add('header__nav_burger');
    });

    closeBurger.addEventListener('click', () => {
      const nav = document.querySelector('.header__nav');
      if (!nav) return;

      nav.classList.remove('header__nav_burger');
    });

    logo.addEventListener('click', async () => {
      await this.updateInfo();
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
      el.addEventListener('click', async () => {
        await this.updateInfo();
        this.removeActiveClass();
        el.classList.add('header__nav_active');
        if (el.textContent === EPages.STATISTICS) {
          await createStatistics.operations();
          return;
        }

        if (el.textContent === EPages.CARD_CREATOR) {
          transition(main, createMain.cardCreater);
          return;
        }

        if (el.textContent === EPages.ABOUT) {
          transition(main, createMain.about);
          return;
        }

        if (el.textContent === EPages.ACCOUNT) {
          buildMain.account();
          navigationAccount();
          return;
        }

        if (el.textContent === EPages.SERVICES) {
          transition(main, renderPayment.renderPaymentsPage.bind(renderPayment));
          return;
        }
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
