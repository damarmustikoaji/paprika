/**
 * CartPage class representing the shopping cart page.
*/

import { Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isItemInCart(productName: string) {
        try {
            const itemLocator = this.page.locator('.cart_item').filter({ hasText: productName });
            return await itemLocator.count() > 0;
        } catch (error) {
            console.error(`Error checking if item "${productName}" is in cart:`, error);
            throw error;
        }
    }
}
