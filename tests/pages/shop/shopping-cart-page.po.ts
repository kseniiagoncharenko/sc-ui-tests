import { Locator, Page } from '@playwright/test';
import { PageBase } from '../page-base';

export class ShoppingCartPage extends PageBase {

    private itemQuantityLabel: Locator;
    private itemNameLabel: Locator;
    private itemPriceLabel: Locator;
    private checkoutBtn: Locator;

    constructor(readonly page: Page) {
        super(page);

        this.itemQuantityLabel = page.locator('.cart_quantity');
        this.itemNameLabel = page.locator('.inventory_item_name');
        this.itemPriceLabel = page.locator('.inventory_item_price');
        this.checkoutBtn = page.getByText('Checkout');
    }

    public async getItemQuantity() {
        const itemQuantity = await this.itemQuantityLabel.textContent();
        if (!itemQuantity) {
            throw new Error('Quantity of the same items in cart is not found.');
        }
        return itemQuantity;
    }

    public async getItemName() {
        const itemName = await this.itemNameLabel.textContent();
        if (!itemName) {
            throw new Error('Item name is not found in shopping cart.');
        }
        return itemName;
    }

    public async getItemPrice() {
        const itemPrice = await this.itemPriceLabel.textContent();
        if (!itemPrice) {
            throw new Error('Item price is not found in shopping cart.');
        }
        return itemPrice;
    }    

    public async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }
}