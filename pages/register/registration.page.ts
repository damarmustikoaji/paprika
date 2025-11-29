import { Page, expect, Locator } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly registerBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.registerBtn = page.locator('#register-button');
    }

    async open() {
        await this.page.goto(process.env.BASE_URL + '/register.html');
    }

    async register(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.registerBtn.click();
    }
}
