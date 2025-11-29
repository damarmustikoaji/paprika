import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.pages';

test('@login @negative Login with empty username should fail', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('', '');
    await login.expectError('Epic sadface: Username is required');
});
