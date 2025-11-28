import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login_pages';
import users from '../../data/test_users.json';

test('@logintest User cannot login successfully using valid username and password with status locked user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users[1].username, users[1].password);
    await login.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
});
