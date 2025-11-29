import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.pages';
import users from '../../data/users.json';

test('@login @negative Locked user cannot login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.lockedOutUser.username, users.lockedOutUser.password);
    await login.expectError('Epic sadface: Sorry, this user has been locked out.');
});
