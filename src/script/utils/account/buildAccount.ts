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
        <input type="email" name="email" id="edit-email" class="edit__password-input">
      </div>
      <div class="edit__button-container">
        <button class="edit__button-submit">Submit</button>
        <button class="edit__button-cancel">Cancel</button>
      </div>`;
  }
}

export const buildAccount = new BuildAccount();
