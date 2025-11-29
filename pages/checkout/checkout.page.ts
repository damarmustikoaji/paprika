import { Page, expect, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly postalCodeField: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successMessageLocator: Locator;
    readonly errorMessageLocator: Locator;
    readonly summaryInfoLocator: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.locator('#first-name');
        this.lastNameField = page.locator('#last-name');
        this.postalCodeField = page.locator('#postal-code');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.successMessageLocator = page.locator('.complete-header');
        this.errorMessageLocator = page.locator('[data-test="error"]');
        this.summaryInfoLocator = page.locator('.summary_info');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    async open() {
        await this.page.goto(process.env.BASE_URL + '/checkout-step-one.html');
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
    }

    async continue() {
        await this.continueButton.click();
    }

    async verifyOverviewPage() {
        const overviewLocator = this.summaryInfoLocator;
        await expect(overviewLocator).toBeVisible();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async getSuccessMessage() {
        const successLocator = this.successMessageLocator;
        await expect(successLocator).toBeVisible();
        return await successLocator.textContent();
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }

    async expectError(message: string) {
        await expect(this.errorMessageLocator).toBeVisible();
        await expect(this.errorMessageLocator).toContainText(message);
    }
}
