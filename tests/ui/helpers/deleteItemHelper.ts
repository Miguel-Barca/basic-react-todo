import { Page, test } from '@playwright/test';
import { expect } from '@playwright/test';
import { checkTodoItemCountOnTheList } from './countItemHelper';
import { TodoItem } from './types';

export async function deleteTodoItem(page: Page, item: TodoItem) {
  // We can have the same item multiple times
  let defaultItemCount: number;

  await test.step(
    `check if todo item '${item.name}' is on the list`,
    async () => {
      defaultItemCount = await checkTodoItemCountOnTheList(page, item);
    },
    { box: true }
  );

  await test.step(
    `click delete button for each item on the list`,
    async () => {
      for (let i = 0; i < defaultItemCount; i++) {
        await page
          .getByText(`${item.name}✏️ Edit🗑️ Delete`)
          .first()
          .getByRole('button', { name: '🗑️ Delete' })
          .click();
      }
    },
    { box: true }
  );

  await test.step(
    `check todo item '${item.name}' is not on the list`,
    async () => {
      await expect(
        page.getByText(`${item.name}✏️ Edit🗑️ Delete`)
      ).not.toBeVisible();
    },
    { box: true }
  );
}
