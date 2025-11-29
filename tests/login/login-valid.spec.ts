import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.pages';
import users from '../../data/users.json';

test('@login @positive Valid user can login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.login(users.validUser.username, users.validUser.password);

  await expect(page).toHaveURL(/inventory.html/);
});
