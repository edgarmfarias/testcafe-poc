import { Selector } from 'testcafe';

class Menu {
  constructor() {
    this.logout = Selector('a').withText('Logout');
  }
}

export default new Menu();
