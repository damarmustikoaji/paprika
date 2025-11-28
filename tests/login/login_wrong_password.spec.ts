import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_pages';
import { randomString } from '../../utils/helpers';
import users from '../../data/test_users.json';

test('@logintest User cannot login successfully using valid username and wrong password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users[0].username, randomString(8));
    await login.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
});
