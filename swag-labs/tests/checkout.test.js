import LoginPage from '../pages/Login.page';
import InventoryPage from '../pages/Inventory.page';
import LayoutPage from '../pages/Layout.page';
import CartPage from '../pages/Cart.page';
import CheckoutStepOnePage from '../pages/CheckoutStepOne.page';
import CheckoutStepTwoPage from '../pages/CheckoutStepTwo.page';
import CheckoutCompletePage from '../pages/CheckoutComplete.page';
import { getRandomNumber } from '../utils/random';
import { getURL } from '../utils/client-functions';
import { CREDENTIALS, MAILING_INFO } from '../data/constants';

fixture('Checkout feature').page`https://www.saucedemo.com/`.beforeEach(
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

test('TC7 displays an error when missing mailing information', async (t) => {
  await InventoryPage.addItems(t, getRandomNumber(t.minRandom, t.maxRandom));
  await t
    .click(LayoutPage.shoppingCart)
    .click(CartPage.checkout)
    .click(CheckoutStepOnePage.continue)
    .expect(CheckoutStepOnePage.error.exists)
    .ok();
});

test('TC8 navigates to the overview page after filling mailing info', async (t) => {
  const { FIRST_NAME, LAST_NAME, ZIP_CODE } = MAILING_INFO;

  await InventoryPage.addItems(t, getRandomNumber(t.minRandom, t.maxRandom));
  await t.click(LayoutPage.shoppingCart).click(CartPage.checkout);
  await CheckoutStepOnePage.fillMailingInformation(
    t,
    FIRST_NAME,
    LAST_NAME,
    ZIP_CODE
  );
  await t
    .click(CheckoutStepOnePage.continue)
    .expect(getURL())
    .contains(CheckoutStepTwoPage.path);
});

test('TC9 items in overview page should match items added', async (t) => {
  const { FIRST_NAME, LAST_NAME, ZIP_CODE } = MAILING_INFO;

  const list = await InventoryPage.addItems(
    t,
    getRandomNumber(t.ctx.minRandom, t.ctx.maxRandom)
  );

  await t.click(LayoutPage.shoppingCart).click(CartPage.checkout);
  await CheckoutStepOnePage.fillMailingInformation(
    t,
    FIRST_NAME,
    LAST_NAME,
    ZIP_CODE
  );
  await t.click(CheckoutStepOnePage.continue);

  for (let i = 0; i < list.length; i++) {
    const checkoutItem = await CheckoutStepTwoPage.getItem(i);

    const { name, description, price } = list[i];

    await t
      .expect(checkoutItem.name)
      .eql(name)
      .expect(checkoutItem.description)
      .eql(description)
      .expect(checkoutItem.price.replace('$', ''))
      .eql(price.replace('$', ''));
  }
});

test('TC10 finish order', async (t) => {
  const { FIRST_NAME, LAST_NAME, ZIP_CODE } = MAILING_INFO;

  await InventoryPage.addItems(
    t,
    getRandomNumber(t.ctx.minRandom, t.ctx.maxRandom)
  );
  await t.click(LayoutPage.shoppingCart).click(CartPage.checkout);
  await CheckoutStepOnePage.fillMailingInformation(
    t,
    FIRST_NAME,
    LAST_NAME,
    ZIP_CODE
  );
  await t
    .click(CheckoutStepOnePage.continue)
    .click(CheckoutStepTwoPage.finish)
    .expect(getURL())
    .contains(CheckoutCompletePage.path);
});
