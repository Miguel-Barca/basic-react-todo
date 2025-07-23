import { expect, test } from '@playwright/test';
import { enterCredentials } from './helpers/loginScreenHelper';

test('empty list aria snapshot', async ({ page }) => {
  await test.step('navigate to login page', async () => {
    await page.goto('/');
  });

  await enterCredentials(page, 'admin', 'admin');

  await test.step('check that empty todo list is shown', async () => {
    await expect(page.locator('#root')).toMatchAriaSnapshot({
      name: 'snapshots/emptyList.aria.yml',
    });
  });
});
