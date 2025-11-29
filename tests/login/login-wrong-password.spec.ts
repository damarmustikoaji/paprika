import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.pages';
import { randomString } from '../../utils/helpers';
import users from '../../data/users.json';

test('@login @negative Login with wrong password should fail', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.validUser.username, randomString(8));
    await login.expectError('Epic sadface: Username and password do not match any user in this service');
});
