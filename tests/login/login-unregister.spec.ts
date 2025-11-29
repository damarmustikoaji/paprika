import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.pages';
import { randomString } from '../../utils/helpers';
import users from '../../data/users.json';

test('@login @negative Unregistered user cannot login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(randomString(5), users.validUser.password);
    await login.expectError('Epic sadface: Username and password do not match any user in this service');
});
