import { test as setup } from '@playwright/test';
import { createTodoItem } from '../helpers/createItemHelper';
import { enterCredentials } from '../helpers/loginScreenHelper';
import { TodoItem } from '../helpers/types';

const items: TodoItem[] = [
  { name: 'DELETE ITEM' },
  { name: 'UPDATE ITEM' },
  { name: 'CREATE ITEM' },
];
const user2Item = 'Buy milk - user 2';

setup('create items for CRUD operations - username: test', async ({ page }) => {
  await page.goto('/');

  await enterCredentials(page);

  for (const item of items) {
    await createTodoItem(page, item);
  }
});

setup('create items - username: user2', async ({ page }) => {
  await page.goto('/');

  await enterCredentials(page, 'user2', 'user2');

  await createTodoItem(page, { name: user2Item });
});
