import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/register/registration.page';
import { randomString } from '../../utils/helpers';

test('@register @positive User can register successfully using valid data', async ({ page }) => {
    const register = new RegistrationPage(page);
    await register.open();
    await register.register(randomString(5), randomString(8));
    await expect(page.locator('successful')).toBeVisible();
});
