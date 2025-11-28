/**
 * CheckoutPage class representing the checkout process page.
*/

import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoCheckoutPage() {
        try {
            await this.page.goto(process.env.BASE_URL + '/checkout-step-one.html');
        } catch (error) {
            console.error('Failed to navigate to checkout page:', error);
            throw error;
        }
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        try {
            await this.page.fill('[data-test="firstName"]', firstName);
            await this.page.fill('[data-test="lastName"]', lastName);
            await this.page.fill('[data-test="postalCode"]', postalCode);
        } catch (error) {
            console.error('Failed to fill checkout form:', error);
            throw error;
        }
    }

    async continue() {
        try {
            await this.page.locator('[data-test="continue"]').click();
        } catch (error) {
            console.error('Failed to continue to overview page:', error);
            throw error;
        }
    }

    async verifyOverviewPage() {
        try {
            const overviewLocator = this.page.locator('.summary_info');
            await expect(overviewLocator).toBeVisible();
        } catch (error) {
            console.error('Overview page verification failed:', error);
            throw error;
        }
    }

    async finishCheckout() {
        try {
            await this.page.locator('[data-test="finish"]').click();
        } catch (error) {
            console.error('Failed to finish checkout:', error);
            throw error;
        }
    }

    async getSuccessMessage() {
        try {
            const successLocator = this.page.locator('.complete-header');
            await expect(successLocator).toBeVisible();
            return await successLocator.textContent();
        } catch (error) {
            console.error('Failed to get success message:', error);
            throw error;
        }
    }

    async goToCart() {
        try {
            await this.page.click('.shopping_cart_link');
        } catch (error) {
            console.error('Failed to navigate to cart page:', error);
            throw error;
        }
    }

    async expectErrorMessage(message: string) {
        try {
            const errorLocator = this.page.locator('[data-test="error"]');
            await expect(errorLocator).toBeVisible();
            await expect(errorLocator).toHaveText(message);
        } catch (error) {
            console.error('Error message expectation failed:', error);
            throw error;
        }
    }
}
