class BuildAuth {
  main() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = `<div class="auth">
		<h2 class="auth__h">Welcome to the best bank!</h2>
		<div class="auth__container"></div>`;
  }
  login() {
    const auth = document.querySelector('.auth__container');
    if (!auth) return;

    this.removeClass(auth);
    auth.classList.add('login__container');
    auth.innerHTML = `<div class="login__username-container auth__block">
                    <label for="user" class="login__username-label">Username</label>
                    <input type="text" name="" id="user" class="login__username-input auth__input">
                </div>
                <div class="login__password-container auth__block">
                    <label for="pass" class="login__password-label">Password</label>
                    <input type="password" name="" id="pass" class="login__password-input auth__input">
                </div>
                <div class="login__button-container auth__button-container">
                    <button class="login__button-login auth__button">Sign In</button>
                    <button class="login__button-anonim auth__button">Continue as Guest</button>
                </div>
                <p class="login__error"></p>
                <div class="login__links">
                    <p class="login__register">Register now</p>
                    <p class="login__reset">Forget password?</p>
                </div>`;
  }

  registration() {
    const auth = document.querySelector('.auth__container');
    if (!auth) return;

    this.removeClass(auth);
    auth.classList.add('reg__container');

    auth.innerHTML = `
                <div class="reg__username-container auth__block">
                    <label for="user" class="reg__username-label">Username</label>
                    <input type="text" name="" id="user" class="reg__username-input auth__input">
                </div>
                <div class="reg__email-container auth__block">
                    <label for="email" class="reg__email-label">E-mail</label>
                    <input type="email" name="" id="email" class="reg__email-input auth__input">
                </div>
                <div class="reg__password-container auth__block">
                    <label for="pass" class="reg__password-label">Password (min 8 characters, numbers and letters)</label>
                    <input type="password" name="" id="pass" class="reg__password-input auth__input">
                </div>
                <div class="reg__repeat-password-container auth__block">
                    <label for="rep" class="repeat-reg__password-label">Repeat Password</label>
                    <input type="password" name="" id="rep" class="repeat-reg__password-input auth__input">
                </div>
								<div class="auth__button-container reg__button-container">
                	<button class="reg__button-reg auth__button">Let's start!</button>
                	<button class="reg__button-back auth__button">Back</button>
								</div>
                <p class="reg__error">We use two-step verification. Please, enter real e-mail</p>`;
  }

  afterRegistration() {
    const auth = document.querySelector('.auth__container');
    if (!auth) return;

    this.removeClass(auth);
    auth.classList.add('after-reg__container');

    auth.innerHTML = `<p class="after-reg__text">We use two-step verification. But you can also use PIN-CODE</p>
            <p class="after-reg__code">Get pin fron server</p>
            <button class="after-reg__back auth__button">Back to Log In</button>`;
  }

  reset() {
    const auth = document.querySelector('.auth__container');
    if (!auth) return;

    this.removeClass(auth);
    auth.classList.add('reset__container');

    auth.innerHTML = `<div class="reset__username-container auth__block">
                    <label for="user" class="reset__username-label">Username</label>
                    <input type="text" name="" id="user" class="reset__username-input auth__input">
                </div>
                <div class="reset__email-container auth__block">
                    <label for="email" class="reset__email-label">E-mail</label>
                    <input type="email" name="" id="email" class="reset__email-input auth__input">
                </div>
								<div class="auth__button-container">
                	<button class="reset__button-reset auth__button">Reset password</button>
                	<button class="reset__button-back auth__button">Back</button>
								</div>
                <p class="reset__error"></p>`;
  }

  afterReset() {
    const auth = document.querySelector('.auth__container');
    if (!auth) return;
    this.removeClass(auth);
    auth.classList.add('after-reset__container');
    auth.innerHTML = `<p class="after-reset__text">Check your email - we sent a new password</p>
            <button class="after-reset__back auth__button">Back to Log In</button>`;
  }

  verify() {
    const auth = document.querySelector('.auth__container');
    if (!auth) return;
    this.removeClass(auth);
    auth.classList.add('verify__container');

    auth.innerHTML = `<div class="verify__code-container auth__block">
                    <label for="cpde" class="verify__code-label">Code</label>
                    <input type="number" name="" id="code" class="verify__code-input auth__input">
                </div>
                <div class="verify__button-container auth__button-container">
                    <button class="verify__button-confirm auth__button">Confirm</button>
                    <button class="verify__button-back auth__button">Back</button>
                </div>
                <p class="verify__error"></p>`;
  }

  private removeClass(el: Element) {
    el.className = 'auth__container';
  }
}

export const buildAuth = new BuildAuth();
