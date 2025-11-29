import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/register/registration.page';
import { randomString } from '../../utils/helpers';

test('@register @positive Registration with valid data should succeed', async ({ page }) => {
    const register = new RegistrationPage(page);
    await register.open();
    await register.register(randomString(5), randomString(8));
    await expect(page.locator('successful')).toBeVisible();
});
