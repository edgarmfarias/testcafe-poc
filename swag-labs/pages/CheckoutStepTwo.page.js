import { Selector } from 'testcafe';

class CheckoutStepTwoPage {
  constructor() {
    this.path = '/checkout-step-two.html';
    this.item = Selector('.cart_item');
    this.itemName = '.inventory_item_name';
    this.itemDescription = '.inventory_item_desc';
    this.itemPrice = '.inventory_item_price';
    this.finish = Selector('.cart_button').withText('FINISH');
  }

  async getItem(index) {
    const checkoutItem = await this.item.nth(index);
    const name = await checkoutItem.find(this.itemName).innerText;
    const description = await checkoutItem.find(this.itemDescription).innerText;
    const price = await checkoutItem.find(this.itemPrice).innerText;

    return { name, description, price };
  }
}

export default new CheckoutStepTwoPage();
