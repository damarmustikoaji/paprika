import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    async openProductDetail(productName: string) {
        const itemCard = this.inventoryItems.filter({
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
        const badge = this.shoppingCartBadge;
        if (await badge.count() === 0) return 0;
        return parseInt(await badge.innerText());
    }

    async gotoCart() {
        await this.shoppingCartLink.click();
    }
}
