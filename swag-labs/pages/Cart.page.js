import { Selector } from 'testcafe';

class CartPage {
  constructor() {
    this.path = '/cart.html';
    this.item = Selector('.cart_item');
    this.itemName = '.inventory_item_name';
    this.itemDescription = '.inventory_item_desc';
    this.itemPrice = '.inventory_item_price';
    this.checkout = '.checkout_button';
  }

  async getItem(index) {
    const cartItem = await this.item.nth(index);
    const name = await cartItem.find(this.itemName).innerText;
    const description = await cartItem.find(this.itemDescription).innerText;
    const price = await cartItem.find(this.itemPrice).innerText;

    return { name, description, price };
  }
}

export default new CartPage();
