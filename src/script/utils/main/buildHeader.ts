import config from '../../data/config';

class BuildHeader {
  anonimHeader() {
    const header = document.querySelector('header');
    const main = document.querySelector('.main');
    if (!header || !(main instanceof HTMLElement)) return;

    if (document.documentElement.clientWidth > 767) main.style.marginLeft = '230px';

    header.classList.add('header');
    header.innerHTML = `<div class="header__up">
        <h1 class="header__logo">RS Bank</h1>
    </div>
    <button class="header__burger">Menu</button>
    <nav class="header__nav">
        <ul class="header__ul">
            <li class="header__nav-item header__nav-about">About</li>
            <li class="header__nav-item">Services</li>
            <li class="header__nav-item">Quiz</li>
            <li class="header__nav-item">Statistics</li>
        </ul>
        <button class="header__burger-close">&#10006;</button>
    </nav>
    <div class="header__down">
        <div class="header__login">Log In</div>
        <small>Users online: <span class="users-online__count"></span></small>
    </div>`;
  }

  logHeader() {
    this.anonimHeader();
    const list = document.querySelector('.header__ul');
    const logout = document.querySelector('.header__login');
    const headerUp = document.querySelector('.header__up');
    if (!list || !logout || !headerUp) return;

    logout.textContent = 'Log Out';

    const account = document.createElement('li');
    account.classList.add('header__nav-item');
    account.classList.add('header__nav-account');
    account.textContent = 'Account';

    const cardCreator = document.createElement('li');
    cardCreator.classList.add('header__nav-item');
    cardCreator.textContent = 'Card Creator';

    const money = document.createElement('p');
    money.classList.add('header__money');
    const currMoney = sessionStorage.getItem('money');
    if (currMoney) {
      money.textContent = `$${Number(currMoney).toFixed(2)}`;
    }
    headerUp.appendChild(money);

    list.appendChild(cardCreator);
    list.appendChild(account);
  }
}

export const buildHeader = new BuildHeader();
