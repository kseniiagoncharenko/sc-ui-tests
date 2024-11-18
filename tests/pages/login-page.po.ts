import { Locator, Page } from '@playwright/test';
import { PageBase } from './page-base';

export class LoginPage extends PageBase {

    public usernameInput: Locator;
    public passwordInput: Locator;
    public loginBtn: Locator;

    public errorMessage: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginBtn = page.getByText("Login");

        this.errorMessage = page.locator('data-test=error');
    }

    public async setUsername(email: string) {
        await this.usernameInput.waitFor();
        await this.usernameInput.clear();
        await this.usernameInput.fill(email);
    }
    public async setPassword(password: string) {
        await this.passwordInput.waitFor();
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    public async clickLoginBtn() {
        await this.loginBtn.waitFor();
        await this.loginBtn.click();
    }

    public async getErrorMessageText() {
        const messageText = await this.errorMessage.textContent();
        if (!messageText) {
            throw new Error('Error message text is not found.');
        }
        return messageText;
    }
}