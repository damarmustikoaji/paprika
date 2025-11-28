import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_pages';
import { InventoryPage } from '../../pages/inventory_page';
import { CartPage } from '../../pages/cart_page';
import { CheckoutPage } from '../../pages/checkout_page';
import users from '../../data/test_users.json';
import products from '../../data/test_products.json';
import checkoutData from '../../data/test_checkout.json';

test('@addtocart User can add product to cart successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login(users[0].username, users[0].password);
    await expect(page).toHaveURL(/inventory.html/);

    await inventory.openProductDetail(products[0].name);
    await inventory.addItemToCart(products[0].name);

    const count = await inventory.getCartCount();
    expect(count).toBe(1);

    await inventory.gotoCart();

    expect(await cart.isItemInCart(products[0].name)).toBeTruthy();

    const checkout = new CheckoutPage(page);
    await checkout.gotoCheckoutPage();
    await checkout.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
    await checkout.continue();
    await checkout.verifyOverviewPage();
    await checkout.finishCheckout();
    const successMessage = await checkout.getSuccessMessage();
    expect(successMessage).toBe('Thank you for your order!');
});
