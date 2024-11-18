import { Locator, Page } from '@playwright/test';
import { PageBase } from '../page-base';
import { IUser } from '../../models';

const checkoutCompleteMessage = 'Thank you for your order!';

export class CheckoutPage extends PageBase {

    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private postalCodeInput: Locator;
    private continueBtn: Locator;
    private paymentInfoValueLabel: Locator;
    private shippingInfoValueLabel: Locator;
    private priceTotalValueLabel: Locator;
    private finishBtn: Locator;
    private backHomeBtn: Locator;

    public checkoutCompleteMessage: Locator;

    constructor(readonly page: Page) {
        super(page);

        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueBtn = page.getByText('Continue');
        this.paymentInfoValueLabel = page.locator('data-test=payment-info-value');
        this.shippingInfoValueLabel = page.locator('data-test=shipping-info-value');
        this.priceTotalValueLabel = page.locator('data-test=total-label');
        this.finishBtn = page.getByText('Finish');
        this.checkoutCompleteMessage = page.getByText(checkoutCompleteMessage);
        this.backHomeBtn = page.getByText('Back Home');
    }

    public async setCustomerData(user: IUser) {
        await this.firstNameInput.fill(user.firstName!);
        await this.lastNameInput.fill(user.lastName!);
        await this.postalCodeInput.fill(user.postalCode!);
    }   

    public async getPaymentInfo() {
        const paymentInfoValue = await this.paymentInfoValueLabel.textContent();
        if (!paymentInfoValue) {
            throw new Error('Payment information is not found on checkout page.');
        }
        return paymentInfoValue;
    }

    public async getShippingInfo() {
        const shipingInfoValue = await this.shippingInfoValueLabel.textContent();
        if (!shipingInfoValue) {
            throw new Error('Shipping information is not found on checkout page.');
        }
        return shipingInfoValue;
    }

    public async getPriceTotalInfo() {
        const priceTotal = await this.priceTotalValueLabel.textContent();
        if (!priceTotal) {
            throw new Error('Total price is not found on checkout page.');
        }
        return priceTotal;
    }

    public async clickContinueBtn() {
        await this.continueBtn.click();
    }

    public async clickFinishBtn() {
        await this.finishBtn.click();
    }

    public async clickBackHomeBtn() {
        await this.backHomeBtn.click();
    }
}