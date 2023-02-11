import { EAccountLinks, EAdminLinks, EMethod } from '../../data/types';
import { userFetch } from '../../fetch/userFetch';
import { buildAdmin } from '../admin/buildAdmin';
import { listenAdmin } from '../admin/listenAdmin';

class BuildMain {
  about() {
    const main = document.querySelector('.main-container');
    const aboutHead = document.querySelector('.header__nav-about');
    if (!main || !aboutHead) return;

    aboutHead.classList.add('header__nav_active');

    main.innerHTML = ``;
    main.className = 'main-container container';

    const about = document.createElement('div');
    about.classList.add('about');
    about.innerHTML = `<h2 class="about__h">RS Bank - clone of Internet Bank</h2>
    <p class="about__text">Our RS School 2022Q3 final project is a clone of the Internet bank. 
        Today, almost all financial transactions can be performed remotely via the Internet. 
        So we decided to create bank web-application</p>
    <section class="about__highlights about__section">
        <h3 class="about__highlights-h">Opportunities</h3>
        <ul>
            <li class="high_one">Authorization (incl. registration, password reset and two-factor authentication)</li>
            <li class="high_two">User Panel (info update, account delete and etc.)</li>
            <li class="high_three">Admin Panel (bank management)</li>
            <li class="high_four">Bank Services (accounts, money exchage, money transfers between clients and etc.)</li>
            <li class="high_five">Other Services (Netflix, Booking, Orange and etc.)</li>
            <li class="high_six">Financial Quiz</li>
            <li class="high_seven">Card Constructor</li>
            <li class="high_eight">Stocks market</li>
            <li class="high_nine">Statistics</li>
            <li class="high_ten">Day/Night Mode</li>
            <li class="high_eleven">Languages: RU and EN</li>
        </ul>
    </section>
    <section class="about__stack about__section">
        <h3 class="about__stack_h">Stack</h3>
        <ul>
            <li class="stack_one">Front-end: HTML5, SCSS, TypeScript</li>
            <li class="stack_two">Back-end: Node.js / Express: WebSocket, JWT, NodeEmailer etc.</li>
            <li class="stack_three">Database: Mongo DB (Mongoose)</li>
            <li class="stack_four">API: Currency (API Ninjas), DOMtoImage (HCTI API)</li>
        </ul>
    </section>
    <section class="about__authors about__section">
        <h3 class="about__authors-h">Authors</h3>
        <div class="about__egor about__author-container">
            <img src="https://media.licdn.com/dms/image/D4D03AQFZ1H3nzIJK_A/profile-displayphoto-shrink_400_400/0/1670695287244?e=1680739200&v=beta&t=74kmj5qkEgQFssMxYMIBcvOFBLtZ1oiACYBJP7yUfWA" alt="egor-photo" class="about__author-photo">
            <div class="about__author-info">
                <p class="about__author-name egor">Egor Litavar</p>
                <small class="about__author-resp egor-resp">Back-end, Authorization, Statistics, Stocks, Routing</small>
                <p class="about__author-text egor-text">23 yo, Minsk. Have Air Traffic Controller diploma.
                 Likes to work on interesting and challenging projects.
                  RS School student since spring 2022.</p>
            </div>
        </div>
        <div class="about__andrei about__author-container">
            <img src="https://avatars.githubusercontent.com/u/96068842?v=4" alt="andrei-photo" class="about__author-photo">
            <div class="about__author-info">
                <p class="about__author-name andrei">Andrei Shamanouski</p>
                <small class="about__author-resp andrei-resp">User Panel, Admin Panel, Day/Night Mode</small>
                <p class="about__author-text andrei-text">Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua.</p>
            </div>
        </div>
        <div class="about__evgeniya about__author-container">
            <img src="https://avatars.githubusercontent.com/u/93492831?v=4" alt="evgeniya-photo" class="about__author-photo">
            <div class="about__author-info">
                <p class="about__author-name evgeniya">Yevheniia Miniukova</p>
                <small class="about__author-resp evgeniya-resp">Bank Services, Other Services, Financial Quiz, RU/EN Lang</small>
                <p class="about__author-text evgeniya-text">Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua..</p>
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
      <h3 class="account__ttl">Your credit cards<h3>
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
