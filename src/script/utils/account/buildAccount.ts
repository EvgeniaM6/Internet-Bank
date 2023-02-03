class BuildAccount {
  editAccount() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<div class="edit__username-container">
        <label for="user" class="edit__username-label">Username</label>
        <input type="text" name="user" id="edit-user" class="edit__username-input">
      </div>
      <div class="edit__email-container">
        <label for="email" class="edit__email-label">E-mail</label>
        <input type="email" name="email" id="edit-email" class="edit__email-input">
      </div>
      <div class="edit__button-container">
        <button class="edit__button-submit account-submit">Submit</button>
        <button class="edit__button-cancel account-cancel">Cancel</button>
      </div>`;
  }

  editPassword() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<div class="edit__oldpass-container">
        <label for="oldpass" class="edit__oldpass-label">Old password</label>
        <input type="password" name="oldpass" id="edit-oldpass" class="edit__oldpass-input">
      </div>
      <div class="edit__newpass-container">
        <label for="newpass" class="edit__newpass-label">New password</label>
        <input type="password" name="newpass" id="edit-newpass" class="edit__newpass-input">
      </div>
      <div class="edit__confirmpass-container">
        <label for="confirmpass" class="edit__confirmpass-label">Confirm password</label>
        <input type="password" name="confirmpass" id="edit-confirmpass" class="edit__confirmpass-input">
      </div>
      <div class="edit__button-container">
        <button class="edit__button-submit password-submit">Submit</button>
        <button class="edit__button-cancel password-cancel">Cancel</button>
      </div>`;
  }

  clarifyAccount() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<p class="clarify__question">Do you really want to remove your account</p>
      <div class="clarify__button-container">
        <button class="clarify__button-submit clarify-submit">Submit</button>
        <button class="clarify__button-cancel clarify-cancel">Cancel</button>
      </div>`;
  }

  deleteAccount() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<p class="remove__question">Enter your password</p>
      <div class="edit__remove-container">
        <input type="password" name="remove" id="edit-remove" class="edit__remove-input">
      </div>
      <div class="remove__button-container">
        <button class="remove__button-submit remove-submit">Submit</button>
        <button class="remove__button-cancel remove-cancel">Cancel</button>
      </div>`;
  }
}

export const buildAccount = new BuildAccount();
