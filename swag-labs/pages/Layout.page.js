import { Selector } from 'testcafe';

class Layout {
  constructor() {
    this.path = '/cart.html';
    this.menu = Selector('button').withText('Open Menu');
    this.shoppingCart = '.shopping_cart_link';
    this.shoppinCartCounter = '.shopping_cart_badge';
  }
}

export default new Layout();
