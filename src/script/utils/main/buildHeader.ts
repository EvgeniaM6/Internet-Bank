import config from '../../data/config';

class BuildHeader {
  anonimHeader() {
    const header = document.querySelector('header');
    const main = document.querySelector('.main');
    if (!header || !(main instanceof HTMLElement)) return;

    main.style.marginLeft = '230px';

    header.classList.add('header');
    header.innerHTML = `<div class="header__up">
        <h1 class="header__logo">RS Bank</h1>
        <small>Users online: <span class="users-online__count"></span></small>
    </div>
    <nav class="header__nav">
        <ul class="header__ul">
          <li class="header__nav-item header__nav-about">About</li>
          <li class="header__nav-item">Services</li>
          <li class="header__nav-item">Quiz</li>
          <li class="header__nav-item">Statistics</li>
        </ul>
    </nav>
    <div class="header__down">
        <div class="header__login">Log In</div>
    </div>`;
  }

  logHeader() {
    this.anonimHeader();
    const list = document.querySelector('.header__ul');
    const logout = document.querySelector('.header__login');
    const headerDown = document.querySelector('.header__down');
    if (!list || !logout || !headerDown) return;

    logout.textContent = 'Log Out';

    const account = document.createElement('li');
    account.classList.add('header__nav-item');
    account.classList.add('header__nav-account');
    account.textContent = 'Account';

    const cardCreator = document.createElement('li');
    cardCreator.classList.add('header__nav-item');
    cardCreator.textContent = 'Card Creator';

    const money = document.createElement('p');
    const currMoney = sessionStorage.getItem('money');
    if (currMoney) {
      money.textContent = `$${Number(currMoney).toFixed(2)}`;
    }
    headerDown.appendChild(money);

    list.appendChild(cardCreator);
    list.appendChild(account);
  }
}

export const buildHeader = new BuildHeader();
