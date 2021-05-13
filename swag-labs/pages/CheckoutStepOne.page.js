import { Selector } from 'testcafe';

class CheckoutStepOnePage {
  constructor() {
    this.path = '/checkout-step-one.html';
    this.error = Selector('[data-test="error"]');
    this.continue = Selector('[value="CONTINUE"]');
    this.fistName = Selector('[data-test="firstName"]');
    this.lastName = Selector('[data-test="lastName"]');
    this.zipCode = Selector('[data-test="postalCode"]');
  }

  async fillMailingInformation(t, firstName, lastName, zipCode) {
    await t
      .typeText(this.fistName, firstName)
      .typeText(this.lastName, lastName)
      .typeText(this.zipCode, zipCode);
  }
}

export default new CheckoutStepOnePage();
