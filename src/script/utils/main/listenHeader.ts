import config from '../../data/config';
import { EMethod, EPages } from '../../data/types';
import { userFetch } from '../../fetch/userFetch';
import { buildAuth } from '../auth/buildAuth';
import { createAuth } from '../auth/createAuth';
import { renderPayment } from '../payment/renderPayment';
import { createStatistics } from '../statistics/createStatistics';
import { transition } from '../transition';
import { createMain } from './createMain';
import createStocks from '../stocks/createStocks';
import pushState from '../../router/pushState';

class ListenHeader {
  async updateInfo() {
    const money = document.querySelector('.header__money');
    const token = localStorage.getItem('token');
    if (!token || !money) return;
    const result = await userFetch.user(EMethod.GET, token);
    if (!result.userConfig?.email || !result.userConfig.username || !result.userConfig.money) return;
    config.currentEmail = result.userConfig.email;
    config.currentUser = result.userConfig.username;

    const currMoney = result.userConfig.money;
    localStorage.setItem('money', `${currMoney}`);
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
    const theme = document.querySelector('.header__switch_theme');
    const switchTheme = document.querySelector('.header__theme');

    if (
      !burger ||
      !closeBurger ||
      !logo ||
      !login ||
      !(main instanceof HTMLElement) ||
      !(page instanceof HTMLElement) ||
      !theme ||
      !switchTheme
    )
      return;

    theme.addEventListener('click', () => {
      if (config.theme === 'light') config.theme = 'dark';
      else config.theme = 'light';
      const body = document.querySelector('.page');
      const footerLogo = document.querySelector('.footer__logo');
      const author = document.querySelector('.footer__authors');

      if (body) body.classList.toggle('page-dark');
      if (footerLogo) footerLogo.classList.toggle('footer__logo-dark');
      if (author) author.classList.toggle('footer__authors-dark');

      const td = document.querySelectorAll('td');
      const th = document.querySelectorAll('th');

      td.forEach((el) => el.classList.toggle('table-dark'));
      th.forEach((el) => el.classList.toggle('table-dark'));
    });

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
      pushState.about();
    });

    login.addEventListener('click', () => {
      localStorage.removeItem('token');
      transition(page, () => {
        buildAuth.main();
        createAuth.login();
        main.style.marginLeft = '0';
      });
      pushState.login();
    });

    nav.forEach((el) => {
      el.addEventListener('click', async () => {
        await this.updateInfo();
        this.removeActiveClass();
        el.classList.add('header__nav_active');
        if (el.id === EPages.STATISTICS) {
          await createStatistics.operations();
          pushState.statistic();
          return;
        }

        if (el.id === EPages.CARD_CREATOR) {
          transition(main, createMain.cardCreater);
          pushState.cardCreator();
          return;
        }

        if (el.id === EPages.ABOUT) {
          transition(main, createMain.about);
          pushState.about();
          return;
        }

        if (el.id === EPages.ACCOUNT) {
          transition(main, createMain.account);
          pushState.account();
          return;
        }

        if (el.id === EPages.STOCKS) {
          await createStocks.main();
          pushState.stocks();
          return;
        }

        if (el.id === EPages.ADMIN) {
          transition(main, createMain.admin);
          pushState.admin();
          return;
        }

        if (el.id === EPages.SERVICES) {
          transition(main, renderPayment.renderPaymentsPage.bind(renderPayment));
          pushState.services();
          return;
        }
        alert(el.id);
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
