import { test as teardown } from '@playwright/test';
import { enterCredentials } from '../helpers/loginScreenHelper';
import { deleteAllTodoItems } from '../helpers/deleteItemHelper';

const users = [
  { username: 'test', password: 'test' },
  { username: 'user2', password: 'user2' },
  { username: 'admin', password: 'admin' },
];

for (const user of users) {
  teardown(
    `delete todo lists for username: '${user.username}'`,
    async ({ page }) => {
      await page.goto('/');

      await enterCredentials(page, user.username, user.password);

      await deleteAllTodoItems(page);
    }
  );
}
