import config from '../../data/config';
import { EAccountLinks, EAdminLinks, EMethod } from '../../data/types';
import { userFetch } from '../../fetch/userFetch';
import { buildAdmin } from '../admin/buildAdmin';
import { listenAdmin } from '../admin/listenAdmin';

class BuildMain {
  about() {
    const main = document.querySelector('.main-container');
    const aboutHead = document.querySelector('.header__nav-about');
    const body = document.querySelector('.main');
    if (!main || !aboutHead || !body) return;

    body.classList.remove('main-auth');

    aboutHead.classList.add('header__nav_active');

    main.innerHTML = ``;
    main.className = 'main-container container';

    const about = document.createElement('div');
    about.classList.add('about');
    about.innerHTML = `<h2 class="about__h">${config.lang === 'en' ? 'RS Bank - clone of Internet Bank' : 'RS Bank - клон Интернет-Банка'}</h2>
    <p class="about__text">${config.lang === 'en' ? `Our RS School 2022Q3 final project is a clone of the Internet bank. 
    Today, almost all financial transactions can be performed remotely via the Internet. 
    So we decided to create bank web-application` : `Наш проект - клон интернет-банка. На сегодняшний день практически все 
    финаносвые операции можно выполнить удаленно через интернет. 
    Мы решили создать свое веб-приложение банка.`}</p>
    <section class="about__highlights about__section">
        <h3 class="about__highlights-h">${config.lang === 'en' ? 'Opportunities' : 'Возможности'}</h3>
        <ul>
            <li class="high_one">${config.lang === 'en' ? 'Authorization (incl. registration, password reset and two-factor authentication)' : 'Авторизация (в т.ч. регистрация, сброс пароля и двухэтапная верификация)'}</li>
            <li class="high_two">${config.lang === 'en' ? 'User Panel (info update, account delete and etc.)' : 'Личный кабинет (изменение данных, удаление аккаунта и т.д.)'}</li>
            <li class="high_three">${config.lang === 'en' ? 'Admin Panel (bank management)' : 'Кабинет админа (управление банком)'}</li>
            <li class="high_four">${config.lang === 'en' ? 'Bank Services (accounts, money exchage, money transfers between clients and etc.)' : 'Банковские услуги (счета, обмен валюты, перевод между клиентами и т.д.)'}</li>
            <li class="high_five">${config.lang === 'en' ? 'Other Services (Netflix, Booking, Orange and etc.)' : 'Прочие услуги (Netflix, Booking, Orange и др.)'}</li>
            <li class="high_six">${config.lang === 'en' ? 'Financial Quiz' : 'Викторина по финансовой грамотности'}</li>
            <li class="high_seven">${config.lang === 'en' ? 'Card Constructor' : 'Конструктор дизайна карточки'}</li>
            <li class="high_eight">${config.lang === 'en' ? 'Stocks market' : 'Биржа акций'}</li>
            <li class="high_nine">${config.lang === 'en' ? 'Statistics' : 'Статистика'}</li>
            <li class="high_ten">${config.lang === 'en' ? 'Day/Night Mode' : 'Дневная/Ночная темы'}</li>
            <li class="high_eleven">${config.lang === 'en' ? 'Languages: RU and EN' : 'Языки: русский и английский'}</li>
        </ul>
    </section>
    <section class="about__stack about__section">
        <h3 class="about__stack_h">${config.lang === 'en' ? 'Stack' : 'Стэк'}</h3>
        <ul>
            <li class="stack_one">Front-end: HTML5, SCSS, TypeScript</li>
            <li class="stack_two">Back-end: Node.js / Express (WebSocket, JWT, NodeEmailer, etc.)</li>
            <li class="stack_three">Database: Mongo DB (Mongoose)</li>
            <li class="stack_four">API: Currency (API Ninjas), DOMtoImage (HCTI API)</li>
        </ul>
    </section>
    <section class="about__authors about__section">
        <h3 class="about__authors-h">${config.lang === 'en' ? 'Authors' : 'Авторы'}</h3>
        <div class="about__egor about__author-container">
            <img src="https://media.licdn.com/dms/image/D4D03AQFZ1H3nzIJK_A/profile-displayphoto-shrink_400_400/0/1670695287244?e=1680739200&v=beta&t=74kmj5qkEgQFssMxYMIBcvOFBLtZ1oiACYBJP7yUfWA" alt="egor-photo" class="about__author-photo">
            <div class="about__author-info">
                <p class="about__author-name egor">${config.lang === 'en' ? 'Egor Litavar' : 'Егор Литавор'}</p>
                <small class="about__author-resp egor-resp">Back-end, Authorization, Statistics, Stocks, Card Creator</small>
                <p class="about__author-text egor-text">${config.lang === 'en' ? `23 yo, Minsk. Have Air Traffic Controller diploma.
                Likes to work on interesting and challenging projects.
                 RS School student since spring 2022.` : ``}</p>
            </div>
        </div>
        <div class="about__andrei about__author-container">
            <img src="https://avatars.githubusercontent.com/u/96068842?v=4" alt="andrei-photo" class="about__author-photo">
            <div class="about__author-info">
                <p class="about__author-name andrei">${config.lang === 'en' ? 'Andrei Shamanouski' : 'Andrei Shamanouski'}</p>
                <small class="about__author-resp andrei-resp">User and Admin Panels, Day/Night Mode, Financial Quiz</small>
                <p class="about__author-text andrei-text">${config.lang === 'en' ? `Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua.` : `Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua.`}</p>
            </div>
        </div>
        <div class="about__evgeniya about__author-container">
            <img src="https://avatars.githubusercontent.com/u/93492831?v=4" alt="evgeniya-photo" class="about__author-photo">
            <div class="about__author-info">
                <p class="about__author-name evgeniya">${config.lang === 'en' ? 'Yevheniia Miniukova' : 'Yevheniia Miniukova'}</p>
                <small class="about__author-resp evgeniya-resp">Services, RU/EN Lang</small>
                <p class="about__author-text evgeniya-text">${config.lang === 'en' ? `Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua.` : `Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua.`}</p>
            </div>
        </div>
    </section>`;
    main.appendChild(about);
  }

  account() {
    const main = document.querySelector('.main-container');
    const account = document.querySelector('.header__nav-account');
    if (!main || !account) return;

    account.classList.add('header__nav_active');
    main.innerHTML = `<ul class="account__list">
      <li class="account__list-item account__list-edit">${EAccountLinks.edit}</li>
      <li class="account__list-item account__list-currency">${EAccountLinks.currency}</li>
      <li class="account__list-item account__list-operations">${EAccountLinks.lastFive}</li>
      <li class="account__list-item account__list-delete">${EAccountLinks.delete}</li>
    </ul>
    <div class="account-container">
      <p class="account__description">We are excited to welcome you in your personal account. Here you can manage your personal date and get your banking information. Let's start!</p>
      <h3 class="account__ttl">Your credit cards</h3>
      <div class="account__cards"></div>
    </div>`;

    const cards = document.querySelector('.account__cards');
    const token = localStorage.getItem('token');

    if (!cards || !token) return;

    const data = userFetch.user(EMethod.GET, token);
    console.log(data);
    data.then((rez) => {
      if (rez.userConfig?.cards) {
        for (let i = 0; i < rez.userConfig?.cards.length; i++) {
          const element = document.createElement('img');
          element.classList.add('account__cards_card');
          element.setAttribute('src', rez.userConfig?.cards[i]);
          element.setAttribute('alt', 'card');

          cards.appendChild(element);
        }
      }
    });
  }

  admin() {
    const main = document.querySelector('.main-container');
    const admin = document.querySelector('.header__nav-admin');
    if (!main || !admin) return;

    admin.classList.add('header__nav_active');
    main.innerHTML = `<div class="admin-container">
      <h2 class="admin__title">Administration</h2>
      <div class="admin__information_bank">
        <h3 class="admin__information_title">Bank information</h3>
        <p class="admin__information_detail">Bank account: <span class="admin__information_account"></span></p>
        <p class="admin__information_detail">Money: <span class="admin__information_money"></span>$</p>
      </div>
      <h3 class="admin__information_title">To get information about users press button:</h3>
      <button class="admin__information_button">List of users</button>
    </div>`;

    buildAdmin.showBankInfo();
    listenAdmin.showBankInfo();
  }
}

export const buildMain = new BuildMain();
