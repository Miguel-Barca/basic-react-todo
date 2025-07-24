import { Page } from '@playwright/test';

export async function logout(page: Page) {
  await page.getByRole('button', { name: 'Logout' }).click();
}
