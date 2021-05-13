import { Selector } from 'testcafe';

class InventoryPage {
  constructor() {
    this.path = '/inventory.html';
    this.item = Selector('.inventory_item');
    this.itemName = '.inventory_item_name';
    this.itemDescription = '.inventory_item_desc';
    this.itemPrice = '.inventory_item_price';
    this.addToCart = '.btn_primary';
  }

  async addItems(t, number) {
    const itemCount = await this.item.count;
    const items = [];

    for (let i = 0; i < (number > itemCount ? itemCount : number); i++) {
      const currentItem = this.item.nth(i);
      const name = await currentItem.find(this.itemName).innerText;
      const description = await currentItem.find(this.itemDescription)
        .innerText;
      const price = await currentItem.find(this.itemPrice).innerText;
      items.push({ name, description, price });

      await t.click(currentItem.find(this.addToCart));
    }

    return items;
  }
}

export default new InventoryPage();
