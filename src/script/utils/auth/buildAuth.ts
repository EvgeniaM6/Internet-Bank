class BuildAuth {
  login() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = `<div class="login auth">
            <h2 class="login__h">Welcome to the best bank!</h2>
            <div class="login__container auth__container">
                <div class="login__username-container auth__block">
                    <label for="" class="login__username-label">Username</label>
                    <input type="text" name="" id="" class="login__username-input auth__input">
                </div>
                <div class="login__password-container auth__block">
                    <label for="" class="login__password-label">Password</label>
                    <input type="password" name="" id="" class="login__password-input auth__input">
                </div>
                <div class="login__button-container auth__button-container">
                    <button class="login__button-login auth__button">Sign In</button>
                    <button class="login__button-anonim auth__button">Continue as Guest</button>
                </div>
                <p class="login__error"></p>
                <div class="login__links">
                    <p class="login__register">Register now</p>
                    <p class="login__reset">Forget password?</p>
                </div>
            </div>
        </div>`;
  }

  registration() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = `<div class="reg">
            <h2 class="reg__h"></h2>
            <div class="reg__container">
                <div class="reg__username-container">
                    <label for="" class="reg__username-label">Username</label>
                    <input type="text" name="" id="" class="reg__username-input">
                </div>
                <div class="reg__email-container">
                    <label for="" class="reg__email-label">E-mail</label>
                    <input type="email" name="" id="" class="reg__email-input">
                </div>
                <div class="reg__password-container">
                    <label for="" class="reg__password-label">Password</label>
                    <input type="password" name="" id="" class="reg__password-input">
                </div>
                <div class="reg__repeat-password-container">
                    <label for="" class="repeat-reg__password-label">Repeat Password</label>
                    <input type="password" name="" id="" class="repeat-reg__password-input">
                </div>
                <button class="reg__button-reg">Let's start!</button>
                <p class="reg__error"></p>
                <p class="reg__secury-code"></p>
            </div>
        </div>`;
  }

  afterRegistration() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = `<div class="after-reg">
            <p class="after-reg__text"></p>
            <p class="after-reg__code"></p>
            <button class="after-reg__back">Back to Log In</button>
        </div>`;
  }

  reset() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = `<div class="reset">
            <h2 class="reset__h"></h2>
            <div class="reset__container">
                <div class="reset__username-container">
                    <label for="" class="reset__username-label">Username</label>
                    <input type="text" name="" id="" class="reset__username-input">
                </div>
                <div class="reset__email-container">
                    <label for="" class="reset__email-label">E-mail</label>
                    <input type="email" name="" id="" class="reset__email-input">
                </div>
                <button class="reset__button-reset">Reset password</button>
                <p class="reset__error"></p>
            </div>
        </div>`;
  }

  afterReset() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = `<div class="after-reset">
            <p class="after-reset__text">Check your email - we sent a new password</p>
            <button class="after-reset__back">Back to Log In</button>
        </div>`;
  }

  verify() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.innerHTML = `<div class="verify">
            <h2 class="verify__h"></h2>
            <div class="verify__container">
                <div class="verify__code-container">
                    <label for="" class="verify__code-label">Code</label>
                    <input type="number" name="" id="" class="verify__code-input">
                </div>
                <div class="verify__button-container">
                    <button class="verify__button-confirm">Confirm</button>
                    <button class="verify__button-back">Back</button>
                </div>
                <p class="verify__error"></p>
            </div>
        </div>`;
  }
}

export const buildAuth = new BuildAuth();
