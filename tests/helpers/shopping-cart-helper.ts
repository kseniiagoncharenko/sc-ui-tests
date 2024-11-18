import { expect, Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { IProduct } from '../models';
import { ShoppingCartPage } from '../pages/shop/shopping-cart-page.po';

export class ShoppingCartHelper extends HelperBase {

    public shoppingCartPage: ShoppingCartPage;

    constructor(readonly page: Page) {
        super(page);
        this.shoppingCartPage = new ShoppingCartPage(this.page);
    }

    public async verifyItemDetails(expectedItem: IProduct) {
        const itemDetails: IProduct = {
            name: await this.shoppingCartPage.getItemName(),
            price: await this.shoppingCartPage.getItemPrice(),
            quantity: await this.shoppingCartPage.getItemQuantity()
        }
        expect(itemDetails, 'Item details in cart do not match expected values.').toStrictEqual(expectedItem);
    }

    public async proceedToCheckout() {
        await this.shoppingCartPage.clickCheckoutBtn();
    }
}