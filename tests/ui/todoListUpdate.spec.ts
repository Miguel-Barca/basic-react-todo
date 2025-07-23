import { expect, test } from '@playwright/test';
import { enterCredentials } from './helpers/loginScreenHelper';
import { updateTodoItem } from './helpers/updateItemHelper';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await enterCredentials(page);
});

test.describe('update todo items', () => {
  test('update todo item', async ({ page }) => {
    const newItem = { name: 'RECICLE BOTTLES' };

    await updateTodoItem(page, { name: 'UPDATE ITEM' }, newItem);

    await test.step(`check if todo item '${newItem.name}' is on the list`, async () => {
      await expect(
        page.getByText(`${newItem.name}✏️ Edit🗑️ Delete`)
      ).toBeVisible();
    });
  });
});
