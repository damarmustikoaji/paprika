import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration_page';
import { randomString } from '../../utils/helpers';

test('@registertest User can register successfully', async ({ page }) => {
    const register = new RegistrationPage(page);
    await register.goto();
    await register.register(randomString(5), randomString(8));
    await expect(page.locator('successful')).toBeVisible();
});
