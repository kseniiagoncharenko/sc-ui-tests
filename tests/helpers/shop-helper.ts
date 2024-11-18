import { expect, Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { ShopMainPage } from '../pages/shop/main-page.po';
import { SortingOptions } from '../constants';
import { IProduct } from '../models';

const appLogoText = 'Swag Labs';
export class ShopHelper extends HelperBase {

    public shopMainPage: ShopMainPage;

    constructor(readonly page: Page) {
        super(page);
        this.shopMainPage = new ShopMainPage(this.page);
    }

    public async assertMainShopPageIsShown() {
        await this.shopMainPage.appLogo.waitFor();
        expect(await this.shopMainPage.getAppLogoText(), `Main page logo isn't visible.`).toBe(appLogoText);
    }

    public async assertSelectedSortingOptionIs(expectedOption: string) {
        expect(await this.shopMainPage.getSelectedSortingOptionText(), `Selected sorting option is not '${expectedOption}'`).toBe(expectedOption);
    }

    public async sortProductsBy(sortingOrder: SortingOptions) {
        await this.shopMainPage.sortProductsBy(sortingOrder);
    }

    public async getFirstItemDetails() {
        const itemDetails: IProduct = {
            name: await this.shopMainPage.getFirstItemName(),
            price: await this.shopMainPage.getFirstItemPrice()
        }
        return itemDetails;
    }

    public async verifyFirstItemPrice(expectedPrice: string) {
        const itemPrice = await this.shopMainPage.getFirstItemPrice();
        expect(itemPrice, `First item price should equal ${expectedPrice}.`).toContain(expectedPrice);
    }

    public async addFirstItemToCart() {
        await this.shopMainPage.clickAddToCartFirstBtn();
    }

    public async assertNumberOfItemsInCart(expectedNumber: string) {
        expect(await this.shopMainPage.getCartBadgeQuantity(), `Number of items in cart should be ${expectedNumber} `).toBe(expectedNumber);
    }

    public async startOrderingProcess() {
        await this.shopMainPage.openShoppingCart();
    }
}