import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.pages';
import { InventoryPage } from '../../pages/inventory/inventory.page';
import { CartPage } from '../../pages/cart/cart.page';
import { CheckoutPage } from '../../pages/checkout/checkout.page';
import users from '../../data/users.json';
import products from '../../data/products.json';
import checkoutData from '../../data/test_checkout.json';

test('@checkout @positive Checkout with valid information should succeed', async ({ page }) => {
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

    const checkout = new CheckoutPage(page);
    await checkout.open();
    await checkout.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
    await checkout.continue();
    await checkout.verifyOverviewPage();
    await checkout.finishCheckout();
    const successMessage = await checkout.getSuccessMessage();
    expect(successMessage).toBe('Thank you for your order!');
});
