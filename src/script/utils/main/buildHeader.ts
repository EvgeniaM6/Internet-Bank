class BuildHeader {
  anonimHeader() {
    const header = document.querySelector('header');
    const main = document.querySelector('.main');
    if (!header || !(main instanceof HTMLElement)) return;

    main.style.marginLeft = '230px';

    header.classList.add('header');
    header.innerHTML = `<div>
        <h1 class="header__logo">RS Bank</h1>
        <small>Users online: <span class="users-online__count"></span></small>
    </div>
    <nav class="header__logo">
        <ul class="header__ul">
          <li class="header__nav-item header__nav-about">About</li>
          <li class="header__nav-item">Services</li>
          <li class="header__nav-item">Quiz</li>
          <li class="header__nav-item">Statistics</li>
        </ul>
    </nav>
    <div class="header__login">Log In</div>`;
  }

  logHeader() {
    this.anonimHeader();
    const list = document.querySelector('.header__ul');
    const logout = document.querySelector('.header__login');
    if (!list || !logout) return;

    logout.textContent = 'Log Out';

    const account = document.createElement('li');
    account.classList.add('header__nav-item');
    account.classList.add('header__nav-account');
    account.textContent = 'Account';

    const cardCreator = document.createElement('li');
    cardCreator.classList.add('header__nav-item');
    cardCreator.textContent = 'Card Creator';

    list.appendChild(cardCreator);
    list.appendChild(account);
  }
}

export const buildHeader = new BuildHeader();
