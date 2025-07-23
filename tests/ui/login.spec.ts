import { expect, test } from '@playwright/test';
import { enterCredentials } from './helpers/loginScreenHelper';

test('enter valid credentials and check if user is logged in', async ({
  page,
}) => {
  await test.step('navigate to login page', async () => {
    await page.goto('/');
  });

  await enterCredentials(page);

  await test.step('check that heading is visible for authenticated user', async () => {
    await expect(page.getByText('My Todo List')).toBeVisible();
  });
});

test('enter invalid credentials and check error message is shown', async ({
  page,
}) => {
  await test.step('navigate to login page', async () => {
    await page.goto('/');
  });

  await enterCredentials(page, 'invalid', 'invalid');

  await test.step('check error message is shown', async () => {
    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });
});
