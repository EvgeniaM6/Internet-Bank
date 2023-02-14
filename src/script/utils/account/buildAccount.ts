import config from '../../data/config';
import { EMethod } from '../../data/types';
import { userFetch } from '../../fetch/userFetch';

class BuildAccount {
  editAccount() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<div id="account__edit">
        <h2 class="account__edit_title">Edit login or e-mail</h2>
        <div id="account__edit_username">
          <label for="user" class="account__edit_username-label">Login</label>
          <input type="text" name="user" id="edit-user" class="account__edit_username-input" value="${config.currentUser}">
        </div>
        <div id="account__edit_email">
          <label for="email" class="account__edit_email-label">E-mail</label>
          <input type="email" name="email" id="edit-email" class="account__edit_email-input" value="${config.currentEmail}">
        </div>
        <div id="account__edit_password">
          <label for="password" class="account__edit_password-label">Password</label>
          <input type="password" name="password" id="edit-password" class="account__edit_password-input">
        </div>
        <div class="account__buttons">
          <button class="account__edit_button-submit button-submit">Submit</button>
        </div>
        <p class="account__notification"></p>
      </div>
      <div id="account__password">
      <h2 class="account__password_title">Change password</h2>
      <div id="account__password_oldpassword">
        <label for="oldpass" class="account__password_oldpassword-label">Old password</label>
        <input type="password" name="oldpass" id="password-oldpass" class="account__password_oldpassword-input">
      </div>
      <div id="account__password_newpassword">
        <label for="newpass" class="account__password_newpassword-label">New password</label>
        <input type="password" name="newpass" id="password-newpass" class="account__password_newpassword-input">
      </div>
      <div id="account__password_confirmpassword">
        <label for="confirmpass" class="account__password_confirmpassword-label">Confirm password</label>
        <input type="password" name="confirmpass" id="password-confirmpass" class="account__password_confirmpassword-input">
      </div>
      <div class="account__buttons">
        <button class="account__password_button-submit button-submit">Submit</button>
        <button class="account__password_button-cancel button-cancel">Back</button>
      </div>
      <p class="account__notification_password"></p>
      </div>`;
  }

  clarifyAccount() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<p class="account__clarify_question">Do you really want to remove your account</p>
      <div class="account__buttons">
        <button class="account__clarify_button-submit button-submit">Remove</button>
        <button class="account__clarify_button-cancel button-cancel">Back</button>
      </div>`;
  }

  deleteAccount() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<p class="account__remove_question">Enter your password:</p>
      <div class="account__remove">
        <input type="password" name="remove" id="remove-password" class="account__remove-input">
      </div>
      <div class="account__buttons">
        <button class="account__remove_button-submit button-submit">Remove</button>
        <button class="account__remove_button-cancel button-cancel">Cancel</button>
      </div>
      <p class="account__notification"></p>`;
  }

  currency() {
    const account = document.querySelector('.account-container');
    if (!account) return;

    account.innerHTML = `<p class="account__currency_title">Choose operation:</p>
    <div class="account__currency_operations">
      <div class="account__currency_operations-create"><span class="create-currency"></span>Create currency</div>
      <div class="account__currency_operations-delete"><span class="delete-currency"></span>Delete currency</div>
    </div>
    <div class="account__currency">
      <div class="account__buttons">
        <button class="account__currency_button-cancel button-cancel">Back</button>
      </div>
    </div>
    <div class="account__currency_current"></div>`;

    const currencyAccount = document.querySelector('.account__currency_current');
    const token = localStorage.getItem('token');

    if (token) {
      userFetch.user(EMethod.GET, token).then((rez) => {
        if (rez.userConfig?.accounts) {
          for (let i = 0; i < rez.userConfig.accounts.length; i++) {
            const elem = document.createElement('p');
            elem.innerHTML = `${rez.userConfig.accounts[i].currency}: ${rez.userConfig.accounts[i].money}`;
            currencyAccount?.appendChild(elem);
          }
        }
      });
    }
  }

  createCurrency() {
    const account = document.querySelector('.account__currency');
    if (!account) return;

    account.innerHTML = `<div id="account__currency_create">
      <div id="account__currency_create-container">
        <label class="account__currency_create-label">Choose currency</label>
        
        <select id="account__currency_create-select" class="account__currency_create-input">
          <option value="EUR" selected>EUR</option>
          <option value="GBP">GBP</option>
          <option value="BYN">BYN</option>
          <option value="UAH">UAH</option>
        </select>
      </div>
      <div class="account__buttons">
        <button class="account__currency_button-submit button-submit">Submit</button>
        <button class="account__currency_button-cancel button-cancel">Back</button>
      </div>
      <p class="account__notification"></p>
      </div>`;
  }

  deleteCurrency() {
    const account = document.querySelector('.account__currency');
    if (!account) return;

    account.innerHTML = `<div id="account__currency_delete">
      <div id="account__currency_delete-container">
        <label class="account__currency_delete-label">Choose currency</label>
          
        <select id="account__currency_delete-select" class="account__currency_delete-input">
          <option value="EUR" selected>EUR</option>
          <option value="GBP">GBP</option>
          <option value="BYN">BYN</option>
          <option value="UAH">UAH</option>
        </select>
      </div>
      <div class="account__buttons">
        <button class="account__currency_button-submit button-submit">Submit</button>
        <button class="account__currency_button-cancel button-cancel">Back</button>
      </div>
      <p class="account__notification"></p>
      </div>`;
  }
}

export const buildAccount = new BuildAccount();
