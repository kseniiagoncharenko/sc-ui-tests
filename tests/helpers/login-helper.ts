import { expect, Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { LoginPage } from '../pages/login-page.po';
import { Users } from '../constants';
import { IUser } from '../models';

const errorMessageText = 'Epic sadface: Sorry, this user has been locked out.';

export class LoginHelper extends HelperBase {

    public loginPage: LoginPage;

    constructor(readonly page: Page) {
        super(page);
        this.loginPage = new LoginPage(this.page);
    }

    public async loginAs(user: IUser = Users.standardUser()) {
        await this.loginPage.setUsername(user.username);
        await this.loginPage.setPassword(user.password);
        await this.loginPage.clickLoginBtn();
    }

    public async assertErrorMessageIsVisible() {
        expect(this.loginPage.errorMessage, 'Message for locked out user is not visible.').toBeVisible();
        expect(this.loginPage.errorMessage, `Message text doesn't correspond the error.`).toHaveText(errorMessageText);
    }
}