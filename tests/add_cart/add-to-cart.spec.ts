import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.pages';
import { InventoryPage } from '../../pages/inventory/inventory.page';
import { CartPage } from '../../pages/cart/cart.page';
import users from '../../data/users.json';
import products from '../../data/products.json';

test('@addtocart @positive User can add product to cart successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.open();
    await login.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/inventory.html/);

    await inventory.openProductDetail(products[0].name);
    await inventory.addItemToCart(products[0].name);

    const count = await inventory.getCartCount();
    expect(count).toBe(1);

    await inventory.gotoCart();

    expect(await cart.isItemInCart(products[0].name)).toBeTruthy();
});
