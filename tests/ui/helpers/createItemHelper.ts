import { test, expect, Page } from '@playwright/test';
import { checkTodoItemCountOnTheList } from './countItemHelper';
import { TodoItem } from './types';

export async function createTodoItem(page: Page, item: TodoItem) {
  // We can have the same item multiple times
  let defaultItemCount: number;

  await test.step(
    `check todo item '${item.name}' is on the list`,
    async () => {
      defaultItemCount = await checkTodoItemCountOnTheList(page, item);
    },
    { box: true }
  );

  await test.step(
    `create todo item '${item.name}'`,
    async () => {
      await page.getByRole('textbox', { name: 'Add a new todo...' }).click();
      await page
        .getByRole('textbox', { name: 'Add a new todo...' })
        .fill(item.name);
    },
    { box: true }
  );

  await test.step(
    `click add todo button`,
    async () => {
      await page.getByRole('button', { name: 'Add Todo' }).click();
    },
    { box: true }
  );

  await test.step(
    `check todo item '${item.name}' is on the list`,
    async () => {
      const newValue = await checkTodoItemCountOnTheList(page, item);
      expect(newValue).toBeGreaterThan(defaultItemCount);
    },
    { box: true }
  );
}
