import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.pages';
import users from '../../data/users.json';

test('@login @negative User cannot login successfully using valid username and empty password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.validUser.username, '');
    await login.expectError('Epic sadface: Password is required');
});
