import { Locator, Page } from '@playwright/test';
import { PageBase } from '../page-base';
import { SortingOptions } from '../../constants';

export class ShopMainPage extends PageBase {

    public appLogo: Locator;
    private sortingDropdown: Locator;
    private selectedSortOption: Locator;
    private itemNameLabel: Locator;
    private itemPriceLabel: Locator;
    private addToCartBtn: Locator;
    private shoppingCartBadge: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.appLogo = page.locator('.app_logo');
        this.sortingDropdown = page.locator('.product_sort_container');
        this.selectedSortOption = page.locator('.active_option');
        this.itemNameLabel = page.locator('.inventory_item_name');
        this.itemPriceLabel = page.locator('.inventory_item_price');
        this.addToCartBtn = page.getByText('Add to cart');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    public async getAppLogoText() {
        const appLogoText = await this.appLogo.textContent();
        if (!appLogoText) {
            throw new Error('Text is not found on app logo.');
        }
        return appLogoText;
    }

    public async getSelectedSortingOptionText() {
        const sortingOption = await this.selectedSortOption.textContent();
        if (!sortingOption) {
            throw new Error('Sorting option is not selected.');
        }
        return sortingOption;
    }

    public async sortProductsBy(sortBy: SortingOptions) {
        await this.sortingDropdown.selectOption(sortBy);
    }

    public async getFirstItemName() {
        const itemName = await this.itemNameLabel.first().textContent();
        if (!itemName) {
            throw new Error('Item name is not found.');
        }
        return itemName;
    }

    public async getFirstItemPrice() {
        const itemPrice = await this.itemPriceLabel.first().textContent();
        if (!itemPrice) {
            throw new Error('Item price is not found.');
        }
        return itemPrice;
    }

    public async getCartBadgeQuantity() {
        const cartQuantity = await this.shoppingCartBadge.textContent();
        if (!cartQuantity) {
            throw new Error('Number of items on cart badge is not found.');
        }
        return cartQuantity;
    }

    public async clickAddToCartFirstBtn() {
        await this.addToCartBtn.first().click();
    }

    public async openShoppingCart() {
        await this.shoppingCartBadge.click();
    }
}