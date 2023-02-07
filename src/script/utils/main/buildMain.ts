import { EAccountLinks } from "../../data/types";

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
            <li class="high_eight">Chat-bot</li>
            <li class="high_nine">Statistics</li>
            <li class="high_ten">Day/Night Mode</li>
            <li class="high_eleven">Languages: RU and EN</li>
        </ul>
    </section>
    <section class="about__stack about__section">
        <h3 class="about__stack_h">Stack</h3>
        <ul>
            <li class="stack_one">Front-end: HTML5, SCSS, TypeScript</li>
            <li class="stack_two">Back-end: Node.js / Express</li>
            <li class="stack_three">Database: Mongo DB</li>
            <li class="stack_four">API: Currency (API Ninjas)</li>
        </ul>
    </section>
    <section class="about__authors about__section">
        <h3 class="about__authors-h">Authors</h3>
        <div class="about__egor about__author-container">
            <img src="https://media.licdn.com/dms/image/D4D03AQFZ1H3nzIJK_A/profile-displayphoto-shrink_400_400/0/1670695287244?e=1680739200&v=beta&t=74kmj5qkEgQFssMxYMIBcvOFBLtZ1oiACYBJP7yUfWA" alt="egor-photo" class="about__author-photo">
            <div class="about__author-info">
                <p class="about__author-name egor">Egor Litavar</p>
                <small class="about__author-resp egor-resp">Back-end, Database, Authorization, Bank Services</small>
                <p class="about__author-text egor-text">Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua.</p>
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
                <small class="about__author-resp evgeniya-resp">Bank Services, Other Services, Financial Quiz</small>
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
      <li class="account__list-item">${EAccountLinks.edit}</li>
      <li class="account__list-item">${EAccountLinks.changePassword}</li>
      <li class="account__list-item">${EAccountLinks.currency}</li>
      <li class="account__list-item">${EAccountLinks.lastFive}</li>
      <li class="account__list-item">${EAccountLinks.delete}</li>
    </ul>
    <div class="account-container">
      <p>We are excited to welcome you in your personal account. Here you can manage your personal date and get your banking information. Let's start!</p>
    </div>`;
  }

  admin() {
    const main = document.querySelector('.main-container');
    const admin = document.querySelector('.header__nav-admin');
    if (!main || !admin) return;

    admin.classList.add('header__nav_active');
    main.innerHTML = `<ul class="admin__list">
      <li class="admin__list-item">User list</li>
      <li class="admin__list-item">Edit password</li>
      <li class="admin__list-item">Currency</li>
      <li class="admin__list-item">Last operations</li>
      <li class="admin__list-item">Delete account</li>
    </ul>
    <div class="admin-container">
    </div>`;
  }
}

export const buildMain = new BuildMain();
