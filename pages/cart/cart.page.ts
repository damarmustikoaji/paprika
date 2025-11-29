import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItem = page.locator('.cart_item');
    }

    async isItemInCart(productName: string) {
        const itemLocator = this.cartItem.filter({ hasText: productName });
        return await itemLocator.count() > 0;
    }
}
