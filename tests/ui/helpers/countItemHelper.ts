import { Page } from '@playwright/test';
import { TodoItem } from './types';

export async function checkTodoItemCountOnTheList(
  page: Page,
  item: TodoItem
): Promise<number> {
  // Wait for 2 seconds to allow the list to update
  await page.waitForTimeout(2000);
  const counter = await page.getByText(`${item.name}✏️ Edit🗑️ Delete`).count();
  return counter;
}
