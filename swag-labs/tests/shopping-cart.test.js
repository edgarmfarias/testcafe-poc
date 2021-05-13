import LoginPage from '../pages/Login.page';
import InventoryPage from '../pages/Inventory.page';
import LayoutPage from '../pages/Layout.page';
import CartPage from '../pages/Cart.page';
import { CREDENTIALS } from '../data/constants';
import { getURL } from '../utils/client-functions';
import { getRandomNumber } from '../utils/random';

fixture('Shopping cart feature').page`https://www.saucedemo.com/`.beforeEach(
  async (t) => {
    t.ctx.minRandom = 1;
    t.ctx.maxRandom = 6;

    await LoginPage.login(
      t,
      CREDENTIALS.VALID_USERNAME,
      CREDENTIALS.VALID_PASSWORD
    );
  }
);

test('TC4 user can navigate to the shopping cart', async (t) => {
  await t
    .click(LayoutPage.shoppingCart)
    .expect(getURL())
    .contains(LayoutPage.path);
});

test('TC5 user can add one item to the shopping cart', async (t) => {
  const list = await InventoryPage.addItems(t, 1);
  await t.click(LayoutPage.shoppingCart);

  for (let i = 0; i < list.length; i++) {
    const cartItem = await CartPage.getItem(i);

    const { name, description, price } = list[i];

    await t
      .expect(cartItem.name)
      .eql(name)
      .expect(cartItem.description)
      .eql(description)
      .expect(cartItem.price.replace('$', ''))
      .eql(price.replace('$', ''));
  }
});

test('TC6 user can add multiple items to the shopping cart', async (t) => {
  const randomNumber = getRandomNumber(t.ctx.minRandom, t.ctx.maxRandom);
  const list = await InventoryPage.addItems(t, randomNumber);
  await t.click(LayoutPage.shoppingCart);

  for (let i = 0; i < list.length; i++) {
    const cartItem = await CartPage.getItem(i);

    const { name, description, price } = list[i];

    await t
      .expect(cartItem.name)
      .eql(name)
      .expect(cartItem.description)
      .eql(description)
      .expect(cartItem.price.replace('$', ''))
      .eql(price.replace('$', ''));
  }
});
