import { test as setup } from '@playwright/test';
import { createTodoItem } from '../helpers/createItemHelper';
import { enterCredentials } from '../helpers/loginScreenHelper';
import { TodoItem } from '../helpers/types';

const items: TodoItem[] = [
  { name: 'DELETE ITEM' },
  { name: 'UPDATE ITEM' },
  { name: 'CREATE ITEM' },
];

setup('create items for CRUD operations', async ({ page }) => {
  await page.goto('/');

  await enterCredentials(page);

  for (const item of items) {
    await createTodoItem(page, item);
  }
});
