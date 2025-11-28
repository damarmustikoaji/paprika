import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login_pages';
import users from '../../data/test_users.json';

test('@logintest User cannot login successfully using valid username and empty password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users[0].username, '');
    await login.expectErrorMessage('Epic sadface: Password is required');
});
