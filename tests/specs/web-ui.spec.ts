import { test, Page } from '@playwright/test';
import { LoginHelper } from '../helpers/login-helper';
import { lowestPrice, SortingOptions, Users } from '../constants';
import { ShopHelper } from '../helpers/shop-helper';
import { ShoppingCartHelper } from '../helpers/shopping-cart-helper';
import { CheckoutHelper } from '../helpers/checkout-helper';

let page: Page;
let loginHelper: LoginHelper;
let shopHelper: ShopHelper;
let shoppingCartHelper: ShoppingCartHelper;
let checkoutHelper: CheckoutHelper;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('/');
});

test.afterEach(async () => {
  await page.close();
});

test('Verify login error message', async ({ }) => {
  loginHelper = new LoginHelper(page);

  await loginHelper.loginAs(Users.lockedOutUser());
  await loginHelper.assertErrorMessageIsVisible();
});

test('Verify products sorting', async ({ }) => {
  loginHelper = new LoginHelper(page);
  shopHelper = new ShopHelper(page);

  await loginHelper.loginAs(Users.standardUser());
  await shopHelper.assertMainShopPageIsShown();

  await shopHelper.assertSelectedSortingOptionIs(SortingOptions.defaultOption);
  await shopHelper.sortProductsBy(SortingOptions.ascendingPrice);
  await shopHelper.verifyFirstItemPrice(lowestPrice);
});

test('Add product to cart and finish order', async ({ }) => {
  loginHelper = new LoginHelper(page);
  shopHelper = new ShopHelper(page);
  shoppingCartHelper = new ShoppingCartHelper(page);
  checkoutHelper = new CheckoutHelper(page);
  const userStandard = Users.standardUser();
  
  await loginHelper.loginAs(userStandard);

  //for the testing purposes we assume that order data  is constant, 
  // since the same item is verified during each test run
  const orderInfo = {
    paymentInfo: 'SauceCard #31337',
    shippingInfo: 'Free Pony Express Delivery!',
    priceTotal: '$32.39'
  }

  const itemDetails = await shopHelper.getFirstItemDetails();
  itemDetails.quantity = '1';

  await shopHelper.addFirstItemToCart();
  await shopHelper.assertNumberOfItemsInCart(itemDetails.quantity);
  await shopHelper.startOrderingProcess();

  await shoppingCartHelper.verifyItemDetails(itemDetails);
  await shoppingCartHelper.proceedToCheckout();

  await checkoutHelper.finishCheckoutProcess(userStandard, itemDetails, orderInfo);
  await checkoutHelper.assertCheckoutCompleteMessageIsVisible();
});