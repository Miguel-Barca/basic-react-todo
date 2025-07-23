import { test } from '@playwright/test';
import { enterCredentials } from './helpers/loginScreenHelper';
import { deleteTodoItem } from './helpers/deleteItemHelper';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await enterCredentials(page);
});

test.describe('delete todo items', () => {
  test('delete todo item', async ({ page }) => {
    await deleteTodoItem(page, { name: 'DELETE ITEM' });
  });
});
