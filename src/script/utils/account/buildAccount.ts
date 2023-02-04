import config from "../../data/config";

class BuildAccount {
  editAccount() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<div id="account-edit">
        <div id="edit__username-container">
          <label for="user" class="edit__username-label">Username</label>
          <input type="text" name="user" id="edit-user" class="edit__username-input" value="${config.currentUser}">
        </div>
        <div id="edit__email-container">
          <label for="email" class="edit__email-label">E-mail</label>
          <input type="email" name="email" id="edit-email" class="edit__email-input" value="${config.currentEmail}">
        </div>
        <div class="edit__button-container">
          <button class="edit__button-submit account-submit">Submit</button>
          <button class="edit__button-cancel account-cancel">Back</button>
        </div>
      </div>`;
  }

  editPassword() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<div id="account-pass">
      <div id="edit__oldpass-container">
        <label for="oldpass" class="edit__oldpass-label">Old password</label>
        <input type="password" name="oldpass" id="edit-oldpass" class="edit__oldpass-input">
      </div>
      <div id="edit__newpass-container">
        <label for="newpass" class="edit__newpass-label">New password</label>
        <input type="password" name="newpass" id="edit-newpass" class="edit__newpass-input">
      </div>
      <div id="edit__confirmpass-container">
        <label for="confirmpass" class="edit__confirmpass-label">Confirm password</label>
        <input type="password" name="confirmpass" id="edit-confirmpass" class="edit__confirmpass-input">
      </div>
      <div class="edit__button-container">
        <button class="edit__button-submit password-submit">Submit</button>
        <button class="edit__button-cancel password-cancel">Back</button>
      </div>
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

  currency() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<p class="operations__title">Choose operation:</p>
    <div class="operations">
      <div class="operations-create"><span class="createC"></span>Create currency</div>
      <div class="operations-delete"><span class="deleteC"></span>Delete currency</div>
    </div>
    <div class="currency-container"></div>`;
  }

  createCurrency() {
    const account = document.querySelector('.currency-container');
    if (!account) return;

    account.innerHTML = `<div id="account-createCurr">
      <div id="edit__createcurrency-container">
        <label for="createcurrency" class="edit__createcurrency-label">Choose currency</label>
        <input type="text" name="createcurrency" id="edit-createcurrency" class="edit__createcurrency-input">
      </div>
      <div class="edit__button-container">
        <button class="edit__button-submit cteatecurrency-submit">Submit</button>
        <button class="edit__button-cancel cteatecurrency-cancel">Back</button>
      </div>`;
  }

  deleteCurrency() {
    const account = document.querySelector('.currency-container');
    if (!account) return;

    account.innerHTML = `<div id="account-deleteCurr">
      <div id="edit__deletecurrency-container">
        <label for="deletecurrency" class="edit__deletecurrency-label">Choose currency</label>
        <input type="text" name="deletecurrency" id="edit-deletecurrency" class="edit__deletecurrency-input">
      </div>
      <div class="edit__button-container">
        <button class="edit__button-submit deletecurrency-submit">Submit</button>
        <button class="edit__button-cancel deletecurrency-cancel">Back</button>
      </div>`;
  }
}

export const buildAccount = new BuildAccount();
