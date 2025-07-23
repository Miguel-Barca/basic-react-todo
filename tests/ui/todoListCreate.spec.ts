import { test } from '@playwright/test';
import { enterCredentials } from './helpers/loginScreenHelper';
import { createTodoItem } from './helpers/createItemHelper';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await enterCredentials(page);
});

test.describe('create todo items', () => {
  test('create todo item', async ({ page }) => {
    await createTodoItem(page, { name: 'Buy groceries' });
  });

  test('add todo item multiple times', async ({ page }) => {
    await createTodoItem(page, { name: 'Take trash out' });
    await createTodoItem(page, { name: 'Take trash out' });
  });
});
