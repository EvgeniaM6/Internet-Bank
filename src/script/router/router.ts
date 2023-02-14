import config from '../data/config';
import { EMethod, EPages } from '../data/types';
import { adminFetch } from '../fetch/adminFetch';
import { userFetch } from '../fetch/userFetch';
import { openWebSocket } from '../fetch/webSocket';
import { buildAuth } from '../utils/auth/buildAuth';
import { createAuth } from '../utils/auth/createAuth';
import { createMain } from '../utils/main/createMain';
import { listenHeader } from '../utils/main/listenHeader';
import { renderPayment } from '../utils/payment/renderPayment';
import { createStatistics } from '../utils/statistics/createStatistics';
import createStocks from '../utils/stocks/createStocks';
import { transition } from '../utils/transition';
import pushState from './pushState';

class Router {
  popstate() {
    window.addEventListener('popstate', async () => {
      const route = window.location.pathname.split('/');
      const page = route[route.length - 1];
      console.log('Route:', route, page, window.history.state);

      const isHeader = document.querySelector('.header__up');
      if (!isHeader && page !== EPages.AUTH) {
        createMain.header();
      }

      await listenHeader.updateInfo();
      switch (page) {
        case EPages.ABOUT:
          this.about();
          break;
        case EPages.ACCOUNT:
          this.account();
          break;
        case EPages.ADMIN:
          this.admin();
          break;
        case EPages.AUTH:
          this.login();
          break;
        case EPages.CARD_CREATOR:
          this.cardCreator();
          break;
        case EPages.QUIZ:
          this.quiz();
          break;
        case EPages.SERVICES:
          this.services();
          break;
        case EPages.STATISTICS:
          this.statistic();
          break;
        case EPages.STOCKS:
          this.stocks();
          break;
      }
    });
  }

  async page() {
    const body = document.querySelector('.page');
    if (!(body instanceof HTMLElement)) return;

    const route = window.location.pathname.split('/');
    const page = route[route.length - 1];

    if (page !== EPages.AUTH && page !== '' && page !== 'index.html') {
      createMain.header();
      listenHeader.updateInfo();
    }

    const token = localStorage.getItem('token');
    if (token) {
      const check = await this.isBlocked();

      if (check) {
        this.login();
        pushState.login();
        body.style.opacity = '1';
        return;
      }
      openWebSocket();
    }

    if (page === '' || page === 'index.html') {
      if (!token) {
        this.login();
        pushState.login();
        body.style.opacity = '1';
        return;
      }
      createMain.header();
      this.about();
      pushState.about();
      listenHeader.updateInfo();
    }
    switch (page) {
      case EPages.ABOUT:
        this.about();
        pushState.about();
        break;
      case EPages.ACCOUNT:
        this.account();
        pushState.account();
        break;
      case EPages.ADMIN:
        this.admin();
        pushState.admin();
        break;
      case EPages.AUTH:
        this.login();
        pushState.login();
        break;
      case EPages.CARD_CREATOR:
        this.cardCreator();
        pushState.cardCreator();
        break;
      case EPages.QUIZ:
        this.quiz();
        pushState.quiz();
        break;
      case EPages.SERVICES:
        this.services();
        pushState.services();
        break;
      case EPages.STATISTICS:
        this.statistic();
        pushState.statistic();
        break;
      case EPages.STOCKS:
        this.stocks();
        pushState.stocks();
        break;
      default:
        this.about();
        pushState.about();
    }
    setTimeout(() => {
      body.style.opacity = '1';
    }, 0);
  }

  private userCheck() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token! Need to login!');
      this.login();
      pushState.login();
    }

    return token;
  }

  private async isBlocked() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const user = await userFetch.user(EMethod.GET, token);
    return user.userConfig?.isBlock;
  }

  private async isAdmin() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.login();
      pushState.login();
      return false;
    }

    const result = await adminFetch.check(token);
    if (!result.success) {
      alert('You are not a admin!');
      this.about();
    }

    return result.success;
  }

  private login() {
    const main = document.querySelector('.main');
    const page = document.querySelector('.page');
    if (!(main instanceof HTMLElement) || !(page instanceof HTMLElement)) return;

    localStorage.removeItem('token');
    transition(page, () => {
      buildAuth.main();
      createAuth.login();
      //main.style.marginLeft = '0';
    });
    config.page = EPages.AUTH;
  }

  private about() {
    const main = document.querySelector('.main');
    if (!(main instanceof HTMLElement)) return;

    transition(main, createMain.about);
    config.page = EPages.ABOUT;
  }

  private cardCreator() {
    const main = document.querySelector('.main');
    if (!(main instanceof HTMLElement) || !this.userCheck()) return;

    transition(main, createMain.cardCreater);
    config.page = EPages.CARD_CREATOR;
  }

  private quiz() {
    // Quiz creator
    config.page = EPages.QUIZ;
  }

  private async statistic() {
    await createStatistics.operations();
    config.page = EPages.STATISTICS;
  }

  private async stocks() {
    const main = document.querySelector('.main');
    if (!(main instanceof HTMLElement) || !this.userCheck()) return;

    await createStocks.main();
    config.page = EPages.STOCKS;
  }

  private services() {
    const main = document.querySelector('.main');
    if (!(main instanceof HTMLElement)) return;

    transition(main, renderPayment.renderPaymentsPage.bind(renderPayment));
    config.page = EPages.SERVICES;
  }

  private account() {
    const main = document.querySelector('.main');
    if (!(main instanceof HTMLElement) || !this.userCheck()) return;

    transition(main, createMain.account);
    config.page = EPages.ACCOUNT;
  }

  private admin() {
    const main = document.querySelector('.main');
    if (!(main instanceof HTMLElement) || !this.isAdmin()) return;

    transition(main, createMain.admin);
    config.page = EPages.ADMIN;
  }
}

export default new Router();
