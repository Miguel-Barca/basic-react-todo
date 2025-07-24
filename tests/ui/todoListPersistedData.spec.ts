import { expect, test } from '@playwright/test';
import { logout } from './helpers/logoutHelper';
import { enterCredentials } from './helpers/loginScreenHelper';

const user2Item = 'Buy milk - user 2';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await enterCredentials(page, 'user2', 'user2');
});

test.describe('data is persisted', () => {
  test('after logout and login', async ({ page }) => {
    await test.step('logout', async () => {
      await logout(page);
    });

    await test.step('login back to the application', async () => {
      await enterCredentials(page, 'user2', 'user2');
    });

    await test.step('check that todo item is shown', async () => {
      await expect(page.getByText(user2Item).first()).toBeVisible();
    });
  });
});
