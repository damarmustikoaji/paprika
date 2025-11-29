import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.pages';
import users from '../../data/users.json';

test('@login @negative Login with empty password should fail', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.validUser.username, '');
    await login.expectError('Epic sadface: Password is required');
});
