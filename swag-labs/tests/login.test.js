import LoginPage from '../pages/Login.page';
import InventoryPage from '../pages/Inventory.page';
import LayoutPage from '../pages/Layout.page';
import MenuPage from '../pages/Menu.page';
import { CREDENTIALS } from '../data/constants';
import { getURL } from '../utils/client-functions';

fixture('Login feature').page`https://www.saucedemo.com/`;

test('TC1 user can login with valid credentials', async (t) => {
  await LoginPage.login(
    t,
    CREDENTIALS.VALID_USERNAME,
    CREDENTIALS.VALID_PASSWORD
  );
  await t.expect(getURL()).contains(InventoryPage.path);
});

test('TC2 user cant login with invalid credentials', async (t) => {
  await LoginPage.login(
    t,
    CREDENTIALS.INVALID_USERNAME,
    CREDENTIALS.INVALID_PASSWORD
  );
  await t.expect(LoginPage.error.exists).ok();
});

test('TC3 user can logout', async (t) => {
  await LoginPage.login(
    t,
    CREDENTIALS.VALID_USERNAME,
    CREDENTIALS.VALID_PASSWORD
  );
  await t
    .click(LayoutPage.menu)
    .click(MenuPage.logout)
    .expect(LoginPage.loginButton.exists)
    .ok();
});
