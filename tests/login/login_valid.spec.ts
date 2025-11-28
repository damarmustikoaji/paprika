import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_pages';
import users from '../../data/test_users.json';

test('@logintest User can login successfully using valid username and password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users[0].username, users[0].password);
    await expect(page).toHaveURL(/inventory.html/);
});
