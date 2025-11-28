import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_pages';
import { randomString } from '../../utils/helpers';
import users from '../../data/test_users.json';

test('@logintest User cannot login successfully using valid username and wrong password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.clickLogin();
    await login.expectErrorMessage('Epic sadface: Username is required');
});
