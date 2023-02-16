import config from '../../data/config';
import en from '../../data/lang/header/en';
import ru from '../../data/lang/header/ru';
import { TLang } from '../../data/servicesType';
import { createElem } from '../../utilities';
import { switchLang } from '../switchLang';

class BuildAuth {
  langs: TLang = {
    en,
    ru,
  };

  main() {
    const main = document.querySelector('.main-container');
    const body = document.querySelector('.main');
    const header = document.querySelector('header');
    const isEnglish = config.lang === 'en';
    if (!main || !header || !body) return;

    header.classList.remove('header');
    header.innerHTML = '';

    body.classList.add('main-auth');

    main.className = 'container main-container';
    main.innerHTML = `<div class="auth">
		<h2 class="auth__h">${isEnglish ? 'Welcome to RS Bank!' : 'Добро пожаловать в RS Банк!'}</h2>
		<div class="auth__container"></div>`;

    const auth = document.querySelector('.auth');
    if (auth) {
      if (config.theme === 'dark') auth.classList.add('auth-dark');
    }

    const langBlock = createElem('div', 'lang', main as HTMLElement);
    const langSelect = createElem('select', 'header__lang-select', langBlock) as HTMLSelectElement;
    ['en', 'ru'].forEach((langStr) => {
      const langOptionElem = createElem('option', '', langSelect, langStr) as HTMLOptionElement;
      langOptionElem.value = langStr;
      langOptionElem.selected = langStr === config.lang;
    });
    langSelect.oninput = () => switchLang(langSelect);
  }
  login() {
    const auth = document.querySelector('.auth__container');
    const isEnglish = config.lang === 'en';
    if (!auth) return;

    this.removeClass(auth);
    auth.classList.add('login__container');
    auth.innerHTML = `<div class="login__username-container auth__block">
                    <label for="user" class="login__username-label">${isEnglish ? 'Username' : 'Логин'}</label>
                    <input type="text" name="" id="user" class="login__username-input auth__input">
                </div>
                <div class="login__password-container auth__block">
                    <label for="pass" class="login__password-label">${isEnglish ? 'Password' : 'Пароль'}</label>
                    <input type="password" name="" id="pass" class="login__password-input auth__input">
                </div>
                <div class="login__button-container auth__button-container">
                    <button class="login__button-login auth__button">${isEnglish ? 'Sign In' : 'Войти'}</button>
                    <button class="login__button-anonim auth__button">${
                      isEnglish ? 'Continue as Guest' : 'Продолжить анонимно'
                    }</button>
                </div>
                <p class="login__error auth__error"></p>
                <div class="login__links">
                    <p class="login__register">${isEnglish ? 'Register now' : 'Зарегистрироваться'}</p>
                    <p class="login__reset">${isEnglish ? 'Forget password?' : 'Забыли пароль?'}</p>
                </div>`;
  }

  registration() {
    const auth = document.querySelector('.auth__container');
    const isEnglish = config.lang === 'en';
    if (!auth) return;

    this.removeClass(auth);
    auth.classList.add('reg__container');

    auth.innerHTML = `
                <div class="reg__username-container auth__block">
                    <label for="user" class="reg__username-label">${
                      isEnglish ? 'Username (min 1 character)' : 'Логин (мин. 1 символ)'
                    }</label>
                    <input type="text" name="" id="user" class="reg__username-input auth__input">
                </div>
                <div class="reg__email-container auth__block">
                    <label for="email" class="reg__email-label">${isEnglish ? 'E-mail' : 'Электронная почта'}</label>
                    <input type="email" name="" id="email" class="reg__email-input auth__input">
                </div>
                <div class="reg__password-container auth__block">
                    <label for="pass" class="reg__password-label">${
                      isEnglish
                        ? 'Password (min 8 characters, numbers and letters)'
                        : 'Пароль (мин. 8 символов, цифры и буквы)'
                    }</label>
                    <input type="password" name="" id="pass" class="reg__password-input auth__input">
                </div>
                <div class="reg__repeat-password-container auth__block">
                    <label for="rep" class="repeat-reg__password-label">${
                      isEnglish ? 'Repeat Password' : 'Повторите пароль'
                    }</label>
                    <input type="password" name="" id="rep" class="repeat-reg__password-input auth__input">
                </div>
								<div class="auth__button-container reg__button-container">
                	<button class="reg__button-reg auth__button">${isEnglish ? "Let's start!" : 'Создать'}</button>
                	<button class="reg__button-back auth__button">${isEnglish ? 'Back' : 'Назад'}</button>
								</div>
                <p class="reg__error auth__error">${
                  isEnglish
                    ? 'We use two-step verification. Please, enter real e-mail'
                    : 'Мы используем двухэтапную верификацию. Пожалуйста, указывайте реальную электронную почту'
                }</p>`;
  }

  afterRegistration() {
    const auth = document.querySelector('.auth__container');
    const isEnglish = config.lang === 'en';
    if (!auth) return;

    this.removeClass(auth);
    auth.classList.add('after-reg__container');

    auth.innerHTML = `<p class="after-reg__text">${
      isEnglish
        ? 'We use two-step verification. But you can also use PIN-CODE'
        : 'Мы используем двухэтапную верификацию. Однако вы можете также использовать ПИН-КОД'
    }</p>
            <p class="after-reg__code">Get pin fron server</p>
            <button class="after-reg__back auth__button">${isEnglish ? 'Back to Log In' : 'Войти'}</button>`;
  }

  reset() {
    const auth = document.querySelector('.auth__container');
    const isEnglish = config.lang === 'en';
    if (!auth) return;

    this.removeClass(auth);
    auth.classList.add('reset__container');

    auth.innerHTML = `<div class="reset__username-container auth__block">
                    <label for="user" class="reset__username-label">${isEnglish ? 'Username' : 'Логин'}</label>
                    <input type="text" name="" id="user" class="reset__username-input auth__input">
                </div>
                <div class="reset__email-container auth__block">
                    <label for="email" class="reset__email-label">${isEnglish ? 'E-mail' : 'Электронная почта'}</label>
                    <input type="email" name="" id="email" class="reset__email-input auth__input">
                </div>
								<div class="auth__button-container">
                	<button class="reset__button-reset auth__button">${isEnglish ? 'Reset password' : 'Сбросить'}</button>
                	<button class="reset__button-back auth__button">${isEnglish ? 'Back' : 'Назад'}</button>
								</div>
                <p class="reset__error auth__error"></p>`;
  }

  afterReset() {
    const auth = document.querySelector('.auth__container');
    const isEnglish = config.lang === 'en';
    if (!auth) return;
    this.removeClass(auth);
    auth.classList.add('after-reset__container');
    auth.innerHTML = `<p class="after-reset__text">${
      isEnglish ? 'Check your email - we sent a new password' : 'Проверьте вашу почту - мы отправили новый пароль'
    }</p>
            <button class="after-reset__back auth__button">${isEnglish ? 'Back to Log In' : 'Назад'}</button>`;
  }

  verify() {
    const auth = document.querySelector('.auth__container');
    const isEnglish = config.lang === 'en';
    if (!auth) return;
    this.removeClass(auth);
    auth.classList.add('verify__container');

    auth.innerHTML = `<div class="verify__code-container auth__block">
                    <label for="cpde" class="verify__code-label">${
                      isEnglish
                        ? 'Code (check your e-mail or use PIN)'
                        : 'Код (проверьте электронную почту или используйте ПИН-КОД)'
                    }</label>
                    <input type="number" name="" id="code" class="verify__code-input auth__input">
                </div>
                <div class="verify__button-container auth__button-container">
                    <button class="verify__button-confirm auth__button">${
                      isEnglish ? 'Confirm' : 'Подтвердить'
                    }</button>
                    <button class="verify__button-back auth__button">${isEnglish ? 'Back' : 'Назад'}</button>
                </div>
                <p class="verify__error auth__error"></p>`;
  }

  private removeClass(el: Element) {
    el.className = 'auth__container';
  }
}

export const buildAuth = new BuildAuth();
