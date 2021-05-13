import { Selector } from 'testcafe';

class LoginPage {
  constructor() {
    this.path = '/';
    this.username = Selector('[data-test="username"]');
    this.password = Selector('[data-test="password"]');
    this.loginButton = Selector('#login-button');
    this.error = Selector('[data-test="error"]').withText(
      'Username and password do not match any user in this service'
    );
  }

  async login(t, username, password) {
    await t
      .typeText(this.username, username)
      .typeText(this.password, password)
      .click(this.loginButton);
  }
}

export default new LoginPage();
