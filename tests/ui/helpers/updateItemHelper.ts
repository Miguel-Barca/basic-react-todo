import { Page, test } from '@playwright/test';
import { expect } from '@playwright/test';
import { checkTodoItemCountOnTheList } from './countItemHelper';
import { TodoItem } from './types';

export async function updateTodoItem(
  page: Page,
  item: TodoItem,
  newItem: TodoItem
) {
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
    `click edit button for the first item on the list`,
    async () => {
      await page
        .getByText(`${item.name}✏️ Edit🗑️ Delete`)
        .first()
        .getByRole('button', { name: '✏️ Edit' })
        .click();
    },
    { box: true }
  );

  await test.step(
    `fill in new item name`,
    async () => {
      await page.getByRole('list').getByRole('textbox').click();
      await page.getByRole('list').getByRole('textbox').fill(newItem.name);
      await page.getByRole('button', { name: '✓ Save' }).click();
    },
    { box: true }
  );
}
