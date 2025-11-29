import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly itemLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemLocator = page.locator('.cart_item');
    }

    async isItemInCart(productName: string) {
        const itemLocator = this.itemLocator.filter({ hasText: productName });
        return await itemLocator.count() > 0;
    }
}
