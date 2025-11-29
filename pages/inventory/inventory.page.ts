import { Page, expect, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openProductDetail(productName: string) {
        const itemCard = this.page.locator('.inventory_item').filter({
            has: this.page.locator('.inventory_item_name', { hasText: productName })
        });

        await itemCard.waitFor();
        const titleLink = itemCard.locator('a[data-test$="title-link"]');
        await titleLink.click();
    }

    async addItemToCart(productName: string) {
        const itemLocator = this.page.locator(`text=${productName}`);
        await itemLocator.waitFor();

        const addButton = itemLocator
            .locator('xpath=..')
            .locator("button:has-text('Add to cart')");

        await addButton.click();
    }

    async removeItemFromCart(productName: string) {
        const slug = productName.toLowerCase().replace(/ /g, "-");
        const removeBtn = this.page.locator(`[data-test="remove-${slug}"]`);

        await removeBtn.waitFor({ state: "visible" });
        await removeBtn.click();
    }

    async getCartCount() {
        const badge = this.page.locator('.shopping_cart_badge');
        if (await badge.count() === 0) return 0;
        return parseInt(await badge.innerText());
    }

    async gotoCart() {
        await this.page.click('.shopping_cart_link');
    }
}
