import { expect, Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { IProduct, IUser } from '../models';
import { CheckoutPage } from '../pages/shop/checkout-page.po';
import { ShoppingCartHelper } from './shopping-cart-helper';

export class CheckoutHelper extends HelperBase {

    public checkoutPage: CheckoutPage;
    public shoppingCartHelper: ShoppingCartHelper;

    constructor(readonly page: Page) {
        super(page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.shoppingCartHelper = new ShoppingCartHelper(this.page);
    }

    public async fillInCustomerDataAndContinue(user: IUser) {
        await this.checkoutPage.setCustomerData(user);
        await this.checkoutPage.clickContinueBtn();
    }

    public async assertCheckoutSummaryData(item: IProduct, 
                orderInfo: {paymentInfo: string, shippingInfo: string, priceTotal: string}) {
        await this.shoppingCartHelper.verifyItemDetails(item);
        expect(await this.checkoutPage.getPaymentInfo(), `Payment information do not match expected value: ${orderInfo.paymentInfo}`)
                .toBe(orderInfo.paymentInfo);
        expect(await this.checkoutPage.getShippingInfo(), `Shipping information do not match expected value: ${orderInfo.shippingInfo}`)
                .toBe(orderInfo.shippingInfo);
        expect(await this.checkoutPage.getPriceTotalInfo(), `Total price do not match expected value: ${orderInfo.priceTotal}`)
                .toContain(orderInfo.priceTotal);
    }

    public async clickFinishCheckout() {
        await this.checkoutPage.clickFinishBtn();
    }

    public async finishCheckoutProcess(user: IUser, item: IProduct, 
                orderInfo: {paymentInfo: string, shippingInfo: string, priceTotal: string}) {
        await this.fillInCustomerDataAndContinue(user);
        await this.assertCheckoutSummaryData(item, orderInfo);
        await this.clickFinishCheckout();
    }

    public async assertCheckoutCompleteMessageIsVisible() {
        expect(this.checkoutPage.checkoutCompleteMessage, 'Thank You message is not visible after the order was completed.').toBeVisible();
    }
}